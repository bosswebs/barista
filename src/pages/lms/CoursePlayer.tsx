import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ChevronLeft, CheckCircle, Circle, PlayCircle, FileText, AlertCircle } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { useAuth } from "@/contexts/AuthContext";
import { api } from "@/lib/api";
import { toast } from "sonner";

const CoursePlayer = () => {
  const { courseId } = useParams();
  const { user, getToken } = useAuth();
  const [course, setCourse] = useState<any>(null);
  const [activeLesson, setActiveLesson] = useState<any>(null);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCourse();
  }, [courseId, user]);

  const fetchCourse = async () => {
    if (!courseId) return;
    setIsLoading(true);
    setError(null);
    try {
      const token = await getToken();
      const courseData = await api.courses.get(courseId, token);

      const sortedCourse = {
        ...courseData,
        modules: (courseData.modules || [])
          .sort((a: any, b: any) => a.order_index - b.order_index)
          .map((m: any) => ({
            ...m,
            lessons: (m.lessons || []).sort((a: any, b: any) => a.order_index - b.order_index),
          })),
      };
      setCourse(sortedCourse);
      if (sortedCourse.modules?.[0]?.lessons?.[0]) {
        setActiveLesson(sortedCourse.modules[0].lessons[0]);
      }

      if (user && token) {
        const progress = await api.progress.forCourse(courseId, token);
        setCompletedLessons(progress.completed_lesson_ids);
      }
    } catch (err: any) {
      console.error("Error fetching course:", err);
      setError("Could not load this course. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const markAsComplete = async (lessonId: string) => {
    if (completedLessons.includes(lessonId)) return;

    // Optimistically update UI
    setCompletedLessons((prev) => [...prev, lessonId]);
    toast.success("Lesson completed! Keep going 🎉");

    if (user) {
      try {
        const token = await getToken();
        if (!token) throw new Error("Not signed in");
        await api.progress.markComplete(lessonId, token);
      } catch (err) {
        // Revert on failure
        setCompletedLessons((prev) => prev.filter((id) => id !== lessonId));
        toast.error("Failed to save progress.");
      }
    }
  };

  const calculateProgress = () => {
    if (!course) return 0;
    const totalLessons = course.modules.reduce((acc: number, m: any) => acc + m.lessons.length, 0);
    if (totalLessons === 0) return 0;
    return Math.round((completedLessons.length / totalLessons) * 100);
  };

  const getYouTubeEmbedUrl = (url: string) => {
    if (!url) return '';
    // Handle various YouTube URL formats
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    if (match && match[2].length === 11) {
      return `https://www.youtube.com/embed/${match[2]}`;
    }
    // Already an embed URL or other format
    return url;
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-bba-brown"></div>
        </div>
      </Layout>
    );
  }

  if (error || !course) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <AlertCircle size={48} className="mx-auto text-red-400 mb-4" />
            <h2 className="text-xl font-bold text-gray-800 mb-2">{error || "Course not found"}</h2>
            <Link to="/lms" className="btn-primary mt-4 inline-block">Back to Dashboard</Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="flex flex-col h-[calc(100vh-80px)]">
        {/* Player Header */}
        <div className="bg-bba-brown text-white h-16 flex items-center justify-between px-4 lg:px-8 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-4">
            <Link to="/lms" className="text-gray-300 hover:text-white transition-colors">
              <ChevronLeft size={24} />
            </Link>
            <h1 className="font-semibold text-lg hidden md:block">{course.title}</h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm">
              <span className="text-gray-300">Progress</span>
              <span className="font-bold text-bba-gold">{calculateProgress()}%</span>
            </div>
            <div className="w-32 bg-white/20 rounded-full h-2 hidden sm:block">
              <div
                className="bg-bba-gold h-2 rounded-full transition-all duration-500"
                style={{ width: `${calculateProgress()}%` }}
              ></div>
            </div>
            <button
              className="lg:hidden p-2 text-gray-300 hover:text-white"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
            </button>
          </div>
        </div>

        {/* Player Content Area */}
        <div className="flex flex-1 overflow-hidden">

          {/* Main Video Area */}
          <div className="flex-1 flex flex-col bg-black relative overflow-y-auto">
            {activeLesson ? (
              <>
                {activeLesson.video_url ? (
                  <div className="w-full aspect-video bg-black max-h-[70vh] flex-shrink-0">
                    <iframe
                      src={getYouTubeEmbedUrl(activeLesson.video_url)}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                ) : (
                  <div className="w-full min-h-[50vh] bg-white text-gray-800 p-8 flex items-center justify-center">
                    <div className="max-w-3xl w-full">
                      <h2 className="text-3xl font-bold mb-6">{activeLesson.title}</h2>
                      <div className="prose max-w-none text-gray-700 whitespace-pre-wrap">
                        {activeLesson.content || "No content available for this lesson."}
                      </div>
                    </div>
                  </div>
                )}

                {/* Lesson Details */}
                <div className="flex-1 bg-white p-6 md:p-10 border-t border-gray-200">
                  <div className="max-w-4xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-800 mb-2">{activeLesson.title}</h2>
                      <p className="text-gray-500">
                        Module:{' '}
                        {course.modules.find((m: any) =>
                          m.lessons.some((l: any) => l.id === activeLesson.id)
                        )?.title}
                      </p>
                    </div>

                    <button
                      onClick={() => markAsComplete(activeLesson.id)}
                      disabled={completedLessons.includes(activeLesson.id)}
                      className={`px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition-all ${
                        completedLessons.includes(activeLesson.id)
                          ? 'bg-green-100 text-green-700 cursor-not-allowed border border-green-200'
                          : 'bg-bba-brown text-white hover:bg-bba-brown/90 shadow-md'
                      }`}
                    >
                      {completedLessons.includes(activeLesson.id) ? (
                        <><CheckCircle size={20} /> Completed</>
                      ) : (
                        <><Circle size={20} /> Mark as Complete</>
                      )}
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 bg-white flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <FileText size={48} className="mx-auto mb-4 text-gray-300" />
                  <p>Select a lesson to begin</p>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className={`${isSidebarOpen ? 'w-80 translate-x-0' : 'w-0 translate-x-full lg:w-0'} transition-all duration-300 ease-in-out flex-shrink-0 bg-gray-50 border-l border-gray-200 flex flex-col h-full overflow-hidden absolute lg:static right-0 top-0 z-10 lg:z-auto`}>
            <div className="p-4 bg-white border-b border-gray-200 font-bold text-gray-800 shrink-0 flex justify-between items-center">
              <span>Course Content</span>
              <button className="lg:hidden text-gray-500" onClick={() => setIsSidebarOpen(false)}>✕</button>
            </div>

            <div className="flex-1 overflow-y-auto">
              {course.modules.map((module: any, mIdx: number) => (
                <div key={module.id} className="border-b border-gray-200">
                  <div className="bg-gray-100 p-4 font-semibold text-gray-800 text-sm">
                    Section {mIdx + 1}: {module.title}
                  </div>
                  <div>
                    {module.lessons.map((lesson: any, lIdx: number) => {
                      const isActive = activeLesson?.id === lesson.id;
                      const isCompleted = completedLessons.includes(lesson.id);

                      return (
                        <button
                          key={lesson.id}
                          onClick={() => setActiveLesson(lesson)}
                          className={`w-full text-left p-4 flex gap-3 hover:bg-gray-50 transition-colors border-l-4 ${
                            isActive ? 'border-bba-gold bg-orange-50' : 'border-transparent'
                          }`}
                        >
                          <div className="mt-0.5 text-gray-400">
                            {isCompleted ? (
                              <CheckCircle size={18} className="text-green-500" />
                            ) : lesson.video_url ? (
                              <PlayCircle size={18} />
                            ) : (
                              <FileText size={18} />
                            )}
                          </div>
                          <div>
                            <p className={`text-sm font-medium ${isActive ? 'text-bba-brown font-bold' : 'text-gray-700'}`}>
                              {lIdx + 1}. {lesson.title}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </Layout>
  );
};

export default CoursePlayer;
