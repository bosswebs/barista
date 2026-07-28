import type { VercelRequest } from '@vercel/node';
import { createClerkClient, verifyToken } from '@clerk/backend';
import { getSql } from './db.js';
import { HttpError } from './http.js';

export type AuthedUser = {
  id: number;
  clerkId: string;
  email: string;
  name: string;
  role: string;
};

function getSecretKey(): string {
  const key = process.env.CLERK_SECRET_KEY;
  if (!key) throw new Error('CLERK_SECRET_KEY is not set');
  return key;
}

// Verifies the caller's Clerk session JWT and resolves it to a row in our
// own `users` table (creating or linking one on first sight), so route
// handlers can enforce ownership with plain SQL instead of relying on RLS
// (Neon has none enabled).
export async function requireUser(req: VercelRequest): Promise<AuthedUser> {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
  if (!token) {
    throw new HttpError(401, 'Missing Authorization header');
  }

  const secretKey = getSecretKey();
  let clerkId: string;
  try {
    const claims = await verifyToken(token, { secretKey });
    clerkId = claims.sub;
  } catch {
    throw new HttpError(401, 'Invalid or expired session');
  }

  const sql = getSql();

  const existing = await sql`
    SELECT id, clerk_id, email, name, role FROM users WHERE clerk_id = ${clerkId}
  `;
  if (existing.length > 0) {
    const row = existing[0] as any;
    return { id: row.id, clerkId: row.clerk_id, email: row.email, name: row.name, role: row.role };
  }

  // First request from this identity - fetch the profile from Clerk and
  // either link it to a pre-existing legacy row (matched by email) or create one.
  const clerkClient = createClerkClient({ secretKey });
  const clerkUser = await clerkClient.users.getUser(clerkId);
  const email =
    clerkUser.primaryEmailAddress?.emailAddress || clerkUser.emailAddresses[0]?.emailAddress || '';
  const name = [clerkUser.firstName, clerkUser.lastName].filter(Boolean).join(' ') || email || 'BBA Student';

  if (email) {
    const byEmail = await sql`
      SELECT id FROM users WHERE email = ${email} AND clerk_id IS NULL
    `;
    if (byEmail.length > 0) {
      const updated = await sql`
        UPDATE users SET clerk_id = ${clerkId}, name = ${name}
        WHERE id = ${(byEmail[0] as any).id}
        RETURNING id, clerk_id, email, name, role
      `;
      const row = updated[0] as any;
      return { id: row.id, clerkId: row.clerk_id, email: row.email, name: row.name, role: row.role };
    }
  }

  const created = await sql`
    INSERT INTO users (clerk_id, name, email, role, created_at)
    VALUES (${clerkId}, ${name}, ${email}, 'student', to_char(now(), 'YYYY-MM-DD HH24:MI:SS'))
    RETURNING id, clerk_id, email, name, role
  `;
  const row = created[0] as any;
  return { id: row.id, clerkId: row.clerk_id, email: row.email, name: row.name, role: row.role };
}

// Best-effort auth: returns null instead of throwing when no/invalid token is
// present, for public endpoints that only need to know the caller if signed in.
export async function optionalUser(req: VercelRequest): Promise<AuthedUser | null> {
  if (!req.headers.authorization) return null;
  try {
    return await requireUser(req);
  } catch {
    return null;
  }
}

export function requireAdminOrInstructor(user: AuthedUser) {
  if (user.role !== 'admin' && user.role !== 'instructor') {
    throw new HttpError(403, 'Instructor or admin role required');
  }
}
