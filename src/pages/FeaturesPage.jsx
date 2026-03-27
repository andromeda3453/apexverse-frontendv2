
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import I from '../components/ui/I';
import Footer from '../components/Footer';

const FeaturesPage = () => {
  const features = [
    {
      ico: 'globe',
      t: 'Intelligent Crawling',
      c: 'var(--brand)',
      d: 'Distributed crawler designed for any web architecture - from simple static HTML to complex sitemaps.',
      points: ['Sitemap.xml parsing', 'robots.txt compliance', 'Rate limiting controls', 'Multi-domain support']
    },
    {
      ico: 'cpu',
      t: 'JavaScript Rendering',
      c: 'var(--blue)',
      d: 'Full headless browser execution for React, Vue, Angular, and any JS-rendered single-page application.',
      points: ['Full Chromium rendering', 'SPA route discovery', 'Dynamic content waiting', 'Session handling']
    },
    {
      ico: 'layers',
      t: 'Smart Chunking',
      c: 'var(--green)',
      d: 'Intelligently split content into RAG-optimal chunks with semantic boundary detection and overlapping.',
      points: ['256-4096 token sizes', 'Semantic boundary detection', 'Sliding window overlap', 'Header-aware splitting']
    },
    {
      ico: 'database',
      t: 'Vector DB Delivery',
      c: 'var(--yellow)',
      d: 'Deliver structured data directly to all major vector stores with automatic index and namespace management.',
      points: ['Pinecone, Qdrant, Weaviate', 'PGVector, Azure AI Search', 'Custom REST endpoints', 'Auto namespace mgmt']
    },
  ];

  return (
    <div className="ai">
      <section style={{ padding: '72px 24px 48px', background: 'var(--bg)', textAlign: 'center', borderBottom: '1px solid var(--border)' }}>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="stag">Platform Features</motion.div>
        <motion.h1 
          initial={{ opacity: 0, y: 10 }} 
          animate={{ opacity: 1, y: 0 }} 
          style={{ fontSize: 'clamp(28px,5vw,50px)', fontFamily: 'var(--ffd)', fontWeight: 800, marginBottom: 13, letterSpacing: '-.02em' }}
        >
          Engineered for AI production
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          style={{ fontSize: 16, color: 'var(--text3)', maxWidth: 480, margin: '0 auto 30px', lineHeight: 1.65 }}
        >
          Every feature built for enterprise AI pipelines - reliable, scalable, and highly configurable.
        </motion.p>
        <Link className="btn bbr blg" to="/pricing">See plans <I n="arrow-right" s={14} c="white" /></Link>
      </section>

      <div style={{ maxWidth: 1020, margin: '0 auto', padding: '60px 24px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 72 }}>
          {features.map((f, i) => (
            <div key={f.t} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'center' }}>
              <motion.div 
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                style={{ order: i % 2 === 0 ? 1 : 2 }}
              >
                <div style={{ width: 44, height: 44, background: `${f.c}14`, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                  <I n={f.ico} s={20} c={f.c} />
                </div>
                <h2 style={{ fontSize: 'clamp(20px,3vw,28px)', fontFamily: 'var(--ffd)', fontWeight: 800, marginBottom: 12 }}>{f.t}</h2>
                <p style={{ fontSize: 15, color: 'var(--text3)', lineHeight: 1.7, marginBottom: 24 }}>{f.d}</p>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {f.points.map(p => (
                    <li key={p} className="fxc" style={{ gap: 10, fontSize: 14, color: 'var(--text2)', fontWeight: 500 }}>
                      <I n="check-circle" s={16} c="var(--green)" />
                      {p}
                    </li>
                  ))}
                </ul>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, x: i % 2 === 0 ? 20 : -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                style={{ order: i % 2 === 0 ? 2 : 1, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--rxl)', padding: 32, boxShadow: 'var(--sh3)' }}
              >
                <div style={{ background: `${f.c}05`, border: `1px solid ${f.c}15`, borderRadius: 'var(--rlg)', padding: '24px' }}>
                  <div className="fxc" style={{ gap: 8, marginBottom: 16 }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: f.c }} />
                    <span style={{ fontSize: 11, fontWeight: 700, color: f.c, textTransform: 'uppercase', letterSpacing: '.1em' }}>{f.t} v2.4</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {f.points.map((p, pi) => (
                      <div key={pi} className="fxc" style={{ gap: 10, padding: '10px 14px', background: 'var(--surface)', borderRadius: 'var(--r)', border: '1px solid var(--border)', boxShadow: '0 1px 2px rgba(0,0,0,.02)' }}>
                        <div style={{ width: 4, height: 4, borderRadius: '50%', background: f.c, flexShrink: 0 }} />
                        <span style={{ fontSize: 12, color: 'var(--text2)', fontWeight: 600 }}>{p}</span>
                        <div style={{ flex: 1 }} />
                        <span style={{ fontSize: 10, color: 'var(--green)', fontWeight: 700 }}>LIVE</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>

      <section style={{ padding: '80px 24px', background: 'var(--accent)', textAlign: 'center', marginTop: 40 }}>
        <h2 style={{ fontSize: 28, color: 'white', fontFamily: 'var(--ffd)', fontWeight: 800, marginBottom: 12 }}>Ready to optimize your knowledge pipeline?</h2>
        <p style={{ fontSize: 16, color: 'rgba(255,255,255,.6)', marginBottom: 32 }}>Build, test, and deploy extraction in minutes.</p>
        <div className="fxc" style={{ justifyContent: 'center', gap: 12 }}>
          <Link className="btn bxl" style={{ background: 'white', color: 'var(--accent)' }} to="/signup">Start free trial</Link>
          <button className="btn bxl" style={{ border: '1px solid rgba(255,255,255,.2)', color: 'white' }}>Schedule Demo</button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FeaturesPage;
