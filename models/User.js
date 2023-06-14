const pool = require('./database');
const bcrypt = require('bcrypt');

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

const registerUser = async (data, callback) => {
    try{
        // To check if user name exists or not 
        let dbResult = await queryAsync(
            `SELECT first_name FROM users WHERE user_name = ?`,
            [ data.userName ]
        )
        if(dbResult.length > 0){
            return callback(null, {userNameExist: true})
        }

        // To check if email is already register or not 
        dbResult = await queryAsync(
            `SELECT first_name FROM users WHERE email = ?`,
            [ data.email ]
        )
        if(dbResult.length > 0){
            return callback(null, {userEmailExist: true})
        }

        // To insert new user data to database
        dbResult = await queryAsync(
            `INSERT INTO users(first_name, last_name, email, user_name, passkey) VALUES(
                ?,?,?,?,?
            )`,
            [
                data.firstName,
                data.lastName,
                data.email,
                data.userName,
                data.passkey
            ]
        )
        callback(null, dbResult)
    }catch(err){
        console.log("ERROR !!", err);
        callback(err);
    }
}

const get_User = async(userName, callback) => {
    pool.query(
        `SELECT first_name, last_name, user_name FROM users WHERE user_name = ?`,
        [ 
            userName, 
        ],
        (err, dbResult)=>{
            if(dbResult.length == 0){
                return callback(null, {userNotFound: true})
            }
            callback(null, dbResult[0]);
        }
    )
}

const confirmUser = (data , callback) =>{
    pool.query(
        `SELECT * FROM users WHERE user_name = ? or email = ?`,
        [
            data.userName,
            data.email,
        ],
        (err, dbResult) =>{
            if(dbResult.length == 0){
                return callback(null, {userNotFound: true});
            }
            let {passkey} = dbResult[0];
            let cmp = (async()=>{
                await bcrypt.compare(data.passkey, passkey)
            })();
            if(cmp == false){
                return callback(null, {userNotFound: true});
            }
            callback(null, dbResult[0]);
        }
    ) 
}

const getAllUsers = (callback) =>{
    pool.query(
        `SELECT first_name, last_name, user_name FROM users`,
        (err, dbResult) =>{
            if(err) return callback(err);
            return callback(null,dbResult);
        }
    )
}

const deleteUser = (data, callback) =>{
    pool.query(
        `DELETE FROM users WHERE user_name = ?`,
        [data.user_name],
        (err, result) => {
            if(err) return callback(err);
            return callback(null, result);
        }
    )
}

const updateUser = (data, callback) =>{
    console.log(data);
    pool.query(
        `UPDATE users SET first_name = ?, last_name = ?, email = ? WHERE user_name  = ?`,
        [data.firstName, data.lastName, data.email, data.user_name],
        (err, result) => {
            if(err) return callback(err);
            return callback(null, result);
        }
    )
}

const addToBlacklist = (token) => {
    pool.query(
        `INSERT INTO blacklist(tokens) VALUES(?)`,
        [token],
    )
}
module.exports = {
    registerUser,
    get_User,
    confirmUser,
    getAllUsers,
    deleteUser,
    updateUser,
    addToBlacklist,
}