import { useEffect, useState, useCallback } from 'react';

export const DEMO_SURVEY_NO = 'PUNE-2024-001';
export const DEMO_LAND_ID = 101;

export const PHASES = {
  IDLE: 'idle',
  INITIATED: 'initiated',
  REVIEWING: 'reviewing',
  REVIEW_COMPLETE: 'review_complete',
  FINALIZED: 'finalized',
  REJECTED: 'rejected',
  CLAIMED: 'claimed',
};

const STORAGE_KEY = 'goland_demo_transfer';
const UPDATE_EVENT = 'goland-demo-update';

const defaultState = () => ({ phase: PHASES.IDLE });

const readState = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState();
    const parsed = JSON.parse(raw);
    return { ...defaultState(), ...parsed };
  } catch {
    return defaultState();
  }
};

const writeState = (next) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  window.dispatchEvent(new CustomEvent(UPDATE_EVENT, { detail: next }));
};

export const getDemoState = () => readState();

export const setDemoPhase = (phase, patch = {}) => {
  const current = readState();
  writeState({ ...current, phase, ...patch });
};

export const initiateDemoTransfer = (payload) => {
  writeState({
    phase: PHASES.INITIATED,
    surveyNo: payload.surveyNo,
    landId: payload.landId,
    propertyLocation: payload.propertyLocation,
    offerAmount: payload.offerAmount,
    buyer: payload.buyer,
    seller: payload.seller,
    timestamp: payload.timestamp || new Date().toLocaleString(),
  });
};

export const resetDemoTransfer = () => {
  localStorage.removeItem(STORAGE_KEY);
  window.dispatchEvent(new CustomEvent(UPDATE_EVENT, { detail: defaultState() }));
};

export const useDemoTransfer = () => {
  const [state, setState] = useState(readState);

  const sync = useCallback(() => {
    setState(readState());
  }, []);

  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === STORAGE_KEY || e.key === null) sync();
    };
    const onUpdate = () => sync();

    window.addEventListener('storage', onStorage);
    window.addEventListener(UPDATE_EVENT, onUpdate);
    return () => {
      window.removeEventListener('storage', onStorage);
      window.removeEventListener(UPDATE_EVENT, onUpdate);
    };
  }, [sync]);

  return {
    ...state,
    setPhase: setDemoPhase,
    reset: resetDemoTransfer,
  };
};

export const buildDemoOfficialActivity = (demo) => {
  if (!demo || demo.phase === PHASES.IDLE) return null;
  return {
    id: 'demo-pune',
    isDemo: true,
    propertyLocation: demo.propertyLocation || 'Pune, Maharashtra',
    surveyNo: demo.surveyNo || DEMO_SURVEY_NO,
    offerAmount: demo.offerAmount || '24 ETH',
    timestamp: demo.timestamp || '',
    demoPhase: demo.phase,
    buyer: demo.buyer || '',
    seller: demo.seller || '',
    status: 'pending',
  };
};
