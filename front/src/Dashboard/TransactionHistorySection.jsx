import React, { useEffect, useMemo, useState } from 'react';
import { Download, FileJson, Search, Copy, Check, ChevronDown, ChevronUp } from 'lucide-react';
import {
  getTransactionsByRole,
  formatTypeLabel,
  maskAddress,
  useTransactionLog,
} from './transactionLogStore';
import { downloadTransactionsCsv, downloadTransactionsJson } from './transactionExport';
import { getMarketplaceProperties, getSellerProperties } from './propertyCatalog';

const StatusBadge = ({ status }) => {
  const styles = {
    confirmed: 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-500/30',
    pending: 'bg-yellow-50 dark:bg-yellow-500/10 text-yellow-700 dark:text-yellow-300 border-yellow-200 dark:border-yellow-500/30',
    failed: 'bg-red-50 dark:bg-red-500/10 text-red-700 dark:text-red-300 border-red-200 dark:border-red-500/30',
  };
  return (
    <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold uppercase border ${styles[status] || styles.pending}`}>
      {status}
    </span>
  );
};

const TransactionHistorySection = ({ role, initialSurveyFilter = '' }) => {
  useTransactionLog();
  const [search, setSearch] = useState('');
  const [parcelFilter, setParcelFilter] = useState(initialSurveyFilter || 'all');
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    if (initialSurveyFilter) setParcelFilter(initialSurveyFilter);
  }, [initialSurveyFilter]);
  const [copiedHash, setCopiedHash] = useState(null);

  const parcelOptions = useMemo(() => {
    const list = role === 'seller' ? getSellerProperties() : getMarketplaceProperties();
    return list.map((p) => ({ surveyNo: p.surveyNo, label: `${p.surveyNo} — ${p.location}` }));
  }, [role]);

  const filtered = useMemo(() => {
    let rows = getTransactionsByRole(role);
    if (parcelFilter && parcelFilter !== 'all') {
      rows = rows.filter((e) => e.surveyNo === parcelFilter);
    }
    const q = search.trim().toLowerCase();
    if (q) {
      rows = rows.filter(
        (e) =>
          e.surveyNo?.toLowerCase().includes(q) ||
          e.propertyLocation?.toLowerCase().includes(q) ||
          e.txHash?.toLowerCase().includes(q) ||
          e.id?.toLowerCase().includes(q)
      );
    }
    return rows;
  }, [role, parcelFilter, search]);

  const copyHash = async (hash) => {
    try {
      await navigator.clipboard.writeText(hash);
      setCopiedHash(hash);
      setTimeout(() => setCopiedHash(null), 2000);
    } catch {
      // ignore
    }
  };

  const handleCsv = () => downloadTransactionsCsv(filtered, role);
  const handleJson = () => downloadTransactionsJson(filtered, { role, filter: parcelFilter, search });

  return (
    <section className="bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white space-y-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-8">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Transaction History</h1>
          <p className="text-slate-600 dark:text-slate-400 text-sm max-w-xl">
            Downloadable audit log of wallet-related activity for your {role === 'seller' ? 'sales' : 'purchases'}.
            Each row includes parcel, amount, counterparty, and transaction ID.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={handleCsv}
            disabled={filtered.length === 0}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-white text-sm font-semibold shadow-lg shadow-slate-200/70 dark:shadow-black/20"
          >
            <Download className="w-4 h-4" />
            Download CSV
          </button>
          <button
            type="button"
            onClick={handleJson}
            disabled={filtered.length === 0}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-sm font-semibold"
          >
            <FileJson className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            Download JSON
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search survey no, location, tx hash..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm"
          />
        </div>
        <select
          value={parcelFilter}
          onChange={(e) => setParcelFilter(e.target.value)}
          className="w-full py-2.5 px-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm"
        >
          <option value="all">All parcels</option>
          {parcelOptions.map((p) => (
            <option key={p.surveyNo} value={p.surveyNo}>
              {p.label}
            </option>
          ))}
        </select>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-slate-800 border border-dashed border-slate-200 dark:border-slate-700 rounded-2xl">
          <p className="text-slate-600 dark:text-slate-400">No transactions match your filters.</p>
          <p className="text-slate-500 text-sm mt-2">
            {role === 'seller'
              ? 'Initiate a transfer from My Properties to record an entry.'
              : 'Make an offer or finalize a claim to record an entry.'}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((row) => (
            <div
              key={row.id}
              className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl overflow-hidden shadow-md shadow-slate-200/60 dark:shadow-black/20"
            >
              <div className="p-4 grid grid-cols-1 md:grid-cols-6 gap-3 items-start">
                <div className="md:col-span-2">
                  <p className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Timestamp</p>
                  <p className="text-sm font-mono text-slate-700 dark:text-slate-300">
                    {new Date(row.timestamp).toLocaleString()}
                  </p>
                  <p className="text-xs text-slate-500 mt-1 font-mono">{row.id}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Type</p>
                  <p className="text-sm font-medium">{formatTypeLabel(row.type)}</p>
                  <StatusBadge status={row.status} />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Parcel</p>
                  <p className="text-sm font-semibold">{row.propertyLocation || '—'}</p>
                  <p className="text-xs font-mono text-slate-500">{row.surveyNo}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Amount</p>
                  <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
                    {row.amountEth ? `${row.amountEth} ETH` : '—'}
                  </p>
                  <p className="text-xs text-slate-500">To: {maskAddress(row.counterparty)}</p>
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Tx Hash</p>
                  <div className="flex items-center gap-1">
                    <code className="text-xs font-mono truncate max-w-[140px]">{row.txHash}</code>
                    <button
                      type="button"
                      onClick={() => copyHash(row.txHash)}
                      className="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500"
                      aria-label="Copy transaction hash"
                    >
                      {copiedHash === row.txHash ? (
                        <Check className="w-4 h-4 text-emerald-500" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => setExpandedId(expandedId === row.id ? null : row.id)}
                    className="text-xs text-emerald-600 dark:text-emerald-400 flex items-center gap-1"
                  >
                    {expandedId === row.id ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                    Details
                  </button>
                </div>
              </div>
              {expandedId === row.id && (
                <pre className="mx-4 mb-4 p-3 text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg overflow-x-auto text-slate-700 dark:text-slate-300">
                  {JSON.stringify(row, null, 2)}
                </pre>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default TransactionHistorySection;
