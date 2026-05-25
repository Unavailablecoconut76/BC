import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { ethers } from 'ethers';
import Progress from './Progress';
import land1 from '../../assets/land1.jpg';
import land2 from '../../assets/land2.jpg';
import land3 from '../../assets/land3.jpg';
import DashboardShell from '../components/DashboardShell';
import MaterialIcon from '../components/MaterialIcon';
import { formatDemoValue } from '../utils/demoLabels';

const DUMMY_LANDS = [
  { id: 101, location: 'Pune, Maharashtra', area: 1200, price: '25 ETH', surveyNo: 'PUNE-2024-001', image: land1 },
  { id: 102, location: 'Mumbai, Maharashtra', area: 1500, price: '35 ETH', surveyNo: 'MUMBAI-2024-002', image: land2 },
  { id: 103, location: 'Bangalore, Karnataka', area: 2000, price: '45 ETH', surveyNo: 'BANGALORE-2024-003', image: land3 },
];

const DUMMY_PENDING_REQUESTS = [
  {
    id: 1,
    buyerAddress: '0x742d35Cc6634C0532925a3b844Bc622e4A8a4C0f',
    landId: 101,
    landLocation: 'Pune, Maharashtra',
    offeredPrice: '24 ETH',
    timestamp: '2024-02-01 10:30:00',
    status: 'pending',
  },
  {
    id: 2,
    buyerAddress: '0x8ba1f109551bD432803012645Ac136ddd64DBA72',
    landId: 102,
    landLocation: 'Mumbai, Maharashtra',
    offeredPrice: '34 ETH',
    timestamp: '2024-01-31 15:45:00',
    status: 'pending',
  },
];

const inputClass =
  'w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-sm py-xs font-body-md text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all';

const MyPropertiesSection = ({ lands, onTransferClick }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const filteredLands = lands.filter(
    (land) =>
      land.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      land.surveyNo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="space-y-lg">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-md">
        <div>
          <button type="button" className="flex items-center gap-xs text-label-sm text-on-surface-variant mb-sm">
            <MaterialIcon name="arrow_back" size={18} />
            Back to Dashboard
          </button>
          <h2 className="font-headline-lg text-primary">My Properties</h2>
          <p className="font-body-md text-on-surface-variant">Manage and view all your registered land parcels</p>
        </div>
        <div className="relative w-full md:w-96">
          <MaterialIcon
            name="search"
            className="absolute left-sm top-1/2 -translate-y-1/2 text-on-surface-variant"
            size={20}
          />
          <input
            type="text"
            placeholder="Search by location or survey number..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`${inputClass} pl-[48px]`}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-md">
        {filteredLands.map((land) => (
          <div
            key={land.id}
            className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden shadow-card hover:border-primary-container transition-all group"
          >
            <div className="relative h-[180px] overflow-hidden">
              <img
                src={land.image}
                alt={land.location}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-sm right-sm bg-primary text-on-primary px-xs py-[2px] rounded-full text-label-sm font-semibold">
                {formatDemoValue(land.price)}
              </span>
            </div>
            <div className="px-sm py-sm space-y-sm">
              <div className="flex items-start justify-between">
                <h3 className="font-body-md text-on-surface font-semibold">{land.location}</h3>
                <MaterialIcon name="location_on" className="text-on-surface-variant" size={20} />
              </div>
              <span className="bg-surface-container-low px-xs py-[2px] rounded text-label-sm text-on-surface-variant font-code-md inline-block">
                Survey: {land.surveyNo}
              </span>
              <div className="grid grid-cols-2 gap-sm py-sm border-t border-outline-variant">
                <div>
                  <p className="text-label-sm text-on-surface-variant uppercase tracking-wider">Area</p>
                  <p className="font-body-md text-on-surface">{land.area} sq.ft</p>
                </div>
                <div>
                  <p className="text-label-sm text-on-surface-variant uppercase tracking-wider">Land ID</p>
                  <p className="font-body-md text-primary font-bold">#{land.id}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => onTransferClick(land)}
                className="w-full bg-secondary text-on-secondary py-sm rounded-lg text-label-sm font-bold hover:bg-[#7a3517] transition-colors flex items-center justify-center gap-xs"
              >
                <MaterialIcon name="send" size={16} />
                Initiate Transfer
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredLands.length === 0 && (
        <div className="text-center py-xl border border-dashed border-outline-variant rounded-xl bg-surface-container-lowest">
          <MaterialIcon name="domain" className="text-on-surface-variant mx-auto mb-sm" size={64} />
          <p className="font-body-md text-on-surface-variant">No properties found matching your search</p>
        </div>
      )}
    </section>
  );
};

const TransferModal = ({ isOpen, land, onClose, setMyLands, myLands }) => {
  const [buyerAddress, setBuyerAddress] = useState('');
  const [offerPrice, setOfferPrice] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInitiateTransfer = async () => {
    if (!buyerAddress || !offerPrice) {
      toast.info('Please fill in all fields');
      return;
    }
    setIsSubmitting(true);
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const tx = await signer.sendTransaction({
        to: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
        value: ethers.parseEther(offerPrice),
      });
      console.log('Transaction sent! Hash:', tx.hash);
      await tx.wait();
      const updatedLands = myLands.filter((item) => item.id !== land.id);
      setMyLands(updatedLands);
      toast.success(`Transfer of Land #${land.id} initiated. Switch to the Buyer wallet to claim it.`);
      onClose();
    } catch (error) {
      console.error('Transfer failed:', error);
      toast.error('Transfer failed. Start the local Hardhat node if you are testing wallet actions.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen || !land) return null;

  return (
    <>
      <div className="fixed inset-0 bg-[#1a1a2e]/60 backdrop-blur-sm z-50" onClick={onClose} aria-hidden />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-sm">
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl max-w-[448px] w-full shadow-card max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-start p-md border-b border-outline-variant">
            <div>
              <h2 className="font-headline-md text-primary">Initiate Transfer</h2>
              <p className="text-label-sm text-on-surface-variant flex items-center gap-xs mt-xs">
                <MaterialIcon name="place" size={16} />
                {land.location}
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="text-on-surface-variant hover:bg-surface-container rounded-lg p-xs"
            >
              <MaterialIcon name="close" size={20} />
            </button>
          </div>
          <div className="p-md space-y-md">
            <div className="bg-[#F7F5F2] border border-outline-variant rounded-xl p-sm space-y-sm">
              <div className="flex justify-between">
                <span className="text-label-sm text-on-surface-variant uppercase tracking-wider">Survey No</span>
                <span className="font-code-md text-on-surface text-code-md">{land.surveyNo}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-label-sm text-on-surface-variant uppercase tracking-wider">Area</span>
                <span className="font-body-md text-on-surface">{land.area} Sq.ft</span>
              </div>
              <div className="flex justify-between pt-sm border-t border-outline-variant">
                <span className="font-body-md text-on-surface-variant">Estimated Value</span>
                <span className="text-secondary font-bold">{formatDemoValue(land.price)}</span>
              </div>
            </div>
            <div>
              <label className="block font-body-md text-on-surface mb-xs">Buyer Wallet Address</label>
              <input
                type="text"
                placeholder="0x..."
                value={buyerAddress}
                onChange={(e) => setBuyerAddress(e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label className="block font-body-md text-on-surface mb-xs">Sale Price (in ETH)</label>
              <input
                type="number"
                placeholder="0.00"
                value={offerPrice}
                onChange={(e) => setOfferPrice(e.target.value)}
                className={inputClass}
              />
            </div>
            <div className="bg-[#f0f4ff] border border-primary-container/30 rounded-lg p-sm flex gap-xs">
              <MaterialIcon name="info" className="text-primary shrink-0" size={20} />
              <p className="text-body-sm text-primary/80">
                This starts a pending transfer. The buyer must accept before ownership changes.
              </p>
            </div>
          </div>
          <div className="flex gap-sm p-sm border-t border-outline-variant">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 border border-outline-variant text-on-surface-variant rounded-lg py-sm text-label-sm hover:bg-surface-container"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleInitiateTransfer}
              disabled={isSubmitting || !buyerAddress.trim() || !offerPrice}
              className="flex-1 bg-secondary text-on-secondary rounded-lg py-sm text-label-sm font-bold hover:bg-[#7a3517] disabled:bg-surface-container disabled:text-on-surface-variant flex items-center justify-center gap-xs"
            >
              {isSubmitting ? (
                <span className="w-4 h-4 border-2 border-on-secondary/30 border-t-on-secondary rounded-full animate-spin" />
              ) : (
                <MaterialIcon name="bolt" size={16} />
              )}
              {isSubmitting ? 'Processing...' : 'Confirm'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

const PendingRequestsSection = ({ requests, onAccept, onReject }) => {
  const truncateAddress = (address) => `${address.slice(0, 6)}...${address.slice(-4)}`;

  return (
    <section className="space-y-lg">
      <div>
        <button type="button" className="flex items-center gap-xs text-label-sm text-on-surface-variant mb-sm">
          <MaterialIcon name="arrow_back" size={18} />
          Back to Dashboard
        </button>
        <h2 className="font-headline-lg text-primary">Pending Transfer Requests</h2>
        <p className="font-body-md text-on-surface-variant">Review and manage incoming transfer offers</p>
      </div>

      {requests.length > 0 ? (
        <div className="space-y-md">
          {requests.map((request) => (
            <div
              key={request.id}
              className="bg-surface-container-lowest border border-outline-variant rounded-xl p-md shadow-card"
            >
              <div className="grid grid-cols-1 md:grid-cols-4 gap-md mb-md">
                <div>
                  <p className="text-label-sm text-on-surface-variant uppercase tracking-wider mb-xs">Buyer Address</p>
                  <div className="flex items-center gap-xs">
                    <div className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center">
                      <MaterialIcon name="account_balance_wallet" className="text-primary" size={20} />
                    </div>
                    <p className="font-code-md text-on-surface text-code-md">{truncateAddress(request.buyerAddress)}</p>
                  </div>
                </div>
                <div>
                  <p className="text-label-sm text-on-surface-variant uppercase tracking-wider mb-xs">Property</p>
                  <p className="font-body-md text-on-surface font-semibold">{request.landLocation}</p>
                </div>
                <div>
                  <p className="text-label-sm text-on-surface-variant uppercase tracking-wider mb-xs">Offered Price</p>
                  <p className="text-secondary font-bold font-headline-md">{formatDemoValue(request.offeredPrice)}</p>
                </div>
                <div className="flex flex-col items-start md:items-end gap-xs">
                  <span className="flex items-center gap-xs bg-secondary/10 text-secondary px-xs py-[2px] rounded-full text-label-sm">
                    <MaterialIcon name="schedule" size={14} />
                    PENDING
                  </span>
                  <span className="text-label-sm text-on-surface-variant font-code-md">{request.timestamp}</span>
                </div>
              </div>
              <div className="flex gap-sm pt-md border-t border-outline-variant">
                <button
                  type="button"
                  onClick={() => onAccept(request.id)}
                  className="flex-1 bg-tertiary-container text-on-tertiary-container rounded-lg py-xs text-label-sm font-bold flex items-center justify-center gap-xs hover:opacity-90"
                >
                  <MaterialIcon name="check" size={16} />
                  Accept
                </button>
                <button
                  type="button"
                  onClick={() => onReject(request.id)}
                  className="flex-1 border border-error text-error rounded-lg py-xs text-label-sm font-bold flex items-center justify-center gap-xs hover:bg-error-container/30"
                >
                  <MaterialIcon name="close" size={16} />
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-xl border border-dashed border-outline-variant rounded-xl">
          <MaterialIcon name="schedule" className="text-on-surface-variant mx-auto mb-sm" size={64} />
          <p className="font-body-md text-on-surface font-medium">No pending requests — you are up to date</p>
          <p className="text-body-sm text-on-surface-variant mt-xs">New offers from buyers will appear here.</p>
        </div>
      )}
    </section>
  );
};

const SELLER_NAV = [
  { id: 'properties', label: 'My Properties', icon: 'domain' },
  { id: 'transfer', label: 'Initiate Transfer', icon: 'send' },
  { id: 'requests', label: 'Pending Requests', icon: 'schedule' },
  { id: 'land-status', label: 'Land Status', icon: 'trending_up' },
];

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState('properties');
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(0);
  const [myLands, setMyLands] = useState(DUMMY_LANDS);
  const [pendingRequests, setPendingRequests] = useState(DUMMY_PENDING_REQUESTS);

  const handleAcceptRequest = (id) => {
    setPendingRequests((prev) => prev.filter((r) => r.id !== id));
    toast.success('Transfer request accepted');
  };

  const handleRejectRequest = (id) => {
    setPendingRequests((prev) => prev.filter((r) => r.id !== id));
    toast.info('Transfer request rejected');
  };
  const [transferStatus] = useState('idle');
  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);
  const [selectedLand, setSelectedLand] = useState(null);
  const [copied, setCopied] = useState(false);

  const connectWallet = async () => {
    if (!window.ethereum) {
      toast.error('MetaMask not found. Install the browser extension to connect your wallet.');
      return;
    }
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const rawbalance = await window.ethereum.request({
        method: 'eth_getBalance',
        params: [accounts[0], 'latest'],
      });
      if (accounts && accounts.length > 0) {
        setAccount(accounts[0]);
        setBalance(ethers.formatEther(rawbalance));
        toast.success('Wallet connected');
      }
    } catch (err) {
      if (err.code === 4001) console.log('User rejected connection request');
      else console.error('Error connecting wallet', err);
    }
  };

  const copyAddress = async () => {
    if (!account) return;
    try {
      await navigator.clipboard.writeText(account);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  useEffect(() => {
    if (!window.ethereum) return;
    const handleAccountsChanged = (accounts) => {
      setAccount(accounts.length === 0 ? null : accounts[0]);
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

  const handleTransferClick = (land) => {
    setSelectedLand(land);
    setIsTransferModalOpen(true);
  };

  const handleCloseTransferModal = () => {
    setIsTransferModalOpen(false);
    setSelectedLand(null);
  };

  const bottomAction = (
    <button
      type="button"
      onClick={() => setActiveSection('land-status')}
      className="w-full bg-primary text-on-primary py-sm rounded-lg text-label-sm font-semibold hover:opacity-90"
    >
      New Registration
    </button>
  );

  return (
    <DashboardShell
      portalTitle="GoLand Registry"
      portalSubtitle="Land Owner Portal"
      navItems={SELLER_NAV}
      activeSection={activeSection}
      setActiveSection={setActiveSection}
      bottomAction={bottomAction}
      account={account}
      balance={balance}
      connectWallet={connectWallet}
      copyAddress={copyAddress}
      copied={copied}
    >
      {activeSection === 'properties' && (
        <MyPropertiesSection lands={myLands} onTransferClick={handleTransferClick} />
      )}
      {activeSection === 'transfer' && (
        <div className="text-center py-xl bg-surface-container-lowest border border-outline-variant rounded-xl shadow-card">
          <div className="w-20 h-20 bg-surface-container rounded-full flex items-center justify-center mx-auto mb-md">
            <MaterialIcon name="send" className="text-primary" size={32} />
          </div>
          <h2 className="font-headline-lg text-primary mb-sm">Initiate Transfer</h2>
          <p className="font-body-md text-on-surface-variant mb-lg max-w-md mx-auto">
            Select a property from My Properties to begin the ownership transfer process.
          </p>
          <button
            type="button"
            onClick={() => setActiveSection('properties')}
            className="bg-secondary text-on-secondary px-lg py-sm rounded-lg font-bold inline-flex items-center gap-xs hover:bg-[#7a3517]"
          >
            <MaterialIcon name="domain" size={20} />
            Go to My Properties
          </button>
        </div>
      )}
      {activeSection === 'requests' && (
        <PendingRequestsSection
          requests={pendingRequests}
          onAccept={handleAcceptRequest}
          onReject={handleRejectRequest}
        />
      )}
      {activeSection === 'land-status' && <Progress />}

      <TransferModal
        isOpen={isTransferModalOpen}
        land={selectedLand}
        onClose={handleCloseTransferModal}
        transferStatus={transferStatus}
        myLands={myLands}
        setMyLands={setMyLands}
      />
    </DashboardShell>
  );
};

export default Dashboard;
