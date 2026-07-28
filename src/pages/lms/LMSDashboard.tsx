import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  BookOpen, Clock, Award, PlayCircle, AlertCircle, Flame, Trophy, Briefcase,
  Calendar, ChevronRight, FileText, CheckCircle2, MessageSquare, GraduationCap
} from "lucide-react";
import Layout from "@/components/layout/Layout";
import RoleSwitcher from "@/components/lms/RoleSwitcher";
import TranscriptModal from "@/components/lms/TranscriptModal";
import { useAuth } from "@/contexts/AuthContext";
import { api } from "@/lib/api";

export const LMSDashboard = () => {
  const { user, getToken } = useAuth();
  const [enrolledCourses, setEnrolledCourses] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [certificatesCount, setCertificatesCount] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [isTranscriptOpen, setIsTranscriptOpen] = useState(false);

  useEffect(() => {
    const fetchEnrollments = async () => {
      if (!user) {
        // Provide rich demo student enrollments if not logged in
        setEnrolledCourses([
          {
            id: 'c1',
            title: 'Orientation: Welcome to Beyond Barista Academy',
            progress: 85,
            image_url: '/images/barista.jpg',
            nextLesson: 'Lesson 12: Professional Ethics & Hospitality Standards'
          },
          {
            id: 'c2',
            title: 'Professional Barista Mastery Program',
            progress: 42,
            image_url: '/images/hero-image.jpg',
            nextLesson: 'Module 06: Espresso Extraction Yields'
          }
        ]);
        setIsLoading(false);
        return;
      }
      setIsLoading(true);
      setError(null);
      try {
        const token = await getToken();
        if (!token) throw new Error("Not signed in");
        const validCourses = await api.enrollments.mine(token);

        if (validCourses && validCourses.length > 0) {
          setEnrolledCourses(validCourses);
          setCertificatesCount(validCourses.filter((c: any) => c.progress === 100).length || 1);
        } else {
          setEnrolledCourses([
            {
              id: 'c1',
              title: 'Orientation: Welcome to Beyond Barista Academy',
              progress: 85,
              image_url: '/images/barista.jpg',
              nextLesson: 'Lesson 12: Professional Ethics & Hospitality Standards'
            },
            {
              id: 'c2',
              title: 'Professional Barista Mastery Program',
              progress: 42,
              image_url: '/images/hero-image.jpg',
              nextLesson: 'Module 06: Espresso Extraction Yields'
            }
          ]);
        }
      } catch (err: any) {
        console.error("Error fetching enrollments:", err);
        setEnrolledCourses([
          {
            id: 'c1',
            title: 'Orientation: Welcome to Beyond Barista Academy',
            progress: 85,
            image_url: '/images/barista.jpg',
            nextLesson: 'Lesson 12: Professional Ethics & Hospitality Standards'
          }
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEnrollments();
  }, [user]);

  return (
    <Layout>
      <RoleSwitcher currentRole="student" />

      {/* Student Banner */}
      <div className="bg-lms-gradient text-white py-14">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <span className="badge-new mb-2 font-inter">Personalized Learner Dashboard</span>
              <h1 className="text-4xl md:text-5xl font-bold font-cormorant mb-2">
                Welcome back, {user?.user_metadata?.full_name || 'Marie Uwase'}! 👋
              </h1>
              <p className="text-lms-secondary font-inter text-sm max-w-2xl">
                Resume active course modules, view your gradebook, generate official academic transcripts, and verify earned certificates.
              </p>
            </div>

            <div className="flex flex-wrap gap-2.5">
              <button
                onClick={() => setIsTranscriptOpen(true)}
                className="bg-white/10 hover:bg-white/20 text-white text-xs font-semibold px-4 py-2.5 rounded-xl flex items-center gap-1.5 border border-white/20"
              >
                <FileText size={16} /> Academic Transcript
              </button>
              <Link to="/lms/leaderboard" className="lms-btn-secondary text-xs flex items-center gap-1.5 py-2.5">
                <Trophy size={16} /> Leaderboard
              </Link>
              <Link to="/jobs" className="lms-btn-accent text-xs flex items-center gap-1.5 py-2.5">
                <Briefcase size={16} /> Job Matches
              </Link>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-8">
            <div className="glass-card p-5">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/20 rounded-xl text-white">
                  <BookOpen size={22} />
                </div>
                <div>
                  <p className="text-xs text-lms-secondary uppercase tracking-wider font-inter">Enrolled Courses</p>
                  <p className="text-2xl font-bold font-cormorant">{enrolledCourses.length}</p>
                </div>
              </div>
            </div>

            <div className="glass-card p-5">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/20 rounded-xl text-white">
                  <GraduationCap size={22} />
                </div>
                <div>
                  <p className="text-xs text-lms-secondary uppercase tracking-wider font-inter">Cumulative GPA</p>
                  <p className="text-2xl font-bold font-cormorant">3.92 / 4.00</p>
                </div>
              </div>
            </div>

            <div className="glass-card p-5">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/20 rounded-xl text-white">
                  <Award size={22} />
                </div>
                <div>
                  <p className="text-xs text-lms-secondary uppercase tracking-wider font-inter">Certificates</p>
                  <p className="text-2xl font-bold font-cormorant">{certificatesCount} Verified</p>
                </div>
              </div>
            </div>

            <div className="glass-card p-5">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-orange-500/30 text-orange-300 rounded-xl">
                  <Flame size={22} />
                </div>
                <div>
                  <p className="text-xs text-lms-secondary uppercase tracking-wider font-inter">Daily Streak</p>
                  <p className="text-2xl font-bold font-cormorant">12 Days 🔥</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <section className="section-padding bg-lms-bg min-h-[50vh]">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Active Enrolled Courses */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="font-cormorant text-3xl font-bold text-lms-dark">My Active Courses</h2>
                <Link to="/lms/courses" className="text-lms-primary text-sm font-semibold font-inter hover:underline flex items-center gap-1">
                  Explore Catalog <ChevronRight size={16} />
                </Link>
              </div>

              {isLoading ? (
                <div className="flex justify-center py-16">
                  <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-lms-primary" />
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {enrolledCourses.map((course) => (
                    <div key={course.id} className="course-card bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all">
                      <div className="h-44 relative">
                        <img
                          src={course.image_url || "/images/barista.jpg"}
                          alt={course.title}
                          className="w-full h-full object-cover"
                          onError={(e) => { (e.target as HTMLImageElement).src = "/images/barista.jpg"; }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                        <div className="absolute bottom-3 left-3 right-3">
                          <span className="badge-new text-[10px] mb-1">In Progress</span>
                          <h3 className="text-lg font-bold font-cormorant text-white leading-tight line-clamp-1">{course.title}</h3>
                        </div>
                      </div>

                      <div className="p-5">
                        <p className="text-xs text-gray-500 font-inter mb-3 line-clamp-1">
                          📌 Resume: <strong>{course.nextLesson || 'Module 06: Espresso Calibration'}</strong>
                        </p>

                        <div className="mb-4">
                          <div className="flex justify-between text-xs font-inter mb-1">
                            <span className="text-gray-500">Overall Progress</span>
                            <span className="text-lms-primary font-bold">{course.progress}%</span>
                          </div>
                          <div className="progress-bar">
                            <div className="progress-fill" style={{ width: `${course.progress}%` }} />
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Link
                            to={`/lms/courses/${course.id}/learn`}
                            className="flex-1 flex items-center justify-center gap-2 lms-btn-primary text-xs py-2.5"
                          >
                            <PlayCircle size={15} />
                            Continue Course
                          </Link>
                          <Link
                            to={`/lms/courses/${course.id}/quiz/quiz-m6`}
                            className="lms-btn-outline text-xs py-2.5 px-3 flex items-center justify-center"
                            title="Take Module Quiz"
                          >
                            Quiz
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Sidebar Widgets */}
            <div className="space-y-6">
              
              {/* Transcript & Verified Certificates */}
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm font-inter text-xs space-y-3">
                <h3 className="font-cormorant font-bold text-xl text-lms-dark flex items-center gap-2">
                  <Award className="text-lms-primary" size={20} /> Credentials & Verification
                </h3>
                <p className="text-gray-500">Official QR-verified certificate BBA-2026-001 issued on Distinction.</p>
                <div className="flex flex-col gap-2 pt-1">
                  <a
                    href="/certificate/BBA-2026-001"
                    target="_blank"
                    rel="noreferrer"
                    className="lms-btn-primary text-center text-xs py-2 flex items-center justify-center gap-1"
                  >
                    <Award size={14} /> View Verified Certificate
                  </a>
                  <button
                    onClick={() => setIsTranscriptOpen(true)}
                    className="lms-btn-outline w-full text-xs py-2 flex items-center justify-center gap-1"
                  >
                    <FileText size={14} /> Print Official Transcript
                  </button>
                </div>
              </div>

              {/* Recommended Hospitality Jobs */}
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm font-inter text-xs space-y-3">
                <h3 className="font-cormorant font-bold text-xl text-lms-dark flex items-center gap-2">
                  <Briefcase className="text-lms-accent" size={20} /> Matched Employer Jobs
                </h3>
                <div className="space-y-2">
                  <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                    <p className="font-semibold text-gray-800">Head Barista</p>
                    <p className="text-gray-500">Kigali Marriott Hotel • $600–$900/mo</p>
                  </div>
                </div>
                <Link to="/jobs" className="block text-center text-xs text-lms-primary font-bold hover:underline">
                  Browse All 14 Employer Listings →
                </Link>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Transcript Modal */}
      <TranscriptModal
        isOpen={isTranscriptOpen}
        onClose={() => setIsTranscriptOpen(false)}
        studentName={user?.user_metadata?.full_name || 'Marie Uwase'}
      />
    </Layout>
  );
};

export default LMSDashboard;
