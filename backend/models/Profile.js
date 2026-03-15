const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    title: { type: String, required: true, trim: true },
    tagline: { type: String, trim: true },
    bio: { type: String },
    avatar: { type: String, default: null },
    email: { type: String, trim: true },
    github: { type: String, trim: true },
    linkedin: { type: String, trim: true },
    cvUrl: { type: String, default: '#' },
    // About section fields stored on same document for simplicity
    aboutText: { type: String },
    aboutHighlights: [{ type: String }],
}, { timestamps: true });

module.exports = mongoose.model('Profile', profileSchema);
