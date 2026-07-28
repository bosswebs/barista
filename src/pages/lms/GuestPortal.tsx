import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import RoleSwitcher from '@/components/lms/RoleSwitcher';
import {
  Eye, Play, CheckCircle2, Star, BookOpen, Users, Award, Shield, ArrowRight,
  HelpCircle, Mail, Sparkles, Lock
} from 'lucide-react';
import { toast } from 'sonner';

export const GuestPortal: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [applicantName, setApplicantName] = useState('');
  const [applicantEmail, setApplicantEmail] = useState('');

  const publicCourses = [
    {
      id: 'orientation',
      title: 'Orientation: Welcome to Beyond Barista Academy',
      category: 'Foundation',
      level: 'All Levels',
      duration: '14 Lessons (Free Preview)',
      rating: 4.9,
      students: 2540,
      image: '/images/barista.jpg',
      isFreePreview: true,
      price: 'Free'
    },
    {
      id: 'barista-mastery',
      title: 'Professional Barista Mastery Program',
      category: 'Barista Arts',
      level: 'Beginner to Advanced',
      duration: '24 Modules + Final Exam',
      rating: 5.0,
      students: 1420,
      image: '/images/hero-image.jpg',
      isFreePreview: true,
      price: '$29 / mo'
    },
    {
      id: 'mixology-wine',
      title: 'Advanced Mixology & Sommelier Studies',
      category: 'Beverage & Spirits',
      level: 'Intermediate',
      duration: '12 Modules',
      rating: 4.8,
      students: 680,
      image: '/images/bartending-course.jpg',
      isFreePreview: false,
      price: '$49 / mo'
    }
  ];

  const handleApplication = (e: React.FormEvent) => {
    e.preventDefault();
    if (!applicantName || !applicantEmail) {
      toast.error('Please fill in your name and email.');
      return;
    }
    toast.success(`Application received for ${applicantName}! Check your email for login credentials.`);
    setIsApplyModalOpen(false);
  };

  return (
    <Layout>
      <RoleSwitcher currentRole="guest" />

      {/* Guest Hero Section */}
      <div className="bg-slate-900 text-white py-16 font-inter relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
        <div className="container-custom relative z-10 text-center max-w-4xl mx-auto space-y-6">
          <span className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/20 text-amber-300 rounded-full text-xs font-bold uppercase tracking-wider">
            <Eye size={14} /> Visitor & Guest Learning Portal
          </span>

          <h1 className="font-cormorant text-5xl md:text-6xl font-bold leading-tight">
            Exceeding Industry Standards in Professional Hospitality Training
          </h1>

          <p className="text-slate-300 text-base max-w-2xl mx-auto">
            Explore 24+ accredited modules, preview video lectures for free, verify official student certificates, and apply for immediate enrolment.
          </p>

          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <button
              onClick={() => setIsPreviewOpen(true)}
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-6 py-3 rounded-xl text-sm flex items-center gap-2 shadow-lg"
            >
              <Play size={18} /> Watch Free Lesson Preview
            </button>
            <button
              onClick={() => setIsApplyModalOpen(true)}
              className="bg-slate-800 hover:bg-slate-700 text-white font-bold px-6 py-3 rounded-xl text-sm border border-slate-700"
            >
              Apply for Enrolment
            </button>
          </div>
        </div>
      </div>

      {/* Public Catalog Preview */}
      <section className="section-padding bg-lms-bg font-inter">
        <div className="container-custom space-y-8">
          
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="font-cormorant text-4xl font-bold text-lms-dark">Public Course Catalog</h2>
            <p className="text-sm text-gray-500 mt-1">Browse course modules with free lesson previews available for visitors.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {publicCourses.map((c) => (
              <div key={c.id} className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col">
                <div className="h-48 relative">
                  <img src={c.image} alt={c.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute top-3 right-3">
                    <span className="bg-emerald-500 text-white font-bold text-[10px] px-2.5 py-0.5 rounded-full uppercase">
                      {c.price}
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3">
                    <span className="badge-new text-[10px] mb-1">{c.category}</span>
                    <h3 className="font-cormorant font-bold text-xl text-white leading-tight line-clamp-1">{c.title}</h3>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <p className="text-xs text-gray-500">⏱️ {c.duration} • 🎓 {c.level}</p>

                  <div className="flex gap-2">
                    {c.isFreePreview ? (
                      <button
                        onClick={() => setIsPreviewOpen(true)}
                        className="flex-1 lms-btn-primary text-xs py-2.5 flex items-center justify-center gap-1.5"
                      >
                        <Play size={15} /> Preview Lesson
                      </button>
                    ) : (
                      <button
                        onClick={() => setIsApplyModalOpen(true)}
                        className="flex-1 lms-btn-accent text-xs py-2.5 flex items-center justify-center gap-1.5"
                      >
                        Enrol Now
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Free Lesson Preview Player Modal */}
      {isPreviewOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 font-inter text-xs">
          <div className="bg-slate-900 border border-slate-700 text-white rounded-3xl max-w-3xl w-full p-6 shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <div>
                <span className="badge-free text-[10px]">Free Guest Preview</span>
                <h3 className="font-cormorant text-2xl font-bold mt-1">Lesson 01: Welcome to Beyond Barista Academy</h3>
              </div>
              <button onClick={() => setIsPreviewOpen(false)} className="text-slate-400 hover:text-white text-xl font-bold">✕</button>
            </div>

            <div className="aspect-video bg-black rounded-2xl overflow-hidden relative border border-slate-800">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                title="BBA Lesson Preview"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            <div className="p-3 bg-slate-800 rounded-xl border border-slate-700 flex justify-between items-center">
              <p className="text-slate-300 text-[11px]">Like what you see? Register now for full access to 24 Barista Modules & Quizzes.</p>
              <button onClick={() => { setIsPreviewOpen(false); setIsApplyModalOpen(true); }} className="lms-btn-primary text-xs py-2 px-4 whitespace-nowrap">
                Register for Full Course →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Apply Modal */}
      {isApplyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 font-inter text-xs">
          <form onSubmit={handleApplication} className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4 text-gray-900">
            <h3 className="font-cormorant text-2xl font-bold text-lms-dark">Guest Registration & Application</h3>
            <div>
              <label className="font-semibold text-gray-600 block mb-1">Your Full Name</label>
              <input type="text" placeholder="e.g. Jean Mutabazi" value={applicantName} onChange={e => setApplicantName(e.target.value)} className="lms-input" />
            </div>
            <div>
              <label className="font-semibold text-gray-600 block mb-1">Email Address</label>
              <input type="email" placeholder="e.g. jean@example.com" value={applicantEmail} onChange={e => setApplicantEmail(e.target.value)} className="lms-input" />
            </div>
            <div className="flex gap-2 pt-2">
              <button type="submit" className="lms-btn-primary flex-1">Submit Application</button>
              <button type="button" onClick={() => setIsApplyModalOpen(false)} className="px-4 py-2 border rounded-xl font-bold">Cancel</button>
            </div>
          </form>
        </div>
      )}

    </Layout>
  );
};

export default GuestPortal;
