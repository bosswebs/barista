import { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { Search, Clock, ArrowRight, Coffee, Briefcase, BookOpen, Star, TrendingUp } from 'lucide-react';

const categories = [
  { id: 'all', label: 'All Articles', icon: BookOpen },
  { id: 'hospitality', label: 'Hospitality', icon: Star },
  { id: 'coffee', label: 'Coffee Guides', icon: Coffee },
  { id: 'career', label: 'Career Advice', icon: Briefcase },
  { id: 'news', label: 'Training News', icon: TrendingUp },
];

const posts = [
  {
    slug: 'mastering-latte-art-guide',
    title: 'Mastering Latte Art: A Complete Beginner\'s Guide',
    excerpt: 'Learn the fundamentals of latte art from microfoam technique to pouring patterns. Everything you need to start creating beautiful espresso drinks.',
    category: 'coffee', image: '/images/barista.jpg', author: 'Chef Jean-Paul',
    readTime: '8 min', date: 'July 20, 2026', featured: true,
    tags: ['Barista', 'Coffee', 'Technique'],
  },
  {
    slug: 'hospitality-careers-rwanda-2026',
    title: 'The State of Hospitality Careers in Rwanda 2026',
    excerpt: 'Rwanda\'s tourism sector is booming. Here\'s what employers are looking for and how BBA graduates are leading the charge.',
    category: 'career', image: '/images/herosection.jpg', author: 'BBA Team',
    readTime: '6 min', date: 'July 18, 2026', featured: true,
    tags: ['Career', 'Rwanda', 'Jobs'],
  },
  {
    slug: 'cocktail-trends-east-africa',
    title: '10 Cocktail Trends Dominating East Africa Bars',
    excerpt: 'From craft gin to local botanical infusions — the region\'s bar scene is evolving fast. Here\'s what every bartender needs to know.',
    category: 'hospitality', image: '/images/vodka.jpg', author: 'Master Émile',
    readTime: '5 min', date: 'July 15, 2026', featured: false,
    tags: ['Cocktails', 'Trends', 'Bartending'],
  },
  {
    slug: 'wine-pairing-basics',
    title: 'Wine Pairing Basics Every Hospitality Professional Needs',
    excerpt: 'Understanding food and wine pairing is essential for any restaurant professional. Start with these foundational principles.',
    category: 'hospitality', image: '/images/wine.jpg', author: 'Maître Amina',
    readTime: '7 min', date: 'July 12, 2026', featured: false,
    tags: ['Wine', 'Sommelier', 'Pairing'],
  },
  {
    slug: 'bba-certification-worth-it',
    title: 'Is a BBA Certification Worth It? We Asked 50 Graduates',
    excerpt: 'Real data from BBA alumni on salary increases, job placements, and career growth after completing their certification.',
    category: 'career', image: '/images/herosection.jpg', author: 'BBA Team',
    readTime: '10 min', date: 'July 8, 2026', featured: false,
    tags: ['Certification', 'Career', 'Alumni'],
  },
  {
    slug: 'haccp-food-safety-essentials',
    title: 'HACCP Food Safety: What Every Food Professional Must Know',
    excerpt: 'Food safety is non-negotiable in hospitality. Learn the HACCP principles that protect your guests and your business.',
    category: 'news', image: '/images/barista.jpg', author: 'Pascal K.',
    readTime: '9 min', date: 'July 5, 2026', featured: false,
    tags: ['HACCP', 'Food Safety', 'Compliance'],
  },
];

const Blog = () => {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const filtered = posts.filter(p =>
    (activeCategory === 'all' || p.category === activeCategory) &&
    (p.title.toLowerCase().includes(search.toLowerCase()) ||
     p.excerpt.toLowerCase().includes(search.toLowerCase()))
  );

  const featured = filtered.filter(p => p.featured);
  const regular = filtered.filter(p => !p.featured);

  return (
    <Layout>
      {/* Hero */}
      <section className="pt-28 pb-16 bg-lms-gradient relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl" />
        </div>
        <div className="container-custom relative z-10 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 rounded-full text-lms-secondary text-sm font-inter mb-6">
            <BookOpen size={14} /> Knowledge Hub
          </span>
          <h1 className="font-cormorant text-5xl md:text-6xl font-bold text-white mb-4">
            Hospitality Insights & <span className="text-lms-secondary">Career Guides</span>
          </h1>
          <p className="text-white/70 font-inter text-lg max-w-2xl mx-auto mb-8">
            Expert articles on coffee, cocktails, career growth, and the hospitality industry across East Africa.
          </p>
          <div className="max-w-lg mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="search"
              placeholder="Search articles..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white text-gray-800 font-inter text-sm focus:outline-none focus:ring-2 focus:ring-lms-secondary shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Category Tabs */}
      <div className="bg-white border-b border-gray-100 sticky top-16 z-30">
        <div className="container-custom">
          <div className="flex gap-1 overflow-x-auto py-3 scrollbar-hide">
            {categories.map((cat) => (
              <button key={cat.id} onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold font-inter whitespace-nowrap transition-all ${
                  activeCategory === cat.id
                    ? 'bg-lms-primary text-white shadow-md'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}>
                <cat.icon size={14} />
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <section className="section-padding bg-lms-bg">
        <div className="container-custom">
          {/* Featured Posts */}
          {featured.length > 0 && (
            <div className="mb-14">
              <h2 className="font-cormorant text-3xl font-bold text-lms-dark mb-6">Featured Articles</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {featured.map((post) => (
                  <Link key={post.slug} to={`/blog/${post.slug}`} className="blog-card block group">
                    <div className="relative h-56 overflow-hidden">
                      <img src={post.image} alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={e => { (e.target as HTMLImageElement).src = '/images/barista.jpg'; }} />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute top-4 left-4">
                        <span className="badge-new capitalize">{post.category}</span>
                      </div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="font-cormorant text-2xl font-bold text-white leading-tight">{post.title}</h3>
                      </div>
                    </div>
                    <div className="p-6">
                      <p className="text-gray-600 font-inter text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 text-xs text-gray-400 font-inter">
                          <span className="font-semibold text-gray-600">{post.author}</span>
                          <span>·</span>
                          <span>{post.date}</span>
                          <span>·</span>
                          <div className="flex items-center gap-1"><Clock size={12} />{post.readTime}</div>
                        </div>
                        <ArrowRight size={16} className="text-lms-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Regular Posts */}
          {regular.length > 0 && (
            <div>
              <h2 className="font-cormorant text-3xl font-bold text-lms-dark mb-6">Latest Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {regular.map((post) => (
                  <Link key={post.slug} to={`/blog/${post.slug}`} className="blog-card block group">
                    <div className="relative h-44 overflow-hidden">
                      <img src={post.image} alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={e => { (e.target as HTMLImageElement).src = '/images/barista.jpg'; }} />
                      <div className="absolute top-3 left-3">
                        <span className="badge-new capitalize">{post.category}</span>
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="font-cormorant text-xl font-bold text-lms-dark mb-2 line-clamp-2 group-hover:text-lms-primary transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-gray-500 font-inter text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                      <div className="flex items-center gap-2 text-xs text-gray-400 font-inter">
                        <span className="font-semibold text-gray-600">{post.author}</span>
                        <span>·</span>
                        <Clock size={11} />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <BookOpen size={48} className="text-gray-300 mx-auto mb-4" />
              <h3 className="font-cormorant text-2xl font-bold text-gray-600 mb-2">No articles found</h3>
              <p className="text-gray-400 font-inter">Try a different search or category.</p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Blog;
