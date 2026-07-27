import { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { Calendar, MapPin, Users, Clock, Video, ArrowRight, Filter, X } from 'lucide-react';

const eventTypes = ['All', 'Workshop', 'Webinar', 'Physical Training', 'Competition'];

const events = [
  {
    id: 1, title: 'Coffee Brewing Masterclass', type: 'Workshop',
    date: 'August 10, 2026', time: '9:00 AM – 1:00 PM', location: 'BBA Training Center, Kigali',
    image: '/images/barista.jpg', spots: 15, registered: 8, price: 0,
    description: 'An intensive 4-hour hands-on workshop covering all major coffee brewing methods: pour-over, French press, AeroPress, and espresso. Suitable for all levels.',
    tags: ['Coffee', 'Hands-on', 'Certificate'],
    instructor: 'Chef Jean-Paul',
  },
  {
    id: 2, title: 'Hospitality Career Fair 2026', type: 'Physical Training',
    date: 'August 22, 2026', time: '10:00 AM – 5:00 PM', location: 'Kigali Convention Center',
    image: '/images/herosection.jpg', spots: 200, registered: 145, price: 0,
    description: 'Connect with 30+ hospitality employers from Rwanda, Uganda, and Kenya. CV clinics, mock interviews, and on-the-spot job offers.',
    tags: ['Career', 'Networking', 'Jobs'],
    instructor: 'BBA Team',
  },
  {
    id: 3, title: 'Wine & Food Pairing Webinar', type: 'Webinar',
    date: 'September 5, 2026', time: '3:00 PM – 5:00 PM', location: 'Online via Zoom',
    image: '/images/wine.jpg', spots: 100, registered: 67, price: 15,
    description: 'Join our certified sommelier Maître Amina for a live webinar on mastering the art of food and wine pairing for restaurant professionals.',
    tags: ['Wine', 'Online', 'Sommelier'],
    instructor: 'Maître Amina',
  },
  {
    id: 4, title: 'Barista Championship East Africa', type: 'Competition',
    date: 'September 20, 2026', time: '8:00 AM – 6:00 PM', location: 'Kigali Serena Hotel',
    image: '/images/barista.jpg', spots: 50, registered: 42, price: 25,
    description: 'Rwanda\'s premier barista competition. Compete in espresso, milk texturing, and signature beverage categories. Open to all BBA-certified baristas.',
    tags: ['Competition', 'Certificate', 'Prize'],
    instructor: 'Multiple Judges',
  },
  {
    id: 5, title: 'Cocktail Creation Workshop', type: 'Workshop',
    date: 'October 8, 2026', time: '2:00 PM – 6:00 PM', location: 'BBA Bar Lab, Kigali',
    image: '/images/vodka.jpg', spots: 20, registered: 12, price: 35,
    description: 'Hands-on cocktail crafting with East African botanicals and spirits. Learn to create 10 signature cocktails under the guidance of Master Émile.',
    tags: ['Cocktails', 'Hands-on', 'Certificate'],
    instructor: 'Master Émile',
  },
  {
    id: 6, title: 'HACCP Food Safety Certification', type: 'Physical Training',
    date: 'October 15, 2026', time: '9:00 AM – 4:00 PM', location: 'BBA Training Center, Kigali',
    image: '/images/barista.jpg', spots: 30, registered: 18, price: 45,
    description: 'Official HACCP certification training. Covers food safety management, hazard analysis, and critical control points. Certificate issued upon completion.',
    tags: ['HACCP', 'Certification', 'Food Safety'],
    instructor: 'Pascal K.',
  },
];

const typeColors: Record<string, string> = {
  Workshop: 'bg-lms-primary/10 text-lms-primary',
  Webinar: 'bg-blue-100 text-blue-700',
  'Physical Training': 'bg-lms-accent/10 text-lms-accent',
  Competition: 'bg-amber-100 text-amber-700',
};

const Events = () => {
  const [activeType, setActiveType] = useState('All');
  const [selectedEvent, setSelectedEvent] = useState<typeof events[0] | null>(null);

  const filtered = events.filter(e => activeType === 'All' || e.type === activeType);

  const spotsLeft = (e: typeof events[0]) => e.spots - e.registered;
  const pctFull = (e: typeof events[0]) => Math.round((e.registered / e.spots) * 100);

  return (
    <Layout>
      {/* Hero */}
      <section className="pt-28 pb-16 bg-lms-gradient relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-64 h-64 bg-lms-secondary rounded-full blur-3xl" />
        </div>
        <div className="container-custom relative z-10 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 rounded-full text-lms-secondary text-sm font-inter mb-6">
            <Calendar size={14} /> Events & Workshops
          </span>
          <h1 className="font-cormorant text-5xl md:text-6xl font-bold text-white mb-4">
            Learn, Connect,<br/>
            <span className="text-lms-secondary">and Compete</span>
          </h1>
          <p className="text-white/70 font-inter text-lg max-w-xl mx-auto">
            In-person workshops, online webinars, and competitions to accelerate your hospitality career.
          </p>
        </div>
      </section>

      {/* Type Filter */}
      <div className="bg-white border-b border-gray-100 py-3 sticky top-16 z-30">
        <div className="container-custom">
          <div className="flex items-center gap-2 overflow-x-auto">
            <Filter size={16} className="text-gray-400 shrink-0" />
            {eventTypes.map((type) => (
              <button key={type} onClick={() => setActiveType(type)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold font-inter whitespace-nowrap transition-all ${
                  activeType === type ? 'bg-lms-primary text-white' : 'text-gray-600 hover:bg-gray-100'
                }`}>
                {type}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Events Grid */}
      <section className="section-padding bg-lms-bg">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((event) => (
              <div key={event.id} className="event-card group">
                <div className="relative h-48 overflow-hidden">
                  <img src={event.image} alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={e => { (e.target as HTMLImageElement).src = '/images/barista.jpg'; }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute top-3 left-3">
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${typeColors[event.type] || 'bg-gray-100 text-gray-600'}`}>
                      {event.type}
                    </span>
                  </div>
                  {event.type === 'Webinar' && (
                    <div className="absolute top-3 right-3">
                      <Video size={16} className="text-white" />
                    </div>
                  )}
                  <div className="absolute bottom-3 left-3">
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                      event.price === 0 ? 'badge-free' : 'bg-lms-accent text-white'
                    }`}>
                      {event.price === 0 ? 'Free' : `$${event.price}`}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-cormorant text-xl font-bold text-lms-dark mb-2 group-hover:text-lms-primary transition-colors">
                    {event.title}
                  </h3>
                  <div className="space-y-1.5 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-500 font-inter">
                      <Calendar size={13} className="text-lms-primary shrink-0" /> {event.date}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500 font-inter">
                      <Clock size={13} className="text-lms-primary shrink-0" /> {event.time}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500 font-inter">
                      <MapPin size={13} className="text-lms-primary shrink-0" /> {event.location}
                    </div>
                  </div>

                  {/* Capacity bar */}
                  <div className="mb-4">
                    <div className="flex justify-between text-xs text-gray-500 font-inter mb-1">
                      <span className="flex items-center gap-1"><Users size={11} /> {event.registered} registered</span>
                      <span className="text-lms-primary font-semibold">{spotsLeft(event)} spots left</span>
                    </div>
                    <div className="progress-bar">
                      <div className="progress-fill" style={{ width: `${pctFull(event)}%` }} />
                    </div>
                  </div>

                  <button onClick={() => setSelectedEvent(event)}
                    className="w-full lms-btn-primary text-sm py-2.5 flex items-center justify-center gap-2">
                    Register Now <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <Calendar size={48} className="text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 font-inter">No events in this category yet.</p>
            </div>
          )}
        </div>
      </section>

      {/* Registration Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setSelectedEvent(null)}>
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden animate-fade-in"
            onClick={e => e.stopPropagation()}>
            <div className="relative h-48">
              <img src={selectedEvent.image} alt={selectedEvent.title} className="w-full h-full object-cover"
                onError={e => { (e.target as HTMLImageElement).src = '/images/barista.jpg'; }} />
              <div className="absolute inset-0 bg-gradient-to-t from-lms-dark/70 to-transparent" />
              <button onClick={() => setSelectedEvent(null)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/20 hover:bg-white/40 flex items-center justify-center text-white transition-colors">
                <X size={16} />
              </button>
              <div className="absolute bottom-4 left-4">
                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${typeColors[selectedEvent.type]}`}>
                  {selectedEvent.type}
                </span>
              </div>
            </div>
            <div className="p-6">
              <h2 className="font-cormorant text-2xl font-bold text-lms-dark mb-2">{selectedEvent.title}</h2>
              <p className="text-gray-600 font-inter text-sm mb-4">{selectedEvent.description}</p>
              <div className="grid grid-cols-2 gap-3 mb-5 text-sm font-inter text-gray-600">
                <div className="flex items-center gap-2"><Calendar size={13} className="text-lms-primary" />{selectedEvent.date}</div>
                <div className="flex items-center gap-2"><Clock size={13} className="text-lms-primary" />{selectedEvent.time}</div>
                <div className="flex items-center gap-2"><MapPin size={13} className="text-lms-primary" />{selectedEvent.location}</div>
                <div className="flex items-center gap-2"><Users size={13} className="text-lms-primary" />{spotsLeft(selectedEvent)} spots left</div>
              </div>
              <div className="space-y-3">
                <input type="text" placeholder="Your Full Name" className="lms-input" />
                <input type="email" placeholder="Your Email Address" className="lms-input" />
                <input type="tel" placeholder="WhatsApp / Phone Number" className="lms-input" />
              </div>
              <div className="flex gap-3 mt-5">
                <button className="flex-1 lms-btn-primary">
                  {selectedEvent.price === 0 ? 'Register Free' : `Pay $${selectedEvent.price} & Register`}
                </button>
                <button onClick={() => setSelectedEvent(null)}
                  className="px-4 py-3 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors font-inter">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Events;
