
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../services/api';
import TopBar from '../components/TopBar';
import I from '../components/ui/I';
import Spin from '../components/ui/Spin';
import { useToast } from '../context/ToastContext';

const CreateProject = () => {
  const [name, setName] = useState('');
  const [url, setUrl] = useState(''); // Kept as optional metadata
  const navigate = useNavigate();
  const toast = useToast();
  const queryClient = useQueryClient();

  const launchMutation = useMutation({
    mutationFn: async (data) => {
      // ONLY Create Project
      const projectRes = await api.post('/projects', { name: data.name });
      return projectRes.data;
    },
    onSuccess: (project) => {
      queryClient.invalidateQueries(['projects']);
      toast('Project created successfully!', 'success');
      navigate(`/projects/${project.id}`);
    },
    onError: (err) => {
      toast(err.response?.data?.detail || 'Failed to create project', 'error');
    }
  });

  const handleLaunch = (e) => {
    e.preventDefault();
    if (!name) {
      toast('Please enter a project name', 'error');
      return;
    }
    launchMutation.mutate({ name, url });
  };

  return (
    <div>
      <TopBar title="New Project" sub="Create a container for your crawl jobs" />
      <div className="pc ai" style={{ maxWidth: 640 }}>
        <div className="card">
          <h2 style={{ fontSize: 20, fontFamily: 'var(--ffd)', fontWeight: 800, marginBottom: 8 }}>Project Details</h2>
          <p style={{ fontSize: 13, color: 'var(--text3)', marginBottom: 24 }}>Projects help you organize your crawls and results.</p>
          
          <form onSubmit={handleLaunch} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div className="fg">
              <label className="fl">Project Name</label>
              <input className="fi" placeholder="e.g. Documentation Portal" value={name} onChange={e => setName(e.target.value)} />
            </div>
            <div className="fg">
              <label className="fl">Default Target URL (Optional)</label>
              <input className="fi" placeholder="https://docs.acme.io" value={url} onChange={e => setUrl(e.target.value)} />
              <span style={{ fontSize: 11, color: 'var(--text4)' }}>Used as a reference for your API calls.</span>
            </div>

            <div className="alert min aii" style={{ padding: '12px 14px', marginTop: 12 }}>
              <I n="info" s={16} c="var(--blue)" />
              <div style={{ fontSize: 13, lineHeight: 1.5 }}>
                After creating this project, you can start crawling pages using your <strong>API Keys</strong> and the project ID.
              </div>
            </div>

            <div className="fxb" style={{ marginTop: 24, paddingTop: 24, borderTop: '1px solid var(--border)' }}>
              <button type="button" className="btn bs blg" onClick={() => navigate('/projects')} disabled={launchMutation.isPending}>
                Cancel
              </button>
              <button type="submit" className="btn bp blg" disabled={launchMutation.isPending}>
                {launchMutation.isPending ? <Spin s={16} /> : 'Create Project'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateProject;
