import { api } from '../../services/api';
import { useAdminResource } from '../../hooks/useAdminResource';
import { Toast, ConfirmDelete, AdminLoading, Field, EditBtn, DeleteBtn } from '../AdminUI';

const EMPTY = {
  company: '',
  role: '',
  duration: '',
  description: '',
  technologies: '',
  order: 0,
};

export default function ExperienceSection() {
  const r = useAdminResource(api.experience, EMPTY);

  return (
    <>
      {r.toast && <Toast {...r.toast} onClose={() => r.setToast(null)} />}
      {r.confirmId && (
        <ConfirmDelete
          itemName={`${r.items.find(i => i._id === r.confirmId)?.role} at ${r.items.find(i => i._id === r.confirmId)?.company}`}
          onConfirm={r.handleDelete}
          onCancel={r.cancelDelete}
        />
      )}

      <div className="admin-panel">
        {/* ── List ── */}
        <div className="admin-list-card">
          <div className="list-card-header">
            <span className="list-card-title">💼 Work Experience</span>
            <span className="list-card-count">{r.items.length} items</span>
          </div>

          {r.loading ? <AdminLoading /> : r.items.length === 0 ? (
            <div className="list-empty"><span>💼</span>No experience entries yet.</div>
          ) : r.items.map(item => (
            <div key={item._id} className="list-item">
              <div className="list-item-body">
                <div className="list-item-title">{item.role}</div>
                <div className="list-item-sub">{item.company} · {item.duration}</div>
                <div className="list-item-tags">
                  {(item.technologies || []).map(t => (
                    <span key={t} className="list-item-tag">{t}</span>
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

        {/* ── Form ── */}
        <div className="admin-form-card">
          <div className="form-card-header">
            <span className="form-card-title">
              <span>{r.editingId ? '✏️' : '➕'}</span>
              {r.editingId ? 'Edit Experience' : 'Add Experience'}
            </span>
            {r.editingId && (
              <button className="btn btn-ghost" style={{ fontSize: 12, padding: '5px 12px' }} onClick={r.cancelEdit}>Cancel</button>
            )}
          </div>

          <form className="form-card-body" onSubmit={r.handleSave}>
            <div className="form-row">
              <Field label="Company Name *">
                <input name="company" value={r.form.company} onChange={r.handleChange} placeholder="e.g. TechNova Solutions" required />
              </Field>
              <Field label="Your Role *">
                <input name="role" value={r.form.role} onChange={r.handleChange} placeholder="e.g. Full-Stack Developer" required />
              </Field>
            </div>

            <div className="form-row">
              <Field label="Duration *" hint="e.g. Jan 2023 – Present">
                <input name="duration" value={r.form.duration} onChange={r.handleChange} placeholder="Jan 2023 – Present" required />
              </Field>
              <Field label="Display Order">
                <input type="number" name="order" value={r.form.order} onChange={r.handleChange} min={0} />
              </Field>
            </div>

            <Field label="Description *" hint="Describe your responsibilities and impact">
              <textarea name="description" value={r.form.description} onChange={r.handleChange} placeholder="Led development of..." required rows={3} />
            </Field>

            <Field label="Technologies" hint="Comma-separated list">
              <input name="technologies" value={r.form.technologies} onChange={r.handleChange} placeholder="React, Node.js, MongoDB, Docker" />
            </Field>

            <div className="form-actions">
              <button type="submit" className="btn btn-primary" disabled={r.saving}>
                {r.saving ? 'Saving...' : r.editingId ? 'Update' : 'Add Experience'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
