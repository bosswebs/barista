import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getSql } from '../_lib/db';
import { requireUser } from '../_lib/auth';
import { moduleToDto } from '../_lib/dto';
import { withHandler, methodNotAllowed, HttpError } from '../_lib/http';

export default withHandler(async (req: VercelRequest, res: VercelResponse) => {
  if (req.method !== 'POST') {
    methodNotAllowed(res, ['POST']);
    return;
  }

  const user = await requireUser(req);
  const sql = getSql();

  const { course_id, title } = req.body || {};
  const courseId = Number(course_id);
  if (!Number.isInteger(courseId) || !title) {
    throw new HttpError(400, 'course_id and title are required');
  }

  const courseRows = await sql`SELECT instructor_id FROM courses WHERE id = ${courseId}`;
  if (courseRows.length === 0) throw new HttpError(404, 'Course not found');
  const ownerId = (courseRows[0] as any).instructor_id;
  if (user.role !== 'admin' && ownerId !== user.id) {
    throw new HttpError(403, 'You do not own this course');
  }

  const nextOrder = await sql`
    SELECT COALESCE(MAX(sort_order), 0) + 1 AS next FROM modules WHERE course_id = ${courseId}
  `;

  const created = await sql`
    INSERT INTO modules (course_id, title, sort_order)
    VALUES (${courseId}, ${title}, ${(nextOrder[0] as any).next})
    RETURNING *
  `;

  res.status(201).json(moduleToDto(created[0]));
});
