import React from 'react';

const LandingSectionHeader = ({ label, title, subtitle, align = 'center' }) => (
  <div
    className={`mb-xl md:mb-2xl max-w-2xl ${align === 'center' ? 'mx-auto text-center' : 'text-left'}`}
  >
    {label && (
      <p className="text-label-sm font-semibold text-secondary uppercase tracking-[0.12em] mb-sm">
        {label}
      </p>
    )}
    <div className={`landing-ornament-line mb-md ${align === 'center' ? 'mx-auto' : ''}`} />
    <h2 className="font-headline-lg text-primary tracking-tight mb-sm">{title}</h2>
    {subtitle && (
      <p className="font-body-lg text-on-surface-variant leading-relaxed">{subtitle}</p>
    )}
  </div>
);

export default LandingSectionHeader;
