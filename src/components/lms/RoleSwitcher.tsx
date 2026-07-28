import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ShieldAlert, ShieldCheck, UserCheck, GraduationCap, Eye, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

export type LMSUserRole = 'super_admin' | 'admin' | 'instructor' | 'student' | 'guest';

interface RoleSwitcherProps {
  currentRole: LMSUserRole;
  onRoleChange?: (role: LMSUserRole) => void;
}

export const RoleSwitcher: React.FC<RoleSwitcherProps> = ({ currentRole, onRoleChange }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const roles: { id: LMSUserRole; label: string; icon: any; color: string; path: string; desc: string }[] = [
    {
      id: 'super_admin',
      label: 'Super Admin',
      icon: ShieldAlert,
      color: 'bg-purple-600 text-white hover:bg-purple-700',
      path: '/lms/super-admin',
      desc: 'System config, multi-campus, security, integrations, backups, AI engine'
    },
    {
      id: 'admin',
      label: 'Admin',
      icon: ShieldCheck,
      color: 'bg-indigo-600 text-white hover:bg-indigo-700',
      path: '/lms/admin',
      desc: 'Faculties, departments, semesters, exams, invoices, CRM & HR'
    },
    {
      id: 'instructor',
      label: 'Instructor',
      icon: UserCheck,
      color: 'bg-teal-600 text-white hover:bg-teal-700',
      path: '/lms/instructor',
      desc: 'Course creation, AI generator, live classes, grading & attendance'
    },
    {
      id: 'student',
      label: 'Student',
      icon: GraduationCap,
      color: 'bg-emerald-600 text-white hover:bg-emerald-700',
      path: '/lms/student',
      desc: 'Course player, quizzes, gradebook, transcript, certificates & streaks'
    },
    {
      id: 'guest',
      label: 'Guest',
      icon: Eye,
      color: 'bg-amber-600 text-white hover:bg-amber-700',
      path: '/lms/guest',
      desc: 'Public catalog, free lesson previews, course application & pricing'
    }
  ];

  const handleSelectRole = (roleId: LMSUserRole, path: string) => {
    if (onRoleChange) {
      onRoleChange(roleId);
    }
    toast.success(`Switched role context to: ${roles.find(r => r.id === roleId)?.label}`);
    if (location.pathname !== path) {
      navigate(path);
    }
  };

  const activeRoleObj = roles.find(r => r.id === currentRole) || roles[3];

  return (
    <div className="bg-slate-900 border-b border-slate-800 text-white text-xs py-2 px-4 sticky top-0 z-50 shadow-md">
      <div className="container-custom flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1 bg-gradient-to-r from-teal-400 to-emerald-400 text-slate-950 font-bold px-2.5 py-0.5 rounded-full text-[10px] tracking-wide uppercase">
            <Sparkles size={12} /> RBAC Switcher
          </span>
          <span className="text-slate-300 font-medium hidden sm:inline">
            Evaluating as <strong className="text-white font-bold underline decoration-teal-400">{activeRoleObj.label}</strong>:
          </span>
          <span className="text-slate-400 text-[11px] truncate max-w-xs hidden xl:inline">
            {activeRoleObj.desc}
          </span>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto max-w-full pb-1 md:pb-0 scrollbar-none">
          {roles.map((role) => {
            const Icon = role.icon;
            const isActive = currentRole === role.id;
            return (
              <button
                key={role.id}
                onClick={() => handleSelectRole(role.id, role.path)}
                title={role.desc}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg font-semibold transition-all whitespace-nowrap text-[11px] ${
                  isActive
                    ? `${role.color} ring-2 ring-white/30 shadow-lg scale-105`
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
                }`}
              >
                <Icon size={13} />
                {role.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RoleSwitcher;
