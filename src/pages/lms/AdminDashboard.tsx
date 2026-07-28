import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import {
  Users, BookOpen, DollarSign, Award, Settings, BarChart2, Plus, Search,
  Filter, ShieldCheck, Briefcase, Calendar, Rss, Edit3, Trash2, CheckCircle2,
  XCircle, Eye, Download, Send, Globe, Mail, Phone, Lock, ChevronRight, Crown,
  TrendingUp, Sparkles
} from 'lucide-react';
import { toast } from 'sonner';
import { BARISTA_CURRICULUM } from '@/data/baristaCurriculum';
import { ORIENTATION_CURRICULUM } from '@/data/orientationCurriculum';

// Initial Mock Data Stores
const initialUsers = [
  { id: 'u1', name: 'Marie Uwase', email: 'marie@example.com', role: 'Student', enrolled: 4, status: 'Active', joined: 'Jul 10, 2026' },
  { id: 'u2', name: 'Emmanuel Nkusi', email: 'emmanuel@example.com', role: 'Student', enrolled: 3, status: 'Active', joined: 'Jul 12, 2026' },
  { id: 'u3', name: 'Fatou Diallo', email: 'fatou@example.com', role: 'Instructor', enrolled: 8, status: 'Active', joined: 'Jun 01, 2026' },
  { id: 'u4', name: 'Jean-Paul Nkurunziza', email: 'jp@beyondbarista.rw', role: 'Super Admin', enrolled: 15, status: 'Active', joined: 'Jan 15, 2025' },
  { id: 'u5', name: 'Amina Kalisa', email: 'amina@example.com', role: 'Instructor', enrolled: 5, status: 'Active', joined: 'Mar 20, 2026' },
];

const initialCertificates = [
  { certNumber: 'BBA-2026-001', studentName: 'Marie Uwase', course: 'Professional Barista Mastery', grade: 'Distinction', score: '94%', issued: 'Jul 16, 2026' },
  { certNumber: 'BBA-2026-002', studentName: 'Emmanuel Nkusi', course: 'Advanced Mixology', grade: 'Merit', score: '88%', issued: 'Jul 18, 2026' },
  { certNumber: 'BBA-2026-003', studentName: 'Pascal Bizimana', course: 'HACCP Food Safety', grade: 'Distinction', score: '96%', issued: 'Jul 22, 2026' },
];

const initialJobs = [
  { id: 1, title: 'Head Barista', company: 'Kigali Marriott Hotel', location: 'Kigali', salary: '$600–$900/mo', status: 'Published', type: 'Full-time' },
  { id: 2, title: 'F&B Supervisor', company: 'Radisson Blu Kigali', location: 'Kigali', salary: '$800–$1200/mo', status: 'Published', type: 'Full-time' },
  { id: 3, title: 'Sommelier', company: 'Virunga Lodge', location: 'Musanze', salary: '$700–$1000/mo', status: 'Pending Review', type: 'Full-time' },
];

const initialEvents = [
  { id: 1, title: 'Coffee Brewing Masterclass', date: 'Aug 10, 2026', type: 'Workshop', spots: 15, registered: 8, location: 'Kigali Center' },
  { id: 2, title: 'Hospitality Career Fair 2026', date: 'Aug 22, 2026', type: 'Physical Event', spots: 200, registered: 145, location: 'Kigali Convention' },
  { id: 3, title: 'Wine & Food Pairing Webinar', date: 'Sep 05, 2026', type: 'Webinar', spots: 100, registered: 67, location: 'Zoom' },
];

const initialPosts = [
  { id: 1, title: 'Mastering Latte Art: A Complete Beginner\'s Guide', category: 'Coffee Guides', author: 'Chef Jean-Paul', views: 1240, status: 'Published' },
  { id: 2, title: 'The State of Hospitality Careers in Rwanda 2026', category: 'Career Advice', author: 'BBA Team', views: 980, status: 'Published' },
  { id: 3, title: '10 Cocktail Trends Dominating East Africa Bars', category: 'Hospitality', author: 'Master Émile', views: 850, status: 'Published' },
];

const initialTransactions = [
  { txId: 'TX-99812', user: 'Marie Uwase', plan: 'Premium Monthly', amount: '$29.00', gateway: 'Flutterwave MoMo', date: 'Jul 25, 2026', status: 'Successful' },
  { txId: 'TX-99813', user: 'Emmanuel Nkusi', plan: 'Premium Annual', amount: '$199.00', gateway: 'Stripe Card', date: 'Jul 26, 2026', status: 'Successful' },
  { txId: 'TX-99814', user: 'Fatou Diallo', plan: 'Wine Course Purchase', amount: '$79.00', gateway: 'PayPal', date: 'Jul 27, 2026', status: 'Successful' },
];

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'curriculum' | 'users' | 'certificates' | 'jobs' | 'events' | 'blog' | 'payments' | 'settings'>('overview');
  const [curriculumView, setCurriculumView] = useState<'orientation' | 'barista'>('orientation');
  const [search, setSearch] = useState('');
  
  // Data state
  const [users, setUsers] = useState(initialUsers);
  const [certificates, setCertificates] = useState(initialCertificates);
  const [jobsList, setJobsList] = useState(initialJobs);
  const [eventsList, setEventsList] = useState(initialEvents);
  const [postsList, setPostsList] = useState(initialPosts);
  const [transactions, setTransactions] = useState(initialTransactions);

  // Modals state
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'Student' });

  const [isAddCertOpen, setIsAddCertOpen] = useState(false);
  const [newCert, setNewCert] = useState({ studentName: '', course: 'Professional Barista Mastery', score: '95%', grade: 'Distinction' });

  const [isAddJobOpen, setIsAddJobOpen] = useState(false);
  const [newJob, setNewJob] = useState({ title: '', company: '', location: 'Kigali', salary: '$600/mo', type: 'Full-time' });

  const [isAddEventOpen, setIsAddEventOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({ title: '', date: '', type: 'Workshop', spots: 20, location: 'Kigali Center' });

  // Site Settings state
  const [siteSettings, setSiteSettings] = useState({
    institutionName: 'Beyond Barista Academy Rwanda',
    email: 'info.bba2025@gmail.com',
    phone: '+250 785 717 183',
    whatsapp: '+250 728 717 185',
    currency: 'USD ($)',
    themeColor: 'Coffee Brown (#5C3D2E)',
  });

  // Handlers
  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUser.name || !newUser.email) return toast.error("Please provide name and email.");
    const userObj = {
      id: `u-${Date.now()}`,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      enrolled: 1,
      status: 'Active',
      joined: 'Just now'
    };
    setUsers([userObj, ...users]);
    setIsAddUserOpen(false);
    setNewUser({ name: '', email: '', role: 'Student' });
    toast.success(`User ${userObj.name} added successfully!`);
  };

  const handleIssueCert = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCert.studentName) return toast.error("Please enter student name.");
    const certObj = {
      certNumber: `BBA-2026-${Math.floor(100 + Math.random() * 900)}`,
      studentName: newCert.studentName,
      course: newCert.course,
      grade: newCert.grade,
      score: newCert.score,
      issued: 'Today'
    };
    setCertificates([certObj, ...certificates]);
    setIsAddCertOpen(false);
    setNewCert({ studentName: '', course: 'Professional Barista Mastery', score: '95%', grade: 'Distinction' });
    toast.success(`Certificate ${certObj.certNumber} issued to ${certObj.studentName}!`);
  };

  const handleAddJob = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newJob.title || !newJob.company) return toast.error("Please enter title and company.");
    const jobObj = {
      id: Date.now(),
      title: newJob.title,
      company: newJob.company,
      location: newJob.location,
      salary: newJob.salary,
      status: 'Published',
      type: newJob.type
    };
    setJobsList([jobObj, ...jobsList]);
    setIsAddJobOpen(false);
    setNewJob({ title: '', company: '', location: 'Kigali', salary: '$600/mo', type: 'Full-time' });
    toast.success(`Job "${jobObj.title}" posted to Job Board!`);
  };

  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEvent.title || !newEvent.date) return toast.error("Please enter event title and date.");
    const eventObj = {
      id: Date.now(),
      title: newEvent.title,
      date: newEvent.date,
      type: newEvent.type,
      spots: Number(newEvent.spots),
      registered: 0,
      location: newEvent.location
    };
    setEventsList([eventObj, ...eventsList]);
    setIsAddEventOpen(false);
    setNewEvent({ title: '', date: '', type: 'Workshop', spots: 20, location: 'Kigali Center' });
    toast.success(`Event "${eventObj.title}" scheduled!`);
  };

  const toggleUserStatus = (id: string) => {
    setUsers(users.map(u => u.id === id ? { ...u, status: u.status === 'Active' ? 'Suspended' : 'Active' } : u));
    toast.info("User status updated.");
  };

  const deleteJob = (id: number) => {
    setJobsList(jobsList.filter(j => j.id !== id));
    toast.success("Job listing removed.");
  };

  const deleteEvent = (id: number) => {
    setEventsList(eventsList.filter(e => e.id !== id));
    toast.success("Event removed.");
  };

  return (
    <Layout>
      <div className="min-h-screen bg-lms-bg pt-24 pb-16 font-inter">
        <div className="container-custom">

          {/* Admin Banner Header */}
          <div className="bg-lms-gradient text-white rounded-3xl p-8 mb-8 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-lms-secondary/10 rounded-full blur-3xl" />
            <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <span className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 text-lms-secondary rounded-full text-xs font-semibold mb-2">
                  <ShieldCheck size={14} /> BBA Master Control Panel
                </span>
                <h1 className="font-cormorant text-4xl md:text-5xl font-bold">Academy Management System</h1>
                <p className="text-white/70 text-sm mt-1">Full control over 24-Module Curriculum, Users, Certificates, Jobs, Events, Blog, and Revenues.</p>
              </div>

              <div className="flex flex-wrap gap-2">
                <button onClick={() => setIsAddUserOpen(true)} className="lms-btn-secondary text-xs py-2.5 flex items-center gap-1.5 shadow-md">
                  <Plus size={14} /> Add User
                </button>
                <button onClick={() => setIsAddCertOpen(true)} className="lms-btn-accent text-xs py-2.5 flex items-center gap-1.5 shadow-md">
                  <Award size={14} /> Issue Cert
                </button>
                <button onClick={() => setActiveTab('settings')} className="bg-white/10 text-white hover:bg-white/20 px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors border border-white/20">
                  <Settings size={14} /> Settings
                </button>
              </div>
            </div>
          </div>

          {/* Stat Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
            {[
              { label: 'Total Students', val: users.length, icon: Users, sub: '+12% this month', color: 'text-lms-primary bg-lms-primary/10' },
              { label: 'Barista Modules', val: '24 + Exam', icon: BookOpen, sub: '100% Comprehensive', color: 'text-amber-700 bg-amber-50' },
              { label: 'Issued Certs', val: certificates.length, icon: Award, sub: '98% Pass Rate', color: 'text-emerald-700 bg-emerald-50' },
              { label: 'Active Jobs', val: jobsList.length, icon: Briefcase, sub: 'Employer Network', color: 'text-blue-700 bg-blue-50' },
              { label: 'Total Revenue', val: '$28,450', icon: DollarSign, sub: 'Stripe & MoMo', color: 'text-purple-700 bg-purple-50' },
            ].map((s) => (
              <div key={s.label} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
                <div className={`w-10 h-10 rounded-xl ${s.color} flex items-center justify-center mb-3`}>
                  <s.icon size={20} />
                </div>
                <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">{s.label}</p>
                <h3 className="font-cormorant font-bold text-2xl text-lms-dark mt-0.5">{s.val}</h3>
                <p className="text-[11px] text-lms-primary font-semibold mt-1">{s.sub}</p>
              </div>
            ))}
          </div>

          {/* Navigation Tabs */}
          <div className="flex gap-1 overflow-x-auto border-b border-gray-200 mb-6 bg-white p-2 rounded-2xl shadow-sm scrollbar-hide">
            {[
              { id: 'overview', label: 'Overview', icon: BarChart2 },
              { id: 'curriculum', label: '24 Barista Modules', icon: BookOpen },
              { id: 'users', label: 'Users & Roles', icon: Users },
              { id: 'certificates', label: 'Certificates', icon: Award },
              { id: 'jobs', label: 'Job Board', icon: Briefcase },
              { id: 'events', label: 'Events & Workshops', icon: Calendar },
              { id: 'blog', label: 'Blog & CMS', icon: Rss },
              { id: 'payments', label: 'Transactions', icon: DollarSign },
              { id: 'settings', label: 'Site Settings', icon: Settings },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-lms-primary text-white shadow-md'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <tab.icon size={14} />
                {tab.label}
              </button>
            ))}
          </div>

          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h3 className="font-cormorant text-2xl font-bold text-lms-dark">Academy Growth Analytics</h3>
                    <p className="text-xs text-gray-500">Student enrollment & course completions over the last 6 months</p>
                  </div>
                  <span className="badge-new">Live Updates</span>
                </div>
                <div className="h-64 bg-lms-bg rounded-xl border border-dashed border-gray-200 flex flex-col items-center justify-center text-gray-400 text-sm">
                  <TrendingUp size={36} className="text-lms-primary mb-2" />
                  <p className="font-semibold text-lms-dark">2,540 Active Enrolled Students</p>
                  <p className="text-xs text-gray-500">Peak activity: 9:00 AM - 4:00 PM CAT</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <h3 className="font-cormorant text-2xl font-bold text-lms-dark mb-4">System Activity Stream</h3>
                <div className="space-y-3 text-xs">
                  {[
                    { text: 'Marie Uwase completed Module 06 (Espresso Mechanics)', time: '10 mins ago', type: 'success' },
                    { text: 'Certificate BBA-2026-003 issued to Pascal B.', time: '45 mins ago', type: 'cert' },
                    { text: 'New job posted: Head Barista at Marriott Kigali', time: '2 hours ago', type: 'job' },
                    { text: 'Payment $199.00 received via MTN Mobile Money', time: '3 hours ago', type: 'pay' },
                  ].map((log, i) => (
                    <div key={i} className="p-3 bg-lms-bg rounded-xl border border-gray-100 flex items-start gap-2">
                      <Sparkles size={14} className="text-lms-primary mt-0.5 shrink-0" />
                      <div>
                        <p className="font-semibold text-gray-800 leading-tight">{log.text}</p>
                        <span className="text-[10px] text-gray-400 mt-1 block">{log.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: CURRICULUM MANAGER (ORIENTATION + 24 BARISTA MODULES) */}
          {activeTab === 'curriculum' && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="font-cormorant text-2xl font-bold text-lms-dark">
                    {curriculumView === 'orientation'
                      ? 'Orientation: Welcome to Beyond Barista Academy (14 Lessons)'
                      : 'Professional Barista Mastery (24 Modules + Final Exam)'}
                  </h3>
                  <p className="text-xs text-gray-500">Manage curriculum modules, lesson reading text, YouTube videos, and quizzes</p>
                </div>
                <span className="badge-premium">
                  {curriculumView === 'orientation' ? '14 Lessons Active' : '24 Modules Active'}
                </span>
              </div>

              <div className="flex items-center gap-2 mb-6">
                <button
                  onClick={() => setCurriculumView('orientation')}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold font-inter transition-all ${
                    curriculumView === 'orientation' ? 'bg-lms-primary text-white shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Orientation
                </button>
                <button
                  onClick={() => setCurriculumView('barista')}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold font-inter transition-all ${
                    curriculumView === 'barista' ? 'bg-lms-primary text-white shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Barista Program
                </button>
              </div>

              <div className="space-y-4">
                {(curriculumView === 'orientation' ? ORIENTATION_CURRICULUM : BARISTA_CURRICULUM).map((mod) => (
                  <div key={mod.id} className="p-4 rounded-xl border border-gray-200 bg-lms-bg hover:border-lms-primary/40 transition-all">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        <span className="w-7 h-7 rounded-full bg-lms-primary text-white font-bold text-xs flex items-center justify-center">
                          {mod.moduleNumber}
                        </span>
                        <h4 className="font-cormorant font-bold text-lg text-lms-dark">{mod.title}</h4>
                      </div>
                      <button
                        onClick={() => toast.info(`Editing ${mod.title}...`)}
                        className="text-xs text-lms-primary font-semibold hover:underline flex items-center gap-1">
                        <Edit3 size={12} /> Edit Module
                      </button>
                    </div>
                    <p className="text-xs text-gray-600 mb-3 pl-9">{mod.description}</p>
                    <div className="pl-9 space-y-1.5">
                      {mod.lessons.map((l) => (
                        <div key={l.id} className="flex items-center justify-between text-xs bg-white p-2 rounded-lg border border-gray-100">
                          <span className="font-medium text-gray-800">{l.title}</span>
                          <span className="text-[10px] text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">{l.type} ({l.duration})</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: USERS & ROLES */}
          {activeTab === 'users' && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-4 border-b border-gray-100 flex justify-between items-center gap-4">
                <div className="relative flex-1 max-w-md">
                  <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search users by name, email, or role..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 rounded-xl border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-lms-primary"
                  />
                </div>
                <button onClick={() => setIsAddUserOpen(true)} className="lms-btn-primary text-xs py-2 px-4 flex items-center gap-1">
                  <Plus size={14} /> Add User
                </button>
              </div>

              <table className="w-full text-left text-xs">
                <thead className="bg-gray-50 text-gray-500 uppercase tracking-wider font-semibold">
                  <tr>
                    <th className="p-4">User</th>
                    <th className="p-4">Role</th>
                    <th className="p-4">Enrolled Courses</th>
                    <th className="p-4">Joined</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {users.filter(u => u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase())).map((u) => (
                    <tr key={u.id} className="hover:bg-gray-50 transition-colors">
                      <td className="p-4">
                        <p className="font-bold text-gray-900">{u.name}</p>
                        <p className="text-[11px] text-gray-400">{u.email}</p>
                      </td>
                      <td className="p-4">
                        <span className={`px-2.5 py-0.5 rounded-full font-semibold ${
                          u.role === 'Super Admin' ? 'bg-purple-100 text-purple-700' :
                          u.role === 'Instructor' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
                        }`}>
                          {u.role}
                        </span>
                      </td>
                      <td className="p-4 font-semibold">{u.enrolled} Courses</td>
                      <td className="p-4 text-gray-500">{u.joined}</td>
                      <td className="p-4">
                        <span className={u.status === 'Active' ? 'badge-free' : 'bg-red-100 text-red-700 px-2 py-0.5 rounded-full font-semibold'}>
                          {u.status}
                        </span>
                      </td>
                      <td className="p-4 text-right space-x-2">
                        <button onClick={() => toggleUserStatus(u.id)} className="text-lms-primary font-semibold hover:underline">
                          {u.status === 'Active' ? 'Suspend' : 'Activate'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* TAB 4: CERTIFICATES */}
          {activeTab === 'certificates' && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="font-cormorant text-2xl font-bold text-lms-dark">Issued Certificates & Verifications</h3>
                  <p className="text-xs text-gray-500">View and issue official QR-verified Beyond Barista Academy certificates</p>
                </div>
                <button onClick={() => setIsAddCertOpen(true)} className="lms-btn-accent text-xs py-2 px-4 flex items-center gap-1">
                  <Award size={14} /> Issue New Certificate
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-gray-50 text-gray-500 uppercase tracking-wider font-semibold">
                    <tr>
                      <th className="p-4">Cert Number</th>
                      <th className="p-4">Student</th>
                      <th className="p-4">Course</th>
                      <th className="p-4">Score / Grade</th>
                      <th className="p-4">Issue Date</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {certificates.map((c) => (
                      <tr key={c.certNumber} className="hover:bg-gray-50 transition-colors">
                        <td className="p-4 font-mono font-bold text-lms-primary">{c.certNumber}</td>
                        <td className="p-4 font-semibold text-gray-900">{c.studentName}</td>
                        <td className="p-4 text-gray-600">{c.course}</td>
                        <td className="p-4">
                          <span className="badge-free">{c.grade} ({c.score})</span>
                        </td>
                        <td className="p-4 text-gray-500">{c.issued}</td>
                        <td className="p-4 text-right space-x-2">
                          <a href={`/certificate/${c.certNumber}`} target="_blank" rel="noreferrer" className="text-lms-primary font-semibold hover:underline">
                            Verify / View
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 5: JOB BOARD */}
          {activeTab === 'jobs' && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="font-cormorant text-2xl font-bold text-lms-dark">Job Board Listings Management</h3>
                  <p className="text-xs text-gray-500">Approve, edit, or post new hospitality job opportunities for BBA graduates</p>
                </div>
                <button onClick={() => setIsAddJobOpen(true)} className="lms-btn-primary text-xs py-2 px-4 flex items-center gap-1">
                  <Plus size={14} /> Post New Job
                </button>
              </div>

              <div className="space-y-3">
                {jobsList.map((job) => (
                  <div key={job.id} className="p-4 rounded-xl border border-gray-100 bg-lms-bg flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-cormorant font-bold text-lg text-lms-dark">{job.title}</h4>
                        <span className="badge-new">{job.type}</span>
                        <span className="badge-free">{job.status}</span>
                      </div>
                      <p className="text-xs text-gray-600 mt-0.5">{job.company} • {job.location} • <strong className="text-lms-primary">{job.salary}</strong></p>
                    </div>
                    <button onClick={() => deleteJob(job.id)} className="text-red-500 hover:text-red-700 p-2">
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: EVENTS & WORKSHOPS */}
          {activeTab === 'events' && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="font-cormorant text-2xl font-bold text-lms-dark">Events, Workshops & Competitions</h3>
                  <p className="text-xs text-gray-500">Schedule upcoming physical events, webinars, and barista competitions</p>
                </div>
                <button onClick={() => setIsAddEventOpen(true)} className="lms-btn-primary text-xs py-2 px-4 flex items-center gap-1">
                  <Plus size={14} /> Schedule Event
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {eventsList.map((ev) => (
                  <div key={ev.id} className="p-4 rounded-xl border border-gray-100 bg-lms-bg relative">
                    <button onClick={() => deleteEvent(ev.id)} className="absolute top-3 right-3 text-red-400 hover:text-red-600">
                      <Trash2 size={14} />
                    </button>
                    <span className="badge-new text-[10px] mb-2">{ev.type}</span>
                    <h4 className="font-cormorant font-bold text-lg text-lms-dark">{ev.title}</h4>
                    <p className="text-xs text-gray-500 mt-1">📅 {ev.date} • 📍 {ev.location}</p>
                    <p className="text-xs text-lms-primary font-semibold mt-2">{ev.registered} / {ev.spots} registered</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 7: BLOG & CMS */}
          {activeTab === 'blog' && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="font-cormorant text-2xl font-bold text-lms-dark">Blog & Knowledge Articles</h3>
                  <p className="text-xs text-gray-500">Manage hospitality articles, coffee guides, and SEO news</p>
                </div>
                <button onClick={() => toast.success("Article draft initialized.")} className="lms-btn-primary text-xs py-2 px-4 flex items-center gap-1">
                  <Plus size={14} /> Write New Post
                </button>
              </div>

              <div className="space-y-3">
                {postsList.map((p) => (
                  <div key={p.id} className="p-4 rounded-xl border border-gray-100 bg-lms-bg flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-lms-primary font-semibold uppercase">{p.category}</span>
                      <h4 className="font-cormorant font-bold text-lg text-lms-dark">{p.title}</h4>
                      <p className="text-xs text-gray-500 mt-0.5">By {p.author} • {p.views} views</p>
                    </div>
                    <span className="badge-free">{p.status}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 8: TRANSACTIONS & PAYMENTS */}
          {activeTab === 'payments' && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="font-cormorant text-2xl font-bold text-lms-dark">Payment Transactions & Subscriptions</h3>
                  <p className="text-xs text-gray-500">Live transaction logs from Flutterwave, Stripe, and PayPal</p>
                </div>
                <span className="badge-free font-semibold">$28,450 Total Revenue</span>
              </div>

              <table className="w-full text-left text-xs">
                <thead className="bg-gray-50 text-gray-500 uppercase tracking-wider font-semibold">
                  <tr>
                    <th className="p-4">Tx ID</th>
                    <th className="p-4">User</th>
                    <th className="p-4">Plan / Item</th>
                    <th className="p-4">Amount</th>
                    <th className="p-4">Gateway</th>
                    <th className="p-4">Date</th>
                    <th className="p-4 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {transactions.map((t) => (
                    <tr key={t.txId} className="hover:bg-gray-50 transition-colors">
                      <td className="p-4 font-mono font-bold text-gray-700">{t.txId}</td>
                      <td className="p-4 font-semibold text-gray-900">{t.user}</td>
                      <td className="p-4 text-gray-600">{t.plan}</td>
                      <td className="p-4 font-bold text-lms-primary">{t.amount}</td>
                      <td className="p-4 text-gray-500">{t.gateway}</td>
                      <td className="p-4 text-gray-500">{t.date}</td>
                      <td className="p-4 text-right">
                        <span className="badge-free">{t.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* TAB 9: SITE SETTINGS */}
          {activeTab === 'settings' && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 max-w-2xl">
              <h3 className="font-cormorant text-3xl font-bold text-lms-dark mb-6">Academy Platform Settings</h3>
              <div className="space-y-4 font-inter text-sm">
                <div>
                  <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider block mb-1">Institution Name</label>
                  <input
                    type="text"
                    value={siteSettings.institutionName}
                    onChange={(e) => setSiteSettings({ ...siteSettings, institutionName: e.target.value })}
                    className="lms-input"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider block mb-1">Official Email</label>
                    <input
                      type="email"
                      value={siteSettings.email}
                      onChange={(e) => setSiteSettings({ ...siteSettings, email: e.target.value })}
                      className="lms-input"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider block mb-1">Phone Number</label>
                    <input
                      type="text"
                      value={siteSettings.phone}
                      onChange={(e) => setSiteSettings({ ...siteSettings, phone: e.target.value })}
                      className="lms-input"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider block mb-1">WhatsApp Line</label>
                    <input
                      type="text"
                      value={siteSettings.whatsapp}
                      onChange={(e) => setSiteSettings({ ...siteSettings, whatsapp: e.target.value })}
                      className="lms-input"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider block mb-1">Primary Theme Color</label>
                    <input
                      type="text"
                      disabled
                      value={siteSettings.themeColor}
                      className="lms-input bg-gray-50 text-gray-500"
                    />
                  </div>
                </div>

                <button
                  onClick={() => toast.success("Site settings updated successfully!")}
                  className="lms-btn-primary mt-4">
                  Save Changes
                </button>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* MODAL 1: ADD USER */}
      {isAddUserOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <form onSubmit={handleAddUser} className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <h3 className="font-cormorant text-2xl font-bold text-lms-dark">Add New User</h3>
            <div>
              <label className="text-xs font-semibold text-gray-600 block mb-1">Full Name</label>
              <input type="text" placeholder="e.g. Divine Mutoni" value={newUser.name} onChange={e => setNewUser({...newUser, name: e.target.value})} className="lms-input" />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-600 block mb-1">Email Address</label>
              <input type="email" placeholder="e.g. divine@example.com" value={newUser.email} onChange={e => setNewUser({...newUser, email: e.target.value})} className="lms-input" />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-600 block mb-1">Assign Role</label>
              <select value={newUser.role} onChange={e => setNewUser({...newUser, role: e.target.value})} className="lms-input">
                <option value="Student">Student</option>
                <option value="Instructor">Instructor</option>
                <option value="Super Admin">Super Admin</option>
              </select>
            </div>
            <div className="flex gap-2 pt-2">
              <button type="submit" className="lms-btn-primary flex-1">Create User</button>
              <button type="button" onClick={() => setIsAddUserOpen(false)} className="px-4 py-2 border rounded-xl font-semibold text-xs">Cancel</button>
            </div>
          </form>
        </div>
      )}

      {/* MODAL 2: ISSUE CERTIFICATE */}
      {isAddCertOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <form onSubmit={handleIssueCert} className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <h3 className="font-cormorant text-2xl font-bold text-lms-dark">Issue Official Certificate</h3>
            <div>
              <label className="text-xs font-semibold text-gray-600 block mb-1">Student Full Name</label>
              <input type="text" placeholder="e.g. Pascal Bizimana" value={newCert.studentName} onChange={e => setNewCert({...newCert, studentName: e.target.value})} className="lms-input" />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-600 block mb-1">Course Title</label>
              <input type="text" value={newCert.course} onChange={e => setNewCert({...newCert, course: e.target.value})} className="lms-input" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-xs font-semibold text-gray-600 block mb-1">Score %</label>
                <input type="text" value={newCert.score} onChange={e => setNewCert({...newCert, score: e.target.value})} className="lms-input" />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-600 block mb-1">Grade</label>
                <select value={newCert.grade} onChange={e => setNewCert({...newCert, grade: e.target.value})} className="lms-input">
                  <option value="Distinction">Distinction</option>
                  <option value="Merit">Merit</option>
                  <option value="Pass">Pass</option>
                </select>
              </div>
            </div>
            <div className="flex gap-2 pt-2">
              <button type="submit" className="lms-btn-accent flex-1">Issue & Generate QR</button>
              <button type="button" onClick={() => setIsAddCertOpen(false)} className="px-4 py-2 border rounded-xl font-semibold text-xs">Cancel</button>
            </div>
          </form>
        </div>
      )}

      {/* MODAL 3: POST JOB */}
      {isAddJobOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <form onSubmit={handleAddJob} className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <h3 className="font-cormorant text-2xl font-bold text-lms-dark">Post New Hospitality Job</h3>
            <div>
              <label className="text-xs font-semibold text-gray-600 block mb-1">Job Title</label>
              <input type="text" placeholder="e.g. Senior Sommelier" value={newJob.title} onChange={e => setNewJob({...newJob, title: e.target.value})} className="lms-input" />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-600 block mb-1">Company / Hotel</label>
              <input type="text" placeholder="e.g. Serena Hotel Kigali" value={newJob.company} onChange={e => setNewJob({...newJob, company: e.target.value})} className="lms-input" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-xs font-semibold text-gray-600 block mb-1">Location</label>
                <input type="text" value={newJob.location} onChange={e => setNewJob({...newJob, location: e.target.value})} className="lms-input" />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-600 block mb-1">Salary Range</label>
                <input type="text" value={newJob.salary} onChange={e => setNewJob({...newJob, salary: e.target.value})} className="lms-input" />
              </div>
            </div>
            <div className="flex gap-2 pt-2">
              <button type="submit" className="lms-btn-primary flex-1">Post Listing</button>
              <button type="button" onClick={() => setIsAddJobOpen(false)} className="px-4 py-2 border rounded-xl font-semibold text-xs">Cancel</button>
            </div>
          </form>
        </div>
      )}

      {/* MODAL 4: SCHEDULE EVENT */}
      {isAddEventOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <form onSubmit={handleAddEvent} className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <h3 className="font-cormorant text-2xl font-bold text-lms-dark">Schedule Workshop or Event</h3>
            <div>
              <label className="text-xs font-semibold text-gray-600 block mb-1">Event Title</label>
              <input type="text" placeholder="e.g. Latte Art Championship" value={newEvent.title} onChange={e => setNewEvent({...newEvent, title: e.target.value})} className="lms-input" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-xs font-semibold text-gray-600 block mb-1">Date</label>
                <input type="text" placeholder="Aug 25, 2026" value={newEvent.date} onChange={e => setNewEvent({...newEvent, date: e.target.value})} className="lms-input" />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-600 block mb-1">Max Spots</label>
                <input type="number" value={newEvent.spots} onChange={e => setNewEvent({...newEvent, spots: Number(e.target.value)})} className="lms-input" />
              </div>
            </div>
            <div className="flex gap-2 pt-2">
              <button type="submit" className="lms-btn-primary flex-1">Schedule Event</button>
              <button type="button" onClick={() => setIsAddEventOpen(false)} className="px-4 py-2 border rounded-xl font-semibold text-xs">Cancel</button>
            </div>
          </form>
        </div>
      )}

    </Layout>
  );
};

export default AdminDashboard;
