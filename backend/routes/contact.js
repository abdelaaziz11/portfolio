const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { submitContact, getContacts } = require('../controllers/contactController');

router.post('/', [
  body('name').trim().notEmpty().withMessage('Name is required').isLength({ max: 100 }),
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('message').trim().notEmpty().withMessage('Message is required').isLength({ min: 10, max: 2000 })
], submitContact);

router.get('/', getContacts);

module.exports = router;
