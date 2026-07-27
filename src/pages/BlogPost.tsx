import { useParams, Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { ArrowLeft, Clock, Calendar, Share2, Twitter, Facebook, Linkedin, BookOpen } from 'lucide-react';

const postContent: Record<string, any> = {
  'mastering-latte-art-guide': {
    title: 'Mastering Latte Art: A Complete Beginner\'s Guide',
    category: 'Coffee Guides',
    author: 'Chef Jean-Paul',
    date: 'July 20, 2026',
    readTime: '8 min',
    image: '/images/barista.jpg',
    content: `
      <h2>Introduction to Latte Art</h2>
      <p>Latte art is the technique of pouring steamed milk into a shot of espresso and creating a pattern or design on the surface of the resulting latte. It is also the result of simply mixing the dark espresso with the white froth.</p>

      <h2>The Foundation: Perfect Espresso</h2>
      <p>Before you can create beautiful latte art, you need a perfect espresso shot as your canvas. The crema — the golden-brown foam that forms on top of a well-pulled espresso — is what allows the milk design to "float" and remain visible.</p>

      <h2>Steaming Milk to Microfoam Perfection</h2>
      <p>The most critical skill in latte art is creating microfoam — milk that has been steamed to a silky, velvety texture with tiny, uniform bubbles. This is achieved by:</p>
      <ul>
        <li>Starting with cold milk (4°C is ideal)</li>
        <li>Submerging the steam wand just below the surface</li>
        <li>Creating a whirlpool motion to incorporate air</li>
        <li>Finishing at 65-68°C for the perfect texture</li>
      </ul>

      <h2>Basic Patterns for Beginners</h2>
      <p>Start with these three fundamental patterns before attempting more complex designs:</p>
      <ol>
        <li><strong>The Heart</strong> — The classic beginner pattern, formed with a simple pour and a flick of the wrist</li>
        <li><strong>The Rosetta</strong> — A fern-leaf design achieved by wiggling the pitcher while pouring</li>
        <li><strong>The Tulip</strong> — Multiple rounded layers stacked vertically</li>
      </ol>

      <h2>Practice Makes Perfect</h2>
      <p>Professional baristas typically need 3-6 months of daily practice before consistently producing beautiful latte art. Don't be discouraged — every cup is a new opportunity to improve.</p>
    `,
  },
};

const relatedPosts = [
  { slug: 'cocktail-trends-east-africa', title: '10 Cocktail Trends Dominating East Africa', category: 'Hospitality', image: '/images/vodka.jpg' },
  { slug: 'bba-certification-worth-it', title: 'Is a BBA Certification Worth It?', category: 'Career', image: '/images/herosection.jpg' },
  { slug: 'haccp-food-safety-essentials', title: 'HACCP Food Safety Essentials', category: 'Training', image: '/images/barista.jpg' },
];

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? postContent[slug] : null;

  if (!post) {
    return (
      <Layout>
        <div className="pt-28 min-h-screen flex items-center justify-center">
          <div className="text-center">
            <BookOpen size={48} className="text-gray-300 mx-auto mb-4" />
            <h2 className="font-cormorant text-3xl font-bold text-gray-600 mb-2">Article not found</h2>
            <Link to="/blog" className="lms-btn-primary inline-flex items-center gap-2 mt-4">
              <ArrowLeft size={16} /> Back to Blog
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero */}
      <section className="relative pt-24 overflow-hidden">
        <div className="relative h-[500px]">
          <img src={post.image} alt={post.title} className="w-full h-full object-cover"
            onError={e => { (e.target as HTMLImageElement).src = '/images/barista.jpg'; }} />
          <div className="absolute inset-0 bg-gradient-to-t from-lms-dark via-lms-dark/50 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="container-custom">
              <Link to="/blog" className="inline-flex items-center gap-2 text-lms-secondary text-sm font-inter mb-4 hover:text-white transition-colors">
                <ArrowLeft size={16} /> Back to Blog
              </Link>
              <div className="flex items-center gap-3 mb-4">
                <span className="badge-new">{post.category}</span>
                <span className="text-white/60 text-sm font-inter flex items-center gap-1">
                  <Clock size={12} /> {post.readTime} read
                </span>
              </div>
              <h1 className="font-cormorant text-4xl md:text-5xl font-bold text-white max-w-3xl leading-tight">
                {post.title}
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12">
            {/* Article */}
            <article>
              {/* Author + meta */}
              <div className="flex items-center gap-4 mb-8 pb-8 border-b border-gray-100">
                <div className="w-12 h-12 rounded-full bg-lms-primary flex items-center justify-center text-white font-bold font-cormorant text-lg">
                  {post.author.charAt(0)}
                </div>
                <div>
                  <p className="font-cormorant font-bold text-lms-dark text-lg">{post.author}</p>
                  <div className="flex items-center gap-3 text-sm text-gray-400 font-inter">
                    <span className="flex items-center gap-1"><Calendar size={12} /> {post.date}</span>
                    <span>·</span>
                    <span className="flex items-center gap-1"><Clock size={12} /> {post.readTime} read</span>
                  </div>
                </div>
                {/* Share */}
                <div className="ml-auto flex items-center gap-2">
                  <span className="text-sm text-gray-400 font-inter">Share:</span>
                  {[
                    { icon: Twitter, color: 'hover:text-sky-500' },
                    { icon: Facebook, color: 'hover:text-blue-600' },
                    { icon: Linkedin, color: 'hover:text-blue-700' },
                    { icon: Share2, color: 'hover:text-lms-primary' },
                  ].map(({ icon: Icon, color }) => (
                    <button key={color} className={`p-2 rounded-lg hover:bg-gray-100 text-gray-400 ${color} transition-colors`}>
                      <Icon size={16} />
                    </button>
                  ))}
                </div>
              </div>

              {/* HTML Content */}
              <div
                className="prose prose-lg max-w-none font-inter text-gray-700 prose-headings:font-cormorant prose-headings:text-lms-dark prose-a:text-lms-primary prose-li:text-gray-600"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </article>

            {/* Sidebar */}
            <aside className="space-y-6">
              {/* CTA */}
              <div className="bg-lms-gradient rounded-2xl p-6 text-white">
                <h3 className="font-cormorant text-2xl font-bold mb-2">Learn Barista Skills</h3>
                <p className="text-white/70 font-inter text-sm mb-4">Enroll in our Professional Barista Mastery course.</p>
                <Link to="/lms/courses" className="w-full flex items-center justify-center gap-2 bg-white text-lms-primary px-5 py-3 rounded-xl font-semibold font-inter text-sm hover:bg-lms-secondary transition-colors">
                  View Course <ArrowLeft size={14} className="rotate-180" />
                </Link>
              </div>

              {/* Related posts */}
              <div>
                <h3 className="font-cormorant text-2xl font-bold text-lms-dark mb-4">Related Articles</h3>
                <div className="space-y-4">
                  {relatedPosts.map((p) => (
                    <Link key={p.slug} to={`/blog/${p.slug}`}
                      className="flex gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors group">
                      <img src={p.image} alt={p.title} className="w-16 h-16 object-cover rounded-lg shrink-0"
                        onError={e => { (e.target as HTMLImageElement).src = '/images/barista.jpg'; }} />
                      <div>
                        <span className="text-xs text-lms-primary font-inter font-semibold">{p.category}</span>
                        <p className="text-sm font-cormorant font-bold text-lms-dark leading-tight group-hover:text-lms-primary transition-colors line-clamp-2">
                          {p.title}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default BlogPost;
