import React, { useMemo } from 'react';
import { FileJson, Shield } from 'lucide-react';
import {
  getMergedStakeholderTransactions,
  formatTypeLabel,
  maskAddress,
  useTransactionLog,
} from './transactionLogStore';
import { downloadTransactionsJson } from './transactionExport';
import { useDemoTransfer, PHASES } from './demoTransferStore';
import { DEMO_SURVEY_NO } from './demoTransferStore';

const phaseLabel = (phase) => {
  const map = {
    [PHASES.IDLE]: 'No active Pune transfer',
    [PHASES.INITIATED]: 'Seller initiated — awaiting govt review',
    [PHASES.REVIEWING]: 'Government review in progress',
    [PHASES.REVIEW_COMPLETE]: 'Review complete — finalize or reject pending',
    [PHASES.FINALIZED]: 'Finalized — buyer may claim',
    [PHASES.REJECTED]: 'Rejected by office',
    [PHASES.CLAIMED]: 'Buyer claimed ownership',
  };
  return map[phase] || phase;
};

const StakeholderActivitySection = () => {
  const demo = useDemoTransfer();
  const { entries } = useTransactionLog();
  const merged = useMemo(() => getMergedStakeholderTransactions(), [entries]);

  const handleAuditExport = () => {
    downloadTransactionsJson(merged, {
      role: 'stakeholder_audit',
      demoTransferPhase: demo.phase,
      demoSurveyNo: DEMO_SURVEY_NO,
      note: 'Combined seller and buyer transaction log for government transparency demo',
    });
  };

  return (
    <section className="bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white space-y-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-8">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Stakeholder Activity</h1>
          <p className="text-slate-600 dark:text-slate-400 text-sm max-w-2xl">
            Read-only view of seller and buyer transaction records, plus current demo transfer status
            for the Pune parcel ({DEMO_SURVEY_NO}).
          </p>
        </div>
        <button
          type="button"
          onClick={handleAuditExport}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold"
        >
          <FileJson className="w-4 h-4" />
          Download combined audit JSON
        </button>
      </div>

      <div className="bg-white dark:bg-slate-800 border border-emerald-200 dark:border-emerald-500/30 rounded-2xl p-6 flex items-start gap-4">
        <div className="p-3 rounded-xl bg-emerald-500/10">
          <Shield className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
        </div>
        <div>
          <p className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Demo transfer status</p>
          <p className="text-lg font-semibold text-emerald-700 dark:text-emerald-300 mt-1">
            {phaseLabel(demo.phase)}
          </p>
          {demo.propertyLocation && (
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
              {demo.propertyLocation} · Offer {demo.offerAmount || '—'} · Buyer {maskAddress(demo.buyer)}
            </p>
          )}
        </div>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
        <table className="w-full text-sm text-left">
          <thead className="bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 uppercase text-[10px] tracking-wider">
            <tr>
              <th className="px-4 py-3">Time</th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Parcel</th>
              <th className="px-4 py-3">Amount</th>
              <th className="px-4 py-3">Wallet</th>
              <th className="px-4 py-3">Tx</th>
            </tr>
          </thead>
          <tbody>
            {merged.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-slate-500">
                  No stakeholder transactions recorded yet.
                </td>
              </tr>
            ) : (
              merged.map((row) => (
                <tr
                  key={row.id}
                  className="border-t border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/80"
                >
                  <td className="px-4 py-3 font-mono text-xs whitespace-nowrap">
                    {new Date(row.timestamp).toLocaleString()}
                  </td>
                  <td className="px-4 py-3 capitalize">{row.role}</td>
                  <td className="px-4 py-3">{formatTypeLabel(row.type)}</td>
                  <td className="px-4 py-3">
                    <div className="font-medium">{row.surveyNo}</div>
                    <div className="text-xs text-slate-500">{row.propertyLocation}</div>
                  </td>
                  <td className="px-4 py-3 text-emerald-600 dark:text-emerald-400 font-semibold">
                    {row.amountEth ? `${row.amountEth} ETH` : '—'}
                  </td>
                  <td className="px-4 py-3 font-mono text-xs">{maskAddress(row.walletAddress)}</td>
                  <td className="px-4 py-3 font-mono text-xs max-w-[120px] truncate" title={row.txHash}>
                    {row.txHash}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default StakeholderActivitySection;
