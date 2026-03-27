
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from './ui/Logo';
import I from './ui/I';
import useAuthStore from '../store/authStore';

const PubNav = () => {
  const { isAuthenticated } = useAuthStore();
  const location = useLocation();
  const page = location.pathname.split('/')[1] || 'home';

  const links = [
    { p: 'features', l: 'Features', to: '/features' },
    { p: 'integrations', l: 'Integrations', to: '/integrations' },
    { p: 'pricing', l: 'Pricing', to: '/pricing' },
    { p: 'enterprise', l: 'Enterprise', to: '/enterprise' },
    { p: 'docs', l: 'Docs', to: '/docs' },
  ];

  return (
    <nav className="pnav">
      <div className="pni">
        <div className="fxc" style={{ gap: 32 }}>
          <Link to="/" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
            <Logo />
          </Link>
          <div className="fxc" style={{ gap: 1 }}>
            {links.map(({ p, l, to }) => (
              to.startsWith('#') || to.startsWith('/#') ? (
                <a key={p} className={`nlink${page === p ? ' nact' : ''}`} href={to}>{l}</a>
              ) : (
                <Link key={p} className={`nlink${location.pathname === to ? ' nact' : ''}`} to={to}>{l}</Link>
              )
            ))}
          </div>
        </div>
        <div className="fxc" style={{ gap: 8 }}>
          {isAuthenticated ? (
            <Link className="btn bp bsm" to="/dashboard">
              <I n="home" s={13} c="white" /> Dashboard
            </Link>
          ) : (
            <>
              <Link className="btn bg2btn bsm" to="/login">Log in</Link>
              <Link className="btn bp bsm" to="/pricing">Get started</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default PubNav;
