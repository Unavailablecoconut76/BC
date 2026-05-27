import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MaterialIcon from '../components/MaterialIcon';
import LandingSectionHeader from '../components/LandingSectionHeader';
import './LoginSection.css';

const inputClass =
  'w-full bg-surface-container-lowest border border-outline-variant rounded-xl px-md py-sm font-body-md text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all';

const LoginSection = () => {
  const [activeTab, setActiveTab] = useState('login');
  const [userType, setUserType] = useState('buyer');
  const navigate = useNavigate();

  const handleInsides = () => {
    if (userType === 'buyer') navigate('/dashboardbuyer');
    else if (userType === 'seller') navigate('/dashboard');
    else if (userType === 'govt') navigate('/dashboardofficial');
  };

  const roles = [
    { id: 'buyer', label: 'Buyer', icon: 'person_search' },
    { id: 'seller', label: 'Seller', icon: 'home' },
    { id: 'govt', label: 'Official', icon: 'verified_user' },
  ];

  return (
    <section id="login" className="landing-section-anchor login-section">
      <div className="login-section__bg" />
      <div
        className="login-section__glow"
        aria-hidden
      />

      <div className="login-section__container">
        <div className="lg:flex-1 mb-xl lg:mb-0">
          <LandingSectionHeader
            label="Sign in"
            title="Enter the registry portal"
            subtitle="Pick Buyer, Seller, or Official — then continue to your dashboard."
            align="left"
          />
          <ul className="space-y-sm max-w-md">
            {[
              { icon: 'badge', text: 'Role-based dashboards' },
              { icon: 'timeline', text: 'Track land transfer stages' },
              { icon: 'lock', text: 'Wallet optional until transfer' },
            ].map((item) => (
              <li key={item.text} className="flex items-center gap-sm text-body-md text-on-surface-variant">
                <span className="w-9 h-9 rounded-lg bg-primary/8 flex items-center justify-center shrink-0">
                  <MaterialIcon name={item.icon} size={20} className="text-primary" />
                </span>
                {item.text}
              </li>
            ))}
          </ul>
        </div>

        <div className="login-section__panel-wrap">
          <div className="landing-card login-section__panel">
            <div className="h-1.5 bg-gradient-to-r from-secondary via-primary to-primary-container" />
            <div className="p-lg md:p-xl">
              <div className="flex rounded-xl bg-surface-container-low p-1 mb-lg">
                {['login', 'register'].map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 py-sm rounded-lg text-label-sm font-bold capitalize transition-all ${
                      activeTab === tab
                        ? 'bg-surface-container-lowest text-primary shadow-sm'
                        : 'text-on-surface-variant'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <p className="text-label-sm font-semibold text-on-surface mb-sm">I am a</p>
              <div className="grid grid-cols-3 gap-sm mb-lg">
                {roles.map((type) => (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => setUserType(type.id)}
                    className={`flex flex-col items-center gap-xs p-sm rounded-xl border-2 transition-all ${
                      userType === type.id
                        ? 'border-primary bg-gradient-to-b from-primary/8 to-transparent text-primary shadow-sm'
                        : 'border-outline-variant text-on-surface-variant hover:border-primary/30'
                    }`}
                  >
                    <MaterialIcon name={type.icon} size={26} />
                    <span className="text-label-sm font-semibold">{type.label}</span>
                  </button>
                ))}
              </div>

              <div className="space-y-md">
                {activeTab === 'register' && (
                  <div>
                    <label className="block text-label-sm font-semibold text-on-surface mb-xs">Full Name</label>
                    <input type="text" placeholder="Your full name" className={inputClass} />
                  </div>
                )}
                <div>
                  <label className="block text-label-sm font-semibold text-on-surface mb-xs">Email / User ID</label>
                  <input type="email" placeholder="you@email.com" className={inputClass} />
                </div>
                <div>
                  <label className="block text-label-sm font-semibold text-on-surface mb-xs">Password</label>
                  <input type="password" placeholder="••••••••" className={inputClass} />
                </div>
                {activeTab === 'register' && (
                  <>
                    <div>
                      <label className="block text-label-sm font-semibold text-on-surface mb-xs">Government ID</label>
                      <input type="text" placeholder="Aadhaar / PAN / Passport" className={inputClass} />
                    </div>
                    <div>
                      <label className="block text-label-sm font-semibold text-on-surface mb-xs">Phone</label>
                      <input type="tel" placeholder="+91 XXXXX XXXXX" className={inputClass} />
                    </div>
                  </>
                )}
              </div>

              <button
                type="button"
                onClick={handleInsides}
                className="w-full mt-lg bg-gradient-to-r from-primary to-primary-container text-on-primary py-sm rounded-xl text-label-sm font-bold hover:opacity-95 flex items-center justify-center gap-xs shadow-md"
              >
                {activeTab === 'login' ? 'Continue to portal' : 'Create account'}
                <MaterialIcon name="arrow_forward" size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginSection;
