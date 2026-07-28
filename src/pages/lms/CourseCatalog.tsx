import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BookOpen, Users, PlusCircle, CheckCircle, AlertCircle, Search, Star, Filter } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { useAuth } from "@/contexts/AuthContext";
import { api } from "@/lib/api";
import { toast } from "sonner";

const categories = [
  "All", "Professional Barista", "Food & Beverage", "Restaurant Service",
  "Bartending & Mixology", "Hospitality Management", "HACCP & Food Safety"
];

const CourseCatalog = () => {
  const { user, getToken } = useAuth();
  const [courses, setCourses] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [enrollingId, setEnrollingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Filter state
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    fetchCourses();
  }, [user]);

  const fetchCourses = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const token = await getToken();
      const coursesData = await api.courses.list(token);

      const coursesWithDetails = coursesData.map((course) => ({
        ...course,
        category: course.category || 'Professional Barista',
        difficulty: course.difficulty || 'Beginner',
        is_premium: course.price > 0,
        rating: 4.8 + Math.random() * 0.2,
      }));

      setCourses(coursesWithDetails);
    } catch (err: any) {
      console.error("Error fetching courses:", err);
      setError("Could not load courses. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEnroll = async (courseId: string) => {
    if (!user) {
      toast.error("Please sign in to enroll in courses");
      return;
    }

    setEnrollingId(courseId);
    try {
      const token = await getToken();
      if (!token) throw new Error("Not signed in");
      await api.enrollments.enroll(courseId, token);
      toast.success("Successfully enrolled! Start learning now.");
      setCourses(courses.map((c) => c.id === courseId ? { ...c, is_enrolled: true, students: c.students + 1 } : c));
    } catch (err: any) {
      toast.error("Failed to enroll: " + err.message);
    } finally {
      setEnrollingId(null);
    }
  };

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          course.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <Layout>
      <div className="bg-lms-gradient text-white py-20 relative overflow-hidden">
        <div className="container-custom relative z-10 text-center">
          <span className="badge-new mb-4 font-inter">Verified Hospitality Curriculum</span>
          <h1 className="text-4xl md:text-5xl font-bold font-cormorant mb-6">Course Catalog & Certification</h1>
          <p className="text-xl text-lms-secondary max-w-2xl mx-auto font-inter">
            Master professional hospitality skills from coffee brewing to hotel management with world-class instructors.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mt-8 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search by course title, skill, or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white text-gray-900 placeholder-gray-400 font-inter focus:outline-none focus:ring-2 focus:ring-lms-secondary shadow-lg"
            />
          </div>
        </div>
      </div>

      {/* Category Pills */}
      <div className="bg-white border-b border-gray-100 py-4 sticky top-16 z-30 shadow-sm">
        <div className="container-custom flex items-center gap-2 overflow-x-auto">
          <Filter size={16} className="text-gray-400 shrink-0" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold font-inter whitespace-nowrap transition-all ${
                selectedCategory === cat ? 'bg-lms-primary text-white shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <section className="section-padding bg-lms-bg min-h-screen">
        <div className="container-custom">
          {error && (
            <div className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 rounded-lg p-4 mb-8">
              <AlertCircle size={20} />
              <span>{error}</span>
            </div>
          )}

          {isLoading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-lms-primary"></div>
            </div>
          ) : filteredCourses.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100 max-w-md mx-auto">
              <BookOpen size={48} className="mx-auto text-gray-300 mb-4" />
              <h3 className="text-xl font-medium font-cormorant text-gray-800 mb-2">No matching courses found</h3>
              <p className="text-gray-500 font-inter text-sm mb-4">Try adjusting your search query or selecting a different category filter.</p>
              <button onClick={() => { setSearchQuery(""); setSelectedCategory("All"); }} className="lms-btn-outline text-xs">
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCourses.map((course) => (
                <div
                  key={course.id}
                  className="course-card flex flex-col group"
                >
                  <div className="h-56 relative overflow-hidden">
                    <img
                      src={course.image_url || "/images/barista.jpg"}
                      alt={course.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        const img = e.target as HTMLImageElement;
                        img.onerror = null; // prevent infinite loop
                        img.src = "/placeholder.svg";
                      }}
                    />
                    <div className="absolute top-4 left-4 flex gap-2">
                      <span className={course.price === 0 ? "badge-free" : "badge-premium"}>
                        {course.price === 0 ? "Free" : `$${course.price}`}
                      </span>
                    </div>

                    {course.is_enrolled && (
                      <div className="absolute top-4 right-4 bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
                        <CheckCircle size={14} /> Enrolled
                      </div>
                    )}
                  </div>

                  <div className="p-6 flex-grow flex flex-col">
                    <div className="flex items-center justify-between text-xs text-gray-500 font-inter mb-3">
                      <span className="flex items-center gap-1">
                        <Users size={14} /> {course.students} student{course.students !== 1 ? 's' : ''}
                      </span>
                      <span className="flex items-center gap-1 text-amber-500 font-semibold">
                        <Star size={14} className="fill-amber-400" /> {course.rating.toFixed(1)}
                      </span>
                    </div>

                    <h3 className="text-2xl font-bold font-cormorant text-lms-dark mb-2 group-hover:text-lms-primary transition-colors">{course.title}</h3>
                    <p className="text-gray-600 font-inter text-sm mb-6 flex-grow line-clamp-3 leading-relaxed">{course.description}</p>

                    <div className="flex items-center gap-3 pt-4 border-t border-gray-100 mb-6">
                      <div className="w-9 h-9 rounded-full bg-lms-primary/10 flex items-center justify-center text-lms-primary font-bold text-sm">
                        {course.instructor_name.charAt(0)}
                      </div>
                      <div className="text-xs font-inter">
                        <p className="text-gray-400 uppercase tracking-wider">Instructor</p>
                        <p className="font-semibold text-gray-800">{course.instructor_name}</p>
                      </div>
                    </div>

                    {course.is_enrolled ? (
                      <Link
                        to={`/lms/courses/${course.id}/learn`}
                        className="w-full flex items-center justify-center gap-2 lms-btn-primary text-sm py-3"
                      >
                        <BookOpen size={18} />
                        Go to Course
                      </Link>
                    ) : (
                      <button
                        onClick={() => handleEnroll(course.id)}
                        disabled={enrollingId === course.id}
                        className="w-full flex items-center justify-center gap-2 lms-btn-accent text-sm py-3 disabled:opacity-70"
                      >
                        {enrollingId === course.id ? (
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                          <>
                            <PlusCircle size={18} />
                            {course.price === 0 ? "Enroll Free" : `Enroll for $${course.price}`}
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default CourseCatalog;
