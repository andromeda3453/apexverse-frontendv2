
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import useAuthStore from '../store/authStore';
import { useToast } from '../context/ToastContext';
import Logo from '../components/ui/Logo';
import I from '../components/ui/I';
import Spin from '../components/ui/Spin';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showP, setShowP] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuthStore();
  const navigate = useNavigate();
  const toast = useToast();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast('Please enter both email and password', 'error');
      return;
    }
    setLoading(true);
    const result = await login(email, password);
    setLoading(false);
    
    if (result.success) {
      toast('Welcome back!', 'success');
      navigate('/dashboard');
    } else {
      toast(result.error, 'error');
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg)', padding: '36px 20px' }}>
      <motion.div 
        initial={{ opacity: 0, y: 15 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5, ease: 'easeOut' }}
        style={{ width: '100%', maxWidth: 400 }}
      >
        <Link to="/" style={{ background: 'none', border: 'none', cursor: 'pointer', marginBottom: 28, padding: 0, display: 'inline-block', textDecoration: 'none' }}>
          <Logo />
        </Link>
        <h1 style={{ fontSize: 24, fontFamily: 'var(--ffd)', fontWeight: 800, marginBottom: 4 }}>Welcome back</h1>
        <p style={{ fontSize: 14, color: 'var(--text3)', marginBottom: 24 }}>
          No account? <Link to="/signup" style={{ color: 'var(--brand)', fontWeight: 600, textDecoration: 'none' }}>Sign up free</Link>
        </p>
        

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 13 }}>
          <div className="fg">
            <label className="fl">Work email</label>
            <input 
              className="fi" 
              type="email" 
              placeholder="you@company.com" 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              required 
            />
          </div>
          <div className="fg">
            <div className="fxb">
              <label className="fl">Password</label>
              <Link to="/forgot" style={{ fontSize: 12, color: 'var(--brand)', textDecoration: 'none' }}>Forgot?</Link>
            </div>
            <div className="rel">
              <input 
                className="fi" 
                type={showP ? 'text' : 'password'} 
                placeholder="Your password" 
                value={password} 
                onChange={e => setPassword(e.target.value)} 
                style={{ paddingRight: 38 }} 
                required 
              />
              <button 
                type="button"
                onClick={() => setShowP(!showP)} 
                style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text3)' }}
              >
                <I n={showP ? 'eye-off' : 'eye'} s={14} />
              </button>
            </div>
          </div>
          <button 
            type="submit"
            className="btn bp blg bfw" 
            style={{ justifyContent: 'center', marginTop: 3 }} 
            disabled={loading}
          >
            {loading ? <><Spin s={14} />Signing in...</> : 'Sign in'}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default LoginPage;
