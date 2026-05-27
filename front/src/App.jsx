import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import AboutSection from './LandingPages/AboutSection';
import ServicesSection from './LandingPages/ServicesSection';
import FAQSection from './LandingPages/FAQSection';
import LoginSection from './LandingPages/LoginSection';
import LandingNav from './components/LandingNav';
import MaterialIcon from './components/MaterialIcon';
import HeroVisual from './components/HeroVisual';
import './App.css';

const LANDING_HEADER_OFFSET = 80;
const SECTION_IDS = ['home', 'about', 'services', 'faq', 'login'];

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
};

const FEATURES = [
  {
    icon: 'folder_open',
    title: 'Step-by-step transfer',
    desc: 'Six clear stages from due diligence to mutation',
    accent: 'from-primary/10 to-primary/5',
  },
  {
    icon: 'verified_user',
    title: 'Official review',
    desc: 'Approve or reject parcels before records update',
    accent: 'from-secondary/15 to-secondary/5',
  },
  {
    icon: 'search',
    title: 'Verify ownership',
    desc: 'Check status with Survey No or Parcel ID',
    accent: 'from-[#e8f5e9] to-transparent',
  },
];

const PORTALS = [
  { label: 'Buyer', desc: 'Marketplace & offers', icon: 'person_search', path: '/dashboardbuyer' },
  { label: 'Seller', desc: 'Properties & transfers', icon: 'home', path: '/dashboard' },
  { label: 'Official', desc: 'Approvals & registry', icon: 'admin_panel_settings', path: '/dashboardofficial' },
];

const HeroSection = ({ scrollToSection }) => {
  const navigate = useNavigate();

  return (
    <section id="home" className="landing-section-anchor landing-hero">
      <div className="landing-hero__base" />
      <div
        className="landing-hero__glow"
        style={{
          background:
            'radial-gradient(ellipse 90% 60% at 10% 0%, rgba(0,36,82,0.09) 0%, transparent 55%), radial-gradient(ellipse 70% 50% at 95% 20%, rgba(152,71,31,0.08) 0%, transparent 50%)',
        }}
        aria-hidden
      />
      <div className="landing-grid-pattern landing-hero__pattern" aria-hidden />

      <div className="landing-hero__container">
        <div className="landing-hero__layout">
          <motion.div {...fadeUp} className="landing-hero__content">
            <p className="landing-hero__tag">
              <MaterialIcon name="account_balance" size={18} className="text-primary" fill />
              Digital land registry
            </p>
            <h1 className="landing-hero__title">
              <span className="text-gradient-hero">Secure land</span>
              <span className="block text-on-surface mt-1">ownership for every citizen.</span>
            </h1>
            <p className="landing-hero__subtitle">
              One portal for buyers, sellers, and officials — track documents, approvals, and transfers
              without getting lost in paper files.
            </p>
            <div className="landing-hero__actions">
              <button
                type="button"
                onClick={() => scrollToSection('login')}
                className="landing-hero__primary-btn"
              >
                Get Started
                <MaterialIcon name="arrow_forward" size={20} />
              </button>
              <button
                type="button"
                onClick={() => scrollToSection('services')}
                className="landing-hero__secondary-btn"
              >
                <MaterialIcon name="play_circle" size={20} />
                How it works
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <HeroVisual />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.25 }}
          className="landing-hero__feature-grid"
        >
          {FEATURES.map((item, i) => (
            <div
              key={item.title}
              className={`landing-card landing-hero__feature-card bg-gradient-to-b ${item.accent}`}
              style={{ transitionDelay: `${i * 50}ms` }}
            >
              <div className="landing-hero__feature-icon">
                <MaterialIcon name={item.icon} className="text-primary" size={24} />
              </div>
              <h3 className="font-body-md font-bold text-on-surface mb-xs">{item.title}</h3>
              <p className="text-body-sm text-on-surface-variant leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="landing-hero__portal-wrap"
        >
          <div className="landing-hero__portal-head">
            <div>
              <p className="landing-hero__portal-kicker">
                Quick access
              </p>
              <p className="font-headline-sm text-on-surface">Choose your portal</p>
            </div>
            <button
              type="button"
              onClick={() => scrollToSection('login')}
              className="landing-hero__portal-link"
            >
              Or sign in below
              <MaterialIcon name="south" size={18} />
            </button>
          </div>
          <div className="landing-hero__portal-grid">
            {PORTALS.map((portal) => (
              <button
                key={portal.path}
                type="button"
                onClick={() => navigate(portal.path)}
                className="landing-portal-card group"
              >
                <div className="flex items-center justify-between mb-md">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 border border-outline-variant flex items-center justify-center group-hover:scale-105 transition-transform">
                    <MaterialIcon name={portal.icon} className="text-primary" size={26} />
                  </div>
                  <span className="w-9 h-9 rounded-full border border-outline-variant flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-colors">
                    <MaterialIcon
                      name="arrow_forward"
                      size={18}
                      className="text-on-surface-variant group-hover:text-on-primary transition-colors"
                    />
                  </span>
                </div>
                <p className="font-headline-sm text-primary">{portal.label}</p>
                <p className="text-body-sm text-on-surface-variant mt-xs">{portal.desc}</p>
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const App = () => {
  const [currentSection, setCurrentSection] = useState('home');

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (!element) return;
    const top = element.getBoundingClientRect().top + window.scrollY - LANDING_HEADER_OFFSET;
    window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
    setCurrentSection(sectionId);
  };

  useEffect(() => {
    const visibility = new Map(SECTION_IDS.map((id) => [id, 0]));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          visibility.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0);
        });
        let active = 'home';
        let maxRatio = 0;
        SECTION_IDS.forEach((id) => {
          const ratio = visibility.get(id) || 0;
          if (ratio > maxRatio) {
            maxRatio = ratio;
            active = id;
          }
        });
        if (maxRatio > 0) setCurrentSection(active);
      },
      { rootMargin: '-15% 0px -40% 0px', threshold: [0, 0.15, 0.35, 0.55, 0.75, 1] }
    );
    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="landing-page">
      <header className="landing-page__header">
        <LandingNav currentSection={currentSection} scrollToSection={scrollToSection} embedded />
      </header>

      <main className="landing-page__main">
        <HeroSection scrollToSection={scrollToSection} />
        <AboutSection />
        <ServicesSection />
        <FAQSection />
        <LoginSection />
      </main>
    </div>
  );
};

export default App;
