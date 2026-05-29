import { useEffect, useState, useCallback } from 'react';

const STORAGE_KEY = 'goland_transaction_log';
const UPDATE_EVENT = 'goland-tx-log-update';
const SEED_KEY = 'goland_transaction_log_seeded';

export const TX_TYPES = {
  TRANSFER_INITIATED: 'transfer_initiated',
  OWNERSHIP_CLAIMED: 'ownership_claimed',
  OFFER_SUBMITTED: 'offer_submitted',
};

export const TX_STATUS = {
  CONFIRMED: 'confirmed',
  PENDING: 'pending',
  FAILED: 'failed',
};

const generateId = () => {
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const rand = Math.random().toString(36).slice(2, 8);
  return `TX-${date}-${rand}`;
};

const readLog = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const writeLog = (entries) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  window.dispatchEvent(new CustomEvent(UPDATE_EVENT));
};

const seedDemoData = () => {
  if (localStorage.getItem(SEED_KEY)) return;
  const now = Date.now();
  const samples = [
    {
      id: generateId(),
      txHash: 'SIM-seed-seller-001',
      role: 'seller',
      walletAddress: '0xDEF1234567890ABC1234567890ABC1234567890',
      type: TX_TYPES.TRANSFER_INITIATED,
      landId: 101,
      surveyNo: 'PUNE-2024-001',
      propertyLocation: 'Pune, Maharashtra',
      amountEth: '24',
      counterparty: '0x742d35Cc6634C0532925a3b844Bc622e4A8a4C0f',
      status: TX_STATUS.CONFIRMED,
      timestamp: new Date(now - 86400000 * 3).toISOString(),
      network: 'demo',
    },
    {
      id: generateId(),
      txHash: 'SIM-seed-seller-002',
      role: 'seller',
      walletAddress: '0xDEF1234567890ABC1234567890ABC1234567890',
      type: TX_TYPES.TRANSFER_INITIATED,
      landId: 102,
      surveyNo: 'MUMBAI-2024-002',
      propertyLocation: 'Mumbai, Maharashtra',
      amountEth: '33',
      counterparty: '0x8ba1f109551bD432803012645Ac136ddd64DBA72',
      status: TX_STATUS.CONFIRMED,
      timestamp: new Date(now - 86400000 * 10).toISOString(),
      network: 'demo',
    },
    {
      id: generateId(),
      txHash: 'SIM-seed-buyer-001',
      role: 'buyer',
      walletAddress: '0x742d35Cc6634C0532925a3b844Bc622e4A8a4C0f',
      type: TX_TYPES.OFFER_SUBMITTED,
      landId: 101,
      surveyNo: 'PUNE-2024-001',
      propertyLocation: 'Pune, Maharashtra',
      amountEth: '24',
      counterparty: '0xDEF1234567890ABC1234567890ABC1234567890',
      status: TX_STATUS.CONFIRMED,
      timestamp: new Date(now - 86400000 * 5).toISOString(),
      network: 'demo',
    },
    {
      id: generateId(),
      txHash: '0xseed00000000000000000000000000000000000000000000000000000000001',
      role: 'buyer',
      walletAddress: '0x742d35Cc6634C0532925a3b844Bc622e4A8a4C0f',
      type: TX_TYPES.OWNERSHIP_CLAIMED,
      landId: 101,
      surveyNo: 'PUNE-2024-001',
      propertyLocation: 'Pune, Maharashtra',
      amountEth: '35',
      counterparty: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
      status: TX_STATUS.CONFIRMED,
      timestamp: new Date(now - 86400000 * 1).toISOString(),
      network: 'hardhat',
    },
  ];
  writeLog(samples);
  localStorage.setItem(SEED_KEY, 'true');
};

export const ensureTransactionLogSeeded = () => {
  if (readLog().length === 0) seedDemoData();
};

export const appendTransaction = (partial) => {
  ensureTransactionLogSeeded();
  const id = partial.id || generateId();
  const entry = {
    id,
    txHash: partial.txHash || `SIM-${id}`,
    role: partial.role,
    walletAddress: partial.walletAddress || 'not_connected',
    type: partial.type,
    landId: partial.landId ?? null,
    surveyNo: partial.surveyNo || '',
    propertyLocation: partial.propertyLocation || '',
    amountEth: String(partial.amountEth ?? ''),
    counterparty: partial.counterparty || '',
    status: partial.status || TX_STATUS.CONFIRMED,
    timestamp: partial.timestamp || new Date().toISOString(),
    network: partial.network || 'local',
  };
  const next = [entry, ...readLog()];
  writeLog(next);
  return entry;
};

export const getAllTransactions = () => {
  ensureTransactionLogSeeded();
  return readLog();
};

export const getTransactionsByRole = (role) =>
  getAllTransactions()
    .filter((e) => e.role === role)
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

export const getTransactionsForParcel = (surveyNo) =>
  getAllTransactions()
    .filter((e) => e.surveyNo === surveyNo)
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

export const getMergedStakeholderTransactions = () =>
  getAllTransactions().sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

export const useTransactionLog = () => {
  const [entries, setEntries] = useState(() => {
    ensureTransactionLogSeeded();
    return readLog();
  });

  const sync = useCallback(() => {
    setEntries(readLog());
  }, []);

  useEffect(() => {
    ensureTransactionLogSeeded();
    const onUpdate = () => sync();
    window.addEventListener(UPDATE_EVENT, onUpdate);
    window.addEventListener('storage', (e) => {
      if (e.key === STORAGE_KEY) sync();
    });
    return () => window.removeEventListener(UPDATE_EVENT, onUpdate);
  }, [sync]);

  return { entries, refresh: sync };
};

export const maskAddress = (address) => {
  if (!address || address === 'not_connected') return '—';
  if (address.length < 12) return address;
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

export const formatTypeLabel = (type) => {
  const labels = {
    [TX_TYPES.TRANSFER_INITIATED]: 'Transfer initiated',
    [TX_TYPES.OWNERSHIP_CLAIMED]: 'Ownership claimed',
    [TX_TYPES.OFFER_SUBMITTED]: 'Offer submitted',
  };
  return labels[type] || type;
};
