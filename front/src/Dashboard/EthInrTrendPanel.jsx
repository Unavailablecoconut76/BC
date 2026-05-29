import React, { useEffect, useState, useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { TrendingUp, RefreshCw, AlertCircle } from 'lucide-react';
import { useTheme } from '../theme/ThemeContext';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const DEMO_INR = [245000, 248500, 251200, 249800, 253400, 255100, 257800];
const DEMO_USD = [3200, 3250, 3180, 3220, 3280, 3310, 3350];

const buildLabels = (days) => {
  const labels = [];
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    labels.push(d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' }));
  }
  return labels;
};

const fetchMarketChart = async (days, currency) => {
  const res = await fetch(
    `https://api.coingecko.com/api/v3/coins/ethereum/market_chart?vs_currency=${currency}&days=${days}`
  );
  if (!res.ok) throw new Error('Chart fetch failed');
  const data = await res.json();
  const prices = data.prices?.map((p) => p[1]) || [];
  return prices.slice(-days);
};

const fetchSpot = async () => {
  const res = await fetch(
    'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=inr,usd'
  );
  if (!res.ok) throw new Error('Spot fetch failed');
  const data = await res.json();
  return {
    inr: data.ethereum?.inr,
    usd: data.ethereum?.usd,
  };
};

const EthInrTrendPanel = () => {
  const { isDark } = useTheme();
  const [days, setDays] = useState(7);
  const [currency, setCurrency] = useState('inr');
  const [prices, setPrices] = useState([]);
  const [spot, setSpot] = useState(null);
  const [loading, setLoading] = useState(true);
  const [usingDemo, setUsingDemo] = useState(false);
  const [error, setError] = useState(null);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const [chartData, spotData] = await Promise.all([
        fetchMarketChart(days, currency),
        fetchSpot(),
      ]);
      setPrices(chartData.length ? chartData : currency === 'inr' ? DEMO_INR : DEMO_USD);
      setSpot(spotData);
      setUsingDemo(false);
    } catch (err) {
      console.warn('Market data fallback', err);
      setPrices(currency === 'inr' ? DEMO_INR : DEMO_USD);
      setSpot({ inr: DEMO_INR[DEMO_INR.length - 1], usd: DEMO_USD[DEMO_USD.length - 1] });
      setUsingDemo(true);
      setError('Live rates unavailable — showing demo data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [days, currency]);

  const labels = useMemo(() => {
    if (prices.length === days) return buildLabels(days);
    return prices.map((_, i) => `Day ${i + 1}`);
  }, [prices, days]);

  const gridColor = isDark ? 'rgba(148, 163, 184, 0.15)' : 'rgba(148, 163, 184, 0.35)';
  const textColor = isDark ? '#94a3b8' : '#64748b';

  const chartData = {
    labels,
    datasets: [
      {
        label: currency === 'inr' ? 'ETH (INR)' : 'ETH (USD)',
        data: prices,
        borderColor: '#10b981',
        backgroundColor: isDark ? 'rgba(16, 185, 129, 0.15)' : 'rgba(16, 185, 129, 0.12)',
        fill: true,
        tension: 0.35,
        pointRadius: 3,
        pointHoverRadius: 5,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { labels: { color: textColor } },
      tooltip: {
        callbacks: {
          label: (ctx) => {
            const val = ctx.parsed.y;
            return currency === 'inr'
              ? `₹${val.toLocaleString(undefined, { maximumFractionDigits: 0 })}`
              : `$${val.toLocaleString(undefined, { maximumFractionDigits: 2 })}`;
          },
        },
      },
    },
    scales: {
      x: { ticks: { color: textColor }, grid: { color: gridColor } },
      y: {
        ticks: {
          color: textColor,
          callback: (v) =>
            currency === 'inr'
              ? `₹${(v / 1000).toFixed(0)}k`
              : `$${v.toLocaleString()}`,
        },
        grid: { color: gridColor },
      },
    },
  };

  const spotDisplay =
    currency === 'inr' && spot?.inr
      ? `₹${spot.inr.toLocaleString(undefined, { maximumFractionDigits: 0 })}`
      : spot?.usd
      ? `$${spot.usd.toLocaleString(undefined, { maximumFractionDigits: 2 })}`
      : '—';

  return (
    <section className="bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white space-y-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
            <TrendingUp className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Market Insights</h1>
            <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
              ETH price trends in INR and USD — useful for timing land offers and transfers.
            </p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
            {['inr', 'usd'].map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCurrency(c)}
                className={`px-3 py-1.5 text-xs font-bold uppercase ${
                  currency === c
                    ? 'bg-emerald-500 text-white'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
          <div className="flex rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
            {[7, 30].map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => setDays(d)}
                className={`px-3 py-1.5 text-xs font-bold ${
                  days === d
                    ? 'bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white'
                    : 'bg-white dark:bg-slate-800 text-slate-500'
                }`}
              >
                {d}D
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={load}
            className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800"
            aria-label="Refresh rates"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-4">
          <p className="text-[10px] uppercase font-bold text-slate-500">Spot (ETH)</p>
          <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">{spotDisplay}</p>
        </div>
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-4">
          <p className="text-[10px] uppercase font-bold text-slate-500">Range</p>
          <p className="text-lg font-semibold mt-1">{days} day chart</p>
        </div>
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-4">
          <p className="text-[10px] uppercase font-bold text-slate-500">Source</p>
          <p className="text-sm mt-1">{usingDemo ? 'Demo fallback' : 'CoinGecko'}</p>
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-2 text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 rounded-xl px-4 py-3 text-sm">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          {error}
        </div>
      )}

      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-4 h-80">
        {loading && prices.length === 0 ? (
          <div className="h-full flex items-center justify-center text-slate-500">Loading chart…</div>
        ) : (
          <Line data={chartData} options={options} />
        )}
      </div>
    </section>
  );
};

export default EthInrTrendPanel;
