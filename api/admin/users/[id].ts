import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getSql } from '../../_lib/db.js';
import { requireUser, requireAdmin, getClerkClient } from '../../_lib/auth.js';
import { userToDto } from '../../_lib/dto.js';
import { withHandler, methodNotAllowed, HttpError } from '../../_lib/http.js';

const VALID_ROLES = ['student', 'instructor', 'staff', 'admin'];

export default withHandler(async (req: VercelRequest, res: VercelResponse) => {
  const caller = await requireUser(req);
  requireAdmin(caller);

  const id = Number(req.query.id);
  if (!Number.isInteger(id)) throw new HttpError(400, 'Invalid user id');

  const sql = getSql();
  const rows = await sql`SELECT * FROM users WHERE id = ${id}`;
  if (rows.length === 0) throw new HttpError(404, 'User not found');
  const target = rows[0] as any;

  if (req.method === 'PATCH') {
    const { name, role } = req.body || {};
    if (role && !VALID_ROLES.includes(role)) {
      throw new HttpError(400, `role must be one of: ${VALID_ROLES.join(', ')}`);
    }

    const updated = await sql`
      UPDATE users SET
        name = COALESCE(${name}, name),
        role = COALESCE(${role}, role)
      WHERE id = ${id}
      RETURNING *
    `;

    if (name && target.clerk_id) {
      const [firstName, ...rest] = String(name).trim().split(' ');
      await getClerkClient()
        .users.updateUser(target.clerk_id, { firstName, lastName: rest.join(' ') || undefined })
        .catch(() => {});
    }

    res.status(200).json(userToDto(updated[0]));
    return;
  }

  if (req.method === 'DELETE') {
    if (target.id === caller.id) {
      throw new HttpError(400, 'You cannot delete your own account');
    }

    try {
      await sql`DELETE FROM users WHERE id = ${id}`;
    } catch (err: any) {
      if (err?.code === '23503') {
        throw new HttpError(409, 'This user still owns courses. Reassign or delete those courses first.');
      }
      throw err;
    }

    if (target.clerk_id) {
      await getClerkClient().users.deleteUser(target.clerk_id).catch(() => {});
    }
    res.status(204).end();
    return;
  }

  methodNotAllowed(res, ['PATCH', 'DELETE']);
});
