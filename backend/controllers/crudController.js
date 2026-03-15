/**
 * Generic CRUD controller factory
 * Creates standard create/read/update/delete handlers for any Mongoose model
 */
const createCRUDController = (Model, name = 'Item') => ({

  // GET /api/:resource
  getAll: async (req, res) => {
    try {
      const items = await Model.find().sort({ order: 1, createdAt: -1 });
      res.json({ success: true, count: items.length, data: items });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },

  // GET /api/:resource/:id
  getOne: async (req, res) => {
    try {
      const item = await Model.findById(req.params.id);
      if (!item) return res.status(404).json({ success: false, message: `${name} not found` });
      res.json({ success: true, data: item });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },

  // POST /api/:resource
  create: async (req, res) => {
    try {
      const item = await Model.create(req.body);
      res.status(201).json({ success: true, data: item, message: `${name} created successfully` });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  },

  // PUT /api/:resource/:id
  update: async (req, res) => {
    try {
      const item = await Model.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!item) return res.status(404).json({ success: false, message: `${name} not found` });
      res.json({ success: true, data: item, message: `${name} updated successfully` });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  },

  // DELETE /api/:resource/:id
  remove: async (req, res) => {
    try {
      const item = await Model.findByIdAndDelete(req.params.id);
      if (!item) return res.status(404).json({ success: false, message: `${name} not found` });
      res.json({ success: true, message: `${name} deleted successfully` });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },
});

module.exports = createCRUDController;
