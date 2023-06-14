const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const user = require('../models/User');

// To authenticate user and generate json web token
const userLogin = (req,res) => {
    let data = {
        userName : "",
        email : "",
        ...req.body
    }
    user.confirmUser(data , (err, result) => {
        if(err) {
            return res.status(500).json({
                error : "Internal Server Error"
            })
        }
        if(result.userNotFound == true){
            return res.status(404).json({message : "Enter correct user name or password"})
        }
        delete result.passkey;
        let accessToken = jwt.sign({...result} , process.env._TOKEN_SECRET,{ expiresIn : '30m'})
        return res.status(200).json({
            accessToken,
            user : result,
        })
    })
}

// To create a user and save it to databse
const userRegistration = async (req, res) => {
    const data  = req.body;
    data.passkey = await bcrypt.hash(data.passkey, 12);
    user.registerUser(data, (err, result) => {
        if(err) {
            return res.status(500).json({
                error : "Internal Server Error"
            })
        }
        if(result.userNameExist == true){
            return res.status(409).json({
                message : "User Name exists; try different user name",
            })
        }
        if(result.userEmailExist == true){
            return res.status(409).json({
                message : "Email already registered;",
            })
        }
        return res.status(201).json({
            ...result,
            message : "User Register Successfully",
        })
    });
}

// To get a user from database
const getUser = (req,res) => {
    const {userName} = req.params;
    user.get_User(userName ,(err, result) => {
        if(err){
            return res.status(500).json({
                error : "Internal Server Error"
            })
        }
        if(result.userNotFound == true){
            return res.status(404).json({message : "User Not Found"})
        }
        return res.status(200).json({...result});
    })
}

// To get all users from database
const getAllUsers = (req,res) =>{
    user.getAllUsers((err, result) => {
        if(err){
            return res.status(500).json({
                error : "Internal Server Error"
            })
        }
        return res.status(200).json({...result});
    })
}

// To delete a user from database
const deleteUser = (req,res) =>{
    let {user_name} = req.params;
    if(user_name != req.user.user_name){
        return res.status(403).json({message : "Can not delete other user"});
    }
    let data = {user_name};
    user.deleteUser(data, (err, result) =>{
        if(err){
            return res.status(500).json({
                error : "Internal Server Error"
            })
        }
        const auth_header = req.headers.authorization;
        const token = auth_header && auth_header.split(' ')[1];
        user.addToBlacklist(token);
        return res.status(200).json({
            ...result, 
            message : "user deleted successfully",
        });
    })
}

// To update user information
const updateUser = (req,res) =>{
    let {user_name} = req.params;
    if(user_name != req.user.user_name){
        return res.status(403).json({message : "Can not update other user"});
    }
    let data = {
        ...req.body,
        user_name,
    };
    user.updateUser(data, (err, result) =>{
        if(err){
            return res.status(500).json({
                error : "Internal Server Error"
            })
        }
        return res.status(200).json({
            ...result, 
            message : "user updated successfully",
        });
    })
}


module.exports = {
    userRegistration,
    userLogin,
    getUser,
    getAllUsers,
    deleteUser,
    updateUser
}


