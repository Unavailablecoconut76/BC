import React from 'react';
import MaterialIcon from './MaterialIcon';

const WALLET = '0x71C...4E21';

const WalletPill = ({ className = '' }) => (
  <div
    className={`flex items-center gap-sm bg-surface-container-high px-md py-xs rounded-full border border-outline-variant shadow-sm ${className}`}
  >
    <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
    <span className="font-code-md text-code-md text-on-surface">{WALLET}</span>
    <MaterialIcon name="account_balance_wallet" className="text-primary" size={18} />
  </div>
);

export default WalletPill;
export { WALLET };
