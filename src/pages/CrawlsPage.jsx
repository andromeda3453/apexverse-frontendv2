
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../services/api';
import TopBar from '../components/TopBar';
import I from '../components/ui/I';
import Modal from '../components/ui/Modal';
import SBadge from '../components/ui/SBadge';
import Spin from '../components/ui/Spin';
import { useToast } from '../context/ToastContext';

const CrawlsPage = () => {
  const [runToDel, setRunToDel] = useState(null);
  const [viewingJob, setViewingJob] = useState(null);
  const toast = useToast();
  const queryClient = useQueryClient();

  const { data: jobs, isLoading: jobsLoading, refetch: refetchJobs } = useQuery({
    queryKey: ['all-jobs'],
    queryFn: () => api.get('/crawl/jobs').then(res => res.data),
    refetchInterval: 5000
  });

  const deleteJobMutation = useMutation({
    mutationFn: (jobId) => api.delete(`/crawl/job/${jobId}`),
    onSuccess: () => {
      toast('Crawl job deleted', 'success');
      setRunToDel(null);
      refetchJobs();
    },
    onError: (err) => {
      toast(err.response?.data?.detail || 'Failed to delete job', 'error');
    }
  });

  const { data: jobResult, isLoading: isResultLoading } = useQuery({
    queryKey: ['job-result', viewingJob?.id],
    queryFn: () => api.get(`/crawl/results/${viewingJob.id}`).then(res => res.data),
    enabled: !!viewingJob
  });

  if (jobsLoading) {
    return (
      <div>
        <TopBar title="Crawls" sub="Retrieving your crawl history" />
        <div style={{ padding: 100, textAlign: 'center' }}><Spin s={24} /></div>
      </div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <TopBar 
        title="Crawls" 
        sub="Manage all your web crawling activities"
      />

      <div className="pc">
        <div className="dtw">
          <table className="dt">
            <thead>
              <tr>
                <th>ID</th>
                <th>Date</th>
                <th>Status</th>
                <th>Type</th>
                <th>Scope</th>
                <th>Pages</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {jobs?.length === 0 ? (
                <tr><td colSpan="7" style={{ textAlign: 'center', padding: 40, color: 'var(--text3)' }}>No crawl history yet</td></tr>
              ) : (
                jobs.map(j => (
                  <tr key={j.id}>
                    <td><code style={{ fontSize: 11, color: 'var(--text3)' }}>{j.id.slice(0, 8)}</code></td>
                    <td style={{ fontSize: 12 }}>{new Date(j.created_at).toLocaleString()}</td>
                    <td><SBadge status={j.status} /></td>
                    <td>
                      {j.is_deep_crawl ? (
                        <span style={{ fontSize: 10, padding: '2px 6px', background: 'var(--brand)', color: 'white', borderRadius: 4, fontWeight: 700, textTransform: 'uppercase' }}>Deep</span>
                      ) : (
                        <span style={{ fontSize: 10, padding: '2px 6px', background: 'var(--bg2)', color: 'var(--text3)', borderRadius: 4, fontWeight: 700, textTransform: 'uppercase' }}>Single</span>
                      )}
                    </td>
                    <td style={{ fontSize: 12, color: 'var(--text3)' }} title={j.url}>{j.url.replace(/^https?:\/\//, '').slice(0, 30)}...</td>
                    <td style={{ fontSize: 12, fontFamily: 'var(--ffm)', fontWeight: 600 }}>{j.results_count}</td>
                    <td style={{ textAlign: 'right' }}>
                      <div className="fxc" style={{ gap: 8, justifyContent: 'flex-end' }}>
                        {j.status === 'completed' && (
                          <button className="btn bs bsm" onClick={() => setViewingJob(j)} title="View Results">
                            <I n="eye" s={14} c="var(--text2)" />
                          </button>
                        )}
                        <button 
                          className="btn bdn bsm" 
                          onClick={() => setRunToDel(j)} 
                          disabled={deleteJobMutation.isPending}
                          title="Delete Crawl"
                        >
                          <I n="trash" s={14} c="var(--red)" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Modal 
        isOpen={!!runToDel} 
        onClose={() => setRunToDel(null)} 
        title="Delete Crawl"
        footer={(
          <>
            <button className="btn bs" onClick={() => setRunToDel(null)}>Cancel</button>
            <button className="btn bdn" onClick={() => deleteJobMutation.mutate(runToDel?.id)} disabled={deleteJobMutation.isPending}>
              {deleteJobMutation.isPending ? <Spin s={12} /> : 'Delete'}
            </button>
          </>
        )}
      >
        <p style={{ fontSize: 14, color: 'var(--text2)' }}>
          Are you sure you want to delete the crawl for <strong>{runToDel?.url}</strong>?
        </p>
      </Modal>

      <Modal 
        isOpen={!!viewingJob} 
        onClose={() => setViewingJob(null)} 
        title={viewingJob?.is_deep_crawl ? `Deep Crawl: ${viewingJob.results_count} Pages` : "Crawl Result"}
        footer={(
          <button className="btn bp" onClick={() => setViewingJob(null)}>Close</button>
        )}
      >
        <div style={{ maxHeight: '76vh', overflow: 'auto', paddingRight: 4 }}>
          {isResultLoading ? (
            <div className="fxc" style={{ justifyContent: 'center', padding: 40 }}><Spin s={20} /></div>
          ) : jobResult && jobResult.results && jobResult.results.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
              {[...jobResult.results].sort((a, b) => (a.depth || 0) - (b.depth || 0)).map((res, idx) => (
                <div key={res.id || idx} style={{ borderBottom: idx < jobResult.results.length - 1 ? '1px solid var(--border)' : 'none', paddingBottom: 24 }}>
                  <div className="fxb mb3" style={{ alignItems: 'flex-start' }}>
                    <div style={{ flex: 1 }}>
                      <div className="fxc" style={{ gap: 8, marginBottom: 4 }}>
                        <div style={{ fontSize: 13, fontWeight: 700 }}>Page {idx + 1}</div>
                        <span style={{ fontSize: 10, padding: '1px 5px', background: 'var(--bg2)', borderRadius: 2, color: 'var(--text3)', fontWeight: 600 }}>Depth {res.depth}</span>
                      </div>
                      <code style={{ fontSize: 11, color: 'var(--accent)', wordBreak: 'break-all' }}>{res.url}</code>
                    </div>
                    <div className="fxc" style={{ gap: 6 }}>
                      <button 
                        className="btn bs bsm" 
                        onClick={() => {
                          const txt = res.content_json 
                            ? JSON.stringify(res.content_json, null, 2)
                            : res.content_markdown;
                          navigator.clipboard.writeText(txt);
                          toast('Content copied', 'success');
                        }}
                        title="Copy Content"
                      >
                        <I n="copy" s={12} />
                      </button>
                    </div>
                  </div>
                  
                  <div className="mb3">
                    <div className="code" style={{ padding: 16, maxHeight: 160, overflow: 'auto', whiteSpace: 'pre-wrap', color: 'var(--text2)', fontSize: 11, border: '1px solid var(--border)', background: 'var(--bg)' }}>
                      {res.content_markdown?.slice(0, 500) || "No content found"}{res.content_markdown?.length > 500 ? '...' : ''}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty" style={{ padding: '60px 0' }}>
              <I n="alert-circle" s={32} c="var(--text3)" />
              <h3 style={{ marginTop: 16 }}>No data found</h3>
            </div>
          )}
        </div>
      </Modal>
    </motion.div>
  );
};

export default CrawlsPage;
