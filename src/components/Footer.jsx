
import React from 'react';
import Logo from './ui/Logo';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const columns = [
    {
      h: 'Product',
      links: [
        { l: 'Features', to: '#features' },
        { l: 'Integrations', to: '#integrations' },
        { l: 'Pricing', to: '/pricing' },
        { l: 'Enterprise', to: '#enterprise' },
        { l: 'Changelog', to: '#' },
      ],
    },
    {
      h: 'Developers',
      links: [
        { l: 'Docs', to: '#docs' },
        { l: 'API Reference', to: '#api' },
        { l: 'SDKs', to: '#' },
        { l: 'Status', to: '#' },
        { l: 'Security', to: '#security' },
      ],
    },
    {
      h: 'Company',
      links: [
        { l: 'About', to: '#' },
        { l: 'Blog', to: '#' },
        { l: 'Careers', to: '#' },
        { l: 'Contact', to: '#' },
        { l: 'Privacy', to: '#' },
      ],
    },
    {
      h: 'Legal',
      links: [
        { l: 'Terms', to: '#' },
        { l: 'Privacy', to: '#' },
        { l: 'Cookies', to: '#' },
        { l: 'DPA', to: '#' },
      ],
    },
  ];

  return (
    <footer className="footer">
      <div className="fg2">
        <div className="fc">
          <Logo dark />
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,.32)', marginTop: 13, lineHeight: 1.7, maxWidth: 240 }}>
            The future of AI document intelligence. Extract, embed and deliver knowledge from any source.
          </p>
        </div>
        {columns.map((col) => (
          <div key={col.h} className="fc">
            <h4>{col.h}</h4>
            {col.links.map((link) => (
              <a key={link.l} className="fl2" href={link.to}>{link.l}</a>
            ))}
          </div>
        ))}
      </div>
      <div className="fb">
        <span>(c) {currentYear} Apexverse, Inc. All rights reserved.</span>
        <div className="fxc" style={{ gap: 18 }}>
          {['Twitter/X', 'LinkedIn', 'GitHub'].map((s) => (
            <button key={s} className="fl2" style={{ margin: 0 }}>{s}</button>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
