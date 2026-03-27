
const SBadge = ({ status }) => {
  const m = {
    active: { cls: 'bgg', l: 'Active', dot: true },
    processing: { cls: 'bgb', l: 'Processing', dot: true },
    failed: { cls: 'bgr2', l: 'Failed' },
    completed: { cls: 'bgg', l: 'Completed' },
    pending: { cls: 'bgy', l: 'Pending' },
    extracted: { cls: 'bgg', l: 'Extracted' },
    skipped: { cls: 'bggr', l: 'Skipped' },
    paid: { cls: 'bgg', l: 'Paid' },
    ready: { cls: 'bgg', l: 'Ready' },
  };
  const c = m[status] || { cls: 'bggr', l: status };
  return (
    <span className={'badge ' + c.cls}>
      {c.dot && <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'currentColor', flexShrink: 0 }} />}
      {c.l}
    </span>
  );
};

export default SBadge;
