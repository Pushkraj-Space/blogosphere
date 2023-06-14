const comment = require('../models/Comment');

// To create a new comment and save it to database
const createComment = (req,res) =>{
    let data = req.body;
    let {blog_id} = req.params;
    data = {
        ...req.body,
        blog_id,
        userName : req.user.user_name,
    }
    comment.createComment(data, (err, result) => {
        if(err) {
            return res.status(500).json({
                error : "Internal Server Error"
            })
        }
        if(result.blogNotExists == true){
            return res.status(404).json({message : "Blog Not Found"});
        }
        return res.status(200).json({
            ...result,
        })
    })
}

// To update a comment on particular blog
const updateComment = (req,res) =>{
    let data = req.body;
    let {cmt_id} = req.params;
    data = {
        ...data,
        userName : req.user.user_name,
        cmt_id,
    }
    comment.updateComment(data, (err, result) =>{
        if(err) {
            return res.status(500).json({
                error : "Internal Server Error"
            })
        }
        if(result.cmtNotExists == true){
            return res.status(404).json({message : "Comment not Exists"})
        }
        if(result.userNotSame == true){
            return res.status(403).json({message : "Can not update other users comment"})
        }
        return res.status(200).json({
            ...result,
            message : "Comment Update Successfully",
        })
    })
}

// To delete comment 
const deleteComment = (req, res) => {
    let {cmt_id} = req.params;
    let data = {
        cmt_id,
        userName : req.user.user_name,
    }
    comment.deleteComment(data, (err, result) => {
        if(err) {
            return res.status(500).json({
                error : "Internal Server Error"
            })
        }
        if(result.cmtNotExists == true){
            return res.status(404).json({message : "Comment Not Found"});
        }
        if(result.userNotSame == true){
            return res.status(403).json({message : "Cannot delete other users comment"})
        }
        return res.status(200).json({
            ...result,
            message : "Comment Deleted Successfully",
        })
    })
}

// To get all comments of a particular blog
const getAllCommentsOnBlog = (req, res) =>{
    let {blog_id} = req.params;
    let data = {
        blog_id,
    }
    comment.getAllCommentsOnBlog(data, (err, result) =>{
        if(err) {
            return res.status(500).json({
                error : "Internal Server Error"
            })
        }
        return res.status(200).json({
            ...result,
        })
    })
}


module.exports = {
    createComment,
    updateComment,
    deleteComment,
    getAllCommentsOnBlog,
}