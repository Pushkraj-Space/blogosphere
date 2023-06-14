const router = require('express').Router();
const authToken = require('../authToken');
const { createComment, updateComment, deleteComment, getAllCommentsOnBlog } = require('../controllers/commentController');


// To create comment on blog with blog_id
router.post('/:blog_id', authToken, createComment);

// To update comment 
router.put('/:cmt_id', authToken, updateComment);

// To delete a comment by comment id
router.delete('/:cmt_id', authToken, deleteComment);

// To get all comments of a particular blog post
router.get('/:blog_id', getAllCommentsOnBlog);

module.exports = router;