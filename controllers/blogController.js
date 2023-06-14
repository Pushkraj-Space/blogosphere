const blog = require('../models/Blog')

// To create and save blog in database
const newBlog = (req,res) => {
    let data = req.body;
    data = {
        ...data,
        userName : req.user.user_name,
    }
    blog.createBlog(data ,(err, result) => {
        if(err) {
            return res.status(500).json({
                error : "Internal Server Error"
            })
        }
        return res.status(201).json({
            ...result,
            message : "Blog Posted Successfully",
        })
    })
}

// To update blog by blog id
const updateBlog = (req,res) =>{
    let data = req.body;
    let {blog_id} = req.params;
    data = {
        ...data,
        userName : req.user.user_name,
        blog_id,
    }
    blog.updateBlog(data ,(err, result)=>{
        if(err) {
            return res.status(500).json({
                error : "Internal Server Error"
            })
        }
        if(result.blogNotExists == true){
            return res.status(404).json({message : "Blog Not Found"});
        }
        if(result.userNotSame == true){
            return res.status(403).json({message : "Only blog author can update their blogs"})
        }
        return res.status(200).json({
            ...result,
            message : "Blog Update Successfully",
        })
    })
}

// To delete a blog 
const deleteBlog = (req,res) => {
    let {blog_id} = req.params;
    let data = {
        userName : req.user.user_name,
        blog_id,
    }
    blog.deleteBlog(data ,(err,result) =>{
        if(err) {
            return res.status(500).json({
                error : "Internal Server Error"
            })
        }
        if(result.blogNotExists == true){
            return res.status(404).json({message : "Blog Not Found"});
        }
        if(result.userNotSame == true){
            return res.status(403).json({message : "Only blog author can delete their blogs"});
        }
        return res.status(200).json({
            ...result,
            message : "Blog Deleted Successfully",
        })
    })
}

// To get all blogs on database
const getAllBlogs = (req, res) =>{
    blog.getAllBlogs((err, result) =>{
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

// To  get a blog by blog id
const getBlogById = (req, res)=>{
    let {blog_id} = req.params;
    blog.getBlogById(blog_id, (err, result) =>{
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

// To get all blogs of a particular user by user_name
const allBlogsOfUser = (req, res)=>{
    let {blog_author} = req.params;
    blog.allBlogsOfUser(blog_author, (err, result) => {
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
    newBlog,
    updateBlog,
    deleteBlog,
    getAllBlogs,
    getBlogById,
    allBlogsOfUser
}