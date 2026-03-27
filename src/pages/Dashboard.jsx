
import React from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import api from '../services/api';
import useAuthStore from '../store/authStore';
import TopBar from '../components/TopBar';
import I from '../components/ui/I';
import Spin from '../components/ui/Spin';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();

  const { data: usage, isLoading: usageLoading } = useQuery({
    queryKey: ['usage'],
    queryFn: () => api.get('/usage').then(res => res.data),
    refetchInterval: 5000
  });

  const { data: crawls, isLoading: crawlsLoading } = useQuery({
    queryKey: ['recent-crawls'],
    queryFn: () => api.get('/crawl/jobs').then(res => res.data.slice(0, 4)),
    refetchInterval: 5000
  });

  const bars = [65, 80, 45, 90, 72, 85, 60, 95, 70, 88, 75, 100];
  const months = ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'];

  const pct = usage ? Math.round((usage.pages_used / usage.page_limit) * 100) : 0;
  const isHigh = pct > 90;

  if (usageLoading || crawlsLoading) {
    return (
      <div>
        <TopBar title="Dashboard" sub="Loading your overview..." />
        <div className="pc">
          <div className="g4 mb4">
            {[1, 2, 3, 4].map(i => <div key={i} className="mc sk" style={{ height: 100 }} />)}
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <TopBar 
        title="Dashboard" 
        sub={`Logged in as ${user?.email}`} 
        actions={
          <Link className="btn bp bsm" to="/crawls">
            <I n="activity" s={13} c="white" />View all crawls
          </Link>
        }
      />
      
      <div className="pc ai">
        {isHigh && (
          <div className="alert awi mb6">
            <I n="alert-triangle" s={16} c="var(--yellow)" />
            <div style={{ flex: 1 }}>
              You've used {usage?.pages_used?.toLocaleString()} of {usage?.page_limit?.toLocaleString()} pages this month.
            </div>
          </div>
        )}

        <div className="card mb6">
          <div className="fxb mb6">
            <div>
              <h3 style={{ fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.05em', color: 'var(--text3)' }}>Usage Progress</h3>
              <p style={{ fontSize: 12, color: 'var(--text4)' }}>Pages extracted in current period</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 18, fontWeight: 800, color: isHigh ? 'var(--red)' : 'var(--text)' }}>{pct}%</div>
              <div style={{ fontSize: 10, color: 'var(--text4)', textTransform: 'uppercase', fontWeight: 700 }}>Quota Used {usage?.pages_used?.toLocaleString()} / {usage?.page_limit?.toLocaleString()}</div>
            </div>
          </div>
          <div className="pb" style={{ height: 12, borderRadius: 6, background: 'var(--bg2)', marginBottom: 20 }}>
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${pct}%` }}
              className="pf" 
              style={{ borderRadius: 6, background: isHigh ? 'var(--red)' : pct > 70 ? 'var(--yellow)' : 'var(--accent)' }} 
            />
          </div>
        </div>

        <div className="card mb6">
          <div className="fxb mb6">
            <h3 style={{ fontSize: 14, fontWeight: 700 }}>Processing volume over time</h3>
            <div className="fxc" style={{ gap: 8 }}>
              <span style={{ fontSize: 11, color: 'var(--text3)' }}>Past 12 months</span>
              <I n="filter" s={12} c="var(--text3)" />
            </div>
          </div>
          <div className="fxc" style={{ alignItems: 'flex-end', gap: '1.5%', height: 160, marginBottom: 8, padding: '0 10px' }}>
            {bars.map((h, i) => (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                <motion.div 
                   initial={{ height: 0 }}
                   animate={{ height: `${h}%` }}
                   transition={{ delay: i * 0.05 }}
                   style={{ width: '100%', background: i === 11 ? 'var(--accent)' : 'var(--bg3)', borderRadius: '4px 4px 0 0', cursor: 'pointer' }}
                   whileHover={{ background: 'var(--brand)' }}
                />
                <span style={{ fontSize: 9, color: 'var(--text4)', fontWeight: 600 }}>{months[i]}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="g2">
          <div className="card">
            <h3 style={{ fontSize: 13, fontWeight: 700, marginBottom: 16 }}>Plan Overview</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div className="fxb" style={{ fontSize: 13 }}>
                    <span style={{ color: 'var(--text3)' }}>Current Plan</span>
                    <span style={{ fontWeight: 700, color: 'var(--accent)' }}>{usage?.plan_name}</span>
                </div>
                <div className="fxb" style={{ fontSize: 13 }}>
                    <span style={{ color: 'var(--text3)' }}>Next renewal</span>
                    <span style={{ fontWeight: 600 }}>{new Date(usage?.current_period_end).toLocaleDateString()}</span>
                </div>
                <div className="fxb" style={{ fontSize: 13 }}>
                    <span style={{ color: 'var(--text3)' }}>Plan status</span>
                    <span style={{ color: 'var(--green)', fontWeight: 700 }}>Active</span>
                </div>
                <div style={{ marginTop: 8, paddingTop: 16, borderTop: '1px solid var(--border)' }}>
                    <button className="btn bs bfw" style={{ justifyContent: 'center' }}>Manage Subscription</button>
                </div>
            </div>
          </div>
          <div className="card">
             <h3 style={{ fontSize: 13, fontWeight: 700, marginBottom: 16 }}>Recent Activity</h3>
             <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
               {crawls?.length > 0 ? crawls.map(c => (
                 <div key={c.id} className="fxb" style={{ fontSize: 12 }}>
                   <div className="fxc" style={{ gap: 8 }}>
                     <I n={c.status === 'completed' ? 'check-circle' : 'activity'} s={12} c={c.status === 'completed' ? 'var(--green)' : 'var(--brand)'} />
                     <span style={{ fontWeight: 500 }}>{c.url.replace(/^https?:\/\//, '').slice(0, 20)}...</span>
                   </div>
                   <span style={{ color: 'var(--text4)', fontSize: 10 }}>{new Date(c.created_at).toLocaleDateString()}</span>
                 </div>
               )) : <div style={{ color: 'var(--text4)', fontSize: 12 }}>No recent crawls</div>}
             </div>
             <Link to="/crawls" style={{ display: 'block', marginTop: 16, fontSize: 11, fontWeight: 700, color: 'var(--accent)', textAlign: 'right', textDecoration: 'none' }}>Full history &rarr;</Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;
