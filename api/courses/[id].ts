import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getSql } from '../_lib/db';
import { requireUser } from '../_lib/auth';
import { courseToDto, moduleToDto, lessonToDto } from '../_lib/dto';
import { withHandler, methodNotAllowed, HttpError } from '../_lib/http';

async function assertOwnerOrAdmin(sql: ReturnType<typeof getSql>, courseId: number, userId: number, role: string) {
  const rows = await sql`SELECT instructor_id FROM courses WHERE id = ${courseId}`;
  if (rows.length === 0) throw new HttpError(404, 'Course not found');
  const ownerId = (rows[0] as any).instructor_id;
  if (role !== 'admin' && ownerId !== userId) {
    throw new HttpError(403, 'You do not own this course');
  }
}

export default withHandler(async (req: VercelRequest, res: VercelResponse) => {
  const id = Number(req.query.id);
  if (!Number.isInteger(id)) throw new HttpError(400, 'Invalid course id');
  const sql = getSql();

  if (req.method === 'GET') {
    const courseRows = await sql`SELECT * FROM courses WHERE id = ${id}`;
    if (courseRows.length === 0) throw new HttpError(404, 'Course not found');

    const moduleRows = await sql`
      SELECT * FROM modules WHERE course_id = ${id} ORDER BY sort_order
    `;
    const moduleIds = moduleRows.map((m: any) => m.id);
    const lessonRows = moduleIds.length
      ? await sql`SELECT * FROM lessons WHERE module_id = ANY(${moduleIds}) ORDER BY sort_order`
      : [];

    const modules = moduleRows.map((m: any) => ({
      ...moduleToDto(m),
      lessons: lessonRows.filter((l: any) => l.module_id === m.id).map(lessonToDto),
    }));

    res.status(200).json({ ...courseToDto(courseRows[0]), modules });
    return;
  }

  const user = await requireUser(req);
  await assertOwnerOrAdmin(sql, id, user.id, user.role);

  if (req.method === 'PATCH') {
    const { title, description, image_url, level, duration, price, status } = req.body || {};
    const updated = await sql`
      UPDATE courses SET
        title = COALESCE(${title}, title),
        description = COALESCE(${description}, description),
        image = COALESCE(${image_url}, image),
        level = COALESCE(${level}, level),
        duration = COALESCE(${duration}, duration),
        price = COALESCE(${price != null ? String(price) : null}, price),
        status = COALESCE(${status}, status)
      WHERE id = ${id}
      RETURNING *
    `;
    res.status(200).json(courseToDto(updated[0]));
    return;
  }

  if (req.method === 'DELETE') {
    await sql`DELETE FROM courses WHERE id = ${id}`;
    res.status(204).end();
    return;
  }

  methodNotAllowed(res, ['GET', 'PATCH', 'DELETE']);
});
