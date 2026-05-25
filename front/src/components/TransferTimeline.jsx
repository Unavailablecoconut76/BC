import React from 'react';

const TransferTimeline = ({ steps, variant = 'vertical' }) => {
  if (variant === 'horizontal') {
    return (
      <div className="flex flex-wrap items-center gap-sm">
        {steps.map((step, idx) => (
          <React.Fragment key={idx}>
            <div className="flex items-center gap-xs">
              <div
                className={`w-3 h-3 rounded-full ${
                  step.completed ? 'bg-primary ring-4 ring-primary/20' : step.active ? 'border-2 border-secondary bg-surface-container pulsing-emerald' : 'bg-outline-variant'
                }`}
              />
              <span
                className={`font-label-md text-label-md ${
                  step.completed ? 'text-primary' : step.active ? 'text-secondary' : 'text-on-surface-variant opacity-40'
                }`}
              >
                {step.label}
              </span>
            </div>
            {idx < steps.length - 1 && (
              <div className={`w-4 h-0.5 ${step.completed ? 'bg-primary' : 'bg-outline-variant'}`} />
            )}
          </React.Fragment>
        ))}
      </div>
    );
  }

  return (
    <div className="bg-surface-container rounded-xl p-lg border border-outline-variant space-y-lg relative">
      <div className="absolute left-[31px] top-[48px] bottom-[48px] w-[2px] bg-outline-variant" />
      {steps.map((step, idx) => (
        <div key={idx} className={`flex gap-md relative ${step.pending ? 'opacity-40' : ''}`}>
          <div
            className={`z-10 w-4 h-4 rounded-full mt-1.5 ml-2.5 ${
              step.completed
                ? 'bg-primary ring-4 ring-primary/20'
                : step.active
                ? 'border-2 border-secondary bg-surface-container pulsing-emerald'
                : 'bg-outline-variant'
            }`}
          />
          <div>
            <h4 className={`font-label-md text-label-md ${step.active ? 'text-secondary' : 'text-on-surface'}`}>
              {step.label}
            </h4>
            {step.description && (
              <p className="font-body-sm text-body-sm text-on-surface-variant">{step.description}</p>
            )}
            {step.tx && (
              <p className="font-code-md text-[10px] text-primary mt-xs">TX: {step.tx}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TransferTimeline;
