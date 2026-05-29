import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import {
  Wallet,
  Search,
  MapPin,
  TrendingUp,
  CheckCircle,
  Clock,
  AlertCircle,
  X,
  Send,
  Shield,
  Menu,
  ChevronDown,
  FileText,
  DollarSign,
  Copy,
} from 'lucide-react';
import Progress from './Progress';
import { PHASES, DEMO_SURVEY_NO, getDemoState, setDemoPhase } from './demoTransferStore';

const DEMO_UPDATE_EVENT = 'goland-demo-update';
import land1 from '../../assets/land1.jpg';
import land2 from '../../assets/land2.jpg';
import land3 from '../../assets/land3.jpg';
import land4 from '../../assets/land4.jpg';

// import { sign } from 'node:crypto';
 //

//BUY PLOT options..

// ==================== DUMMY DATA ====================
const DUMMY_MARKETPLACE_DATA = [
  {
    id: 101,
    location: 'Pune, Maharashtra',
    area: 1200,
    price: '25 ETH',
    surveyNo: 'PUNE-2024-001',
    owner: '0x742d35Cc6634C0532925a3b844Bc622e4A8a4C0f',
    image: land1,
    litigationStatus: 'Clean',
  },
  {
    id: 102,
    location: 'Mumbai, Maharashtra',
    area: 1500,
    price: '35 ETH',
    surveyNo: 'MUMBAI-2024-002',
    owner: '0x8ba1f109551bD432803012645Ac136ddd64DBA72',
    image: land2,
    litigationStatus: 'Clean',
  },
  {
    id: 103,
    location: 'Bangalore, Karnataka',
    area: 2000,
    price: '45 ETH',
    surveyNo: 'BANGALORE-2024-003',
    owner: '0xaBc1234567890DEF1234567890DEF1234567890',
    image: land3,
    litigationStatus: 'Disputed',
  },
  {
    id: 104,
    location: 'Delhi, Delhi',
    area: 1800,
    price: '50 ETH',
    surveyNo: 'DELHI-2024-004',
    owner: '0xDEF1234567890ABC1234567890ABC1234567890',
    image: land4,
    litigationStatus: 'Clean',
  },
];

const DUMMY_MY_OFFERS = [
  {
    id: 1,
    propertyLocation: 'Pune, Maharashtra',
    surveyNo: 'PUNE-2024-001',
    offerAmount: '24 ETH',
    timestamp: '2024-02-02 14:30:00',
    status: 'pending',
    isDemoParcel: true,
  },
  {
    id: 2,
    propertyLocation: 'Mumbai, Maharashtra',
    surveyNo: 'MUMBAI-2024-002',
    offerAmount: '33 ETH',
    timestamp: '2024-02-01 10:15:00',
    status: 'pending',
  },
  {
    id: 3,
    propertyLocation: 'Bangalore, Karnataka',
    surveyNo: 'BANGALORE-2024-003',
    offerAmount: '42 ETH',
    timestamp: '2024-01-31 09:45:00',
    status: 'rejected',
  },
];

// ==================== HEADER COMPONENT ====================
const BuyerHeader = ({ activeSection, setActiveSection, account, connectWallet, copyAddress, copied, balance }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const sections = [
    { id: 'marketplace', label: 'Marketplace', icon: MapPin },
    { id: 'verify', label: 'Verify Land', icon: Shield },
    { id: 'offers', label: 'My Offers', icon: FileText },
    { id: 'land-status', label: 'Land Status', icon: TrendingUp },
  ];

  const truncateAddress = (address) => {
    return address ? `${address.slice(0, 6)}...${address.slice(-4)}` : 'Not Connected';
  };

  return (
    <header className="sticky top-0 w-full bg-slate-900 border-b border-slate-800 z-40 shadow-lg shadow-black/20">
      <div className=" px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo & Title */}
          <div className="flex items-center space-x-3">
            <div className="bg-emerald-500/10 p-2 rounded-lg border border-emerald-500/20">
              <Shield className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white tracking-tight">
                Go<span className="text-emerald-400">Land</span>
              </h1>
              <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">
                Buyer Portal
              </p>
            </div>
          </div>

          {/* Navigation Tabs (Desktop) */}
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

          {/* Account Info */}
          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex items-center space-x-3 bg-slate-950 px-4 py-2 rounded-full border border-slate-800">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              {account ? (
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-mono text-slate-300 tracking-wide">{truncateAddress(account)}</span>
                    <button onClick={copyAddress} className="text-slate-400 hover:text-emerald-400 p-1 rounded-md">
                      <Copy className="w-4 h-4" />
                    </button>
                    {copied && <span className="text-xs text-emerald-400">Copied</span>}
                  </div>
                  <div className="text-xs text-slate-400 font-mono">{balance ? `${balance} ETH` : ''}</div>
                </div>
              ) : (
                <button onClick={connectWallet} className="text-xs font-mono text-emerald-400 bg-slate-800 px-3 py-1 rounded-md">
                  Connect Wallet
                </button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-slate-300 hover:text-emerald-400 hover:bg-slate-800 rounded-lg transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
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
      /* We use a Fragment (<>...</>) to group the address and balance as ONE element */
      <>
        <div className="flex items-center space-x-2">
          <span className="text-xs font-mono">{truncateAddress(account)}</span>
          <button onClick={copyAddress} className="text-slate-400 hover:text-emerald-400 p-1 rounded-md">
            <Copy className="w-4 h-4" />
          </button>
        </div>
        
        {/* Balance Display */}
        <span className="text-xs font-bold text-emerald-500 ml-2">
          {balance ? `${parseFloat(balance).toFixed(4)} ETH` : "0.00 ETH"}
        </span>
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

// ==================== VERIFY LAND SECTION ====================
const VerifyLandSection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [verificationResult, setVerificationResult] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  window.scrollTo({ top: 0, behavior: 'smooth' });

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      alert('Please enter a Parcel ID or Survey Number');
      return;
    }

    setIsSearching(true);
    // Simulated API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Mock verification result
    setVerificationResult({
      surveyNo: searchQuery.toUpperCase(),
      ownerAddress: '0x742d35Cc6634C0532925a3b844Bc622e4A8a4C0f',
      litigationStatus: 'Clean',
      lastTransactionDate: '2024-01-15 09:30:00',
      verified: true,
    });
    setIsSearching(false);
  };

  return (
    <section className="bg-slate-900 text-white space-y-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-emerald-500/10 border border-emerald-500/20 rounded-2xl p-12 shadow-xl shadow-black/20">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            Verify Property Ownership
          </h1>
          <p className="text-slate-300 text-lg">
            Search blockchain records to verify land ownership and dispute status
          </p>
        </div>

        {/* Search Bar */}
        <div className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-4 w-5 h-5 text-slate-500" />
            <input
              type="text"
              placeholder="Enter Parcel ID (e.g., PUNE-2024-001)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-12 pr-4 py-4 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50 transition-all"
            />
          </div>
          <button
            onClick={handleSearch}
            disabled={isSearching}
            className="bg-emerald-500 hover:bg-emerald-600 disabled:bg-slate-700 text-white px-8 py-4 rounded-xl font-bold transition-all flex items-center justify-center space-x-2 shadow-lg shadow-emerald-500/20 whitespace-nowrap"
          >
            {isSearching ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Searching...</span>
              </>
            ) : (
              <>
                <Search className="w-5 h-5" />
                <span>Verify</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Verification Result */}
      {verificationResult && (
        <div className="bg-slate-900 border border-emerald-500/30 rounded-2xl p-8 shadow-xl shadow-black/20">
          <div className="flex items-center space-x-3 mb-6">
            <CheckCircle className="w-6 h-6 text-emerald-400" />
            <h2 className="text-2xl font-bold text-white">Verification Result</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Property Details */}
            <div className="space-y-4">
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-4">
                <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">
                  Survey Number
                </p>
                <p className="text-white font-mono text-lg">{verificationResult.surveyNo}</p>
              </div>

              <div className="bg-slate-950 border border-slate-800 rounded-xl p-4">
                <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">
                  Owner Address
                </p>
                <p className="text-slate-300 font-mono text-sm break-all">
                  {verificationResult.ownerAddress}
                </p>
              </div>
            </div>

            {/* Status & History */}
            <div className="space-y-4">
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-4">
                <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-2">
                  Litigation Status
                </p>
                <div className="flex items-center space-x-2">
                  {verificationResult.litigationStatus === 'Clean' ? (
                    <>
                      <CheckCircle className="w-5 h-5 text-emerald-400" />
                      <span className="text-emerald-400 font-bold">Clean</span>
                    </>
                  ) : (
                    <>
                      <AlertCircle className="w-5 h-5 text-yellow-400" />
                      <span className="text-yellow-400 font-bold">Disputed</span>
                    </>
                  )}
                </div>
              </div>

              <div className="bg-slate-950 border border-slate-800 rounded-xl p-4">
                <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">
                  Last Transaction
                </p>
                <p className="text-slate-300 font-mono text-sm">
                  {verificationResult.lastTransactionDate}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

// ==================== MARKETPLACE SECTION ====================
const MarketplaceSection = ({ properties, onMakeOfferClick }) => {
  return (
    <section className="bg-slate-900 min-h-screen text-white ">
      <div className='bg-slate-900'>
        <h1 className="text-3xl font-bold text-white mb-2">Marketplace</h1>
        <p className="text-slate-400">Browse and make offers on available properties</p>
      </div>

      {/* Properties Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {properties.map((property) => (
          <div
            key={property.id}
            className="group bg-slate-800  rounded-2xl overflow-hidden hover:border-emerald-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-black/20"
          >
            {/* Property Image */}
            <div className="relative w-full h-40 bg-slate-800 overflow-hidden">
              <img
                src={property.image}
                alt={property.location}
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
              />
              <div className="absolute top-3 right-3 bg-slate-950/90 backdrop-blur-sm text-emerald-400 border border-emerald-500/20 px-2 py-1 rounded-full text-xs font-bold shadow-lg">
                {property.price}
              </div>
              {property.listingStatus === 'Sold' && (
                <div className="absolute top-3 left-3 bg-red-500/90 text-white px-2 py-1 rounded-full text-xs font-bold uppercase">
                  Sold
                </div>
              )}
            </div>

            {/* Property Info */}
            <div className="p-4 space-y-4">
              <div>
                <h3 className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors line-clamp-1">
                  {property.location}
                </h3>
                <p className="text-xs font-mono text-slate-500 mt-1">{property.surveyNo}</p>
              </div>

              <div className="flex items-center justify-between py-2 0">
                <div>
                  <p className="text-[10px] text-slate-500 uppercase font-bold">Area</p>
                  <p className="text-xs font-semibold text-slate-200">
                    {property.area} <span className="text-slate-500">Sq.ft</span>
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-slate-500 uppercase font-bold">Status</p>
                  <p className={`text-xs font-bold ${
                    property.listingStatus === 'Sold'
                      ? 'text-red-400'
                      : property.litigationStatus === 'Clean'
                      ? 'text-emerald-400'
                      : 'text-yellow-400'
                  }`}>
                    {property.listingStatus === 'Sold' ? 'Sold' : property.litigationStatus}
                  </p>
                </div>
              </div>

              <button
                onClick={() => onMakeOfferClick(property)}
                disabled={property.listingStatus === 'Sold'}
                className={`w-full py-2 rounded-lg font-semibold transition-all text-sm shadow-lg active:scale-95 ${
                  property.listingStatus === 'Sold'
                    ? 'bg-slate-700 text-slate-500 cursor-not-allowed'
                    : 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-emerald-500/10'
                }`}
              >
                {property.listingStatus === 'Sold' ? 'Sold' : 'Make Offer'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const getDemoOfferAction = (offer, demoPhase) => {
  if (!offer.isDemoParcel) return null;
  if (demoPhase === PHASES.FINALIZED) {
    return { type: 'claim' };
  }
  if (demoPhase === PHASES.REJECTED) {
    return { type: 'rejected' };
  }
  if (demoPhase === PHASES.CLAIMED) {
    return { type: 'claimed' };
  }
  if (
    demoPhase === PHASES.INITIATED ||
    demoPhase === PHASES.REVIEWING ||
    demoPhase === PHASES.REVIEW_COMPLETE
  ) {
    return { type: 'awaiting' };
  }
  return null;
};

// ==================== MY OFFERS SECTION ====================
const MyOffersSection = ({ offers, demoPhase, onClaim }) => {
  const getStatusBadge = (status) => {
    const baseClasses = 'flex items-center space-x-1 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide';

    if (status === 'pending') {
      return (
        <div className={`${baseClasses} bg-yellow-500/10 text-yellow-400 border border-yellow-500/20`}>
          <Clock className="w-3 h-3" />
          <span>Pending</span>
        </div>
      );
    } else if (status === 'accepted') {
      return (
        <div className={`${baseClasses} bg-emerald-500/10 text-emerald-400 border border-emerald-500/20`}>
          <CheckCircle className="w-3 h-3" />
          <span>Accepted</span>
        </div>
      );
    } else if (status === 'rejected') {
      return (
        <div className={`${baseClasses} bg-red-500/10 text-red-400 border border-red-500/20`}>
          <AlertCircle className="w-3 h-3" />
          <span>Rejected</span>
        </div>
      );
    }
  };

  return (
    <section className="bg-slate-900 text-white space-y-8 ">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">My Offers</h1>
        <p className="text-slate-400">Track offers you've sent to property sellers</p>
      </div>

      {/* Offers Table */}
      {offers.length > 0 ? (
        <div className="space-y-4 bg-slate-900">
          {offers.map((offer) => (
            <div
              key={offer.id}
              className="bg-slate-800  rounded-2xl p-6 hover:border-emerald-500/30 transition-all hover:bg-slate-800/50"
            >
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
                {/* Property Info */}
                <div>
                  <p className="text-[10px] text-gray uppercase font-bold tracking-wider mb-1">
                    Property
                  </p>
                  <p className="text-white font-semibold text-sm">{offer.propertyLocation}</p>
                  <p className="text-xs font-mono text-slate-500 mt-1">{offer.surveyNo}</p>
                </div>

                {/* Offer Amount */}
                <div>
                  <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider mb-1">
                    Offer Amount
                  </p>
                  <p className="text-emerald-400 font-bold text-lg">{offer.offerAmount}</p>
                </div>

                {/* Status */}
                <div>
                  <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider mb-1">
                    Status
                  </p>
                  {getStatusBadge(offer.status)}
                </div>

                {/* Timestamp */}
                <div className="md:col-span-2">
                  <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider mb-1">
                    Sent On
                  </p>
                  <p className="text-slate-300 font-mono text-sm">{offer.timestamp}</p>
                </div>

                <div className="md:col-span-5">
                  {(() => {
                    const demoAction = getDemoOfferAction(offer, demoPhase);
                    if (demoAction?.type === 'claim') {
                      return (
                        <button
                          type="button"
                          onClick={() => onClaim(offer)}
                          className="mt-2 w-full bg-emerald-500 hover:bg-emerald-600 text-white py-2 rounded-xl font-bold transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center space-x-2"
                        >
                          <CheckCircle className="w-4 h-4" />
                          <span>Finalize &amp; Claim Ownership</span>
                        </button>
                      );
                    }
                    if (demoAction?.type === 'rejected') {
                      return (
                        <p className="mt-2 text-sm font-semibold text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-2 text-center">
                          Rejected by office
                        </p>
                      );
                    }
                    if (demoAction?.type === 'claimed') {
                      return (
                        <p className="mt-2 text-sm font-semibold text-slate-400 bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-center">
                          Claimed
                        </p>
                      );
                    }
                    if (demoAction?.type === 'awaiting') {
                      return (
                        <p className="mt-2 text-sm text-yellow-300 bg-yellow-500/10 border border-yellow-500/20 rounded-xl px-4 py-2 text-center">
                          Awaiting government review
                        </p>
                      );
                    }
                    if (offer.status === 'accepted' && !offer.isDemoParcel) {
                      return (
                        <button
                          type="button"
                          onClick={() => onClaim(offer)}
                          className="mt-2 w-full bg-emerald-500 hover:bg-emerald-600 text-white py-2 rounded-xl font-bold transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center space-x-2"
                        >
                          <CheckCircle className="w-4 h-4" />
                          <span>Finalize &amp; Claim Ownership</span>
                        </button>
                      );
                    }
                    return null;
                  })()}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-slate-900 border border-slate-800 border-dashed rounded-2xl">
          <Send className="w-16 h-16 text-slate-800 mx-auto mb-4" />
          <p className="text-slate-400 text-lg">You haven't made any offers yet</p>
          <p className="text-slate-500 text-sm mt-2">Browse the marketplace and make your first offer</p>
        </div>
      )}
    </section>
  );
};

// ==================== MAKE OFFER MODAL ====================
const MakeOfferModal = ({ isOpen, property, onClose }) => {
  const [offerPrice, setOfferPrice] = useState('');
  const [remarks, setRemarks] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!offerPrice) {
      alert('Please enter an offer price');
      return;
    }

    setIsSubmitting(true);
    // Simulated blockchain submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    alert(`Offer of ${offerPrice} ETH sent to seller!`);
    setOfferPrice('');
    setRemarks('');
    onClose();
    setIsSubmitting(false);
  };

  if (!isOpen || !property) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-md w-full shadow-2xl shadow-black/50 transform transition-all">
          {/* Header */}
          <div className="flex justify-between items-center p-6 border-b border-slate-800">
            <div>
              <h2 className="text-xl font-bold text-white">Make an Offer</h2>
              <p className="text-sm text-slate-400 mt-1 flex items-center gap-1">
                <MapPin className="w-3 h-3" /> {property.location}
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-slate-500 hover:text-white hover:bg-slate-800 p-2 rounded-lg transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 space-y-5">
            {/* Property Summary */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-slate-500 text-xs font-bold uppercase tracking-wider">
                  Survey No
                </span>
                <span className="text-slate-200 font-mono text-sm">{property.surveyNo}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500 text-xs font-bold uppercase tracking-wider">
                  List Price
                </span>
                <span className="text-emerald-400 font-bold">{property.price}</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-slate-800">
                <span className="text-slate-500 text-xs font-bold uppercase tracking-wider">
                  Area
                </span>
                <span className="text-slate-200 text-sm">{property.area} Sq.ft</span>
              </div>
            </div>

            {/* Offer Price Input */}
            <div>
              <label className="block text-sm font-bold text-white mb-2 flex items-center space-x-1">
                <DollarSign className="w-4 h-4 text-emerald-400" />
                <span>Offer Price (ETH)</span>
              </label>
              <input
                type="number"
                placeholder="e.g., 23.5"
                value={offerPrice}
                onChange={(e) => setOfferPrice(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
              />
            </div>

            {/* Remarks Input */}
            <div>
              <label className="block text-sm font-bold text-white mb-2 flex items-center space-x-1">
                <FileText className="w-4 h-4 text-emerald-400" />
                <span>Remarks (Optional)</span>
              </label>
              <textarea
                placeholder="Add any notes about your offer..."
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                rows={3}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors resize-none"
              />
            </div>

            {/* Warning */}
            <div className="flex gap-3 bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
              <AlertCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-blue-300 leading-relaxed">
                Your offer will be broadcast on-chain. The seller will receive a notification and can accept or reject your offer.
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="flex gap-3 p-6 border-t border-slate-800 bg-slate-900/50 rounded-b-2xl">
            <button
              onClick={onClose}
              className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-300 py-3 rounded-xl font-semibold transition-all"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="flex-1 bg-emerald-500 hover:bg-emerald-600 disabled:bg-slate-700 disabled:text-slate-500 text-white py-3 rounded-xl font-bold transition-all flex items-center justify-center space-x-2 shadow-lg shadow-emerald-500/20"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Sending...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Sign & Send</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

// ==================== MAIN BUYER DASHBOARD ====================
const BuyerDashboard = () => {
  const [activeSection, setActiveSection] = useState('marketplace');
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(null);
  const [copied, setCopied] = useState(false);
  const [isOfferModalOpen, setIsOfferModalOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [myPurchasedLands, setMyPurchasedLands] = useState([]);
  const [buyerPhase, setBuyerPhase] = useState(PHASES.IDLE);

  useEffect(() => {
    const navEntry = performance.getEntriesByType('navigation')[0];
    const isPageReload = navEntry?.type === 'reload';
    if (!isPageReload) {
      setBuyerPhase(getDemoState().phase);
    }

    const syncFromStore = () => setBuyerPhase(getDemoState().phase);
    window.addEventListener(DEMO_UPDATE_EVENT, syncFromStore);
    const onStorage = (e) => {
      if (e.key === 'goland_demo_transfer' || e.key === null) syncFromStore();
    };
    window.addEventListener('storage', onStorage);
    return () => {
      window.removeEventListener(DEMO_UPDATE_EVENT, syncFromStore);
      window.removeEventListener('storage', onStorage);
    };
  }, []);

  const marketplaceProperties = DUMMY_MARKETPLACE_DATA.map((property) => {
    if (property.surveyNo !== DEMO_SURVEY_NO) return property;
    const sold = buyerPhase === PHASES.FINALIZED || buyerPhase === PHASES.CLAIMED;
    return { ...property, listingStatus: sold ? 'Sold' : property.listingStatus };
  });

  const handleMakeOfferClick = (property) => {
    setSelectedProperty(property);
    setIsOfferModalOpen(true);
  };

  const handleCloseOfferModal = () => {
    setIsOfferModalOpen(false);
    setSelectedProperty(null);
  };

  // Function to finalize the purchase and add land to Buyer's collection
  const handleClaimOwnership = async (offer) => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      // Optional: Small transaction to "verify" the claim on-chain
      const tx = await signer.sendTransaction({
        to: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266', // Sending to self to trigger a block update
        value: ethers.parseEther("35"), 
      });

      await tx.wait();

      // Add the property to the Buyer's 'Purchased' list
      const newlyAcquiredLand = {
        id: offer.id,
        location: offer.propertyLocation,
        surveyNo: offer.surveyNo,
        price: offer.offerAmount,
        image: 'https://via.placeholder.com/300x200/1e293b/10b981?text=Purchased+Parcel'
      };

      setMyPurchasedLands([...myPurchasedLands, newlyAcquiredLand]);

      if (offer.surveyNo === DEMO_SURVEY_NO || offer.isDemoParcel) {
        setDemoPhase(PHASES.CLAIMED);
      }

      alert("Ownership verified! The property is now in your collection.");
    } catch (err) {
      console.error("Claiming failed", err);
    }
  };

  // Connect to MetaMask / Ethereum provider
  const connectWallet = async () => {
    if (!window.ethereum) {
      alert('MetaMask not detected. Please install MetaMask and try again.');
      return;
    }

    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      if (accounts && accounts.length > 0) {
        setAccount(accounts[0]);
        // fetch balance
        try {
          const bal = await window.ethereum.request({ 
            method: 'eth_getBalance', params: [accounts[0], 'latest'] 
          });
          setBalance(ethers.formatEther(bal));
        } catch (e) {
          console.error('Failed to fetch balance', e);
        }
      }
    } catch (err) {
      if (err.code === 4001) {
        console.log('User rejected connection request');
      } else {
        console.error('Error connecting wallet', err);
      }
    }
  };

  // Copy address to clipboard
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

  // Listen for account changes and update balance
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

  return (
    <div className="min-h-screen bg-[#0b1220] text-[#a8b3cf]">
      <BuyerHeader
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        account={account}
        connectWallet={connectWallet}
        copyAddress={copyAddress}
        copied={copied}
        balance={balance}
      />

      <main className="py-12 space-y-12">
        {activeSection === 'marketplace' && (
          <MarketplaceSection
            properties={marketplaceProperties}
            onMakeOfferClick={handleMakeOfferClick}
          />
        )}
        {activeSection === 'verify' && <VerifyLandSection />}
        {activeSection === 'offers' && (
          <MyOffersSection
            offers={DUMMY_MY_OFFERS}
            demoPhase={buyerPhase}
            onClaim={handleClaimOwnership}
          />
        )}
        {activeSection === 'land-status' && <Progress />}
      </main>
    </div>
  );
};

export default BuyerDashboard;
