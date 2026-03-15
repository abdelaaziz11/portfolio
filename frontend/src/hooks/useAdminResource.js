import { useState, useEffect, useCallback } from 'react';

/**
 * Generic hook for managing a CRUD resource in the admin panel.
 * Handles: loading, list, form state, save (create/update), delete, toast.
 *
 * @param {object} apiResource  - Object with getAll/create/update/delete methods
 * @param {object} emptyForm    - Default blank form values
 */
export function useAdminResource(apiResource, emptyForm) {
  const [items, setItems]           = useState([]);
  const [loading, setLoading]       = useState(true);
  const [saving, setSaving]         = useState(false);
  const [form, setForm]             = useState(emptyForm);
  const [editingId, setEditingId]   = useState(null);
  const [toast, setToast]           = useState(null);  // { message, type }
  const [confirmId, setConfirmId]   = useState(null);  // id pending delete

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  // ── Fetch all ──────────────────────────────────────
  const fetchAll = useCallback(async () => {
    setLoading(true);
    try {
      const res = await apiResource.getAll();
      setItems(res.data || []);
    } catch (e) {
      showToast(e.message || 'Failed to load data', 'error');
    } finally {
      setLoading(false);
    }
  }, [apiResource]);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  // ── Field change ───────────────────────────────────
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  // ── Start editing ──────────────────────────────────
  const startEdit = (item) => {
    setEditingId(item._id);
    // Flatten array fields to comma-separated strings for textarea
    const normalized = { ...item };
    Object.keys(emptyForm).forEach(key => {
      if (Array.isArray(normalized[key])) {
        normalized[key] = normalized[key].join(', ');
      }
    });
    setForm(normalized);
    // Scroll to form on mobile
    document.querySelector('.admin-form-card')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // ── Cancel editing ─────────────────────────────────
  const cancelEdit = () => {
    setEditingId(null);
    setForm(emptyForm);
  };

  // ── Save (create or update) ────────────────────────
  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);

    // Coerce array fields back from comma-separated strings
    const payload = { ...form };
    Object.keys(emptyForm).forEach(key => {
      const emptyVal = emptyForm[key];
      if (Array.isArray(emptyVal) || (typeof emptyVal === 'string' && emptyVal === '[]')) {
        // treat comma-string as array
        if (typeof payload[key] === 'string') {
          payload[key] = payload[key]
            .split(',')
            .map(v => v.trim())
            .filter(Boolean);
        }
      }
      // coerce numbers
      if (typeof emptyVal === 'number') {
        payload[key] = Number(payload[key]);
      }
    });

    try {
      if (editingId) {
        await apiResource.update(editingId, payload);
        showToast('Updated successfully ✓');
      } else {
        await apiResource.create(payload);
        showToast('Created successfully ✓');
      }
      setForm(emptyForm);
      setEditingId(null);
      await fetchAll();
    } catch (e) {
      showToast(e.message || 'Save failed', 'error');
    } finally {
      setSaving(false);
    }
  };

  // ── Delete ─────────────────────────────────────────
  const confirmDelete = (id) => setConfirmId(id);
  const cancelDelete  = () => setConfirmId(null);

  const handleDelete = async () => {
    if (!confirmId) return;
    try {
      await apiResource.delete(confirmId);
      showToast('Deleted successfully');
      setConfirmId(null);
      if (editingId === confirmId) cancelEdit();
      await fetchAll();
    } catch (e) {
      showToast(e.message || 'Delete failed', 'error');
    }
  };

  return {
    items, loading, saving,
    form, editingId,
    toast, setToast,
    confirmId,
    handleChange,
    startEdit, cancelEdit,
    handleSave,
    confirmDelete, cancelDelete, handleDelete,
  };
}
