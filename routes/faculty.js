const router = require('express').Router();
const { getAllFaculty, getSingleFaculty, createFaculty, deleteFaculty, loginFaculty } = require('../controllers/faculty');

// Get all faculty
router.get('/', getAllFaculty);

// Get single faculty by ID
router.get('/:id', getSingleFaculty);

// Create faculty
router.post('/', createFaculty);

// Delete Faculty using ID
router.delete('/:id', deleteFaculty);

// Login user using email and password
router.post('/login', loginFaculty);

module.exports = router;
