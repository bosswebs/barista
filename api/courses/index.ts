import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getSql } from '../_lib/db';
import { optionalUser, requireUser, requireAdminOrInstructor } from '../_lib/auth';
import { courseToDto } from '../_lib/dto';
import { withHandler, methodNotAllowed, HttpError } from '../_lib/http';

function slugify(title: string): string {
  const base = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  return `${base || 'course'}-${Math.random().toString(36).slice(2, 8)}`;
}

export default withHandler(async (req: VercelRequest, res: VercelResponse) => {
  const sql = getSql();

  if (req.method === 'GET') {
    const caller = await optionalUser(req);

    const rows = await sql`
      SELECT c.*, COUNT(e.id)::int AS student_count
      FROM courses c
      LEFT JOIN enrollments e ON e.course_id = c.id
      WHERE c.status = 'active'
      GROUP BY c.id
      ORDER BY c.created_at DESC
    `;

    let enrolledIds = new Set<number>();
    if (caller) {
      const mine = await sql`SELECT course_id FROM enrollments WHERE user_id = ${caller.id}`;
      enrolledIds = new Set(mine.map((r: any) => r.course_id));
    }

    const courses = rows.map((row: any) => ({
      ...courseToDto(row),
      students: row.student_count,
      is_enrolled: enrolledIds.has(row.id),
    }));

    res.status(200).json(courses);
    return;
  }

  if (req.method === 'POST') {
    const user = await requireUser(req);
    requireAdminOrInstructor(user);

    const { title, description, image_url, level, duration, price, capacity } = req.body || {};
    if (!title || typeof title !== 'string') {
      throw new HttpError(400, 'title is required');
    }

    const created = await sql`
      INSERT INTO courses (slug, title, description, image, instructor, instructor_id, level, duration, price, capacity, status, created_at)
      VALUES (
        ${slugify(title)}, ${title}, ${description || null}, ${image_url || null},
        ${user.name}, ${user.id}, ${level || 'Beginner'}, ${duration || null},
        ${price != null ? String(price) : 'Free'}, ${capacity || 100}, 'active',
        to_char(now(), 'YYYY-MM-DD HH24:MI:SS')
      )
      RETURNING *
    `;

    res.status(201).json(courseToDto(created[0]));
    return;
  }

  methodNotAllowed(res, ['GET', 'POST']);
});
