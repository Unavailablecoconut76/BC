import React from 'react';
import MaterialIcon from '../components/MaterialIcon';
import LandingSectionHeader from '../components/LandingSectionHeader';
import './ServicesSection.css';

const PROCESS_STAGES = [
  { n: 1, label: 'Register' },
  { n: 2, label: 'Upload Docs' },
  { n: 3, label: 'Verify' },
  { n: 4, label: 'Approve' },
  { n: 5, label: 'Transfer' },
  { n: 6, label: 'Record' },
  { n: 7, label: 'Complete' },
];

const ServicesSection = () => {
  const services = [
    {
      icon: 'shield',
      title: 'Tamper-Proof Records',
      description: 'Land details stay on record and are hard to alter without leaving a trace.',
      features: ['Verify ownership', 'See record history', 'Spot duplicate entries'],
    },
    {
      icon: 'swap_horiz',
      title: 'Guided Ownership Transfer',
      description: 'Step-by-step flow from seller to buyer with official approval in between.',
      features: ['Track transfer status', 'Official sign-off', 'Clear handover steps'],
    },
    {
      icon: 'description',
      title: 'Document Vault',
      description: 'Keep deeds and ID proofs together for each parcel in one place.',
      features: ['Upload deeds', 'Checklist per stage', 'Official review queue'],
    },
    {
      icon: 'lock',
      title: 'Separate Portals by Role',
      description: 'Buyers, sellers, and officials each see only what they need.',
      features: ['Buyer marketplace', 'Seller properties', 'Official approvals'],
    },
    {
      icon: 'search',
      title: 'Public Verification',
      description: 'Look up a parcel using Survey No or Parcel ID before you buy.',
      features: ['Check dispute status', 'See last update', 'Search without login'],
    },
    {
      icon: 'bolt',
      title: 'Faster Than Paper Files',
      description: 'Digital steps can cut months of waiting compared to manual paper files.',
      features: ['Stage-wise progress', 'Fewer office visits', 'Status always visible'],
    },
  ];

  return (
    <section id="services" className="landing-section-anchor services-section">
      <div className="services-section__bg" />
      <div className="services-section__shade" />
      <div className="services-section__container">
        <LandingSectionHeader
          label="Capabilities"
          title="Everything in one registry flow"
          subtitle="Seven focused stages and tools that mirror how land transfers actually happen in India."
        />

        <div className="services-section__grid">
          {services.map((service) => (
            <div key={service.title} className="landing-card services-section__card group">
              <div className="services-section__icon-box group-hover:scale-105">
                <MaterialIcon name={service.icon} className="text-primary" size={28} />
              </div>
              <h3 className="font-headline-sm text-primary mb-sm">{service.title}</h3>
              <p className="font-body-md text-on-surface-variant mb-md leading-relaxed">{service.description}</p>
              <ul className="space-y-xs border-t border-outline-variant pt-md">
                {service.features.map((f) => (
                  <li key={f} className="flex items-center gap-xs">
                    <MaterialIcon name="check_circle" className="text-[#2D7A4F]" fill size={14} />
                    <span className="text-body-sm text-on-surface">{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="landing-card services-section__flow">
          <h3 className="font-headline-md text-primary text-center mb-lg">End-to-end transfer path</h3>
          <div className="overflow-x-auto pb-sm -mx-sm px-sm">
            <div className="flex min-w-[700px] items-start justify-between gap-2 relative">
              <div className="absolute top-5 left-10 right-10 h-1 rounded-full bg-gradient-to-r from-primary/30 via-secondary/50 to-primary/30" />
              {PROCESS_STAGES.map((stage) => (
                <div key={stage.n} className="flex flex-col items-center flex-1 relative z-10">
                  <div className="w-11 h-11 rounded-xl bg-primary text-on-primary flex items-center justify-center text-label-sm font-bold shadow-md mb-xs">
                    {stage.n}
                  </div>
                  <span className="text-[11px] text-on-surface font-semibold text-center leading-tight">
                    {stage.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <p className="text-body-sm text-on-surface-variant mt-sm md:hidden">
            Swipe horizontally to view all transfer stages.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
