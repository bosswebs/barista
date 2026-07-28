import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getSql } from '../_lib/db';
import { requireUser } from '../_lib/auth';
import { withHandler, methodNotAllowed, HttpError } from '../_lib/http';

export default withHandler(async (req: VercelRequest, res: VercelResponse) => {
  const user = await requireUser(req);
  const sql = getSql();

  if (req.method === 'GET') {
    const courseId = Number(req.query.course_id);
    if (!Number.isInteger(courseId)) throw new HttpError(400, 'course_id query param is required');

    const rows = await sql`
      SELECT lp.lesson_id
      FROM lesson_progress lp
      JOIN lessons l ON l.id = lp.lesson_id
      JOIN modules m ON m.id = l.module_id
      WHERE lp.user_id = ${user.id} AND m.course_id = ${courseId}
    `;
    res.status(200).json({ completed_lesson_ids: rows.map((r: any) => String(r.lesson_id)) });
    return;
  }

  if (req.method === 'POST') {
    const { lesson_id } = req.body || {};
    const lessonId = Number(lesson_id);
    if (!Number.isInteger(lessonId)) throw new HttpError(400, 'lesson_id is required');

    const existing = await sql`
      SELECT id FROM lesson_progress WHERE user_id = ${user.id} AND lesson_id = ${lessonId}
    `;
    if (existing.length === 0) {
      await sql`
        INSERT INTO lesson_progress (user_id, lesson_id, completed_at)
        VALUES (${user.id}, ${lessonId}, to_char(now(), 'YYYY-MM-DD HH24:MI:SS'))
      `;
    }

    res.status(200).json({ lesson_id: String(lessonId), completed: true });
    return;
  }

  methodNotAllowed(res, ['GET', 'POST']);
});
