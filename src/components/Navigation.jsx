import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../AuthContext.jsx';

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  const scrollToSection = (sectionId) => {
    setMobileOpen(false);
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    } else {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const closeMobile = () => setMobileOpen(false);

  const isActive = (path) => location.pathname === path;

  const baseNavLink = 'text-sm font-medium transition-colors duration-200';

  const navLinkClass = (path) =>
    `${baseNavLink} ${
      isActive(path)
        ? 'text-gray-900 border-b-2 border-rose-400 pb-1'
        : 'text-gray-600 hover:text-rose-500'
    }`;
  const mobileNavLinkClass =
    'block px-4 py-2.5 text-sm font-medium text-gray-600 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors duration-200';

  const accountRef = useRef(null);

  const initials = user
    ? (user.displayName || user.email || '')
        .split(' ')
        .map((part) => part[0])
        .join('')
        .slice(0, 2)
        .toUpperCase()
    : '';

  useEffect(() => {
    if (!accountOpen) return;
    const handleClickOutside = (event) => {
      if (accountRef.current && !accountRef.current.contains(event.target)) {
        setAccountOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [accountOpen]);

  return (
    <nav
      aria-label="Main navigation"
      className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-rose-100/60 shadow-sm"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0" aria-label="ImpactU — Home">
            <img
              src="/impactu-mark.svg"
              alt="ImpactU school logo"
              className="h-9 w-9 rounded-lg"
            />
            <span className="text-lg font-bold bg-gradient-to-r from-rose-500 to-pink-600 bg-clip-text text-transparent hidden sm:inline">
              ImpactU
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className={navLinkClass('/')}>Home</Link>
            <Link to="/find-school" className={navLinkClass('/find-school')}>Find Schools</Link>
            <button
              onClick={() => scrollToSection('mission')}
              className={`${baseNavLink} text-gray-600 hover:text-rose-500 bg-transparent border-none cursor-pointer p-0`}
            >
              Mission
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className={`${baseNavLink} text-gray-600 hover:text-rose-500 bg-transparent border-none cursor-pointer p-0`}
            >
              Contact
            </button>
          </div>

          {/* Desktop actions */}
          <div className="hidden md:flex items-center gap-4">
            {!user && (
              <Link to="/log-in" className={navLinkClass('/log-in')}>Log in</Link>
            )}
            {user && (
              <div className="relative" ref={accountRef}>
                <button
                  type="button"
                  onClick={() => setAccountOpen((open) => !open)}
                  aria-haspopup="menu"
                  aria-expanded={accountOpen}
                  className="flex items-center gap-2 rounded-full border border-rose-100 bg-white px-3 py-1.5 shadow-sm hover:shadow-md hover:border-rose-200 transition-all text-xs font-medium text-gray-700"
                >
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-rose-500 text-white text-xs font-semibold">
                    {initials || '?'}
                  </span>
                  <span className="max-w-[120px] truncate">
                    {user.displayName || user.email}
                  </span>
                  <svg className="w-3 h-3 text-gray-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.188l3.71-3.957a.75.75 0 111.1 1.02l-4.25 4.53a.75.75 0 01-1.1 0l-4.25-4.53a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                  </svg>
                </button>
                {accountOpen && (
                  <div
                    className="absolute right-0 mt-2 w-52 rounded-2xl bg-white border border-gray-100 shadow-lg py-2 text-sm text-gray-700 z-50"
                    role="menu"
                  >
                    <button
                      type="button"
                      className="w-full text-left px-4 py-2 hover:bg-rose-50"
                      onClick={() => {
                        setAccountOpen(false);
                        navigate('/match');
                      }}
                    >
                      My matches
                    </button>
                    <button
                      type="button"
                      className="w-full text-left px-4 py-2 hover:bg-rose-50"
                      onClick={() => {
                        setAccountOpen(false);
                        navigate('/qualifications');
                      }}
                    >
                      My profile
                    </button>
                    <div className="my-1 border-t border-gray-100" />
                    <button
                      type="button"
                      className="w-full text-left px-4 py-2 text-gray-500 hover:bg-rose-50"
                      onClick={() => {
                        setAccountOpen(false);
                        logout();
                      }}
                    >
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            )}
            <Link
              to="/interest-form"
              className="inline-flex items-center px-5 py-2 rounded-full bg-gradient-to-r from-rose-400 to-pink-500 text-white text-sm font-semibold shadow-lg shadow-rose-200/50 hover:shadow-xl hover:shadow-rose-300/50 hover:-translate-y-0.5 transition-all duration-300"
            >
              Volunteer Now
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-rose-50 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div id="mobile-menu" className="md:hidden pb-4 border-t border-rose-100/60 mt-1">
            <div className="flex flex-col gap-1 pt-3">
              <Link to="/" onClick={closeMobile} className={mobileNavLinkClass}>Home</Link>
              <Link to="/find-school" onClick={closeMobile} className={mobileNavLinkClass}>Find Schools</Link>
              <button onClick={() => scrollToSection('mission')} className={`${mobileNavLinkClass} text-left bg-transparent border-none cursor-pointer w-full`}>Mission</button>
              <button onClick={() => scrollToSection('contact')} className={`${mobileNavLinkClass} text-left bg-transparent border-none cursor-pointer w-full`}>Contact</button>
              <div className="mt-2 mb-1 border-t border-rose-100" />
              {!user && (
                <Link to="/log-in" onClick={closeMobile} className={mobileNavLinkClass}>Log in</Link>
              )}
              {user && (
                <>
                  <p className="px-4 pt-2 pb-1 text-xs font-semibold uppercase tracking-wide text-gray-400">
                    For volunteers
                  </p>
                  <Link to="/match" onClick={closeMobile} className={mobileNavLinkClass}>My matches</Link>
                  <Link to="/qualifications" onClick={closeMobile} className={mobileNavLinkClass}>My profile</Link>
                  <button
                    type="button"
                    onClick={() => {
                      closeMobile();
                      logout();
                    }}
                    className={mobileNavLinkClass}
                  >
                    Sign out
                  </button>
                </>
              )}
              <Link
                to="/interest-form"
                onClick={closeMobile}
                className="mx-4 mt-3 text-center px-5 py-2.5 rounded-full bg-gradient-to-r from-rose-400 to-pink-500 text-white text-sm font-semibold shadow-lg shadow-rose-200/50"
              >
                Volunteer Now
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
