import { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { AdminLoading } from '../AdminUI';

export default function MessagesSection() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    api.contact.getAll()
      .then(res => setMessages(res.data || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const fmt = (d) => new Date(d).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit'
  });

  return (
    <div className="admin-list-card" style={{ gridColumn: '1 / -1' }}>
      <div className="list-card-header">
        <span className="list-card-title">✉️ Contact Messages</span>
        <span className="list-card-count">{messages.length} messages</span>
      </div>

      {loading ? <AdminLoading /> : messages.length === 0 ? (
        <div className="list-empty">
          <span>📭</span>
          No messages yet. When visitors submit the contact form, they'll appear here.
        </div>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table className="messages-table">
            <thead>
              <tr>
                <th>From</th>
                <th>Email</th>
                <th>Message</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {messages.map(msg => (
                <tr key={msg._id} style={{ cursor: 'pointer' }} onClick={() => setExpanded(expanded === msg._id ? null : msg._id)}>
                  <td><span className="msg-name">{msg.name}</span></td>
                  <td><span className="msg-email">{msg.email}</span></td>
                  <td>
                    <span className="msg-text">
                      {expanded === msg._id ? msg.message : (
                        msg.message.length > 80 ? msg.message.slice(0, 80) + '…' : msg.message
                      )}
                    </span>
                    {msg.message.length > 80 && (
                      <span style={{ fontSize: 11, color: 'var(--accent-cyan)', marginLeft: 6, fontFamily: 'var(--font-mono)' }}>
                        {expanded === msg._id ? '▲ less' : '▼ more'}
                      </span>
                    )}
                  </td>
                  <td><span className="msg-date">{fmt(msg.createdAt)}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
