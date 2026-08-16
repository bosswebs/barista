import { BookOpen, LayoutDashboard, Crown, type LucideIcon } from 'lucide-react';

export type Portal = {
  role: 'student' | 'instructor' | 'staff' | 'admin';
  title: string;
  href: string;
  icon: LucideIcon;
  description: string;
};

export const PORTALS: Portal[] = [
  {
    role: 'student',
    title: 'Student Portal',
    href: '/lms',
    icon: BookOpen,
    description: 'Track your enrolled courses, lesson progress, certificates, and job matches.',
  },
  {
    role: 'instructor',
    title: 'Instructor Portal',
    href: '/lms/instructor',
    icon: LayoutDashboard,
    description: 'Create and manage courses, modules, and lessons, and track your students.',
  },
  {
    role: 'admin',
    title: 'Admin Portal',
    href: '/lms/admin',
    icon: Crown,
    description: 'Oversee the entire academy: users, curriculum, certificates, jobs, and payments.',
  },
];

// admins see every portal; instructors see their own portal plus the student view
// (they're learners too); students see only their own.
export function getAvailablePortals(role?: string | null): Portal[] {
  if (role === 'admin') return PORTALS;
  if (role === 'instructor') return PORTALS.filter((p) => p.role !== 'admin');
  return PORTALS.filter((p) => p.role === 'student');
}
