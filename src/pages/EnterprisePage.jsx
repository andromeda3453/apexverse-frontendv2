
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import I from '../components/ui/I';
import Footer from '../components/Footer';

const EnterprisePage = () => {
  const securityFeatures = [
    ['shield', 'SOC 2 Type II', 'Annual third-party audits', 'var(--blue)'],
    ['lock', 'AES-256 Encryption', 'At rest and in transit', 'var(--green)'],
    ['key', 'SSO & SAML', 'Okta, Azure AD, Google Workspace', 'var(--brand)'],
    ['users', 'Role-Based Access', 'Granular permission controls', 'var(--yellow)'],
    ['database', 'Private Deployment', 'Your own AWS, Azure, or GCP', 'var(--blue)'],
    ['activity', 'Audit Logging', 'Complete action trail', 'var(--green)']
  ];

  return (
    <div className="ai">
      <section style={{ padding: '84px 24px 60px', background: 'var(--accent)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 30% 50%, rgba(255,255,255,.03) 0%, transparent 60%)' }} />
        <motion.div 
          initial={{ opacity: 0, y: 10 }} 
          animate={{ opacity: 1, y: 0 }}
          style={{ position: 'relative', zIndex: 1, maxWidth: 620, margin: '0 auto' }}
        >
          <div style={{ display: 'inline-block', padding: '3px 12px', background: 'rgba(255,255,255,.09)', borderRadius: 100, fontSize: 10, fontWeight: 600, letterSpacing: '.07em', textTransform: 'uppercase', color: 'rgba(255,255,255,.6)', marginBottom: 16 }}>Enterprise</div>
          <h1 style={{ fontSize: 'clamp(28px,5vw,50px)', color: 'white', fontFamily: 'var(--ffd)', fontWeight: 800, marginBottom: 13, lineHeight: 1.1 }}>AI data infrastructure at enterprise scale</h1>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,.5)', lineHeight: 1.65, marginBottom: 34 }}>Private deployments, custom SLAs, and comprehensive governance.</p>
          <div className="fxc" style={{ justifyContent: 'center', gap: 11 }}>
            <Link className="btn bxl" style={{ background: 'white', color: 'var(--accent)' }} to="/contact">Book enterprise demo</Link>
            <Link className="btn bxl" style={{ background: 'rgba(255,255,255,.09)', color: 'white', border: '1px solid rgba(255,255,255,.18)' }} to="/contact">Talk to sales</Link>
          </div>
        </motion.div>
      </section>

      <section style={{ maxWidth: 1020, margin: '0 auto', padding: '80px 24px' }}>
        <div className="g3 mb6" style={{ gap: 20 }}>
          {securityFeatures.map(([ico, t, d, c], i) => (
            <motion.div 
              key={t} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="card"
            >
              <div style={{ width: 38, height: 38, background: `${c}12`, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 11 }}><I n={ico} s={17} c={c} /></div>
              <h3 style={{ fontSize: 14, marginBottom: 6 }}>{t}</h3>
              <p style={{ fontSize: 12, color: 'var(--text3)', lineHeight: 1.65 }}>{d}</p>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 'var(--rxl)', padding: '48px 40px', textAlign: 'center' }}
        >
          <h2 style={{ fontSize: 24, fontFamily: 'var(--ffd)', marginBottom: 10 }}>Ready for a custom deployment?</h2>
          <p style={{ fontSize: 14, color: 'var(--text3)', maxWidth: 430, margin: '0 auto 24px', lineHeight: 1.65 }}>Our team will design the right architecture, SLAs, and integration plan for your team.</p>
          <div className="fxc" style={{ justifyContent: 'center', gap: 11 }}>
            <Link className="btn bp blg" to="/contact">Schedule a demo</Link>
            <button className="btn bs blg">Download security brief</button>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
};

export default EnterprisePage;
