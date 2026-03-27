
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Logo from '../components/ui/Logo';
import I from '../components/ui/I';
import Spin from '../components/ui/Spin';
import { useToast } from '../context/ToastContext';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  const handleReset = (e) => {
    e.preventDefault();
    if (password !== confirm) {
      toast('Passwords do not match', 'error');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast('Password has been reset', 'success');
      navigate('/login');
    }, 1500);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg)', padding: '36px 20px' }}>
      <div style={{ width: '100%', maxWidth: 400 }}>
        <Link to="/" style={{ display: 'inline-block', marginBottom: 28 }}>
          <Logo />
        </Link>
        <h1 style={{ fontSize: 24, fontFamily: 'var(--ffd)', fontWeight: 800, marginBottom: 8 }}>Set new password</h1>
        <p style={{ fontSize: 14, color: 'var(--text3)', marginBottom: 24 }}>Choose a strong password for your account.</p>
        
        <form onSubmit={handleReset} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div className="fg">
            <label className="fl">New password</label>
            <input className="fi" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Min 8 characters" required minLength={8} />
          </div>
          <div className="fg">
            <label className="fl">Confirm password</label>
            <input className="fi" type="password" value={confirm} onChange={e => setConfirm(e.target.value)} placeholder="Repeat password" required />
          </div>
          <button className="btn bp blg bfw" style={{ justifyContent: 'center' }} disabled={loading}>
            {loading ? <Spin s={14} /> : 'Update password'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
