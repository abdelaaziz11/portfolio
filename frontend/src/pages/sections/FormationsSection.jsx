import { api } from '../../services/api';
import { useAdminResource } from '../../hooks/useAdminResource';
import { Toast, ConfirmDelete, AdminLoading, Field, EditBtn, DeleteBtn } from '../AdminUI';

const EMPTY = { name: '', org: '', year: '', skills: '', icon: '', order: 0 };

export default function FormationsSection() {
  const r = useAdminResource(api.formations, EMPTY);

  return (
    <>
      {r.toast && <Toast {...r.toast} onClose={() => r.setToast(null)} />}
      {r.confirmId && (
        <ConfirmDelete
          itemName={r.items.find(i => i._id === r.confirmId)?.name || 'this formation'}
          onConfirm={r.handleDelete}
          onCancel={r.cancelDelete}
        />
      )}

      <div className="admin-panel">
        <div className="admin-list-card">
          <div className="list-card-header">
            <span className="list-card-title">📜 Formations & Certs</span>
            <span className="list-card-count">{r.items.length} items</span>
          </div>

          {r.loading ? <AdminLoading /> : r.items.length === 0 ? (
            <div className="list-empty"><span>📜</span>No formations yet.</div>
          ) : r.items.map(item => (
            <div key={item._id} className="list-item">
              <div className="list-item-body">
                <div className="list-item-title">{item.name}</div>
                <div className="list-item-sub">{item.org} · {item.year}</div>
                <div className="list-item-tags">
                  {(item.skills || []).map(s => (
                    <span key={s} className="list-item-tag">{s}</span>
                  ))}
                </div>
              </div>
              <div className="list-item-actions">
                <EditBtn onClick={() => r.startEdit(item)} />
                <DeleteBtn onClick={() => r.confirmDelete(item._id)} />
              </div>
            </div>
          ))}
        </div>

        <div className="admin-form-card">
          <div className="form-card-header">
            <span className="form-card-title">
              <span>{r.editingId ? '✏️' : '➕'}</span>
              {r.editingId ? 'Edit Formation' : 'Add Formation'}
            </span>
            {r.editingId && (
              <button className="btn btn-ghost" style={{ fontSize: 12, padding: '5px 12px' }} onClick={r.cancelEdit}>Cancel</button>
            )}
          </div>

          <form className="form-card-body" onSubmit={r.handleSave}>
            <Field label="Course / Certification Name *">
              <input name="name" value={r.form.name} onChange={r.handleChange} placeholder="e.g. The Complete JavaScript Course 2024" required />
            </Field>

            <Field label="Organization / Platform *">
              <input name="org" value={r.form.org} onChange={r.handleChange} placeholder="e.g. Udemy / Jonas Schmedtmann" required />
            </Field>

            <div className="form-row">
              <Field label="Year *">
                <input name="year" value={r.form.year} onChange={r.handleChange} placeholder="2024" required />
              </Field>
              <Field label="Icon / Label" hint="Short label e.g. JS, React, Node">
                <input name="icon" value={r.form.icon} onChange={r.handleChange} placeholder="JS" />
              </Field>
            </div>

            <Field label="Skills Learned" hint="Comma-separated: ES6+, Async JS, OOP">
              <input name="skills" value={r.form.skills} onChange={r.handleChange} placeholder="ES6+, OOP, Async JS, Modules" />
            </Field>

            <Field label="Display Order">
              <input type="number" name="order" value={r.form.order} onChange={r.handleChange} min={0} />
            </Field>

            <div className="form-actions">
              <button type="submit" className="btn btn-primary" disabled={r.saving}>
                {r.saving ? 'Saving...' : r.editingId ? 'Update' : 'Add Formation'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
