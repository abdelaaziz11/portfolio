const mongoose = require('mongoose');

const formationSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  org: { type: String, required: true, trim: true },
  year: { type: String, required: true },
  skills: [{ type: String }],
  icon: { type: String, default: '' },
  order: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Formation', formationSchema);
