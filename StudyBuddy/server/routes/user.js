const express = require('express')

//controller to handle user authentication
const { signupUser, loginUser } = require('../controllers/userController')

const router = express.Router()

router.post('/login', loginUser)
router.post('/signup', signupUser)

module.exports = router