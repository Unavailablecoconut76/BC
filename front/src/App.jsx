import React, { useState } from 'react';
import { Shield, FileCheck, Zap, Users, ChevronDown, Menu, X, Home, Info, HelpCircle, Briefcase, LogIn } from 'lucide-react';
import AboutSection from './LandingPages/AboutSection';
import ServicesSection from './LandingPages/ServicesSection';
import FAQSection from './LandingPages/FAQSection';
import LoginSection from './LandingPages/LoginSection';
import ThemeToggle from './theme/ThemeToggle';

const Navigation = ({ currentSection, scrollToSection }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'about', label: 'About', icon: Info },
    { id: 'services', label: 'Services', icon: Briefcase },
    { id: 'faq', label: 'FAQs', icon: HelpCircle },
  ];

  return (
    <nav className="fixed top-0 w-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm z-50 border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <Shield className="w-8 h-8 text-emerald-500 dark:text-emerald-400" />
            <span className="text-2xl font-bold text-slate-900 dark:text-white">GoLand</span>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <div className="flex space-x-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all ${
                    currentSection === item.id
                      ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-400/10'
                      : 'text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
            <ThemeToggle />
            <button
              onClick={() => scrollToSection('login')}
              className="flex items-center space-x-2 bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded-lg transition-all"
            >
              <LogIn className="w-4 h-4" />
              <span>Enter Platform</span>
            </button>
          </div>

          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-slate-900 dark:text-white p-2"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-2 border-t border-slate-200 dark:border-slate-800">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  scrollToSection(item.id);
                  setMobileMenuOpen(false);
                }}
                className="flex items-center space-x-2 w-full px-3 py-2 text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
              >
                <item.icon className="w-4 h-4" />
                <span>{item.label}</span>
              </button>
            ))}
            <button
              onClick={() => {
                scrollToSection('login');
                setMobileMenuOpen(false);
              }}
              className="flex items-center space-x-2 w-full bg-emerald-500 hover:bg-emerald-600 text-white px-3 py-2 rounded-lg"
            >
              <LogIn className="w-4 h-4" />
              <span>Enter Platform</span>
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

const HeroSection = ({ scrollToSection }) => {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 pt-16"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="mb-8 inline-flex items-center space-x-2 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 rounded-full px-4 py-2">
          <Zap className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span className="text-emerald-700 dark:text-emerald-400 text-sm font-medium">
            Blockchain-Powered Land Registry
          </span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold text-slate-900 dark:text-white mb-6 leading-tight">
          Secure Land Transactions
          <br />
          <span className="text-emerald-600 dark:text-emerald-400">Made Simple</span>
        </h1>

        <p className="text-xl text-slate-600 dark:text-slate-300 mb-12 max-w-3xl mx-auto">
          Revolutionary blockchain platform for transparent, fraud-proof land registration and property
          transfers. Verification, smart contracts, and seamless government integration.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => scrollToSection('login')}
            className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all flex items-center justify-center space-x-2 shadow-lg shadow-slate-200/70 dark:shadow-black/20"
          >
            <span>Get Started</span>
            <ChevronDown className="w-5 h-5" />
          </button>
          <button
            onClick={() => scrollToSection('about')}
            className="bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-900 dark:text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all border border-slate-300 dark:border-slate-700"
          >
            Learn More
          </button>
        </div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: Shield, label: 'Blockchain Secured', value: '100%' },
            { icon: FileCheck, label: 'Verification', value: 'Real-time' },
            { icon: Users, label: 'Trusted Users', value: '10K+' },
          ].map((stat, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl p-6 shadow-lg shadow-slate-200/70 dark:shadow-black/20"
            >
              <stat.icon className="w-10 h-10 text-emerald-600 dark:text-emerald-400 mx-auto mb-4" />
              <div className="text-3xl font-bold text-slate-900 dark:text-white mb-2">{stat.value}</div>
              <div className="text-slate-600 dark:text-slate-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-slate-100 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Shield className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              <span className="text-xl font-bold text-slate-900 dark:text-white">GoLand</span>
            </div>
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              Blockchain-powered land registry platform ensuring secure, transparent property transactions.
            </p>
          </div>

          <div>
            <h4 className="text-slate-900 dark:text-white font-semibold mb-4">Platform</h4>
            <ul className="space-y-2 text-slate-600 dark:text-slate-400 text-sm">
              <li><a href="#" className="hover:text-emerald-600 dark:hover:text-emerald-400">How it Works</a></li>
              <li><a href="#" className="hover:text-emerald-600 dark:hover:text-emerald-400">Services</a></li>
              <li><a href="#" className="hover:text-emerald-600 dark:hover:text-emerald-400">Pricing</a></li>
              <li><a href="#" className="hover:text-emerald-600 dark:hover:text-emerald-400">API Documentation</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-slate-900 dark:text-white font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-slate-600 dark:text-slate-400 text-sm">
              <li><a href="#" className="hover:text-emerald-600 dark:hover:text-emerald-400">FAQs</a></li>
              <li><a href="#" className="hover:text-emerald-600 dark:hover:text-emerald-400">Legal Compliance</a></li>
              <li><a href="#" className="hover:text-emerald-600 dark:hover:text-emerald-400">Support</a></li>
              <li><a href="#" className="hover:text-emerald-600 dark:hover:text-emerald-400">Blog</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-slate-900 dark:text-white font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-slate-600 dark:text-slate-400 text-sm">
              <li>Email: support@goland.in</li>
              <li>Phone: +91 XXXXX XXXXX</li>
              <li>Address: Mumbai, Maharashtra</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-200 dark:border-slate-800 pt-8 text-center text-slate-600 dark:text-slate-400 text-sm">
          <p>&copy; 2025 GoLand. All rights reserved. | Powered by Blockchain Technology</p>
        </div>
      </div>
    </footer>
  );
};

const App = () => {
  const [currentSection, setCurrentSection] = useState('home');

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setCurrentSection(sectionId);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <Navigation currentSection={currentSection} scrollToSection={scrollToSection} />
      <HeroSection scrollToSection={scrollToSection} />
      <AboutSection />
      <ServicesSection />
      <FAQSection />
      <LoginSection />
      <Footer />
    </div>
  );
};

export default App;
