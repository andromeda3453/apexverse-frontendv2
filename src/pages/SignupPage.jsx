
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import useAuthStore from '../store/authStore';
import { useToast } from '../context/ToastContext';
import Logo from '../components/ui/Logo';
import I from '../components/ui/I';
import Spin from '../components/ui/Spin';

const SignupPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [terms, setTerms] = useState(false);
  const [showP, setShowP] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register, login } = useAuthStore();
  const navigate = useNavigate();
  const toast = useToast();

  const handleSignup = async (e) => {
    e.preventDefault();
    if (password !== confirm) {
      toast('Passwords do not match', 'error');
      return;
    }
    if (!terms) {
      toast('Please accept the terms', 'error');
      return;
    }
    
    setLoading(true);
    const regResult = await register(email, password);
    
    if (regResult.success) {
      toast('Account created! Logging in...', 'success');
      // Automatically login after signup
      const loginResult = await login(email, password);
      setLoading(false);
      if (loginResult.success) {
        navigate('/dashboard');
      } else {
        navigate('/login');
      }
    } else {
      setLoading(false);
      toast(regResult.error, 'error');
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
        <h1 style={{ fontSize: 24, fontFamily: 'var(--ffd)', fontWeight: 800, marginBottom: 4 }}>Create your account</h1>
        <p style={{ fontSize: 14, color: 'var(--text3)', marginBottom: 24 }}>
          Have an account? <Link to="/login" style={{ color: 'var(--brand)', fontWeight: 600, textDecoration: 'none' }}>Log in</Link>
        </p>

        <form onSubmit={handleSignup} style={{ display: 'flex', flexDirection: 'column', gap: 13 }}>
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
            <label className="fl">Password</label>
            <div className="rel">
              <input 
                className="fi" 
                type={showP ? 'text' : 'password'} 
                placeholder="Min 8 characters" 
                value={password} 
                onChange={e => setPassword(e.target.value)} 
                style={{ paddingRight: 38 }} 
                required 
                minLength={8}
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
          <div className="fg">
            <label className="fl">Confirm password</label>
            <input 
              className="fi" 
              type="password" 
              placeholder="Re-enter password" 
              value={confirm} 
              onChange={e => setConfirm(e.target.value)} 
              required 
            />
          </div>
          <div>
            <div className="fxc" style={{ gap: 8, alignItems: 'flex-start' }}>
              <input 
                type="checkbox" 
                id="terms" 
                checked={terms} 
                onChange={e => setTerms(e.target.checked)} 
                style={{ marginTop: 3, accentColor: 'var(--accent)', flexShrink: 0 }}
              />
              <label htmlFor="terms" style={{ fontSize: 13, color: 'var(--text3)', cursor: 'pointer', lineHeight: 1.5 }}>
                I agree to the <Link to="/terms" style={{ color: 'var(--brand)', fontWeight: 600, textDecoration: 'none' }}>Terms</Link> and <Link to="/privacy" style={{ color: 'var(--brand)', fontWeight: 600, textDecoration: 'none' }}>Privacy Policy</Link>
              </label>
            </div>
          </div>
          <button 
            type="submit"
            className="btn bp blg bfw" 
            style={{ justifyContent: 'center', marginTop: 3 }} 
            disabled={loading}
          >
            {loading ? <><Spin s={14} />Creating account...</> : 'Create account'}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default SignupPage;
