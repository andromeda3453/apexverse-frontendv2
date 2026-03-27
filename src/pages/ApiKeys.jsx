
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../services/api';
import TopBar from '../components/TopBar';
import I from '../components/ui/I';
import Spin from '../components/ui/Spin';
import Modal from '../components/ui/Modal';
import { useToast } from '../context/ToastContext';

const ApiKeys = () => {
    const [newKeyData, setNewKeyData] = useState(null);
    const [keyName, setKeyName] = useState('New API Key');
    const [keyToRevoke, setKeyToRevoke] = useState(null);
    const toast = useToast();
    const queryClient = useQueryClient();

    const { data: apiKeys, isLoading } = useQuery({
        queryKey: ['apikeys'],
        queryFn: () => api.get('/apikeys').then(res => res.data)
    });

    const createKeyMutation = useMutation({
        mutationFn: (data) => api.post('/apikeys/create', data),
        onSuccess: (res) => {
            setNewKeyData(res.data);
            queryClient.invalidateQueries(['apikeys']);
            toast('API Key generated successfully!', 'success');
        },
        onError: (err) => toast(err.response?.data?.detail || 'Failed to rotate key', 'error')
    });

    const revokeKeyMutation = useMutation({
        mutationFn: (id) => api.delete(`/apikeys/${id}`),
        onSuccess: () => {
            queryClient.invalidateQueries(['apikeys']);
            toast('API Key revoked', 'success');
            setKeyToRevoke(null);
        },
        onError: (err) => toast(err.response?.data?.detail || 'Failed to revoke key', 'error')
    });

    if (isLoading) {
        return (
            <div>
                <TopBar title="API Keys" sub="Loading keys..." />
                <div style={{ padding: 100, textAlign: 'center' }}><Spin s={24} /></div>
            </div>
        );
    }

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <TopBar title="API Management" sub="Manage credentials for programmatic access" />
            <div className="pc ai" style={{ maxWidth: 800 }}>
                <div className="card mb6">
                    <h3 style={{ fontSize: 13, fontWeight: 700, marginBottom: 12 }}>Generate New Key</h3>
                    <p style={{ fontSize: 12, color: 'var(--text3)', marginBottom: 20 }}>Use your API keys to access Apexverse endpoints via your scripts and tools.</p>
                    <div className="fxc" style={{ gap: 10 }}>
                        <input 
                            className="fi" 
                            style={{ flex: 1 }}
                            placeholder="Key name (e.g. Production, CLI)" 
                            value={keyName} 
                            onChange={e => setKeyName(e.target.value)} 
                        />
                        <button 
                            className="btn bp" 
                            onClick={() => createKeyMutation.mutate({ name: keyName })} 
                            disabled={createKeyMutation.isPending}
                        >
                            {createKeyMutation.isPending ? <Spin s={14} /> : 'Generate Key'}
                        </button>
                    </div>

                    {newKeyData && (
                        <div className="alert awi mt4" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: 12, background: 'var(--bg2)', border: '1px solid var(--yellow)' }}>
                            <div className="fxc" style={{ gap: 8 }}>
                                <I n="alert-triangle" s={16} c="var(--yellow)" />
                                <strong style={{ fontSize: 13, color: 'var(--text2)' }}>Copy your new key now. It won't be shown again!</strong>
                            </div>
                            <div className="fxc" style={{ width: '100%', gap: 10, background: 'var(--surface)', padding: '12px 16px', borderRadius: 'var(--r)', border: '1px solid var(--border)' }}>
                                <code style={{ flex: 1, fontSize: 12, fontFamily: 'var(--ffm)', color: 'var(--text2)', wordBreak: 'break-all' }}>{newKeyData.key}</code>
                                <button className="btn bs bsm" onClick={() => { navigator.clipboard.writeText(newKeyData.key); toast('API Key copied', 'success'); }}><I n="copy" s={13} /> Copy</button>
                            </div>
                            <button className="btn bs bsm" style={{ alignSelf: 'flex-end' }} onClick={() => setNewKeyData(null)}>I've saved my key</button>
                        </div>
                    )}
                </div>

                <div className="card">
                    <h3 style={{ fontSize: 13, fontWeight: 700, marginBottom: 12 }}>Active Keys</h3>
                    <div className="dtw">
                        <table className="dt">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Created</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {apiKeys?.length === 0 ? (
                                    <tr><td colSpan="3" style={{ textAlign: 'center', padding: 30, color: 'var(--text3)' }}>No active API keys found</td></tr>
                                ) : (
                                    apiKeys.map(k => (
                                        <tr key={k.id}>
                                            <td style={{ fontSize: 13, fontWeight: 600 }}>{k.name}</td>
                                            <td style={{ fontSize: 12, color: 'var(--text4)' }}>{new Date(k.created_at).toLocaleDateString()}</td>
                                            <td style={{ textAlign: 'right' }}>
                                                <button 
                                                    className="btn bdn bsm" 
                                                    onClick={() => setKeyToRevoke(k)}
                                                    disabled={revokeKeyMutation.isPending}
                                                    title="Revoke Key"
                                                >
                                                    <I n="trash" s={14} c="var(--red)" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <Modal
                isOpen={!!keyToRevoke}
                onClose={() => setKeyToRevoke(null)}
                title="Revoke API Key"
                footer={(
                    <>
                        <button className="btn bs" onClick={() => setKeyToRevoke(null)}>Cancel</button>
                        <button className="btn bdn" onClick={() => revokeKeyMutation.mutate(keyToRevoke.id)}>Revoke Key</button>
                    </>
                )}
            >
                <p style={{ fontSize: 14, color: 'var(--text2)' }}>
                    Are you sure you want to revoke <strong>{keyToRevoke?.name}</strong>? 
                    Any applications or scripts using this key will immediately lose access to the API.
                </p>
            </Modal>
        </motion.div>
    );
};

export default ApiKeys;
