// Thin client for the /api/* Vercel serverless functions backed by Neon.
// Replaces direct supabase.from(...) calls now that Neon has no RLS - all
// authorization happens server-side in the API routes using the Clerk token.

const API_BASE = '/api';

type RequestOptions = {
  method?: string;
  body?: any;
  token?: string | null;
};

async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { method = 'GET', body, token } = options;

  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  const contentType = res.headers.get('content-type') || '';

  if (!res.ok) {
    let message = `Request failed (${res.status})`;
    try {
      if (contentType.includes('application/json')) {
        const errBody = await res.json();
        if (errBody?.error) message = errBody.error;
      } else {
        const text = await res.text();
        if (text && !text.startsWith('<!DOCTYPE') && !text.startsWith('<html')) {
          message = text.slice(0, 150);
        }
      }
    } catch {
      // response wasn't parseable
    }
    throw new Error(message);
  }

  if (res.status === 204) return undefined as T;
  if (!contentType.includes('application/json')) {
    throw new Error(`Invalid server response format (${contentType || 'non-JSON'})`);
  }
  return res.json();
}

export type AdminUserDto = {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'instructor' | 'staff' | 'admin';
  linked: boolean;
  banned: boolean;
  created_at: string;
};

export const api = {
  me: (token: string) => request<{ id: string; email: string; name: string; role: string }>('/me', { token }),
  courses: {
    list: (token?: string | null) => request<any[]>('/courses', { token }),
    get: (id: string, token?: string | null) => request<any>(`/courses/${id}`, { token }),
    create: (data: any, token: string) => request<any>('/courses', { method: 'POST', body: data, token }),
    update: (id: string, data: any, token: string) =>
      request<any>(`/courses/${id}`, { method: 'PATCH', body: data, token }),
    remove: (id: string, token: string) => request<void>(`/courses/${id}`, { method: 'DELETE', token }),
  },
  modules: {
    create: (data: any, token: string) => request<any>('/modules', { method: 'POST', body: data, token }),
    update: (id: string, data: any, token: string) =>
      request<any>(`/modules/${id}`, { method: 'PATCH', body: data, token }),
    remove: (id: string, token: string) => request<void>(`/modules/${id}`, { method: 'DELETE', token }),
  },
  lessons: {
    create: (data: any, token: string) => request<any>('/lessons', { method: 'POST', body: data, token }),
    update: (id: string, data: any, token: string) =>
      request<any>(`/lessons/${id}`, { method: 'PATCH', body: data, token }),
    remove: (id: string, token: string) => request<void>(`/lessons/${id}`, { method: 'DELETE', token }),
  },
  enrollments: {
    mine: (token: string) => request<any[]>('/enrollments', { token }),
    enroll: (courseId: string, token: string) =>
      request<any>('/enrollments', { method: 'POST', body: { course_id: courseId }, token }),
  },
  progress: {
    forCourse: (courseId: string, token: string) =>
      request<{ completed_lesson_ids: string[] }>(`/progress?course_id=${courseId}`, { token }),
    markComplete: (lessonId: string, token: string) =>
      request<any>('/progress', { method: 'POST', body: { lesson_id: lessonId }, token }),
  },
  instructor: {
    courses: (token: string) => request<any[]>('/instructor/courses', { token }),
  },
  admin: {
    users: {
      list: (token: string) => request<AdminUserDto[]>('/admin/users', { token }),
      create: (
        data: { name: string; email: string; role: string; password: string },
        token: string
      ) => request<AdminUserDto>('/admin/users', { method: 'POST', body: data, token }),
      update: (id: string, data: { name?: string; role?: string }, token: string) =>
        request<AdminUserDto>(`/admin/users/${id}`, { method: 'PATCH', body: data, token }),
      remove: (id: string, token: string) => request<void>(`/admin/users/${id}`, { method: 'DELETE', token }),
      setPassword: (id: string, password: string, token: string) =>
        request<{ ok: true }>(`/admin/users/${id}/password`, { method: 'POST', body: { password }, token }),
      ban: (id: string, token: string) =>
        request<{ ok: true; banned: true }>(`/admin/users/${id}/ban`, { method: 'POST', token }),
      unban: (id: string, token: string) =>
        request<{ ok: true; banned: false }>(`/admin/users/${id}/unban`, { method: 'POST', token }),
    },
  },
};
