const router = require('express').Router();
const {
	getAllComments,
	getSingleComment,
	createComment,
	deleteComment,
	getCommentsByUser,
	getCommentsOnPublication
} = require('../controllers/comment');

router.get('/', getAllComments);

router.post('/', createComment);

router.get('/:id', getSingleComment);

router.delete('/:id', deleteComment);

router.get('/user/:id', getCommentsByUser);

router.get('/publication/:id', getCommentsOnPublication);

module.exports = router;
