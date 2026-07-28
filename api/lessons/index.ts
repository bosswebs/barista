import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getSql } from '../_lib/db.js';
import { requireUser } from '../_lib/auth.js';
import { lessonToDto } from '../_lib/dto.js';
import { withHandler, methodNotAllowed, HttpError } from '../_lib/http.js';

export default withHandler(async (req: VercelRequest, res: VercelResponse) => {
  if (req.method !== 'POST') {
    methodNotAllowed(res, ['POST']);
    return;
  }

  const user = await requireUser(req);
  const sql = getSql();

  const { module_id, title, content, video_url } = req.body || {};
  const moduleId = Number(module_id);
  if (!Number.isInteger(moduleId) || !title) {
    throw new HttpError(400, 'module_id and title are required');
  }

  const ownerRows = await sql`
    SELECT c.instructor_id FROM modules m JOIN courses c ON c.id = m.course_id WHERE m.id = ${moduleId}
  `;
  if (ownerRows.length === 0) throw new HttpError(404, 'Module not found');
  const ownerId = (ownerRows[0] as any).instructor_id;
  if (user.role !== 'admin' && ownerId !== user.id) {
    throw new HttpError(403, 'You do not own this module');
  }

  const nextOrder = await sql`
    SELECT COALESCE(MAX(sort_order), 0) + 1 AS next FROM lessons WHERE module_id = ${moduleId}
  `;

  const created = await sql`
    INSERT INTO lessons (module_id, title, body, video_url, minutes, sort_order)
    VALUES (${moduleId}, ${title}, ${content || null}, ${video_url || null}, 10, ${(nextOrder[0] as any).next})
    RETURNING *
  `;

  res.status(201).json(lessonToDto(created[0]));
});
