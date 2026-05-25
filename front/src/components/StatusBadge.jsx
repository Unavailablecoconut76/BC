import React from 'react';
import MaterialIcon from './MaterialIcon';

const StatusBadge = ({ status, label }) => {
  const config = {
    success: { bg: 'bg-primary/20', text: 'text-primary', icon: 'check_circle' },
    warning: { bg: 'bg-secondary/20', text: 'text-secondary', icon: 'schedule' },
    error: { bg: 'bg-error/20', text: 'text-error', icon: 'cancel' },
    info: { bg: 'bg-tertiary-container/20', text: 'text-tertiary-container', icon: 'info' },
    pending: { bg: 'bg-secondary/20', text: 'text-secondary', icon: 'pending' },
  };
  const c = config[status] || config.info;

  return (
    <span className={`inline-flex items-center gap-1 px-md py-xs rounded-full ${c.bg} ${c.text} font-label-md text-label-md uppercase`}>
      <MaterialIcon name={c.icon} size={12} />
      {label}
    </span>
  );
};

export default StatusBadge;
