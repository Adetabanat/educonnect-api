// routes/students.js
const express = require('express');
const router = express.Router();
const {
  getAllStudents,
  getSingleStudent,
  createStudent,
  updateStudent,
  deleteStudent,
} = require('../controllers/students'); // Adjust the path if needed
const { validateRequest } = require('../middleware/validateRequest'); // Adjust the path if needed

// Define the routes for student management
router.get('/', getAllStudents);
router.get('/:id', getSingleStudent);
router.post('/', validateRequest, createStudent);
router.put('/:id', validateRequest, updateStudent);
router.delete('/:id', deleteStudent);

module.exports = router;
