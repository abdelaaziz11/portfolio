import { api } from '../../services/api';
import { useAdminResource } from '../../hooks/useAdminResource';
import { Toast, ConfirmDelete, AdminLoading, Field, EditBtn, DeleteBtn } from '../AdminUI';

const EMPTY = { school: '', degree: '', years: '', description: '', order: 0 };

export default function EducationSection() {
  const r = useAdminResource(api.education, EMPTY);

  return (
    <>
      {r.toast && <Toast {...r.toast} onClose={() => r.setToast(null)} />}
      {r.confirmId && (
        <ConfirmDelete
          itemName={r.items.find(i => i._id === r.confirmId)?.school || 'this entry'}
          onConfirm={r.handleDelete}
          onCancel={r.cancelDelete}
        />
      )}

      <div className="admin-panel">
        <div className="admin-list-card">
          <div className="list-card-header">
            <span className="list-card-title">🎓 Education</span>
            <span className="list-card-count">{r.items.length} items</span>
          </div>

          {r.loading ? <AdminLoading /> : r.items.length === 0 ? (
            <div className="list-empty"><span>🎓</span>No education entries yet.</div>
          ) : r.items.map(item => (
            <div key={item._id} className="list-item">
              <div className="list-item-body">
                <div className="list-item-title">{item.degree}</div>
                <div className="list-item-sub">{item.school} · {item.years}</div>
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
              {r.editingId ? 'Edit Education' : 'Add Education'}
            </span>
            {r.editingId && (
              <button className="btn btn-ghost" style={{ fontSize: 12, padding: '5px 12px' }} onClick={r.cancelEdit}>Cancel</button>
            )}
          </div>

          <form className="form-card-body" onSubmit={r.handleSave}>
            <Field label="School / Institution *">
              <input name="school" value={r.form.school} onChange={r.handleChange} placeholder="e.g. École Nationale d'Informatique" required />
            </Field>

            <Field label="Degree / Program *">
              <input name="degree" value={r.form.degree} onChange={r.handleChange} placeholder="e.g. Bachelor's in Computer Science" required />
            </Field>

            <div className="form-row">
              <Field label="Years *" hint="e.g. 2017 – 2020">
                <input name="years" value={r.form.years} onChange={r.handleChange} placeholder="2017 – 2020" required />
              </Field>
              <Field label="Display Order">
                <input type="number" name="order" value={r.form.order} onChange={r.handleChange} min={0} />
              </Field>
            </div>

            <Field label="Description">
              <textarea name="description" value={r.form.description} onChange={r.handleChange} placeholder="Brief description of the program..." rows={3} />
            </Field>

            <div className="form-actions">
              <button type="submit" className="btn btn-primary" disabled={r.saving}>
                {r.saving ? 'Saving...' : r.editingId ? 'Update' : 'Add Education'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
