import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getSql } from '../_lib/db';
import { requireUser } from '../_lib/auth';
import { courseToDto } from '../_lib/dto';
import { withHandler, methodNotAllowed, HttpError } from '../_lib/http';

export default withHandler(async (req: VercelRequest, res: VercelResponse) => {
  const user = await requireUser(req);
  const sql = getSql();

  if (req.method === 'GET') {
    const rows = await sql`
      SELECT
        e.id AS enrollment_id, e.created_at AS enrolled_at,
        c.*,
        COUNT(DISTINCT l.id)::int AS total_lessons,
        COUNT(DISTINCT lp.id)::int AS completed_lessons
      FROM enrollments e
      JOIN courses c ON c.id = e.course_id
      LEFT JOIN modules m ON m.course_id = c.id
      LEFT JOIN lessons l ON l.module_id = m.id
      LEFT JOIN lesson_progress lp ON lp.lesson_id = l.id AND lp.user_id = e.user_id
      WHERE e.user_id = ${user.id}
      GROUP BY e.id, c.id
      ORDER BY e.created_at DESC
    `;

    const enrollments = rows.map((row: any) => ({
      ...courseToDto(row),
      enrollment_id: String(row.enrollment_id),
      enrolled_at: row.enrolled_at,
      progress: row.total_lessons > 0 ? Math.round((row.completed_lessons / row.total_lessons) * 100) : 0,
    }));

    res.status(200).json(enrollments);
    return;
  }

  if (req.method === 'POST') {
    const { course_id } = req.body || {};
    const courseId = Number(course_id);
    if (!Number.isInteger(courseId)) throw new HttpError(400, 'course_id is required');

    const existing = await sql`
      SELECT id FROM enrollments WHERE user_id = ${user.id} AND course_id = ${courseId}
    `;
    if (existing.length > 0) {
      res.status(200).json({ already_enrolled: true });
      return;
    }

    await sql`
      INSERT INTO enrollments (user_id, course_id, status, created_at)
      VALUES (${user.id}, ${courseId}, 'active', to_char(now(), 'YYYY-MM-DD HH24:MI:SS'))
    `;
    res.status(201).json({ enrolled: true });
    return;
  }

  methodNotAllowed(res, ['GET', 'POST']);
});
