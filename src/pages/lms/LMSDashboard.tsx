import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BookOpen, Clock, Award, PlayCircle, AlertCircle, Flame, Trophy, Briefcase, Calendar, ChevronRight } from "lucide-react";
import Layout from "@/components/layout/Layout";
import SectionTitle from "@/components/ui/SectionTitle";
import { useAuth } from "@/contexts/AuthContext";
import { api } from "@/lib/api";

const LMSDashboard = () => {
  const { user, getToken } = useAuth();
  const [enrolledCourses, setEnrolledCourses] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [certificatesCount, setCertificatesCount] = useState(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEnrollments = async () => {
      if (!user) return;
      setIsLoading(true);
      setError(null);
      try {
        const token = await getToken();
        if (!token) throw new Error("Not signed in");
        const validCourses = await api.enrollments.mine(token);

        setEnrolledCourses(validCourses);
        setCertificatesCount(validCourses.filter((c) => c.progress === 100).length);
      } catch (err: any) {
        console.error("Error fetching enrollments:", err);
        setError("Could not load your courses. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchEnrollments();
  }, [user]);

  return (
    <Layout>
      {/* Student Banner */}
      <div className="bg-lms-gradient text-white py-16">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <span className="badge-new mb-2 font-inter">Student Portal</span>
              <h1 className="text-4xl font-bold font-cormorant mb-2">
                Welcome back, {user?.user_metadata?.full_name || 'Student'}! 👋
              </h1>
              <p className="text-lms-secondary font-inter text-sm">
                Track your active courses, learning streaks, certificates, and job matches.
              </p>
            </div>

            <div className="flex gap-3">
              <Link to="/lms/leaderboard" className="lms-btn-secondary text-xs flex items-center gap-1.5 py-2.5">
                <Trophy size={16} /> Leaderboard
              </Link>
              <Link to="/jobs" className="lms-btn-accent text-xs flex items-center gap-1.5 py-2.5">
                <Briefcase size={16} /> Job Board
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
                  <p className="text-2xl font-bold font-cormorant">{isLoading ? '—' : enrolledCourses.length}</p>
                </div>
              </div>
            </div>

            <div className="glass-card p-5">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/20 rounded-xl text-white">
                  <Clock size={22} />
                </div>
                <div>
                  <p className="text-xs text-lms-secondary uppercase tracking-wider font-inter">In Progress</p>
                  <p className="text-2xl font-bold font-cormorant">
                    {isLoading ? '—' : enrolledCourses.filter(c => c.progress > 0 && c.progress < 100).length}
                  </p>
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
                  <p className="text-2xl font-bold font-cormorant">{isLoading ? '—' : certificatesCount}</p>
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

      <section className="section-padding bg-lms-bg min-h-[50vh]">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Active Enrolled Courses */}
            <div className="lg:col-span-2">
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-cormorant text-3xl font-bold text-lms-dark">My Courses</h2>
                <Link to="/lms/courses" className="text-lms-primary text-sm font-semibold font-inter hover:underline flex items-center gap-1">
                  Browse Catalog <ChevronRight size={16} />
                </Link>
              </div>

              {error && (
                <div className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 rounded-lg p-4 mb-6">
                  <AlertCircle size={20} />
                  <span>{error}</span>
                </div>
              )}

              {isLoading ? (
                <div className="flex justify-center py-16">
                  <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-lms-primary"></div>
                </div>
              ) : enrolledCourses.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {enrolledCourses.map((course) => (
                    <div key={course.id} className="course-card">
                      <div className="h-44 relative">
                        <img
                          src={course.image_url || "/images/barista.jpg"}
                          alt={course.title}
                          className="w-full h-full object-cover"
                          onError={(e) => { (e.target as HTMLImageElement).src = "/images/barista.jpg"; }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-3 left-3 right-3">
                          <h3 className="text-lg font-bold font-cormorant text-white leading-tight line-clamp-1">{course.title}</h3>
                        </div>
                      </div>

                      <div className="p-5">
                        <div className="mb-4">
                          <div className="flex justify-between text-xs font-inter mb-1">
                            <span className="text-gray-500">Progress</span>
                            <span className="text-lms-primary font-bold">{course.progress}%</span>
                          </div>
                          <div className="progress-bar">
                            <div className="progress-fill" style={{ width: `${course.progress}%` }} />
                          </div>
                        </div>

                        <Link
                          to={`/lms/courses/${course.id}/learn`}
                          className="w-full flex items-center justify-center gap-2 lms-btn-primary text-sm py-2.5"
                        >
                          <PlayCircle size={16} />
                          {course.progress > 0 ? 'Continue Lesson' : 'Start Course'}
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 bg-white rounded-2xl border border-gray-100 shadow-sm">
                  <BookOpen size={48} className="mx-auto text-gray-300 mb-3" />
                  <h3 className="text-xl font-medium font-cormorant text-gray-800 mb-1">You aren't enrolled in any courses yet</h3>
                  <p className="text-gray-500 font-inter text-sm mb-6">Explore our catalog to start your learning journey.</p>
                  <Link to="/lms/courses" className="lms-btn-primary text-sm py-2.5">
                    Explore Course Catalog
                  </Link>
                </div>
              )}
            </div>

            {/* Sidebar Widgets */}
            <div className="space-y-6">
              {/* Certificate Widget */}
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <h3 className="font-cormorant font-bold text-xl text-lms-dark mb-3 flex items-center gap-2">
                  <Award className="text-lms-primary" size={20} /> Verified Certificates
                </h3>
                <p className="text-xs text-gray-500 font-inter mb-4">You have earned {certificatesCount} official QR-verified certificate.</p>
                <Link to="/certificate/BBA-2026-001" className="lms-btn-outline w-full text-xs py-2 flex items-center justify-center gap-1">
                  View Latest Certificate
                </Link>
              </div>

              {/* Recommended Jobs */}
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <h3 className="font-cormorant font-bold text-xl text-lms-dark mb-3 flex items-center gap-2">
                  <Briefcase className="text-lms-accent" size={20} /> Recommended Jobs
                </h3>
                <div className="space-y-3 font-inter text-xs">
                  <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                    <p className="font-semibold text-gray-800">Head Barista</p>
                    <p className="text-gray-500">Kigali Marriott Hotel</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                    <p className="font-semibold text-gray-800">F&B Supervisor</p>
                    <p className="text-gray-500">Radisson Blu Kigali</p>
                  </div>
                </div>
                <Link to="/jobs" className="block text-center text-xs text-lms-primary font-semibold font-inter mt-3 hover:underline">
                  View All Matching Jobs →
                </Link>
              </div>

              {/* Upcoming Events */}
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <h3 className="font-cormorant font-bold text-xl text-lms-dark mb-3 flex items-center gap-2">
                  <Calendar className="text-lms-primary" size={20} /> Upcoming Event
                </h3>
                <div className="p-3 bg-lms-primary/5 rounded-xl border border-lms-primary/10 font-inter text-xs">
                  <p className="font-semibold text-lms-primary">Coffee Brewing Masterclass</p>
                  <p className="text-gray-500 mt-0.5">Aug 10, 2026 • Kigali Center</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </Layout>
  );
};

export default LMSDashboard;
