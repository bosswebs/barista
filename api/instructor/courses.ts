import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getSql } from '../_lib/db';
import { requireUser, requireAdminOrInstructor } from '../_lib/auth';
import { courseToDto } from '../_lib/dto';
import { withHandler, methodNotAllowed } from '../_lib/http';

export default withHandler(async (req: VercelRequest, res: VercelResponse) => {
  if (req.method !== 'GET') {
    methodNotAllowed(res, ['GET']);
    return;
  }

  const user = await requireUser(req);
  requireAdminOrInstructor(user);
  const sql = getSql();

  const rows = await sql`
    SELECT c.*, COUNT(e.id)::int AS student_count
    FROM courses c
    LEFT JOIN enrollments e ON e.course_id = c.id
    WHERE c.instructor_id = ${user.id}
    GROUP BY c.id
    ORDER BY c.created_at DESC
  `;

  const courses = rows.map((row: any) => ({ ...courseToDto(row), students: row.student_count }));
  res.status(200).json(courses);
});
