const mongoose = require('mongoose');

const assigneeSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true, trim: true },
    avatar: { type: String, default: '' }, // Could store initials or URL
    email: { type: String, trim: true }
}, { timestamps: true });

module.exports = mongoose.model('Assignee', assigneeSchema);
