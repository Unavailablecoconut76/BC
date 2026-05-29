import land1 from '../../assets/land1.jpg';
import land2 from '../../assets/land2.jpg';
import land3 from '../../assets/land3.jpg';
import land4 from '../../assets/land4.jpg';

export const PROPERTY_CATALOG = {
  101: {
    id: 101,
    displayName: 'Verdant Plateau',
    location: 'Pune, Maharashtra',
    surveyNo: 'PUNE-2024-001',
    regId: 'MH-PUNE-2024-009',
    coordinates: { lat: '18.5204° N', lng: '73.8567° E' },
    area: 12000,
    price: '25 ETH',
    priceEth: '25.00',
    priceUsd: '$62,500.00',
    owner: '0x742d35Cc6634C0532925a3b844Bc622e4A8a4C0f',
    litigationStatus: 'Clean',
    heroImage: land1,
    mapImage: land2,
    detailImage: land3,
    ownershipHistory: { title: 'Clean Chain', subtitle: '3 previous owners verified' },
    topography: { title: 'Level Plateau', subtitle: 'Slope gradient: < 2%' },
    soilQuality: { title: 'Grade A+', subtitle: 'PH Level: 6.8 (Optimal)' },
    description:
      'This premium 12,000 sq.ft plot is situated in the high-growth corridor of Pune West. Featuring rich black soil and direct access to municipal water lines, it is ideal for sustainable residential farming or boutique villa development. All historical encumbrances have been cleared via the GoLand registry.',
    zoning: 'Residential/Agri',
    accessRoad: '12m Internal Road',
    waterSource: 'Dedicated Borewell',
    documents: [
      { title: 'Primary Deed of Transfer', hash: '0x8f2a...9c1b', date: '12 Jan 2024' },
      { title: 'Tax Clearance Certificate', hash: '0x4d1e...7a3f', date: '05 Feb 2024' },
    ],
    agentName: 'Vikram Malhotra',
    agentTitle: 'Senior Land Auditor',
    responseTime: 'Avg. 2h response',
    safeguards: [
      'Funds held in escrow until deed registration',
      'Title verified on-chain before listing',
      'Government mutation support included',
    ],
  },
  102: {
    id: 102,
    displayName: 'Coastal Vista Estate',
    location: 'Mumbai, Maharashtra',
    surveyNo: 'MUMBAI-2024-002',
    regId: 'MH-MUM-2024-014',
    coordinates: { lat: '19.0760° N', lng: '72.8777° E' },
    area: 1500,
    price: '35 ETH',
    priceEth: '35.00',
    priceUsd: '$87,500.00',
    owner: '0x8ba1f109551bD432803012645Ac136ddd64DBA72',
    litigationStatus: 'Clean',
    heroImage: land2,
    mapImage: land1,
    detailImage: land4,
    ownershipHistory: { title: 'Verified Title', subtitle: '2 previous owners on record' },
    topography: { title: 'Gentle Slope', subtitle: 'Slope gradient: 4%' },
    soilQuality: { title: 'Grade A', subtitle: 'PH Level: 7.1' },
    description:
      'A well-connected Mumbai parcel with coastal proximity and established drainage. Suitable for mixed residential use with strong appreciation potential in the western suburb corridor.',
    zoning: 'Residential',
    accessRoad: '18m Main Road Frontage',
    waterSource: 'Municipal + Borewell',
    documents: [
      { title: 'Sale Deed (Registered)', hash: '0x2b9c...4e8d', date: '22 Nov 2023' },
      { title: 'Encumbrance Certificate', hash: '0x7f3a...1c2e', date: '10 Jan 2024' },
    ],
    agentName: 'Priya Deshmukh',
    agentTitle: 'Regional Property Analyst',
    responseTime: 'Avg. 3h response',
    safeguards: [
      'Smart-contract escrow for offer acceptance',
      'Litigation scan completed',
      'Notarized deed templates provided',
    ],
  },
  103: {
    id: 103,
    displayName: 'Silicon Grove Parcel',
    location: 'Bangalore, Karnataka',
    surveyNo: 'BANGALORE-2024-003',
    regId: 'KA-BLR-2024-021',
    coordinates: { lat: '12.9716° N', lng: '77.5946° E' },
    area: 2000,
    price: '45 ETH',
    priceEth: '45.00',
    priceUsd: '$112,450.00',
    owner: '0xaBc1234567890DEF1234567890DEF1234567890',
    litigationStatus: 'Disputed',
    heroImage: land3,
    mapImage: land4,
    detailImage: land1,
    ownershipHistory: { title: 'Under Review', subtitle: 'Boundary dispute filed 2023' },
    topography: { title: 'Undulating', subtitle: 'Slope gradient: 8%' },
    soilQuality: { title: 'Grade B+', subtitle: 'PH Level: 6.5' },
    description:
      'Large-format tech-corridor land with excellent highway access. Note: active boundary clarification with adjacent survey — buyer should review legal pack before offer.',
    zoning: 'Commercial/Agri',
    accessRoad: '24m Highway Service Lane',
    waterSource: 'Shared Reservoir Access',
    documents: [
      { title: 'Survey Settlement Record', hash: '0x9e4b...2f7a', date: '18 Dec 2023' },
      { title: 'Litigation Disclosure Form', hash: '0x1c8d...5b0e', date: '02 Mar 2024' },
    ],
    agentName: 'Arjun Krishnan',
    agentTitle: 'Legal & Title Specialist',
    responseTime: 'Avg. 4h response',
    safeguards: [
      'Disclosure-first listing policy',
      'Independent survey report available',
      'Escrow release tied to clearance milestone',
    ],
  },
  104: {
    id: 104,
    displayName: 'Capital Heights Plot',
    location: 'Delhi, Delhi',
    surveyNo: 'DELHI-2024-004',
    regId: 'DL-NCR-2024-007',
    coordinates: { lat: '28.6139° N', lng: '77.2090° E' },
    area: 1800,
    price: '50 ETH',
    priceEth: '50.00',
    priceUsd: '$125,000.00',
    owner: '0xDEF1234567890ABC1234567890ABC1234567890',
    litigationStatus: 'Clean',
    heroImage: land4,
    mapImage: land3,
    detailImage: land2,
    ownershipHistory: { title: 'Clean Chain', subtitle: '4 owners, fully digitized' },
    topography: { title: 'Flat Urban', subtitle: 'Slope gradient: < 1%' },
    soilQuality: { title: 'Grade A', subtitle: 'PH Level: 7.0 (Urban loam)' },
    description:
      'Prime NCR parcel with metro connectivity and completed utility trunk lines. Ideal for residential towers or plotted development within approved master plan zones.',
    zoning: 'Residential High-Rise',
    accessRoad: '30m Arterial Road',
    waterSource: 'Municipal Grid',
    documents: [
      { title: 'Master Plan Zoning Certificate', hash: '0x5a2f...8d4c', date: '08 Feb 2024' },
      { title: 'Primary Deed of Transfer', hash: '0x3e7b...6a9f', date: '15 Jan 2024' },
    ],
    agentName: 'Neha Kapoor',
    agentTitle: 'NCR Land Consultant',
    responseTime: 'Avg. 1.5h response',
    safeguards: [
      'Registry hash anchored on GoLand chain',
      'Stamp duty estimator included',
      'Priority mutation filing support',
    ],
  },
};

export const getPropertyById = (id) => {
  const numericId = typeof id === 'string' ? parseInt(id, 10) : id;
  return PROPERTY_CATALOG[numericId] ?? null;
};

export const toSellerListItem = (property) => ({
  id: property.id,
  location: property.location,
  area: property.area,
  price: property.price,
  surveyNo: property.surveyNo,
  image: property.heroImage,
});

export const toMarketplaceListItem = (property) => ({
  id: property.id,
  location: property.location,
  area: property.area,
  price: property.price,
  surveyNo: property.surveyNo,
  owner: property.owner,
  image: property.heroImage,
  litigationStatus: property.litigationStatus,
});

export const getSellerProperties = () =>
  [101, 102, 103].map((id) => toSellerListItem(PROPERTY_CATALOG[id]));

export const getMarketplaceProperties = () =>
  [101, 102, 103, 104].map((id) => toMarketplaceListItem(PROPERTY_CATALOG[id]));
