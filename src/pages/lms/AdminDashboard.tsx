import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import RoleSwitcher from '@/components/lms/RoleSwitcher';
import TranscriptModal from '@/components/lms/TranscriptModal';
import {
  Users, BookOpen, DollarSign, Award, Settings, BarChart2, Plus, Search,
  ShieldCheck, Briefcase, Calendar, Rss, Edit3, Trash2, Download, Eye,
  Building, GraduationCap, ClipboardList, HelpCircle, FileText, Sparkles, CheckCircle2
} from 'lucide-react';
import { toast } from 'sonner';
import { BARISTA_CURRICULUM } from '@/data/baristaCurriculum';
import { ORIENTATION_CURRICULUM } from '@/data/orientationCurriculum';

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

const faculties = [
  { id: 'f1', name: 'School of Specialty Coffee & Barista Arts', dean: 'Master Jean-Pierre Muhire', departments: 3, students: 840 },
  { id: 'f2', name: 'Faculty of Mixology & Sommelier Studies', dean: 'David Karangwa', departments: 2, students: 420 },
  { id: 'f3', name: 'Department of Hospitality Management', dean: 'Sarah Mutesi', departments: 2, students: 310 },
];

const semesters = [
  { id: 's1', name: 'Semester I - 2026 (Fall)', start: 'Aug 15, 2026', end: 'Dec 20, 2026', status: 'Upcoming Registration' },
  { id: 's2', name: 'Semester II - 2026 (Spring)', start: 'Jan 10, 2026', end: 'May 30, 2026', status: 'Completed' },
];

export const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState<
    'overview' | 'faculties' | 'semesters' | 'curriculum' | 'users' | 'certificates' | 'invoices' | 'crm' | 'settings'
  >('overview');

  const [curriculumView, setCurriculumView] = useState<'orientation' | 'barista'>('orientation');
  const [search, setSearch] = useState('');
  const [users, setUsers] = useState(initialUsers);
  const [certificates, setCertificates] = useState(initialCertificates);
  const [isTranscriptOpen, setIsTranscriptOpen] = useState(false);
  const [selectedStudentForTranscript, setSelectedStudentForTranscript] = useState('Marie Uwase');

  // Modals
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'Student' });

  const [isAddCertOpen, setIsAddCertOpen] = useState(false);
  const [newCert, setNewCert] = useState({ studentName: '', course: 'Professional Barista Mastery', score: '95%', grade: 'Distinction' });

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

  return (
    <Layout>
      <RoleSwitcher currentRole="admin" />

      <div className="min-h-screen bg-lms-bg pt-8 pb-16 font-inter">
        <div className="container-custom">

          {/* Admin Banner Header */}
          <div className="bg-lms-gradient text-white rounded-3xl p-8 mb-8 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-lms-secondary/10 rounded-full blur-3xl" />
            <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <span className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 text-lms-secondary rounded-full text-xs font-semibold mb-2">
                  <ShieldCheck size={14} /> Institutional Operations Panel
                </span>
                <h1 className="font-cormorant text-4xl md:text-5xl font-bold">Academic & Operational Admin</h1>
                <p className="text-white/70 text-sm mt-1">Faculties, Departments, Academic Calendar, Transcripts, Invoices, HR & CRM.</p>
              </div>

              <div className="flex flex-wrap gap-2">
                <button onClick={() => setIsAddUserOpen(true)} className="lms-btn-secondary text-xs py-2.5 flex items-center gap-1.5 shadow-md">
                  <Plus size={14} /> Enrol Student
                </button>
                <button onClick={() => setIsAddCertOpen(true)} className="lms-btn-accent text-xs py-2.5 flex items-center gap-1.5 shadow-md">
                  <Award size={14} /> Issue Cert
                </button>
                <button onClick={() => setIsTranscriptOpen(true)} className="bg-white/10 text-white hover:bg-white/20 px-3 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 border border-white/20">
                  <FileText size={14} /> Generate Transcript
                </button>
              </div>
            </div>
          </div>

          {/* Stat Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
            {[
              { label: 'Active Students', val: '1,570', icon: Users, sub: '3 Faculties', color: 'text-lms-primary bg-lms-primary/10' },
              { label: 'Academic Terms', val: '2 Semesters', icon: Calendar, sub: 'Fall 2026 Open', color: 'text-blue-700 bg-blue-50' },
              { label: 'Barista Modules', val: '24 Modules', icon: BookOpen, sub: 'Accredited WDA', color: 'text-amber-700 bg-amber-50' },
              { label: 'Issued Certs', val: certificates.length, icon: Award, sub: 'QR Verified', color: 'text-emerald-700 bg-emerald-50' },
              { label: 'Tuition Invoiced', val: '$42,800', icon: DollarSign, sub: '92% Collected', color: 'text-purple-700 bg-purple-50' },
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
          <div className="flex gap-1 overflow-x-auto border-b border-gray-200 mb-6 bg-white p-2 rounded-2xl shadow-sm scrollbar-none">
            {[
              { id: 'overview', label: 'Dashboard Overview', icon: BarChart2 },
              { id: 'faculties', label: 'Faculties & Departments', icon: Building },
              { id: 'semesters', label: 'Semesters & Calendar', icon: Calendar },
              { id: 'curriculum', label: 'Curriculum & Modules', icon: BookOpen },
              { id: 'users', label: 'Students & Staff Roster', icon: Users },
              { id: 'certificates', label: 'Certificates & Transcripts', icon: Award },
              { id: 'invoices', label: 'Tuition & Billing', icon: DollarSign },
              { id: 'crm', label: 'Support & Lead CRM', icon: HelpCircle },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs transition-all whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'bg-lms-primary text-white shadow-md font-bold'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Icon size={14} />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h3 className="font-cormorant text-2xl font-bold text-lms-dark">Institutional Enrolment & Operations</h3>
                    <p className="text-xs text-gray-500">Live operational stream across all 3 Faculties</p>
                  </div>
                  <span className="badge-new font-semibold">Live Operational</span>
                </div>
                <div className="p-6 bg-lms-bg rounded-xl border border-dashed border-gray-200 flex flex-col items-center justify-center text-center">
                  <GraduationCap size={40} className="text-lms-primary mb-2" />
                  <h4 className="font-cormorant text-2xl font-bold text-lms-dark">1,570 Total Registered Learners</h4>
                  <p className="text-xs text-gray-500 mt-1">98.4% Graduation Rate across Professional Barista & Mixology Diplomas</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <h3 className="font-cormorant text-2xl font-bold text-lms-dark mb-4">Operations Log</h3>
                <div className="space-y-3 text-xs">
                  {[
                    { text: 'Semester I - 2026 Exam Schedule Released', time: '15 mins ago' },
                    { text: 'Tuition Invoice #INV-2026-88 paid via MTN MoMo', time: '1 hr ago' },
                    { text: 'Transcript generated for Marie Uwase (3.9 GPA)', time: '3 hrs ago' },
                  ].map((item, i) => (
                    <div key={i} className="p-3 bg-lms-bg rounded-xl border border-gray-100 flex items-start gap-2">
                      <Sparkles size={14} className="text-lms-primary mt-0.5 shrink-0" />
                      <div>
                        <p className="font-semibold text-gray-800 leading-tight">{item.text}</p>
                        <span className="text-[10px] text-gray-400 mt-1 block">{item.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: FACULTIES */}
          {activeTab === 'faculties' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center bg-white p-6 rounded-2xl border border-gray-100">
                <div>
                  <h3 className="font-cormorant text-2xl font-bold text-lms-dark">Faculties & Academic Departments</h3>
                  <p className="text-xs text-gray-500">Manage institutional academic structures and dean appointments</p>
                </div>
                <button onClick={() => toast.success("Faculty creation modal opened.")} className="lms-btn-primary text-xs py-2 px-4">
                  + Create Faculty
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {faculties.map((f) => (
                  <div key={f.id} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-2">
                    <Building className="text-lms-primary mb-1" size={24} />
                    <h4 className="font-cormorant font-bold text-xl text-lms-dark">{f.name}</h4>
                    <p className="text-xs text-gray-500">Dean: <strong>{f.dean}</strong></p>
                    <div className="pt-2 border-t border-gray-100 flex justify-between text-xs font-semibold text-gray-700">
                      <span>{f.departments} Departments</span>
                      <span className="text-lms-primary">{f.students} Enrolled</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: SEMESTERS */}
          {activeTab === 'semesters' && (
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4 font-inter text-xs">
              <h3 className="font-cormorant text-2xl font-bold text-lms-dark">Academic Calendar & Terms</h3>
              <div className="space-y-3">
                {semesters.map((s) => (
                  <div key={s.id} className="p-4 bg-lms-bg rounded-xl border border-gray-200 flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm">{s.name}</h4>
                      <p className="text-gray-500 text-xs">Duration: {s.start} – {s.end}</p>
                    </div>
                    <span className="badge-new">{s.status}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: CURRICULUM */}
          {activeTab === 'curriculum' && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="font-cormorant text-2xl font-bold text-lms-dark">
                    {curriculumView === 'orientation'
                      ? 'Orientation: Welcome to Beyond Barista Academy (14 Lessons)'
                      : 'Professional Barista Mastery (24 Modules + Final Exam)'}
                  </h3>
                  <p className="text-xs text-gray-500">View and edit module topics and lesson structures</p>
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
                      <button onClick={() => toast.info(`Editing ${mod.title}...`)} className="text-xs text-lms-primary font-semibold hover:underline flex items-center gap-1">
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

          {/* TAB 5: USERS & ROLES */}
          {activeTab === 'users' && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden font-inter text-xs">
              <div className="p-4 border-b border-gray-100 flex justify-between items-center gap-4">
                <div className="relative flex-1 max-w-md">
                  <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search students or staff..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-lms-primary"
                  />
                </div>
                <button onClick={() => setIsAddUserOpen(true)} className="lms-btn-primary py-2 px-4 flex items-center gap-1">
                  <Plus size={14} /> Add User
                </button>
              </div>

              <table className="w-full text-left">
                <thead className="bg-gray-50 text-gray-500 uppercase tracking-wider font-semibold">
                  <tr>
                    <th className="p-4">User Name & Email</th>
                    <th className="p-4">Role</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {users.filter(u => u.name.toLowerCase().includes(search.toLowerCase())).map((u) => (
                    <tr key={u.id} className="hover:bg-gray-50">
                      <td className="p-4 font-bold text-gray-900">{u.name} <span className="block text-[11px] font-normal text-gray-400">{u.email}</span></td>
                      <td className="p-4 font-semibold">{u.role}</td>
                      <td className="p-4"><span className="badge-free">{u.status}</span></td>
                      <td className="p-4 text-right">
                        <button
                          onClick={() => {
                            setSelectedStudentForTranscript(u.name);
                            setIsTranscriptOpen(true);
                          }}
                          className="text-lms-primary font-bold hover:underline"
                        >
                          Transcript
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* TAB 6: CERTIFICATES & TRANSCRIPTS */}
          {activeTab === 'certificates' && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 font-inter text-xs">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="font-cormorant text-2xl font-bold text-lms-dark">Verified Certificates & Academic Transcripts</h3>
                  <p className="text-xs text-gray-500">Official QR-code verified certification repository</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setIsTranscriptOpen(true)} className="lms-btn-outline py-2 px-4 flex items-center gap-1">
                    <FileText size={14} /> Preview Official Transcript
                  </button>
                  <button onClick={() => setIsAddCertOpen(true)} className="lms-btn-accent py-2 px-4 flex items-center gap-1">
                    <Award size={14} /> Issue New Cert
                  </button>
                </div>
              </div>

              <table className="w-full text-left">
                <thead className="bg-gray-50 text-gray-500 uppercase">
                  <tr>
                    <th className="p-3">Cert #</th>
                    <th className="p-3">Student</th>
                    <th className="p-3">Course</th>
                    <th className="p-3">Score</th>
                    <th className="p-3 text-right">Verify</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {certificates.map((c) => (
                    <tr key={c.certNumber}>
                      <td className="p-3 font-mono font-bold text-lms-primary">{c.certNumber}</td>
                      <td className="p-3 font-semibold">{c.studentName}</td>
                      <td className="p-3 text-gray-600">{c.course}</td>
                      <td className="p-3 font-bold">{c.score} ({c.grade})</td>
                      <td className="p-3 text-right">
                        <a href={`/certificate/${c.certNumber}`} target="_blank" rel="noreferrer" className="text-lms-primary font-bold hover:underline">
                          View Verification →
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* TAB 7: INVOICES */}
          {activeTab === 'invoices' && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 font-inter text-xs">
              <h3 className="font-cormorant text-2xl font-bold text-lms-dark mb-4">Tuition Billing & Invoices</h3>
              <div className="p-4 bg-lms-bg rounded-xl border border-gray-200 flex justify-between items-center">
                <div>
                  <p className="font-bold text-gray-900">Total Invoiced YTD</p>
                  <p className="text-2xl font-bold text-lms-primary">$42,800.00</p>
                </div>
                <button onClick={() => toast.success("Invoice export downloaded (PDF/CSV).")} className="lms-btn-primary text-xs py-2 px-4">
                  Export Financial Report
                </button>
              </div>
            </div>
          )}

          {/* TAB 8: SUPPORT CRM */}
          {activeTab === 'crm' && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 font-inter text-xs space-y-4">
              <h3 className="font-cormorant text-2xl font-bold text-lms-dark">Support Tickets & Prospect Leads CRM</h3>
              <div className="p-4 bg-lms-bg rounded-xl border border-gray-200 flex justify-between items-center">
                <div>
                  <p className="font-bold text-gray-900">Open Tickets: 3 Pending</p>
                  <p className="text-gray-500">Student inquiry: "How do I download my QR certificate?"</p>
                </div>
                <button onClick={() => toast.success("Ticket marked resolved!")} className="badge-free cursor-pointer">
                  Mark Resolved
                </button>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Transcript Modal */}
      <TranscriptModal
        isOpen={isTranscriptOpen}
        onClose={() => setIsTranscriptOpen(false)}
        studentName={selectedStudentForTranscript}
      />

      {/* Add User Modal */}
      {isAddUserOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 font-inter text-xs">
          <form onSubmit={handleAddUser} className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <h3 className="font-cormorant text-2xl font-bold text-lms-dark">Enrol New Student</h3>
            <div>
              <label className="font-semibold text-gray-600 block mb-1">Full Name</label>
              <input type="text" placeholder="e.g. Divine Mutoni" value={newUser.name} onChange={e => setNewUser({...newUser, name: e.target.value})} className="lms-input" />
            </div>
            <div>
              <label className="font-semibold text-gray-600 block mb-1">Email</label>
              <input type="email" placeholder="e.g. divine@example.com" value={newUser.email} onChange={e => setNewUser({...newUser, email: e.target.value})} className="lms-input" />
            </div>
            <div className="flex gap-2 pt-2">
              <button type="submit" className="lms-btn-primary flex-1">Complete Enrolment</button>
              <button type="button" onClick={() => setIsAddUserOpen(false)} className="px-4 py-2 border rounded-xl font-bold">Cancel</button>
            </div>
          </form>
        </div>
      )}

      {/* Issue Cert Modal */}
      {isAddCertOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 font-inter text-xs">
          <form onSubmit={handleIssueCert} className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <h3 className="font-cormorant text-2xl font-bold text-lms-dark">Issue Official Certificate</h3>
            <div>
              <label className="font-semibold text-gray-600 block mb-1">Student Full Name</label>
              <input type="text" placeholder="e.g. Pascal Bizimana" value={newCert.studentName} onChange={e => setNewCert({...newCert, studentName: e.target.value})} className="lms-input" />
            </div>
            <div>
              <label className="font-semibold text-gray-600 block mb-1">Course Title</label>
              <input type="text" value={newCert.course} onChange={e => setNewCert({...newCert, course: e.target.value})} className="lms-input" />
            </div>
            <div className="flex gap-2 pt-2">
              <button type="submit" className="lms-btn-accent flex-1">Issue & Generate QR</button>
              <button type="button" onClick={() => setIsAddCertOpen(false)} className="px-4 py-2 border rounded-xl font-bold">Cancel</button>
            </div>
          </form>
        </div>
      )}

    </Layout>
  );
};

export default AdminDashboard;
