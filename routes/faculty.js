const router = require('express').Router();
const { loginUser, getAllFaculty, getSingleFaculty, createFaculty, deleteFaculty } = require('../controllers/faculty');

// Get all faculty
router.get('/', getAllFaculty);

// Get single faculty by ID
router.get('/:id', getSingleFaculty);

// Create faculty
router.post('/', createFaculty);

// Delete Faculty using ID
router.delete('/:id', deleteFaculty);

// Login user using email and password
router.post('/login', loginUser);

module.exports = router;
