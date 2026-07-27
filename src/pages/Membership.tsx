import { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { Check, X, Crown, Zap, Star, ArrowRight, BookOpen, Award, Download, Headphones } from 'lucide-react';

const plans = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    period: '',
    badge: null,
    color: 'border-gray-200',
    headerColor: 'bg-gray-50',
    icon: BookOpen,
    iconColor: 'text-gray-600',
    description: 'Start your hospitality journey at no cost.',
    features: [
      { text: 'Access to free courses', included: true },
      { text: 'Basic course certificates', included: true },
      { text: 'Community forum access', included: true },
      { text: 'Mobile app access', included: true },
      { text: 'Premium courses', included: false },
      { text: 'PDF & resource downloads', included: false },
      { text: 'Priority support', included: false },
      { text: 'Offline viewing', included: false },
      { text: 'Job Board premium listings', included: false },
      { text: 'Certificate verification badge', included: false },
    ],
    cta: 'Get Started Free',
    ctaLink: '/auth',
    ctaStyle: 'border-2 border-lms-primary text-lms-primary hover:bg-lms-primary hover:text-white',
  },
  {
    id: 'monthly',
    name: 'Premium Monthly',
    price: 29,
    period: '/month',
    badge: 'Most Popular',
    color: 'border-lms-primary ring-2 ring-lms-primary',
    headerColor: 'bg-lms-gradient',
    icon: Zap,
    iconColor: 'text-white',
    description: 'Full access to all hospitality courses and resources.',
    features: [
      { text: 'Access to ALL courses', included: true },
      { text: 'Official PDF certificates', included: true },
      { text: 'Community forum access', included: true },
      { text: 'Mobile app access', included: true },
      { text: 'All premium courses', included: true },
      { text: 'PDF & resource downloads', included: true },
      { text: 'Priority email support', included: true },
      { text: 'Offline viewing', included: true },
      { text: 'Job Board premium listings', included: false },
      { text: 'Certificate verification badge', included: false },
    ],
    cta: 'Start Monthly Plan',
    ctaLink: '/auth?plan=monthly',
    ctaStyle: 'bg-lms-gradient text-white hover:opacity-90',
  },
  {
    id: 'annual',
    name: 'Premium Annual',
    price: 199,
    period: '/year',
    badge: 'Best Value — Save 43%',
    color: 'border-lms-accent',
    headerColor: 'bg-gradient-to-br from-lms-accent to-[#9d4b29]',
    icon: Crown,
    iconColor: 'text-white',
    description: 'Everything in Monthly plus career placement support.',
    features: [
      { text: 'Access to ALL courses', included: true },
      { text: 'Official PDF certificates', included: true },
      { text: 'Community forum access', included: true },
      { text: 'Mobile app access', included: true },
      { text: 'All premium courses', included: true },
      { text: 'PDF & resource downloads', included: true },
      { text: '24/7 Priority support', included: true },
      { text: 'Offline viewing', included: true },
      { text: 'Job Board premium listings', included: true },
      { text: 'Certificate verification badge', included: true },
    ],
    cta: 'Start Annual Plan',
    ctaLink: '/auth?plan=annual',
    ctaStyle: 'bg-gradient-to-r from-lms-accent to-[#9d4b29] text-white hover:opacity-90',
  },
];

const faqs = [
  { q: 'Can I cancel my subscription at any time?', a: 'Yes, you can cancel anytime. Your access continues until the end of your billing period.' },
  { q: 'Are the certificates officially recognized?', a: 'BBA certificates are industry-recognized and QR-verified, accepted by leading hospitality employers across East Africa.' },
  { q: 'What payment methods do you accept?', a: 'We accept Flutterwave (Mobile Money, cards), Stripe (Visa/Mastercard), and PayPal.' },
  { q: 'Is there a student or group discount?', a: 'Yes! Contact us for group enrollment pricing for 5+ students. We also offer NGO and school partnerships.' },
  { q: 'Can I switch from Monthly to Annual?', a: 'Absolutely. You can upgrade to Annual at any time and receive a prorated credit for unused monthly time.' },
];

const Membership = () => {
  const [billingAnnual, setBillingAnnual] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <Layout>
      {/* Hero */}
      <section className="relative pt-28 pb-20 overflow-hidden bg-lms-gradient">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-64 h-64 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-20 w-48 h-48 bg-lms-secondary rounded-full blur-2xl" />
        </div>
        <div className="container-custom relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 rounded-full text-white text-sm font-inter mb-6">
            <Crown size={14} className="text-lms-secondary" />
            Membership Plans
          </div>
          <h1 className="font-cormorant text-5xl md:text-6xl font-bold text-white mb-4">
            Invest in Your<br />
            <span className="text-lms-secondary">Hospitality Career</span>
          </h1>
          <p className="text-white/70 font-inter text-lg max-w-2xl mx-auto mb-8">
            Choose the plan that fits your goals. Start free, upgrade anytime.
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center gap-3 bg-white/10 border border-white/20 rounded-full p-1.5">
            <button onClick={() => setBillingAnnual(false)}
              className={`px-5 py-2 rounded-full text-sm font-semibold font-inter transition-all ${
                !billingAnnual ? 'bg-white text-lms-primary' : 'text-white/70'
              }`}>
              Monthly
            </button>
            <button onClick={() => setBillingAnnual(true)}
              className={`px-5 py-2 rounded-full text-sm font-semibold font-inter transition-all flex items-center gap-2 ${
                billingAnnual ? 'bg-white text-lms-primary' : 'text-white/70'
              }`}>
              Annual
              <span className="text-xs bg-lms-accent text-white px-2 py-0.5 rounded-full">-43%</span>
            </button>
          </div>
        </div>
      </section>

      {/* Plans Grid */}
      <section className="py-16 bg-lms-bg">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 -mt-10">
            {plans.map((plan) => (
              <div key={plan.id}
                className={`relative bg-white rounded-3xl border-2 shadow-xl overflow-hidden transition-all duration-300 hover:-translate-y-2 ${plan.color}`}>
                {plan.badge && (
                  <div className="absolute top-4 right-4">
                    <span className={`text-xs font-semibold font-inter px-3 py-1 rounded-full ${
                      plan.id === 'monthly' ? 'bg-lms-primary text-white' : 'bg-lms-accent text-white'
                    }`}>
                      {plan.badge}
                    </span>
                  </div>
                )}

                {/* Header */}
                <div className={`${plan.headerColor} p-8`}>
                  <div className={`w-12 h-12 rounded-2xl ${plan.id === 'free' ? 'bg-gray-200' : 'bg-white/20'} flex items-center justify-center mb-4`}>
                    <plan.icon size={24} className={plan.iconColor} />
                  </div>
                  <h3 className={`font-cormorant text-2xl font-bold mb-1 ${plan.id === 'free' ? 'text-lms-dark' : 'text-white'}`}>
                    {plan.name}
                  </h3>
                  <p className={`font-inter text-sm mb-4 ${plan.id === 'free' ? 'text-gray-500' : 'text-white/70'}`}>
                    {plan.description}
                  </p>
                  <div className="flex items-baseline gap-1">
                    <span className={`font-cormorant text-5xl font-bold ${plan.id === 'free' ? 'text-lms-dark' : 'text-white'}`}>
                      ${billingAnnual && plan.id === 'monthly' ? '19' : plan.price}
                    </span>
                    <span className={`font-inter text-sm ${plan.id === 'free' ? 'text-gray-400' : 'text-white/70'}`}>
                      {plan.period}
                    </span>
                  </div>
                </div>

                {/* Features */}
                <div className="p-8">
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((f, i) => (
                      <li key={i} className="flex items-center gap-3 font-inter text-sm">
                        {f.included
                          ? <Check size={16} className="text-lms-success shrink-0" />
                          : <X size={16} className="text-gray-300 shrink-0" />}
                        <span className={f.included ? 'text-gray-700' : 'text-gray-400'}>{f.text}</span>
                      </li>
                    ))}
                  </ul>
                  <Link to={plan.ctaLink}
                    className={`w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold font-inter text-sm transition-all duration-300 ${plan.ctaStyle}`}>
                    {plan.cta} <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Payment methods */}
          <div className="text-center mt-10">
            <p className="text-gray-500 text-sm font-inter mb-4">Secure payments via</p>
            <div className="flex justify-center gap-6">
              {['Flutterwave', 'Stripe', 'PayPal', 'MTN Mobile Money'].map((m) => (
                <span key={m} className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-gray-600 text-sm font-inter shadow-sm">{m}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Feature highlights */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="font-cormorant text-4xl font-bold text-lms-dark">What's Included in Premium</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: BookOpen, title: 'Unlimited Courses', desc: 'Access all 15+ hospitality courses without restriction', color: 'bg-lms-primary/10 text-lms-primary' },
              { icon: Award, title: 'PDF Certificates', desc: 'Download, print and share your verified certificates', color: 'bg-lms-accent/10 text-lms-accent' },
              { icon: Download, title: 'Offline Downloads', desc: 'Save lessons and watch offline on any device', color: 'bg-lms-secondary/30 text-lms-primary' },
              { icon: Headphones, title: 'Priority Support', desc: '24/7 access to our expert hospitality support team', color: 'bg-amber-50 text-amber-700' },
            ].map(({ icon: Icon, title, desc, color }) => (
              <div key={title} className="stat-card text-center">
                <div className={`w-14 h-14 rounded-2xl ${color} flex items-center justify-center mx-auto mb-4`}>
                  <Icon size={24} />
                </div>
                <h3 className="font-cormorant font-bold text-xl text-lms-dark mb-2">{title}</h3>
                <p className="text-gray-600 text-sm font-inter">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-lms-bg">
        <div className="container-custom max-w-3xl">
          <div className="text-center mb-10">
            <h2 className="font-cormorant text-4xl font-bold text-lms-dark">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-left font-inter font-semibold text-lms-dark hover:text-lms-primary transition-colors">
                  {faq.q}
                  <span className={`text-lms-primary text-xl transition-transform duration-200 ${openFaq === i ? 'rotate-45' : ''}`}>+</span>
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-6 text-gray-600 font-inter text-sm leading-relaxed border-t border-gray-100 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <p className="text-gray-500 font-inter mb-4">Still have questions?</p>
            <Link to="/contact" className="lms-btn-primary inline-flex items-center gap-2">
              Contact Our Team <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Membership;
