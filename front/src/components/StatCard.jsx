import React from 'react';
import MaterialIcon from './MaterialIcon';

const StatCard = ({ icon, label, value, iconBg = 'bg-secondary/10', iconColor = 'text-secondary' }) => (
  <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg shadow-card">
    <div className="flex justify-between items-start mb-md">
      <div>
        <p className="text-label-sm text-on-surface-variant uppercase tracking-wider">{label}</p>
        <p className="font-headline-lg text-on-surface font-bold mt-sm">{value}</p>
      </div>
      <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${iconBg}`}>
        <MaterialIcon name={icon} className={iconColor} size={24} />
      </div>
    </div>
  </div>
);

export default StatCard;
