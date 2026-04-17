import React, { useState } from 'react';
import { Users, TrendingUp, Shield, Lock, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LoginSection = () => {
  const [activeTab, setActiveTab] = useState('login');
  const [userType, setUserType] = useState('buyer');

  const navigate = useNavigate();
  const handleInsides = () => {
    if (userType === 'buyer') {
      navigate('/dashboardbuyer');
    } else if (userType === 'seller') {
      navigate('/dashboard');
    } else if (userType === 'govt') {
      navigate('/dashboardofficial');
    }
  }

  return (
    <section id="login" className="min-h-screen bg-slate-900 py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Enter <span className="text-emerald-400">Platform</span>
          </h2>
          <p className="text-xl text-slate-300">
            Secure access for buyers, sellers, and government authorities
          </p>
        </div>

        <div className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden">
          <div className="flex border-b border-slate-700">
            <button
              onClick={() => setActiveTab('login')}
              className={`flex-1 py-4 font-semibold transition-all ${
                activeTab === 'login'
                  ? 'bg-emerald-500/10 text-emerald-400 border-b-2 border-emerald-400'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setActiveTab('register')}
              className={`flex-1 py-4 font-semibold transition-all ${
                activeTab === 'register'
                  ? 'bg-emerald-500/10 text-emerald-400 border-b-2 border-emerald-400'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Register
            </button>
          </div>

          <div className="p-8">
            <div className="mb-6">
              <label className="block text-slate-300 mb-3 font-medium">I am a:</label>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { id: 'buyer', label: 'Buyer', icon: Users },
                  { id: 'seller', label: 'Seller', icon: TrendingUp },
                  { id: 'govt', label: 'Govt. Authority', icon: Shield }
                ].map(type => (
                  <button
                    key={type.id}
                    onClick={() => setUserType(type.id)}
                    className={`flex flex-col items-center space-y-2 p-4 rounded-lg border-2 transition-all ${
                      userType === type.id
                        ? 'border-emerald-400 bg-emerald-500/10 text-emerald-400'
                        : 'border-slate-700 text-slate-400 hover:border-slate-600'
                    }`}
                  >
                    <type.icon className="w-6 h-6" />
                    <span className="text-sm font-medium">{type.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              {activeTab === 'register' && (
                <div>
                  <label className="block text-slate-300 mb-2">Full Name</label>
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:border-emerald-400 focus:outline-none"
                  />
                </div>
              )}

              <div>
                <label className="block text-slate-300 mb-2">Email / User ID</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:border-emerald-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-2">Password</label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:border-emerald-400 focus:outline-none"
                />
              </div>

              {activeTab === 'register' && (
                <>
                  <div>
                    <label className="block text-slate-300 mb-2">Government ID Number</label>
                    <input
                      type="text"
                      placeholder="Aadhaar / PAN / Passport"
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:border-emerald-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      placeholder="+91 XXXXX XXXXX"
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:border-emerald-400 focus:outline-none"
                    />
                  </div>

                  <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <Lock className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-emerald-400 font-medium mb-1">Identity Verification Required</p>
                        <p className="text-slate-300 text-sm">After registration, you will need to complete KYC verification using your government credentials.</p>
                      </div>
                    </div>
                  </div>
                </>
              )}

              <button onClick={handleInsides} className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-3 rounded-lg font-semibold transition-all flex items-center justify-center space-x-2">
                <span>{activeTab === 'login' ? 'Login' : 'Register'}</span>
                <ChevronDown className="w-5 h-5 rotate-[-90deg]" />
              </button>
            </div>
            {activeTab === 'login' && (
              <div className="mt-4 text-center">
                <a href="#" className="text-emerald-400 hover:text-emerald-300 text-sm">
                  Forgot password?
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginSection;
