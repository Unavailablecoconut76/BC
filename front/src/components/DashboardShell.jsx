import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MaterialIcon from './MaterialIcon';
import HelpPanel from './HelpPanel';

const DashboardShell = ({
  portalTitle = 'GoLand Registry',
  portalSubtitle = 'Portal',
  navItems = [],
  activeSection,
  setActiveSection,
  bottomAction,
  account,
  balance,
  connectWallet,
  copyAddress,
  copied,
  children,
}) => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);

  const truncateAddress = (address) =>
    address ? `${address.slice(0, 6)}...${address.slice(-4)}` : 'Not connected';

  const activeLabel = navItems.find((i) => i.id === activeSection)?.label;

  return (
    <div className="min-h-screen bg-[#F7F5F2] font-sans">
      <header className="fixed top-0 left-0 right-0 h-[72px] z-50 bg-surface-container-lowest border-b border-outline-variant px-4 md:px-margin-desktop flex items-center justify-between">
        <div className="flex items-center gap-md min-w-0">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="font-headline-md font-bold text-primary hover:opacity-90 shrink-0"
          >
            GoLand
          </button>
          {activeLabel && (
            <span className="hidden md:inline text-label-sm text-on-surface-variant truncate">
              / {activeLabel}
            </span>
          )}
        </div>
        <div className="flex items-center gap-sm shrink-0">
          {account ? (
            <button
              type="button"
              onClick={copyAddress}
              className="hidden sm:flex flex-col items-end gap-0 bg-surface-container-low border border-outline-variant rounded-lg px-sm py-xs text-left"
            >
              <span className="flex items-center gap-xs font-code-md text-code-md text-on-surface">
                <span className="w-2 h-2 rounded-full bg-success shrink-0" />
                {truncateAddress(account)}
                {copied && <span className="text-success text-label-sm ml-1">Copied</span>}
              </span>
              {balance != null && balance !== '' && (
                <span className="text-label-sm text-on-surface-variant">
                  {parseFloat(balance).toFixed(4)} ETH
                </span>
              )}
            </button>
          ) : (
            <button
              type="button"
              onClick={connectWallet}
              className="bg-primary text-on-primary px-gutter py-xs rounded-lg text-label-sm font-semibold hover:opacity-90 transition-opacity focus-visible:ring-2 focus-visible:ring-primary/20"
            >
              Connect Wallet
            </button>
          )}
          <button
            type="button"
            className="md:hidden p-xs text-on-surface-variant focus-visible:ring-2 focus-visible:ring-primary/20 rounded-lg"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menu"
          >
            <MaterialIcon name={mobileMenuOpen ? 'close' : 'menu'} size={28} />
          </button>
        </div>
      </header>

      {mobileMenuOpen && (
        <div className="md:hidden fixed top-[72px] left-0 right-0 z-40 bg-surface-container-lowest border-b border-outline-variant p-sm space-y-1 max-h-[60vh] overflow-y-auto">
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                setActiveSection(item.id);
                setMobileMenuOpen(false);
              }}
              className={`w-full flex items-center gap-sm p-sm rounded-lg text-label-sm ${
                activeSection === item.id
                  ? 'bg-primary-container text-on-primary-container font-bold'
                  : 'text-on-surface-variant hover:bg-surface-container-low'
              }`}
            >
              <MaterialIcon name={item.icon} size={24} />
              {item.label}
              {item.badge != null && item.badge > 0 && (
                <span className="bg-error text-on-error text-[10px] font-bold px-2 py-0.5 rounded-full">
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </div>
      )}

      <aside className="hidden md:flex fixed left-0 top-0 w-[280px] h-full z-40 flex-col pt-[96px] bg-surface-container-lowest border-r border-outline-variant">
        <div className="px-xs mb-xl">
          <h2 className="font-headline-md font-bold text-primary">{portalTitle}</h2>
          <p className="text-on-surface-variant text-label-sm mt-xs">{portalSubtitle}</p>
        </div>
        <nav className="flex-1 px-xs space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveSection(item.id)}
              className={`w-full flex items-center gap-sm p-sm rounded-lg text-label-sm transition-all ${
                activeSection === item.id
                  ? 'bg-primary-container text-on-primary-container font-bold scale-[0.98]'
                  : 'text-on-surface-variant hover:bg-surface-container-low'
              }`}
            >
              <MaterialIcon name={item.icon} size={24} />
              <span className="flex-1 text-left">{item.label}</span>
              {item.badge != null && item.badge > 0 && (
                <span className="bg-error text-on-error text-[10px] font-bold px-2 py-0.5 rounded-full">
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </nav>
        <div className="px-xs pt-xl border-t border-outline-variant pb-xl space-y-sm">
          {bottomAction}
          <button
            type="button"
            onClick={() => setHelpOpen(true)}
            className="w-full flex items-center gap-sm p-sm rounded-lg text-label-sm text-on-surface-variant hover:bg-surface-container-low transition-colors"
          >
            <MaterialIcon name="help" size={24} />
            Help
          </button>
          <button
            type="button"
            onClick={() => navigate('/')}
            className="w-full flex items-center gap-sm p-sm rounded-lg text-label-sm text-on-surface-variant hover:bg-surface-container-low hover:text-error transition-colors"
          >
            <MaterialIcon name="logout" size={24} />
            Logout
          </button>
        </div>
      </aside>

      <main className="md:ml-[280px] pt-[72px] min-h-screen bg-[#F7F5F2]">
        <div className="px-4 md:px-margin-desktop py-xl max-w-container-max mx-auto">{children}</div>
      </main>

      <HelpPanel isOpen={helpOpen} onClose={() => setHelpOpen(false)} />

      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-surface-container-lowest border-t border-outline-variant flex justify-around items-center py-xs px-1">
        {navItems.slice(0, 5).map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setActiveSection(item.id)}
            className={`flex flex-col items-center justify-center min-w-[56px] p-1 rounded-lg ${
              activeSection === item.id ? 'text-primary' : 'text-on-surface-variant'
            }`}
            aria-label={item.label}
          >
            <MaterialIcon name={item.icon} size={22} />
            {activeSection === item.id && (
              <span className="text-[10px] font-semibold mt-0.5 truncate max-w-[56px]">{item.label.split(' ')[0]}</span>
            )}
          </button>
        ))}
        <button
          type="button"
          onClick={() => navigate('/')}
          className="flex flex-col items-center p-1 text-on-surface-variant"
          aria-label="Logout"
        >
          <MaterialIcon name="logout" size={22} />
        </button>
      </nav>
      <div className="md:hidden h-[72px]" />
    </div>
  );
};

export default DashboardShell;
