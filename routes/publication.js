const router = require('express').Router();
const {
	getAllPublications,
	getSinglePublication,
	createPublication,
	deletePublication,
	getPublicationByFaculty
} = require('../controllers/publication');

router.get('/', getAllPublications);

router.get('/:id', getSinglePublication);

router.post('/', createPublication);

router.delete('/:id', deletePublication);

router.get('/faculty/:id', getPublicationByFaculty);

module.exports = router;
