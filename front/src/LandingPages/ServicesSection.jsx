import React from 'react';
import MaterialIcon from '../components/MaterialIcon';
import LandingSectionHeader from '../components/LandingSectionHeader';

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
    <section id="services" className="landing-section-anchor relative py-16 md:py-24 px-gutter overflow-hidden">
      <div className="absolute inset-0 bg-surface-container-lowest" />
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/[0.03] to-transparent pointer-events-none" />
      <div className="relative max-w-container-max mx-auto">
        <LandingSectionHeader
          label="Capabilities"
          title="Everything in one registry flow"
          subtitle="Six focused tools that mirror how land transfers actually happen in India."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg mb-xl">
          {services.map((service) => (
            <div key={service.title} className="landing-card border-t-[3px] border-t-primary p-lg group">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/12 to-secondary/8 flex items-center justify-center mb-md group-hover:scale-105 transition-transform">
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

        <div className="landing-card rounded-2xl p-lg md:p-xl bg-gradient-to-br from-surface-container-lowest to-surface-container-low">
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
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
