
import React from 'react';
import { motion } from 'framer-motion';
import Footer from '../components/Footer';

const LegalPage = ({ title }) => {
  const sections = [
    { t: 'Acceptance of Terms', d: 'By accessing or using Apexverse, you agree to be bound by these terms. If you do not agree, you may not use the platform. Our services are intended for professional use in AI development and data pipeline engineering.' },
    { t: 'User Obligations', d: 'Users are responsible for maintaining the confidentiality of their credentials and for all activities that occur under their account. You must not use the platform to violate any laws or third-party rights, including intellectual property and privacy rights.' },
    { t: 'Data Processing', d: 'Apexverse processes data as instructed by the user. You represent that you have all necessary rights and permissions to perform extraction on the target websites. We reserve the right to suspend accounts that violate our anti-scraping or abuse policies.' },
    { t: 'Limitation of Liability', d: 'To the maximum extent permitted by law, Apexverse shall not be liable for any indirect, incidental, special, or consequential damages resulting from the use or inability to use the platform.' },
    { t: 'Changes to Terms', d: 'We may update these terms from time to time. Your continued use of the platform after such changes constitutes acceptance of the new terms. We will notify users of material changes via email or dashboard notification.' }
  ];

  return (
    <div className="ai">
      <section style={{ maxWidth: 720, margin: '0 auto', padding: '80px 24px' }}>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <h1 style={{ fontSize: 'clamp(32px,5vw,48px)', fontFamily: 'var(--ffd)', fontWeight: 800, marginBottom: 16, letterSpacing: '-.02em' }}>{title}</h1>
          <p style={{ fontSize: 16, color: 'var(--text3)', lineHeight: 1.75, marginBottom: 40 }}>Last Updated: March 14, 2026</p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
            {sections.map((s, i) => (
              <div key={s.t}>
                <h2 style={{ fontSize: 18, fontFamily: 'var(--ffd)', fontWeight: 700, marginBottom: 10 }}>{i + 1}. {s.t}</h2>
                <p style={{ fontSize: 15, color: 'var(--text2)', lineHeight: 1.8 }}>{s.d}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>
      <Footer />
    </div>
  );
};

export default LegalPage;
