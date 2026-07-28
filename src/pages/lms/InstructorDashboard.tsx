import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Plus, Edit, Trash2, Users, BookOpen, Sparkles, Video, CheckCircle,
  HelpCircle, MessageSquare, Award, BarChart3, Clock, AlertCircle, RefreshCw
} from "lucide-react";
import Layout from "@/components/layout/Layout";
import RoleSwitcher from "@/components/lms/RoleSwitcher";
import AIAssistantModal from "@/components/lms/AIAssistantModal";
import LiveClassModal from "@/components/lms/LiveClassModal";
import { toast } from "sonner";

export const InstructorDashboard = () => {
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [aiModalInitialMode, setAiModalInitialMode] = useState<'quiz' | 'outline' | 'grading'>('quiz');
  const [isLiveClassModalOpen, setIsLiveClassModalOpen] = useState(false);

  const [instructorCourses, setInstructorCourses] = useState([
    { id: 'c1', title: 'Professional Barista Mastery Program', students: 1420, modules: 24, rating: 4.9, status: 'Published' },
    { id: 'c2', title: 'Espresso Mechanics & Calibration', students: 380, modules: 6, rating: 4.8, status: 'Published' },
    { id: 'c3', title: 'Advanced Mixology & Cocktail Design', students: 210, modules: 8, rating: 5.0, status: 'Draft' },
  ]);

  const studentSubmissions = [
    { id: 'sub1', student: 'Marie Uwase', course: 'Espresso Mechanics', assignment: 'Module 06: Extraction Yield Essay', submitted: '2 hours ago', status: 'Pending Review' },
    { id: 'sub2', student: 'Emmanuel Nkusi', course: 'Barista Mastery', assignment: 'Module 12: Latte Art Video Upload', submitted: '5 hours ago', status: 'Pending Review' },
  ];

  const handleGradeSubmission = (studentName: string) => {
    setAiModalInitialMode('grading');
    setIsAiModalOpen(true);
    toast.info(`Opening AI Grading Assistant for ${studentName}'s submission.`);
  };

  return (
    <Layout>
      <RoleSwitcher currentRole="instructor" />

      <div className="min-h-screen bg-lms-bg font-inter pt-8 pb-16">
        <div className="container-custom">

          {/* Header Banner */}
          <div className="bg-slate-900 text-white rounded-3xl p-8 mb-8 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl" />
            <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div>
                <span className="inline-flex items-center gap-2 px-3 py-1 bg-teal-500/20 text-teal-300 rounded-full text-xs font-bold mb-2">
                  <BookOpen size={14} /> Instructor Command Center
                </span>
                <h1 className="font-cormorant text-4xl md:text-5xl font-bold">Faculty Teaching & AI Suite</h1>
                <p className="text-slate-300 text-sm mt-1">Course authoring, AI quiz generation, Zoom live classes, student grading & progress tracking.</p>
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => {
                    setAiModalInitialMode('quiz');
                    setIsAiModalOpen(true);
                  }}
                  className="bg-gradient-to-r from-teal-500 to-emerald-500 text-slate-950 font-bold text-xs py-2.5 px-4 rounded-xl flex items-center gap-1.5 shadow-lg"
                >
                  <Sparkles size={16} /> AI Pedagogy Tools
                </button>
                <button
                  onClick={() => setIsLiveClassModalOpen(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-2.5 px-4 rounded-xl flex items-center gap-1.5 shadow-lg"
                >
                  <Video size={16} /> Schedule Live Class
                </button>
                <Link
                  to="/lms/instructor/courses/new"
                  className="lms-btn-primary text-xs py-2.5 flex items-center gap-1.5"
                >
                  <Plus size={16} /> Create Course
                </Link>
              </div>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center mb-3">
                <BookOpen size={20} />
              </div>
              <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">My Active Courses</p>
              <h3 className="font-cormorant font-bold text-2xl text-lms-dark mt-0.5">{instructorCourses.length}</h3>
              <p className="text-[11px] text-teal-600 font-semibold mt-1">38 Total Modules</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
                <Users size={20} />
              </div>
              <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Enrolled Students</p>
              <h3 className="font-cormorant font-bold text-2xl text-lms-dark mt-0.5">2,010</h3>
              <p className="text-[11px] text-emerald-600 font-semibold mt-1">94% Completion Rate</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-3">
                <Clock size={20} />
              </div>
              <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Pending Grading</p>
              <h3 className="font-cormorant font-bold text-2xl text-lms-dark mt-0.5">{studentSubmissions.length}</h3>
              <p className="text-[11px] text-amber-600 font-semibold mt-1">AI Grading Recommended</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-3">
                <Award size={20} />
              </div>
              <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Certificates Approved</p>
              <h3 className="font-cormorant font-bold text-2xl text-lms-dark mt-0.5">148</h3>
              <p className="text-[11px] text-purple-600 font-semibold mt-1">QR Verification Active</p>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left 2 Cols: Course Management */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="font-cormorant text-2xl font-bold text-lms-dark flex items-center gap-2">
                    <BookOpen className="text-lms-primary" size={22} /> Course & Curriculum Authoring
                  </h2>
                  <Link to="/lms/instructor/courses/new" className="text-xs text-lms-primary font-bold hover:underline">
                    + Add New Module
                  </Link>
                </div>

                <div className="space-y-4">
                  {instructorCourses.map((c) => (
                    <div key={c.id} className="p-4 rounded-xl border border-gray-200 bg-lms-bg hover:border-lms-primary/40 transition-all flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-cormorant font-bold text-lg text-lms-dark">{c.title}</h3>
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                            c.status === 'Published' ? 'badge-free' : 'bg-amber-100 text-amber-800'
                          }`}>
                            {c.status}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1 font-inter">
                          👥 {c.students} Learners • 📚 {c.modules} Modules • ⭐ {c.rating} Rating
                        </p>
                      </div>

                      <div className="flex items-center gap-2 text-xs font-inter">
                        <button
                          onClick={() => {
                            setAiModalInitialMode('quiz');
                            setIsAiModalOpen(true);
                          }}
                          className="px-3 py-1.5 bg-teal-50 text-teal-700 rounded-lg font-bold hover:bg-teal-100 flex items-center gap-1"
                        >
                          <Sparkles size={12} /> AI Quiz
                        </button>
                        <Link
                          to={`/lms/instructor/courses/${c.id}/edit`}
                          className="px-3 py-1.5 bg-lms-primary text-white rounded-lg font-bold hover:opacity-90 flex items-center gap-1"
                        >
                          <Edit size={12} /> Edit
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pending Student Submissions */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h2 className="font-cormorant text-2xl font-bold text-lms-dark mb-4 flex items-center gap-2">
                  <CheckCircle className="text-emerald-600" size={22} /> Pending Student Submissions
                </h2>
                
                <div className="space-y-3 font-inter text-xs">
                  {studentSubmissions.map((sub) => (
                    <div key={sub.id} className="p-4 bg-lms-bg rounded-xl border border-gray-200 flex justify-between items-center">
                      <div>
                        <p className="font-bold text-gray-900">{sub.student} — <span className="text-lms-primary">{sub.assignment}</span></p>
                        <p className="text-gray-500 text-[11px] mt-0.5">Submitted: {sub.submitted} • {sub.course}</p>
                      </div>
                      <button
                        onClick={() => handleGradeSubmission(sub.student)}
                        className="bg-gradient-to-r from-teal-500 to-emerald-500 text-slate-950 font-bold px-3 py-1.5 rounded-lg flex items-center gap-1"
                      >
                        <Sparkles size={13} /> Grade with AI
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Col: Live Classes & Discussion Moderation */}
            <div className="space-y-6">
              {/* Upcoming Live Classes Widget */}
              <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm font-inter text-xs space-y-3">
                <h3 className="font-cormorant font-bold text-xl text-lms-dark flex items-center gap-2">
                  <Video className="text-blue-600" size={20} /> Scheduled Live Webinars
                </h3>
                <div className="p-3 bg-blue-50/60 rounded-xl border border-blue-100 text-blue-900">
                  <p className="font-bold">Espresso Calibration Masterclass</p>
                  <p className="text-[11px] text-gray-500 mt-1">Aug 12, 2026 at 14:00 CAT • Zoom</p>
                  <a href="https://zoom.us/j/9812401824" target="_blank" rel="noreferrer" className="block text-[11px] text-blue-700 font-bold underline mt-2">
                    Launch Zoom Meeting →
                  </a>
                </div>
                <button onClick={() => setIsLiveClassModalOpen(true)} className="w-full lms-btn-outline py-2 text-xs">
                  + Schedule Another Webinar
                </button>
              </div>

              {/* Discussion Forum Widget */}
              <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm font-inter text-xs space-y-3">
                <h3 className="font-cormorant font-bold text-xl text-lms-dark flex items-center gap-2">
                  <MessageSquare className="text-teal-600" size={20} /> Student Q&A Forum
                </h3>
                <div className="space-y-2">
                  <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                    <p className="font-bold text-gray-800">Marie U.: "What causes channeling in VST baskets?"</p>
                    <p className="text-gray-400 text-[10px] mt-0.5">3 replies • Pending Instructor Verification</p>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* AI Assistant Modal */}
      <AIAssistantModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
        initialMode={aiModalInitialMode}
      />

      {/* Live Class Modal */}
      <LiveClassModal
        isOpen={isLiveClassModalOpen}
        onClose={() => setIsLiveClassModalOpen(false)}
      />
    </Layout>
  );
};

export default InstructorDashboard;
