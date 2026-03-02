const Issue = require('../models/Issue');

// GET /api/issues
exports.getIssues = async (req, res) => {
    try {
        const { project, priority, status, assignee, search } = req.query;
        const filter = {};

        if (project) filter.project = project;
        if (priority) filter.priority = priority;
        if (status) filter.status = status;
        if (assignee) filter.assignee = assignee;
        if (search) {
            filter.$or = [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } },
            ];
        }

        const issues = await Issue.find(filter).sort({ createdAt: -1 });

        // Count per status
        const counts = await Issue.aggregate([
            { $group: { _id: '$status', count: { $sum: 1 } } },
        ]);
        const statusCounts = counts.reduce((acc, c) => {
            acc[c._id] = c.count;
            return acc;
        }, {});

        res.json({ issues, statusCounts });
    } catch (err) {
        res.status(500).json({ error: 'Server error', details: err.message });
    }
};

// GET /api/issues/:id
exports.getIssue = async (req, res) => {
    try {
        const issue = await Issue.findById(req.params.id);
        if (!issue) return res.status(404).json({ error: 'Issue not found' });
        res.json(issue);
    } catch (err) {
        res.status(400).json({ error: 'Invalid ID', details: err.message });
    }
};

// POST /api/issues
exports.createIssue = async (req, res) => {
    try {
        const issue = new Issue(req.body);
        await issue.save();
        res.status(201).json(issue);
    } catch (err) {
        if (err.name === 'ValidationError') {
            return res.status(400).json({ error: 'Validation failed', details: err.message });
        }
        res.status(500).json({ error: 'Server error', details: err.message });
    }
};

// PATCH /api/issues/:id/status
exports.updateStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const allowed = ['Open', 'In Progress', 'Resolved', 'Closed'];
        if (!allowed.includes(status)) {
            return res.status(400).json({ error: `Status must be one of: ${allowed.join(', ')}` });
        }
        const issue = await Issue.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true, runValidators: true }
        );
        if (!issue) return res.status(404).json({ error: 'Issue not found' });
        res.json(issue);
    } catch (err) {
        res.status(400).json({ error: 'Invalid request', details: err.message });
    }
};

// POST /api/issues/:id/comments
exports.addComment = async (req, res) => {
    try {
        const { text } = req.body;
        if (!text || !text.trim()) {
            return res.status(400).json({ error: 'Comment text is required' });
        }
        const issue = await Issue.findById(req.params.id);
        if (!issue) return res.status(404).json({ error: 'Issue not found' });

        issue.comments.push({ text: text.trim() });
        await issue.save();
        res.status(201).json(issue);
    } catch (err) {
        res.status(400).json({ error: 'Invalid request', details: err.message });
    }
};