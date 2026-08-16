import type { VercelRequest, VercelResponse } from '@vercel/node';

export class HttpError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

type Handler = (req: VercelRequest, res: VercelResponse) => Promise<void>;

// Wraps a route handler so thrown HttpErrors (and unexpected errors) become
// consistent JSON error responses instead of unhandled rejections.
export function withHandler(handler: Handler): Handler {
  return async (req, res) => {
    try {
      await handler(req, res);
    } catch (err: any) {
      if (err instanceof HttpError) {
        res.status(err.status).json({ error: err.message });
        return;
      }
      // Clerk backend SDK errors (e.g. pwned/weak password, duplicate email)
      // carry a human-readable reason - surface it instead of a bare 500.
      if (err?.clerkError && Array.isArray(err.errors) && err.errors.length > 0) {
        const message = err.errors.map((e: any) => e.longMessage || e.message).join(' ');
        res.status(422).json({ error: message });
        return;
      }
      console.error('Unhandled API error:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
}

export function methodNotAllowed(res: VercelResponse, allowed: string[]) {
  res.setHeader('Allow', allowed.join(', '));
  res.status(405).json({ error: `Method not allowed. Use: ${allowed.join(', ')}` });
}
