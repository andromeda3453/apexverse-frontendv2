
const Logo = ({ dark }) => (
  <div className="logo">
    <div className="lm">
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2" />
        <line x1="12" y1="2" x2="12" y2="22" />
        <line x1="2" y1="8.5" x2="22" y2="8.5" />
        <line x1="2" y1="15.5" x2="22" y2="15.5" />
      </svg>
    </div>
    <span className="lt" style={dark ? { color: 'white' } : {}}>
      <span style={dark ? { color: 'white' } : {}}>Apex</span>
      <span style={{ color: 'var(--brand)' }}>verse</span>
    </span>
  </div>
);

export default Logo;
