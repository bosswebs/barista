import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import {
  Coffee, UtensilsCrossed, Wine, Star, Users, Award, BookOpen,
  Briefcase, Calendar, ArrowRight, Play, CheckCircle, ChevronLeft,
  ChevronRight, Sparkles, TrendingUp, Globe, Shield
} from 'lucide-react';

// ============ DATA ============
const stats = [
  { value: 2500, label: 'Students Trained', suffix: '+', icon: Users },
  { value: 15, label: 'Expert Courses', suffix: '+', icon: BookOpen },
  { value: 98, label: 'Completion Rate', suffix: '%', icon: TrendingUp },
  { value: 45, label: 'Partner Employers', suffix: '+', icon: Briefcase },
];

const categories = [
  { name: 'Professional Barista', icon: Coffee, count: 8, color: 'bg-amber-50 text-amber-700 border-amber-200' },
  { name: 'Food & Beverage', icon: UtensilsCrossed, count: 6, color: 'bg-orange-50 text-orange-700 border-orange-200' },
  { name: 'Restaurant Service', icon: Star, count: 5, color: 'bg-red-50 text-red-700 border-red-200' },
  { name: 'Bartending & Mixology', icon: Wine, count: 4, color: 'bg-purple-50 text-purple-700 border-purple-200' },
  { name: 'Hospitality Management', icon: Globe, count: 7, color: 'bg-lms-primary/10 text-lms-primary border-lms-secondary/30' },
  { name: 'Hotel Operations', icon: Shield, count: 6, color: 'bg-blue-50 text-blue-700 border-blue-200' },
  { name: 'HACCP & Food Safety', icon: CheckCircle, count: 3, color: 'bg-green-50 text-green-700 border-green-200' },
  { name: 'Entrepreneurship', icon: TrendingUp, count: 4, color: 'bg-teal-50 text-teal-700 border-teal-200' },
];

const featuredCourses = [
  {
    id: '1', title: 'Professional Barista Mastery', category: 'Barista Training',
    image: '/images/barista.jpg', instructor: 'Chef Jean-Paul', duration: '24 hrs',
    students: 342, rating: 4.9, price: 0, badge: 'bestseller',
  },
  {
    id: '2', title: 'Advanced Mixology & Cocktail Arts', category: 'Bartending',
    image: '/images/vodka.jpg', instructor: 'Master Émile', duration: '18 hrs',
    students: 218, rating: 4.8, price: 49, badge: 'premium',
  },
  {
    id: '3', title: 'Wine Sommelier Certification', category: 'Sommelier',
    image: '/images/wine.jpg', instructor: 'Maître Amina', duration: '32 hrs',
    students: 156, rating: 4.9, price: 79, badge: 'premium',
  },
  {
    id: '4', title: 'Restaurant Service Excellence', category: 'Restaurant Service',
    image: '/images/barista.jpg', instructor: 'Pascal K.', duration: '16 hrs',
    students: 289, rating: 4.7, price: 0, badge: 'free',
  },
];

const testimonials = [
  {
    name: 'Marie Uwase', role: 'Head Barista, Kigali Marriott', avatar: 'MU',
    text: 'BBA transformed my career. Within 3 months of certification I was hired at a 5-star hotel. The instructors are world-class.',
    rating: 5, country: '🇷🇼 Rwanda',
  },
  {
    name: 'Emmanuel Nkusi', role: 'Bar Manager, Radisson Blu', avatar: 'EN',
    text: 'The mixology course is incredible — hands-on, practical, and recognized by top hotels across East Africa.',
    rating: 5, country: '🇷🇼 Rwanda',
  },
  {
    name: 'Fatou Diallo', role: 'F&B Supervisor, Serena Hotel', avatar: 'FD',
    text: 'I enrolled online from Senegal and the course quality exceeded my expectations. Got certified and promoted within a year.',
    rating: 5, country: '🇸🇳 Senegal',
  },
];

const upcomingEvents = [
  { title: 'Coffee Brewing Masterclass', date: 'Aug 10, 2026', type: 'Workshop', spots: 15 },
  { title: 'Hospitality Career Fair', date: 'Aug 22, 2026', type: 'Event', spots: 100 },
  { title: 'Wine & Food Pairing Webinar', date: 'Sep 5, 2026', type: 'Webinar', spots: 50 },
];

const recentJobs = [
  { title: 'Head Barista', company: 'Kigali Marriott Hotel', type: 'Full-time', location: 'Kigali' },
  { title: 'F&B Supervisor', company: 'Radisson Blu Kigali', type: 'Full-time', location: 'Kigali' },
  { title: 'Bartender', company: 'Serena Hotel', type: 'Full-time', location: 'Kampala' },
];

const partners = ['Marriott', 'Radisson Blu', 'Serena Hotels', 'RwandAir', 'Golden Tulip', 'Protea Hotels'];

// ============ ANIMATED COUNTER HOOK ============
const useCounter = (end: number, duration = 2000, start = false) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [end, duration, start]);
  return count;
};

// ============ STAT CARD ============
const StatCard = ({ stat, animate }: { stat: typeof stats[0]; animate: boolean }) => {
  const count = useCounter(stat.value, 2000, animate);
  return (
    <div className="text-center">
      <div className="flex justify-center mb-3">
        <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center">
          <stat.icon size={24} className="text-lms-secondary" />
        </div>
      </div>
      <div className="text-4xl font-cormorant font-bold text-white">
        {animate ? count : stat.value}{stat.suffix}
      </div>
      <p className="text-lms-secondary text-sm font-inter mt-1">{stat.label}</p>
    </div>
  );
};

// ============ STAR RATING ============
const Stars = ({ rating }: { rating: number }) => (
  <div className="flex gap-0.5">
    {Array.from({ length: 5 }).map((_, i) => (
      <Star key={i} size={14} className={i < rating ? 'text-amber-400 fill-amber-400' : 'text-gray-300'} />
    ))}
  </div>
);

// ============ MAIN PAGE ============
const Index = () => {
  const [statsVisible, setStatsVisible] = useState(false);
  const [testimonialIdx, setTestimonialIdx] = useState(0);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setStatsVisible(true); observer.disconnect(); }
    }, { threshold: 0.3 });
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const t = setInterval(() => setTestimonialIdx(i => (i + 1) % testimonials.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <Layout>
      {/* ===== HERO ===== */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <img src="/images/herosection.jpg" alt="Hero" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-br from-lms-dark/90 via-lms-primary/70 to-lms-dark/80" />
        </div>

        {/* Floating decorative elements */}
        <div className="absolute top-32 right-20 w-64 h-64 bg-lms-secondary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-20 w-48 h-48 bg-lms-accent/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />

        <div className="container-custom relative z-10 pt-24 pb-16">
          <div className="max-w-4xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white text-sm font-inter mb-6 animate-fade-in">
              <Sparkles size={14} className="text-lms-secondary" />
              <span>Rwanda's #1 Hospitality Training Platform</span>
            </div>

            {/* Headline */}
            <h1 className="font-cormorant text-5xl md:text-7xl font-bold text-white leading-tight mb-6">
              From Learning
              <span className="text-lms-secondary block">to Certification</span>
              <span className="text-lms-accent">to Employment.</span>
            </h1>

            <p className="text-white/80 text-lg md:text-xl font-inter leading-relaxed mb-10 max-w-2xl">
              Beyond Barista Academy transforms passionate individuals into world-class hospitality professionals
              through premium online and physical training in Kigali, Rwanda.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link to="/lms/courses"
                className="lms-btn-primary flex items-center gap-2 text-base animate-pulse-glow">
                <BookOpen size={18} /> Explore Courses
              </Link>
              <Link to="/membership"
                className="flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/30 text-white rounded-xl font-semibold hover:bg-white/20 transition-all duration-300 font-inter">
                <Award size={18} /> View Membership Plans
              </Link>
              <button className="flex items-center gap-2 px-6 py-3 text-white/80 hover:text-white transition-colors font-inter">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <Play size={16} className="ml-0.5" />
                </div>
                Watch Demo
              </button>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap items-center gap-6 mt-12 pt-8 border-t border-white/10">
              {['Supabase Powered', 'Secure Payments', 'Verified Certificates'].map((item) => (
                <div key={item} className="flex items-center gap-2 text-white/60 text-sm font-inter">
                  <CheckCircle size={14} className="text-lms-secondary" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40 animate-bounce">
          <p className="text-xs font-inter">Scroll to explore</p>
          <div className="w-5 h-8 border-2 border-white/30 rounded-full flex items-start justify-center pt-1">
            <div className="w-1 h-2 bg-white/50 rounded-full animate-scroll" />
          </div>
        </div>
      </section>

      {/* ===== STATS ===== */}
      <section ref={statsRef} className="bg-lms-gradient py-16">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s) => <StatCard key={s.label} stat={s} animate={statsVisible} />)}
          </div>
        </div>
      </section>

      {/* ===== TRUSTED PARTNERS ===== */}
      <section className="bg-white border-b border-gray-100 py-10">
        <div className="container-custom">
          <p className="text-center text-sm text-gray-500 font-inter uppercase tracking-widest mb-6">
            Trusted by leading hospitality brands
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8">
            {partners.map((p) => (
              <div key={p} className="px-6 py-3 bg-gray-50 rounded-xl border border-gray-100">
                <span className="font-cormorant font-semibold text-gray-600 text-lg">{p}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== COURSE CATEGORIES ===== */}
      <section className="section-padding bg-lms-bg">
        <div className="container-custom">
          <div className="text-center mb-12">
            <span className="text-lms-primary text-sm font-semibold font-inter uppercase tracking-widest">Explore by Category</span>
            <h2 className="font-cormorant text-4xl md:text-5xl font-bold text-lms-dark mt-2 mb-4">
              World-Class Training Areas
            </h2>
            <p className="text-gray-600 font-inter max-w-2xl mx-auto">
              From professional barista to hospitality management — we cover every aspect of the modern hospitality industry.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((cat) => (
              <Link key={cat.name} to="/lms/courses"
                className={`p-5 rounded-2xl border-2 ${cat.color} hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group`}>
                <cat.icon size={28} className="mb-3" />
                <h3 className="font-cormorant font-bold text-lg leading-tight mb-1">{cat.name}</h3>
                <p className="text-xs opacity-70 font-inter">{cat.count} courses</p>
              </Link>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link to="/lms/courses" className="lms-btn-outline inline-flex items-center gap-2">
              View All Courses <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== FEATURED COURSES ===== */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="text-lms-primary text-sm font-semibold font-inter uppercase tracking-widest">Top Picks</span>
              <h2 className="font-cormorant text-4xl md:text-5xl font-bold text-lms-dark mt-2">Featured Courses</h2>
            </div>
            <Link to="/lms/courses" className="text-lms-primary font-semibold font-inter hover:underline flex items-center gap-1">
              View all <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredCourses.map((course) => (
              <Link key={course.id} to="/lms/courses" className="course-card block group">
                <div className="relative h-44 overflow-hidden">
                  <img src={course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => { (e.target as HTMLImageElement).src = '/images/barista.jpg'; }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute top-3 left-3">
                    {course.badge === 'free' && <span className="badge-free">Free</span>}
                    {course.badge === 'premium' && <span className="badge-premium">⭐ Premium</span>}
                    {course.badge === 'bestseller' && <span className="badge-bestseller">Bestseller</span>}
                  </div>
                  <div className="absolute bottom-3 left-3 right-3">
                    <span className="text-xs text-white/80 font-inter bg-black/30 px-2 py-1 rounded-full">{course.category}</span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-cormorant font-bold text-lg text-lms-dark leading-tight mb-2 line-clamp-2">
                    {course.title}
                  </h3>
                  <p className="text-gray-500 text-sm font-inter mb-2">{course.instructor}</p>
                  <div className="flex items-center gap-2 mb-3">
                    <Stars rating={Math.floor(course.rating)} />
                    <span className="text-amber-600 text-xs font-semibold">{course.rating}</span>
                    <span className="text-gray-400 text-xs font-inter">({course.students})</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-gray-500 text-xs font-inter">
                      <BookOpen size={12} /> {course.duration}
                    </div>
                    <span className={`font-bold ${course.price === 0 ? 'text-lms-success' : 'text-lms-dark'} font-inter`}>
                      {course.price === 0 ? 'Free' : `$${course.price}`}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== WHY BBA ===== */}
      <section className="section-padding bg-gradient-to-br from-lms-primary/5 to-lms-secondary/10">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-lms-primary text-sm font-semibold font-inter uppercase tracking-widest">Why Choose Us</span>
              <h2 className="font-cormorant text-4xl md:text-5xl font-bold text-lms-dark mt-2 mb-6">
                More Than a Course. <br/>
                <span className="gradient-text">A Career Launch Pad.</span>
              </h2>
              <div className="space-y-5">
                {[
                  { title: 'Industry-Recognized Certificates', desc: 'QR-verified certificates accepted by top hotels and restaurants across East Africa.' },
                  { title: 'Learn at Your Own Pace', desc: 'Access video lessons, PDFs, and quizzes anytime — on any device.' },
                  { title: 'Direct Job Placement', desc: 'Our Job Board connects you directly with hospitality employers seeking BBA graduates.' },
                  { title: 'Expert Local Instructors', desc: 'Learn from professionals with decades of experience in Rwanda\'s top establishments.' },
                ].map(({ title, desc }) => (
                  <div key={title} className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-lms-primary flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle size={16} className="text-white" />
                    </div>
                    <div>
                      <h4 className="font-cormorant font-bold text-lg text-lms-dark">{title}</h4>
                      <p className="text-gray-600 font-inter text-sm">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex gap-4 mt-8">
                <Link to="/lms/courses" className="lms-btn-primary">Start Learning Free</Link>
                <Link to="/about" className="lms-btn-outline">Our Story</Link>
              </div>
            </div>
            <div className="relative">
              <img src="/images/herosection.jpg" alt="Training" className="rounded-2xl w-full h-[500px] object-cover shadow-2xl" />
              <div className="absolute -bottom-6 -left-6 glass-card-light p-5 max-w-[200px]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-lms-primary rounded-xl flex items-center justify-center">
                    <Award size={20} className="text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-lms-dark text-sm font-cormorant">Certified</p>
                    <p className="text-gray-500 text-xs font-inter">2,500+ graduates</p>
                  </div>
                </div>
              </div>
              <div className="absolute -top-6 -right-6 glass-card-light p-4">
                <div className="flex items-center gap-2">
                  <Stars rating={5} />
                </div>
                <p className="text-lms-dark font-bold text-sm font-cormorant mt-1">4.9/5 Rating</p>
                <p className="text-gray-500 text-xs font-inter">from 800+ reviews</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="section-padding bg-lms-dark overflow-hidden">
        <div className="container-custom">
          <div className="text-center mb-12">
            <span className="text-lms-secondary text-sm font-semibold font-inter uppercase tracking-widest">Student Stories</span>
            <h2 className="font-cormorant text-4xl md:text-5xl font-bold text-white mt-2">
              Transforming Lives Across Africa
            </h2>
          </div>

          <div className="relative max-w-3xl mx-auto">
            {testimonials.map((t, i) => (
              <div key={i} className={`transition-all duration-500 ${i === testimonialIdx ? 'opacity-100 block' : 'opacity-0 hidden'}`}>
                <div className="glass-card p-10 text-center">
                  <div className="w-16 h-16 rounded-full bg-lms-primary flex items-center justify-center mx-auto mb-5 text-2xl font-bold text-white font-cormorant">
                    {t.avatar}
                  </div>
                  <div className="flex justify-center mb-4">
                    <Stars rating={t.rating} />
                  </div>
                  <p className="text-white/90 text-lg font-inter leading-relaxed mb-6 italic">
                    "{t.text}"
                  </p>
                  <div>
                    <p className="font-cormorant font-bold text-white text-xl">{t.name}</p>
                    <p className="text-lms-secondary text-sm font-inter">{t.role}</p>
                    <p className="text-white/40 text-xs font-inter mt-1">{t.country}</p>
                  </div>
                </div>
              </div>
            ))}
            <div className="flex justify-center gap-3 mt-6">
              <button onClick={() => setTestimonialIdx(i => (i - 1 + testimonials.length) % testimonials.length)}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-lms-primary flex items-center justify-center text-white transition-colors">
                <ChevronLeft size={18} />
              </button>
              {testimonials.map((_, i) => (
                <button key={i} onClick={() => setTestimonialIdx(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-colors ${i === testimonialIdx ? 'bg-lms-secondary' : 'bg-white/20'}`} />
              ))}
              <button onClick={() => setTestimonialIdx(i => (i + 1) % testimonials.length)}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-lms-primary flex items-center justify-center text-white transition-colors">
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ===== EVENTS + JOBS ROW ===== */}
      <section className="section-padding bg-lms-bg">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Events */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <span className="text-lms-primary text-sm font-semibold font-inter uppercase tracking-widest">Upcoming</span>
                  <h2 className="font-cormorant text-3xl font-bold text-lms-dark mt-1">Events & Workshops</h2>
                </div>
                <Link to="/events" className="text-lms-primary text-sm font-semibold hover:underline flex items-center gap-1 font-inter">
                  View all <ArrowRight size={14} />
                </Link>
              </div>
              <div className="space-y-3">
                {upcomingEvents.map((ev) => (
                  <Link key={ev.title} to="/events"
                    className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-gray-100 hover:border-lms-secondary/30 hover:shadow-md transition-all duration-300">
                    <div className="w-12 h-12 bg-lms-primary/10 rounded-xl flex flex-col items-center justify-center shrink-0">
                      <Calendar size={20} className="text-lms-primary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-cormorant font-bold text-lms-dark">{ev.title}</h4>
                      <p className="text-sm text-gray-500 font-inter">{ev.date}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs bg-lms-primary/10 text-lms-primary px-2 py-1 rounded-full font-inter font-medium">{ev.type}</span>
                      <p className="text-xs text-gray-400 font-inter mt-1">{ev.spots} spots left</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Jobs */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <span className="text-lms-accent text-sm font-semibold font-inter uppercase tracking-widest">Opportunities</span>
                  <h2 className="font-cormorant text-3xl font-bold text-lms-dark mt-1">Latest Job Openings</h2>
                </div>
                <Link to="/jobs" className="text-lms-primary text-sm font-semibold hover:underline flex items-center gap-1 font-inter">
                  View all <ArrowRight size={14} />
                </Link>
              </div>
              <div className="space-y-3">
                {recentJobs.map((job) => (
                  <Link key={job.title} to="/jobs"
                    className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-gray-100 hover:border-lms-accent/30 hover:shadow-md transition-all duration-300">
                    <div className="w-12 h-12 bg-lms-accent/10 rounded-xl flex items-center justify-center shrink-0">
                      <Briefcase size={20} className="text-lms-accent" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-cormorant font-bold text-lms-dark">{job.title}</h4>
                      <p className="text-sm text-gray-500 font-inter">{job.company} • {job.location}</p>
                    </div>
                    <span className="text-xs bg-lms-accent/10 text-lms-accent px-2 py-1 rounded-full font-inter font-medium">{job.type}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-lms-gradient" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-lms-secondary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-lms-accent/20 rounded-full blur-3xl" />
        <div className="container-custom relative z-10 text-center">
          <span className="text-lms-secondary text-sm font-semibold font-inter uppercase tracking-widest">Start Today</span>
          <h2 className="font-cormorant text-5xl md:text-6xl font-bold text-white mt-2 mb-6">
            Your Career in Hospitality<br />Begins Here.
          </h2>
          <p className="text-white/70 text-lg font-inter max-w-2xl mx-auto mb-10">
            Join 2,500+ students who chose BBA to launch their hospitality careers. 
            First course is completely free.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/lms/courses" className="lms-btn-accent text-lg px-8 py-4">
              Start Learning Free <ArrowRight size={18} className="inline ml-1" />
            </Link>
            <Link to="/membership" className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/30 text-white rounded-xl font-semibold hover:bg-white/20 transition-all duration-300 font-inter text-lg">
              View Membership Plans
            </Link>
          </div>
          <p className="text-white/40 text-sm font-inter mt-6">No credit card required • Cancel anytime</p>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
