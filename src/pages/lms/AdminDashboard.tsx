import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Users, BookOpen, DollarSign, Award, Settings, BarChart2, Plus, Search, Filter, ShieldCheck } from 'lucide-react';

const mockStudents = [
  { id: '1', name: 'Marie Uwase', email: 'marie@example.com', role: 'Student', enrolled: 4, completed: 2, status: 'Active' },
  { id: '2', name: 'Emmanuel Nkusi', email: 'emmanuel@example.com', role: 'Student', enrolled: 3, completed: 3, status: 'Active' },
  { id: '3', name: 'Fatou Diallo', email: 'fatou@example.com', role: 'Instructor', enrolled: 6, completed: 5, status: 'Active' },
  { id: '4', name: 'Jean-Paul N.', email: 'jp@example.com', role: 'Super Admin', enrolled: 12, completed: 12, status: 'Active' },
];

const mockCourses = [
  { id: 'c1', title: 'Professional Barista Mastery', category: 'Barista', price: '$0 (Free)', enrolled: 342, status: 'Published' },
  { id: 'c2', title: 'Advanced Mixology & Cocktail Arts', category: 'Bartending', price: '$49', enrolled: 218, status: 'Published' },
  { id: 'c3', title: 'Wine Sommelier Certification', category: 'Sommelier', price: '$79', enrolled: 156, status: 'Published' },
];

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'students' | 'courses' | 'payments'>('overview');
  const [search, setSearch] = useState('');

  return (
    <Layout>
      <div className="min-h-screen bg-lms-bg pt-24 pb-16">
        <div className="container-custom">
          {/* Header */}
          <div className="bg-lms-dark text-white rounded-3xl p-8 mb-8 shadow-xl">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <span className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 text-lms-secondary rounded-full text-xs font-inter mb-2">
                  <ShieldCheck size={14} /> Admin Portal
                </span>
                <h1 className="font-cormorant text-4xl font-bold">Academy Management System</h1>
                <p className="text-white/70 font-inter text-sm mt-1">Manage users, content, revenue, and platform analytics.</p>
              </div>

              <div className="flex gap-3">
                <button className="lms-btn-secondary text-sm py-2.5 flex items-center gap-2">
                  <Plus size={16} /> Add User
                </button>
                <button className="lms-btn-accent text-sm py-2.5 flex items-center gap-2">
                  <Settings size={16} /> Site Settings
                </button>
              </div>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {[
              { label: 'Total Students', value: '2,540', change: '+12% this month', icon: Users, color: 'text-blue-600 bg-blue-50' },
              { label: 'Active Courses', value: '18', change: '3 drafted', icon: BookOpen, color: 'text-teal-600 bg-teal-50' },
              { label: 'Certificates Issued', value: '1,890', change: '94% pass rate', icon: Award, color: 'text-amber-600 bg-amber-50' },
              { label: 'Total Revenue', value: '$24,650', change: '+18% vs last month', icon: DollarSign, color: 'text-emerald-600 bg-emerald-50' },
            ].map(({ label, value, change, icon: Icon, color }) => (
              <div key={label} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
                <div className={`w-14 h-14 rounded-2xl ${color} flex items-center justify-center shrink-0`}>
                  <Icon size={26} />
                </div>
                <div>
                  <p className="text-xs font-inter text-gray-400 uppercase tracking-wider">{label}</p>
                  <h3 className="font-cormorant font-bold text-2xl text-lms-dark">{value}</h3>
                  <p className="text-xs font-inter text-emerald-600 mt-0.5">{change}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div className="flex border-b border-gray-200 mb-6 font-inter text-sm">
            {[
              { id: 'overview', label: 'Overview', icon: BarChart2 },
              { id: 'students', label: 'Users & Roles', icon: Users },
              { id: 'courses', label: 'Courses Management', icon: BookOpen },
              { id: 'payments', label: 'Transactions', icon: DollarSign },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 py-3 px-6 font-semibold border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-lms-primary text-lms-primary bg-white/50 rounded-t-xl'
                    : 'border-transparent text-gray-500 hover:text-gray-800'
                }`}
              >
                <tab.icon size={16} />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Contents */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <h3 className="font-cormorant text-2xl font-bold text-lms-dark mb-4">Enrollment Growth</h3>
                <div className="h-64 bg-gray-50 rounded-xl border border-dashed border-gray-200 flex items-center justify-center text-gray-400 font-inter text-sm">
                  [ Enrollment Analytics Chart Placeholder ]
                </div>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <h3 className="font-cormorant text-2xl font-bold text-lms-dark mb-4">Recent System Logs</h3>
                <div className="space-y-4 font-inter text-xs">
                  <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                    <p className="font-semibold text-gray-800">User Enrollment</p>
                    <p className="text-gray-500">Marie Uwase enrolled in Barista Mastery.</p>
                    <span className="text-gray-400 text-[10px]">10 mins ago</span>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                    <p className="font-semibold text-gray-800">Certificate Generated</p>
                    <p className="text-gray-500">Certificate BBA-2026-001 issued.</p>
                    <span className="text-gray-400 text-[10px]">1 hour ago</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'students' && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                <div className="relative w-72">
                  <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search users..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 rounded-xl border border-gray-200 text-sm font-inter focus:outline-none focus:ring-2 focus:ring-lms-primary"
                  />
                </div>
                <button className="flex items-center gap-1 text-sm font-inter text-gray-600 hover:text-lms-primary">
                  <Filter size={16} /> Filter
                </button>
              </div>
              <table className="w-full text-left font-inter text-sm">
                <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                  <tr>
                    <th className="p-4">User</th>
                    <th className="p-4">Role</th>
                    <th className="p-4">Courses Enrolled</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {mockStudents.map((s) => (
                    <tr key={s.id} className="hover:bg-gray-50 transition-colors">
                      <td className="p-4">
                        <p className="font-semibold text-gray-900">{s.name}</p>
                        <p className="text-xs text-gray-400">{s.email}</p>
                      </td>
                      <td className="p-4">
                        <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700">
                          {s.role}
                        </span>
                      </td>
                      <td className="p-4">{s.enrolled} Courses</td>
                      <td className="p-4">
                        <span className="badge-free">{s.status}</span>
                      </td>
                      <td className="p-4 text-right">
                        <button className="text-lms-primary hover:underline text-xs font-semibold">Manage</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'courses' && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <table className="w-full text-left font-inter text-sm">
                <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                  <tr>
                    <th className="p-4">Course Title</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Price</th>
                    <th className="p-4">Students</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {mockCourses.map((c) => (
                    <tr key={c.id} className="hover:bg-gray-50 transition-colors">
                      <td className="p-4 font-semibold text-gray-900">{c.title}</td>
                      <td className="p-4 text-gray-500">{c.category}</td>
                      <td className="p-4 font-semibold text-lms-primary">{c.price}</td>
                      <td className="p-4">{c.enrolled}</td>
                      <td className="p-4"><span className="badge-new">{c.status}</span></td>
                      <td className="p-4 text-right">
                        <button className="text-lms-primary hover:underline text-xs font-semibold">Edit</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'payments' && (
            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm text-center">
              <DollarSign size={40} className="text-gray-300 mx-auto mb-3" />
              <h3 className="font-cormorant text-2xl font-bold text-gray-700">Payment Gateways & Invoices</h3>
              <p className="text-gray-500 font-inter text-sm max-w-md mx-auto mt-1">
                Flutterwave and Stripe sync logs will display here. All transactions are logged securely via Supabase webhook triggers.
              </p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
