import { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { Search, MapPin, Clock, Briefcase, ArrowRight, Filter, Building, Send, X, Star } from 'lucide-react';

const jobCategories = ['All', 'Barista', 'Bartending', 'Restaurant Service', 'Management', 'F&B', 'Internship'];
const jobTypes = ['All Types', 'Full-time', 'Part-time', 'Internship', 'Contract'];

const jobs = [
  {
    id: 1, title: 'Head Barista', company: 'Kigali Marriott Hotel', type: 'Full-time',
    category: 'Barista', location: 'Kigali, Rwanda', salary: '$600–$900/month',
    posted: '2 days ago', logo: 'KM', logoColor: 'bg-lms-primary',
    description: 'Lead the coffee program at Kigali\'s finest 5-star hotel. Manage a team of 4 baristas, develop seasonal menus, and maintain quality standards.',
    requirements: ['BBA Barista Certification (required)', '2+ years barista experience', 'Team leadership skills', 'English proficiency'],
    featured: true,
  },
  {
    id: 2, title: 'F&B Supervisor', company: 'Radisson Blu Kigali', type: 'Full-time',
    category: 'F&B', location: 'Kigali, Rwanda', salary: '$800–$1200/month',
    posted: '3 days ago', logo: 'RB', logoColor: 'bg-blue-600',
    description: 'Oversee food and beverage operations at a premier international hotel. Coordinate with kitchen and service teams to deliver exceptional guest experiences.',
    requirements: ['Hospitality Management degree or BBA certification', '3+ years F&B experience', 'Strong organizational skills'],
    featured: true,
  },
  {
    id: 3, title: 'Bartender', company: 'Serena Hotel', type: 'Full-time',
    category: 'Bartending', location: 'Kampala, Uganda', salary: '$400–$650/month',
    posted: '5 days ago', logo: 'SH', logoColor: 'bg-amber-600',
    description: 'Create memorable cocktail experiences at Serena Hotel\'s award-winning bar. Craft classic and signature cocktails for a diverse international clientele.',
    requirements: ['Mixology certification', '1+ year bar experience', 'Customer service excellence'],
    featured: false,
  },
  {
    id: 4, title: 'Restaurant Manager', company: 'ONE&ONLY Nyungwe House', type: 'Full-time',
    category: 'Management', location: 'Nyungwe, Rwanda', salary: '$1200–$1800/month',
    posted: '1 week ago', logo: 'OO', logoColor: 'bg-gray-800',
    description: 'Manage all aspects of our luxury forest lodge restaurant including staff, inventory, and guest relations. Live-in position with full benefits.',
    requirements: ['5+ years management experience', 'Degree in Hospitality Management', 'French or Kinyarwanda a plus'],
    featured: false,
  },
  {
    id: 5, title: 'Barista Intern', company: 'BBA Partner Café Network', type: 'Internship',
    category: 'Internship', location: 'Various – Kigali', salary: 'Stipend + Training',
    posted: '1 week ago', logo: 'BP', logoColor: 'bg-lms-secondary',
    description: 'Paid internship for BBA students. Work at one of 15 partner cafés across Kigali while completing your barista certification. Graduate directly to employment.',
    requirements: ['Currently enrolled in BBA Barista course', 'Available 5 days/week', 'Positive attitude'],
    featured: false,
  },
  {
    id: 6, title: 'Sommelier', company: 'Virunga Lodge', type: 'Full-time',
    category: 'F&B', location: 'Musanze, Rwanda', salary: '$700–$1000/month',
    posted: '2 weeks ago', logo: 'VL', logoColor: 'bg-red-700',
    description: 'Manage an extensive wine list, host wine pairing dinners, and train restaurant staff at Rwanda\'s iconic luxury lodge near Volcanoes National Park.',
    requirements: ['Sommelier certification (BBA or equivalent)', '2+ years wine service experience', 'Guest education skills'],
    featured: false,
  },
];

const JobBoard = () => {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeType, setActiveType] = useState('All Types');
  const [selectedJob, setSelectedJob] = useState<typeof jobs[0] | null>(null);
  const [applied, setApplied] = useState<number[]>([]);

  const filtered = jobs.filter(j =>
    (activeCategory === 'All' || j.category === activeCategory) &&
    (activeType === 'All Types' || j.type === activeType) &&
    (j.title.toLowerCase().includes(search.toLowerCase()) ||
     j.company.toLowerCase().includes(search.toLowerCase()))
  );

  const featured = filtered.filter(j => j.featured);
  const regular = filtered.filter(j => !j.featured);

  const handleApply = (id: number) => {
    setApplied(prev => [...prev, id]);
    setSelectedJob(null);
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="pt-28 pb-16 bg-lms-gradient relative overflow-hidden">
        <div className="container-custom relative z-10">
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 rounded-full text-lms-accent text-sm font-inter mb-6">
              <Briefcase size={14} /> Hospitality Job Board
            </span>
            <h1 className="font-cormorant text-5xl md:text-6xl font-bold text-white mb-4">
              Find Your Dream<br/>
              <span className="text-lms-accent">Hospitality Job</span>
            </h1>
            <p className="text-white/70 font-inter text-lg max-w-xl mx-auto">
              Connecting BBA graduates with top hospitality employers across East Africa.
            </p>
          </div>

          {/* Search */}
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input type="search" placeholder="Job title, company, or keyword..."
              value={search} onChange={e => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white text-gray-800 font-inter text-sm shadow-xl focus:outline-none focus:ring-2 focus:ring-lms-accent" />
          </div>
        </div>
      </section>

      {/* Filters */}
      <div className="bg-white border-b border-gray-100 py-3 sticky top-16 z-30">
        <div className="container-custom">
          <div className="flex flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <Filter size={14} className="text-gray-400" />
              <span className="text-xs text-gray-400 font-inter">Category:</span>
            </div>
            {jobCategories.map((cat) => (
              <button key={cat} onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold font-inter transition-all ${
                  activeCategory === cat ? 'bg-lms-primary text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}>
                {cat}
              </button>
            ))}
            <div className="w-px bg-gray-200 mx-1" />
            {jobTypes.map((type) => (
              <button key={type} onClick={() => setActiveType(type)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold font-inter transition-all ${
                  activeType === type ? 'bg-lms-accent text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}>
                {type}
              </button>
            ))}
          </div>
        </div>
      </div>

      <section className="section-padding bg-lms-bg">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Job Listings */}
            <div className="lg:col-span-2 space-y-4">
              {featured.length > 0 && (
                <div className="flex items-center gap-2 mb-2">
                  <Star size={14} className="text-amber-500" />
                  <span className="text-sm font-semibold text-gray-600 font-inter">Featured Opportunities</span>
                </div>
              )}

              {[...featured.map(j => ({ ...j, isFeatured: true })), ...regular.map(j => ({ ...j, isFeatured: false }))].map((job) => (
                <div key={job.id}
                  className={`job-card cursor-pointer ${selectedJob?.id === job.id ? 'border-lms-primary ring-2 ring-lms-primary' : ''} ${
                    job.isFeatured ? 'border-l-4 border-l-lms-primary' : ''
                  }`}
                  onClick={() => setSelectedJob(job)}>
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl ${job.logoColor} flex items-center justify-center text-white font-bold font-inter text-sm shrink-0`}>
                      {job.logo}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className="font-cormorant font-bold text-lg text-lms-dark">{job.title}</h3>
                          <p className="text-gray-600 text-sm font-inter">{job.company}</p>
                        </div>
                        <div className="flex flex-col items-end gap-1">
                          {job.isFeatured && <span className="badge-bestseller">Featured</span>}
                          {applied.includes(job.id) && <span className="badge-free">Applied ✓</span>}
                        </div>
                      </div>
                      <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-gray-500 font-inter">
                        <span className="flex items-center gap-1"><MapPin size={11} /> {job.location}</span>
                        <span className="flex items-center gap-1"><Briefcase size={11} /> {job.type}</span>
                        <span className="flex items-center gap-1"><Clock size={11} /> {job.posted}</span>
                        <span className="font-semibold text-lms-success">{job.salary}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {filtered.length === 0 && (
                <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
                  <Briefcase size={40} className="text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500 font-inter">No jobs match your search.</p>
                </div>
              )}
            </div>

            {/* Job Detail / Sidebar */}
            <div className="lg:col-span-1">
              {selectedJob ? (
                <div className="bg-white rounded-2xl border border-gray-100 shadow-lg p-6 sticky top-24">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-14 h-14 rounded-xl ${selectedJob.logoColor} flex items-center justify-center text-white font-bold font-inter`}>
                      {selectedJob.logo}
                    </div>
                    <button onClick={() => setSelectedJob(null)} className="p-2 rounded-lg hover:bg-gray-100 text-gray-400">
                      <X size={16} />
                    </button>
                  </div>
                  <h2 className="font-cormorant text-2xl font-bold text-lms-dark mb-1">{selectedJob.title}</h2>
                  <p className="text-gray-600 font-inter text-sm mb-3">{selectedJob.company}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="badge-new">{selectedJob.type}</span>
                    <span className="text-xs bg-lms-success/10 text-lms-success px-2.5 py-0.5 rounded-full font-semibold font-inter">{selectedJob.salary}</span>
                  </div>
                  <div className="space-y-1.5 mb-4 text-sm font-inter text-gray-500">
                    <div className="flex items-center gap-2"><MapPin size={13} className="text-lms-primary" />{selectedJob.location}</div>
                    <div className="flex items-center gap-2"><Clock size={13} className="text-lms-primary" />Posted {selectedJob.posted}</div>
                  </div>
                  <p className="text-gray-700 font-inter text-sm leading-relaxed mb-4">{selectedJob.description}</p>
                  <div className="mb-5">
                    <h4 className="font-cormorant font-bold text-lms-dark mb-2">Requirements</h4>
                    <ul className="space-y-1">
                      {selectedJob.requirements.map((r, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-600 font-inter">
                          <ArrowRight size={12} className="text-lms-primary mt-1 shrink-0" /> {r}
                        </li>
                      ))}
                    </ul>
                  </div>
                  {applied.includes(selectedJob.id) ? (
                    <div className="w-full flex items-center justify-center gap-2 py-3 bg-lms-success/10 text-lms-success rounded-xl font-semibold font-inter text-sm">
                      ✓ Application Submitted
                    </div>
                  ) : (
                    <button onClick={() => handleApply(selectedJob.id)}
                      className="w-full lms-btn-primary flex items-center justify-center gap-2">
                      <Send size={16} /> Apply Now
                    </button>
                  )}
                </div>
              ) : (
                <div className="bg-white rounded-2xl border border-gray-100 p-6">
                  <div className="text-center py-8">
                    <Briefcase size={40} className="text-gray-200 mx-auto mb-3" />
                    <p className="text-gray-400 font-inter text-sm">Select a job to view details</p>
                  </div>
                  <div className="border-t border-gray-100 pt-5">
                    <h3 className="font-cormorant font-bold text-lms-dark mb-3">Are you an Employer?</h3>
                    <p className="text-gray-500 font-inter text-sm mb-4">Post a job and reach 2,500+ BBA-certified hospitality professionals.</p>
                    <Link to="/contact" className="w-full lms-btn-outline flex items-center justify-center gap-2 text-sm">
                      <Building size={14} /> Post a Job
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default JobBoard;
