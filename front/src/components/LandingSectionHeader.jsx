import React from 'react';
import './LandingSectionHeader.css';

const LandingSectionHeader = ({ label, title, subtitle, align = 'center' }) => (
  <div className={`landing-section-header ${align === 'center' ? 'landing-section-header--center' : ''}`}>
    {label && (
      <p className="landing-section-header__label">
        {label}
      </p>
    )}
    <div className={`landing-ornament-line landing-section-header__ornament ${align === 'center' ? 'mx-auto' : ''}`} />
    <h2 className="landing-section-header__title">{title}</h2>
    {subtitle && (
      <p className="landing-section-header__subtitle">{subtitle}</p>
    )}
  </div>
);

export default LandingSectionHeader;
