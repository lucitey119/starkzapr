import React from 'react';

const LoginPage = ({ onLogin, error }) => {
  return (
    <div style={styles.container}>
      <div style={styles.bgShape1} />
      <div style={styles.bgShape2} />

      <div style={styles.card}>
        <div style={styles.logoWrap}>
          <div style={styles.logoIcon}>✦</div>
          <span style={styles.logoText}>StarkWallet</span>
        </div>

        <h1 style={styles.headline}>
          Your crypto wallet.<br />
          <span style={styles.headlineAccent}>No seed phrase needed.</span>
        </h1>

        <p style={styles.subtext}>
          Login with Google and get a real Starknet wallet instantly. Send, receive, and swap tokens — powered by Starkzap and Privy.
        </p>

        <div style={styles.pills}>
          {['⚡ Gasless', '🔐 Google Login', '✦ Starknet Native'].map((pill) => (
            <span key={pill} style={styles.pill}>
              {pill}
            </span>
          ))}
        </div>

        {error && <div style={styles.error}>⚠️ {error}</div>}

        <button style={styles.googleBtn} onClick={onLogin}>
          <div style={styles.btnContent}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </div>
        </button>

        <p style={styles.disclaimer}>
          By continuing, a Starknet smart contract wallet is created and permanently linked to your Google account via Privy and Starkzap.
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#0a0a0c',
    padding: '20px',
    position: 'relative',
    overflow: 'hidden',
    width: '100%',
    boxSizing: 'border-box'
  },
  bgShape1: {
    position: 'absolute',
    width: '600px',
    height: '600px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(124,92,252,0.1) 0%, transparent 70%)',
    top: '-150px',
    right: '-150px',
  },
  bgShape2: {
    position: 'absolute',
    width: '500px',
    height: '500px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(0,212,170,0.05) 0%, transparent 70%)',
    bottom: '-150px',
    left: '-150px',
  },
  card: {
    background: '#121217',
    border: '1px solid #222',
    borderRadius: '28px',
    padding: '48px 40px',
    maxWidth: '460px',
    width: '100%',
    position: 'relative',
    zIndex: 1,
    textAlign: 'center',
    boxSizing: 'border-box'
  },
  logoWrap: { 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center', 
    gap: '10px', 
    marginBottom: '32px' 
  },
  logoIcon: {
    width: '40px',
    height: '40px',
    background: '#7c5cfc',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '18px',
    color: 'white',
    fontWeight: 'bold'
  },
  logoText: { 
    fontSize: '22px', 
    fontWeight: '800', 
    color: '#fff', 
    letterSpacing: '-0.5px' 
  },
  headline: { 
    fontSize: '32px', 
    fontWeight: '800', 
    color: '#fff', 
    lineHeight: '1.2', 
    marginBottom: '16px' 
  },
  headlineAccent: { color: '#7c5cfc' },
  subtext: { 
    color: '#888', 
    fontSize: '15px', 
    lineHeight: '1.6', 
    marginBottom: '24px' 
  },
  pills: { 
    display: 'flex', 
    flexWrap: 'wrap', 
    justifyContent: 'center', 
    gap: '8px', 
    marginBottom: '32px' 
  },
  pill: {
    background: 'rgba(124,92,252,0.1)',
    border: '1px solid rgba(124,92,252,0.2)',
    color: '#7c5cfc',
    borderRadius: '100px',
    padding: '6px 14px',
    fontSize: '12px',
    fontWeight: '600'
  },
  googleBtn: {
    width: '100%',
    padding: '16px',
    background: '#fff',
    border: 'none',
    borderRadius: '14px',
    cursor: 'pointer',
    marginBottom: '24px'
  },
  btnContent: { 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center', 
    gap: '12px', 
    fontWeight: 'bold', 
    color: '#000' 
  },
  error: { 
    color: '#ff4d4d', 
    background: 'rgba(255,77,77,0.1)', 
    padding: '12px', 
    borderRadius: '12px', 
    marginBottom: '16px', 
    fontSize: '13px' 
  },
  disclaimer: { 
    color: '#444', 
    fontSize: '11px', 
    lineHeight: '1.5' 
  }
};

export default LoginPage;
