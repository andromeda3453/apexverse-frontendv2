
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../services/api';

import { Link } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import { useToast } from '../context/ToastContext';
import TopBar from '../components/TopBar';
import I from '../components/ui/I';

const Settings = () => {
  const { user, fetchUser } = useAuthStore();
  const [name, setName] = useState(user?.display_name || user?.email?.split('@')[0] || '');
  const [email, setEmail] = useState(user?.email || '');
  const toast = useToast();
  const queryClient = useQueryClient();

  const profileMutation = useMutation({
    mutationFn: (data) => api.put('/auth/profile', data),
    onSuccess: () => {
      toast('Profile updated successfully', 'success');
      fetchUser();
    },
    onError: (err) => toast(err.response?.data?.detail || 'Failed to update profile', 'error')
  });

  const handleSave = (e) => {
    e.preventDefault();
    profileMutation.mutate({ name });
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <TopBar title="Settings" sub="Manage your account preferences" />
      <div className="pc ai" style={{ maxWidth: 800 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <section>
            <h2 style={{ fontSize: 18, fontFamily: 'var(--ffd)', fontWeight: 800, marginBottom: 16 }}>Profile Information</h2>
            <div className="card">
              <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div className="fxc" style={{ gap: 20 }}>
                  <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'var(--accent)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, fontWeight: 800, fontFamily: 'var(--ffd)' }}>
                    {name.slice(0, 1).toUpperCase()}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div className="fg mb3"><label className="fl">Display Name</label><input className="fi" value={name} onChange={e => setName(e.target.value)} /></div>
                    <div className="fg"><label className="fl">Email Address</label><input className="fi" value={email} onChange={e => setEmail(e.target.value)} disabled /></div>
                  </div>
                </div>
                <div style={{ paddingTop: 16, borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'flex-end' }}>
                  <button type="submit" className="btn bp">Update profile</button>
                </div>
              </form>
            </div>
          </section>

          <section>
            <h2 style={{ fontSize: 18, fontFamily: 'var(--ffd)', fontWeight: 800, marginBottom: 16 }}>Security & Access</h2>
            <div className="card fxb">
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: 14, fontWeight: 700 }}>API Credentials</h3>
                <p style={{ fontSize: 12, color: 'var(--text3)' }}>Manage your secret keys for programmatic access to the Apexverse API.</p>
              </div>
              <Link className="btn bs bsm" to="/api-keys">Manage Keys</Link>
            </div>
          </section>

        </div>
      </div>
    </motion.div>
  );
};

export default Settings;
