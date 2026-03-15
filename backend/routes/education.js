const express = require('express');
const router = express.Router();
const Education = require('../models/Education');
const createCRUDController = require('../controllers/crudController');

const { getAll, getOne, create, update, remove } = createCRUDController(Education, 'Education');

router.get('/', getAll);
router.post('/', create);
router.get('/:id', getOne);
router.put('/:id', update);
router.delete('/:id', remove);

module.exports = router;
