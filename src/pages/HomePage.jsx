
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import I from '../components/ui/I';
import Spin from '../components/ui/Spin';
import Footer from '../components/Footer';
import { useToast } from '../context/ToastContext';

const HomePage = () => {
  const [url, setUrl] = useState('');
  const [demoing, setDemoing] = useState(false);
  const [demoRes, setDemoRes] = useState(null);
  const [openFaq, setOpenFaq] = useState(null);
  const toast = useToast();

  const faqs = [
    { q: 'What output formats do you support?', a: 'JSON, JSONL, Markdown, chunked text, and CSV metadata - compatible with every major AI pipeline.' },
    { q: 'Can it handle JavaScript-rendered websites?', a: 'Yes. Our JS rendering engine uses a full headless browser for React, Vue, Angular, and any SPA.' },
    { q: 'How does pricing work for large crawls?', a: 'Pages are counted per successful extraction. Upgrade mid-cycle anytime. Unused pages reset monthly.' },
    { q: 'Is there a 14-day money-back guarantee?', a: 'Every paid plan includes a 14-day money-back guarantee. Full refund if you are not satisfied.' },
    { q: 'Do you respect robots.txt?', a: 'By default yes. Enterprise plans can optionally override with the domain owner\'s permission.' },
    { q: 'Which vector databases are supported?', a: 'Pinecone, Qdrant, Weaviate, Milvus, PGVector, Azure AI Search - with more added monthly.' },
  ];

  const handleDemo = () => {
    if (!url) {
      toast('Enter a URL first', 'error');
      return;
    }
    setDemoing(true);
    setTimeout(() => {
      setDemoing(false);
      setDemoRes({ pages: 142, chunks: 1840 });
      toast('Demo complete - 142 pages extracted!', 'success');
    }, 2000);
  };

  return (
    <div className="ai">
      {/* Hero */}
      <section className="hero">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="hbadge"
        >
          <span className="hdot" /> AI Document Intelligence - Now in GA <I n="arrow-right" s={10} c="var(--text3)" />
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Turn Any Website Into<br /><span style={{ color: 'var(--brand)' }}>AI-Ready Data</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Extract, structure, and embed content from any website. Push AI-ready knowledge directly into your vector database - ready for RAG, chatbots, and enterprise AI.
        </motion.p>
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="fxc" style={{ justifyContent: 'center', gap: 11, flexWrap: 'wrap' }}
        >
          <Link className="btn bbr bxl" to="/pricing">See plans <I n="arrow-right" s={15} c="white" /></Link>
          <a className="btn bs blg" href="#features">How it works</a>
        </motion.div>

        {/* URL Demo */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          style={{ maxWidth: 580, margin: '48px auto 0', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--rxl)', padding: 20, boxShadow: 'var(--sh3)' }}
        >
          <div style={{ marginBottom: 12, textAlign: 'left' }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text2)', marginBottom: 1 }}>Try it live - enter any URL</div>
            <div style={{ fontSize: 12, color: 'var(--text4)' }}>Free demo - downloads JSON only. Paid plans unlock all formats.</div>
          </div>
          <div className="fxc" style={{ gap: 9 }}>
            <input 
              className="fi" 
              style={{ flex: 1, fontFamily: 'var(--ffm)', fontSize: 13 }} 
              placeholder="https://docs.yourproduct.com" 
              value={url} 
              onChange={e => setUrl(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && !demoing && handleDemo()}
            />
            <button className="btn bp" onClick={handleDemo} disabled={demoing}>
              {demoing ? <><Spin s={13} />Crawling...</> : <><I n="zap" s={13} c="white" />Extract</>}
            </button>
          </div>
          {demoRes && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              style={{ marginTop: 12, padding: '10px 13px', background: 'var(--bg2)', borderRadius: 'var(--r)', border: '1px solid var(--border)', display: 'flex', gap: 20, flexWrap: 'wrap', overflow: 'hidden' }}
            >
              {[
                ['Pages', demoRes.pages, 'check-circle', 'var(--green)'],
                ['Chunks', demoRes.chunks, 'layers', 'var(--blue)'],
                ['Time', '1.8s', 'clock', 'var(--brand)']
              ].map(([l, v, ico, c]) => (
                <div key={l} className="fxc" style={{ gap: 7 }}>
                  <I n={ico} s={14} c={c} />
                  <div><div style={{ fontFamily: 'var(--ffd)', fontWeight: 800, fontSize: 17, lineHeight: 1 }}>{v}</div><div style={{ fontSize: 11, color: 'var(--text3)' }}>{l}</div></div>
                </div>
              ))}
            </motion.div>
          )}
        </motion.div>
      </section>

      {/* Logo strip */}
      <div style={{ background: 'var(--surface)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', padding: '24px 24px', textAlign: 'center' }}>
        <div style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.08em', color: 'var(--text4)', marginBottom: 16 }}>Trusted by AI teams at</div>
        <div className="fxc" style={{ justifyContent: 'center', gap: 32, flexWrap: 'wrap' }}>
          {['Acme Corp', 'Veritas AI', 'Meridian Labs', 'Apex Systems', 'NovaTech', 'Citadel AI', 'Quantum Data'].map(l => (
            <span key={l} style={{ fontSize: 13, fontWeight: 700, fontFamily: 'var(--ffd)', color: 'var(--text4)', opacity: .5, letterSpacing: '-.01em' }}>{l}</span>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div style={{ background: 'var(--bg2)', borderBottom: '1px solid var(--border)' }}>
        <div className="fxc" style={{ justifyContent: 'center', gap: 48, padding: '28px 24px', flexWrap: 'wrap' }}>
          {[
            ['1.2B+', 'Pages processed'],
            ['40K+', 'Active projects'],
            ['99.9%', 'Uptime SLA'],
            ['<60s', 'Avg extract time']
          ].map(([v, l]) => (
            <div key={l} style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--ffd)', fontSize: 24, fontWeight: 800 }}>{v}</div>
              <div style={{ fontSize: 12, color: 'var(--text3)', marginTop: 2 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* How it works */}
      <section id="features" style={{ padding: '80px 24px', background: 'var(--bg)' }}>
        <div className="sec" style={{ textAlign: 'center' }}>
          <div className="stag">How It Works</div>
          <h2 style={{ fontSize: 'clamp(24px,3.5vw,38px)', marginBottom: 13 }}>From URL to AI-ready in three steps</h2>
          <p style={{ fontSize: 16, color: 'var(--text3)', marginBottom: 48, maxWidth: 480, margin: '0 auto 48px' }}>No complex setup. Point Apexverse at any website and get clean, structured AI output.</p>
          <div className="g3">
            {[
              { n: 1, t: 'Connect your URL', d: 'Enter your target URL, configure depth and path filters.', ico: 'link' },
              { n: 2, t: 'Extract & structure', d: 'Crawl every page, clean content, chunk intelligently.', ico: 'cpu' },
              { n: 3, t: 'Export or deliver', d: 'Download files or push directly to your vector database.', ico: 'send' }
            ].map(s => (
              <div key={s.n} style={{ padding: '26px 22px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--rlg)' }}>
                <div style={{ width: 38, height: 38, background: 'var(--accent)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', fontFamily: 'var(--ffd)', fontWeight: 800, color: 'white', fontSize: 15 }}>{s.n}</div>
                <h3 style={{ fontSize: 16, marginBottom: 8 }}>{s.t}</h3>
                <p style={{ fontSize: 13, color: 'var(--text3)', lineHeight: 1.65 }}>{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ background: 'var(--bg)', padding: '72px 24px' }}>
        <div style={{ maxWidth: 640, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <div className="stag">FAQ</div>
            <h2 style={{ fontSize: 'clamp(22px,3vw,32px)' }}>Common questions</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
            {faqs.map((faq, i) => (
              <div key={i} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--rlg)', overflow: 'hidden' }}>
                <button 
                  onClick={() => setOpenFaq(openFaq === i ? null : i)} 
                  style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 18px', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--ff)', textAlign: 'left' }}
                >
                  <span style={{ fontSize: 14, fontWeight: 600 }}>{faq.q}</span>
                  <I n={openFaq === i ? 'minus' : 'plus'} s={14} c="var(--text3)" />
                </button>
                {openFaq === i && <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} style={{ padding: '0 18px 14px', fontSize: 14, color: 'var(--text3)', lineHeight: 1.7, overflow: 'hidden' }}>{faq.a}</motion.div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: 'var(--accent)', padding: '80px 24px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 500, height: 500, borderRadius: '50%', background: 'rgba(255,255,255,.025)', pointerEvents: 'none' }} />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: 560, margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(24px,4vw,42px)', color: 'white', fontFamily: 'var(--ffd)', marginBottom: 12 }}>Ready to unlock AI document intelligence?</h2>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,.5)', marginBottom: 34, lineHeight: 1.65 }}>Join 40,000+ AI teams using Apexverse for chatbots, RAG, and enterprise search.</p>
          <div className="fxc" style={{ justifyContent: 'center', gap: 11, flexWrap: 'wrap' }}>
            <Link className="btn bxl" style={{ background: 'white', color: 'var(--accent)' }} to="/pricing">See pricing <I n="arrow-right" s={15} c="var(--accent)" /></Link>
            <Link className="btn bxl" style={{ background: 'rgba(255,255,255,.1)', color: 'white', border: '1px solid rgba(255,255,255,.2)' }} to="/contact">Book a demo</Link>
          </div>
          <div style={{ marginTop: 16, fontSize: 12, color: 'rgba(255,255,255,.3)' }}>14-day money-back guarantee - Cancel anytime</div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default HomePage;
