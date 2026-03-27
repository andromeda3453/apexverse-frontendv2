
import React, { useState, useCallback } from 'react';
import I from './ui/I';
import { ToastContext } from '../context/ToastContext';

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const show = useCallback((msg, type = 'success') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, msg, type }]);
    setTimeout(() => setToasts((prev) => prev.filter((x) => x.id !== id)), 3200);
  }, []);

  const icons = { 
    success: 'check-circle', 
    error: 'alert-circle', 
    warning: 'alert-triangle', 
    info: 'info' 
  };
  
  const colors = { 
    success: 'var(--green)', 
    error: 'var(--red)', 
    warning: 'var(--yellow)', 
    info: 'var(--blue)' 
  };

  return (
    <ToastContext.Provider value={show}>
      {children}
      <div className="tc">
        {toasts.map((t) => (
          <div key={t.id} className={'toast tt' + t.type[0]}>
            <I n={icons[t.type]} s={16} c={colors[t.type]} />
            <span style={{ fontSize: 14, color: 'var(--text)', flex: 1 }}>{t.msg}</span>
            <button 
              onClick={() => setToasts((prev) => prev.filter((x) => x.id !== t.id))} 
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text3)', padding: 0 }}
            >
              <I n="x" s={13} />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};
