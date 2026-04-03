// ============================================
// APP.JSX — ROOT COMPONENT
// Controls login vs dashboard routing + loading states
// ============================================

import React from 'react';
import { PrivyProvider, usePrivy } from '@privy-io/react-auth';
import './styles/global.css';
import { useWallet } from './hooks/useWallet';
import LoginPage from './components/LoginPage';
import Header from './components/Header';
import Dashboard from './components/Dashboard';

// ── Inner app with better loading states ─────
const InnerApp = () => {
  const { ready, authenticated, user, walletAddress } = usePrivy();
  const {
    tokens,
    balancesLoading,
    error,
    loginWithGoogle,
    logout,
    refreshBalances,
  } = useWallet();

  // Privy is still initializing
  if (!ready) {
    return (
      <div style={styles.loadingScreen}>
        <div style={styles.loadingIcon}>✦</div>
        <p style={styles.loadingText}>Initializing StarkWallet...</p>
      </div>
    );
  }

  // After Google login — Privy is creating the Starknet embedded wallet
  if (authenticated && !walletAddress) {
    return (
      <div style={styles.loadingScreen}>
        <div style={styles.loadingIcon}>✦</div>
        <p style={styles.loadingText}>Creating your Starknet wallet...</p>
        <p style={styles.loadingSubtext}>This usually takes a few seconds</p>
      </div>
    );
  }

  // Not logged in
  if (!authenticated || !walletAddress) {
    return <LoginPage onLogin={loginWithGoogle} error={error} />;
  }

  // Fully ready — show dashboard
  return (
    <div>
      <Header
        walletAddress={walletAddress}
        onLogout={logout}
        onRefresh={refreshBalances}
      />
      <Dashboard
        walletAddress={walletAddress}
        tokens={tokens}
        balancesLoading={balancesLoading}
        onRefresh={refreshBalances}
      />
    </div>
  );
};

// ── Root App with Privy ───────────────────────
const App = () => {
  return (
    <PrivyProvider
      appId={process.env.REACT_APP_PRIVY_APP_ID}
      config={{
        loginMethods: ['google'],
        appearance: {
          theme: 'dark',
          accentColor: '#7c5cfc',
        },
        embeddedWallets: {
          createOnLogin: 'always',
          noPromptOnSignature: true,
        },
        defaultChain: {
          id: process.env.REACT_APP_NETWORK === 'sepolia'
            ? 'starknet-sepolia'
            : 'starknet-mainnet',
        },
      }}
    >
      <InnerApp />
    </PrivyProvider>
  );
};

// Loading screen styles
const styles = {
  loadingScreen: {
    minHeight: '100vh',
    background: '#0a0a0f',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    textAlign: 'center',
    padding: '20px',
  },
  loadingIcon: {
    fontSize: '3.5rem',
    marginBottom: '20px',
    color: '#7c5cfc',
    animation: 'pulse 2s infinite',
  },
  loadingText: {
    fontSize: '1.4rem',
    fontWeight: '700',
    marginBottom: '8px',
  },
  loadingSubtext: {
    fontSize: '1rem',
    color: '#888',
  },
};

export default App;
