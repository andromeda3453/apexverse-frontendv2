
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import I from '../components/ui/I';
import Footer from '../components/Footer';
import { useToast } from '../context/ToastContext';

const ContactPage = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: 'General Inquiry', message: '' });
  const [sent, setSent] = useState(false);
  const toast = useToast();

  const handleSend = (e) => {
    e.preventDefault();
    if (!form.email || !form.message) {
      toast('Please fill in required fields', 'error');
      return;
    }
    setSent(true);
    toast('Message sent successfully!', 'success');
  };

  return (
    <div className="ai">
      <section style={{ padding: '72px 24px 48px', background: 'var(--bg)', textAlign: 'center', borderBottom: '1px solid var(--border)' }}>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="stag">Contact Us</motion.div>
        <motion.h1 
          initial={{ opacity: 0, y: 10 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.1 }}
          style={{ fontSize: 'clamp(28px,5vw,46px)', fontFamily: 'var(--ffd)', fontWeight: 800, marginBottom: 13, letterSpacing: '-.02em' }}
        >
          How can we help?
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay: 0.2 }}
          style={{ fontSize: 16, color: 'var(--text3)', maxWidth: 480, margin: '0 auto', lineHeight: 1.65 }}
        >
          Our team is here to help you scale your AI data pipelines.
        </motion.p>
      </section>

      <section className="sec" style={{ maxWidth: 1020, margin: '0 auto', padding: '64px 24px' }}>
        <div className="g2" style={{ gap: 48, alignItems: 'start' }}>
          <div>
            <h2 style={{ fontSize: 20, fontFamily: 'var(--ffd)', fontWeight: 800, marginBottom: 20 }}>Send us a message</h2>
            {sent ? (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="alert asi" style={{ padding: '24px' }}>
                <I n="check-circle" s={24} c="var(--green)" />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 4 }}>Message received!</div>
                  <div style={{ fontSize: 14, lineHeight: 1.6 }}>Thanks for reaching out. We've received your inquiry and will get back to you within 24 hours.</div>
                  <button className="btn bp bsm mt4" onClick={() => setSent(false)}>Send another message</button>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSend} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div className="g2">
                  <div className="fg"><label className="fl">Full name</label><input className="fi" placeholder="Alex Chen" value={form.name} onChange={e => setForm({...form, name: e.target.value})} /></div>
                  <div className="fg"><label className="fl">Work email</label><input className="fi" type="email" placeholder="alex@company.com" value={form.email} onChange={e => setForm({...form, email: e.target.value})} required /></div>
                </div>
                <div className="fg">
                  <label className="fl">Subject</label>
                  <select className="fse" value={form.subject} onChange={e => setForm({...form, subject: e.target.value})}>
                    <option>General Inquiry</option>
                    <option>Sales & Enterprise</option>
                    <option>Technical Support</option>
                    <option>Billing Question</option>
                    <option>Partnerships</option>
                  </select>
                </div>
                <div className="fg">
                  <label className="fl">Message</label>
                  <textarea className="fta" style={{ minHeight: 140 }} placeholder="Tell us about your project or issue..." value={form.message} onChange={e => setForm({...form, message: e.target.value})} required />
                </div>
                <button type="submit" className="btn bbr blg bfw" style={{ justifyContent: 'center' }}>Send Message</button>
              </form>
            )}
          </div>

          <div>
            <div className="card" style={{ padding: '32px' }}>
              <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 20 }}>Other ways to connect</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                {[
                  ['mail', 'Email us', 'support@apexverse.ai', 'Direct responses from our engineering team.'],
                  ['message-square', 'Live Chat', 'Available Mon-Fri', 'Chat with us inside the dashboard for instant help.'],
                  ['twitter', 'Twitter', '@apexverse_ai', 'Follow us for product updates and AI tips.']
                ].map(([ico, t, v, d]) => (
                  <div key={t} className="fxc" style={{ gap: 14, alignItems: 'flex-start' }}>
                    <div style={{ width: 36, height: 36, background: 'var(--bg2)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <I n={ico} s={16} c="var(--text2)" />
                    </div>
                    <div>
                      <div style={{ fontSize: 12, color: 'var(--text4)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.05em', marginBottom: 2 }}>{t}</div>
                      <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 4 }}>{v}</div>
                      <div style={{ fontSize: 12, color: 'var(--text3)', lineHeight: 1.5 }}>{d}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="card mt4 fxb" style={{ background: 'var(--accent)', color: 'white', border: 'none' }}>
              <div>
                <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 2 }}>Ready to scale?</h3>
                <p style={{ fontSize: 12, opacity: .7 }}>Start your 14-day free trial today.</p>
              </div>
              <motion.button whileHover={{ scale: 1.05 }} className="btn bsm" style={{ background: 'white', color: 'var(--accent)', fontWeight: 700 }}>Get Started</motion.button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ContactPage;
