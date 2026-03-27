
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../services/api';
import TopBar from '../components/TopBar';
import I from '../components/ui/I';
import Modal from '../components/ui/Modal';
import SBadge from '../components/ui/SBadge';
import Spin from '../components/ui/Spin';
import { useToast } from '../context/ToastContext';

const ProjectDetail = () => {
  const { id } = useParams();
  const [tab, setTab] = useState('overview');
  const [preview, setPreview] = useState(null);
  const [isDelModOpen, setIsDelModOpen] = useState(false);
  const [runToDel, setRunToDel] = useState(null);
  const [viewingJob, setViewingJob] = useState(null);
  const navigate = useNavigate();
  const toast = useToast();
  const queryClient = useQueryClient();

  const { data: p, isLoading: projectLoading } = useQuery({
    queryKey: ['project', id],
    queryFn: () => api.get(`/projects/${id}`).then(res => res.data)
  });

  const { data: jobs, isLoading: jobsLoading, refetch: refetchJobs } = useQuery({
    queryKey: ['project-jobs', id],
    queryFn: () => api.get(`/projects/${id}/jobs`).then(res => res.data)
  });

  const { data: pages, isLoading: pagesLoading } = useQuery({
    queryKey: ['project-pages', id],
    queryFn: () => api.get(`/crawl/project/${id}/pages`).then(res => res.data)
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

  const deleteProjectMutation = useMutation({
    mutationFn: () => api.delete(`/projects/${id}`),
    onSuccess: () => {
      toast('Project deleted', 'success');
      navigate('/projects');
    },
    onError: (err) => {
      toast(err.response?.data?.detail || 'Failed to delete project', 'error');
    }
  });

  if (projectLoading || jobsLoading || pagesLoading) {
    return (
      <div>
        <TopBar title="Loading..." sub="Retrieving project data" />
        <div style={{ padding: 100, textAlign: 'center' }}><Spin s={24} /></div>
      </div>
    );
  }

  if (!p) return <div className="pc">Project not found</div>;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <TopBar 
        title={p.name} 
        actions={
          <div className="fxc" style={{ gap: 8 }}>
            <button className="btn bdn bsm" onClick={() => setIsDelModOpen(true)}>
              <I n="trash" s={12} c="white" /> Delete
            </button>
          </div>
        }
      />

      <div style={{ borderBottom: '1px solid var(--border)', background: 'var(--surface)', padding: '0 24px', display: 'flex', gap: 2, overflowX: 'auto', position: 'sticky', top: 56, zIndex: 40 }}>
        {['overview', 'runs'].map(t => (
          <button 
            key={t} 
            onClick={() => setTab(t)} 
            style={{ padding: '14px 16px', border: 'none', background: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 600, color: tab === t ? 'var(--text)' : 'var(--text3)', borderBottom: `2px solid ${tab === t ? 'var(--accent)' : 'transparent'}`, marginBottom: -1, fontFamily: 'var(--ff)', transition: 'all .14s', whiteSpace: 'nowrap', textTransform: 'capitalize' }}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="pc">
        <AnimatePresence mode="wait">
          {tab === 'overview' && (
            <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} key="overview">
              <div className="g4 mb4">
                {[
                  ['Crawls Conducted', jobs?.length || 0, 'history', 'var(--blue)'],
                  ['Success Rate', jobs?.filter(j => j.status === 'completed').length ? Math.round((jobs.filter(j => j.status === 'completed').length / jobs.length) * 100) + '%' : '-', 'check-circle', 'var(--green)'],
                  ['Latest URL', jobs?.[0]?.url?.slice(0, 20) + '...' || '-', 'globe', 'var(--brand)'],
                  ['Created', new Date(p.created_at).toLocaleDateString(), 'calendar', 'var(--text3)']
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
              <div className="card">
                <h3 style={{ fontSize: 13, fontWeight: 700, marginBottom: 8 }}>Project ID</h3>
                <div className="fxc" style={{ gap: 10, background: 'var(--bg2)', padding: '12px 16px', borderRadius: 'var(--r)', border: '1px solid var(--border)' }}>
                  <code style={{ flex: 1, fontSize: 12, fontFamily: 'var(--ffm)', color: 'var(--text3)' }}>{p.id}</code>
                  <button className="btn bs bsm" onClick={() => { navigator.clipboard.writeText(p.id); toast('Project ID copied', 'success'); }}>
                    <I n="copy" s={13} />
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {tab === 'pages' && (
            <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} key="pages">
              <div className="dtw">
                <table className="dt">
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Path</th>
                      <th>Status</th>
                      <th>Chunks</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {pages?.length === 0 ? (
                      <tr><td colSpan="5" style={{ textAlign: 'center', padding: 40, color: 'var(--text3)' }}>No pages extracted yet</td></tr>
                    ) : (
                      pages.map(p => (
                        <tr key={p.id} className="ptr" onClick={() => setPreview(p)}>
                          <td>
                            <div className="fxc" style={{ gap: 10 }}>
                              <I n="file-text" s={14} c="var(--text3)" />
                              <div style={{ fontWeight: 600, fontSize: 13 }} className="tru">{p.url.split('/').pop() || 'index'}</div>
                            </div>
                          </td>
                          <td style={{ fontSize: 11, fontFamily: 'var(--ffm)', color: 'var(--text3)' }}>{p.url}</td>
                          <td><SBadge status="ready" /></td>
                          <td style={{ fontSize: 12, fontFamily: 'var(--ffm)' }}>{(p.content_markdown?.length || 0).toLocaleString()} chars</td>
                          <td style={{ textAlign: 'right' }}>
                            <button className="btn bg2btn bsm"><I n="external-link" s={12} /></button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {tab === 'outputs' && (
            <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} key="outputs">
              <div className="g3">
                {[
                  ['JSON', 'json', '4.2 MB', 'ready', 'code'],
                  ['Markdown', 'md', '2.1 MB', 'ready', 'file-text'],
                  ['Chunks', 'txt', '5.1 MB', 'ready', 'layers'],
                  ['Schema', 'gql', '0.1 MB', 'ready', 'grid'],
                  ['Vector DB', 'bin', '-', 'processing', 'database']
                ].map(([n, ext, size, status, ico]) => (
                  <div key={n} className="card ch">
                    <div className="fxb mb3">
                      <div style={{ width: 36, height: 36, background: 'var(--bg2)', borderRadius: 8, display: 'flex', alignItems: 'center', justify: 'center' }}>
                        <I n={ico} s={16} c="var(--text2)" />
                      </div>
                      <SBadge status={status} />
                    </div>
                    <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 2 }}>{n} Output</div>
                    <div style={{ fontSize: 11, color: 'var(--text3)', marginBottom: 16, fontFamily: 'var(--ffm)' }}>{ext.toUpperCase()} . {size}</div>
                    <button className="btn bp bsm bfw" style={{ justifyContent: 'center' }} disabled={status !== 'ready'}>
                      {status === 'ready' ? <><I n="download" s={12} c="white" /> Download</> : <><Spin s={11} /> Building...</>}
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {tab === 'runs' && (
            <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} key="runs">
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
                          <td style={{ fontSize: 12, color: 'var(--text3)' }} title={j.url}>{j.url.replace(/^https?:\/\//, '').slice(0, 20)}...</td>
                          <td style={{ fontSize: 12, fontFamily: 'var(--ffm)', fontWeight: 600 }}>{j.results_count || 1}</td>
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
            </motion.div>
          )}

          {tab === 'integrations' && (
            <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} key="integrations" style={{ maxWidth: 540 }}>
              <div style={{ marginBottom: 20 }}>
                <h2 style={{ fontSize: 20, fontFamily: 'var(--ffd)', fontWeight: 800, marginBottom: 4 }}>Connected Destinations</h2>
                <p style={{ fontSize: 14, color: 'var(--text3)' }}>Automatically push extracted data to your AI infrastructure.</p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {[
                  ['Pinecone', '#1F6BD5', 'P'],
                  ['Qdrant', '#DC3545', 'Q'],
                  ['PostgreSQL', '#336791', 'PG'],
                  ['Weaviate', '#4CAF50', 'W']
                ].map(([n, c, l]) => (
                  <div key={n} className="fxc" style={{ gap: 14, padding: '14px 18px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--rlg)' }}>
                    <div style={{ width: 40, height: 40, background: `${c}12`, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: c, fontSize: 13 }}>{l}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 14, fontWeight: 700 }}>{n} Vector Store</div>
                      <div style={{ fontSize: 11, color: 'var(--text3)' }}>Not configured</div>
                    </div>
                    <button className="btn bs bsm">Setup</button>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {tab === 'settings' && (
            <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} key="settings" style={{ maxWidth: 540 }}>
              <div className="card mb4">
                <h3 style={{ fontSize: 13, fontWeight: 700, marginBottom: 16 }}>Project Details</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  <div className="fg"><label className="fl">Display Name</label><input className="fi" defaultValue={p.name} /></div>
                  <div className="fg"><label className="fl">Recent Start URL</label><input className="fi" defaultValue={jobs?.[0]?.url || ''} disabled /></div>
                  <button className="btn bp bsm" style={{ alignSelf: 'flex-start' }} onClick={() => toast('Settings coming soon', 'info')}>Update Settings</button>
                </div>
              </div>
              <div className="card" style={{ border: '1px solid rgba(192,57,43,.2)' }}>
                <h3 style={{ fontSize: 13, fontWeight: 700, color: 'var(--red)', marginBottom: 4 }}>Danger Zone</h3>
                <p style={{ fontSize: 11, color: 'var(--text3)', marginBottom: 16 }}>This will permanently remove all data and runs for this project.</p>
                <div className="fxc" style={{ gap: 10 }}>
                  <button className="btn bdn bsm">Reset Data</button>
                  <button className="btn bdn bsm">Delete Project</button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <Modal 
        isOpen={isDelModOpen} 
        onClose={() => setIsDelModOpen(false)} 
        title="Delete Project"
        footer={(
          <>
            <button className="btn bs" onClick={() => setIsDelModOpen(false)}>Cancel</button>
            <button className="btn bdn" onClick={() => deleteProjectMutation.mutate()}>Delete Project</button>
          </>
        )}
      >
        <p style={{ fontSize: 14, color: 'var(--text2)' }}>
          Are you sure you want to delete <strong>{p.name}</strong>? This action cannot be undone and all crawl data will be lost.
        </p>
      </Modal>

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

                  {res.metadata?.links && (
                    <div style={{ background: 'var(--bg2)', borderRadius: 8, padding: 12, border: '1px solid var(--border)' }}>
                      <div className="fxb mb2">
                        <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--text3)', textTransform: 'uppercase' }}>Links Discovered</span>
                        <span style={{ fontSize: 10, color: 'var(--text3)' }}>
                          {(res.metadata.links.internal?.length || 0) + (res.metadata.links.external?.length || 0)} total
                        </span>
                      </div>
                      <div style={{ maxHeight: 120, overflow: 'auto', display: 'flex', flexDirection: 'column', gap: 4 }}>
                        {res.metadata.links.internal?.slice(0, 5).map((l, i) => (
                          <div key={i} className="fxc" style={{ gap: 8 }}>
                            <I n="corner-down-right" s={10} c="var(--text3)" />
                            <span style={{ fontSize: 10, color: 'var(--text2)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1 }}>{l.href}</span>
                            <span style={{ fontSize: 9, padding: '1px 4px', background: 'var(--blue)11', color: 'var(--blue)', borderRadius: 3 }}>internal</span>
                          </div>
                        ))}
                        {res.metadata.links.external?.slice(0, 5).map((l, i) => (
                          <div key={i} className="fxc" style={{ gap: 8 }}>
                            <I n="corner-down-right" s={10} c="var(--text3)" />
                            <span style={{ fontSize: 10, color: 'var(--text2)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1 }}>{l.href}</span>
                            <span style={{ fontSize: 9, padding: '1px 4px', background: 'var(--accent)11', color: 'var(--accent)', borderRadius: 3 }}>external</span>
                          </div>
                        ))}
                        {((res.metadata.links.internal?.length || 0) + (res.metadata.links.external?.length || 0)) > 10 && (
                          <div style={{ fontSize: 9, color: 'var(--text3)', paddingLeft: 18, marginTop: 2 }}>
                            + {((res.metadata.links.internal?.length || 0) + (res.metadata.links.external?.length || 0)) - 10} more links...
                          </div>
                        )}
                        {(!res.metadata.links.internal?.length && !res.metadata.links.external?.length) && (
                          <div style={{ fontSize: 10, color: 'var(--text3)', fontStyle: 'italic' }}>No links found on this page</div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="empty" style={{ padding: '60px 0' }}>
              <I n="alert-circle" s={32} c="var(--text3)" />
              <h3 style={{ marginTop: 16 }}>No data found</h3>
              <p>
                {!jobResult ? "Waiting for response from server..." : 
                 jobResult.results && jobResult.results.length === 0 ? "The crawler found no content for this URL." : 
                 "Select a run to view its results."}
              </p>
            </div>
          )}
        </div>
      </Modal>

      {preview && (
        <div className="moverlay" onClick={() => setPreview(null)}>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} 
            animate={{ opacity: 1, scale: 1 }} 
            className="modal" 
            style={{ maxWidth: 640 }} 
            onClick={e => e.stopPropagation()}
          >
            <div className="mh fxb">
              <div>
                <h3 style={{ fontSize: 16, fontWeight: 800 }}>{preview.title}</h3>
                <code style={{ fontSize: 11, color: 'var(--brand)', display: 'block', marginTop: 4 }}>{preview.url}</code>
              </div>
              <button onClick={() => setPreview(null)} className="bg2btn bsm" style={{ padding: 4 }}><I n="x" s={18} c="var(--text3)" /></button>
            </div>
            <div className="mbody" style={{ padding: 0 }}>
              <div className="code" style={{ borderRadius: 0, maxHeight: 400, fontSize: 12 }}>
                <span className="cc"># {preview.title}</span><br /><br />
                <span className="ck">## Introduction</span><br />
                Extract clean data from any URL with <span className="cs">"Apexverse"</span> using our high-performance crawler.<br /><br />
                <span className="ck">## Getting Started</span><br />
                1. Create a project<br />
                2. Configure crawl depth<br />
                3. Select formats (JSON, MD, Chunks)<br />
                4. Launch and extract AI data.
              </div>
            </div>
            <div className="mf">
              <button className="btn bs" onClick={() => toast('JSON copied to clipboard', 'success')}><I n="copy" s={13} /> Copy JSON</button>
              <button className="btn bp" onClick={() => setPreview(null)}>Download MD</button>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};

export default ProjectDetail;
