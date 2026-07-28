import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Plus, Edit, Trash2, Users, BookOpen, AlertCircle, RefreshCw } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { useAuth } from "@/contexts/AuthContext";
import { api } from "@/lib/api";
import { toast } from "sonner";

const InstructorDashboard = () => {
  const { user, getToken } = useAuth();
  const [courses, setCourses] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) fetchCourses();
  }, [user]);

  const fetchCourses = async () => {
    if (!user) return;
    setIsLoading(true);
    setError(null);
    try {
      const token = await getToken();
      if (!token) throw new Error("Not signed in");
      const coursesWithCounts = await api.instructor.courses(token);
      setCourses(coursesWithCounts);
    } catch (err: any) {
      console.error("Error fetching courses:", err);
      setError("Could not load your courses. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`Delete "${title}"? This will also remove all modules, lessons, and student enrollments. This cannot be undone.`)) return;

    try {
      const token = await getToken();
      if (!token) throw new Error("Not signed in");
      await api.courses.remove(id, token);

      setCourses(courses.filter((c) => c.id !== id));
      toast.success("Course deleted successfully.");
    } catch (err: any) {
      toast.error("Failed to delete course: " + err.message);
    }
  };

  return (
    <Layout>
      <div className="bg-gray-900 text-white py-12">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">Instructor Dashboard</h1>
              <p className="text-gray-400">Manage your Barista courses and students</p>
            </div>
            <Link
              to="/lms/instructor/courses/new"
              className="btn-primary flex items-center gap-2"
            >
              <Plus size={20} /> Create New Course
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <div className="bg-white/10 rounded-lg p-4">
              <p className="text-gray-400 text-sm">Total Courses</p>
              <p className="text-2xl font-bold mt-1">{courses.length}</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <p className="text-gray-400 text-sm">Total Students</p>
              <p className="text-2xl font-bold mt-1">
                {courses.reduce((sum, c) => sum + (c.students || 0), 0)}
              </p>
            </div>
          </div>
        </div>
      </div>

      <section className="section-padding bg-gray-50 min-h-[60vh]">
        <div className="container-custom">

          {error && (
            <div className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 rounded-lg p-4 mb-6">
              <AlertCircle size={20} />
              <span>{error}</span>
              <button
                onClick={fetchCourses}
                className="ml-auto flex items-center gap-1 text-sm underline"
              >
                <RefreshCw size={14} /> Retry
              </button>
            </div>
          )}

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <BookOpen className="text-bba-brown" /> My Courses
              </h2>
              {!isLoading && (
                <button
                  onClick={fetchCourses}
                  className="text-gray-500 hover:text-bba-brown p-2 rounded-full hover:bg-gray-100 transition-colors"
                  title="Refresh"
                >
                  <RefreshCw size={18} />
                </button>
              )}
            </div>

            {isLoading ? (
              <div className="flex justify-center py-16">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-bba-brown"></div>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50 text-gray-500 text-sm">
                      <th className="p-4 font-medium">Course Title</th>
                      <th className="p-4 font-medium">Students</th>
                      <th className="p-4 font-medium">Created</th>
                      <th className="p-4 font-medium text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {courses.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="p-10 text-center text-gray-500">
                          <BookOpen size={36} className="mx-auto text-gray-300 mb-3" />
                          <p className="font-medium">You haven't created any courses yet.</p>
                          <Link
                            to="/lms/instructor/courses/new"
                            className="inline-flex items-center gap-1 mt-3 text-bba-brown font-medium hover:underline"
                          >
                            <Plus size={16} /> Create your first course
                          </Link>
                        </td>
                      </tr>
                    ) : (
                      courses.map((course) => (
                        <tr key={course.id} className="hover:bg-gray-50 transition-colors">
                          <td className="p-4 font-medium text-gray-800">{course.title}</td>
                          <td className="p-4 text-gray-600">
                            <span className="flex items-center gap-1">
                              <Users size={16} /> {course.students}
                            </span>
                          </td>
                          <td className="p-4 text-gray-600 text-sm">
                            {new Date(course.created_at).toLocaleDateString()}
                          </td>
                          <td className="p-4 text-right">
                            <div className="flex justify-end gap-2">
                              <Link
                                to={`/lms/instructor/courses/${course.id}/edit`}
                                className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                                title="Edit Course"
                              >
                                <Edit size={18} />
                              </Link>
                              <button
                                onClick={() => handleDelete(course.id, course.title)}
                                className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                                title="Delete Course"
                              >
                                <Trash2 size={18} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>

        </div>
      </section>
    </Layout>
  );
};

export default InstructorDashboard;
