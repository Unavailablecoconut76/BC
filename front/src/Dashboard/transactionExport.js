const escapeCsv = (value) => {
  const str = String(value ?? '');
  if (str.includes(',') || str.includes('"') || str.includes('\n')) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
};

export const toCsv = (entries) => {
  const headers = [
    'Transaction ID',
    'Tx Hash',
    'Timestamp',
    'Type',
    'Role',
    'Survey No',
    'Land ID',
    'Location',
    'Amount (ETH)',
    'Counterparty',
    'Status',
    'Wallet',
    'Network',
  ];
  const rows = entries.map((e) =>
    [
      e.id,
      e.txHash,
      e.timestamp,
      e.type,
      e.role,
      e.surveyNo,
      e.landId,
      e.propertyLocation,
      e.amountEth,
      e.counterparty,
      e.status,
      e.walletAddress,
      e.network,
    ]
      .map(escapeCsv)
      .join(',')
  );
  return [headers.join(','), ...rows].join('\n');
};

export const toJsonLogger = (entries, meta = {}) => {
  return JSON.stringify(
    {
      exportedAt: new Date().toISOString(),
      recordCount: entries.length,
      ...meta,
      transactions: entries,
    },
    null,
    2
  );
};

export const downloadFile = (filename, content, mimeType) => {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const downloadTransactionsCsv = (entries, role) => {
  const date = new Date().toISOString().slice(0, 10);
  const label = role || 'all';
  downloadFile(
    `goland-${label}-transactions-${date}.csv`,
    toCsv(entries),
    'text/csv;charset=utf-8'
  );
};

export const downloadTransactionsJson = (entries, meta = {}) => {
  const date = new Date().toISOString().slice(0, 10);
  const label = meta.role || 'audit';
  downloadFile(
    `goland-${label}-transactions-${date}.json`,
    toJsonLogger(entries, meta),
    'application/json'
  );
};
