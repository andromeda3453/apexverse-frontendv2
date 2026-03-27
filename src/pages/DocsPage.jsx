
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import I from '../components/ui/I';

const CodeBlock = ({ code, lang = 'bash' }) => (
  <div style={{ 
    margin: '16px 0', 
    background: '#0f172a', 
    borderRadius: '8px', 
    overflow: 'hidden',
    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    border: '1px solid rgba(255,255,255,0.05)'
  }}>
    <div style={{ 
      padding: '8px 16px', 
      background: 'rgba(255,255,255,0.03)', 
      borderBottom: '1px solid rgba(255,255,255,0.05)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <span style={{ fontSize: 11, fontFamily: 'var(--ffm)', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{lang}</span>
      <button 
        onClick={() => {
          navigator.clipboard.writeText(code);
          // Optional: Add toast notification
        }}
        style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', cursor: 'pointer', padding: 4 }}
      >
        <I n="copy" s={14} />
      </button>
    </div>
    <pre style={{ 
      padding: '16px', 
      margin: 0, 
      overflowX: 'auto',
      fontFamily: 'var(--ffm)',
      fontSize: 13,
      lineHeight: 1.6,
      color: '#e2e8f0'
    }}>
      <code>{code}</code>
    </pre>
  </div>
);

const EndpointSpec = ({ name, method, url, desc, params, request, response, errors }) => (
  <div style={{ marginBottom: 64, borderBottom: '1px solid var(--border)', paddingBottom: 64 }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
      <span style={{ 
        padding: '2px 8px', 
        borderRadius: 4, 
        fontSize: 11, 
        fontWeight: 800, 
        fontFamily: 'var(--ffm)',
        background: method === 'POST' ? '#ecfdf5' : method === 'DELETE' ? '#fef2f2' : '#eff6ff',
        color: method === 'POST' ? '#059669' : method === 'DELETE' ? '#dc2626' : '#2563eb',
        border: `1px solid ${method === 'POST' ? '#10b98133' : method === 'DELETE' ? '#ef444433' : '#3b82f633'}`
      }}>{method}</span>
      <span style={{ fontSize: 13, fontFamily: 'var(--ffm)', color: 'var(--text4)', fontWeight: 600 }}>{url}</span>
    </div>
    
    <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16, fontFamily: 'var(--ffd)', color: 'var(--text1)' }}>{name}</h3>
    <p style={{ fontSize: 15, color: 'var(--text3)', lineHeight: 1.6, marginBottom: 24 }}>{desc}</p>

    {params && (
      <div style={{ marginBottom: 32 }}>
        <h4 style={{ fontSize: 13, fontWeight: 700, color: 'var(--text2)', textTransform: 'uppercase', marginBottom: 12, letterSpacing: '0.02em' }}>Parameters</h4>
        <div style={{ border: '1px solid var(--border)', borderRadius: 8, overflow: 'hidden' }}>
          {params.map((p, i) => (
            <div key={i} style={{ 
              padding: '12px 16px', 
              background: i % 2 === 0 ? 'var(--surface)' : 'var(--bg)',
              borderBottom: i === params.length - 1 ? 'none' : '1px solid var(--border)',
              display: 'flex',
              gap: 20
            }}>
              <div style={{ width: 120 }}>
                <span style={{ fontSize: 13, fontFamily: 'var(--ffm)', fontWeight: 600, color: 'var(--brand)' }}>{p.name}</span>
                <div style={{ fontSize: 10, color: 'var(--text4)', fontWeight: 600, marginTop: 2 }}>{p.type}</div>
              </div>
              <div style={{ flex: 1, fontSize: 13, color: 'var(--text3)', lineHeight: 1.5 }}>{p.desc}</div>
            </div>
          ))}
        </div>
      </div>
    )}

    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: 32 }}>
      <div>
        <h4 style={{ fontSize: 13, fontWeight: 700, color: 'var(--text2)', textTransform: 'uppercase', marginBottom: 12, letterSpacing: '0.02em' }}>Request Example</h4>
        <CodeBlock lang="curl" code={request.curl} />
        <CodeBlock lang="json" code={request.json} />
      </div>
      <div>
        <h4 style={{ fontSize: 13, fontWeight: 700, color: 'var(--text2)', textTransform: 'uppercase', marginBottom: 12, letterSpacing: '0.02em' }}>Response Example</h4>
        <CodeBlock lang="json" code={response} />
      </div>
    </div>

    {errors && (
      <div style={{ marginTop: 24 }}>
        <h4 style={{ fontSize: 13, fontWeight: 700, color: 'var(--text2)', textTransform: 'uppercase', marginBottom: 12, letterSpacing: '0.02em' }}>Possible Errors</h4>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          {errors.map((e, i) => (
            <div key={i} style={{ padding: '6px 12px', borderRadius: 6, border: '1px solid var(--border)', fontSize: 12, background: 'var(--surface)' }}>
              <span style={{ fontWeight: 700, color: 'var(--text2)', marginRight: 6 }}>{e.code}</span>
              <span style={{ color: 'var(--text4)' }}>{e.desc}</span>
            </div>
          ))}
        </div>
      </div>
    )}
  </div>
);

const DocsPage = () => {
  const [activeTab, setActiveTab ] = useState('api');

  const apiEndpoints = [
    {
      name: 'Authentication',
      desc: 'All API requests must include an API Key in the X-API-KEY header or as a Bearer token. You can manage your API keys in the dashboard.',
      method: 'HEADER',
      url: 'Authentication',
      request: {
        curl: `curl -H "X-API-KEY: sk_live_your_key" https://api.apexverse.ai/v1/crawl/jobs`,
        json: `// Alternatively use Bearer token\nAuthorization: Bearer sk_live_your_key`
      },
      response: `// Success Response (200 OK)\n[\n  {\n    "id": "uuid-v4",\n    "status": "completed",\n    "results_count": 1,\n    "created_at": "2024-03-24T12:00:00Z"\n  }\n]`,
      errors: [
        { code: '401', desc: 'Invalid API Key' },
        { code: '403', desc: 'Forbidden - Quota Exceeded' }
      ]
    },
    {
      name: 'Start a Crawl Job',
      method: 'POST',
      url: '/crawl/run',
      desc: 'Queues a new extraction task. Supports both single-page and multi-level deep crawls. Results are processed asynchronously.',
      params: [
        { name: 'url', type: 'string', desc: 'The starting URL to crawl.' },
        { name: 'is_deep_crawl', type: 'boolean', desc: 'Enable recursive crawling (Default: false).' },
        { name: 'max_depth', type: 'int', desc: 'Crawl depth (0-10). Only used if is_deep_crawl is true.' },
        { name: 'max_pages', type: 'int', desc: 'Max pages to extract (Default: 1).' },
        { name: 'format', type: 'string', desc: 'Output format: "markdown", "json".' }
      ],
      request: {
        curl: `curl -X POST https://api.apexverse.ai/v1/crawl/run \\\n  -H "X-API-KEY: sk_live_..." \\\n  -H "Content-Type: application/json" \\\n  -d '{"url": "https://example.com", "is_deep_crawl": true, "max_depth": 2}'`,
        json: `{\n  "url": "https://example.com",\n  "is_deep_crawl": true,\n  "max_depth": 2,\n  "max_pages": 50\n}`
      },
      response: `{\n  "id": "j98bc...",\n  "status": "queued",\n  "is_deep_crawl": true,\n  "max_depth": 2,\n  "max_pages": 50\n}`,
      errors: [
        { code: '201', desc: 'Created' },
        { code: '402', desc: 'Monthly page limit exceeded' }
      ]
    },
    {
      name: 'Get Job Results',
      method: 'GET',
      url: '/crawl/results/{job_id}',
      desc: 'Retrieves the extracted and structured content from a completed crawl job. For deep crawls, this returns an array of all pages captured.',
      params: [
        { name: 'job_id', type: 'uuid', desc: 'The ID of the crawl job.' }
      ],
      request: {
        curl: `curl https://api.apexverse.ai/v1/crawl/results/{job_id} \\\n  -H "X-API-KEY: sk_live_..."`,
        json: `// GET Request - no body required`
      },
      response: `{\n  "job": {\n    "id": "j98bc20c...",\n    "status": "completed",\n    "results_count": 1\n  },\n  "results": [\n    {\n      "url": "https://example.com",\n      "depth": 0,\n      "content_markdown": "# Title\\nBody text...",\n      "metadata_": { "title": "Example" }\n    }\n  ]\n}`,
      errors: [
        { code: '200', desc: 'OK' },
        { code: '404', desc: 'Job not found' }
      ]
    },
    {
      name: 'Check Usage',
      method: 'GET',
      url: '/usage',
      desc: 'Get your current consumption stats, limits, and plan details.',
      request: {
        curl: `curl https://api.apexverse.ai/v1/usage \\\n  -H "X-API-KEY: sk_live_..."`,
        json: `// GET Request - no body required`
      },
      response: `{\n  "pages_used": 145,\n  "page_limit": 5000,\n  "plan_name": "Pro",\n  "current_period_end": "2024-04-24T12:00:00Z"\n}`,
      errors: [
        { code: '200', desc: 'OK' }
      ]
    }
  ];

  return (
    <div style={{ display: 'flex', flex: 1, minHeight: 'calc(100vh - 60px)', background: 'var(--bg)' }}>
      {/* Side Nav */}
      <div style={{ 
        width: 240, 
        flexShrink: 0, 
        borderRight: '1px solid var(--border)', 
        background: 'var(--surface)', 
        padding: '24px 12px', 
        position: 'sticky', 
        top: 60, 
        height: 'calc(100vh - 60px)', 
        overflowY: 'auto' 
      }}>
        <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.07em', color: 'var(--text4)', padding: '0 12px', marginBottom: 12 }}>Documentation</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <button 
            className={`ntab act`} 
            style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', border: 'none', background: 'none', cursor: 'pointer', borderRadius: 'var(--r)', width: '100%', textAlign: 'left', fontSize: 13, fontWeight: 600, color: 'var(--brand)', transition: 'all .15s' }}
          >
            <I n="code" s={14} c="var(--brand)" />
            API Reference
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div style={{ flex: 1, padding: '48px 60px', overflowY: 'auto' }}>
        <div style={{ maxWidth: 1000 }}>
          <header style={{ marginBottom: 64 }}>
            <h1 style={{ fontSize: 42, fontFamily: 'var(--ffd)', fontWeight: 800, marginBottom: 16, letterSpacing: '-.03em', color: 'var(--text1)' }}>API Documentation</h1>
            <p style={{ fontSize: 18, color: 'var(--text3)', lineHeight: 1.6 }}>
              Welcome to the Apexverse API Reference. Use our API to programmatically manage projects, trigger crawls, and retrieve structured data from the web.
            </p>
          </header>

          <section>
            <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 32, fontFamily: 'var(--ffd)', color: 'var(--text1)', borderBottom: '1px solid var(--border)', paddingBottom: 16 }}>
              Core Resources
            </h2>
            
            {apiEndpoints.map((ep, i) => (
              <EndpointSpec key={i} {...ep} />
            ))}
          </section>

          <footer style={{ marginTop: 64, padding: '48px 32px', background: 'var(--surface)', borderRadius: 12, border: '1px solid var(--border)', textAlign: 'center' }}>
            <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>Need help?</h3>
            <p style={{ color: 'var(--text3)', marginBottom: 24 }}>Can't find what you're looking for? Our developer support team is happy to help.</p>
            <button className="btn bp" onClick={() => window.open('mailto:support@apexverse.ai')}>Contact Support</button>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default DocsPage;
