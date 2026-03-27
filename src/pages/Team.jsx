
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TopBar from '../components/TopBar';
import I from '../components/ui/I';
import { useToast } from '../context/ToastContext';

const Team = () => {
  const [members, setMembers] = useState([
    { id: 1, name: 'Alex Chen', email: 'alex@acme.io', role: 'Owner', joined: 'Mar 2024', av: 'AC' },
    { id: 2, name: 'Sarah Miller', email: 'sarah@acme.io', role: 'Admin', joined: 'Apr 2024', av: 'SM' },
    { id: 3, name: 'Dave Wilson', email: 'dave@acme.io', role: 'Member', joined: 'May 2024', av: 'DW' }
  ]);
  const [invOpen, setInvOpen] = useState(false);
  const [invEmail, setInvEmail] = useState('');
  const [invRole, setInvRole] = useState('Member');
  const toast = useToast();

  const removeMember = (id, name) => {
    setMembers(members.filter(m => m.id !== id));
    toast(`${name} removed from team`, 'success');
  };

  const handleInvite = (e) => {
    e.preventDefault();
    if (!invEmail) return;
    setInvOpen(false);
    toast(`Invite sent to ${invEmail}`, 'success');
    setInvEmail('');
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <TopBar 
        title="Team" 
        sub={`${members.length} members`} 
        actions={
          <button className="btn bp bsm" onClick={() => setInvOpen(true)}>
            <I n="plus" s={13} c="white" />Invite member
          </button>
        }
      />
      
      <div className="pc ai" style={{ maxWidth: 840 }}>
        <div className="dtw mb6">
          <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)' }}>
            <h3 style={{ fontSize: 13, fontWeight: 700 }}>Workspace Members</h3>
          </div>
          <table className="dt">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Joined</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {members.map(m => (
                <tr key={m.id}>
                  <td>
                    <div className="fxc" style={{ gap: 10 }}>
                      <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--accent)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 800, fontFamily: 'var(--ffd)', flexShrink: 0 }}>
                        {m.av}
                      </div>
                      <span style={{ fontWeight: 600, fontSize: 13 }}>{m.name}</span>
                      {m.id === 1 && <span className="badge" style={{ background: 'var(--bg2)', color: 'var(--text3)', fontSize: 10 }}>you</span>}
                    </div>
                  </td>
                  <td style={{ fontSize: 12, color: 'var(--text3)' }}>{m.email}</td>
                  <td>
                    <select 
                      className="fse" 
                      style={{ padding: '4px 8px', fontSize: 12, height: 'auto', width: 'auto' }}
                      value={m.role} 
                      disabled={m.id === 1}
                      onChange={e => setMembers(ms => ms.map(x => x.id === m.id ? { ...x, role: e.target.value } : x))}
                    >
                      <option>Owner</option>
                      <option>Admin</option>
                      <option>Member</option>
                    </select>
                  </td>
                  <td style={{ fontSize: 12, color: 'var(--text3)' }}>{m.joined}</td>
                  <td style={{ textAlign: 'right' }}>
                    {m.id !== 1 && (
                      <button className="btn bdn bsm" onClick={() => removeMember(m.id, m.name)}>Remove</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="card" style={{ background: 'var(--bg2)', borderStyle: 'dashed' }}>
          <h3 style={{ fontSize: 13, fontWeight: 700, marginBottom: 4 }}>Pending invites</h3>
          <p style={{ fontSize: 12, color: 'var(--text3)' }}>No pending invites in your workspace.</p>
        </div>
      </div>

      <AnimatePresence>
        {invOpen && (
          <div className="moverlay" onClick={() => setInvOpen(false)}>
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} 
              animate={{ opacity: 1, scale: 1 }} 
              exit={{ opacity: 0, scale: 0.95 }}
              className="modal" 
              onClick={e => e.stopPropagation()}
            >
              <div className="mh">
                <div className="fxb">
                  <h3 style={{ fontSize: 16, fontWeight: 800 }}>Invite team member</h3>
                  <button onClick={() => setInvOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><I n="x" s={18} c="var(--text3)" /></button>
                </div>
              </div>
              <form onSubmit={handleInvite}>
                <div className="mbody" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <div className="fg">
                    <label className="fl">Work email</label>
                    <input className="fi" type="email" placeholder="colleague@company.com" value={invEmail} onChange={e => setInvEmail(e.target.value)} required />
                  </div>
                  <div className="fg">
                    <label className="fl">Role</label>
                    <select className="fse" value={invRole} onChange={e => setInvRole(e.target.value)}>
                      <option>Admin</option>
                      <option>Member</option>
                    </select>
                  </div>
                  <div className="alert min aii">
                    <I n="info" s={16} c="var(--blue)" />
                    <span style={{ fontSize: 12 }}>They'll receive an email invitation to join this workspace.</span>
                  </div>
                </div>
                <div className="mf">
                  <button type="button" className="btn bs" onClick={() => setInvOpen(false)}>Cancel</button>
                  <button type="submit" className="btn bp">Send invite</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Team;
