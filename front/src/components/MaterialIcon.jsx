import React from 'react';

const MaterialIcon = ({ name, className = '', fill = false, size = 24 }) => {
  return (
    <span
      className={`material-symbols-outlined ${fill ? 'filled' : ''} ${className}`}
      style={{ fontSize: typeof size === 'number' ? `${size}px` : size }}
    >
      {name}
    </span>
  );
};

export default MaterialIcon;
