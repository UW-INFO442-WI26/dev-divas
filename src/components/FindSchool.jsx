import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'motion/react';
import { dummySchools } from './Match';

function SchoolCard({ school, onOpen, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group cursor-pointer"
      onClick={() => onOpen(school)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onOpen(school)}
      aria-label={`View details for ${school.Name} in ${school.Location}`}
    >
      <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 group-hover:-translate-y-2">
        <div className="h-48 overflow-hidden">
          <img
            src={school.Picture}
            alt={`${school.Name} — school campus in ${school.Location}`}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            loading="lazy"
          />
        </div>
        <div className="p-5">
          <h3 className="text-lg font-bold text-gray-900">{school.Name}</h3>
          <p className="text-sm text-gray-500 mt-1 flex items-center gap-1">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {school.Location}
          </p>
          <div className="flex flex-wrap gap-2 mt-3">
            {school.Values.split(',').map((val, i) => (
              <span key={i} className="px-3 py-1 rounded-full bg-rose-50 text-rose-600 text-xs font-medium">
                {val.trim()}
              </span>
            ))}
          </div>
          <p className="text-xs text-gray-400 mt-3">Preferred level: {school.PrefLevel}</p>
        </div>
      </div>
    </motion.article>
  );
}

export default function FindSchool() {
  const [selectedSchool, setSelectedSchool] = useState(null);

  return (
    <main className="pt-16 min-h-screen bg-gradient-to-b from-emerald-50/60 to-white">
      <section className="py-20 px-6" aria-label="Browse schools seeking volunteer teachers">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-700 text-sm font-semibold tracking-wide uppercase"
            >
              Find a School
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mt-4 text-4xl sm:text-5xl font-bold text-gray-900"
            >
              Schools That Need You
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-4 text-lg text-gray-500 max-w-xl mx-auto"
            >
              These schools have the most urgent need for volunteer teachers.
              Click any school to learn more about their programs and how you can help.
            </motion.p>
          </div>

          {/* Card grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {dummySchools.map((school, index) => (
              <SchoolCard key={school.id} school={school} onOpen={setSelectedSchool} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* School detail modal */}
      <AnimatePresence>
        {selectedSchool && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setSelectedSchool(null)}
            role="dialog"
            aria-modal="true"
            aria-label={`Details for ${selectedSchool.Name}`}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25 }}
              className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedSchool.Picture}
                alt={`${selectedSchool.Name} campus`}
                className="w-full h-64 object-cover rounded-t-2xl"
              />
              <div className="p-8 space-y-4">
                <h2 className="text-2xl font-bold text-gray-900">{selectedSchool.Name}</h2>

                <dl className="space-y-3 text-gray-600">
                  <div><dt className="inline font-semibold text-gray-800">Location: </dt><dd className="inline">{selectedSchool.Location}</dd></div>
                  <div><dt className="inline font-semibold text-gray-800">Values: </dt><dd className="inline">{selectedSchool.Values}</dd></div>
                  <div><dt className="inline font-semibold text-gray-800">Preferred Level: </dt><dd className="inline">{selectedSchool.PrefLevel}</dd></div>
                  <div><dt className="inline font-semibold text-gray-800">Available: </dt><dd className="inline">{selectedSchool.AvailableTime || 'Not available'}</dd></div>
                  <div><dt className="inline font-semibold text-gray-800">Description: </dt><dd className="inline">{selectedSchool.Description || 'Not available'}</dd></div>
                  <div><dt className="inline font-semibold text-gray-800">Contact: </dt><dd className="inline">{selectedSchool.Contact || 'Not available'}</dd></div>
                  {selectedSchool.Link && (
                    <div>
                      <dt className="inline font-semibold text-gray-800">Website: </dt>
                      <dd className="inline">
                        <a href={selectedSchool.Link} target="_blank" rel="noreferrer" className="text-rose-500 hover:text-rose-600 underline underline-offset-2">
                          {selectedSchool.Link}
                        </a>
                      </dd>
                    </div>
                  )}
                </dl>

                <button
                  onClick={() => setSelectedSchool(null)}
                  className="mt-4 w-full py-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold transition-colors cursor-pointer"
                  aria-label="Close school details"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
