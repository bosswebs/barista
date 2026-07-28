import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Save, ArrowLeft, Plus, Trash2, GripVertical, Video, FileText, AlertCircle, Loader2 } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { api } from "@/lib/api";

interface Lesson {
  id: string;
  title: string;
  type: 'video' | 'text';
  video_url: string;
  content: string;
  order_index: number;
  isNew?: boolean;
}

interface Module {
  id: string;
  title: string;
  order_index: number;
  lessons: Lesson[];
  isNew?: boolean;
}

export default function CourseEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNew = !id;
  const { user, getToken } = useAuth();

  const [isLoading, setIsLoading] = useState(!isNew);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [course, setCourse] = useState({
    title: "",
    description: "",
    image_url: "",
  });

  const [modules, setModules] = useState<Module[]>([]);

  // Load existing course data when editing
  useEffect(() => {
    if (!isNew && id) {
      loadCourse(id);
    }
  }, [id]);

  const loadCourse = async (courseId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const token = await getToken();
      const data = await api.courses.get(courseId, token);

      setCourse({
        title: data.title || "",
        description: data.description || "",
        image_url: data.image_url || "",
      });

      const sortedModules: Module[] = (data.modules || [])
        .sort((a: any, b: any) => a.order_index - b.order_index)
        .map((m: any) => ({
          ...m,
          lessons: (m.lessons || [])
            .sort((a: any, b: any) => a.order_index - b.order_index)
            .map((l: any) => ({
              ...l,
              type: l.video_url ? 'video' : 'text',
            })),
        }));

      setModules(sortedModules);
    } catch (err: any) {
      setError("Could not load course: " + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (!course.title.trim()) {
      toast.error("Please enter a course title.");
      return;
    }
    if (!user) {
      toast.error("You must be logged in to save a course.");
      return;
    }

    setIsSaving(true);
    try {
      const token = await getToken();
      if (!token) throw new Error("Not signed in");

      let courseId = id;

      if (isNew) {
        const newCourse = await api.courses.create(
          {
            title: course.title,
            description: course.description || null,
            image_url: course.image_url || null,
          },
          token
        );
        courseId = newCourse.id;
      } else if (courseId) {
        await api.courses.update(
          courseId,
          {
            title: course.title,
            description: course.description || null,
            image_url: course.image_url || null,
          },
          token
        );
      }

      // Save each module
      for (let mIdx = 0; mIdx < modules.length; mIdx++) {
        const mod = modules[mIdx];
        let moduleId = mod.id;

        if (mod.isNew) {
          const newMod = await api.modules.create({ course_id: courseId, title: mod.title }, token);
          moduleId = newMod.id;
        } else {
          await api.modules.update(moduleId, { title: mod.title, order_index: mIdx }, token);
        }

        // Save each lesson in this module
        for (let lIdx = 0; lIdx < mod.lessons.length; lIdx++) {
          const lesson = mod.lessons[lIdx];
          if (lesson.isNew) {
            await api.lessons.create(
              {
                module_id: moduleId,
                title: lesson.title,
                video_url: lesson.video_url || null,
                content: lesson.content || null,
              },
              token
            );
          } else {
            await api.lessons.update(
              lesson.id,
              {
                title: lesson.title,
                video_url: lesson.video_url || null,
                content: lesson.content || null,
                order_index: lIdx,
              },
              token
            );
          }
        }
      }

      toast.success(isNew ? "Course created successfully! 🎉" : "Course updated successfully!");
      navigate('/lms/instructor');
    } catch (err: any) {
      toast.error("Failed to save: " + err.message);
    } finally {
      setIsSaving(false);
    }
  };

  const addModule = () => {
    setModules([
      ...modules,
      {
        id: `new-m-${Date.now()}`,
        title: "New Module",
        order_index: modules.length,
        lessons: [],
        isNew: true,
      },
    ]);
  };

  const removeModule = async (moduleId: string, isNewModule?: boolean) => {
    if (!isNewModule && !window.confirm("Delete this module and all its lessons?")) return;
    if (!isNewModule) {
      const token = await getToken();
      if (token) await api.modules.remove(moduleId, token);
    }
    setModules(modules.filter((m) => m.id !== moduleId));
  };

  const addLesson = (moduleId: string, type: 'video' | 'text') => {
    setModules(
      modules.map((m) =>
        m.id === moduleId
          ? {
              ...m,
              lessons: [
                ...m.lessons,
                {
                  id: `new-l-${Date.now()}`,
                  title: "New Lesson",
                  type,
                  video_url: "",
                  content: "",
                  order_index: m.lessons.length,
                  isNew: true,
                },
              ],
            }
          : m
      )
    );
  };

  const removeLesson = async (moduleId: string, lessonId: string, isNewLesson?: boolean) => {
    if (!isNewLesson) {
      const token = await getToken();
      if (token) await api.lessons.remove(lessonId, token);
    }
    setModules(
      modules.map((m) =>
        m.id === moduleId
          ? { ...m, lessons: m.lessons.filter((l) => l.id !== lessonId) }
          : m
      )
    );
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

  if (error) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <AlertCircle size={48} className="mx-auto text-red-400 mb-4" />
            <p className="text-gray-700 mb-4">{error}</p>
            <Link to="/lms/instructor" className="btn-primary">Back to Dashboard</Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="bg-gray-50 min-h-screen pb-20">
        {/* Sticky Header */}
        <div className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
          <div className="container-custom py-4 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Link
                to="/lms/instructor"
                className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors"
              >
                <ArrowLeft size={20} />
              </Link>
              <h1 className="text-xl font-bold text-gray-800">
                {isNew ? 'Create New Course' : 'Edit Course'}
              </h1>
            </div>

            <button
              onClick={handleSave}
              disabled={isSaving}
              className="px-5 py-2 bg-bba-brown text-white rounded-lg hover:bg-bba-brown/90 font-medium flex items-center gap-2 disabled:opacity-70 transition-all"
            >
              {isSaving ? (
                <><Loader2 size={18} className="animate-spin" /> Saving...</>
              ) : (
                <><Save size={18} /> Save Course</>
              )}
            </button>
          </div>
        </div>

        <div className="container-custom mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">

            {/* Basic Info */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h2 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">Basic Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Course Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={course.title}
                    onChange={(e) => setCourse({ ...course, title: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bba-brown/30 focus:border-bba-brown outline-none transition"
                    placeholder="e.g., Advanced Latte Art"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    value={course.description}
                    onChange={(e) => setCourse({ ...course, description: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bba-brown/30 focus:border-bba-brown outline-none transition"
                    placeholder="Describe what students will learn..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Cover Image URL</label>
                  <input
                    type="text"
                    value={course.image_url}
                    onChange={(e) => setCourse({ ...course, image_url: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bba-brown/30 focus:border-bba-brown outline-none transition"
                    placeholder="https://..."
                  />
                  {course.image_url && (
                    <img
                      src={course.image_url}
                      alt="Preview"
                      className="mt-3 w-full h-40 object-cover rounded-lg border border-gray-200"
                      onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                    />
                  )}
                </div>
              </div>
            </div>

            {/* Curriculum */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex justify-between items-center mb-4 border-b pb-2">
                <h2 className="text-lg font-bold text-gray-800">Curriculum</h2>
                <button
                  onClick={addModule}
                  className="text-sm text-bba-brown font-medium flex items-center gap-1 hover:underline"
                >
                  <Plus size={16} /> Add Module
                </button>
              </div>

              {modules.length === 0 && (
                <div className="text-center py-10 text-gray-400">
                  <FileText size={36} className="mx-auto mb-3 text-gray-300" />
                  <p className="text-sm">No modules yet. Click "Add Module" to start building your course.</p>
                </div>
              )}

              <div className="space-y-6">
                {modules.map((module, mIdx) => (
                  <div key={module.id} className="border border-gray-200 rounded-xl overflow-hidden">
                    {/* Module Header */}
                    <div className="bg-gray-100 p-4 border-b border-gray-200 flex items-center gap-3">
                      <GripVertical className="text-gray-400 cursor-move shrink-0" size={20} />
                      <input
                        type="text"
                        value={module.title}
                        onChange={(e) => {
                          const updated = [...modules];
                          updated[mIdx].title = e.target.value;
                          setModules(updated);
                        }}
                        className="flex-grow bg-transparent font-bold text-gray-800 border-b border-transparent hover:border-gray-300 focus:border-bba-brown focus:outline-none px-1 transition-colors"
                      />
                      <span className="text-xs text-gray-400 shrink-0">
                        {module.lessons.length} lesson{module.lessons.length !== 1 ? 's' : ''}
                      </span>
                      <button
                        onClick={() => removeModule(module.id, module.isNew)}
                        className="text-red-400 hover:text-red-600 hover:bg-red-50 p-1.5 rounded transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    {/* Lessons */}
                    <div className="p-4 space-y-3 bg-gray-50">
                      {module.lessons.map((lesson, lIdx) => (
                        <div
                          key={lesson.id}
                          className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm"
                        >
                          <div className="flex items-center gap-3 mb-3">
                            <GripVertical className="text-gray-300 cursor-move shrink-0" size={16} />
                            {lesson.type === 'video' ? (
                              <Video size={18} className="text-blue-500 shrink-0" />
                            ) : (
                              <FileText size={18} className="text-orange-500 shrink-0" />
                            )}
                            <input
                              type="text"
                              value={lesson.title}
                              onChange={(e) => {
                                const updated = [...modules];
                                updated[mIdx].lessons[lIdx].title = e.target.value;
                                setModules(updated);
                              }}
                              className="flex-grow text-sm font-medium bg-transparent border-b border-transparent focus:border-bba-brown focus:outline-none transition"
                            />
                            <button
                              onClick={() => removeLesson(module.id, lesson.id, lesson.isNew)}
                              className="text-gray-300 hover:text-red-500 transition-colors"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>

                          {lesson.type === 'video' ? (
                            <input
                              type="text"
                              placeholder="YouTube video URL (e.g., https://youtube.com/watch?v=...)"
                              value={lesson.video_url}
                              onChange={(e) => {
                                const updated = [...modules];
                                updated[mIdx].lessons[lIdx].video_url = e.target.value;
                                setModules(updated);
                              }}
                              className="w-full mt-1 text-xs text-gray-600 bg-gray-50 border border-gray-200 rounded-md px-3 py-2 focus:outline-none focus:border-bba-brown transition"
                            />
                          ) : (
                            <textarea
                              placeholder="Lesson content, quiz questions, or notes..."
                              value={lesson.content}
                              rows={3}
                              onChange={(e) => {
                                const updated = [...modules];
                                updated[mIdx].lessons[lIdx].content = e.target.value;
                                setModules(updated);
                              }}
                              className="w-full mt-1 text-xs text-gray-600 bg-gray-50 border border-gray-200 rounded-md px-3 py-2 focus:outline-none focus:border-bba-brown transition"
                            />
                          )}
                        </div>
                      ))}

                      {/* Add Lesson Buttons */}
                      <div className="flex gap-2 pt-2">
                        <button
                          onClick={() => addLesson(module.id, 'video')}
                          className="text-xs bg-white border border-gray-300 rounded-lg px-3 py-2 flex items-center gap-1.5 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 text-gray-700 transition-colors"
                        >
                          <Video size={14} /> Add Video Lesson
                        </button>
                        <button
                          onClick={() => addLesson(module.id, 'text')}
                          className="text-xs bg-white border border-gray-300 rounded-lg px-3 py-2 flex items-center gap-1.5 hover:bg-orange-50 hover:border-orange-300 hover:text-orange-700 text-gray-700 transition-colors"
                        >
                          <FileText size={14} /> Add Text / Quiz
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {modules.length > 0 && (
                <button
                  onClick={addModule}
                  className="w-full mt-6 border-2 border-dashed border-gray-300 rounded-xl py-4 text-gray-500 hover:border-bba-brown hover:text-bba-brown flex items-center justify-center gap-2 transition-colors"
                >
                  <Plus size={18} /> Add Another Module
                </button>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h2 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">Course Summary</h2>
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Modules</span>
                  <span className="font-bold text-gray-800">{modules.length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Lessons</span>
                  <span className="font-bold text-gray-800">
                    {modules.reduce((sum, m) => sum + m.lessons.length, 0)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Video Lessons</span>
                  <span className="font-bold text-gray-800">
                    {modules.reduce((sum, m) => sum + m.lessons.filter((l) => l.type === 'video').length, 0)}
                  </span>
                </div>
              </div>

              <button
                onClick={handleSave}
                disabled={isSaving}
                className="w-full mt-6 py-3 bg-bba-brown text-white rounded-lg hover:bg-bba-brown/90 font-medium flex items-center justify-center gap-2 disabled:opacity-70 transition-all"
              >
                {isSaving ? (
                  <><Loader2 size={18} className="animate-spin" /> Saving...</>
                ) : (
                  <><Save size={18} /> {isNew ? 'Publish Course' : 'Save Changes'}</>
                )}
              </button>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800">
              <p className="font-semibold mb-1">💡 Tips</p>
              <ul className="space-y-1 text-amber-700 list-disc list-inside">
                <li>Paste full YouTube watch URLs for videos</li>
                <li>Group related lessons into modules</li>
                <li>Add a cover image URL to attract students</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
