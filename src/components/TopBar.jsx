
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import I from './ui/I';

const TopBar = ({ title, sub, actions }) => {
  return (
    <div className="topbar">
      <div>
        <div style={{ fontSize: 14, fontWeight: 700, fontFamily: 'var(--ffd)', lineHeight: 1.2 }}>{title}</div>
        {sub && <div style={{ fontSize: 11, color: 'var(--text3)' }}>{sub}</div>}
      </div>
      <div className="fxc" style={{ gap: 8 }}>
        {actions}
      </div>
    </div>
  );
};

export default TopBar;
