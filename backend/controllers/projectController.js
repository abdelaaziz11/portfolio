const Project = require('../models/Project');
const createCRUDController = require('./crudController');

const crud = createCRUDController(Project, 'Project');

const getProjects = async (req, res) => {
  try {
    const { tech } = req.query;
    let query = {};
    if (tech && tech !== 'All') {
      query.technologies = { $in: [new RegExp(tech, 'i')] };
    }
    const projects = await Project.find(query).sort({ order: 1, createdAt: -1 });
    res.json({ success: true, count: projects.length, data: projects });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  getProjects,
  getProject: crud.getOne,
  createProject: crud.create,
  updateProject: crud.update,
  deleteProject: crud.remove,
};
