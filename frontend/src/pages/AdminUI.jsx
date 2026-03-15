import { useEffect } from 'react';

// ── Toast ────────────────────────────────────────────
export function Toast({ message, type, onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 3500);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <div className={`admin-toast ${type}`}>
      <span>{type === 'success' ? '✓' : '✕'}</span>
      {message}
    </div>
  );
}

// ── Confirm Delete Modal ─────────────────────────────
export function ConfirmDelete({ itemName, onConfirm, onCancel }) {
  return (
    <div className="confirm-overlay" onClick={onCancel}>
      <div className="confirm-box" onClick={e => e.stopPropagation()}>
        <div className="confirm-icon">🗑️</div>
        <div className="confirm-title">Delete this item?</div>
        <p className="confirm-text">
          <strong style={{ color: 'var(--text-primary)' }}>{itemName}</strong> will be permanently
          removed from the database. This cannot be undone.
        </p>
        <div className="confirm-actions">
          <button className="btn btn-ghost" onClick={onCancel}>Cancel</button>
          <button
            className="btn"
            style={{ background: '#ff4d4d', color: '#fff', flex: 1, justifyContent: 'center' }}
            onClick={onConfirm}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Loading ──────────────────────────────────────────
export function AdminLoading() {
  return (
    <div className="admin-loading">
      <div className="admin-spinner" />
      Loading...
    </div>
  );
}

// ── Field ────────────────────────────────────────────
export function Field({ label, hint, children }) {
  return (
    <div className="form-field">
      <label>{label}</label>
      {children}
      {hint && <span className="form-hint">{hint}</span>}
    </div>
  );
}

// ── Icon Buttons ─────────────────────────────────────
export function EditBtn({ onClick }) {
  return (
    <button className="icon-btn edit" onClick={onClick} title="Edit">
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
        <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
      </svg>
    </button>
  );
}

export function DeleteBtn({ onClick }) {
  return (
    <button className="icon-btn delete" onClick={onClick} title="Delete">
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="3 6 5 6 21 6"/>
        <path d="M19 6l-1 14H6L5 6"/>
        <path d="M10 11v6M14 11v6"/>
        <path d="M9 6V4h6v2"/>
      </svg>
    </button>
  );
}
