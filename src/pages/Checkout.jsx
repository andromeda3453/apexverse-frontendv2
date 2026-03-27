
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Logo from '../components/ui/Logo';
import I from '../components/ui/I';
import Spin from '../components/ui/Spin';
import { useToast } from '../context/ToastContext';

const Checkout = () => {
  const [params] = useSearchParams();
  const [plan, setPlan] = useState(params.get('plan') || 'growth');
  const [years, setYears] = useState(1);
  const [addons, setAddons] = useState([]);
  const [step, setStep] = useState('form');
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ email: 'alex@acme.io', name: '', card: '', exp: '', cvc: '' });
  const [errs, setErrs] = useState({});
  const navigate = useNavigate();
  const toast = useToast();

  const DISC = 0.05;
  const plansData = {
    starter: { name: 'Starter', mo: 59 },
    growth: { name: 'Growth', mo: 129 },
    professional: { name: 'Professional', mo: 499 }
  };
  
  const addonList = [
    { id: 'jsr', l: 'JS Rendering', p: 29 },
    { id: 'pri', l: 'Priority Processing', p: 19 },
    { id: 'prm', l: 'Premium Extraction', p: 39 }
  ];

  const calcMo = (base, y) => y === 1 ? base : Math.round(base * (1 - DISC * (y - 1)));
  const calcTotal = (base, y) => y === 1 ? base : Math.round(base * (1 - DISC * (y - 1)) * 12 * y);
  
  const sel = plansData[plan] || plansData.growth;
  const base = calcMo(sel.mo, years);
  const addonTotal = addons.reduce((s, id) => s + ((addonList.find(a => a.id === id) || { p: 0 }).p || 0), 0);
  const total = base + addonTotal;
  const upfront = years > 1 ? calcTotal(sel.mo, years) + (addonTotal * 12 * years) : null;

  const toggleA = id => setAddons(a => a.includes(id) ? a.filter(x => x !== id) : [...a, id]);

  const validate = () => {
    const e = {};
    if (!form.email) e.email = 'Required';
    if (!form.name) e.name = 'Required';
    if (!form.card || form.card.replace(/\s/g, '').length < 16) e.card = 'Valid card required';
    if (!form.exp) e.exp = 'Required';
    if (!form.cvc || form.cvc.length < 3) e.cvc = 'Required';
    return e;
  };

  const handlePay = () => {
    const e = validate();
    setErrs(e);
    if (Object.keys(e).length > 0) return;
    
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (form.card.startsWith('4000')) {
        setStep('failed');
      } else {
        setStep('success');
        toast('Welcome to Apexverse ' + sel.name + '!', 'success');
      }
    }, 2000);
  };

  if (step === 'success') {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg)', padding: 20 }}>
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} style={{ textAlign: 'center', maxWidth: 440 }}>
          <div style={{ width: 80, height: 80, background: 'var(--green-bg)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', animation: 'float 2s ease-in-out infinite' }}>
            <I n="check-circle" s={40} c="var(--green)" />
          </div>
          <h2 style={{ fontSize: 28, fontFamily: 'var(--ffd)', fontWeight: 800, marginBottom: 12 }}>Payment successful!</h2>
          <p style={{ fontSize: 16, color: 'var(--text3)', marginBottom: 32, lineHeight: 1.65 }}>
            You're now on the <strong>{sel.name}</strong> plan. Your account has been upgraded and all features are unlocked.
          </p>
          <div className="fxc" style={{ justifyContent: 'center', gap: 12 }}>
            <button className="btn bp blg" onClick={() => navigate('/dashboard')}>Go to dashboard</button>
            <button className="btn bs blg" onClick={() => navigate('/billing')}>View billing</button>
          </div>
        </motion.div>
      </div>
    );
  }

  if (step === 'failed') {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg)', padding: 20 }}>
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} style={{ textAlign: 'center', maxWidth: 440 }}>
          <div style={{ width: 80, height: 80, background: 'var(--red-bg)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
            <I n="alert-circle" s={40} c="var(--red)" />
          </div>
          <h2 style={{ fontSize: 28, fontFamily: 'var(--ffd)', fontWeight: 800, marginBottom: 12 }}>Payment failed</h2>
          <p style={{ fontSize: 16, color: 'var(--text3)', marginBottom: 32, lineHeight: 1.65 }}>
            Your card was declined. Please verify your details or use a different payment method.
          </p>
          <div className="fxc" style={{ justifyContent: 'center', gap: 12 }}>
            <button className="btn bp blg" onClick={() => setStep('form')}>Try again</button>
            <button className="btn bs blg" onClick={() => navigate('/support')}>Contact support</button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', padding: '48px 24px' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <button onClick={() => navigate('/')} style={{ background: 'none', border: 'none', cursor: 'pointer', marginBottom: 32, padding: 0 }}>
          <Logo />
        </button>
        <h1 style={{ fontSize: 32, fontFamily: 'var(--ffd)', fontWeight: 800, marginBottom: 32 }}>Complete your purchase</h1>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 32, alignItems: 'start' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {/* Plan Selection */}
            <div className="card">
              <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 16 }}>Select plan</h3>
              <div className="fxc" style={{ gap: 10, marginBottom: 20 }}>
                {Object.keys(plansData).map(p => (
                  <div 
                    key={p} 
                    onClick={() => setPlan(p)} 
                    style={{ flex: 1, padding: '14px', border: `2px solid ${plan === p ? 'var(--accent)' : 'var(--border)'}`, borderRadius: 'var(--rlg)', cursor: 'pointer', background: plan === p ? 'var(--bg2)' : 'var(--surface)', transition: 'all .14s', textAlign: 'center' }}
                  >
                    <div style={{ fontSize: 14, fontWeight: 800, textTransform: 'capitalize', color: plan === p ? 'var(--accent)' : 'var(--text)' }}>{p}</div>
                    <div style={{ fontSize: 12, color: 'var(--text3)', fontWeight: 500 }}>${calcMo(plansData[p].mo, years)}/mo</div>
                  </div>
                ))}
              </div>
              <div>
                <div style={{ fontSize: 12, color: 'var(--text3)', marginBottom: 10 }}>Billing period - <span style={{ color: 'var(--green)', fontWeight: 700 }}>Save 5% per extra year</span></div>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {[1, 2, 3, 4, 5].map(y => (
                    <button 
                      key={y} 
                      onClick={() => setYears(y)} 
                      style={{ padding: '8px 16px', borderRadius: 100, border: '1px solid ' + (years === y ? 'var(--accent)' : 'var(--border2)'), cursor: 'pointer', fontFamily: 'var(--ff)', fontSize: 12, fontWeight: 700, background: years === y ? 'var(--accent)' : 'var(--surface)', color: years === y ? 'white' : 'var(--text3)', transition: 'all .14s' }}
                    >
                      {y === 1 ? 'Monthly' : y + 'yr'}{y > 1 && <span style={{ marginLeft: 3, opacity: 0.8 }}>-{((y - 1) * 5)}%</span>}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Add-ons */}
            <div className="card">
              <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 16 }}>Recommended add-ons</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {addonList.map(a => (
                  <div key={a.id} onClick={() => toggleA(a.id)} className="fxc ch" style={{ gap: 12, padding: '12px 14px', borderRadius: 'var(--r)', cursor: 'pointer', background: addons.includes(a.id) ? 'var(--bg2)' : 'transparent' }}>
                    <div style={{ width: 18, height: 18, border: `2px solid ${addons.includes(a.id) ? 'var(--accent)' : 'var(--border2)'}`, borderRadius: 4, background: addons.includes(a.id) ? 'var(--accent)' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all .14s' }}>
                      {addons.includes(a.id) && <I n="check" s={12} c="white" />}
                    </div>
                    <span style={{ flex: 1, fontSize: 14, fontWeight: 500 }}>{a.l}</span>
                    <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--brand)', fontFamily: 'var(--ffm)' }}>+${a.p}/mo</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment Details */}
            <div className="card">
              <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 20 }}>Payment details</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div className="fg">
                  <label className="fl">Billing email</label>
                  <input className={`fi ${errs.email ? 'fie' : ''}`} value={form.email} onChange={e => setForm({...form, email: e.target.value})} required />
                </div>
                <div className="fg">
                  <label className="fl">Cardholder name</label>
                  <input className={`fi ${errs.name ? 'fie' : ''}`} placeholder="Alex Chen" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
                </div>
                <div className="fg">
                  <label className="fl">Card number</label>
                  <div className="rel">
                    <input className={`fi ${errs.card ? 'fie' : ''}`} placeholder="4242 4242 4242 4242" value={form.card} onChange={e => setForm({...form, card: e.target.value})} style={{ fontFamily: 'var(--ffm)', paddingRight: 48 }} maxLength={19} required />
                    <div style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', opacity: 0.5 }}><I n="credit-card" s={18} /></div>
                  </div>
                </div>
                <div className="g2">
                  <div className="fg"><label className="fl">Expiry</label><input className={`fi ${errs.exp ? 'fie' : ''}`} placeholder="MM / YY" value={form.exp} onChange={e => setForm({...form, exp: e.target.value})} style={{ fontFamily: 'var(--ffm)' }} maxLength={7} required /></div>
                  <div className="fg"><label className="fl">CVC</label><input className={`fi ${errs.cvc ? 'fie' : ''}`} placeholder="123" value={form.cvc} onChange={e => setForm({...form, cvc: e.target.value})} style={{ fontFamily: 'var(--ffm)' }} maxLength={4} required /></div>
                </div>
              </div>
            </div>

            <button className="btn bbr bxl bfw" style={{ justifyContent: 'center', height: 56, fontSize: 16 }} onClick={handlePay} disabled={loading}>
              {loading ? <><Spin s={20} />Processing secure payment...</> : <><I n="lock" s={16} c="white" /> {years > 1 ? `Pay $${upfront.toLocaleString()} upfront` : `Subscribe for $${total}/mo`}</>}
            </button>
            <div style={{ textAlign: 'center', fontSize: 12, color: 'var(--text4)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
              <I n="shield" s={12} /> SSL Secured . 14-day money back guarantee . Cancel anytime
            </div>
          </div>

          <div style={{ position: 'sticky', top: 48 }}>
            <div className="card" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
              <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 20 }}>Order Summary</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 20 }}>
                <div className="fxb" style={{ fontSize: 14 }}>
                  <span style={{ color: 'var(--text2)', fontWeight: 500 }}>{sel.name} Plan</span>
                  <span style={{ fontWeight: 700 }}>${base}/mo</span>
                </div>
                {addons.map(id => {
                  const a = addonList.find(x => x.id === id);
                  return (
                    <div key={id} className="fxb" style={{ fontSize: 14 }}>
                      <span style={{ color: 'var(--text3)' }}>{a.l}</span>
                      <span style={{ fontWeight: 600 }}>+${a.p}/mo</span>
                    </div>
                  );
                })}
              </div>
              <div style={{ paddingTop: 16, borderTop: '1px solid var(--border)' }}>
                <div className="fxb" style={{ fontSize: 18, fontWeight: 800, marginBottom: 4 }}>
                  <span>Total monthly</span>
                  <span style={{ color: 'var(--accent)' }}>${total}/mo</span>
                </div>
                {years > 1 && (
                  <div className="fxb" style={{ fontSize: 14, color: 'var(--green)', fontWeight: 700, marginTop: 4 }}>
                    <span>Due today ({years} yrs)</span>
                    <span>${upfront.toLocaleString()}</span>
                  </div>
                )}
                {years > 1 && <div style={{ fontSize: 11, color: 'var(--text4)', marginTop: 4 }}>Includes {(years-1)*5}% multi-year discount</div>}
              </div>
              <div style={{ marginTop: 24, padding: '16px', background: 'var(--bg2)', borderRadius: 'var(--rlg)', display: 'flex', flexDirection: 'column', gap: 10 }}>
                {['Unlimited page cleaning', 'Priority extraction queue', 'Custom path filters', 'Direct vector DB sync'].map(f => (
                  <div key={f} className="fxc" style={{ gap: 8, fontSize: 12, color: 'var(--text2)', fontWeight: 500 }}>
                    <I n="check" s={14} c="var(--green)" />
                    {f}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
