import React from 'react';
import MaterialIcon from './MaterialIcon';

const STEPS = [
  {
    n: 1,
    title: 'Choose your role',
    desc: 'On the home page, pick Buyer, Seller, or Official and open the portal.',
  },
  {
    n: 2,
    title: 'Connect wallet',
    desc: 'Use MetaMask when you try a transfer or offer. You can browse most screens without it.',
  },
  {
    n: 3,
    title: 'Complete Land Status',
    desc: 'Fill each stage under Land Status and upload sample documents. Officials approve in the Official portal.',
  },
];

const HelpPanel = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-[#1a1a2e]/40 z-[60]" onClick={onClose} aria-hidden />
      <div className="fixed inset-0 z-[61] flex items-center justify-center p-sm pointer-events-none">
        <div
          className="bg-surface-container-lowest border border-outline-variant rounded-xl max-w-md w-full shadow-card p-lg pointer-events-auto max-h-[90vh] overflow-y-auto"
          role="dialog"
          aria-labelledby="help-title"
        >
          <div className="flex justify-between items-start mb-md">
            <h2 id="help-title" className="font-headline-md text-primary">
              How to use GoLand
            </h2>
            <button
              type="button"
              onClick={onClose}
              className="p-1 rounded-lg text-on-surface-variant hover:bg-surface-container-low focus-visible:ring-2 focus-visible:ring-primary/20"
              aria-label="Close help"
            >
              <MaterialIcon name="close" size={22} />
            </button>
          </div>
          <ol className="space-y-md">
            {STEPS.map((step) => (
              <li key={step.n} className="flex gap-sm">
                <span className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center text-label-sm font-bold shrink-0">
                  {step.n}
                </span>
                <div>
                  <p className="font-body-md text-on-surface font-semibold">{step.title}</p>
                  <p className="text-body-sm text-on-surface-variant mt-xs">{step.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </>
  );
};

export default HelpPanel;
