const router = require('express').Router();
const authToken = require('../authToken');

const { newBlog,updateBlog, deleteBlog, getAllBlogs, getBlogById, allBlogsOfUser } = require('../controllers/blogController');

// To create new Blog post
router.post('/', authToken, newBlog)

// To update blog post by blog id
router.put('/:blog_id', authToken, updateBlog);

// To delete blog post by blog id
router.delete('/:blog_id', authToken, deleteBlog)

// To get all blogs
router.get('/', getAllBlogs)

// To get blog by id
router.get('/:blog_id', getBlogById);

// To get all blogs of perticular user by username
router.get('/u/:blog_author', allBlogsOfUser);


module.exports = router;