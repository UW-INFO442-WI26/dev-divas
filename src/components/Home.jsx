import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform, useInView } from 'motion/react';

/* ── Reusable scroll-reveal wrapper ── */
function Reveal({ children, className = '', delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 48 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: 'easeOut', delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ── Animated stat card ── */
function StatCard({ value, label, delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.85 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, delay, type: 'spring', stiffness: 120 }}
      className="flex flex-col items-center p-8 rounded-2xl bg-white/70 backdrop-blur-sm shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
    >
      <span className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-rose-500 to-purple-600 bg-clip-text text-transparent">
        {value}
      </span>
      <span className="mt-2 text-gray-600 font-medium">{label}</span>
    </motion.div>
  );
}

/* ── Main Home page ── */
export default function Home() {
  const navigate = useNavigate();

  /* Parallax for hero */
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  /* Contact form state */
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', message: '' });
  const update = (key) => (e) => setForm((prev) => ({ ...prev, [key]: e.target.value }));
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setForm({ firstName: '', lastName: '', email: '', message: '' });
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <main className="pt-16 overflow-x-hidden">

      {/* ═══════════ HERO ═══════════ */}
      <section
        ref={heroRef}
        aria-label="Welcome to ImpactU, the volunteer teacher matching platform"
        className="relative min-h-screen flex items-center overflow-hidden bg-[radial-gradient(circle_at_top_left,#ffe4ef,transparent_55%),radial-gradient(circle_at_bottom_right,#dbeafe,transparent_55%),linear-gradient(to_bottom,#fff1f2,#e0f2ff)]"
      >

        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative z-10 max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 py-24"
        >
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.1] tracking-tight"
          >
            <span className="bg-gradient-to-r from-deep via-purple-800 to-rose-600 bg-clip-text text-transparent">
              Every classroom
            </span>
            <br />
            <span className="text-gray-900">deserves all the help it needs.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-6 text-lg sm:text-xl text-gray-600 max-w-2xl leading-relaxed"
          >
            Create a volunteer profile, tell us what matters to you, and swipe through
            tailored school matches.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <button
              onClick={() => navigate('/find-school')}
              className="px-8 py-4 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-semibold text-lg shadow-lg shadow-emerald-200/60 hover:shadow-xl hover:shadow-emerald-300/60 hover:-translate-y-1 transition-all duration-300 cursor-pointer"
              aria-label="Find schools that need volunteer teachers"
            >
              Find Schools
            </button>
            <button
              onClick={() => navigate('/interest-form')}
              className="px-8 py-4 rounded-full bg-white text-gray-800 font-semibold text-lg shadow-lg border border-rose-200 hover:border-rose-300 hover:bg-rose-50 hover:-translate-y-1 transition-all duration-300 cursor-pointer"
              aria-label="Fill out the volunteer interest survey"
            >
              Volunteer Now
            </button>
          </motion.div>
        </motion.div>

        {/* Bottom fade for parallax section */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" aria-hidden="true" />
      </section>

      {/* ═══════════ STATS ═══════════ */}
      <section aria-label="Impact statistics and how this prototype works" className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <Reveal className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Our Impact</h2>
            <p className="mt-3 text-gray-500 text-lg">Making a real difference in education, one match at a time</p>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <StatCard value="120+" label="Schools Registered" delay={0} />
            <StatCard value="850+" label="Active Volunteers" delay={0.15} />
            <StatCard value="2,400+" label="Matches Made" delay={0.3} />
          </div>
          <Reveal className="mt-12 grid gap-6 md:grid-cols-3 text-sm text-gray-600 leading-relaxed">
            <div className="p-5 rounded-2xl bg-rose-50/60 border border-rose-100">
              <h3 className="text-sm font-semibold text-gray-900 mb-1">Step 1 · Create an account</h3>
              <p>Sign in with Google so your volunteer profile and match history can be saved securely.</p>
            </div>
            <div className="p-5 rounded-2xl bg-rose-50/60 border border-rose-100">
              <h3 className="text-sm font-semibold text-gray-900 mb-1">Step 2 · Share your interests</h3>
              <p>Answer a short interest survey so we can understand your values, availability, and qualifications.</p>
            </div>
            <div className="p-5 rounded-2xl bg-rose-50/60 border border-rose-100">
              <h3 className="text-sm font-semibold text-gray-900 mb-1">Step 3 · Review your matches</h3>
              <p>Swipe through matched schools and save the ones you like. Your &quot;Yes&quot; choices are stored to your account.</p>
            </div>
          </Reveal>
          <Reveal className="mt-10 max-w-3xl mx-auto text-sm text-gray-500 leading-relaxed">
            <p>
              This is a prototype experience: your interest survey powers a sample matching flow
              using demo school data, and the qualifications form previews what a volunteer profile
              editor could look like. In a full version, these same steps would be connected to
              real accounts and saved to your profile.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ═══════════ MISSION ═══════════ */}
      <section
        id="mission"
        aria-label="Our mission is supporting UN Sustainable Development Goal 4"
        className="py-24 px-6 bg-gradient-to-b from-rose-50/80 to-white"
      >
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-rose-100 text-rose-600 text-sm font-semibold tracking-wide uppercase">
              Our Mission
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
              Quality Education for All
            </h2>
            <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
              Aligned with UN Sustainable Development Goal 4, ensuring inclusive and equitable quality education
            </p>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            <Reveal delay={0.1}>
              <div className="space-y-6">
                <article className="p-6 rounded-2xl bg-white shadow-sm border border-rose-100 hover:shadow-md transition-shadow duration-300">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">The Challenge</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Fewer than two-thirds of children meet reading standards, and less
                    than half meet math standards, especially in marginalized
                    communities. The COVID-19 pandemic caused even greater learning
                    disruptions worldwide.
                  </p>
                </article>
                <article className="p-6 rounded-2xl bg-white shadow-sm border border-rose-100 hover:shadow-md transition-shadow duration-300">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Our Approach</h3>
                  <p className="text-gray-600 leading-relaxed">
                    How might we encourage qualified volunteers to improve students'
                    reading and mathematics proficiency in underserved primary and
                    secondary schools? We connect willing volunteers directly with
                    schools that need them most.
                  </p>
                </article>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="space-y-6">
                <article className="p-6 rounded-2xl bg-white shadow-sm border border-rose-100 hover:shadow-md transition-shadow duration-300">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">The Problem</h3>
                  <p className="text-gray-600 leading-relaxed">
                    In low-income countries, lack of financial resources and access to
                    educational materials has contributed to 272 million children who
                    are out of school. A limited supply of qualified teachers makes the
                    situation even more critical.
                  </p>
                </article>
                <article className="p-6 rounded-2xl bg-white shadow-sm border border-rose-100 hover:shadow-md transition-shadow duration-300">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Our Solution</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Our platform serves as a portal between volunteer teachers and
                    educational organizations, making it easy to find, match, and
                    connect, so that every classroom can get the support it deserves.
                  </p>
                </article>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.3} className="mt-16 max-w-4xl mx-auto">
            <div className="p-6 md:p-8 rounded-2xl bg-white shadow-sm border border-rose-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Why education changes lives
              </h3>
              <div
                className="relative w-full overflow-hidden rounded-xl bg-black/5"
                style={{ aspectRatio: '16 / 9' }}
              >
                <iframe
                  width="560"
                  height="315"
                  src="https://www.youtube.com/embed/LIExX9St4oA?si=RC4WNG9_U5Bjzqjr"
                  title="YouTube video player"
                  className="w-full h-full border-0"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
              <p className="mt-4 text-sm text-gray-600">
                This short video highlights how improving access to quality education lifts up entire
                communities—the same goal ImpactU is designed to support.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════ CONTACT ═══════════ */}
      <section
        id="contact"
        aria-label="Contact us with questions or feedback"
        className="py-24 px-6 bg-white"
      >
        <div className="max-w-2xl mx-auto">
          <Reveal className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full bg-purple-100 text-purple-600 text-sm font-semibold tracking-wide uppercase">
              Get in Touch
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-gray-900">Contact Us</h2>
            <p className="mt-3 text-gray-500 text-lg">
              Have questions, feedback, or need assistance? We'd love to hear from you.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <form
              onSubmit={handleSubmit}
              className="space-y-6 bg-gray-50/80 rounded-2xl p-8 border border-gray-100"
              aria-label="Contact form — send us a message"
            >
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="contact-first" className="block text-sm font-semibold text-gray-700 mb-2">
                    First Name
                  </label>
                  <input
                    id="contact-first"
                    type="text"
                    required
                    value={form.firstName}
                    onChange={update('firstName')}
                    placeholder="Jane"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:border-rose-400 focus:ring-2 focus:ring-rose-200 outline-none transition-all"
                    aria-required="true"
                  />
                </div>
                <div>
                  <label htmlFor="contact-last" className="block text-sm font-semibold text-gray-700 mb-2">
                    Last Name
                  </label>
                  <input
                    id="contact-last"
                    type="text"
                    required
                    value={form.lastName}
                    onChange={update('lastName')}
                    placeholder="Doe"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:border-rose-400 focus:ring-2 focus:ring-rose-200 outline-none transition-all"
                    aria-required="true"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="contact-email" className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  value={form.email}
                  onChange={update('email')}
                  placeholder="jane@example.com"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:border-rose-400 focus:ring-2 focus:ring-rose-200 outline-none transition-all"
                  aria-required="true"
                />
              </div>

              <div>
                <label htmlFor="contact-message" className="block text-sm font-semibold text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={5}
                  value={form.message}
                  onChange={update('message')}
                  placeholder="How can we help you?"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:border-rose-400 focus:ring-2 focus:ring-rose-200 outline-none transition-all resize-none"
                  aria-required="true"
                />
              </div>

              {submitted && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-emerald-600 font-medium text-center"
                  role="status"
                  aria-live="polite"
                >
                  Thank you! Your message has been sent.
                </motion.p>
              )}

              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-gradient-to-r from-rose-400 to-pink-500 text-white font-semibold text-lg shadow-lg shadow-rose-200/50 hover:shadow-xl hover:shadow-rose-300/50 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
              >
                Send Message
              </button>
            </form>
          </Reveal>
        </div>
      </section>

      {/* ═══════════ FOOTER ═══════════ */}
      <footer className="py-12 px-6 bg-gray-900 text-gray-400" role="contentinfo">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <p className="text-sm">&copy; {new Date().getFullYear()} ImpactU. All rights reserved.</p>
            <p className="text-xs mt-1 text-gray-500">
              Supporting UN Sustainable Development Goal 4: Quality Education
            </p>
          </div>
          <div className="flex gap-6 text-sm">
            <button
              onClick={() => document.getElementById('mission')?.scrollIntoView({ behavior: 'smooth' })}
              className="hover:text-rose-400 transition-colors bg-transparent border-none cursor-pointer text-gray-400"
            >
              Mission
            </button>
            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="hover:text-rose-400 transition-colors bg-transparent border-none cursor-pointer text-gray-400"
            >
              Contact
            </button>
          </div>
        </div>
      </footer>
    </main>
  );
}
