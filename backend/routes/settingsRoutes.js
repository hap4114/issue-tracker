const express = require('express');
const router = express.Router();
const settingsController = require('../controllers/settingsController');

// Projects
router.get('/projects', settingsController.getProjects);
router.post('/projects', settingsController.createProject);
router.delete('/projects/:id', settingsController.deleteProject);

// Assignees
router.get('/assignees', settingsController.getAssignees);
router.post('/assignees', settingsController.createAssignee);
router.delete('/assignees/:id', settingsController.deleteAssignee);

module.exports = router;
