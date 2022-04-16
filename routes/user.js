const router = require('express').Router();
const { getAllUsers, getSingleUser, createUser, loginUser, deleteUser, toggleVisibility } = require('../controllers/user');

router.get('/', getAllUsers);

router.get('/:id', getSingleUser);

router.post('/', createUser);

router.delete('/:id', deleteUser);

router.post('/login', loginUser);

router.get('/visibility/:id', toggleVisibility)

module.exports = router;
