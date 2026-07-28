import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Menu, X, UserCircle, LogOut, BookOpen,
  ChevronDown, Briefcase, Calendar, Rss, Star, Crown,
  GraduationCap, Sun, Moon, Info, UserPlus, type LucideIcon,
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { PORTALS, getAvailablePortals } from '@/lib/portals';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

type DropdownItem = {
  name: string;
  href: string;
  icon: LucideIcon;
  desc: string;
  state?: { from: string };
};

// Learning platform only - things students actually do inside the LMS.
const academyMenu: DropdownItem[] = [
  { name: 'Course Catalog', href: '/lms/courses', icon: BookOpen, desc: 'Browse all hospitality courses' },
  { name: 'Events & Workshops', href: '/events', icon: Calendar, desc: 'Upcoming workshops & webinars' },
  { name: 'Blog & Articles', href: '/blog', icon: Rss, desc: 'Coffee, career & hospitality guides' },
  { name: 'Membership Plans', href: '/membership', icon: Crown, desc: 'Unlock premium courses' },
  { name: 'Leaderboard', href: '/lms/leaderboard', icon: Star, desc: 'Top performing students' },
];

// The company and its people - used to live oddly under Academy.
const aboutMenu: DropdownItem[] = [
  { name: 'Our Story', href: '/about', icon: Info, desc: 'Learn about Beyond Barista Academy' },
  { name: 'Trainers & Instructors', href: '/trainers', icon: GraduationCap, desc: 'Meet our expert team' },
];

// Employment - working at BBA vs. jobs BBA connects graduates to.
const careerMenu: DropdownItem[] = [
  { name: 'Work With Us', href: '/career', icon: UserPlus, desc: 'Join the Beyond Barista team' },
  { name: 'Job Board', href: '/jobs', icon: Briefcase, desc: 'Find hospitality opportunities' },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const location = useLocation();
  const { user, signOut } = useAuth();
  const portals = getAvailablePortals(user?.user_metadata?.role);

  // Signed in: link straight into the portals the user actually has access to.
  // Signed out: show all three as a preview, routed through /auth with a
  // return-to state so login lands them on the portal they picked.
  const portalsMenu: DropdownItem[] = (user ? portals : PORTALS).map((p) => ({
    name: p.title,
    href: user ? p.href : '/auth',
    icon: p.icon,
    desc: p.description,
    state: user ? undefined : { from: p.href },
  }));

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about', dropdown: aboutMenu },
    { name: 'Services', href: '/services' },
    { name: 'Academy', href: '/lms/courses', dropdown: academyMenu },
    { name: 'Portals', href: user ? portals[0]?.href ?? '/lms' : '/auth', dropdown: portalsMenu },
    { name: 'Career', href: '/career', dropdown: careerMenu },
    { name: 'Contact', href: '/contact' },
  ];

  const getInitials = (name?: string) => {
    if (!name) return 'BBA';
    return name.split(' ').map(p => p[0]).join('').toUpperCase().substring(0, 2);
  };

  const isItemActive = (item: typeof navigation[number]) =>
    location.pathname === item.href || (item.dropdown?.some(d => d.href === location.pathname) ?? false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const toggleDark = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-lg py-2' : 'bg-white/95 backdrop-blur-sm py-3'
    }`}>
      <div className="container-custom flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src="/images/logo.png" alt="BBA Logo" className="h-10 w-10 object-contain" />
          <div className="hidden sm:block">
            <span className="font-cormorant text-xl font-bold text-bba-brown leading-tight block">Beyond Barista</span>
            <span className="text-xs text-gray-500 font-inter tracking-widest uppercase">Academy Rwanda</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-1">
          {navigation.map((item) => {
            const active = isItemActive(item);

            if (item.dropdown) {
              const isWide = item.dropdown.length > 3;
              return (
                <div key={item.name} className="relative group">
                  <Link to={item.href}
                    className={`nav-link flex items-center gap-1 px-3 py-2 rounded-lg hover:bg-gray-50 ${
                      active ? 'text-lms-primary font-medium' : 'text-gray-700'
                    }`}>
                    {item.name}
                    <ChevronDown size={14} className="transition-transform group-hover:rotate-180" />
                  </Link>
                  {/* Hover dropdown - pt-2 (not mt-2) keeps the gap inside the
                      hoverable box, so the mouse never leaves group-hover while
                      moving from the trigger down into the panel. */}
                  <div className={`absolute left-1/2 -translate-x-1/2 top-full pt-2 opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none group-hover:pointer-events-auto z-50 ${
                    isWide ? 'w-[480px]' : 'w-72'
                  }`}>
                    <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-4">
                      <div className={isWide ? 'grid grid-cols-2 gap-2' : 'space-y-1'}>
                        {item.dropdown.map((m) => (
                          <Link key={m.name} to={m.href} state={m.state}
                            className="flex items-start gap-3 p-3 rounded-xl hover:bg-lms-primary/5 transition-colors group/item">
                            <div className="p-2 bg-lms-primary/10 rounded-lg text-lms-primary group-hover/item:bg-lms-primary group-hover/item:text-white transition-colors mt-0.5">
                              <m.icon size={16} />
                            </div>
                            <div>
                              <p className="font-semibold text-gray-800 text-sm">{m.name}</p>
                              <p className="text-xs text-gray-500 mt-0.5">{m.desc}</p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <Link key={item.name} to={item.href}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  active
                    ? 'text-lms-primary bg-lms-primary/5' : 'text-gray-700 hover:text-lms-primary hover:bg-gray-50'
                }`}>
                {item.name}
              </Link>
            );
          })}
        </div>

        {/* Right Side Actions */}
        <div className="hidden lg:flex items-center gap-3">
          {/* Dark Mode Toggle */}
          <button onClick={toggleDark} className="p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-600">
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* User Menu */}
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="rounded-full p-0 w-10 h-10">
                  <Avatar>
                    <AvatarImage src={user?.user_metadata?.avatar_url} />
                    <AvatarFallback className="bg-lms-primary text-white text-sm">
                      {getInitials(user?.user_metadata?.full_name)}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 rounded-xl shadow-xl border-gray-100">
                <DropdownMenuLabel className="font-cormorant text-base">
                  {user?.user_metadata?.full_name || 'My Account'}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {portals.map((portal) => (
                  <DropdownMenuItem key={portal.href} asChild>
                    <Link to={portal.href} className="cursor-pointer w-full flex items-center gap-2">
                      <portal.icon className="h-4 w-4 text-lms-primary" />
                      <span>{portal.title}</span>
                    </Link>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => signOut()} className="text-red-600 cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/auth">
                <Button variant="ghost" className="text-gray-700 font-medium">Sign In</Button>
              </Link>
              <Link to="/membership">
                <Button className="bg-lms-primary hover:bg-lms-primaryDark text-white rounded-xl font-semibold shadow-md">
                  Get Started
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="lg:hidden text-gray-700 p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 shadow-lg max-h-[80vh] overflow-y-auto">
          <div className="container-custom py-4 space-y-1">
            {navigation.map((item) => (
              <div key={item.name}>
                <Link to={item.href}
                  className={`block px-4 py-3 rounded-xl text-sm font-medium ${
                    location.pathname === item.href
                      ? 'bg-lms-primary/10 text-lms-primary' : 'text-gray-700 hover:bg-gray-50'
                  }`}>
                  {item.name}
                </Link>
                {item.dropdown && (
                  <div className="pl-3 pb-2">
                    {item.dropdown.map((m) => (
                      <Link key={m.name} to={m.href} state={m.state}
                        className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-gray-700 hover:bg-lms-primary/5 hover:text-lms-primary transition-colors">
                        <m.icon size={16} className="text-lms-primary" />
                        {m.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="pt-3 border-t border-gray-100">
              {user ? (
                <>
                  <div className="px-4 py-2 flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user?.user_metadata?.avatar_url} />
                      <AvatarFallback className="bg-lms-primary text-white text-xs">
                        {getInitials(user?.user_metadata?.full_name)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-medium text-sm text-gray-800">{user?.user_metadata?.full_name || user.email}</span>
                  </div>
                  {portals.map((portal) => (
                    <Link key={portal.href} to={portal.href}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 rounded-xl">
                      <portal.icon size={16} className="text-lms-primary" /> {portal.title}
                    </Link>
                  ))}
                  <button onClick={() => signOut()}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 rounded-xl">
                    <LogOut size={16} /> Log out
                  </button>
                </>
              ) : (
                <div className="px-4 space-y-2">
                  <Link to="/auth" className="block w-full text-center px-4 py-2.5 border border-lms-primary text-lms-primary rounded-xl font-semibold text-sm">
                    Sign In
                  </Link>
                  <Link to="/membership" className="block w-full text-center px-4 py-2.5 bg-lms-primary text-white rounded-xl font-semibold text-sm">
                    Get Started
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
