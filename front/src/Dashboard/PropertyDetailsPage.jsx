import React from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import {
  ChevronRight,
  Share2,
  Heart,
  Clock,
  Mountain,
  FlaskConical,
  Download,
  CheckCircle,
  Shield,
  Send,
  Home,
  AlertCircle,
  FileText,
} from 'lucide-react';
import { getPropertyById } from './propertyCatalog';
import ThemeToggle from '../theme/ThemeToggle';

const MetricCard = ({ icon: Icon, title, subtitle }) => (
  <div className="bg-white/90 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-2xl p-5">
    <div className="flex items-start gap-4">
      <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <p className="text-slate-900 dark:text-white font-semibold">{title}</p>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">{subtitle}</p>
      </div>
    </div>
  </div>
);

const PropertyDetailsPage = ({ variant }) => {
  const { propertyId } = useParams();
  const navigate = useNavigate();
  const property = getPropertyById(propertyId);

  const isBuyer = variant === 'buyer';
  const dashboardPath = isBuyer ? '/dashboardbuyer' : '/dashboard';
  const breadcrumbParent = isBuyer ? 'MARKETPLACE' : 'MY PROPERTIES';

  if (!property) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-[#0b1220] text-slate-600 dark:text-slate-300 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <AlertCircle className="w-12 h-12 text-slate-500 dark:text-slate-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Property not found</h1>
          <p className="text-slate-500 dark:text-slate-400 mb-6">No parcel matches ID {propertyId}.</p>
          <Link
            to={dashboardPath}
            className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-xl font-semibold"
          >
            Back to dashboard
          </Link>
        </div>
      </div>
    );
  }

  const handlePrimaryCta = () => {
    if (isBuyer) {
      navigate('/dashboardbuyer', { state: { openOfferFor: property.id } });
    } else {
      navigate('/dashboard', { state: { openTransferFor: property.id } });
    }
  };

  const handleContactAgent = () => {
    window.alert(`Contact ${property.agentName} (${property.agentTitle}) — demo placeholder.`);
  };

  const isClean = property.litigationStatus === 'Clean';

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0b1220] text-slate-600 dark:text-slate-300">
      <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 border-b border-slate-200 dark:border-slate-800 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to={dashboardPath} className="flex items-center space-x-3">
            <div className="bg-emerald-500/10 p-2 rounded-lg border border-emerald-500/20">
              <Home className="w-5 h-5 text-emerald-400" />
            </div>
            <span className="text-lg font-bold text-slate-900 dark:text-white">
              Go<span className="text-emerald-400">Land</span>
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link
              to={dashboardPath}
              className="text-sm text-slate-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
            >
              Back to dashboard
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <nav className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-500">
          <Link to={dashboardPath} className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
            {breadcrumbParent}
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-emerald-400">Property Details</span>
        </nav>

        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">
              {property.displayName}, {property.location.split(',')[1]?.trim() || property.location}
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-2 font-mono">
              REG-ID: {property.regId} • Latitude: {property.coordinates.lat}, Longitude:{' '}
              {property.coordinates.lng}
            </p>
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-slate-300 dark:border-slate-600 text-sm"
            >
              <Share2 className="w-4 h-4" />
              Share
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-slate-300 dark:border-slate-600 text-sm"
            >
              <Heart className="w-4 h-4" />
              Save
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 relative rounded-2xl overflow-hidden h-64 sm:h-80 lg:h-96 border border-slate-200 dark:border-slate-700">
            <img
              src={property.heroImage}
              alt={property.displayName}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-4 left-4 flex gap-2">
              <span className="bg-white/90 dark:bg-slate-950/80 text-emerald-400 text-[10px] font-bold uppercase tracking-wide px-2 py-1 rounded border border-emerald-500/30">
                Drone View
              </span>
              <span className="bg-white/90 dark:bg-slate-950/80 text-white text-[10px] font-bold uppercase tracking-wide px-2 py-1 rounded border border-slate-300 dark:border-slate-600">
                Ultra-HD
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="relative flex-1 min-h-[140px] rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700">
              <img
                src={property.mapImage}
                alt="Map view"
                className="w-full h-full object-cover opacity-90"
              />
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950 to-transparent p-3">
                <p className="text-[10px] text-emerald-400 font-semibold">
                  Coordinates Locked — Verified via Blockchain
                </p>
              </div>
            </div>
            <div className="relative flex-1 min-h-[140px] rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700">
              <img
                src={property.detailImage}
                alt="Detail view"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <MetricCard
            icon={Clock}
            title={property.ownershipHistory.title}
            subtitle={property.ownershipHistory.subtitle}
          />
          <MetricCard
            icon={Mountain}
            title={property.topography.title}
            subtitle={property.topography.subtitle}
          />
          <MetricCard
            icon={FlaskConical}
            title={property.soilQuality.title}
            subtitle={property.soilQuality.subtitle}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <section>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Property Overview</h2>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed">{property.description}</p>
              <div className="grid grid-cols-2 gap-4 mt-6">
                {[
                  { label: 'Total Area', value: `${property.area.toLocaleString()} Sq.ft` },
                  { label: 'Zoning', value: property.zoning },
                  { label: 'Access Road', value: property.accessRoad },
                  { label: 'Water Source', value: property.waterSource },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="bg-slate-100/80 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl p-4"
                  >
                    <p className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-500 tracking-wider">
                      {item.label}
                    </p>
                    <p className="text-slate-900 dark:text-white font-semibold mt-1">{item.value}</p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">Legal Infrastructure</h2>
                <button
                  type="button"
                  className="text-xs font-semibold text-emerald-400 hover:text-emerald-300"
                >
                  Verify All
                </button>
              </div>
              <div className="space-y-3">
                {property.documents.map((doc) => (
                  <div
                    key={doc.title}
                    className="flex items-center justify-between bg-slate-100/80 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl p-4"
                  >
                    <div>
                      <p className="text-slate-900 dark:text-white font-medium text-sm">{doc.title}</p>
                      <p className="text-slate-500 dark:text-slate-500 text-xs font-mono mt-1">
                        {doc.hash} • {doc.date}
                      </p>
                    </div>
                    <button
                      type="button"
                      className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                      aria-label={`Download ${doc.title}`}
                    >
                      <Download className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <aside className="space-y-6">
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 sticky top-24">
              <div className="flex items-start justify-between mb-4">
                <p className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-500 tracking-wider">
                  Listing Price
                </p>
                <span
                  className={`text-[10px] font-bold uppercase px-2 py-1 rounded-full border ${
                    isClean
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                      : 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30'
                  }`}
                >
                  {property.litigationStatus}
                </span>
              </div>
              <p className="text-4xl font-bold text-emerald-400">{property.priceEth} ETH</p>
              <p className="text-slate-500 dark:text-slate-500 text-sm mt-1">{property.priceUsd}</p>

              <button
                type="button"
                onClick={handlePrimaryCta}
                className="w-full mt-6 bg-emerald-500 hover:bg-emerald-600 text-white py-3.5 rounded-xl font-bold uppercase tracking-wide text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
              >
                {isBuyer ? (
                  <>
                    <Send className="w-4 h-4" />
                    Make Offer
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Initiate Transfer
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={handleContactAgent}
                className="w-full mt-3 border border-slate-300 dark:border-slate-600 hover:border-slate-500 text-white py-3 rounded-xl font-semibold text-sm transition-colors"
              >
                Contact Agent
              </button>

              <button
                type="button"
                onClick={() =>
                  navigate(dashboardPath, { state: { filterSurveyNo: property.surveyNo } })
                }
                className="w-full mt-4 flex items-center justify-center gap-2 text-sm text-emerald-600 dark:text-emerald-400 hover:underline font-medium"
              >
                <FileText className="w-4 h-4" />
                View transaction log for this parcel
              </button>

              <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700 space-y-3">
                <p className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-500 tracking-wider">
                  Transaction Safe-Guards
                </p>
                {property.safeguards.map((item) => (
                  <div key={item} className="flex gap-2 text-xs text-slate-500 dark:text-slate-400">
                    <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold">
                  {property.agentName.charAt(0)}
                </div>
                <div>
                  <p className="text-slate-900 dark:text-white font-semibold text-sm">{property.agentName}</p>
                  <p className="text-slate-500 dark:text-slate-500 text-xs">{property.agentTitle}</p>
                  <p className="text-emerald-400/80 text-xs mt-0.5">{property.responseTime}</p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>

      <footer className="border-t border-slate-200 dark:border-slate-800 mt-12 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-500">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-emerald-500" />
            <span>
              Go<span className="text-emerald-400">Land</span> © {new Date().getFullYear()}
            </span>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <span className="hover:text-slate-500 dark:text-slate-400 cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-500 dark:text-slate-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-500 dark:text-slate-400 cursor-pointer">Blockchain Verification</span>
            <span className="hover:text-slate-500 dark:text-slate-400 cursor-pointer">Support</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PropertyDetailsPage;
