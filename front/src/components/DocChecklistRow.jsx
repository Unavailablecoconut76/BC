import React from 'react';
import MaterialIcon from './MaterialIcon';

const DocChecklistRow = ({ name, status }) => {
  const statusConfig = {
    verified: { label: 'Verified', className: 'text-primary', icon: 'check_circle', fill: true },
    verifying: { label: 'Verifying', className: 'text-secondary', icon: 'schedule', fill: false },
    missing: { label: 'Missing', className: 'text-error', icon: 'error', fill: true },
    not_started: { label: 'Not started', className: 'text-on-surface-variant', icon: 'radio_button_unchecked', fill: false },
    pending: { label: 'Pending', className: 'text-secondary', icon: 'schedule', fill: false },
  };
  const s = statusConfig[status] || statusConfig.not_started;

  return (
    <div className="flex items-center justify-between bg-surface-container-low rounded-lg px-md py-sm gap-sm">
      <span className="font-body-sm text-body-sm text-on-surface">{name}</span>
      <span className={`flex items-center gap-xs font-label-md text-label-md ${s.className}`}>
        <MaterialIcon name={s.icon} size={16} fill={s.fill} />
        {s.label}
      </span>
    </div>
  );
};

export default DocChecklistRow;
