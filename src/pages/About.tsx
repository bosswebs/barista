import { Link } from 'react-router-dom';
import { GraduationCap, ArrowRight } from 'lucide-react';
import Layout from '../components/layout/Layout';
import HeroSection from '../components/ui/HeroSection';
import SectionTitle from '../components/ui/SectionTitle';
import { ORIENTATION_CURRICULUM } from '../data/orientationCurriculum';

// Course id for the seeded "Orientation: Welcome to Beyond Barista Academy"
// course in Neon (see neon/seed_orientation.sql).
const ORIENTATION_COURSE_ID = '25';

const orientationLessons = ORIENTATION_CURRICULUM.flatMap((m) => m.lessons);

const About = () => {
  return (
    <Layout>
      <HeroSection
        backgroundImage="/images/about.jpg"
        title="About Beyond Barista Academy"
        subtitle="Discover our story, mission, and commitment to excellence"
      />

      {/* Brief About Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <SectionTitle title="Who We Are" />
            <p className="text-lg mb-6">
              Beyond Barista Academy (BBA) is the only training center in Rwanda offering international-level bartending, barista, and wine skills. We provide certificates that empower our graduates to compete globally. After completing our 3-month courses, you can confidently work internationally as a senior bartender, barista, or sommelier.
            </p>
            <p className="text-lg font-medium text-bba-brown mb-8">
              Our students skip internships—we simulate real-world work environments like actual bars, coffee shops, and wine cellars to ensure you're job-ready the day you graduate.
            </p>
          </div>
        </div>
      </section>

      {/* Orientation - mandatory before any course */}
      <section className="section-padding bg-bba-brown text-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 border border-white/20 rounded-full text-sm mb-4">
              <GraduationCap size={16} /> Every Student Starts Here
            </span>
            <h2 className="text-3xl md:text-4xl font-semibold mb-4">Welcome to Beyond Barista Academy</h2>
            <p className="text-white/80 text-lg">
              This module should be mandatory before students can access any course.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <h3 className="text-xl font-semibold mb-6 text-center">Orientation Contents</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {orientationLessons.map((lesson) => {
                const [number, ...rest] = lesson.title.split(' ');
                return (
                  <div key={lesson.id} className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-lg px-5 py-4">
                    <span className="shrink-0 w-11 h-11 rounded-full bg-white/10 flex items-center justify-center font-semibold text-sm">
                      {number}
                    </span>
                    <span className="text-white/90">{rest.join(' ')}</span>
                  </div>
                );
              })}
            </div>

            <div className="text-center mt-10">
              <Link
                to={`/lms/courses/${ORIENTATION_COURSE_ID}/learn`}
                className="inline-flex items-center gap-2 bg-white text-bba-brown font-semibold px-8 py-3 rounded-lg hover:bg-bba-cream transition-colors"
              >
                Start Orientation Now <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Vision, Mission, Values */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Vision */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-4 text-bba-brown">Our Vision</h3>
              <p className="text-gray-700">
                To proudly offer high-end, globally relevant skills in barista, bartender, and sommelier training.
              </p>
            </div>

            {/* Mission */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-4 text-bba-brown">Our Mission</h3>
              <p className="text-gray-700">
                We train our people to always exceed company expectations.
              </p>
            </div>

            {/* Values */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-4 text-bba-brown">Our Values (AI-RP)</h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>Attitude</li>
                <li>Integrity</li>
                <li>Responsibility</li>
                <li>Professionalism</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Objectives */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionTitle 
            title="Our Objectives" 
            subtitle="We are committed to achieving the following goals:"
          />

          <div className="pl-4">
            <ol className="list-decimal space-y-4 text-lg">
              <li>Coffee awakening in the Rwandan community</li>
              <li>Alcohol awareness and tuning enhancement programs</li>
              <li>Enabling dreams to come true with skill + documentation abroad</li>
              <li>Mixology awakening in Kigali</li>
              <li>Solving the "no experience" challenge for freshers</li>
              <li>Thinking outside the box</li>
              <li>Changing lives for our members</li>
            </ol>
          </div>
        </div>
      </section>

      {/* What Makes BBA Different */}
      <section className="section-padding bg-bba-cream">
        <div className="container-custom">
          <SectionTitle 
            title="What Makes BBA Different?" 
            center={true}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-white rounded-lg p-8 shadow-md">
              <h3 className="text-xl font-semibold text-bba-brown mb-4">Fresh & Realistic</h3>
              <p className="text-gray-600">
                The only training center born in today's reality, aware of youth employment struggles—and built to solve them.
              </p>
            </div>
            
            {/* Card 2 */}
            <div className="bg-white rounded-lg p-8 shadow-md">
              <h3 className="text-xl font-semibold text-bba-brown mb-4">Joyful & Serious</h3>
              <p className="text-gray-600">
                We take your future seriously, while bringing you joy and a classy experience during training.
              </p>
            </div>
            
            {/* Card 3 */}
            <div className="bg-white rounded-lg p-8 shadow-md">
              <h3 className="text-xl font-semibold text-bba-brown mb-4">Trust & Integrity</h3>
              <p className="text-gray-600">
                Attention to detail, gentleman-like ethics, and a do-it-right-once mentality.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
