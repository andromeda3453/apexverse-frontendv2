
import React, { createContext, useContext } from 'react';

export const ToastContext = createContext(null);
export const useToast = () => useContext(ToastContext);
