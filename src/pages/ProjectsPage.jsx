
import React from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import api from '../services/api';
import TopBar from '../components/TopBar';
import I from '../components/ui/I';
import SBadge from '../components/ui/SBadge';
import Spin from '../components/ui/Spin';

import { useToast } from '../context/ToastContext';

const ProjectsPage = () => {
  const navigate = useNavigate();
  const toast = useToast();

  const { data: projects, isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: () => api.get('/projects').then(res => res.data)
  });

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <TopBar 
        title="Projects" 
        sub={`${projects?.length || 0} total`} 
        actions={
          <Link className="btn bp bsm" to="/projects/create">
            <I n="plus" s={13} c="white" />New project
          </Link>
        }
      />
      
      <div className="pc ai">
        {isLoading ? (
          <div style={{ padding: 100, textAlign: 'center' }}><Spin s={24} /></div>
        ) : !projects || projects.length === 0 ? (
            <div className="empty">
              <div className="ei"><I n="folder" s={28} c="var(--text3)" /></div>
              <h3>No projects found</h3>
              <p>Create a project to organize your API-driven crawls.</p>
              <Link className="btn bp mt4" to="/projects/create">
                <I n="plus" s={13} c="white" />Create project
              </Link>
            </div>
          ) : (
            <div className="dtw">
              <table className="dt">
                <thead>
                  <tr>
                    <th>Project</th>
                    <th>Status</th>
                    <th>Created</th>
                  </tr>
                </thead>
                <tbody>
                  {projects.map(p => (
                    <tr key={p.id} className="ptr" onClick={() => navigate(`/projects/${p.id}`)}>
                      <td>
                        <div className="fxc" style={{ gap: 11 }}>
                          <div style={{ width: 34, height: 34, background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                            <I n="folder" s={14} c="var(--text3)" />
                          </div>
                          <div style={{ minWidth: 0 }}>
                            <div className="tru" style={{ fontWeight: 600, fontSize: 13 }}>{p.name}</div>
                            <div className="tru" style={{ fontSize: 11, color: 'var(--text3)', fontFamily: 'var(--ffm)' }}>ID: {p.id.slice(0, 8)}...</div>
                          </div>
                        </div>
                      </td>
                      <td><SBadge status={p.status || 'active'} /></td>
                      <td style={{ fontSize: 12, color: 'var(--text3)' }}>{new Date(p.created_at).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
        )}
      </div>
    </motion.div>
  );
};

export default ProjectsPage;
