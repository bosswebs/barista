import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getSql } from '../_lib/db.js';
import { requireUser } from '../_lib/auth.js';
import { lessonToDto } from '../_lib/dto.js';
import { withHandler, methodNotAllowed, HttpError } from '../_lib/http.js';

async function assertOwnsLesson(sql: ReturnType<typeof getSql>, lessonId: number, userId: number, role: string) {
  const rows = await sql`
    SELECT c.instructor_id
    FROM lessons l
    JOIN modules m ON m.id = l.module_id
    JOIN courses c ON c.id = m.course_id
    WHERE l.id = ${lessonId}
  `;
  if (rows.length === 0) throw new HttpError(404, 'Lesson not found');
  const ownerId = (rows[0] as any).instructor_id;
  if (role !== 'admin' && ownerId !== userId) {
    throw new HttpError(403, 'You do not own this lesson');
  }
}

export default withHandler(async (req: VercelRequest, res: VercelResponse) => {
  const id = Number(req.query.id);
  if (!Number.isInteger(id)) throw new HttpError(400, 'Invalid lesson id');

  const user = await requireUser(req);
  const sql = getSql();
  await assertOwnsLesson(sql, id, user.id, user.role);

  if (req.method === 'PATCH') {
    const { title, content, video_url, order_index } = req.body || {};
    const updated = await sql`
      UPDATE lessons SET
        title = COALESCE(${title}, title),
        body = COALESCE(${content}, body),
        video_url = COALESCE(${video_url}, video_url),
        sort_order = COALESCE(${order_index}, sort_order)
      WHERE id = ${id}
      RETURNING *
    `;
    res.status(200).json(lessonToDto(updated[0]));
    return;
  }

  if (req.method === 'DELETE') {
    await sql`DELETE FROM lessons WHERE id = ${id}`;
    res.status(204).end();
    return;
  }

  methodNotAllowed(res, ['PATCH', 'DELETE']);
});
