import React from 'react';
import MaterialIcon from './MaterialIcon';

const BottomNav = ({ navItems, activeTab, onTabChange, onLogout }) => (
  <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-surface-container-lowest border-t border-outline-variant flex justify-around py-sm z-50">
    {navItems.slice(0, 5).map((item) => (
      <button
        key={item.id}
        onClick={() => onTabChange(item.id)}
        className={`relative flex flex-col items-center p-sm rounded-lg ${
          activeTab === item.id ? 'text-primary' : 'text-on-surface-variant'
        }`}
      >
        <MaterialIcon name={item.icon} size={22} />
        {item.badge && (
          <span className="absolute -top-1 -right-1 bg-error text-on-error text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
            {item.badge}
          </span>
        )}
      </button>
    ))}
    <button
      onClick={onLogout}
      className="flex flex-col items-center p-sm rounded-lg text-error"
    >
      <MaterialIcon name="logout" size={22} />
    </button>
  </nav>
);

export default BottomNav;
