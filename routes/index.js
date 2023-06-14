const router = require('express').Router();

const userRouter = require('./users');
const blogsRouter = require('./blogs');
const commentsRouter = require('./comments');

router.use('/user' , userRouter);
router.use('/blog' , blogsRouter);
router.use('/comment' , commentsRouter);


module.exports = router;