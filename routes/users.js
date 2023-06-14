const router = require('express').Router();
const authToken = require('../authToken');
const {
    userLogin,
    userRegistration,
    getUser,
    getAllUsers,
    deleteUser,
    updateUser,
} = require('../controllers/userController')

// Get user by user name
router.get('/:userName', getUser)

// To get all users
router.get('/', getAllUsers);

// To create new user 
router.post('/', userRegistration)

// For login existing user
router.post('/login',userLogin);

// To delete a user by user name
router.delete('/:user_name', authToken, deleteUser)

// To update user
router.put('/:user_name', authToken, updateUser)

module.exports = router;