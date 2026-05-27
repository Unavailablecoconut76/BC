import React, { useMemo, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { ethers } from 'ethers';
import Progress from './Progress';
import DashboardShell from '../components/DashboardShell';
import StatCard from '../components/StatCard';
import MaterialIcon from '../components/MaterialIcon';
import { formatDemoValue } from '../utils/demoLabels';
import './DashboardPages.css';

const DEMO_DOC_HASH = 'a3f5c8e2b91d0476f8e3c2a1b9d4e7f0c6a8b2d5e9f1a4c7b3d6e8f0a2c5b8d1';

const DUMMY_OFFICIAL_ACTIVITIES = [
  {
    id: 1,
    propertyLocation: 'Pune, Maharashtra',
    surveyNo: 'PUNE-2024-001',
    buyer: '0x742d35Cc6634C0532925a3b844Bc622e4A8a4C0f',
    offerAmount: '24 ETH',
    timestamp: '2024-02-02 14:30:00',
    status: 'pending',
  },
  {
    id: 2,
    propertyLocation: 'Mumbai, Maharashtra',
    surveyNo: 'MUMBAI-2024-002',
    buyer: '0x8ba1f109551bD432803012645Ac136ddd64DBA72',
    offerAmount: '33 ETH',
    timestamp: '2024-02-01 10:15:00',
    status: 'accepted',
  },
  {
    id: 3,
    propertyLocation: 'Bangalore, Karnataka',
    surveyNo: 'BANGALORE-2024-003',
    buyer: '0xaBc1234567890DEF1234567890DEF1234567890',
    offerAmount: '42 ETH',
    timestamp: '2024-01-31 09:45:00',
    status: 'rejected',
  },
];

const getStatusBadge = (status) => {
  if (status === 'pending')
    return (
      <span className="inline-flex items-center gap-xs bg-secondary/10 text-secondary px-xs py-[2px] rounded-full text-label-sm">
        <MaterialIcon name="schedule" size={14} /> Pending
      </span>
    );
  if (status === 'accepted')
    return (
      <span className="inline-flex items-center gap-xs bg-[#e8f5e9] text-[#2D7A4F] px-xs py-[2px] rounded-full text-label-sm">
        <MaterialIcon name="check_circle" fill size={14} /> Accepted
      </span>
    );
  return (
    <span className="inline-flex items-center gap-xs bg-error-container text-error px-xs py-[2px] rounded-full text-label-sm">
      <MaterialIcon name="cancel" fill size={14} /> Rejected
    </span>
  );
};

const OverviewSection = ({ totals }) => (
  <section className="dashboard-section space-y-lg">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-md">
      <StatCard icon="schedule" label="Pending Approvals" value={totals.pending} iconBg="bg-secondary/10" iconColor="text-secondary" />
      <StatCard icon="check_circle" label="Approved Parcels" value={totals.accepted} iconBg="bg-[#e8f5e9]" iconColor="text-[#2D7A4F]" />
      <StatCard icon="cancel" label="Rejected Requests" value={totals.rejected} iconBg="bg-error-container" iconColor="text-error" />
    </div>
    <div className="dashboard-card p-lg flex flex-col sm:flex-row justify-between items-start sm:items-center gap-md">
      <div>
        <p className="text-label-sm text-on-surface-variant uppercase tracking-wider">Recent activity summary</p>
        <h2 className="font-headline-md text-on-surface mt-xs">Government approval dashboard</h2>
      </div>
      <div className="flex items-center gap-sm">
        <MaterialIcon name="bolt" className="text-success" size={20} />
        <span className="text-label-sm text-on-surface-variant">Review pending parcels from your queue</span>
      </div>
    </div>
  </section>
);

const PendingActivitiesSection = ({ activities, onReview, onApprove, onReject, onInitiate }) => (
  <section className="dashboard-section space-y-lg">
    <div>
      <h2 className="font-headline-lg text-primary">Pending Activities</h2>
      <p className="font-body-md text-on-surface-variant">Review incoming requests and approve or reject them.</p>
    </div>
    <div className="grid gap-md">
      {activities.map((activity) => (
        <div key={activity.id} className="dashboard-card p-lg">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-md items-start">
            <div className="lg:col-span-2">
              <p className="text-label-sm text-on-surface-variant uppercase tracking-wider mb-xs">Parcel</p>
              <p className="font-body-md text-on-surface font-semibold">{activity.propertyLocation}</p>
              <p className="font-code-md text-label-sm text-on-surface-variant mt-xs">Survey: {activity.surveyNo}</p>
              <p className="font-code-md text-label-sm text-on-surface-variant mt-xs break-all">Buyer: {activity.buyer}</p>
            </div>
            <div>
              <p className="text-label-sm text-on-surface-variant uppercase tracking-wider mb-xs">Offer</p>
              <p className="text-on-tertiary-container font-headline-md font-bold">{formatDemoValue(activity.offerAmount)}</p>
              <p className="font-code-md text-label-sm text-on-surface-variant mt-xs">{activity.timestamp}</p>
            </div>
            <div>
              <p className="text-label-sm text-on-surface-variant uppercase tracking-wider mb-xs">Status</p>
              {getStatusBadge(activity.status)}
            </div>
            <div className="flex flex-col gap-sm">
              <button
                type="button"
                onClick={() => onReview(activity)}
                className="w-full border border-outline-variant text-on-surface-variant rounded-xl py-sm text-label-sm font-bold flex items-center justify-center gap-xs hover:border-primary-container hover:text-primary"
              >
                <MaterialIcon name="folder_open" size={18} />
                Review Land Status
              </button>
              {activity.status === 'pending' ? (
                <div className="grid grid-cols-2 gap-sm">
                  <button
                    type="button"
                    onClick={() => onApprove(activity)}
                    className="bg-[#e8f5e9] text-[#2D7A4F] rounded-xl py-sm text-label-sm font-bold flex items-center justify-center gap-xs hover:opacity-90"
                  >
                    <MaterialIcon name="check_circle" fill size={16} />
                    Initiate Transfer
                  </button>
                  <button
                    type="button"
                    onClick={() => onReject(activity)}
                    className="bg-error-container text-error rounded-xl py-sm text-label-sm font-bold flex items-center justify-center gap-xs hover:opacity-90"
                  >
                    <MaterialIcon name="cancel" size={16} />
                    Reject
                  </button>
                </div>
              ) : activity.status === 'accepted' ? (
                <button
                  type="button"
                  onClick={() => onInitiate(activity)}
                  className="w-full bg-primary text-on-primary rounded-xl py-sm text-label-sm font-bold flex items-center justify-center gap-xs hover:opacity-90"
                >
                  <MaterialIcon name="arrow_forward" size={16} />
                  Finalize & Claim Ownership
                </button>
              ) : (
                <p className="text-body-sm text-on-surface-variant italic">No actions available.</p>
              )}
            </div>
          </div>
          {(activity.status === 'accepted' || activity.status === 'pending') && (
            <div className="mt-md pt-md border-t border-outline-variant">
              <p className="text-label-sm text-on-surface-variant uppercase tracking-wider mb-xs">Document fingerprint</p>
              <p className="font-code-md text-code-md text-[#2D7A4F] break-all">{DEMO_DOC_HASH}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  </section>
);

const TransferCompleteScreen = ({ onExit }) => (
  <div className="dashboard-complete-wrap">
    <div className="dashboard-card dashboard-card--success p-xl max-w-[480px] w-full text-center">
      <div className="mx-auto mb-lg w-20 h-20 rounded-full bg-[#e8f5e9] flex items-center justify-center">
        <MaterialIcon name="check_circle" className="text-success" fill size={48} />
      </div>
      <h1 className="font-headline-lg text-primary mb-sm">Transfer Complete</h1>
      <p className="font-body-md text-on-surface-variant mb-lg">
        The transfer has been approved. Click Exit to return to the dashboard.
      </p>
      <button
        type="button"
        onClick={onExit}
        className="inline-flex items-center gap-xs bg-primary text-on-primary px-xl py-sm rounded-lg text-label-sm font-bold hover:opacity-90"
      >
        <MaterialIcon name="arrow_back" size={18} />
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

  const totals = useMemo(
    () => ({
      pending: activities.filter((item) => item.status === 'pending').length,
      accepted: activities.filter((item) => item.status === 'accepted').length,
      rejected: activities.filter((item) => item.status === 'rejected').length,
    }),
    [activities]
  );

  const officialNav = useMemo(
    () => [
      { id: 'overview', label: 'Overview', icon: 'home' },
      { id: 'pending', label: 'Pending Activities', icon: 'schedule', badge: totals.pending },
      { id: 'land-status', label: 'Land Status', icon: 'trending_up' },
    ],
    [totals.pending]
  );

  useEffect(() => {
    if (!window.ethereum) return;
    const handleAccountsChanged = async (accounts) => {
      if (!accounts?.length) {
        setAccount(null);
        setBalance(null);
      } else {
        setAccount(accounts[0]);
        try {
          const bal = await window.ethereum.request({ method: 'eth_getBalance', params: [accounts[0], 'latest'] });
          setBalance(ethers.formatEther(bal));
        } catch (e) {
          console.error('Failed to fetch balance', e);
        }
      }
    };
    window.ethereum.on('accountsChanged', handleAccountsChanged);
    return () => {
      try {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      } catch (e) {
        /* ignore */
      }
    };
  }, []);

  const connectWallet = async () => {
    if (!window.ethereum) {
      toast.error('MetaMask not found. Install the browser extension to connect your wallet.');
      return;
    }
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      if (accounts?.length > 0) {
        setAccount(accounts[0]);
        const bal = await window.ethereum.request({ method: 'eth_getBalance', params: [accounts[0], 'latest'] });
        setBalance(ethers.formatEther(bal));
        toast.success('Wallet connected');
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
    setActivities((prev) => prev.map((item) => (item.id === activity.id ? { ...item, status: 'accepted' } : item)));
    setShowTransferComplete(true);
    setSelectedActivity(activity);
    toast.success('Parcel approved — transfer initiated');
  };

  const handleReject = (activity) => {
    setActivities((prev) => prev.map((item) => (item.id === activity.id ? { ...item, status: 'rejected' } : item)));
    toast.info('Request rejected');
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
    <DashboardShell
      portalTitle="GoLand Registry"
      portalSubtitle="Official Node"
      navItems={officialNav}
      activeSection={activeSection}
      setActiveSection={setActiveSection}
      account={account}
      balance={balance}
      connectWallet={connectWallet}
      copyAddress={copyAddress}
      copied={copied}
    >
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
    </DashboardShell>
  );
};

export default OfficialDashboard;
