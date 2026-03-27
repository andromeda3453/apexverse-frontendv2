
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import api from '../services/api';
import TopBar from '../components/TopBar';
import I from '../components/ui/I';
import { useToast } from '../context/ToastContext';
import SBadge from '../components/ui/SBadge';
import Spin from '../components/ui/Spin';

const Billing = () => {
  const [showPromo, setShowPromo] = useState(false);
  const [promo, setPromo] = useState('');
  const toast = useToast();

  const { data: usage, isLoading } = useQuery({
    queryKey: ['billing-usage'],
    queryFn: () => api.get('/usage').then(res => res.data)
  });

  const INVOICES = [
    { id: 'INV-2026-003', date: 'Mar 1, 2026', amount: '$149.00', status: 'paid' },
    { id: 'INV-2026-002', date: 'Feb 1, 2026', amount: '$149.00', status: 'paid' },
    { id: 'INV-2026-001', date: 'Jan 1, 2026', amount: '$149.00', status: 'paid' },
  ];

  if (isLoading) {
    return (
      <div>
        <TopBar title="Billing" sub="Loading billing data..." />
        <div style={{ padding: 100, textAlign: 'center' }}><Spin s={24} /></div>
      </div>
    );
  }

  const pct = usage ? Math.round((usage.current_usage / usage.monthly_limit) * 100) : 0;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <TopBar title="Billing" sub="Manage your plan and credits" />
      <div className="pc ai" style={{ maxWidth: 900 }}>
        <div className="g2 mb6" style={{ alignItems: 'start' }}>
          <div className="plancard" style={{ padding: '32px' }}>
            <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.08em', color: 'rgba(255,255,255,.4)', marginBottom: 6 }}>Active Plan</div>
            <div className="fxc" style={{ gap: 10, marginBottom: 4 }}>
              <h2 style={{ fontSize: 32, color: 'white', fontFamily: 'var(--ffd)', fontWeight: 800 }}>{usage?.plan_name || 'Growth'}</h2>
              <span className="badge bgd" style={{ background: 'rgba(255,255,255,.15)', color: 'white', fontSize: 11 }}>Monthly</span>
            </div>
            <div style={{ fontSize: 14, color: 'rgba(255,255,255,.5)', marginBottom: 24 }}>${usage?.plan_price || 0} per month</div>
            <div className="fxc" style={{ gap: 12 }}>
              <button className="btn bsm" style={{ background: 'white', color: 'var(--accent)', fontWeight: 700 }}>Upgrade Plan</button>
              <button className="btn bsm" style={{ background: 'transparent', color: 'rgba(255,255,255,.5)', border: '1px solid rgba(255,255,255,.2)' }}>Downgrade</button>
            </div>
          </div>
          
          <div className="card">
            <h3 style={{ fontSize: 13, fontWeight: 700, marginBottom: 14 }}>Usage This Period</h3>
            <div className="fxb" style={{ fontSize: 12, marginBottom: 8 }}>
              <span style={{ color: 'var(--text2)' }}>Extracted pages</span>
              <span style={{ fontFamily: 'var(--ffm)', fontWeight: 700 }}>{usage?.current_usage?.toLocaleString()} / {usage?.monthly_limit?.toLocaleString()}</span>
            </div>
            <div className="pb" style={{ height: 10, marginBottom: 16 }}>
              <div className="pf" style={{ width: `${pct}%`, background: pct > 90 ? 'var(--red)' : pct > 70 ? 'var(--yellow)' : 'var(--accent)' }} />
            </div>
            <div className="alert min awi" style={{ padding: '10px 12px' }}>
              <I n="alert-triangle" s={14} c="var(--yellow)" />
              <span style={{ fontSize: 12 }}>{(usage?.monthly_limit - usage?.current_usage).toLocaleString()} pages remaining until renewal.</span>
            </div>
          </div>
        </div>

        <section className="mb6">
          <h2 style={{ fontSize: 16, fontFamily: 'var(--ffd)', fontWeight: 800, marginBottom: 14 }}>Payment Method</h2>
          <div className="card">
            <div className="fxc" style={{ gap: 14, padding: '16px', background: 'var(--bg2)', borderRadius: 'var(--rxl)', border: '1px solid var(--border)' }}>
              <div style={{ width: 48, height: 32, background: 'var(--accent)', borderRadius: 6, display: 'flex', alignItems: 'center', justify: 'center', fontWeight: 900, fontSize: 10, color: 'white', letterSpacing: '.05em' }}>VISA</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 700 }}>Visa ending in 4242</div>
                <div style={{ fontSize: 12, color: 'var(--text3)' }}>Expires 12/2027</div>
              </div>
              <div className="fxc" style={{ gap: 8 }}>
                <span className="badge bgg">Default</span>
                <button className="btn bs bsm">Edit</button>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="fxb mb3">
            <h2 style={{ fontSize: 16, fontFamily: 'var(--ffd)', fontWeight: 800 }}>Invoice History</h2>
            <button className="btn bs bsm"><I n="download" s={12} /> Download All</button>
          </div>
          <div className="dtw">
            <table className="dt">
              <thead>
                <tr>
                  <th>Invoice ID</th>
                  <th>Billing Date</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {INVOICES.map(inv => (
                  <tr key={inv.id}>
                    <td><code style={{ fontSize: 12, color: 'var(--text2)' }}>{inv.id}</code></td>
                    <td style={{ fontSize: 13 }}>{inv.date}</td>
                    <td style={{ fontSize: 13, fontWeight: 600 }}>{inv.amount}</td>
                    <td><SBadge status={inv.status} /></td>
                    <td style={{ textAlign: 'right' }}>
                      <button className="btn bg2btn bsm"><I n="download" s={14} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {!showPromo ? (
          <div className="mt6" style={{ textAlign: 'center' }}>
            <button className="btn bg2btn bsm" onClick={() => setShowPromo(true)}>Have a promo code?</button>
          </div>
        ) : (
          <div className="card mt6" style={{ maxWidth: 400, margin: '24px auto 0' }}>
            <h3 style={{ fontSize: 13, fontWeight: 700, marginBottom: 12 }}>Apply Promo Code</h3>
            <div className="fxc" style={{ gap: 10 }}>
              <input className="fi" placeholder="SAVE20" value={promo} onChange={e => setPromo(e.target.value.toUpperCase())} />
              <button className="btn bp" onClick={() => { toast('Promo applied!', 'success'); setShowPromo(false); }}>Apply</button>
              <button className="btn bg2btn" onClick={() => setShowPromo(false)}>Cancel</button>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Billing;
