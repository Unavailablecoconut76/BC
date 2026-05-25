import React, { useState } from 'react';
import MaterialIcon from './MaterialIcon';

const NAV_ITEMS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'services', label: 'Services' },
  { id: 'faq', label: 'FAQs' },
];

const LandingNav = ({ currentSection, scrollToSection, embedded = false }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navClass = embedded
    ? 'w-full'
    : 'fixed top-0 left-0 w-full z-[100] bg-surface-container-lowest/90 backdrop-blur-md border-b border-outline-variant';

  return (
    <nav className={navClass}>
      <div className="flex justify-between items-center w-full px-gutter max-w-container-max mx-auto h-[72px]">
        <button
          type="button"
          onClick={() => scrollToSection('home')}
          className="flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 rounded-lg group"
        >
          <span className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary to-primary-container flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
            <MaterialIcon name="landscape" className="text-on-primary" fill size={22} />
          </span>
          <span className="text-xl font-bold text-primary tracking-tight">GoLand</span>
        </button>

        <div className="hidden md:flex items-center gap-1 p-1 rounded-xl bg-surface-container-low/80 border border-outline-variant/60">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => scrollToSection(item.id)}
              className={`px-md py-xs rounded-lg text-body-md font-medium transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 ${
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
          className={`hidden md:inline-flex items-center gap-xs px-lg py-sm rounded-xl text-label-sm font-bold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 shadow-sm ${
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
          className="md:hidden p-2 text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 rounded-lg"
          aria-label="Menu"
        >
          <MaterialIcon name={mobileOpen ? 'close' : 'menu'} size={26} />
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-outline-variant bg-surface-container-lowest px-gutter py-md space-y-1 shadow-lg">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                scrollToSection(item.id);
                setMobileOpen(false);
              }}
              className={`block w-full text-left py-sm px-sm rounded-lg font-body-md ${
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
            className="w-full mt-sm py-sm rounded-xl font-bold bg-primary text-on-primary flex items-center justify-center gap-xs"
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
