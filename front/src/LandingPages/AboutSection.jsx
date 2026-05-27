import React from 'react';
import MaterialIcon from '../components/MaterialIcon';
import LandingSectionHeader from '../components/LandingSectionHeader';
import './AboutSection.css';

const AboutSection = () => {
  const problems = [
    'Double deeds and duplicate registrations',
    'Manual paper-based verification taking months',
    'High legal costs and intermediary fees',
    'Risk of record loss or tampering',
    'Lack of transparency for buyers and officials',
  ];

  const solutions = [
    'Immutable records that are hard to alter without trace',
    'Faster document checks with a clear checklist',
    'Everyone sees the same transfer status',
    'Guided stages that match real registry steps',
    'Secure digital proofs instead of loose paper copies',
  ];

  const steps = [
    { n: 1, title: 'Register', desc: 'Upload property documents', icon: 'upload_file' },
    { n: 2, title: 'Verify', desc: 'Government validates records', icon: 'fact_check' },
    { n: 3, title: 'Transfer', desc: 'Ownership moves on approval', icon: 'swap_horiz' },
    { n: 4, title: 'Record', desc: 'Entry saved on the ledger', icon: 'inventory_2' },
  ];

  return (
    <section id="about" className="landing-section-anchor about-section">
      <div className="about-section__bg" />
      <div className="about-section__container">
        <LandingSectionHeader
          label="Why GoLand"
          title="Land records should be clear, not confusing"
          subtitle="Citizens, sellers, and officials all need the same truth about who owns what — without months of paperwork."
        />

        <div className="about-section__compare-grid">
          <div className="about-section__panel about-section__panel--problem">
            <div className="flex items-center gap-sm mb-md">
              <span className="w-11 h-11 rounded-xl bg-error/10 flex items-center justify-center">
                <MaterialIcon name="cancel" className="text-error" fill size={26} />
              </span>
              <h3 className="font-headline-md text-on-surface">The problem today</h3>
            </div>
            <ul className="space-y-sm">
              {problems.map((item, idx) => (
                <li key={idx} className="flex items-start gap-sm rounded-lg bg-white/60 px-sm py-xs">
                  <MaterialIcon name="close" size={18} className="text-error shrink-0 mt-0.5" />
                  <span className="font-body-md text-on-surface">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="about-section__panel about-section__panel--solution">
            <div className="flex items-center gap-sm mb-md">
              <span className="w-11 h-11 rounded-xl bg-[#e8f5e9] flex items-center justify-center">
                <MaterialIcon name="check_circle" className="text-[#2D7A4F]" fill size={26} />
              </span>
              <h3 className="font-headline-md text-on-surface">What GoLand offers</h3>
            </div>
            <ul className="space-y-sm">
              {solutions.map((item, idx) => (
                <li key={idx} className="flex items-start gap-sm rounded-lg bg-white/60 px-sm py-xs">
                  <MaterialIcon name="check_circle" className="text-[#2D7A4F] shrink-0 mt-0.5" fill size={18} />
                  <span className="font-body-md text-on-surface">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="landing-card about-section__timeline">
          <h3 className="font-headline-md text-primary text-center mb-xl">How it works</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-md relative">
            <div className="hidden md:block absolute top-7 left-[14%] right-[14%] h-0.5 bg-gradient-to-r from-primary/20 via-secondary/40 to-primary/20" />
            {steps.map((step) => (
              <div key={step.n} className="flex flex-col items-center text-center relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-primary-container text-on-primary flex items-center justify-center mb-sm shadow-md">
                  <MaterialIcon name={step.icon} size={26} />
                </div>
                <span className="w-6 h-6 -mt-3 mb-1 rounded-full bg-secondary text-on-secondary text-[11px] font-bold flex items-center justify-center">
                  {step.n}
                </span>
                <p className="text-label-sm text-on-surface font-bold">{step.title}</p>
                <p className="text-body-sm text-on-surface-variant mt-xs">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
