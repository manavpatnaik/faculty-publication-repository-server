const router = require('express').Router();
const {
	getAllPublications,
	getSinglePublication,
	createPublication,
	deletePublication,
	getPublicationByFaculty,
	bookmarkPublication
} = require('../controllers/publication');

router.get('/', getAllPublications);

router.get('/:id', getSinglePublication);

router.post('/', createPublication);

router.delete('/:id', deletePublication);

router.get('/faculty/:id', getPublicationByFaculty);

router.post('/bookmark/:id', bookmarkPublication);

module.exports = router;
