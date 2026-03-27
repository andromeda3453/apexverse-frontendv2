
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import I from '../components/ui/I';
import Footer from '../components/Footer';

const PricingPage = () => {
  const [years, setYears] = useState(1);
  const navigate = useNavigate();

  const plans = [
    { id: 's', name: 'Starter', color: 'var(--green)', pages: '2,000', projects: 1, mo: 29, tagline: 'Perfect for small side projects', features: ['2k pages / month', '1 active project', 'JSON/Markdown exports', 'Email support'], cta: 'Start free trial' },
    { id: 'g', name: 'Growth', color: 'var(--brand)', popular: true, pages: '10,000', projects: 5, mo: 149, tagline: 'For growing AI products', features: ['10k pages / month', '5 active projects', 'All export formats', 'Priority support', 'Webhooks'], cta: 'Get started' },
    { id: 'p', name: 'Professional', color: 'var(--blue)', pages: '50,000', projects: 'Unlimited', mo: 499, tagline: 'Scale your AI infrastructure', features: ['50k pages / month', 'Unlimited projects', 'Direct vector DB sync', 'Dedicated support', 'Custom path filters'], cta: 'Go Pro' },
    { id: 'e', name: 'Enterprise', color: 'var(--accent)', pages: 'Custom', projects: 'Unlimited', mo: null, tagline: 'Total control & customization', features: ['Unlimited pages', 'Managed vector DB', 'Custom contracts', 'SLA guarantees', 'White-glove setup'], cta: 'Contact sales' },
  ];

  const addons = [
    { name: 'Extra pages', desc: 'Additional processed pages beyond monthly limit', price: '$1.50', unit: 'per 1k pages', ico: 'file-text' },
    { name: 'Extra projects', desc: 'Add more active projects to any plan', price: '$5.00', unit: 'per project / mo', ico: 'folder' },
    { name: 'Daily sync', desc: 'Upgrade from weekly to daily crawls', price: '$19.00', unit: 'per mo', ico: 'refresh-cw' },
    { name: 'JS crawling', desc: 'Full headless browser for complex SPAs', price: '$3.00', unit: 'per 1k pages', ico: 'cpu' },
  ];

  const calcMo = (mo, yr) => Math.floor(mo * (1 - (yr - 1) * 0.05));
  const calcTotal = (mo, yr) => Math.floor(mo * 12 * yr * (1 - (yr - 1) * 0.05));

  return (
    <div className="ai">
      {/* Hero */}
      <section style={{ padding: '72px 24px 52px', background: 'var(--bg)', textAlign: 'center', borderBottom: '1px solid var(--border)' }}>
        <div className="stag">Pricing</div>
        <h1 style={{ fontSize: 'clamp(28px,5vw,50px)', fontFamily: 'var(--ffd)', fontWeight: 800, marginBottom: 13, letterSpacing: '-.02em' }}>Simple, transparent pricing</h1>
        <p style={{ fontSize: 16, color: 'var(--text3)', maxWidth: 520, margin: '0 auto 28px', lineHeight: 1.65 }}>No free tier. No usage surprises. All paid plans include a <strong>14-day money-back guarantee</strong>.</p>
        
        <div className="fxc" style={{ flexDirection: 'column', gap: 8, justifyContent: 'center' }}>
          <div style={{ fontSize: 13, color: 'var(--text3)' }}>Pay upfront and save <strong style={{ color: 'var(--green)' }}>5% per year</strong></div>
          <div style={{ display: 'flex', gap: 4, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 100, padding: 4, boxShadow: 'var(--sh)', width: 'fit-content', margin: '0 auto' }}>
            {[1, 2, 3, 4, 5].map(y => (
              <button key={y} onClick={() => setYears(y)} style={{ padding: '7px 18px', borderRadius: 100, border: 'none', cursor: 'pointer', fontFamily: 'var(--ff)', fontSize: 13, fontWeight: 600, background: years === y ? 'var(--accent)' : 'transparent', color: years === y ? 'white' : 'var(--text3)', transition: 'all .15s' }}>
                {y === 1 ? 'Monthly' : y + 'yr'}{y > 1 && <span style={{ fontSize: 10, marginLeft: 3, opacity: .75 }}>-{((y - 1) * 5)}%</span>}
              </button>
            ))}
          </div>
          {years > 1 && <div style={{ fontSize: 12, color: 'var(--green)', fontWeight: 600 }}>{(years - 1) * 5}% discount applied - billed upfront</div>}
        </div>
      </section>

      {/* Plan cards */}
      <section className="sec" style={{ padding: '52px 24px 0' }}>
        <div className="g4" style={{ alignItems: 'start', gap: 14 }}>
          {plans.map(plan => (
            <div key={plan.id} style={{ position: 'relative', background: 'var(--surface)', border: '1.5px solid ' + (plan.popular ? 'var(--brand)' : 'var(--border)'), borderRadius: 'var(--rxl)', padding: '28px 22px', boxShadow: plan.popular ? '0 8px 32px rgba(212,98,42,.13)' : 'var(--sh)' }}>
              {plan.popular && <div style={{ position: 'absolute', top: -13, left: '50%', transform: 'translateX(-50%)', background: 'var(--brand)', color: 'white', fontSize: 11, fontWeight: 700, padding: '4px 14px', borderRadius: 100, whiteSpace: 'nowrap', textTransform: 'uppercase', letterSpacing: '.05em' }}>Most Popular</div>}
              
              <div style={{ marginBottom: 20 }}>
                <div className="fxc" style={{ gap: 8, marginBottom: 10 }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: plan.color, flexShrink: 0 }} />
                  <span style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.07em', color: plan.color }}>{plan.name}</span>
                </div>
                <div className="fxc" style={{ gap: 5, marginBottom: 4, alignItems: 'baseline' }}>
                  {plan.mo ? (
                    <>
                      <span style={{ fontFamily: 'var(--ffd)', fontSize: 38, fontWeight: 800, lineHeight: 1 }}>${calcMo(plan.mo, years)}</span>
                      <span style={{ fontSize: 13, color: 'var(--text3)' }}>/mo</span>
                    </>
                  ) : <span style={{ fontFamily: 'var(--ffd)', fontSize: 30, fontWeight: 800 }}>Custom</span>}
                </div>
                {plan.mo && years > 1 && <div style={{ fontSize: 12, color: 'var(--text3)', marginBottom: 6 }}>${calcTotal(plan.mo, years).toLocaleString()} billed for {years} yr</div>}
                <div style={{ fontSize: 12, color: 'var(--text3)', marginBottom: 12, lineHeight: 1.55 }}>{plan.tagline}</div>
                <div style={{ display: 'flex', gap: 14, fontSize: 11, fontWeight: 600, color: 'var(--text3)', paddingTop: 12, borderTop: '1px solid var(--border)' }}>
                  <span><strong style={{ color: 'var(--text)', fontSize: 13 }}>{plan.pages}</strong> pages</span>
                  <span><strong style={{ color: 'var(--text)', fontSize: 13 }}>{plan.projects}</strong> projects</span>
                </div>
              </div>

              <button 
                className={`btn bfw mb4 ${plan.id === 'e' ? 'bs' : plan.popular ? 'bbr' : 'bp'}`}
                style={{ justifyContent: 'center' }}
                onClick={() => navigate(plan.mo ? '/signup' : '/contact')}
              >
                {plan.cta}
              </button>

              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
                {plan.features.map((f, i) => (
                  <li key={i} className="fxc" style={{ gap: 9, alignItems: 'flex-start', fontSize: 12.5, color: 'var(--text2)', lineHeight: 1.5 }}>
                    <I n="check" s={12} c={plan.popular ? 'var(--brand)' : 'var(--green)'} cls="mt1" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Add-ons */}
      <section className="sec" style={{ padding: '80px 24px 0' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div className="stag">Add-Ons</div>
          <h2 style={{ fontSize: 'clamp(22px,3vw,30px)', fontFamily: 'var(--ffd)', marginBottom: 8 }}>Scalable add-ons</h2>
          <p style={{ fontSize: 15, color: 'var(--text3)', maxWidth: 460, margin: '0 auto' }}>Need more capacity or features? Mix and match what you need.</p>
        </div>
        <div className="g4" style={{ gap: 14 }}>
          {addons.map(a => (
            <div key={a.name} className="card ch" style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ width: 38, height: 38, background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14 }}>
                <I n={a.ico} s={16} c="var(--text2)" />
              </div>
              <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 4 }}>{a.name}</div>
              <div style={{ fontSize: 12, color: 'var(--text3)', marginBottom: 16, lineHeight: 1.6, flex: 1 }}>{a.desc}</div>
              <div style={{ paddingTop: 14, borderTop: '1px solid var(--border)' }}>
                <div style={{ fontFamily: 'var(--ffd)', fontSize: 20, fontWeight: 800, color: 'var(--brand)' }}>{a.price}</div>
                <div style={{ fontSize: 11, color: 'var(--text4)' }}>{a.unit}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section style={{ background: 'var(--accent)', padding: '80px 24px', textAlign: 'center', marginTop: 80, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 500, height: 500, borderRadius: '50%', background: 'rgba(255,255,255,.03)', pointerEvents: 'none' }} />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: 540, margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(24px,4vw,38px)', color: 'white', fontFamily: 'var(--ffd)', marginBottom: 12 }}>Ready to build your AI pipeline?</h2>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,.5)', marginBottom: 34, lineHeight: 1.65 }}>Join 40,000+ AI teams using Apexverse for chatbots, RAG, and enterprise search.</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap' }}>
            <button className="btn bbr bxl" onClick={() => navigate('/signup')}>Get started free</button>
            <button className="btn bs bxl" style={{ background: 'rgba(255,255,255,.1)', color: 'white', border: '1px solid rgba(255,255,255,.2)' }} onClick={() => navigate('/contact')}>Talk to sales</button>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default PricingPage;
