import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { get, ref, serverTimestamp, update } from 'firebase/database';
import { database } from '../firebase.js';
import { useAuth } from '../AuthContext.jsx';
import { Link } from 'react-router-dom';

export const dummySchools = [
  {
    id: 1,
    Name: "Elo High School",
    Location: "California, USA",
    Picture: "https://images.unsplash.com/photo-1580537659466-0a9bfa916a54",
    Values: "Strong mission, Community service",
    PrefLevel: "High school",
    AvailableTime: "Feb 4, 2026 - June 20, 2026",
    Description: "Elo High School has been established for over 50 years and has been committed to showcase culture and acceptance in the community. They are looking for volunteers who can help with their after-school programs for English and Mathematics tutoring.",
    Link: "https://www.elohighschool.org",
    Contact: "contact@elohighschool.org"
  },
  {
    id: 2,
    Name: "Sanchez Primary School",
    Location: "New York, USA",
    Picture: "https://images.unsplash.com/photo-1562774053-701939374585",
    Values: "Flexible worktime, Fun students",
    PrefLevel: "Middle school",
    AvailableTime: "March 4, 2026 - August 20, 2026",
    Description: "Sanchez Primary School is seeking volunteers who could assist with facilitating their events on promoting reading and mathematics literacy skills that will be hosted during class as break time events. They are flexible with the time commitments of volunteers and welcome any volunteers who wish to make deeper connections with students and gain experience.",
    Link: "https://www.sanchezprimaryschool.org",
    Contact: "contact@sanchezprimaryschool.org"
  },
  {
    id: 3,
    Name: "Yoshea Elementary School",
    Location: "Massachusetts, USA",
    Picture: "https://images.unsplash.com/photo-1584750153892-38414eb8e76a?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    Values: "Friendly staff, Community service",
    PrefLevel: "High school",
    AvailableTime: "August 4, 2026 - Not Set",
    Description: "Yoshea Elementary School is a newly established school in rural areas of Massachusetts. They are in need for volunteers who are qualified to help with their school programs in promoting literacy and mathematics skills. They are looking for volunteers who value strong community connections and services.",
    Link: "https://www.yosheaelementaryschool.org",
    Contact: "contact@yosheaelementaryschool.org"
  },
  {
    id: 4,
    Name: "Almond Academy",
    Location: "Texas, USA",
    Picture: "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?q=80&w=1548&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    Values: "Strong mission, Friendly staff",
    PrefLevel: "High school",
    AvailableTime: "Feb 4, 2026 - June 20, 2026",
    Description: "Almond Academy is a determined institution valuing the wellness of their students and staff. They promote free and accessible education for all, and are committed to fostering a friendly learning environment. They are looking for volunteers who support and align with these missions and are dedicated to making a positive impact.",
    Link: "https://www.almondacademy.org",
    Contact: "contact@almondacademy.org"
  },
  {
    id: 5,
    Name: "Layhay Primary School",
    Location: "Florida, USA",
    Picture: "https://images.unsplash.com/photo-1623078424463-473cf34e3ecf?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    Values: "Fun students, Flexible worktime",
    PrefLevel: "Middle school",
    AvailableTime: "April 29, 2026 - October 20, 2026",
    Description: "Layhay Primary School has been established since 2010. They are dedicated to make learning fun and engaging for their students. Willing to accommodate volunteers with flexible worktime, they are looking for volunteers who are creative and can help with establishing their fun learning agendas.",
    Link: "https://www.layhayprimaryschool.org",
    Contact: "contact@layhayprimaryschool.org"
  },
  {
    id: 6,
    Name: "Illiya Primary School",
    Location: "New Mexico, USA",
    Picture: "https://images.unsplash.com/photo-1765041694034-0f2073ec666a?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    Values: "Fun students, Strong mission",
    PrefLevel: "High school",
    AvailableTime: "October 29, 2026 - December 20, 2026",
    Description: "Illiya Primary School has dedicated mission to bridge the gaps between students and creating a fun learning environment for all. Emphasizing on extracurricular activities, they are looking for volunteers who are creative and can help with facilitating events for students to learn.",
    Link: "https://www.illiyaprimaryschool.org",
    Contact: "contact@illiyaprimaryschool.org"
  },
  {
    id: 7,
    Name: "Raymon Academy",
    Location: "Ohio, USA",
    Picture: "https://images.unsplash.com/photo-1770172410691-acea3d3bfef0?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    Values: "Friendly staff, Flexible worktime",
    PrefLevel: "High school",
    AvailableTime: "April 29, 2026 - October 20, 2026",
    Description: "Raymon Academy is an institution established since 1990. Its goals orient the comfort of students and staff, aiming to create a safe place for all to study and grow. They are looking for volunteers who are willing to contribute effort to maintaining the friendly environment of the school and support the school's educational goals.",
    Link: "https://www.raymonacademy.org",
    Contact: "contact@raymonacademy.org"
  },
  {
    id: 8,
    Name: "Haiden Elementary School",
    Location: "Arizona, USA",
    Picture: "https://images.unsplash.com/photo-1762075314905-5e3deb92da69?q=80&w=1742&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    Values: "Community service, Flexible worktime",
    PrefLevel: "High school",
    AvailableTime: "June 18, 2026 - October 20, 2026",
    Description: "Haiden Elementary School values community bonding and provide free educational service to families with financial concerns. They aim to promote national educational goals with mathematics and reading literacy, hoping to seek volunteers who can support those goals.",
    Link: "https://www.haidenelementaryschool.org",
    Contact: "contact@haidenelementaryschool.org"
  },
  {
    id: 9,
    Name: "Green Lake Primary School",
    Location: "Washington, USA",
    Picture: "https://images.unsplash.com/photo-1758413352177-39b9ceffbb92?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    Values: "Fun students, Community service",
    PrefLevel: "High school",
    AvailableTime: "February 10, 2026 - June 20, 2026",
    Description: "Green Lake Primary School has been established since 2000. Its mission lays in creating fun event times between students to foster a community bonding. They are looking for volunteers who are interested in participating in building and maintaining this community while gaining experiences in teaching.",
    Link: "https://www.greenlakeprimaryschool.org",
    Contact: "contact@greenlakeprimaryschool.org"
  },
  {
    id: 10,
    Name: "Muhan Primary School",
    Location: "California, USA",
    Picture: "https://images.unsplash.com/photo-1613896527026-f195d5c818ed?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    Values: "Strong mission, Friendly staff",
    PrefLevel: "High school",
    AvailableTime: "May 16, 2026 - November 21, 2026",
    Description: "Muhan Primary School is dedicated to help students with building strong fundamentals in mathematics and reading literacy, aiming to encourage students with more confidence in navigating towards higher education. They are looking for volunteers who are friendly and willing to guide students gently.",
    Link: "https://www.muhanprimaryschool.org",
    Contact: "contact@muhanprimaryschool.org"
  }
];

export default function Match() {
  const [schools, setSchools] = useState([]);
  const [lastDirection, setLastDirection] = useState(null);
  const [matchCount, setMatchCount] = useState(0);
  const [successMatch, setSuccessMatch] = useState([]);
  const [selectedSchool, setSelectedSchool] = useState(null);
  const [savedMatches, setSavedMatches] = useState([]);
  const [loadingSaved, setLoadingSaved] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const userData = localStorage.getItem('userSurveyData');
    if (userData) {
      const surveyData = JSON.parse(userData);
      const userInterests = surveyData.question1 || [];
      const userEducation = surveyData.question2 || [];

      const filteredSchools = dummySchools.filter((school) => {
        const schoolValues = school.Values.split(',').map((v) => v.trim());
        const interestMatch = userInterests.some((interest) => schoolValues.includes(interest));

        const educationMatch = userEducation.some((edu) => {
          if (edu === 'Middle school') return school.PrefLevel === 'Middle school';
          if (['High school', 'Beyond high school', 'College/University', 'Masters', 'PhD'].includes(edu))
            return school.PrefLevel === 'High school';
          return false;
        });

        return interestMatch && educationMatch;
      });

      setSchools(filteredSchools);
      setMatchCount(filteredSchools.length);
    }
  }, []);

  useEffect(() => {
    if (!user) {
      setSavedMatches([]);
      setLoadingSaved(false);
      return;
    }

    // 1) Load from localStorage immediately so the UI updates fast
    try {
      const localRaw = localStorage.getItem(`savedMatches_${user.uid}`);
      if (localRaw) {
        const localMatches = JSON.parse(localRaw) || [];
        setSavedMatches(localMatches);
      } else {
        setSavedMatches([]);
      }
    } catch (error) {
      console.error('Error loading saved matches from localStorage:', error);
      setSavedMatches([]);
    } finally {
      setLoadingSaved(false);
    }

    // 2) Refresh from Realtime DB in the background and merge
    (async () => {
      try {
        const matchesRef = ref(database, `volunteers/${user.uid}/matches`);
        const snap = await get(matchesRef);
        const remoteMatches = snap.exists() ? Object.values(snap.val()) : [];
        const yesMatches = remoteMatches
          .filter((m) => m.choice === 'yes');

        setSavedMatches((prev) => {
          const byId = new Map();
          (prev || []).forEach((m) => {
            if (m && m.schoolId != null) byId.set(String(m.schoolId), m);
          });
          (yesMatches || []).forEach((m) => {
            if (m && m.schoolId != null) byId.set(String(m.schoolId), m);
          });
          const merged = Array.from(byId.values());

          // Keep localStorage in sync
          try {
            localStorage.setItem(`savedMatches_${user.uid}`, JSON.stringify(merged));
          } catch (error) {
            console.error('Error writing merged saved matches to localStorage:', error);
          }

          return merged;
        });
      } catch (error) {
        console.error('Error loading saved matches from Realtime DB:', error);
      }
    })();
  }, [user]);

  const removeTopCard = (direction) => {
    if (!schools.length) return;
    setLastDirection(direction);

    const topSchool = schools[schools.length - 1];

    if (direction === 'Yes') {
      setSuccessMatch((prev) => [...prev, topSchool]);
      // Optimistically add to saved matches in-memory and localStorage
      setSavedMatches((prev) => {
        const existingIndex = prev.findIndex((m) => m.schoolId === topSchool.id);
        const matchData = {
          schoolId: topSchool.id,
          schoolName: topSchool.Name,
          location: topSchool.Location,
          values: topSchool.Values,
          prefLevel: topSchool.PrefLevel,
          choice: 'yes',
        };
        let next;
        if (existingIndex >= 0) {
          next = [...prev];
          next[existingIndex] = { ...next[existingIndex], ...matchData };
        } else {
          next = [...prev, matchData];
        }

        if (user) {
          try {
            localStorage.setItem(`savedMatches_${user.uid}`, JSON.stringify(next));
          } catch (error) {
            console.error('Error writing saved matches to localStorage:', error);
          }
        }

        return next;
      });
    }

    // Optimistically update the UI immediately
    setSchools((prev) => prev.slice(0, -1));

    // Best-effort persistence that never blocks UI
    if (user && topSchool && direction === 'Yes') {
      try {
        const matchRef = ref(database, `volunteers/${user.uid}/matches/${topSchool.id}`);
        const matchData = {
          schoolId: topSchool.id,
          schoolName: topSchool.Name,
          location: topSchool.Location,
          values: topSchool.Values,
          prefLevel: topSchool.PrefLevel,
          choice: 'yes',
          updatedAt: serverTimestamp(),
        };
        update(matchRef, matchData).catch((error) => {
          console.error('Error saving match:', error);
        });
      } catch (error) {
        console.error('Error initializing match save:', error);
      }
    }
  };

  return (
    <main className="pt-16 min-h-screen bg-gradient-to-b from-pink-50/60 to-white">
      <div className="max-w-4xl mx-auto px-6 py-20">
        {!user && (
          <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
            <span className="font-semibold">Heads up:</span>{' '}
            You can try the matching demo, but your choices won&apos;t be saved.{' '}
            <Link to="/log-in" className="underline font-semibold hover:text-amber-900">
              Sign in to save your matches.
            </Link>
          </div>
        )}

        {user && savedMatches.length > 0 && (
          <div className="mb-6 flex items-center justify-between gap-3 text-sm">
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-emerald-700">
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-600 text-white text-[10px] font-semibold">
                {savedMatches.length}
              </span>
              <span>
                Saved match{savedMatches.length === 1 ? '' : 'es'}
              </span>
            </div>
            <p className="text-xs text-gray-500">
              These are schools you previously liked. Scroll down to see them.
            </p>
          </div>
        )}

        {/* Header */}
        {matchCount > 0 && (
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="text-left">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-3xl sm:text-4xl font-bold text-gray-900"
              >
                Review your matches{' '}
                <span className="text-rose-500 text-xl align-middle">
                  ({schools.length}/{matchCount})
                </span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mt-2 text-gray-500 text-sm sm:text-base max-w-xl"
              >
                Each card represents a school that aligns with your interests and education level.
                Choose <span className="font-semibold text-emerald-600">Yes</span> to save a school
                to your matches or <span className="font-semibold text-gray-500">No</span> to skip it.
              </motion.p>
            </div>
            <div className="mt-2 md:mt-0 text-sm text-gray-500 bg-white/80 border border-gray-100 rounded-2xl px-4 py-3 shadow-sm">
              <p className="font-semibold text-gray-800 mb-1">How it works</p>
              <ul className="space-y-1 list-disc list-inside">
                <li>Cards are ordered from best match to least.</li>
                <li>Drag a card or use the buttons below.</li>
                <li>Your Yes choices are saved to your account when signed in.</li>
              </ul>
            </div>
          </div>
        )}

        {/* Saved matches gallery */}
        {user && !loadingSaved && savedMatches.length > 0 && (
          <section className="mb-10">
            <h2 className="text-base font-semibold text-gray-900 mb-2">
              Your saved schools
            </h2>
            <p className="text-xs text-gray-500 mb-3">
              These are schools you previously liked. Tap any card to see details again.
            </p>
            <div className="flex gap-4 overflow-x-auto pb-2">
              {savedMatches.map((match) => {
                const school =
                  dummySchools.find((s) => s.id === match.schoolId) ||
                  dummySchools.find((s) => String(s.id) === String(match.schoolId));
                return (
                  <button
                    key={match.schoolId || match.id}
                    type="button"
                    onClick={() => school && setSelectedSchool(school)}
                    aria-label={`Open details for ${match.schoolName}`}
                    className="min-w-[220px] max-w-[240px] text-left bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
                  >
                    {school && (
                      <div
                        className="h-28 w-full rounded-t-2xl bg-cover bg-center"
                        style={{ backgroundImage: `url(${school.Picture})` }}
                        aria-hidden="true"
                      />
                    )}
                    <div className="p-3">
                      <p className="text-sm font-semibold text-gray-900 truncate">
                        {match.schoolName}
                      </p>
                      <p className="mt-1 text-[11px] text-gray-500 truncate">
                        {match.location}
                      </p>
                      <p className="mt-1 text-[11px] text-gray-400 line-clamp-2">
                        {match.values}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </section>
        )}

        {/* No new matches from the current survey */}
        {matchCount === 0 && savedMatches.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-gray-100" role="status">
            <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-xl text-gray-500 font-medium">No matches found</p>
            <p className="mt-2 text-gray-400">Please complete the interest survey or contact us for more options.</p>
          </div>
        )}

        {/* Swipe cards */}
        {schools.length > 0 && (
          <>
            <div className="relative flex justify-center items-center h-[420px]" aria-label="Swipeable school cards">
              <AnimatePresence>
                {schools.map((school, index) => {
                  const isTop = index === schools.length - 1;
                  return (
                    <motion.div
                      key={school.id}
                      className="absolute cursor-pointer"
                      style={{ zIndex: index }}
                      drag={isTop ? 'x' : false}
                      dragConstraints={{ left: 0, right: 0 }}
                      onDragEnd={(_, info) => {
                        if (info.offset.x > 100) removeTopCard('Yes');
                        else if (info.offset.x < -100) removeTopCard('No');
                      }}
                      whileTap={isTop ? { scale: 0.97 } : {}}
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{
                        scale: isTop ? 1 : 0.95 - (schools.length - 1 - index) * 0.03,
                        opacity: 1,
                        y: (schools.length - 1 - index) * 8,
                      }}
                      exit={{
                        opacity: 0,
                        x: lastDirection === 'Yes' ? -300 : 300,
                        rotate: lastDirection === 'Yes' ? -15 : 15,
                      }}
                      transition={{ type: 'spring', damping: 20 }}
                      onClick={() => isTop && setSelectedSchool(school)}
                      aria-label={`${school.Name} in ${school.Location}. Drag left to accept, right to skip.`}
                    >
                      <div className="w-72 bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                        <div
                          className="h-56 bg-cover bg-center"
                          style={{ backgroundImage: `url(${school.Picture})` }}
                          role="img"
                          aria-label={`${school.Name} campus`}
                        />
                        <div className="p-4">
                          <h3 className="font-bold text-gray-900">{school.Name}</h3>
                          <p className="text-sm text-gray-500">{school.Location}</p>
                          <p className="text-xs text-gray-400 mt-1">Level: {school.PrefLevel}</p>
                          <div className="flex flex-wrap gap-1.5 mt-3">
                            {school.Values.split(',').map((val, i) => (
                              <span key={i} className="px-2 py-0.5 rounded-full bg-rose-50 text-rose-600 text-xs font-medium">
                                {val.trim()}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            <div className="flex justify-center gap-6 mt-8" role="group" aria-label="Accept or skip the current school">
              <button
                onClick={() => removeTopCard('Yes')}
                className="px-10 py-3 rounded-full bg-gradient-to-r from-emerald-400 to-emerald-500 text-white font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
                aria-label="Accept this school"
              >
                Yes
              </button>
              <button
                onClick={() => removeTopCard('No')}
                className="px-10 py-3 rounded-full bg-gradient-to-r from-gray-300 to-gray-400 text-white font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
                aria-label="Skip this school"
              >
                No
              </button>
            </div>

            {lastDirection && (
              <motion.p
                key={lastDirection + schools.length}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center mt-4 text-lg font-semibold text-gray-600"
                role="status"
                aria-live="polite"
              >
                You chose{' '}
                <span className={lastDirection === 'Yes' ? 'text-emerald-500' : 'text-gray-400'}>
                  {lastDirection}
                </span>
              </motion.p>
            )}
          </>
        )}

        {/* No schools selected after swiping */}
        {matchCount > 0 && schools.length === 0 && successMatch.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-gray-100" role="status">
            <p className="text-xl text-gray-500 font-medium">No matches selected</p>
            <p className="mt-2 text-gray-400">
              You reached the end of your matches without saving any schools.
            </p>
            <Link
              to="/interest-form"
              className="inline-flex mt-6 px-6 py-2.5 rounded-full bg-gradient-to-r from-rose-400 to-pink-500 text-white text-sm font-semibold shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
            >
              Retake interest survey
            </Link>
          </div>
        )}

        {/* Congratulations matched schools */}
        {matchCount > 0 && schools.length === 0 && successMatch.length > 0 && (
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl font-bold text-center text-gray-900 mb-8"
            >
              Congratulations! You matched with these schools!
            </motion.h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {successMatch.map((school, index) => (
                <motion.div
                  key={school.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100"
                  onClick={() => setSelectedSchool(school)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && setSelectedSchool(school)}
                  aria-label={`View details for matched school: ${school.Name}`}
                >
                  <img src={school.Picture} alt={`${school.Name} campus`} className="w-full h-40 object-cover" loading="lazy" />
                  <div className="p-4">
                    <h3 className="font-bold text-gray-900">{school.Name}</h3>
                    <p className="text-sm text-gray-500">{school.Location}</p>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {school.Values.split(',').map((val, i) => (
                        <span key={i} className="px-2 py-0.5 rounded-full bg-rose-50 text-rose-600 text-xs font-medium">
                          {val.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

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
                <img src={selectedSchool.Picture} alt={`${selectedSchool.Name} campus`} className="w-full h-64 object-cover rounded-t-2xl" />
                <div className="p-8 space-y-4">
                  <h2 className="text-2xl font-bold text-gray-900">{selectedSchool.Name}</h2>
                  <dl className="space-y-3 text-gray-600">
                    <div><dt className="inline font-semibold text-gray-800">Location: </dt><dd className="inline">{selectedSchool.Location}</dd></div>
                    <div><dt className="inline font-semibold text-gray-800">Values: </dt><dd className="inline">{selectedSchool.Values}</dd></div>
                    <div><dt className="inline font-semibold text-gray-800">Preferred Level: </dt><dd className="inline">{selectedSchool.PrefLevel}</dd></div>
                    <div><dt className="inline font-semibold text-gray-800">Available: </dt><dd className="inline">{selectedSchool.AvailableTime || 'Not available'}</dd></div>
                    <div><dt className="inline font-semibold text-gray-800">Description: </dt><dd className="inline">{selectedSchool.Description || 'Not available'}</dd></div>
                    <div className="bg-rose-50 rounded-lg px-4 py-2">
                      <dt className="inline font-semibold text-gray-800">Contact: </dt>
                      <dd className="inline">{selectedSchool.Contact || 'Not available'}</dd>
                    </div>
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
      </div>
    </main>
  );
}
