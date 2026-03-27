
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../components/ui/Logo';
import I from '../components/ui/I';
import Spin from '../components/ui/Spin';
import { useToast } from '../context/ToastContext';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const toast = useToast();

  const handleReset = (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
      toast('Reset link sent!', 'success');
    }, 1500);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg)', padding: '36px 20px' }}>
      <div style={{ width: '100%', maxWidth: 400 }}>
        <Link to="/" style={{ display: 'inline-block', marginBottom: 28 }}>
          <Logo />
        </Link>
        <h1 style={{ fontSize: 24, fontFamily: 'var(--ffd)', fontWeight: 800, marginBottom: 8 }}>Reset password</h1>
        
        {sent ? (
          <div className="alert asi" style={{ marginBottom: 20 }}>
            <I n="check-circle" s={18} c="var(--green)" />
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 2 }}>Email sent!</div>
              <div style={{ fontSize: 13, color: 'var(--text2)' }}>Check <strong>{email}</strong> for instructions to reset your password.</div>
              <button className="btn bsm bp mt4" onClick={() => setSent(false)}>Resend email</button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleReset} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <p style={{ fontSize: 14, color: 'var(--text3)', lineHeight: 1.6 }}>
              Enter your email address and we'll send you a link to reset your password.
            </p>
            <div className="fg">
              <label className="fl">Work email</label>
              <input className="fi" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@company.com" required />
            </div>
            <button className="btn bp blg bfw" style={{ justifyContent: 'center' }} disabled={loading}>
              {loading ? <Spin s={14} /> : 'Send reset link'}
            </button>
          </form>
        )}
        
        <div style={{ marginTop: 24, textAlign: 'center' }}>
          <Link to="/login" style={{ fontSize: 14, color: 'var(--text4)', textDecoration: 'none', fontWeight: 600 }}>
            <I n="arrow-left" s={12} /> Back to login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
