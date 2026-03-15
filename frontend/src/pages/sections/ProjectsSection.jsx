import { api } from '../../services/api';
import { useAdminResource } from '../../hooks/useAdminResource';
import { Toast, ConfirmDelete, AdminLoading, Field, EditBtn, DeleteBtn } from '../AdminUI';

const EMPTY = {
  title: '',
  shortDescription: '',
  fullDescription: '',
  problem: '',
  features: '',        // comma-separated → array
  technologies: '',    // comma-separated → array
  architecture: '',
  thumbnail: '',
  githubUrl: '',
  liveUrl: '',
  featured: false,
  order: 0,
};

export default function ProjectsSection() {
  const r = useAdminResource(api.projects, EMPTY);

  return (
    <>
      {r.toast && <Toast {...r.toast} onClose={() => r.setToast(null)} />}
      {r.confirmId && (
        <ConfirmDelete
          itemName={r.items.find(i => i._id === r.confirmId)?.title || 'this project'}
          onConfirm={r.handleDelete}
          onCancel={r.cancelDelete}
        />
      )}

      <div className="admin-panel">
        {/* ── List ── */}
        <div className="admin-list-card">
          <div className="list-card-header">
            <span className="list-card-title">🗂 All Projects</span>
            <span className="list-card-count">{r.items.length} items</span>
          </div>

          {r.loading ? <AdminLoading /> : r.items.length === 0 ? (
            <div className="list-empty"><span>📭</span>No projects yet. Add one using the form.</div>
          ) : r.items.map(item => (
            <div key={item._id} className="list-item">
              <div className="list-item-body">
                <div className="list-item-title">{item.title}</div>
                <div className="list-item-sub">{item.shortDescription}</div>
                <div className="list-item-tags">
                  {item.featured && <span className="list-item-tag" style={{ color: '#f59e0b', borderColor: 'rgba(245,158,11,0.3)', background: 'rgba(245,158,11,0.07)' }}>★ Featured</span>}
                  {(item.technologies || []).slice(0, 4).map(t => (
                    <span key={t} className="list-item-tag">{t}</span>
                  ))}
                  {(item.technologies || []).length > 4 && (
                    <span className="list-item-tag">+{item.technologies.length - 4}</span>
                  )}
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
              {r.editingId ? 'Edit Project' : 'New Project'}
            </span>
            {r.editingId && (
              <button className="btn btn-ghost" style={{ fontSize: 12, padding: '5px 12px' }} onClick={r.cancelEdit}>
                Cancel
              </button>
            )}
          </div>

          <form className="form-card-body" onSubmit={r.handleSave}>
            <Field label="Project Title *">
              <input name="title" value={r.form.title} onChange={r.handleChange} placeholder="e.g. DevCollab Platform" required />
            </Field>

            <Field label="Short Description *" hint="Shown on project card (1–2 sentences)">
              <textarea name="shortDescription" value={r.form.shortDescription} onChange={r.handleChange} placeholder="Brief summary for the card view" required rows={2} />
            </Field>

            <Field label="Full Description *" hint="Detailed overview shown in modal">
              <textarea name="fullDescription" value={r.form.fullDescription} onChange={r.handleChange} placeholder="Full description of the project..." required rows={3} />
            </Field>

            <Field label="Problem Solved">
              <textarea name="problem" value={r.form.problem} onChange={r.handleChange} placeholder="What problem does this project solve?" rows={2} />
            </Field>

            <Field label="Key Features" hint="Comma-separated: Auth system, Real-time chat, ...">
              <textarea name="features" value={r.form.features} onChange={r.handleChange} placeholder="Feature one, Feature two, Feature three" rows={2} />
            </Field>

            <Field label="Technologies *" hint="Comma-separated: React, Node.js, MongoDB">
              <input name="technologies" value={r.form.technologies} onChange={r.handleChange} placeholder="React, Node.js, MongoDB, Express" required />
            </Field>

            <Field label="Architecture" hint="Brief technical architecture explanation">
              <textarea name="architecture" value={r.form.architecture} onChange={r.handleChange} placeholder="Microservices backend with REST API..." rows={2} />
            </Field>

            <div className="form-row">
              <Field label="Thumbnail URL">
                <input name="thumbnail" value={r.form.thumbnail} onChange={r.handleChange} placeholder="https://..." />
              </Field>
              <Field label="Display Order">
                <input type="number" name="order" value={r.form.order} onChange={r.handleChange} min={0} />
              </Field>
            </div>

            <div className="form-row">
              <Field label="GitHub URL">
                <input name="githubUrl" value={r.form.githubUrl} onChange={r.handleChange} placeholder="https://github.com/..." />
              </Field>
              <Field label="Live Demo URL">
                <input name="liveUrl" value={r.form.liveUrl} onChange={r.handleChange} placeholder="https://..." />
              </Field>
            </div>

            <div className="form-checkbox-row">
              <input type="checkbox" id="featured" name="featured" checked={!!r.form.featured} onChange={r.handleChange} />
              <label htmlFor="featured">Mark as Featured project</label>
            </div>

            <div className="form-actions">
              <button type="submit" className="btn btn-primary" disabled={r.saving}>
                {r.saving ? 'Saving...' : r.editingId ? 'Update Project' : 'Create Project'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
