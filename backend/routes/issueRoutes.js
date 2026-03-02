const express = require('express');
const router = express.Router();
const {
    getIssues,
    getIssue,
    createIssue,
    updateStatus,
    addComment,
} = require('../controllers/issueController');

router.get('/', getIssues);
router.post('/', createIssue);
router.get('/:id', getIssue);
router.patch('/:id/status', updateStatus);
router.post('/:id/comments', addComment);

module.exports = router;