import fs from 'fs';
import path from 'path';

const files = [
  'src/Dashboard/Dashboard.jsx',
  'src/Dashboard/BuyerDashboard.jsx',
  'src/Dashboard/OfficialDashboard.jsx',
  'src/Dashboard/PropertyDetailsPage.jsx',
  'src/Dashboard/Progress.jsx',
];

const replacements = [
  ['bg-[#0b1220]', 'bg-slate-50 dark:bg-[#0b1220]'],
  ['text-[#a8b3cf]', 'text-slate-600 dark:text-[#a8b3cf]'],
  ['bg-slate-950/80', 'bg-white/90 dark:bg-slate-950/80'],
  ['bg-slate-950 px-4', 'bg-slate-100 dark:bg-slate-950 px-4'],
  ['bg-slate-950 border-t', 'bg-slate-100 dark:bg-slate-950 border-t'],
  ['bg-slate-950/90', 'bg-white/95 dark:bg-slate-950/90'],
  ['bg-slate-900/50', 'bg-slate-100/80 dark:bg-slate-900/50'],
  ['bg-slate-900/95', 'bg-white/95 dark:bg-slate-900/95'],
  ['bg-slate-900 border', 'bg-white dark:bg-slate-900 border'],
  ['bg-slate-900 ', 'bg-slate-50 dark:bg-slate-900 '],
  ['bg-slate-800/50', 'bg-slate-100/80 dark:bg-slate-800/50'],
  ['bg-slate-800/80', 'bg-white/90 dark:bg-slate-800/80'],
  ['bg-slate-800 ', 'bg-white dark:bg-slate-800 '],
  ['bg-slate-800\n', 'bg-white dark:bg-slate-800\n'],
  ['bg-slate-700/50', 'bg-slate-200/80 dark:bg-slate-700/50'],
  ['bg-slate-700 ', 'bg-slate-200 dark:bg-slate-700 '],
  ['bg-slate-700"', 'bg-slate-200 dark:bg-slate-700"'],
  ['border-slate-800', 'border-slate-200 dark:border-slate-800'],
  ['border-slate-700/50', 'border-slate-200 dark:border-slate-700/50'],
  ['border-slate-700', 'border-slate-200 dark:border-slate-700'],
  ['border-slate-600', 'border-slate-300 dark:border-slate-600'],
  ['text-slate-300', 'text-slate-600 dark:text-slate-300'],
  ['text-slate-400', 'text-slate-500 dark:text-slate-400'],
  ['text-slate-500', 'text-slate-500 dark:text-slate-500'],
  ['text-slate-200', 'text-slate-700 dark:text-slate-200'],
  ['hover:bg-slate-800', 'hover:bg-slate-100 dark:hover:bg-slate-800'],
  ['hover:bg-slate-700', 'hover:bg-slate-100 dark:hover:bg-slate-700'],
  ['hover:bg-slate-700/50', 'hover:bg-slate-100 dark:hover:bg-slate-700/50'],
  ['hover:text-white', 'hover:text-slate-900 dark:hover:text-white'],
  ['hover:text-emerald-400', 'hover:text-emerald-600 dark:hover:text-emerald-400'],
  ['hover:border-slate-600', 'hover:border-slate-400 dark:hover:border-slate-600'],
  ['shadow-black/20', 'shadow-slate-200/70 dark:shadow-black/20'],
  ['shadow-black/10', 'shadow-slate-200/60 dark:shadow-black/10'],
  ['shadow-black/50', 'shadow-slate-300/50 dark:shadow-black/50'],
  ['bg-black/50', 'bg-slate-900/40 dark:bg-black/50'],
  ['bg-slate-950/80 backdrop-blur', 'bg-white/90 dark:bg-slate-950/80 backdrop-blur'],
  ['fixed inset-0 bg-slate-950/80', 'fixed inset-0 bg-slate-900/40 dark:bg-slate-950/80'],
  ['group-hover:text-emerald-400', 'group-hover:text-emerald-600 dark:group-hover:text-emerald-400'],
  ['disabled:bg-slate-700', 'disabled:bg-slate-200 dark:disabled:bg-slate-700'],
  ['disabled:text-slate-500', 'disabled:text-slate-400 dark:disabled:text-slate-500'],
];

const textWhiteReplacements = [
  ['font-bold text-white', 'font-bold text-slate-900 dark:text-white'],
  ['font-semibold text-white', 'font-semibold text-slate-900 dark:text-white'],
  ['text-lg font-bold text-white', 'text-lg font-bold text-slate-900 dark:text-white'],
  ['text-xl font-bold text-white', 'text-xl font-bold text-slate-900 dark:text-white'],
  ['text-2xl font-bold text-white', 'text-2xl font-bold text-slate-900 dark:text-white'],
  ['text-3xl font-bold text-white', 'text-3xl font-bold text-slate-900 dark:text-white'],
  ['text-4xl font-bold text-white', 'text-4xl font-bold text-slate-900 dark:text-white'],
  ['text-sm font-bold text-white', 'text-sm font-bold text-slate-900 dark:text-white'],
  ['text-white font-semibold', 'text-slate-900 dark:text-white font-semibold'],
  ['text-white font-medium', 'text-slate-900 dark:text-white font-medium'],
  ['text-white mb-', 'text-slate-900 dark:text-white mb-'],
  ['text-white mt-', 'text-slate-900 dark:text-white mt-'],
  ['text-white tracking', 'text-slate-900 dark:text-white tracking'],
  ['text-white group-hover', 'text-slate-900 dark:text-white group-hover'],
  ['<span className="text-white', '<span className="text-slate-900 dark:text-white'],
  ['text-white"', 'text-slate-900 dark:text-white"'],
];

const rootDir = path.resolve(import.meta.dirname, '..');

for (const rel of files) {
  const filePath = path.join(rootDir, rel);
  let content = fs.readFileSync(filePath, 'utf8');

  for (const [from, to] of replacements) {
    if (content.includes(to)) continue;
    content = content.split(from).join(to);
  }

  for (const [from, to] of textWhiteReplacements) {
    if (from.includes('text-white"') && content.includes('dark:text-white"')) {
      // still apply partial
    }
    content = content.split(from).join(to);
  }

  // Fix double dark: prefixes from re-runs
  content = content.replace(/dark:dark:/g, 'dark:');
  content = content.replace(/bg-slate-50 dark:bg-slate-50/g, 'bg-slate-50');
  content = content.replace(/bg-white dark:bg-white/g, 'bg-white');

  fs.writeFileSync(filePath, content);
  console.log('Updated', rel);
}
