import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../AuthContext.jsx';

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
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

  const navLinkClass =
    'text-sm font-medium text-gray-600 hover:text-rose-500 transition-colors duration-200';
  const mobileNavLinkClass =
    'block px-4 py-2.5 text-sm font-medium text-gray-600 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors duration-200';

  return (
    <nav
      aria-label="Main navigation"
      className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-rose-100/60 shadow-sm"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0" aria-label="Dev Divas — Home">
            <img
              src="/draft heart logo.jpeg"
              alt="Dev Divas logo"
              className="h-9 w-auto rounded-lg"
            />
            <span className="text-lg font-bold bg-gradient-to-r from-rose-500 to-pink-600 bg-clip-text text-transparent hidden sm:inline">
              Dev Divas
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-7">
            <Link to="/" className={navLinkClass}>Home</Link>
            <Link to="/find-school" className={navLinkClass}>Find School</Link>
            <button
              onClick={() => scrollToSection('mission')}
              className={`${navLinkClass} bg-transparent border-none cursor-pointer p-0`}
            >
              Mission
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className={`${navLinkClass} bg-transparent border-none cursor-pointer p-0`}
            >
              Contact
            </button>
            <Link to="/match" className={navLinkClass}>Matches</Link>
            <Link to="/qualifications" className={navLinkClass}>Profile</Link>
            {!user && (
              <Link to="/log-in" className={navLinkClass}>Log In</Link>
            )}
            {user && (
              <div className="flex items-center gap-3">
                <span className="text-xs font-medium text-gray-500">
                  Signed in as{' '}
                  <span className="text-gray-800">
                    {user.displayName || user.email}
                  </span>
                </span>
                <button
                  type="button"
                  onClick={logout}
                  className="text-xs font-semibold text-gray-500 hover:text-rose-500 bg-transparent border-none cursor-pointer"
                >
                  Sign out
                </button>
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
              <Link to="/find-school" onClick={closeMobile} className={mobileNavLinkClass}>Find School</Link>
              <button onClick={() => scrollToSection('mission')} className={`${mobileNavLinkClass} text-left bg-transparent border-none cursor-pointer w-full`}>Mission</button>
              <button onClick={() => scrollToSection('contact')} className={`${mobileNavLinkClass} text-left bg-transparent border-none cursor-pointer w-full`}>Contact</button>
              <Link to="/match" onClick={closeMobile} className={mobileNavLinkClass}>Matches</Link>
              <Link to="/qualifications" onClick={closeMobile} className={mobileNavLinkClass}>Profile</Link>
              {!user && (
                <Link to="/log-in" onClick={closeMobile} className={mobileNavLinkClass}>Log In</Link>
              )}
              {user && (
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
