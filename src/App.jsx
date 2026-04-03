import React from 'react';
import { PrivyProvider, usePrivy, useCreateWallet } from '@privy-io/react-auth';
import LoginPage from './components/LoginPage.jsx';

const InnerApp = () => {
  const { ready, authenticated, user } = usePrivy();
  const { createWallet } = useCreateWallet();

  const [walletAddress, setWalletAddress] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

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

  if (!ready) {
    return <div style={{ minHeight: '100vh', background: '#0a0a0c', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading...</div>;
  }

  if (!authenticated || !walletAddress) {
    return <LoginPage onLogin={handleLogin} error={error} />;
  }

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
      <h1>Starknet Wallet Connected</h1>
      <p style={{ color: '#7c5cfc', margin: '20px 0' }}>Mainnet • Google Login</p>

      <div style={{
        background: '#121217',
        border: '1px solid #333',
        borderRadius: '16px',
        padding: '24px',
        maxWidth: '420px',
        width: '100%'
      }}>
        <p style={{ color: '#888', marginBottom: '8px' }}>Your Starknet Address</p>
        <p style={{ 
          fontFamily: 'monospace', 
          wordBreak: 'break-all', 
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
        style={{ marginTop: '30px', padding: '12px 24px', background: '#7c5cfc', color: '#fff', border: 'none', borderRadius: '12px', cursor: 'pointer' }}
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

export default App;
