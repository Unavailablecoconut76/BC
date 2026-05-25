import React from 'react';
import MaterialIcon from './MaterialIcon';

const HeroVisual = () => (
  <div className="relative hidden lg:flex items-center justify-center min-h-[440px]" aria-hidden>
    <div className="absolute -right-8 top-1/2 -translate-y-1/2 w-[340px] h-[340px] rounded-full bg-secondary/10 blur-3xl" />
    <div className="absolute left-0 top-8 w-[200px] h-[200px] rounded-full bg-primary/8 blur-3xl" />

    <div className="relative w-full max-w-[420px] rounded-2xl border border-outline-variant bg-surface-container-lowest shadow-[0_28px_56px_-16px_rgba(0,36,82,0.18)] overflow-hidden">
      <div className="landing-grid-pattern absolute inset-0 opacity-60" />
      <div className="relative border-b border-outline-variant bg-gradient-to-r from-primary to-primary-container px-md py-sm flex items-center justify-between">
        <span className="text-label-sm font-semibold text-on-primary-container tracking-wide">
          Parcel overview
        </span>
        <span className="flex items-center gap-1 text-[11px] text-on-primary-container/90">
          <span className="w-2 h-2 rounded-full bg-[#68b484] animate-pulse" />
          Synced
        </span>
      </div>

      <div className="relative p-md space-y-sm">
        <div className="rounded-xl border border-primary/15 bg-gradient-to-br from-primary/[0.06] to-transparent p-md">
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
                className="rounded-lg bg-surface-container-lowest/90 border border-outline-variant/80 px-xs py-sm text-center"
              >
                <MaterialIcon name={item.icon} size={18} className="text-secondary mx-auto mb-0.5" />
                <p className="text-[10px] text-on-surface-variant leading-tight">{item.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-sm">
          <div className="rounded-lg border border-outline-variant bg-surface-container-low p-sm">
            <MaterialIcon name="description" size={20} className="text-primary mb-1" />
            <p className="text-[11px] font-semibold text-on-surface">Stage 3 of 6</p>
            <div className="mt-2 h-1.5 rounded-full bg-surface-container overflow-hidden">
              <div className="h-full w-1/2 rounded-full bg-gradient-to-r from-secondary to-primary" />
            </div>
          </div>
          <div className="rounded-lg border border-outline-variant bg-surface-container-low p-sm">
            <MaterialIcon name="verified_user" size={20} className="text-primary mb-1" />
            <p className="text-[11px] font-semibold text-on-surface">Official review</p>
            <p className="text-[10px] text-on-surface-variant mt-1">Pending approval</p>
          </div>
        </div>

        <div className="flex items-center gap-sm rounded-lg border border-dashed border-secondary/40 bg-secondary/[0.04] px-sm py-xs">
          <MaterialIcon name="fingerprint" size={18} className="text-secondary shrink-0" />
          <p className="font-code-md text-[10px] text-on-surface-variant truncate">
            a3f5c8e2…verified on ledger
          </p>
        </div>
      </div>
    </div>

    <div className="absolute -left-4 bottom-16 bg-surface-container-lowest border border-outline-variant rounded-xl px-sm py-xs shadow-card flex items-center gap-xs">
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
