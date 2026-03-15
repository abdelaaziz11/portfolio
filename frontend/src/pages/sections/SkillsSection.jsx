import { api } from '../../services/api';
import { useAdminResource } from '../../hooks/useAdminResource';
import { Toast, ConfirmDelete, AdminLoading, Field, EditBtn, DeleteBtn } from '../AdminUI';

const CATEGORIES = ['Frontend', 'Backend', 'Databases', 'DevOps', 'Tools', 'Deployment', 'Languages'];

const EMPTY = { name: '', category: 'Frontend', level: 80, order: 0 };

export default function SkillsSection() {
  const r = useAdminResource(api.skills, EMPTY);

  // Group by category for display
  const grouped = CATEGORIES.reduce((acc, cat) => {
    acc[cat] = r.items.filter(s => s.category === cat);
    return acc;
  }, {});

  return (
    <>
      {r.toast && <Toast {...r.toast} onClose={() => r.setToast(null)} />}
      {r.confirmId && (
        <ConfirmDelete
          itemName={r.items.find(i => i._id === r.confirmId)?.name || 'this skill'}
          onConfirm={r.handleDelete}
          onCancel={r.cancelDelete}
        />
      )}

      <div className="admin-panel">
        {/* ── List grouped by category ── */}
        <div className="admin-list-card">
          <div className="list-card-header">
            <span className="list-card-title">⚡ Skills</span>
            <span className="list-card-count">{r.items.length} total</span>
          </div>

          {r.loading ? <AdminLoading /> : r.items.length === 0 ? (
            <div className="list-empty"><span>⚡</span>No skills yet. Add some using the form.</div>
          ) : CATEGORIES.map(cat => {
            const catItems = grouped[cat];
            if (!catItems.length) return null;
            return (
              <div key={cat}>
                <div style={{ padding: '10px 22px 6px', fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', borderBottom: '1px solid var(--border)', background: 'rgba(255,255,255,0.015)' }}>
                  {cat}
                </div>
                {catItems.map(item => (
                  <div key={item._id} className="list-item">
                    <div className="list-item-body">
                      <div className="list-item-title">{item.name}</div>
                      <div className="list-skill-bar">
                        <div className="list-skill-track">
                          <div className="list-skill-fill" style={{ width: `${item.level}%` }} />
                        </div>
                        <span className="list-skill-pct">{item.level}%</span>
                      </div>
                    </div>
                    <div className="list-item-actions">
                      <EditBtn onClick={() => r.startEdit(item)} />
                      <DeleteBtn onClick={() => r.confirmDelete(item._id)} />
                    </div>
                  </div>
                ))}
              </div>
            );
          })}
        </div>

        {/* ── Form ── */}
        <div className="admin-form-card">
          <div className="form-card-header">
            <span className="form-card-title">
              <span>{r.editingId ? '✏️' : '➕'}</span>
              {r.editingId ? 'Edit Skill' : 'Add Skill'}
            </span>
            {r.editingId && (
              <button className="btn btn-ghost" style={{ fontSize: 12, padding: '5px 12px' }} onClick={r.cancelEdit}>Cancel</button>
            )}
          </div>

          <form className="form-card-body" onSubmit={r.handleSave}>
            <Field label="Skill Name *">
              <input name="name" value={r.form.name} onChange={r.handleChange} placeholder="e.g. React" required />
            </Field>

            <Field label="Category *">
              <select name="category" value={r.form.category} onChange={r.handleChange} required>
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </Field>

            <Field label={`Proficiency Level: ${r.form.level}%`} hint="Drag to set level (0–100)">
              <input
                type="range"
                name="level"
                min={0} max={100} step={5}
                value={r.form.level}
                onChange={r.handleChange}
                style={{ width: '100%', accentColor: 'var(--accent-cyan)', cursor: 'pointer' }}
              />
              {/* Visual preview */}
              <div style={{ marginTop: 6 }}>
                <div className="list-skill-track">
                  <div className="list-skill-fill" style={{ width: `${r.form.level}%` }} />
                </div>
              </div>
            </Field>

            <Field label="Display Order">
              <input type="number" name="order" value={r.form.order} onChange={r.handleChange} min={0} />
            </Field>

            <div className="form-actions">
              <button type="submit" className="btn btn-primary" disabled={r.saving}>
                {r.saving ? 'Saving...' : r.editingId ? 'Update Skill' : 'Add Skill'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
