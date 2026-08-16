// Maps Neon's live column names (courses.image/instructor/price text,
// modules.sort_order, lessons.body/minutes/sort_order) to the shape the
// frontend already expects (image_url, instructor_name, order_index, content),
// so page components need minimal changes when switching off Supabase.

export function parsePrice(price: string | null | undefined): number {
  if (!price) return 0;
  const trimmed = price.trim();
  if (trimmed === '' || /^free$/i.test(trimmed)) return 0;
  const numeric = parseFloat(trimmed.replace(/[^0-9.]/g, ''));
  return Number.isFinite(numeric) ? numeric : 0;
}

export function courseToDto(row: any) {
  return {
    id: String(row.id),
    title: row.title,
    description: row.description,
    image_url: row.image,
    instructor_name: row.instructor || 'BBA Instructor',
    instructor_id: row.instructor_id != null ? String(row.instructor_id) : null,
    level: row.level,
    difficulty: row.level,
    duration: row.duration,
    price: parsePrice(row.price),
    capacity: row.capacity,
    status: row.status,
    created_at: row.created_at,
  };
}

export function moduleToDto(row: any) {
  return {
    id: String(row.id),
    course_id: row.course_id != null ? String(row.course_id) : undefined,
    title: row.title,
    order_index: row.sort_order,
  };
}

export function lessonToDto(row: any) {
  return {
    id: String(row.id),
    module_id: row.module_id != null ? String(row.module_id) : undefined,
    title: row.title,
    content: row.body,
    video_url: row.video_url,
    order_index: row.sort_order,
    minutes: row.minutes,
  };
}

export function userToDto(row: any, banned = false) {
  return {
    id: String(row.id),
    name: row.name,
    email: row.email,
    role: row.role,
    linked: row.clerk_id != null,
    banned,
    created_at: row.created_at,
  };
}
