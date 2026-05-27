import React from 'react';
import MaterialIcon from './MaterialIcon';
import './HeroVisual.css';

const HeroVisual = () => (
  <div className="hero-visual" aria-hidden>
    <div className="hero-visual__orb hero-visual__orb--right" />
    <div className="hero-visual__orb hero-visual__orb--left" />

    <div className="hero-visual__card">
      <div className="landing-grid-pattern hero-visual__grid" />
      <div className="hero-visual__topbar">
        <span className="text-label-sm font-semibold text-on-primary-container tracking-wide">
          Parcel overview
        </span>
        <span className="flex items-center gap-1 text-[11px] text-on-primary-container/90">
          <span className="w-2 h-2 rounded-full bg-[#68b484] animate-pulse" />
          Synced
        </span>
      </div>

      <div className="hero-visual__body">
        <div className="hero-visual__parcel-card">
          <div className="flex items-start justify-between gap-sm mb-md">
            <div>
              <p className="text-[11px] uppercase tracking-wider text-on-surface-variant font-semibold">
                Survey No
              </p>
              <p className="font-code-md text-primary font-semibold mt-0.5">PUNE-2024-001</p>
            </div>
            <span className="shrink-0 px-xs py-[2px] rounded-full bg-[#e8f5e9] text-[#2D7A4F] text-[11px] font-bold">
              Clean
            </span>
          </div>
          <div className="grid grid-cols-3 gap-xs">
            {[
              { icon: 'location_on', label: 'Pune, MH' },
              { icon: 'square_foot', label: '1,200 sq.ft' },
              { icon: 'payments', label: '25 ETH' },
            ].map((item) => (
              <div
                key={item.label}
                className="hero-visual__metric"
              >
                <MaterialIcon name={item.icon} size={18} className="text-secondary mx-auto mb-0.5" />
                <p className="text-[10px] text-on-surface-variant leading-tight">{item.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="hero-visual__status-grid">
          <div className="hero-visual__status-card">
            <MaterialIcon name="description" size={20} className="text-primary mb-1" />
            <p className="text-[11px] font-semibold text-on-surface">Stage 3 of 6</p>
            <div className="mt-2 h-1.5 rounded-full bg-surface-container overflow-hidden">
              <div className="h-full w-1/2 rounded-full bg-gradient-to-r from-secondary to-primary" />
            </div>
          </div>
          <div className="hero-visual__status-card">
            <MaterialIcon name="verified_user" size={20} className="text-primary mb-1" />
            <p className="text-[11px] font-semibold text-on-surface">Official review</p>
            <p className="text-[10px] text-on-surface-variant mt-1">Pending approval</p>
          </div>
        </div>

        <div className="hero-visual__fingerprint">
          <MaterialIcon name="fingerprint" size={18} className="text-secondary shrink-0" />
          <p className="font-code-md text-[10px] text-on-surface-variant truncate">
            a3f5c8e2…verified on ledger
          </p>
        </div>
      </div>
    </div>

    <div className="hero-visual__floating">
      <div className="w-8 h-8 rounded-full bg-secondary/15 flex items-center justify-center">
        <MaterialIcon name="trending_up" size={18} className="text-secondary" />
      </div>
      <div>
        <p className="text-[10px] text-on-surface-variant">Transfers tracked</p>
        <p className="text-sm font-bold text-primary">6 stages</p>
      </div>
    </div>
  </div>
);

export default HeroVisual;
