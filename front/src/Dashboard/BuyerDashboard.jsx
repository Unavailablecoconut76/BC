import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { ethers } from 'ethers';
import Progress from './Progress';
import land1 from '../../assets/land1.jpg';
import land2 from '../../assets/land2.jpg';
import land3 from '../../assets/land3.jpg';
import land4 from '../../assets/land4.jpg';
import DashboardShell from '../components/DashboardShell';
import MaterialIcon from '../components/MaterialIcon';
import { formatDemoValue } from '../utils/demoLabels';
import './DashboardPages.css';

const DUMMY_MARKETPLACE_DATA = [
  { id: 101, location: 'Pune, Maharashtra', area: 1200, price: '25 ETH', surveyNo: 'PUNE-2024-001', owner: '0x742d35Cc6634C0532925a3b844Bc622e4A8a4C0f', image: land1, litigationStatus: 'Clean' },
  { id: 102, location: 'Mumbai, Maharashtra', area: 1500, price: '35 ETH', surveyNo: 'MUMBAI-2024-002', owner: '0x8ba1f109551bD432803012645Ac136ddd64DBA72', image: land2, litigationStatus: 'Clean' },
  { id: 103, location: 'Bangalore, Karnataka', area: 2000, price: '45 ETH', surveyNo: 'BANGALORE-2024-003', owner: '0xaBc1234567890DEF1234567890DEF1234567890', image: land3, litigationStatus: 'Disputed' },
  { id: 104, location: 'Delhi, Delhi', area: 1800, price: '50 ETH', surveyNo: 'DELHI-2024-004', owner: '0xDEF1234567890ABC1234567890ABC1234567890', image: land4, litigationStatus: 'Clean' },
];

const DUMMY_MY_OFFERS = [
  { id: 1, propertyLocation: 'Pune, Maharashtra', surveyNo: 'PUNE-2024-001', offerAmount: '24 ETH', timestamp: '2024-02-02 14:30:00', status: 'accepted', landId: 101 },
  { id: 2, propertyLocation: 'Mumbai, Maharashtra', surveyNo: 'MUMBAI-2024-002', offerAmount: '33 ETH', timestamp: '2024-02-01 10:15:00', status: 'pending', landId: 102 },
  { id: 3, propertyLocation: 'Bangalore, Karnataka', surveyNo: 'BANGALORE-2024-003', offerAmount: '42 ETH', timestamp: '2024-01-31 09:45:00', status: 'rejected', landId: 103 },
];

const inputClass = 'input-field';

const VerifyLandSection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [verificationResult, setVerificationResult] = useState(null);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      toast.info('Please enter a Parcel ID or Survey Number');
      return;
    }
    setIsSearching(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setVerificationResult({
      surveyNo: searchQuery.toUpperCase(),
      ownerAddress: '0x742d35Cc6634C0532925a3b844Bc622e4A8a4C0f',
      litigationStatus: 'Clean',
      lastTransactionDate: '2024-01-15 09:30:00',
      verified: true,
    });
    toast.success('Property verification complete');
    setIsSearching(false);
  };

  return (
    <section className="dashboard-section space-y-lg">
      <div className="dashboard-card p-xl bg-gradient-to-br from-surface-container-lowest to-surface-container-low">
        <div className="text-center mb-lg">
          <h1 className="font-headline-lg text-primary mb-sm">Verify Property Ownership</h1>
          <p className="font-body-md text-on-surface-variant">
            Check ownership and dispute status using Survey No or Parcel ID
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-sm max-w-2xl mx-auto">
          <div className="flex-1 relative">
            <MaterialIcon name="search" className="absolute left-sm top-1/2 -translate-y-1/2 text-on-surface-variant" size={20} />
            <input
              type="text"
              placeholder="Enter Parcel ID e.g. PUNE-2024-001"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              className={`${inputClass} pl-[48px]`}
            />
          </div>
          <button
            type="button"
            onClick={handleSearch}
            disabled={isSearching}
            className="bg-primary text-on-primary px-lg py-sm rounded-lg text-label-sm font-bold hover:opacity-90 flex items-center justify-center gap-xs disabled:opacity-60"
          >
            {isSearching ? (
              <span className="w-4 h-4 border-2 border-on-primary/30 border-t-on-primary rounded-full animate-spin" />
            ) : (
              <MaterialIcon name="search" size={18} />
            )}
            Verify
          </button>
        </div>
        {verificationResult && (
          <div className="dashboard-card p-lg mt-xl">
            <div className="flex items-center gap-sm mb-md">
              <MaterialIcon name="check_circle" className="text-success" fill size={28} />
              <h2 className="font-headline-md text-primary">Verification Result</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-md">
              {[
                { label: 'Survey No', value: verificationResult.surveyNo, mono: true },
                { label: 'Owner Address', value: verificationResult.ownerAddress, mono: true, breakAll: true },
                { label: 'Litigation Status', value: verificationResult.litigationStatus, status: true },
                { label: 'Last Transaction', value: verificationResult.lastTransactionDate, mono: true, muted: true },
              ].map((box) => (
                <div key={box.label} className="bg-[#F7F5F2] border border-outline-variant rounded-xl p-sm">
                  <p className="text-label-sm text-on-surface-variant uppercase tracking-wider mb-xs">{box.label}</p>
                  {box.status ? (
                    <span className="flex items-center gap-xs text-success font-body-md font-semibold">
                      <MaterialIcon name="check_circle" fill size={16} />
                      {box.value}
                    </span>
                  ) : (
                    <p className={`font-code-md text-code-md ${box.mono ? (box.muted ? 'text-on-surface-variant' : 'text-primary') : 'text-on-surface'} ${box.breakAll ? 'break-all' : ''}`}>
                      {box.value}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

const MarketplaceSection = ({ onMakeOfferClick }) => (
  <section className="dashboard-section space-y-lg">
    <div>
      <h1 className="font-headline-lg text-primary mb-xs">Marketplace</h1>
      <p className="font-body-md text-on-surface-variant">Browse and make offers on available properties</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-md">
      {DUMMY_MARKETPLACE_DATA.map((property) => (
        <div key={property.id} className="dashboard-card dashboard-card--interactive group">
          <div className="relative h-[160px] overflow-hidden">
            <img src={property.image} alt={property.location} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            <span className="absolute top-sm right-sm bg-primary text-on-primary px-xs py-[2px] rounded-full text-label-sm">{formatDemoValue(property.price)}</span>
            <span
              className={`absolute bottom-sm left-sm px-xs py-[2px] rounded-full text-label-sm ${
                property.litigationStatus === 'Clean'
                  ? 'bg-[#e8f5e9] text-[#2D7A4F]'
                  : 'bg-amber-100 text-amber-800'
              }`}
            >
              {property.litigationStatus}
            </span>
          </div>
          <div className="p-sm space-y-sm">
            <h3 className="font-body-md text-on-surface font-semibold line-clamp-1">{property.location}</h3>
            <p className="font-code-md text-label-sm text-on-surface-variant">{property.surveyNo}</p>
            <p className="text-label-sm text-on-surface-variant">{property.area} sq.ft</p>
            <button
              type="button"
              onClick={() => onMakeOfferClick(property)}
              className="w-full bg-secondary text-on-secondary py-sm rounded-lg text-label-sm font-bold hover:bg-[#7a3517]"
            >
              Make Offer
            </button>
          </div>
        </div>
      ))}
    </div>
  </section>
);

const MyOffersSection = ({ onClaimOwnership, claimingId }) => {
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

  return (
    <section className="dashboard-section space-y-lg">
      <div>
        <h1 className="font-headline-lg text-primary mb-xs">My Offers</h1>
        <p className="font-body-md text-on-surface-variant">Track offers you&apos;ve sent to property sellers</p>
      </div>
      {DUMMY_MY_OFFERS.length > 0 ? (
        <div className="space-y-md">
          {DUMMY_MY_OFFERS.map((offer) => (
            <div key={offer.id} className="dashboard-card p-md">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-md items-center">
                <div>
                  <p className="text-label-sm text-on-surface-variant uppercase tracking-wider mb-xs">Property</p>
                  <p className="font-body-md text-on-surface font-semibold">{offer.propertyLocation}</p>
                  <p className="font-code-md text-label-sm text-on-surface-variant">{offer.surveyNo}</p>
                </div>
                <div>
                  <p className="text-label-sm text-on-surface-variant uppercase tracking-wider mb-xs">Offer Amount</p>
                  <p className="text-secondary font-bold font-headline-md">{formatDemoValue(offer.offerAmount)}</p>
                </div>
                <div>
                  <p className="text-label-sm text-on-surface-variant uppercase tracking-wider mb-xs">Status</p>
                  {getStatusBadge(offer.status)}
                </div>
                <div className="md:col-span-2">
                  <p className="text-label-sm text-on-surface-variant uppercase tracking-wider mb-xs">Sent On</p>
                  <p className="font-code-md text-body-sm text-on-surface-variant">{offer.timestamp}</p>
                </div>
              </div>
              {offer.status === 'accepted' && (
                <button
                  type="button"
                  onClick={() => onClaimOwnership(offer)}
                  disabled={claimingId === offer.id}
                  className="mt-md w-full bg-primary text-on-primary py-sm rounded-lg text-label-sm font-bold hover:opacity-90 flex items-center justify-center gap-xs disabled:opacity-60"
                >
                  {claimingId === offer.id ? (
                    <span className="w-4 h-4 border-2 border-on-primary/30 border-t-on-primary rounded-full animate-spin" />
                  ) : (
                    <MaterialIcon name="check_circle" fill size={16} />
                  )}
                  Finalize & Claim Ownership
                </button>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="dashboard-empty-state">
          <MaterialIcon name="send" className="text-on-surface-variant mx-auto mb-sm" size={64} />
          <p className="font-body-md text-on-surface-variant">You haven&apos;t made any offers yet</p>
        </div>
      )}
    </section>
  );
};

const MakeOfferModal = ({ isOpen, property, onClose }) => {
  const [offerPrice, setOfferPrice] = useState('');
  const [remarks, setRemarks] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!offerPrice) {
      toast.info('Please enter an offer price');
      return;
    }
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    toast.success(`Offer of ${offerPrice} ETH sent to seller`);
    setOfferPrice('');
    setRemarks('');
    onClose();
    setIsSubmitting(false);
  };

  if (!isOpen || !property) return null;

  return (
    <>
      <div className="fixed inset-0 bg-[#1a1a2e]/60 backdrop-blur-sm z-[70]" onClick={onClose} aria-hidden />
      <div className="fixed inset-0 z-[80] flex items-center justify-center p-sm">
        <div
          className="dashboard-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="offer-modal-title"
        >
          <div className="flex justify-between items-start p-md border-b border-outline-variant">
            <div>
              <h2 id="offer-modal-title" className="font-headline-md text-primary">
                Make an Offer
              </h2>
              <p className="text-label-sm text-on-surface-variant flex items-center gap-xs mt-xs">
                <MaterialIcon name="place" size={16} />
                {property.location}
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="text-on-surface-variant hover:bg-surface-container rounded-lg p-xs"
              aria-label="Close offer modal"
            >
              <MaterialIcon name="close" size={20} />
            </button>
          </div>
          <div className="p-md space-y-md">
            <div className="bg-[#F7F5F2] border border-outline-variant rounded-xl p-sm space-y-sm">
              <div className="flex justify-between">
                <span className="text-label-sm text-on-surface-variant uppercase">Survey No</span>
                <span className="font-code-md text-code-md">{property.surveyNo}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-label-sm text-on-surface-variant uppercase">List Price</span>
                <span className="text-secondary font-bold">{formatDemoValue(property.price)}</span>
              </div>
            </div>
            <div>
              <label className="block font-body-md text-on-surface font-semibold mb-xs">Offer Price (ETH)</label>
              <input type="number" placeholder="e.g., 23.5" value={offerPrice} onChange={(e) => setOfferPrice(e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className="block font-body-md text-on-surface font-semibold mb-xs">Remarks (Optional)</label>
              <textarea rows={3} placeholder="Add notes..." value={remarks} onChange={(e) => setRemarks(e.target.value)} className={`${inputClass} resize-none`} />
            </div>
            <div className="bg-[#f0f4ff] border border-primary-container/30 rounded-lg p-sm flex gap-xs">
              <MaterialIcon name="info" className="text-primary shrink-0" size={20} />
              <p className="text-body-sm text-primary/80">Your offer will be broadcast on-chain for seller review.</p>
            </div>
          </div>
          <div className="flex gap-sm p-sm border-t border-outline-variant">
            <button type="button" onClick={onClose} className="flex-1 border border-outline-variant text-on-surface-variant rounded-lg py-sm text-label-sm hover:bg-surface-container">
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="flex-1 bg-secondary text-on-secondary rounded-lg py-sm text-label-sm font-bold hover:bg-[#7a3517] disabled:opacity-60 flex items-center justify-center gap-xs"
            >
              {isSubmitting ? <span className="w-4 h-4 border-2 border-on-secondary/30 border-t-on-secondary rounded-full animate-spin" /> : <MaterialIcon name="send" size={16} />}
              Sign & Send
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

const BUYER_NAV = [
  { id: 'marketplace', label: 'Marketplace', icon: 'storefront' },
  { id: 'verify', label: 'Verify Land', icon: 'verified_user' },
  { id: 'offers', label: 'My Offers', icon: 'description' },
  { id: 'land-status', label: 'Land Status', icon: 'trending_up' },
];

const BuyerDashboard = () => {
  const [activeSection, setActiveSection] = useState('marketplace');
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(null);
  const [copied, setCopied] = useState(false);
  const [isOfferModalOpen, setIsOfferModalOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [myPurchasedLands, setMyPurchasedLands] = useState([]);
  const [claimingId, setClaimingId] = useState(null);

  const handleMakeOfferClick = (property) => {
    setSelectedProperty(property);
    setIsOfferModalOpen(true);
  };

  const handleCloseOfferModal = () => {
    setIsOfferModalOpen(false);
    setSelectedProperty(null);
  };

  const handleClaimOwnership = async (offer) => {
    setClaimingId(offer.id);
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const tx = await signer.sendTransaction({
        to: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
        value: ethers.parseEther('0.001'),
      });
      await tx.wait();
      setMyPurchasedLands([
        ...myPurchasedLands,
        {
          id: offer.landId || offer.id,
          location: offer.propertyLocation,
          surveyNo: offer.surveyNo,
          price: offer.offerAmount,
        },
      ]);
      toast.success('Ownership verified. The property is now in your collection.');
    } catch (err) {
      console.error('Claiming failed', err);
      toast.error('Transfer failed. Start the local Hardhat node if you are testing wallet actions.');
    } finally {
      setClaimingId(null);
    }
  };

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

  return (
    <DashboardShell
      portalTitle="GoLand Registry"
      portalSubtitle="Buyer Portal"
      navItems={BUYER_NAV}
      activeSection={activeSection}
      setActiveSection={setActiveSection}
      account={account}
      balance={balance}
      connectWallet={connectWallet}
      copyAddress={copyAddress}
      copied={copied}
    >
      {activeSection === 'marketplace' && <MarketplaceSection onMakeOfferClick={handleMakeOfferClick} />}
      {activeSection === 'verify' && <VerifyLandSection />}
      {activeSection === 'offers' && <MyOffersSection onClaimOwnership={handleClaimOwnership} claimingId={claimingId} />}
      {activeSection === 'land-status' && <Progress />}
      <MakeOfferModal isOpen={isOfferModalOpen} property={selectedProperty} onClose={handleCloseOfferModal} />
    </DashboardShell>
  );
};

export default BuyerDashboard;
