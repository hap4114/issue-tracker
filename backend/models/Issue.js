const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    text: { type: String, required: true, trim: true },
    createdAt: { type: Date, default: Date.now },
});

const issueSchema = new mongoose.Schema(
    {
        title: { type: String, required: true, trim: true, maxlength: 200 },
        description: { type: String, required: true, trim: true },
        project: {
            type: String,
            required: true,
        },
        priority: {
            type: String,
            required: true,
            enum: ['Low', 'Medium', 'High', 'Critical'],
        },
        assignee: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            required: true,
            enum: ['Open', 'In Progress', 'Resolved', 'Closed'],
            default: 'Open',
        },
        comments: [commentSchema],
    },
    { timestamps: true }
);

module.exports = mongoose.model('Issue', issueSchema);