
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from './ui/Logo';
import I from './ui/I';
import useAuthStore from '../store/authStore';

const Sidebar = () => {
  const [umOpen, setUmOpen] = useState(false);
  const { logout, user } = useAuthStore();
  const location = useLocation();
  const path = location.pathname;

  const nav = [
    { p: '/dashboard', l: 'Dashboard', ico: 'home' },
    { p: '/crawls', l: 'Crawls', ico: 'activity' },
    { p: '/api-keys', l: 'API Keys', ico: 'key' },
  ];

  return (
    <div className="sidebar">
      <div className="sbh">
        <Link to="/" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
          <Logo />
        </Link>
      </div>
      <div className="sbn">
        <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.07em', color: 'var(--text4)', padding: '6px 11px 4px', marginTop: 4 }}>Main</div>
        {nav.map((item) => (
          <Link key={item.p} className={`ntab${path.startsWith(item.p) ? ' act' : ''}`} to={item.p}>
            <I n={item.ico} s={14} c={path.startsWith(item.p) ? 'var(--text)' : 'var(--text3)'} />
            {item.l}
          </Link>
        ))}
      </div>
      <div className="sbf">
        <div className="rel" style={{ marginTop: 5 }}>
          <button 
            onClick={() => setUmOpen(!umOpen)} 
            style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 8, padding: '6px 9px', borderRadius: 'var(--r)', background: umOpen ? 'var(--bg2)' : 'transparent', border: 'none', cursor: 'pointer', transition: 'background .14s' }}
          >
            <div className="av" style={{ cursor: 'default' }}>{user?.email?.slice(0, 2).toUpperCase() || 'AC'}</div>
            <div style={{ flex: 1, minWidth: 0, textAlign: 'left' }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {user?.email?.split('@')[0] || 'User'}
              </div>
              <div style={{ fontSize: 10, color: 'var(--text4)' }}>{user?.plan_name || 'Free Plan'}</div>
            </div>
            <I n="more-horizontal" s={12} c="var(--text3)" />
          </button>
          
          {umOpen && (
            <div className="dd" style={{ bottom: 'calc(100% + 4px)', top: 'auto', left: 0, right: 0 }}>
              <div style={{ padding: '10px 13px 6px', borderBottom: '1px solid var(--border)' }}>
                <div style={{ fontSize: 12, fontWeight: 600 }}>{user?.email?.split('@')[0] || 'User'}</div>
                <div style={{ fontSize: 11, color: 'var(--text3)' }}>{user?.email}</div>
              </div>
              <Link className="ddi" to="/settings" onClick={() => setUmOpen(false)}>
                <I n="user" s={13} />Account settings
              </Link>
              <div className="ddsep" />
              <button className="ddi ddng" onClick={() => { logout(); setUmOpen(false); }}>
                <I n="log-out" s={13} c="var(--red)" />Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
