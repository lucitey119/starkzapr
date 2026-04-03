import React from 'react';
import { PrivyProvider, usePrivy, useCreateWallet } from '@privy-io/react-auth';
import LoginPage from './components/LoginPage.jsx';

const InnerApp = () => {
  const { ready, authenticated, user } = usePrivy();
  const { createWallet } = useCreateWallet();

  const [walletAddress, setWalletAddress] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  // Create Starknet wallet after successful Google login
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
          console.log('✅ Starknet Mainnet wallet created:', wallet.address);
        }
      } catch (err) {
        console.error(err);
        setError('Failed to create Starknet wallet. Please try again.');
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
    login();   // This opens the nice Privy popup
  };

  if (!ready) {
    return (
      <div style={{ minHeight: '100vh', background: '#0a0a0c', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        Loading...
      </div>
    );
  }

  if (!authenticated || !walletAddress) {
    return <LoginPage onLogin={handleLogin} error={error} />;
  }

  // Success Screen - Show Starknet Address
  return (
    <div style={{
      minHeight: '100vh',
      background: '#0a0a0c',
      color: '#fff',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px',
      textAlign: 'center'
    }}>
      <div style={{ fontSize: '60px', marginBottom: '20px' }}>✦</div>
      <h1 style={{ fontSize: '32px', marginBottom: '10px' }}>Wallet Connected Successfully</h1>
      <p style={{ color: '#7c5cfc', marginBottom: '30px' }}>Starknet Mainnet • Google Login</p>

      <div style={{
        background: '#121217',
        border: '1px solid #333',
        borderRadius: '16px',
        padding: '24px',
        maxWidth: '420px',
        width: '100%'
      }}>
        <p style={{ color: '#888', fontSize: '13px', marginBottom: '10px' }}>Your Starknet Mainnet Address</p>
        <p style={{ 
          fontFamily: 'monospace', 
          wordBreak: 'break-all', 
          fontSize: '15px',
          background: '#0a0a0c',
          padding: '16px',
          borderRadius: '8px',
          border: '1px solid #444'
        }}>
          {walletAddress}
        </p>
      </div>

      <button 
        onClick={() => window.location.reload()}
        style={{
          marginTop: '30px',
          padding: '14px 28px',
          background: '#7c5cfc',
          color: '#fff',
          border: 'none',
          borderRadius: '12px',
          fontWeight: '600',
          cursor: 'pointer'
        }}
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
        appearance: {
          theme: 'dark',
          accentColor: '#7c5cfc',
        },
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

export default App;
