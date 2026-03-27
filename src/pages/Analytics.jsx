
import React from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import api from '../services/api';
import TopBar from '../components/TopBar';
import I from '../components/ui/I';
import Spin from '../components/ui/Spin';

const Analytics = () => {
  const { data: usage, isLoading } = useQuery({
    queryKey: ['analytics-usage'],
    queryFn: () => api.get('/usage').then(res => res.data)
  });

  const bars = [65, 80, 45, 90, 72, 85, 60, 95, 70, 88, 75, 100];
  const months = ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'];

  if (isLoading) {
    return (
      <div>
        <TopBar title="Analytics" sub="Loading metrics..." />
        <div style={{ padding: 100, textAlign: 'center' }}><Spin s={24} /></div>
      </div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <TopBar title="Analytics" sub="Traffic and processing intelligence" />
      <div className="pc ai">
        <div className="g4 mb6">
          {[
            ['Total pages', usage?.current_usage?.toLocaleString(), 'trending-up', 'var(--green)'],
            ['Success rate', '99.4%', 'check-circle', 'var(--blue)'],
            ['Avg latency', '1.2s', 'clock', 'var(--brand)'],
            ['Data volume', '8.4 GB', 'database', 'var(--text3)']
          ].map(([l, v, ico, c]) => (
            <div key={l} className="mc">
              <div className="fxb">
                <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '.06em' }}>{l}</span>
                <I n={ico} s={13} c={c} />
              </div>
              <div className="mv" style={{ fontSize: 24 }}>{v}</div>
            </div>
          ))}
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
            <h3 style={{ fontSize: 13, fontWeight: 700, marginBottom: 16 }}>Quota distribution</h3>
            {[
              ['Pages extracted', usage?.current_usage, usage?.monthly_limit, 'var(--accent)'],
              ['Active projects', usage?.project_count, usage?.project_limit, 'var(--brand)'],
              ['Team seats', 1, 5, 'var(--blue)']
            ].map(([l, v, m, c]) => {
              const p = Math.round((v / m) * 100);
              return (
                <div key={l} style={{ marginBottom: 16 }}>
                  <div className="fxb" style={{ fontSize: 12, marginBottom: 5 }}>
                    <span style={{ fontWeight: 500 }}>{l}</span>
                    <span style={{ color: 'var(--text3)', fontFamily: 'var(--ffm)' }}>{v?.toLocaleString()} / {m?.toLocaleString()}</span>
                  </div>
                  <div className="pb" style={{ height: 6 }}>
                    <div className="pf" style={{ width: `${p}%`, background: p > 90 ? 'var(--red)' : c }} />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="card">
            <h3 style={{ fontSize: 13, fontWeight: 700, marginBottom: 16 }}>Export breakdown</h3>
            {[
              ['JSON Data', '52.4%', 'var(--brand)'],
              ['Markdown', '28.1%', 'var(--blue)'],
              ['Plain Chunks', '14.5%', 'var(--green)'],
              ['CSV Metadata', '5.0%', 'var(--yellow)']
            ].map(([f, p, c]) => (
              <div key={f} className="fxc" style={{ gap: 12, marginBottom: 12 }}>
                <div style={{ width: 10, height: 10, borderRadius: 3, background: c }} />
                <span style={{ flex: 1, fontSize: 13, fontWeight: 500 }}>{f}</span>
                <span style={{ fontSize: 13, color: 'var(--text2)', fontFamily: 'var(--ffm)', fontWeight: 700 }}>{p}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Analytics;
