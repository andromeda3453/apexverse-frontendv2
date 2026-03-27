
import React from 'react';
import { motion } from 'framer-motion';
import Footer from '../components/Footer';

const IntegrationsPage = () => {
  const categories = [
    {
      t: 'Vector Databases',
      items: [
        ['Pinecone', '#1F6BD5', 'P', 'active'],
        ['Qdrant', '#DC3545', 'Q', 'active'],
        ['Weaviate', '#4CAF50', 'W', 'active'],
        ['PGVector', '#336791', 'PG', 'active'],
        ['Milvus', '#00B4D8', 'M', 'active'],
        ['Azure AI Search', '#0078D4', 'Az', 'active']
      ]
    },
    {
      t: 'AI Platforms',
      items: [
        ['OpenAI Embeddings', '#000', 'OA', 'active'],
        ['Cohere Embed', '#D4622A', 'Co', 'active'],
        ['AWS Bedrock', '#FF9900', 'AW', 'coming-soon'],
        ['Google Vertex AI', '#4285F4', 'G', 'coming-soon'],
        ['Custom REST API', '#6B7280', 'API', 'active']
      ]
    },
    {
      t: 'Authentication & SSO',
      items: [
        ['Okta', '#007DC1', 'Ok', 'active'],
        ['Azure AD', '#0078D4', 'AD', 'active'],
        ['Google Workspace', '#EA4335', 'GW', 'active'],
        ['GitHub OAuth', '#333', 'GH', 'active']
      ]
    },
  ];

  return (
    <div className="ai">
      <section style={{ padding: '72px 24px 48px', background: 'var(--bg)', textAlign: 'center', borderBottom: '1px solid var(--border)' }}>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="stag">Integrations</motion.div>
        <motion.h1 
          initial={{ opacity: 0, y: 10 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.1 }}
          style={{ fontSize: 'clamp(28px,5vw,46px)', fontFamily: 'var(--ffd)', fontWeight: 800, marginBottom: 13, letterSpacing: '-.02em' }}
        >
          Connect to your entire AI stack
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay: 0.2 }}
          style={{ fontSize: 16, color: 'var(--text3)', maxWidth: 480, margin: '0 auto', lineHeight: 1.65 }}
        >
          Apexverse delivers structured data directly to the tools your team already uses.
        </motion.p>
      </section>

      <section className="sec" style={{ maxWidth: 1020, margin: '0 auto', padding: '56px 24px' }}>
        {categories.map((g, gi) => (
          <motion.div 
            key={g.t} 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: gi * 0.1 }}
            style={{ marginBottom: 44 }}
          >
            <h2 style={{ fontSize: 18, fontFamily: 'var(--ffd)', marginBottom: 14 }}>{g.t}</h2>
            <div className="g3" style={{ gap: 14 }}>
              {g.items.map(([name, c, l, status]) => (
                <div 
                  key={name} 
                  className="card ch"
                  style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '13px 16px' }}
                >
                  <div style={{ width: 36, height: 36, background: `${c}14`, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: c, flexShrink: 0 }}>{l}</div>
                  <div style={{ flex: 1 }}><div style={{ fontSize: 13, fontWeight: 600, marginBottom: 1 }}>{name}</div></div>
                  {status === 'coming-soon' ? (
                    <span className="badge" style={{ background: 'var(--bg2)', color: 'var(--text3)', fontSize: 10 }}>Soon</span>
                  ) : (
                    <span className="badge bgg" style={{ fontSize: 10 }}>Live</span>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </section>

      <section style={{ background: 'var(--bg2)', padding: '80px 24px', textAlign: 'center', borderTop: '1px solid var(--border)' }}>
        <h2 style={{ fontSize: 24, fontFamily: 'var(--ffd)', marginBottom: 10 }}>Missing an integration?</h2>
        <p style={{ fontSize: 14, color: 'var(--text3)', maxWidth: 400, margin: '0 auto 24px' }}>We're adding new destinations every week. Request one for your team.</p>
        <button className="btn bp">Request Integration</button>
      </section>

      <Footer />
    </div>
  );
};

export default IntegrationsPage;
