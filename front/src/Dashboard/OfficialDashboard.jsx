import React, { useMemo, useState, useEffect } from 'react';
import { ethers } from 'ethers';
import {
  Wallet,
  Home,
  Clock,
  Shield,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  X,
  ArrowRight,
  ArrowLeft,
  Trophy,
  Layers,
  FolderOpen,
  Bolt,
  Copy,
  Menu,
} from 'lucide-react';
import Progress from './Progress';

const DUMMY_OFFICIAL_ACTIVITIES = [
  {
    id: 1,
    propertyLocation: 'Pune, Maharashtra',
    surveyNo: 'PUNE-2024-001',
    offerAmount: '24 ETH',
    timestamp: '2024-02-02 14:30:00',
    status: 'pending',
    buyer: '0x742d35Cc6634C0532925a3b844Bc622e4A8a4C0f',
    seller: '0xDEF1234567890ABC1234567890ABC1234567890',
  },
  {
    id: 2,
    propertyLocation: 'Mumbai, Maharashtra',
    surveyNo: 'MUMBAI-2024-002',
    offerAmount: '33 ETH',
    timestamp: '2024-02-01 10:15:00',
    status: 'accepted',
    buyer: '0x8ba1f109551bD432803012645Ac136ddd64DBA72',
    seller: '0xaBc1234567890DEF1234567890DEF1234567890',
  },
  {
    id: 3,
    propertyLocation: 'Bangalore, Karnataka',
    surveyNo: 'BANGALORE-2024-003',
    offerAmount: '42 ETH',
    timestamp: '2024-01-31 09:45:00',
    status: 'rejected',
    buyer: '0x1234567890ABCDEF1234567890ABCDEF12345678',
    seller: '0xDEF1234567890ABC1234567890ABC1234567890',
  },
];

const OfficialHeader = ({ activeSection, setActiveSection, account, connectWallet, copyAddress, copied, balance }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const sections = [
    { id: 'overview', label: 'Overview', icon: Home },
    { id: 'pending', label: 'Pending Activities', icon: Clock },
    { id: 'land-status', label: 'Land Status', icon: TrendingUp },
  ];

  const truncateAddress = (address) => (address ? `${address.slice(0, 6)}...${address.slice(-4)}` : 'Not Connected');

  return (
    <header className="sticky top-0 w-full bg-slate-900 border-b border-slate-800 z-40 shadow-lg shadow-black/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center space-x-3">
            <div className="bg-emerald-500/10 p-2 rounded-lg border border-emerald-500/20">
              <Shield className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white tracking-tight">Go<span className="text-emerald-400">Land</span></h1>
              <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Official Portal</p>
            </div>
          </div>

          <nav className="hidden md:flex space-x-1 bg-slate-800/50 p-1 rounded-xl border border-slate-700/50">
            {sections.map((section) => {
              const Icon = section.icon;
              const isActive = activeSection === section.id;
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`flex items-center space-x-2 px-4 py-2.5 rounded-lg transition-all duration-200 text-sm font-medium ${
                    isActive
                      ? 'bg-slate-700 text-emerald-400 shadow-sm'
                      : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-400' : 'text-slate-500'}`} />
                  <span>{section.label}</span>
                </button>
              );
            })}
          </nav>

          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex items-center space-x-3 bg-slate-950 px-4 py-2 rounded-full border border-slate-800">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              {account ? (
                <>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-mono text-slate-300 tracking-wide">{truncateAddress(account)}</span>
                    <button onClick={copyAddress} className="text-slate-400 hover:text-emerald-400 p-1 rounded-md">
                      <Copy className="w-4 h-4" />
                    </button>
                    {copied && <span className="text-xs text-emerald-400">Copied</span>}
                  </div>
                  <div className="text-xs text-slate-400 font-mono">{balance ? `${balance} ETH` : ''}</div>
                </>
              ) : (
                <button onClick={connectWallet} className="text-xs font-mono text-emerald-400 bg-slate-800 px-3 py-1 rounded-md">
                  Connect Wallet
                </button>
              )}
            </div>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-slate-300 hover:text-emerald-400 hover:bg-slate-800 rounded-lg transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-slate-800 py-4 space-y-2 animate-in slide-in-from-top-5 duration-200">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => {
                    setActiveSection(section.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                    activeSection === section.id
                      ? 'bg-emerald-500/10 text-emerald-400 border-l-4 border-emerald-500'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{section.label}</span>
                </button>
              );
            })}
            <div className="mt-4 px-4 pt-4 border-t border-slate-800">
              <div className="flex items-center space-x-2 text-slate-400 bg-slate-900 p-3 rounded-lg">
                <Wallet className="w-4 h-4" />
                {account ? (
                  <>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-mono">{truncateAddress(account)}</span>
                      <button onClick={copyAddress} className="text-slate-400 hover:text-emerald-400 p-1 rounded-md">
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                    <span className="text-xs font-bold text-emerald-500 ml-2">{balance ? `${parseFloat(balance).toFixed(4)} ETH` : '0.00 ETH'}</span>
                  </>
                ) : (
                  <button onClick={connectWallet} className="text-xs font-mono text-emerald-400 bg-slate-800 px-3 py-1 rounded-md">
                    Connect Wallet
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

const getStatusBadge = (status) => {
  const base = 'inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wide';
  if (status === 'pending') {
    return <span className={`${base} bg-yellow-500/10 text-yellow-300 border border-yellow-500/20`}><Clock className="w-3 h-3" /> Pending</span>;
  }
  if (status === 'accepted') {
    return <span className={`${base} bg-emerald-500/10 text-emerald-300 border border-emerald-500/20`}><CheckCircle className="w-3 h-3" /> Accepted</span>;
  }
  return <span className={`${base} bg-red-500/10 text-red-300 border border-red-500/20`}><AlertCircle className="w-3 h-3" /> Rejected</span>;
};

const OverviewSection = ({ totals }) => {
  return (
    <section className=" bg-slate-500">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-800 border border-slate-700 rounded-3xl p-6 shadow-lg shadow-black/10">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-slate-400 uppercase tracking-[0.2em]">Pending Approvals</p>
              <p className="text-3xl font-bold text-white mt-3">{totals.pending}</p>
            </div>
            <div className="bg-yellow-500/10 text-yellow-300 rounded-2xl p-3">
              <Clock className=" w-5 h-5" />
            </div>
          </div>
          <p className="text-white text-sm text-slate-500">Actions waiting for official review</p>
        </div>

        <div className="bg-slate-800 border border-slate-700 rounded-3xl p-6 shadow-lg shadow-black/10">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-slate-400 uppercase tracking-[0.2em]">Approved Parcels</p>
              <p className="text-3xl font-bold text-white mt-3">{totals.accepted}</p>
            </div>
            <div className="bg-emerald-500/10 text-emerald-300 rounded-2xl p-3">
              <CheckCircle className="w-5 h-5" />
            </div>
          </div>
          <p className="text-white text-sm text-slate-500">Land parcels approved by the official</p>
        </div>

        <div className="bg-slate-800 border border-slate-700 rounded-3xl p-6 shadow-lg shadow-black/10">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-slate-400 uppercase tracking-[0.2em]">Rejected Requests</p>
              <p className="text-3xl font-bold text-white mt-3">{totals.rejected}</p>
            </div>
            <div className="bg-red-500/10 text-red-300 rounded-2xl p-3">
              <AlertCircle className="w-5 h-5" />
            </div>
          </div>
          <p className="text-white text-sm text-slate-500">Requests declined by the official</p>
        </div>
      </div>

      <div className="bg-slate-800 border border-slate-700 rounded-3xl p-6 shadow-lg shadow-black/10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-slate-400 uppercase text-xs tracking-[0.25em]">Recent activity summary</p>
            <h2 className="text-2xl font-bold text-white mt-3">Government approval dashboard</h2>
          </div>
          <div className="flex items-center gap-3 text-slate-400 text-sm">
            <Bolt className="w-4 h-4 text-emerald-400" />
            <span>Fast-track Pune parcel review for demo flow</span>
          </div>
        </div>
      </div>
    </section>
  );
};

const PendingActivitiesSection = ({ activities, onReview, onApprove, onReject, onInitiate }) => {
  return (
    <section className="bg-slate-900 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white">Pending Activities</h2>
          <p className="text-white text-slate-400">Review incoming requests and approve or reject them.</p>
        </div>
      </div>

      <div className="grid gap-6">
        {activities.map((activity) => (
          <div key={activity.id} className="bg-slate-800 border border-slate-700 rounded-3xl p-6 shadow-lg shadow-black/10">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 items-start">
              <div className="lg:col-span-2">
                <p className="text-slate-400 uppercase text-xs tracking-[0.25em] mb-2">Parcel</p>
                <p className="text-white font-semibold text-lg">{activity.propertyLocation}</p>
                <p className="text-white text-slate-500 text-sm mt-1">Survey ID: {activity.surveyNo}</p>
                <p className="text-white text-slate-500 text-sm mt-2">Buyer: {activity.buyer}</p>
              </div>

              <div>
                <p className="text-gray text-slate-400 uppercase text-xs tracking-[0.25em] mb-2">Offer</p>
                <p className="text-white text-emerald-300 text-lg font-semibold">{activity.offerAmount}</p>
                <p className="text-white text-slate-500 text-sm mt-2">Received: {activity.timestamp}</p>
              </div>

              <div className='bg-sky-500'>
                <p className="text-gray text-slate-400 uppercase text-xs tracking-[0.25em] mb-2">Status</p>
                {getStatusBadge(activity.status)}
              </div>

              <div className="lg:col-span-2 flex flex-col gap-3">
                <button
                  onClick={() => onReview(activity)}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 border border-slate-700 px-5 py-3 text-sm font-semibold text-white hover:border-emerald-500/30 hover:text-emerald-400 transition-all"
                >
                  <FolderOpen className="w-4 h-4" />
                  Review Land Status
                </button>

                {activity.status === 'pending' ? (
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => onApprove(activity)}
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-slate-950 hover:bg-emerald-400 transition-all"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Initiate Transfer
                    </button>
                    <button
                      onClick={() => onReject(activity)}
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-500 px-5 py-3 text-sm font-semibold text-white hover:bg-red-400 transition-all"
                    >
                      <AlertCircle className="w-4 h-4" />
                      Reject
                    </button>
                  </div>
                ) : activity.status === 'accepted' ? (
                  <button
                    onClick={() => onInitiate(activity)}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-sky-500 px-5 py-3 text-sm font-semibold text-slate-950 hover:bg-sky-400 transition-all"
                  >
                    <ArrowRight className="w-4 h-4" />
                    Finalize & Claim Ownership
                  </button>
                ) : (
                  <div className="text-sm text-slate-400">No actions available for rejected requests.</div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const TransferCompleteScreen = ({ onExit }) => (
  <div className="min-h-[60vh] flex items-center justify-center">
    <div className="bg-slate-900 border border-sky-500/30 rounded-3xl p-10 shadow-2xl shadow-sky-500/10 max-w-xl w-full text-center">
      <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-sky-500/10 text-sky-400">
        <CheckCircle className="h-12 w-12" />
      </div>
      <h1 className="text-4xl font-bold text-white mb-4">transfer process complete!</h1>
      <p className="text-slate-400 mb-8">
        The transfer has been approved and the Pune parcel status is now accepted. Click Exit to return to the dashboard.
      </p>
      <button
        onClick={onExit}
        className="inline-flex items-center gap-2 rounded-full bg-sky-500 px-8 py-3 text-sm font-semibold text-slate-950 hover:bg-sky-400 transition-all"
      >
        <ArrowLeft className="w-4 h-4" />
        Exit to Dashboard
      </button>
    </div>
  </div>
);

const OfficialDashboard = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const [activities, setActivities] = useState(DUMMY_OFFICIAL_ACTIVITIES);
  const [showTransferComplete, setShowTransferComplete] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(null);
  const [copied, setCopied] = useState(false);

  const totals = useMemo(() => ({
    pending: activities.filter((item) => item.status === 'pending').length,
    accepted: activities.filter((item) => item.status === 'accepted').length,
    rejected: activities.filter((item) => item.status === 'rejected').length,
  }), [activities]);

  useEffect(() => {
    if (!window.ethereum) return;
    const handleAccountsChanged = async (accounts) => {
      if (!accounts || accounts.length === 0) {
        setAccount(null);
        setBalance(null);
      } else {
        setAccount(accounts[0]);
        try {
          const bal = await window.ethereum.request({ method: 'eth_getBalance', params: [accounts[0], 'latest'] });
          setBalance(ethers.formatEther(bal));
        } catch (e) {
          console.error('Failed to fetch balance after account change', e);
        }
      }
    };
    window.ethereum.on('accountsChanged', handleAccountsChanged);
    return () => {
      try {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      } catch (e) {
        // ignore
      }
    };
  }, []);

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert('MetaMask not detected. Please install MetaMask and try again.');
      return;
    }
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      if (accounts && accounts.length > 0) {
        setAccount(accounts[0]);
        const bal = await window.ethereum.request({ method: 'eth_getBalance', params: [accounts[0], 'latest'] });
        setBalance(ethers.formatEther(bal));
      }
    } catch (err) {
      console.error('Wallet connection failed', err);
    }
  };

  const copyAddress = async () => {
    if (!account) return;
    try {
      await navigator.clipboard.writeText(account);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy address', err);
    }
  };

  const handleReview = (activity) => {
    setSelectedActivity(activity);
    setActiveSection('land-status');
  };

  const handleApprove = (activity) => {
    setActivities((prev) => prev.map((item) => item.id === activity.id ? { ...item, status: 'accepted' } : item));
    setShowTransferComplete(true);
    setSelectedActivity(activity);
  };

  const handleReject = (activity) => {
    setActivities((prev) => prev.map((item) => item.id === activity.id ? { ...item, status: 'rejected' } : item));
  };

  const handleFinalize = async (activity) => {
    if (window.ethereum && account) {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const tx = await signer.sendTransaction({
          to: activity.buyer,
          value: ethers.parseEther('0.0005'),
        });
        await tx.wait();
      } catch (err) {
        console.error('Crypto transfer simulation failed', err);
      }
    }
    setShowTransferComplete(true);
    setSelectedActivity(activity);
  };

  const handleExitComplete = () => {
    setShowTransferComplete(false);
    setActiveSection('overview');
    setSelectedActivity(null);
  };

  return (
    <div className="min-h-screen bg-[#0b1220] text-[#a8b3cf]">
      <OfficialHeader
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        account={account}
        connectWallet={connectWallet}
        copyAddress={copyAddress}
        copied={copied}
        balance={balance}
      />

      <main className="py-12 space-y-10 px-4 sm:px-6 lg:px-8">
        {showTransferComplete ? (
          <TransferCompleteScreen onExit={handleExitComplete} />
        ) : (
          <>
            {activeSection === 'overview' && <OverviewSection totals={totals} />}
            {activeSection === 'pending' && (
              <PendingActivitiesSection
                activities={activities}
                onReview={handleReview}
                onApprove={handleApprove}
                onReject={handleReject}
                onInitiate={handleFinalize}
              />
            )}
            {activeSection === 'land-status' && <Progress />}
          </>
        )}
      </main>
    </div>
  );
};

export default OfficialDashboard;
