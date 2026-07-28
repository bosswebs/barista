import type { VercelRequest, VercelResponse } from '@vercel/node';
import { requireUser } from './_lib/auth.js';
import { withHandler, methodNotAllowed } from './_lib/http.js';

// Returns the authoritative profile (including role) for the caller's Clerk
// session, resolved server-side against Neon's users table. The client can't
// trust Clerk's publicMetadata for role since nothing sets it there - this is
// the source of truth used for role-gating the Student/Instructor/Admin portals.
export default withHandler(async (req: VercelRequest, res: VercelResponse) => {
  if (req.method !== 'GET') {
    methodNotAllowed(res, ['GET']);
    return;
  }

  const user = await requireUser(req);
  res.status(200).json({
    id: String(user.id),
    email: user.email,
    name: user.name,
    role: user.role,
  });
});
