const Profile = require('../models/Profile');

// GET /api/profile  — returns the single portfolio owner profile
const getProfile = async (req, res) => {
    try {
        let profile = await Profile.findOne();
        if (!profile) return res.status(404).json({ success: false, message: 'Profile not found' });
        res.json({ success: true, data: profile });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// PUT /api/profile  — upsert the profile (admin)
const updateProfile = async (req, res) => {
    try {
        let profile = await Profile.findOne();
        if (profile) {
            profile = await Profile.findByIdAndUpdate(profile._id, req.body, { new: true, runValidators: true });
        } else {
            profile = await Profile.create(req.body);
        }
        res.json({ success: true, data: profile, message: 'Profile updated successfully' });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

module.exports = { getProfile, updateProfile };
