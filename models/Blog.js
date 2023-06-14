const pool = require('./database');

// To save new blog to database
const createBlog = (data, callback) => {
    pool.query(
        `INSERT INTO blogs(blog_title, blog_author, blog_content) VALUES(?,?,?)`,
        [  
            data.blog_title,
            data.userName,
            data.blog_content
        ],
        (err, dbResult) =>{
            if(err) return callback(err);
            return callback(null, dbResult);
        }
    )
}

// To save blog with new information 
const updateBlog = (data, callback) => {
    pool.query(
        `SELECT blog_author FROM blogs where blog_id = ?`,
        [data.blog_id,],
        (err, dbResult) =>{
            if(err) return callback(err);
            if(dbResult.length == 0){
                return callback(null, {blogNotExists : true});
            }
            if(dbResult[0].blog_author != data.userName){
                return callback(null, {userNotSame : true});
            }
            pool.query(
                `UPDATE blogs SET blog_title = ?, blog_content = ? where blog_id = ?`,
                [  
                    data.blog_title,
                    data.blog_content,
                    data.blog_id,
                ],
                (err, dbResult) =>{
                    if(err) return callback(err);
                    return callback(null, dbResult);
                }
            )
        }
    )
}

// To delete a blog from database
const deleteBlog =(data, callback)=>{
    pool.query(
        `SELECT blog_author FROM blogs where blog_id = ?`,
        [data.blog_id,],
        (err, dbResult) =>{
            if(err) return callback(err);
            if(dbResult.length == 0){
                return callback(null, {blogNotExists : true});
            }
            if(dbResult[0].blog_author != data.userName){
                return callback(null, {userNotSame : true});
            }
            pool.query(
                `DELETE FROM blogs where blog_id = ?`,
                [data.blog_id],
                (err, dbResult) =>{
                    if(err) return callback(err);
                    return callback(null, dbResult);
                }
            )
        }
    )
}

// To get all blogs from database
const getAllBlogs = (callback) =>{ 
    pool.query(
        `SELECT * FROM blogs`,
        (err, dbResult) =>{
            if(err) return callback(err);
            return callback(null, dbResult);
        }
    )
}

// To get a particular blog by their id
const getBlogById = (blog_id,callback) =>{
    pool.query(
        `SELECT * FROM blogs WHERE blog_id = ?`,
        [ blog_id],
        (err, dbResult)=>{
            if(err) return callback(err);
            if(dbResult.length == 0){
                return callback(null, {blogNotExists : true});
            }
            return callback(null, dbResult);
        }
    )
}


// To get all blogs of a particular user
const allBlogsOfUser = (blog_author, callback) =>{
    pool.query(
        `SELECT * FROM blogs WHERE blog_author = ?`,
        [ blog_author],
        (err, dbResult) =>{
            if(err) return callback(err);
            return callback(null, dbResult);
        }
    )
}


module.exports = {
    createBlog,
    updateBlog,
    deleteBlog,
    getAllBlogs,
    getBlogById,
    allBlogsOfUser
}