const express = require('express');
const router = express.Router();
const { getProjects, getProject, createProject } = require('../controllers/projectController');

router.get('/', getProjects);
router.get('/:id', getProject);
router.post('/', createProject);

module.exports = router;
