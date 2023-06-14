const pool = require('./database');

// To make pool.query asynchronous 
function queryAsync(sql,values){
    return new Promise((resolve, reject) => {
        pool.query(sql,values,
            (err, results, fields) => {
                if(err) reject(err);
                else resolve(results);
            }
        )
    })
}

// To save a comment 
const createComment = (data, callback) =>{
    pool.query(
        'SELECT blog_author FROM blogs WHERE blog_id = ?',
        [data.blog_id],
        (err, dbResult) =>{
            if(err) return callback(err);
            if(dbResult.length == 0){
                return callback(null, {blogNotExists : true});
            }
            pool.query(
                `INSERT INTO comments(cmt_blog_id, cmt_user_name, cmt_text) VALUES(?,?,?)`,
                [  
                    data.blog_id,
                    data.userName,
                    data.cmt_text
                ],
                (err, dbResult) =>{
                    if(err) {
                        console.log(err);
                        return callback(err);
                    }
                    return callback(null, dbResult);
                }
            )
        }
    )  
}

// To update comment
const updateComment = (data, callback) =>{
    pool.query(
        'SELECT cmt_user_name FROM comments WHERE cmt_id = ?',
        [data.cmt_id],
        (err, dbResult) =>{
            if(err) return callback(err);
            if(dbResult.length == 0){
                return callback(null, {cmtNotExists : true});
            }
            if(dbResult[0].cmt_user_name != data.userName){ 
                return callback(null, {userNotSame : true});
            }
            pool.query(
                `UPDATE comments SET cmt_text = ? where cmt_id = ?`,
                [  
                    data.cmt_text,
                    data.cmt_id
                ],
                (err, dbResult) =>{
                    if(err) {
                        console.log(err);
                        return callback(err);
                    }
                    return callback(null, dbResult);
                }
            )
        }
    )
}

// To delete commment 
const deleteComment = async(data, callback)=>{
    try{        
        let dbResult = await queryAsync(
            `SELECT cmt_user_name FROM comments where cmt_id = ?`,
            [data.cmt_id]
        )
        if(dbResult.length == 0){
            return callback(null, {cmtNotExists : true});
        }
        if(dbResult[0].cmt_user_name != data.userName){
            return callback(null, {userNotSame : true});
        }

        dbResult = await queryAsync(
            `DELETE FROM comments where cmt_id = ?`,
            [data.cmt_id]
        )
        return callback(null, dbResult);
    }catch(err){
        console.log("ERROR !!", err);
        callback(err);
    }
}

// To get all comments of a particular blog
const getAllCommentsOnBlog = (data, callback)=>{
    pool.query(
        `SELECT * FROM comments WHERE cmt_blog_id = ?`,
        [data.blog_id],
        (err, dbResult) => {
            if(err) return callback(err);
            return callback(null, dbResult);
        }
    )
}


module.exports = {
    createComment,
    updateComment,
    deleteComment,
    getAllCommentsOnBlog,
}