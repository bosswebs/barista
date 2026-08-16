import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getSql } from '../../_lib/db.js';
import { requireUser, requireAdmin, getClerkClient } from '../../_lib/auth.js';
import { userToDto } from '../../_lib/dto.js';
import { withHandler, methodNotAllowed, HttpError } from '../../_lib/http.js';

const VALID_ROLES = ['student', 'instructor', 'staff', 'admin'];

// This Clerk instance requires a username identifier even though the
// sign-up UI only collects email - derive a valid, unique one from the email.
function usernameFromEmail(email: string): string {
  const base = email.split('@')[0].replace(/[^a-zA-Z0-9_]/g, '').toLowerCase() || 'user';
  return `${base}_${Date.now().toString(36).slice(-6)}`;
}

export default withHandler(async (req: VercelRequest, res: VercelResponse) => {
  const caller = await requireUser(req);
  requireAdmin(caller);
  const sql = getSql();

  if (req.method === 'GET') {
    const rows = await sql`SELECT * FROM users ORDER BY created_at DESC`;

    // Bulk-enrich with live ban status from Clerk for every linked user
    // (Clerk allows up to 100 ids per lookup - fine for this academy's scale).
    const clerkIds = rows.map((r: any) => r.clerk_id).filter(Boolean);
    const bannedSet = new Set<string>();
    if (clerkIds.length > 0) {
      const clerkClient = getClerkClient();
      const { data } = await clerkClient.users.getUserList({ userId: clerkIds, limit: 100 });
      data.forEach((u) => {
        if (u.banned) bannedSet.add(u.id);
      });
    }

    res.status(200).json(rows.map((row: any) => userToDto(row, bannedSet.has(row.clerk_id))));
    return;
  }

  if (req.method === 'POST') {
    const { name, email, role, password } = req.body || {};
    if (!name || !email || !password) {
      throw new HttpError(400, 'name, email, and password are required');
    }
    if (password.length < 8) {
      throw new HttpError(400, 'Password must be at least 8 characters');
    }
    const finalRole = VALID_ROLES.includes(role) ? role : 'student';

    const clerkClient = getClerkClient();
    const [firstName, ...rest] = String(name).trim().split(' ');
    const clerkUser = await clerkClient.users.createUser({
      emailAddress: [email],
      password,
      firstName,
      lastName: rest.join(' ') || undefined,
      username: usernameFromEmail(email),
    });

    try {
      const created = await sql`
        INSERT INTO users (clerk_id, name, email, role, created_at)
        VALUES (${clerkUser.id}, ${name}, ${email}, ${finalRole}, to_char(now(), 'YYYY-MM-DD HH24:MI:SS'))
        RETURNING *
      `;
      res.status(201).json(userToDto(created[0]));
    } catch (err) {
      // Neon insert failed after the Clerk account was created - clean up
      // the orphan so we don't end up with a login that has no local row.
      await clerkClient.users.deleteUser(clerkUser.id).catch(() => {});
      throw err;
    }
    return;
  }

  methodNotAllowed(res, ['GET', 'POST']);
});
