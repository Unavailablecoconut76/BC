import React, { useState } from 'react';
import MaterialIcon from './MaterialIcon';
import './LandingNav.css';

const NAV_ITEMS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'services', label: 'Services' },
  { id: 'faq', label: 'FAQs' },
];

const LandingNav = ({ currentSection, scrollToSection, embedded = false }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navClass = embedded ? 'landing-nav' : 'landing-nav landing-nav--floating';

  return (
    <nav className={navClass}>
      <div className="landing-nav__inner">
        <button
          type="button"
          onClick={() => scrollToSection('home')}
          className="landing-nav__brand group"
        >
          <span className="landing-nav__logo-box group-hover:scale-105">
            <MaterialIcon name="landscape" className="text-on-primary" fill size={22} />
          </span>
          <span className="landing-nav__logo-text">GoLand</span>
        </button>

        <div className="landing-nav__menu">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => scrollToSection(item.id)}
              className={`landing-nav__menu-btn ${
                currentSection === item.id
                  ? 'bg-surface-container-lowest text-primary font-semibold shadow-sm'
                  : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => scrollToSection('login')}
          className={`landing-nav__cta ${
            currentSection === 'login'
              ? 'bg-gradient-to-r from-secondary to-[#7a3517] text-on-secondary'
              : 'bg-primary text-on-primary hover:opacity-90'
          }`}
        >
          Enter Platform
          <MaterialIcon name="login" size={18} />
        </button>

        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="landing-nav__mobile-toggle"
          aria-label="Menu"
          aria-expanded={mobileOpen}
          aria-controls="landing-mobile-menu"
        >
          <MaterialIcon name={mobileOpen ? 'close' : 'menu'} size={26} />
        </button>
      </div>

      {mobileOpen && (
        <div id="landing-mobile-menu" className="landing-nav__mobile-menu">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                scrollToSection(item.id);
                setMobileOpen(false);
              }}
              className={`landing-nav__mobile-link ${
                currentSection === item.id
                  ? 'bg-primary/8 text-primary font-semibold'
                  : 'text-on-surface-variant'
              }`}
            >
              {item.label}
            </button>
          ))}
          <button
            type="button"
            onClick={() => {
              scrollToSection('login');
              setMobileOpen(false);
            }}
            className="landing-nav__mobile-cta"
          >
            Enter Platform
            <MaterialIcon name="login" size={18} />
          </button>
        </div>
      )}
    </nav>
  );
};

export default LandingNav;
