import React from 'react';
import { PrivyProvider, usePrivy, useCreateWallet } from '@privy-io/react-auth';
import LoginPage from './components/LoginPage.jsx';

const InnerApp = () => {
  const { ready, authenticated, user } = usePrivy();
  const { createWallet } = useCreateWallet();

  const [walletAddress, setWalletAddress] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  // Create Starknet wallet after login
  React.useEffect(() => {
    const createStarknetWallet = async () => {
      if (!authenticated || !user || walletAddress) return;

      setLoading(true);
      setError(null);

      try {
        const existing = user.linkedAccounts?.find(
          (acc) => acc.type === 'wallet' && acc.chainType === 'starknet'
        );

        if (existing?.address) {
          setWalletAddress(existing.address);
        } else {
          const wallet = await createWallet({ chainType: 'starknet' });
          setWalletAddress(wallet.address);
        }
      } catch (err) {
        console.error(err);
        setError('Failed to create Starknet wallet');
      } finally {
        setLoading(false);
      }
    };

    if (authenticated && user) {
      createStarknetWallet();
    }
  }, [authenticated, user, walletAddress, createWallet]);

  const handleLogin = () => {
    setError(null);
    login();
  };

  // Loading State - with icon and 3 vertical skeleton boxes
  if (!ready || loading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.loadingIcon}>✦</div>
        <p style={styles.loadingText}>Creating your Starknet wallet...</p>

        {/* Three vertical skeleton boxes */}
        <div style={styles.skeletonContainer}>
          {[1, 2, 3].map((i) => (
            <div key={i} style={styles.skeletonBox} />
          ))}
        </div>
      </div>
    );
  }

  if (!authenticated || !walletAddress) {
    return <LoginPage onLogin={handleLogin} error={error} />;
  }

  // Success Screen
  return (
    <div style={styles.successContainer}>
      <div style={styles.successIcon}>✦</div>
      <h1 style={styles.successTitle}>Wallet Connected</h1>
      <p style={styles.successSubtitle}>Starknet Mainnet • Google Login</p>

      <div style={styles.addressCard}>
        <p style={styles.addressLabel}>Your Starknet Address</p>
        <p style={styles.address}>{walletAddress}</p>
      </div>

      <button 
        onClick={() => window.location.reload()}
        style={styles.refreshBtn}
      >
        Refresh
      </button>
    </div>
  );
};

const App = () => {
  return (
    <PrivyProvider
      appId={import.meta.env.VITE_PRIVY_APP_ID}
      config={{
        loginMethods: ['google'],
        appearance: { theme: 'dark', accentColor: '#7c5cfc' },
        embeddedWallets: {
          createOnLogin: 'all-users',
          noPromptOnSignature: true,
        },
      }}
    >
      <InnerApp />
    </PrivyProvider>
  );
};

// Styles
const styles = {
  loadingContainer: {
    minHeight: '100vh',
    background: '#0a0a0c',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    padding: '20px',
  },
  loadingIcon: {
    fontSize: '4rem',
    marginBottom: '20px',
    color: '#7c5cfc',
  },
  loadingText: {
    fontSize: '1.3rem',
    fontWeight: '600',
    marginBottom: '40px',
    color: '#aaa',
  },
  skeletonContainer: {
    width: '100%',
    maxWidth: '420px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  skeletonBox: {
    height: '78px',
    background: '#1a1a1f',
    borderRadius: '16px',
    border: '1px solid #222',
  },

  successContainer: {
    minHeight: '100vh',
    background: '#0a0a0c',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    padding: '40px 20px',
    textAlign: 'center',
  },
  successIcon: {
    fontSize: '4.5rem',
    marginBottom: '20px',
    color: '#7c5cfc',
  },
  successTitle: {
    fontSize: '32px',
    fontWeight: '800',
    marginBottom: '8px',
  },
  successSubtitle: {
    color: '#7c5cfc',
    marginBottom: '40px',
  },
  addressCard: {
    background: '#121217',
    border: '1px solid #222',
    borderRadius: '20px',
    padding: '28px',
    width: '100%',
    maxWidth: '420px',
    marginBottom: '30px',
  },
  addressLabel: {
    color: '#888',
    fontSize: '13px',
    marginBottom: '10px',
  },
  address: {
    fontFamily: 'monospace',
    wordBreak: 'break-all',
    fontSize: '15px',
    background: '#0a0a0c',
    padding: '16px',
    borderRadius: '10px',
    border: '1px solid #333',
  },
  refreshBtn: {
    padding: '14px 32px',
    background: '#7c5cfc',
    color: '#fff',
    border: 'none',
    borderRadius: '12px',
    fontWeight: '600',
    cursor: 'pointer',
  },
};

export default App;
