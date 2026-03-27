
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import TopBar from '../components/TopBar';
import I from '../components/ui/I';
import { useToast } from '../context/ToastContext';

const Support = () => {
  const [form, setForm] = useState({ subject: '', message: '', priority: 'normal' });
  const [sent, setSent] = useState(false);
  const [ticketId, setTicketId] = useState(null);
  const toast = useToast();

  const handleSend = (e) => {
    e.preventDefault();
    if (!form.subject || !form.message) {
      toast('Please fill in all fields', 'error');
      return;
    }
    setSent(true);
    setTicketId(Math.floor(Math.random() * 9000) + 1000);
    toast('Support ticket submitted!', 'success');
  };

  const links = [
    { ico: 'book', t: 'Documentation', d: 'Browse API and platform docs', link: '/docs' },
    { ico: 'activity', t: 'System Status', d: 'Current platform health', link: '#' },
    { ico: 'life-buoy', t: 'Community', d: 'Join our developer community', link: '#' }
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <TopBar title="Support" sub="Get help from our engineering team" />
      <div className="pc ai" style={{ maxWidth: 900 }}>
        <div className="g2" style={{ gap: 40, alignItems: 'start' }}>
          <div>
            <h2 style={{ fontSize: 18, fontFamily: 'var(--ffd)', fontWeight: 800, marginBottom: 20 }}>Open a support ticket</h2>
            {sent ? (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="alert asi" style={{ padding: '24px' }}>
                <I n="check-circle" s={24} c="var(--green)" />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 4 }}>Ticket Submitted</div>
                  <div style={{ fontSize: 14, lineHeight: 1.6 }}>Reference: <strong>#T-{ticketId}</strong>. We'll get back to you within 24 hours.</div>
                  <button className="btn bp bsm mt4" onClick={() => { setSent(false); setForm({ subject: '', message: '', priority: 'normal' }); }}>Open another ticket</button>
                </div>
              </motion.div>
            ) : (
              <div className="card">
                <form onSubmit={handleSend} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <div className="fg">
                    <label className="fl">Subject</label>
                    <input className="fi" placeholder="Briefly describe the issue" value={form.subject} onChange={e => setForm({...form, subject: e.target.value})} required />
                  </div>
                  <div className="fg">
                    <label className="fl">Priority</label>
                    <select className="fse" value={form.priority} onChange={e => setForm({...form, priority: e.target.value})}>
                      <option value="low">Low - General query</option>
                      <option value="normal">Normal - Standard help</option>
                      <option value="high">High - Production issue</option>
                      <option value="urgent">Urgent - Blocking workflow</option>
                    </select>
                  </div>
                  <div className="fg">
                    <label className="fl">Message</label>
                    <textarea className="fta" style={{ minHeight: 140 }} placeholder="Detailed explanation, steps to reproduce, or project IDs..." value={form.message} onChange={e => setForm({...form, message: e.target.value})} required />
                  </div>
                  <button type="submit" className="btn bp blg bfw" style={{ justifyContent: 'center' }}>Submit Ticket</button>
                </form>
              </div>
            )}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div className="card">
              <h3 style={{ fontSize: 13, fontWeight: 700, marginBottom: 16 }}>Quick Resources</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {links.map(l => (
                  <div key={l.t} className="fxc ch" style={{ gap: 12, padding: '12px', background: 'var(--bg2)', borderRadius: 'var(--rlg)', border: '1px solid var(--border)' }}>
                    <div style={{ width: 32, height: 32, background: 'var(--surface)', borderRadius: 8, display: 'flex', alignItems: 'center', justify: 'center', flexShrink: 0 }}>
                      <I n={l.ico} s={14} c="var(--text2)" />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 12, fontWeight: 700 }}>{l.t}</div>
                      <div style={{ fontSize: 11, color: 'var(--text3)' }}>{l.d}</div>
                    </div>
                    <I n="external-link" s={12} c="var(--text4)" />
                  </div>
                ))}
              </div>
            </div>

            <div className="card fxb">
              <div>
                <h3 style={{ fontSize: 12, fontWeight: 700, marginBottom: 2 }}>System Health</h3>
                <p style={{ fontSize: 11, color: 'var(--green)', fontWeight: 600 }}>All systems operational</p>
              </div>
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--green)', boxShadow: '0 0 10px var(--green)', animation: 'pulse 2s infinite' }} />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Support;
