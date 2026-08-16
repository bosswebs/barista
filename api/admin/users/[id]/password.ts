import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getSql } from '../../../_lib/db.js';
import { requireUser, requireAdmin, getClerkClient } from '../../../_lib/auth.js';
import { withHandler, methodNotAllowed, HttpError } from '../../../_lib/http.js';

export default withHandler(async (req: VercelRequest, res: VercelResponse) => {
  if (req.method !== 'POST') {
    methodNotAllowed(res, ['POST']);
    return;
  }

  const caller = await requireUser(req);
  requireAdmin(caller);

  const id = Number(req.query.id);
  if (!Number.isInteger(id)) throw new HttpError(400, 'Invalid user id');

  const { password } = req.body || {};
  if (!password || String(password).length < 8) {
    throw new HttpError(400, 'Password must be at least 8 characters');
  }

  const sql = getSql();
  const rows = await sql`SELECT clerk_id FROM users WHERE id = ${id}`;
  if (rows.length === 0) throw new HttpError(404, 'User not found');
  const clerkId = (rows[0] as any).clerk_id;
  if (!clerkId) {
    throw new HttpError(409, 'This user has never signed in yet, so there is no Clerk account to set a password on.');
  }

  await getClerkClient().users.updateUser(clerkId, { password, signOutOfOtherSessions: true });
  res.status(200).json({ ok: true });
});
