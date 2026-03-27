
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

const AboutPage = () => {
  return (
    <div className="ai">
      <section style={{ padding: '80px 24px', background: 'var(--bg)', textAlign: 'center' }}>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="stag">Our Story</motion.div>
        <motion.h1 
          initial={{ opacity: 0, y: 10 }} 
          animate={{ opacity: 1, y: 0 }}
          style={{ fontSize: 'clamp(28px,5vw,50px)', fontFamily: 'var(--ffd)', fontWeight: 800, marginBottom: 20 }}
        >
          Building the knowledge layer<br />for the AI era
        </motion.h1>
      </section>

      <section style={{ maxWidth: 680, margin: '0 auto', padding: '0 24px 80px' }}>
        <div style={{ fontSize: 16, color: 'var(--text2)', lineHeight: 1.8, display: 'flex', flexDirection: 'column', gap: 24 }}>
          <p>
            Apexverse was founded in 2024 with a simple but ambitious mission: to make the world's web knowledge accessible and actionable for AI models.
          </p>
          <p>
            As AI developers ourselves, we spent more time building custom scrapers and cleaning messy HTML than actually building intelligence. We realized that every AI team was reinventing the same fragile data extraction pipeline.
          </p>
          <p>
            We built Apexverse to be the engine that powers the next generation of RAG, chatbots, and enterprise search. By handling the complexities of crawling, rendering, cleaning, and chunking, we let you focus on what matters most: your users and your models.
          </p>
          <p>
            Today, Apexverse's distributed platform processes over 100 million pages per month for some of the world's most innovative companies.
          </p>
          
          <div className="card mt4" style={{ textAlign: 'center', padding: '40px' }}>
            <h3 style={{ fontSize: 20, fontFamily: 'var(--ffd)', marginBottom: 16 }}>Ready to join us?</h3>
            <p style={{ fontSize: 14, color: 'var(--text3)', marginBottom: 24 }}>Start building your AI document intelligence pipeline in minutes.</p>
            <div className="fxc" style={{ justifyContent: 'center', gap: 12 }}>
              <Link className="btn bp blg" to="/signup">Get Started</Link>
              <Link className="btn bs blg" to="/pricing">View Plans</Link>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default AboutPage;
