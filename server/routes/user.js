const express = require('express')

//controller
const { signupUser, loginUser } = require('../controllers/userController')

const router = express.Router()

router.post('/login', loginUser)

router.post('/signup', signupUser)

module.exports = router