import type { Plugin, ViteDevServer } from 'vite';
import path from 'path';
import dotenv from 'dotenv';

// Load environment variables for Node.js process (serverless functions in dev)
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

interface RouteEntry {
  pattern: RegExp;
  filePath: string;
  paramNames: string[];
}

const routes: RouteEntry[] = [
  // Me
  { pattern: /^\/api\/me\/?$/, filePath: '/api/me.ts', paramNames: [] },

  // Instructor
  { pattern: /^\/api\/instructor\/courses\/?$/, filePath: '/api/instructor/courses.ts', paramNames: [] },

  // Admin users sub-routes
  { pattern: /^\/api\/admin\/users\/([^/]+)\/password\/?$/, filePath: '/api/admin/users/[id]/password.ts', paramNames: ['id'] },
  { pattern: /^\/api\/admin\/users\/([^/]+)\/ban\/?$/, filePath: '/api/admin/users/[id]/ban.ts', paramNames: ['id'] },
  { pattern: /^\/api\/admin\/users\/([^/]+)\/unban\/?$/, filePath: '/api/admin/users/[id]/unban.ts', paramNames: ['id'] },
  { pattern: /^\/api\/admin\/users\/([^/]+)\/?$/, filePath: '/api/admin/users/[id].ts', paramNames: ['id'] },
  { pattern: /^\/api\/admin\/users\/?$/, filePath: '/api/admin/users/index.ts', paramNames: [] },

  // Courses
  { pattern: /^\/api\/courses\/([^/]+)\/?$/, filePath: '/api/courses/[id].ts', paramNames: ['id'] },
  { pattern: /^\/api\/courses\/?$/, filePath: '/api/courses/index.ts', paramNames: [] },

  // Modules
  { pattern: /^\/api\/modules\/([^/]+)\/?$/, filePath: '/api/modules/[id].ts', paramNames: ['id'] },
  { pattern: /^\/api\/modules\/?$/, filePath: '/api/modules/index.ts', paramNames: [] },

  // Lessons
  { pattern: /^\/api\/lessons\/([^/]+)\/?$/, filePath: '/api/lessons/[id].ts', paramNames: ['id'] },
  { pattern: /^\/api\/lessons\/?$/, filePath: '/api/lessons/index.ts', paramNames: [] },

  // Enrollments
  { pattern: /^\/api\/enrollments\/?$/, filePath: '/api/enrollments/index.ts', paramNames: [] },

  // Progress
  { pattern: /^\/api\/progress\/?$/, filePath: '/api/progress/index.ts', paramNames: [] },
];

export function apiDevPlugin(): Plugin {
  return {
    name: 'vite-plugin-vercel-api',
    configureServer(server: ViteDevServer) {
      server.middlewares.use(async (req, res, next) => {
        const rawUrl = req.url || '';
        if (!rawUrl.startsWith('/api')) {
          return next();
        }

        const [urlPath, queryString] = rawUrl.split('?');
        const queryParams = new URLSearchParams(queryString || '');
        const queryObj: Record<string, string> = {};
        for (const [key, value] of queryParams.entries()) {
          queryObj[key] = value;
        }

        // Find matching route
        let matchedRoute: RouteEntry | null = null;
        const pathParams: Record<string, string> = {};

        for (const route of routes) {
          const match = urlPath.match(route.pattern);
          if (match) {
            matchedRoute = route;
            route.paramNames.forEach((name, i) => {
              pathParams[name] = decodeURIComponent(match[i + 1]);
            });
            break;
          }
        }

        if (!matchedRoute) {
          res.statusCode = 404;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: `API route not found: ${urlPath}` }));
          return;
        }

        try {
          // Read request body if present
          let body: any = undefined;
          if (req.method !== 'GET' && req.method !== 'HEAD') {
            const chunks: Buffer[] = [];
            for await (const chunk of req) {
              chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
            }
            const rawBody = Buffer.concat(chunks).toString('utf-8');
            if (rawBody) {
              try {
                body = JSON.parse(rawBody);
              } catch {
                body = rawBody;
              }
            }
          }

          // Mock VercelRequest and VercelResponse
          const vercelReq = Object.assign(req, {
            query: { ...queryObj, ...pathParams },
            body,
            cookies: {},
          });

          const vercelRes = Object.assign(res, {
            status(code: number) {
              res.statusCode = code;
              return vercelRes;
            },
            json(jsonBody: any) {
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify(jsonBody));
              return vercelRes;
            },
            send(content: any) {
              if (typeof content === 'object') {
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(content));
              } else {
                res.end(content);
              }
              return vercelRes;
            },
          });

          // Dynamically load module with Vite's ssrLoadModule
          const absPath = path.resolve(process.cwd(), matchedRoute.filePath.replace(/^\//, ''));
          const mod = await server.ssrLoadModule(absPath);
          const handler = mod.default;

          if (typeof handler !== 'function') {
            throw new Error(`Route ${matchedRoute.filePath} does not export a default handler function`);
          }

          await handler(vercelReq, vercelRes);
        } catch (err: any) {
          console.error(`[API Error] ${req.method} ${rawUrl}:`, err);
          if (!res.headersSent) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: err.message || 'Internal Server Error' }));
          }
        }
      });
    },
  };
}
