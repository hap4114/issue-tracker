const Project = require('../models/Project');
const Assignee = require('../models/Assignee');

// Projects
exports.getProjects = async (req, res) => {
    try {
        const projects = await Project.find().sort({ name: 1 });
        res.json(projects);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createProject = async (req, res) => {
    const project = new Project(req.body);
    try {
        const newProject = await project.save();
        res.status(201).json(newProject);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.deleteProject = async (req, res) => {
    try {
        await Project.findByIdAndDelete(req.params.id);
        res.json({ message: 'Project deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Assignees
exports.getAssignees = async (req, res) => {
    try {
        const assignees = await Assignee.find().sort({ name: 1 });
        res.json(assignees);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createAssignee = async (req, res) => {
    const assignee = new Assignee(req.body);
    try {
        const newAssignee = await assignee.save();
        res.status(201).json(newAssignee);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.deleteAssignee = async (req, res) => {
    try {
        await Assignee.findByIdAndDelete(req.params.id);
        res.json({ message: 'Assignee deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
