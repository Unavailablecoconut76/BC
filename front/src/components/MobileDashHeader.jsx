import React from 'react';
import WalletPill from './WalletPill';

const MobileDashHeader = ({ title, subtitle = 'Portal' }) => (
  <header className="md:hidden fixed top-0 left-0 w-full z-40 bg-surface/80 backdrop-blur-md flex justify-between items-center px-lg py-md border-b border-outline-variant">
    <div className="flex flex-col">
      <h1 className="font-headline-sm text-headline-sm font-bold text-on-surface">{title}</h1>
      <p className="font-label-md text-label-md text-on-surface-variant">{subtitle}</p>
    </div>
    <WalletPill />
  </header>
);

export default MobileDashHeader;
