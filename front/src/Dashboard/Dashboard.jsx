import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Wallet,
  Home,
  Send,
  Clock,
  Plus,
  ChevronDown,
  Search,
  MapPin,
  Zap,
  X,
  CheckCircle,
  AlertCircle,
  Menu, // Added Menu icon for mobile trigger
  Copy,
  TrendingUp,
} from 'lucide-react';
import { ethers } from 'ethers';
import Progress from './Progress';
import { DEMO_SURVEY_NO, initiateDemoTransfer } from './demoTransferStore';
import { getSellerProperties, getPropertyById, toSellerListItem } from './propertyCatalog';

// Dummy pending requests (Unchanged)
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


// MetaMask helpers are implemented inside the Dashboard component

// Dashboard Header Navigation (Functionality Restored, Colors Fixed)
const DashboardHeader = ({ activeSection, setActiveSection, account, balance,connectWallet, copyAddress, copied }) => {
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);

  const sections = [
    { id: 'properties', label: 'My Properties', icon: Home },
    { id: 'transfer', label: 'Initiate Transfer', icon: Send },
    { id: 'requests', label: 'Pending Requests', icon: Clock },
    { id: 'land-status', label: 'Land Status', icon: TrendingUp },
  ];


  const truncateAddress = (address) => {
    return address ? `${address.slice(0, 6)}...${address.slice(-4)}` : 'Not available';
  };

  return (
    <header className="sticky top-0 w-full bg-slate-900 border-b border-slate-800 z-40 shadow-lg shadow-black/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo & Title */}
          <div className="flex items-center space-x-3">
            <div className="bg-emerald-500/10 p-2 rounded-lg border border-emerald-500/20">
              <Home className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white tracking-tight">Go<span className="text-emerald-400">Land</span></h1>
              <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Land Owner Dashboard</p>
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
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-mono text-slate-300 tracking-wide">{truncateAddress(account)}</span>
                    <button onClick={copyAddress} className="text-slate-400 hover:text-emerald-400 p-1 rounded-md">
                      <Copy className="w-4 h-4" />
                    </button>
                    {copied && <span className="text-xs text-emerald-400">Copied</span>}
                  </div>
                ) : (
                  <button onClick={connectWallet} className="text-xs font-mono text-emerald-400 bg-slate-800 px-3 py-1 rounded-md">
                    Connect Wallet---
                  </button>
                )}
             </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsAccountMenuOpen(!isAccountMenuOpen)}
              className="md:hidden p-2 text-slate-300 hover:text-emerald-400 hover:bg-slate-800 rounded-lg transition-colors"
            >
              {isAccountMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isAccountMenuOpen && (
          <div className="md:hidden border-t border-slate-800 py-4 space-y-2 animate-in slide-in-from-top-5 duration-200">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => {
                    setActiveSection(section.id);
                    setIsAccountMenuOpen(false);
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
            {/* Mobile Wallet Display */}
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

// My Properties Section
const MyPropertiesSection = ({ lands, onTransferClick, onPropertyClick }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredLands = lands.filter(
    (land) =>
      land.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      land.surveyNo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="bg-slate-900 space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">My Properties</h2>
          <p className="text-slate-400">Manage and view all your registered land parcels</p>
        </div>
        
        <div className="bg-slate-800 border text-white rounded-xl relative w-full md:w-96">
          <Search className="absolute left-4 top-3.5 w-5 h-5 text-slate-500" />
          <input
            type="text"
            placeholder="       Search by location or survey number..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-12 pr-4 py-3 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all shadow-sm"
          />
        </div>
      </div>
      <br />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-white">
        {filteredLands.map((land) => (
          <div
            key={land.id}
            role="button"
            tabIndex={0}
            onClick={() => onPropertyClick(land)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onPropertyClick(land);
              }
            }}
            className="group bg-slate-800 rounded-2xl overflow-hidden hover:border-emerald-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-black/20 cursor-pointer border border-transparent hover:border-emerald-500/20"
          >
            {/* Property Image */}
            <div className="relative w-full h-48 bg-slate-800 overflow-hidden">
              <span className="absolute bottom-3 left-3 text-[10px] font-semibold uppercase tracking-wide text-white/0 group-hover:text-white/90 bg-slate-950/0 group-hover:bg-slate-950/80 px-2 py-1 rounded transition-all z-10">
                View details
              </span>
              <img
                src={land.image}
                alt={land.location}
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
              />
              <div className="absolute top-3 right-3 bg-slate-950/90 backdrop-blur-sm text-emerald-400 border border-emerald-500/20 px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                {land.price}
              </div>
            </div>

            {/* Property Info */}
            <div className="p-6 space-y-5">
              <div>
                <div className="flex items-start justify-between mb-1">
                   <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">{land.location}</h3>
                   <MapPin className="w-5 h-5 text-slate-500" />
                </div>
                <p className="text-xs font-mono text-slate-500 bg-slate-800/50 inline-block px-2 py-1 rounded">ID: {land.surveyNo}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 py-4 border-t border-slate-800">
                <div>
                  <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Area</p>
                  <p className="text-base font-semibold text-slate-200">{land.area} <span className="text-sm text-slate-500">Sq.ft</span></p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Land ID</p>
                  <p className="text-base font-semibold text-emerald-400">#{land.id}</p>
                </div>
              </div>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onTransferClick(land);
                }}
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-3 rounded-xl font-semibold transition-all flex items-center justify-center space-x-2 shadow-lg shadow-emerald-500/20 active:scale-95"
              >
                <Send className="w-4 h-4" />
                <span>Initiate Transfer</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredLands.length === 0 && (
        <div className="text-center py-20 bg-slate-900/50 border border-slate-800 border-dashed rounded-2xl">
          <Home className="w-16 h-16 text-slate-800 mx-auto mb-4" />
          <p className="text-slate-400 text-lg">No properties found matching your search</p>
        </div>
      )}
    </section>
  );
};

// Transfer Modal
// const TransferModal = ({ isOpen, land, onClose, transferStatus }) => {//if i dont simulate anymore use this
  const TransferModal = ({ isOpen, land, onClose, setAccount, setMyLands, myLands}) => {
  const [buyerAddress, setBuyerAddress] = useState('');
  const [offerPrice, setOfferPrice] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInitiateTransfer = async () => {
    if (!buyerAddress || !offerPrice) {
      alert('Please fill in all fields');
      return;
    }

    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 800));

      if (land.surveyNo === DEMO_SURVEY_NO) {
        initiateDemoTransfer({
          surveyNo: land.surveyNo,
          landId: land.id,
          propertyLocation: land.location,
          offerAmount: `${offerPrice} ETH`,
          buyer: buyerAddress,
          seller: '0xDEF1234567890ABC1234567890ABC1234567890',
        });
      }

      const updatedLands = myLands.filter(item => item.id !== land.id);
      setMyLands(updatedLands);

      alert(
        land.surveyNo === DEMO_SURVEY_NO
          ? `Transfer of Land #${land.id} initiated! A pending activity was created on the Official portal.`
          : `Transfer of Land #${land.id} initiated! Now switch to the Buyer wallet to claim it.`
      );
      setBuyerAddress('');
      setOfferPrice('');
      onClose();
    } catch (error) {
      console.error('Transfer failed:', error);
      alert('Failed to initiate transfer. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };


    //when i acutally do the trasnfer and not simulate, this is how i would do it(just replcae the try block)
  //   try {
  //     console.log('Initiating transfer:', {
  //       landId: land.id,
  //       buyerAddress,
  //       offerPrice,
  //     });

  //     // Simulated delay
  //     await new Promise((resolve) => setTimeout(resolve, 1500));

  //     alert('Transfer initiated successfully!');
  //     setBuyerAddress('');
  //     setOfferPrice('');
  //     onClose();
  //   } catch (error) {
  //     console.error('Error initiating transfer:', error);
  //     alert('Failed to initiate transfer. Please try again.');
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };

  if (!isOpen || !land) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 transition-opacity"
        onClick={onClose}
      ></div>

      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-md w-full shadow-2xl shadow-black/50 transform transition-all">
          {/* Header */}
          <div className="flex justify-between items-center p-6 border-b border-slate-800">
            <div>
              <h2 className="text-xl font-bold text-white">Initiate Transfer</h2>
              <p className="text-sm text-slate-400 mt-1 flex items-center gap-1">
                 <MapPin className="w-3 h-3" /> {land.location}
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
          <div className="p-6 space-y-5 text-white">
            {/* Property Details Summary */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-slate-500 text-xs font-bold uppercase tracking-wider">Survey No</span>
                <span className="text-slate-200 font-mono text-sm">{land.surveyNo}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500 text-xs font-bold uppercase tracking-wider">Area</span>
                <span className="text-slate-200 font-medium">{land.area} Sq.ft</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-slate-800">
                <span className="text-slate-400 text-sm">Estimated Value</span>
                <span className="text-emerald-400 font-bold">{land.price}</span>
              </div>
            </div>

            {/* Buyer Address Input */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Buyer Wallet Address
              </label>
              <input
                type="text"
                placeholder="0x..."
                value={buyerAddress}
                onChange={(e) => setBuyerAddress(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
              />
            </div>

            {/* Offer Price Input */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Sale Price (in ETH)
              </label>
              <input
                type="number"
                placeholder="0.00"
                value={offerPrice}
                onChange={(e) => setOfferPrice(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
              />
            </div>

            {/* Terms */}
            <div className="flex gap-3 bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
              <AlertCircle className="w-5 h-5 text-blue-400 flex-shrink-0" />
              <p className="text-xs text-red-300 leading-relaxed">
                This will create a pending transaction on the blockchain. The buyer must accept the offer for the transfer to complete.
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
              onClick={handleInitiateTransfer}
              disabled={isSubmitting}
              className="flex-1 bg-emerald-500 hover:bg-emerald-600 disabled:bg-slate-700 disabled:text-slate-500 text-white py-3 rounded-xl font-bold transition-all flex items-center justify-center space-x-2 shadow-lg shadow-emerald-500/20"
            >
              {isSubmitting ? (
                 <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <Zap className="w-4 h-4" />
              )}
              <span>{isSubmitting ? 'Processing...' : 'Confirm'}</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

// Pending Requests Section
const PendingRequestsSection = ({ requests }) => {
  const getStatusBadge = (status) => {
    return (
      <div className="flex items-center space-x-1.5 bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full">
        <Clock className="w-3 h-3" />
        <span className="text-[10px] font-bold uppercase tracking-wide">{status}</span>
      </div>
    );
  };

  const truncateAddress = (address) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <section className="space-y-6 text-white">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Pending Transfer Requests</h2>
        <p className="text-slate-400">Review and manage incoming transfer offers from buyers</p>
      </div>

      {/* Requests Table */}
      {requests.length > 0 ? (
        <div className="space-y-4">
            {requests.map((request) => (
              <div
                key={request.id}
                className="bg-slate-900 rounded-2xl p-6 hover:bg-slate-800/50 transition-all hover:border-emerald-500/30  "
              >
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center mb-6">
                  {/* Buyer Info */}
                  <div>
                    <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider mb-1">
                      Buyer Address
                    </p>
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center">
                             <Wallet className="w-4 h-4 text-emerald-400" />
                        </div>
                        <p className="text-slate-200 font-mono text-sm">
                        {truncateAddress(request.buyerAddress)}
                        </p>
                    </div>
                  </div>

                  {/* Land Location */}
                  <div>
                    <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider mb-1">
                      Property
                    </p>
                    <p className="text-white font-semibold">{request.landLocation}</p>
                  </div>

                  {/* Offered Price */}
                  <div>
                    <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider mb-1">
                      Offered Price
                    </p>
                    <p className="text-emerald-400 font-bold text-xl">
                      {request.offeredPrice}
                    </p>
                  </div>

                  {/* Status & Time */}
                  <div className="flex flex-col items-end gap-2">
                    {getStatusBadge(request.status)}
                    <span className="text-xs text-slate-500 font-mono">{request.timestamp}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-4 pt-4 border-t border-slate-800">
                  <button className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white py-2.5 rounded-xl font-semibold transition-all flex items-center justify-center space-x-2 shadow-lg shadow-emerald-500/10">
                    <CheckCircle className="w-4 h-4" />
                    <span>Accept Offer</span>
                  </button>
                  <button className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white py-2.5 rounded-xl font-semibold transition-all flex items-center justify-center space-x-2">
                    <X className="w-4 h-4" />
                    <span>Reject</span>
                  </button>
                </div>
              </div>
            ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-slate-900  ">
          <Clock className="w-16 h-16 text-slate-800 mx-auto mb-4" />
          <p className="text-slate-400 text-lg">No pending requests at the moment</p>
        </div>
      )}
    </section>
  );
};

// Main Dashboard Component
const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeSection, setActiveSection] = useState('properties');
  const [account, setAccount] = useState(null); // connected wallet address, null when not connected
  const [balance, setBalance] = useState(0);
  const [myLands, setMyLands] = useState(getSellerProperties);
  const [pendingRequests] = useState(DUMMY_PENDING_REQUESTS);
  const [transferStatus, setTransferStatus] = useState('idle'); // idle, pending, success, error
  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);
  const [selectedLand, setSelectedLand] = useState(null);
  const [copied, setCopied] = useState(false);

  // Connect to MetaMask / Ethereum provider
  const connectWallet = async () => {
    if (!window.ethereum) {
      alert('MetaMask not detected. Please install MetaMask and try again.');
      return;
    }

    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const rawbalance =await window.ethereum.request({
         method: 'eth_getBalance', params: [accounts[0], 'latest'] 
        });
      if (accounts && accounts.length > 0) {
        setAccount(accounts[0]);
      }
      setBalance(ethers.formatEther(rawbalance));
    } catch (err) {
      if (err.code === 4001) {
        // EIP-1193 userRejectedRequest error
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
  
  // Listen for account changes
  useEffect(() => {
    if (!window.ethereum) return;
    const handleAccountsChanged = (accounts) => {
      if (accounts.length === 0) {
        setAccount(null);
      } else {
        setAccount(accounts[0]);
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

  useEffect(() => {
    const openId = location.state?.openTransferFor;
    if (!openId) return;
    const full = getPropertyById(openId);
    if (full) {
      setActiveSection('properties');
      setSelectedLand(toSellerListItem(full));
      setIsTransferModalOpen(true);
    }
    navigate(location.pathname, { replace: true, state: {} });
  }, [location.state, location.pathname, navigate]);

  const handlePropertyClick = (land) => {
    navigate(`/dashboard/property/${land.id}`);
  };

  const handleTransferClick = (land) => {
    setSelectedLand(land);
    setIsTransferModalOpen(true);
  };

  const handleCloseTransferModal = () => {
    setIsTransferModalOpen(false);
    setSelectedLand(null);
  };

  return (
    <div className="bg-slate-900 min-h-screen bg-slate-950 text-slate-200"> {/* FORCE DARK BACKGROUND */}
      <DashboardHeader
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        account={account}
        balance={balance}
        connectWallet={connectWallet}
        copyAddress={copyAddress}
        copied={copied}
      />

      {/* Main Content */}
      <main className="bg-blue-950 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {activeSection === 'properties' && (
          <MyPropertiesSection
            lands={myLands}
            onTransferClick={handleTransferClick}
            onPropertyClick={handlePropertyClick}
          />
        )}

        {activeSection === 'transfer' && (
          <div className="text-center py-20 bg-slate-900 border border-slate-800 rounded-3xl">
            <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
                <Send className="w-8 h-8 text-emerald-500" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-3">Initiate Transfer</h2>
            <p className="text-slate-400 mb-8 max-w-md mx-auto">
              Please select a property from the "My Properties" tab to begin the ownership transfer process.
            </p>
            <button
              onClick={() => setActiveSection('properties')}
              className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg shadow-emerald-500/20 inline-flex items-center space-x-2"
            >
              <Home className="w-5 h-5" />
              <span>Go to My Properties</span>
            </button>
          </div>
        )}

        {activeSection === 'requests' && (
          <PendingRequestsSection requests={pendingRequests} />
        )}

        {activeSection === 'land-status' && <Progress />}
      </main>

      {/* Transfer Modal */}
      <TransferModal
        isOpen={isTransferModalOpen}
        land={selectedLand}
        onClose={handleCloseTransferModal}
        transferStatus={transferStatus}
        myLands={myLands}        // Added
        setMyLands={setMyLands}
      />
    </div>
  );
};

export default Dashboard;


// import React, { useState } from 'react';
// import {
//   Wallet,
//   Home,
//   Send,
//   Clock,
//   Plus,
//   ChevronDown,
//   Search,
//   MapPin,
//   Zap,
//   X,
//   CheckCircle,
//   AlertCircle,
// } from 'lucide-react';

// // Dummy data for myLands
// const DUMMY_LANDS = [
//   {
//     id: 101,
//     location: 'Pune, Maharashtra',
//     area: 1200,
//     price: '25 ETH',
//     surveyNo: 'PUNE-2024-001',
//     image: 'https://via.placeholder.com/300x200?text=Property+101',
//   },
//   {
//     id: 102,
//     location: 'Mumbai, Maharashtra',
//     area: 1500,
//     price: '35 ETH',
//     surveyNo: 'MUMBAI-2024-002',
//     image: 'https://via.placeholder.com/300x200?text=Property+102',
//   },
//   {
//     id: 103,
//     location: 'Bangalore, Karnataka',
//     area: 2000,
//     price: '45 ETH',
//     surveyNo: 'BANGALORE-2024-003',
//     image: 'https://via.placeholder.com/300x200?text=Property+103',
//   },
// ];

// // Dummy pending requests
// const DUMMY_PENDING_REQUESTS = [
//   {
//     id: 1,
//     buyerAddress: '0x742d35Cc6634C0532925a3b844Bc622e4A8a4C0f',
//     landId: 101,
//     landLocation: 'Pune, Maharashtra',
//     offeredPrice: '24 ETH',
//     timestamp: '2024-02-01 10:30:00',
//     status: 'pending',
//   },
//   {
//     id: 2,
//     buyerAddress: '0x8ba1f109551bD432803012645Ac136ddd64DBA72',
//     landId: 102,
//     landLocation: 'Mumbai, Maharashtra',
//     offeredPrice: '34 ETH',
//     timestamp: '2024-01-31 15:45:00',
//     status: 'pending',
//   },
// ];

// // Dashboard Header Navigation
// const DashboardHeader = ({ activeSection, setActiveSection, account }) => {
//   const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);

//   const sections = [
//     { id: 'properties', label: 'My Properties', icon: Home },
//     { id: 'transfer', label: 'Initiate Transfer', icon: Send },
//     { id: 'requests', label: 'Pending Requests', icon: Clock },
//   ];

//   const truncateAddress = (address) => {
//     return address ? `${address.slice(0, 6)}...${address.slice(-4)}` : 'Not Connected';
//   };

//   return (
//     <header className="sticky top-0 w-full bg-slate-950 border-b border-slate-800 z-40">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-16">
//           {/* Logo & Title */}
//           <div className="flex items-center space-x-3">
//             <div className="bg-emerald-400 p-2 rounded-lg">
//               <Home className="w-6 h-6 text-slate-950" />
//             </div>
//             <div>
//               <h1 className="text-xl font-bold text-white">GoLand</h1>
//               <p className="text-xs text-slate-400">Land Owner Dashboard</p>
//             </div>
//           </div>

//           {/* Navigation Tabs */}
//           <nav className="hidden md:flex space-x-2">
//             {sections.map((section) => {
//               const Icon = section.icon;
//               return (
//                 <button
//                   key={section.id}
//                   onClick={() => setActiveSection(section.id)}
//                   className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
//                     activeSection === section.id
//                       ? 'bg-emerald-400/20 text-emerald-400 border border-emerald-400/50'
//                       : 'text-slate-300 hover:text-emerald-400 hover:bg-slate-800'
//                   }`}
//                 >
//                   <Icon className="w-4 h-4" />
//                   <span className="text-sm font-medium">{section.label}</span>
//                 </button>
//               );
//             })}
//           </nav>

//           {/* Account Info */}
//           <div className="flex items-center space-x-4">
//             <div className="hidden sm:flex items-center space-x-2 bg-slate-800 px-4 py-2 rounded-lg border border-slate-700">
//               <Wallet className="w-4 h-4 text-emerald-400" />
//               <span className="text-sm text-slate-300">{truncateAddress(account)}</span>
//             </div>

//             {/* Mobile Menu Button */}
//             <button
//               onClick={() => setIsAccountMenuOpen(!isAccountMenuOpen)}
//               className="md:hidden flex items-center space-x-2 text-slate-300 hover:text-emerald-400"
//             >
//               <ChevronDown className="w-5 h-5" />
//             </button>
//           </div>
//         </div>

//         {/* Mobile Navigation */}
//         {isAccountMenuOpen && (
//           <div className="md:hidden border-t border-slate-800 py-4 space-y-2">
//             {sections.map((section) => {
//               const Icon = section.icon;
//               return (
//                 <button
//                   key={section.id}
//                   onClick={() => {
//                     setActiveSection(section.id);
//                     setIsAccountMenuOpen(false);
//                   }}
//                   className={`w-full flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
//                     activeSection === section.id
//                       ? 'bg-emerald-400/20 text-emerald-400'
//                       : 'text-slate-300 hover:text-emerald-400'
//                   }`}
//                 >
//                   <Icon className="w-4 h-4" />
//                   <span>{section.label}</span>
//                 </button>
//               );
//             })}
//           </div>
//         )}
//       </div>
//     </header>
//   );
// };

// // My Properties Section
// const MyPropertiesSection = ({ lands, onTransferClick }) => {
//   const [searchTerm, setSearchTerm] = useState('');

//   const filteredLands = lands.filter(
//     (land) =>
//       land.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       land.surveyNo.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <section className="space-y-6">
//       <div>
//         <h2 className="text-2xl font-bold text-white mb-2">My Properties</h2>
//         <p className="text-slate-400">Manage and view all your registered land parcels</p>
//       </div>

//       {/* Search Bar */}
//       <div className="relative">
//         <Search className="absolute left-4 top-3 w-5 h-5 text-slate-400" />
//         <input
//           type="text"
//           placeholder="Search by location or survey number..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-12 pr-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400"
//         />
//       </div>

//       {/* Properties Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {filteredLands.map((land) => (
//           <div
//             key={land.id}
//             className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden hover:border-emerald-400/50 transition-all hover:shadow-lg"
//           >
//             {/* Property Image */}
//             <div className="relative w-full h-48 bg-slate-700 overflow-hidden">
//               <img
//                 src={land.image}
//                 alt={land.location}
//                 className="w-full h-full object-cover"
//               />
//               <div className="absolute top-0 right-0 bg-emerald-400 text-slate-950 px-3 py-1 m-2 rounded-full text-xs font-bold">
//                 {land.price}
//               </div>
//             </div>

//             {/* Property Info */}
//             <div className="p-6 space-y-4">
//               <div>
//                 <div className="flex items-center space-x-2 mb-2">
//                   <MapPin className="w-4 h-4 text-emerald-400" />
//                   <h3 className="text-lg font-bold text-white">{land.location}</h3>
//                 </div>
//                 <p className="text-sm text-slate-400">Survey No: {land.surveyNo}</p>
//               </div>

//               <div className="grid grid-cols-2 gap-4 py-3 border-t border-b border-slate-700">
//                 <div>
//                   <p className="text-xs text-slate-500 uppercase font-semibold">Area</p>
//                   <p className="text-lg font-bold text-white">{land.area} Sq.ft</p>
//                 </div>
//                 <div>
//                   <p className="text-xs text-slate-500 uppercase font-semibold">Land ID</p>
//                   <p className="text-lg font-bold text-emerald-400">#{land.id}</p>
//                 </div>
//               </div>

//               <button
//                 onClick={() => onTransferClick(land)}
//                 className="w-full bg-emerald-400 hover:bg-emerald-500 text-slate-950 py-2 rounded-lg font-semibold transition-all flex items-center justify-center space-x-2"
//               >
//                 <Send className="w-4 h-4" />
//                 <span>Initiate Transfer</span>
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {filteredLands.length === 0 && (
//         <div className="text-center py-12">
//           <Home className="w-16 h-16 text-slate-700 mx-auto mb-4" />
//           <p className="text-slate-400 text-lg">No properties found</p>
//         </div>
//       )}
//     </section>
//   );
// };

// // Transfer Modal
// const TransferModal = ({ isOpen, land, onClose, transferStatus }) => {
//   const [buyerAddress, setBuyerAddress] = useState('');
//   const [offerPrice, setOfferPrice] = useState('');
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const handleInitiateTransfer = async () => {
//     if (!buyerAddress || !offerPrice) {
//       alert('Please fill in all fields');
//       return;
//     }

//     setIsSubmitting(true);

//     try {
//       // TODO: Hook in the smartContract.methods.initiateTransfer() function here
//       // Example pseudocode:
//       // const result = await smartContract.methods
//       //   .initiateTransfer(land.id, buyerAddress, offerPrice)
//       //   .send({ from: account });
//       //
//       // Update transferStatus state upon success

//       console.log('Initiating transfer:', {
//         landId: land.id,
//         buyerAddress,
//         offerPrice,
//       });

//       // Simulated delay
//       await new Promise((resolve) => setTimeout(resolve, 1500));

//       alert('Transfer initiated successfully!');
//       setBuyerAddress('');
//       setOfferPrice('');
//       onClose();
//     } catch (error) {
//       console.error('Error initiating transfer:', error);
//       alert('Failed to initiate transfer. Please try again.');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   if (!isOpen || !land) return null;

//   return (
//     <>
//       {/* Backdrop */}
//       <div
//         className="fixed inset-0 bg-black/50 z-50"
//         onClick={onClose}
//       ></div>

//       {/* Modal */}
//       <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
//         <div className="bg-slate-800 border border-slate-700 rounded-xl max-w-md w-full shadow-2xl">
//           {/* Header */}
//           <div className="flex justify-between items-center p-6 border-b border-slate-700">
//             <div>
//               <h2 className="text-xl font-bold text-white">Initiate Transfer</h2>
//               <p className="text-sm text-slate-400 mt-1">{land.location}</p>
//             </div>
//             <button
//               onClick={onClose}
//               className="text-slate-400 hover:text-white transition-all"
//             >
//               <X className="w-6 h-6" />
//             </button>
//           </div>

//           {/* Body */}
//           <div className="p-6 space-y-4">
//             {/* Property Details Summary */}
//             <div className="bg-slate-700/50 border border-slate-700 rounded-lg p-4 space-y-2">
//               <div className="flex justify-between">
//                 <span className="text-slate-400 text-sm">Survey No:</span>
//                 <span className="text-white font-semibold">{land.surveyNo}</span>
//               </div>
//               <div className="flex justify-between">
//                 <span className="text-slate-400 text-sm">Area:</span>
//                 <span className="text-white font-semibold">{land.area} Sq.ft</span>
//               </div>
//               <div className="flex justify-between">
//                 <span className="text-slate-400 text-sm">Current Price:</span>
//                 <span className="text-emerald-400 font-semibold">{land.price}</span>
//               </div>
//             </div>

//             {/* Buyer Address Input */}
//             <div>
//               <label className="block text-sm font-semibold text-white mb-2">
//                 Buyer Wallet Address
//               </label>
//               <input
//                 type="text"
//                 placeholder="0x742d35Cc6634C0532925a3b844Bc622e4A8a4C0f"
//                 value={buyerAddress}
//                 onChange={(e) => setBuyerAddress(e.target.value)}
//                 className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400"
//               />
//             </div>

//             {/* Offer Price Input */}
//             <div>
//               <label className="block text-sm font-semibold text-white mb-2">
//                 Offered Price (in ETH)
//               </label>
//               <input
//                 type="number"
//                 placeholder="25.5"
//                 value={offerPrice}
//                 onChange={(e) => setOfferPrice(e.target.value)}
//                 className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400"
//               />
//             </div>

//             {/* Terms */}
//             <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
//               <p className="text-xs text-blue-300">
//                 ⓘ By initiating the transfer, the buyer will receive a smart contract
//                 interaction request. They can accept or reject the offer.
//               </p>
//             </div>
//           </div>

//           {/* Footer */}
//           <div className="flex gap-3 p-6 border-t border-slate-700">
//             <button
//               onClick={onClose}
//               className="flex-1 bg-slate-700 hover:bg-slate-600 text-white py-2 rounded-lg font-semibold transition-all"
//             >
//               Cancel
//             </button>
//             <button
//               onClick={handleInitiateTransfer}
//               disabled={isSubmitting}
//               className="flex-1 bg-emerald-400 hover:bg-emerald-500 disabled:bg-slate-600 text-slate-950 py-2 rounded-lg font-semibold transition-all flex items-center justify-center space-x-2"
//             >
//               <Zap className="w-4 h-4" />
//               <span>{isSubmitting ? 'Processing...' : 'Initiate'}</span>
//             </button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// // Pending Requests Section
// const PendingRequestsSection = ({ requests }) => {
//   const getStatusBadge = (status) => {
//     return (
//       <div className="flex items-center space-x-1 bg-yellow-400/20 text-yellow-300 px-3 py-1 rounded-full">
//         <Clock className="w-3 h-3" />
//         <span className="text-xs font-semibold uppercase">{status}</span>
//       </div>
//     );
//   };

//   const truncateAddress = (address) => {
//     return `${address.slice(0, 6)}...${address.slice(-4)}`;
//   };

//   return (
//     <section className="space-y-6">
//       <div>
//         <h2 className="text-2xl font-bold text-white mb-2">Pending Transfer Requests</h2>
//         <p className="text-slate-400">Review and manage incoming transfer offers from buyers</p>
//       </div>

//       {/* Requests Table */}
//       {requests.length > 0 ? (
//         <div className="overflow-x-auto">
//           <div className="space-y-4">
//             {requests.map((request) => (
//               <div
//                 key={request.id}
//                 className="bg-slate-800 border border-slate-700 rounded-lg p-6 hover:border-emerald-400/50 transition-all"
//               >
//                 <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center mb-4">
//                   {/* Buyer Info */}
//                   <div>
//                     <p className="text-xs text-slate-500 uppercase font-semibold mb-1">
//                       Buyer Address
//                     </p>
//                     <p className="text-white font-mono text-sm">
//                       {truncateAddress(request.buyerAddress)}
//                     </p>
//                   </div>

//                   {/* Land Location */}
//                   <div>
//                     <p className="text-xs text-slate-500 uppercase font-semibold mb-1">
//                       Property
//                     </p>
//                     <p className="text-white font-semibold">{request.landLocation}</p>
//                   </div>

//                   {/* Offered Price */}
//                   <div>
//                     <p className="text-xs text-slate-500 uppercase font-semibold mb-1">
//                       Offered Price
//                     </p>
//                     <p className="text-emerald-400 font-bold text-lg">
//                       {request.offeredPrice}
//                     </p>
//                   </div>

//                   {/* Status & Time */}
//                   <div className="flex items-center justify-between md:justify-end gap-2">
//                     {getStatusBadge(request.status)}
//                     <span className="text-xs text-slate-500">{request.timestamp}</span>
//                   </div>
//                 </div>

//                 {/* Actions */}
//                 <div className="flex gap-3 pt-4 border-t border-slate-700">
//                   <button className="flex-1 bg-emerald-400 hover:bg-emerald-500 text-slate-950 py-2 rounded-lg font-semibold transition-all flex items-center justify-center space-x-2">
//                     <CheckCircle className="w-4 h-4" />
//                     <span>Accept Offer</span>
//                   </button>
//                   <button className="flex-1 bg-slate-700 hover:bg-slate-600 text-white py-2 rounded-lg font-semibold transition-all flex items-center justify-center space-x-2">
//                     <AlertCircle className="w-4 h-4" />
//                     <span>Reject</span>
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       ) : (
//         <div className="text-center py-12 bg-slate-800 border border-slate-700 rounded-lg">
//           <Clock className="w-16 h-16 text-slate-700 mx-auto mb-4" />
//           <p className="text-slate-400 text-lg">No pending requests at the moment</p>
//         </div>
//       )}
//     </section>
//   );
// };

// // Main Dashboard Component
// const Dashboard = () => {
//   const [activeSection, setActiveSection] = useState('properties');
//   const [account, setAccount] = useState('0x742d35Cc6634C0532925a3b844Bc622e4A8a4C0f'); // Dummy account
//   const [myLands] = useState(DUMMY_LANDS);
//   const [pendingRequests] = useState(DUMMY_PENDING_REQUESTS);
//   const [transferStatus, setTransferStatus] = useState('idle'); // idle, pending, success, error
//   const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);
//   const [selectedLand, setSelectedLand] = useState(null);

//   const handleTransferClick = (land) => {
//     setSelectedLand(land);
//     setIsTransferModalOpen(true);
//   };

//   const handleCloseTransferModal = () => {
//     setIsTransferModalOpen(false);
//     setSelectedLand(null);
//   };

//   return (
//     <div className="min-h-screen bg-slate-950">
//       <DashboardHeader
//         activeSection={activeSection}
//         setActiveSection={setActiveSection}
//         account={account}
//       />

//       {/* Main Content */}
//       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//         {activeSection === 'properties' && (
//           <MyPropertiesSection lands={myLands} onTransferClick={handleTransferClick} />
//         )}

//         {activeSection === 'transfer' && (
//           <div className="text-center py-12">
//             <Send className="w-16 h-16 text-slate-700 mx-auto mb-4" />
//             <h2 className="text-2xl font-bold text-white mb-2">Initiate Transfer</h2>
//             <p className="text-slate-400 mb-6">
//               Select a property from "My Properties" to initiate a transfer
//             </p>
//             <button
//               onClick={() => setActiveSection('properties')}
//               className="bg-emerald-400 hover:bg-emerald-500 text-slate-950 px-6 py-2 rounded-lg font-semibold transition-all inline-flex items-center space-x-2"
//             >
//               <Home className="w-4 h-4" />
//               <span>Go to My Properties</span>
//             </button>
//           </div>
//         )}

//         {activeSection === 'requests' && (
//           <PendingRequestsSection requests={pendingRequests} />
//         )}
//       </main>

//       {/* Transfer Modal */}
//       <TransferModal
//         isOpen={isTransferModalOpen}
//         land={selectedLand}
//         onClose={handleCloseTransferModal}
//         transferStatus={transferStatus}
//       />
//     </div>
//   );
// };

// export default Dashboard;
