const mongoose = require('mongoose');

const educationSchema = new mongoose.Schema({
  school: { type: String, required: true, trim: true },
  degree: { type: String, required: true, trim: true },
  years: { type: String, required: true, trim: true },
  description: { type: String },
  order: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Education', educationSchema);
