
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import I from './I';

const Modal = ({ isOpen, onClose, title, children, footer }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="moverlay" onClick={onClose}>
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="modal"
          onClick={e => e.stopPropagation()}
        >
          <div className="mh fxb">
            <h3 style={{ fontSize: 16, fontWeight: 800, fontFamily: 'var(--ffd)' }}>{title}</h3>
            <button className="bg2btn bsm" onClick={onClose} style={{ padding: 4 }}>
              <I n="x" s={16} c="var(--text3)" />
            </button>
          </div>
          <div className="mbody">
            {children}
          </div>
          {footer && (
            <div className="mf">
              {footer}
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default Modal;
