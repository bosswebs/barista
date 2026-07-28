import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getSql } from '../_lib/db';
import { requireUser } from '../_lib/auth';
import { moduleToDto } from '../_lib/dto';
import { withHandler, methodNotAllowed, HttpError } from '../_lib/http';

async function assertOwnsModule(sql: ReturnType<typeof getSql>, moduleId: number, userId: number, role: string) {
  const rows = await sql`
    SELECT c.instructor_id FROM modules m JOIN courses c ON c.id = m.course_id WHERE m.id = ${moduleId}
  `;
  if (rows.length === 0) throw new HttpError(404, 'Module not found');
  const ownerId = (rows[0] as any).instructor_id;
  if (role !== 'admin' && ownerId !== userId) {
    throw new HttpError(403, 'You do not own this module');
  }
}

export default withHandler(async (req: VercelRequest, res: VercelResponse) => {
  const id = Number(req.query.id);
  if (!Number.isInteger(id)) throw new HttpError(400, 'Invalid module id');

  const user = await requireUser(req);
  const sql = getSql();
  await assertOwnsModule(sql, id, user.id, user.role);

  if (req.method === 'PATCH') {
    const { title, order_index } = req.body || {};
    const updated = await sql`
      UPDATE modules SET
        title = COALESCE(${title}, title),
        sort_order = COALESCE(${order_index}, sort_order)
      WHERE id = ${id}
      RETURNING *
    `;
    res.status(200).json(moduleToDto(updated[0]));
    return;
  }

  if (req.method === 'DELETE') {
    await sql`DELETE FROM modules WHERE id = ${id}`;
    res.status(204).end();
    return;
  }

  methodNotAllowed(res, ['PATCH', 'DELETE']);
});
