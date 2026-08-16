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
  if (id === caller.id) throw new HttpError(400, 'You cannot suspend your own account');

  const sql = getSql();
  const rows = await sql`SELECT clerk_id FROM users WHERE id = ${id}`;
  if (rows.length === 0) throw new HttpError(404, 'User not found');
  const clerkId = (rows[0] as any).clerk_id;
  if (!clerkId) throw new HttpError(409, 'This user has never signed in yet - nothing to suspend.');

  await getClerkClient().users.banUser(clerkId);
  res.status(200).json({ ok: true, banned: true });
});
