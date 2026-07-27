import { Link } from 'react-router-dom';
import { Facebook, Instagram, Linkedin, Twitter, Mail, Phone, MapPin, ArrowRight, Globe } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-lms-dark text-white">
      {/* Newsletter CTA */}
      <div className="bg-gradient-to-r from-lms-primary to-[#004E57] py-12">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-cormorant text-2xl font-bold text-white mb-1">Stay Ahead in Hospitality</h3>
              <p className="text-lms-secondary text-sm">Get the latest courses, events, and job opportunities delivered to your inbox.</p>
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 md:w-72 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-lms-secondary font-inter text-sm"
              />
              <button className="px-5 py-3 bg-lms-accent hover:bg-[#d4845e] text-white rounded-xl font-semibold font-inter text-sm transition-colors whitespace-nowrap flex items-center gap-2">
                Subscribe <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">

          {/* Column 1: Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <img src="/images/LOGO EGIDE new.png" alt="BBA Logo" className="h-12 w-12 object-contain" />
              <div>
                <h3 className="font-cormorant text-xl font-bold text-white leading-tight">Beyond Barista Academy</h3>
                <p className="text-lms-secondary text-xs font-inter">Rwanda • Est. 2020</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6 font-inter">
              Rwanda's premier hospitality training center — from learning to certification to employment. 
              Transforming passionate individuals into world-class hospitality professionals.
            </p>
            <div className="flex space-x-3">
              {[
                { href: 'https://facebook.com', icon: Facebook },
                { href: 'https://twitter.com', icon: Twitter },
                { href: 'https://instagram.com', icon: Instagram },
                { href: 'https://linkedin.com', icon: Linkedin },
              ].map(({ href, icon: Icon }) => (
                <a key={href} href={href} target="_blank" rel="noreferrer"
                  className="w-9 h-9 rounded-lg bg-white/10 hover:bg-lms-primary transition-colors flex items-center justify-center text-gray-400 hover:text-white">
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Learn */}
          <div>
            <h4 className="font-cormorant text-lg font-bold text-white mb-4">Academy</h4>
            <ul className="space-y-2.5">
              {[
                { label: 'Course Catalog', href: '/lms/courses' },
                { label: 'Membership Plans', href: '/membership' },
                { label: 'Events & Workshops', href: '/events' },
                { label: 'Leaderboard', href: '/lms/leaderboard' },
                { label: 'Certificate Verification', href: '/certificate/verify' },
                { label: 'Blog & Guides', href: '/blog' },
              ].map(({ label, href }) => (
                <li key={href}>
                  <Link to={href} className="text-gray-400 hover:text-lms-secondary transition-colors text-sm font-inter flex items-center gap-1.5 group">
                    <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity text-lms-secondary" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Programs */}
          <div>
            <h4 className="font-cormorant text-lg font-bold text-white mb-4">Programs</h4>
            <ul className="space-y-2.5">
              {[
                'Barista Training', 'Bartending & Mixology', 'Sommelier Course',
                'Restaurant Service', 'Housekeeping', 'Hotel Operations',
                'HACCP & Food Safety', 'Culinary Basics',
              ].map((p) => (
                <li key={p}>
                  <Link to="/lms/courses" className="text-gray-400 hover:text-lms-secondary transition-colors text-sm font-inter flex items-center gap-1.5 group">
                    <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity text-lms-secondary" />
                    {p}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h4 className="font-cormorant text-lg font-bold text-white mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5 text-sm font-inter text-gray-400">
                <MapPin size={16} className="text-lms-secondary mt-0.5 shrink-0" />
                <span>Kigali, Rwanda<br />KG 123 Street</span>
              </li>
              <li className="flex items-center gap-2.5 text-sm font-inter text-gray-400">
                <Mail size={16} className="text-lms-secondary shrink-0" />
                <a href="mailto:info.bba2025@gmail.com" className="hover:text-white transition-colors">
                  info.bba2025@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2.5 text-sm font-inter text-gray-400">
                <Phone size={16} className="text-lms-secondary shrink-0" />
                <a href="tel:+250785717183" className="hover:text-white transition-colors">
                  +250 785 717 183
                </a>
              </li>
              <li className="flex items-center gap-2.5 text-sm font-inter text-gray-400">
                <Globe size={16} className="text-lms-secondary shrink-0" />
                <a href="https://www.beyondbarista.rw" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                  beyondbarista.rw
                </a>
              </li>
            </ul>

            {/* Language Selector */}
            <div className="mt-5">
              <p className="text-xs text-gray-500 mb-2 font-inter uppercase tracking-wider">Language</p>
              <div className="flex gap-2">
                {['EN', 'FR', 'RW'].map((lang) => (
                  <button key={lang}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold font-inter transition-colors ${
                      lang === 'EN' ? 'bg-lms-primary text-white' : 'bg-white/10 text-gray-400 hover:bg-white/20'
                    }`}>
                    {lang}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm font-inter">
            © {currentYear} Beyond Barista Academy. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { label: 'Privacy Policy', href: '/privacy' },
              { label: 'Terms of Service', href: '/terms' },
              { label: 'Job Board', href: '/jobs' },
              { label: 'Sitemap', href: '/sitemap.xml' },
            ].map(({ label, href }) => (
              <Link key={href} to={href} className="text-gray-500 hover:text-white transition-colors text-sm font-inter">
                {label}
              </Link>
            ))}
          </div>
        </div>

        {/* Developer Credit */}
        <div className="mt-4 text-center">
          <p className="text-gray-600 text-xs font-inter">
            Designed & developed by{' '}
            <a href="https://www.linkedin.com/in/niyitegeka-bosco" target="_blank" rel="noopener noreferrer"
              className="text-lms-secondary hover:text-white transition-colors">
              Niyitegeka Bosco
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
