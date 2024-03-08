const express = require('express')

//controller
const { signupUser, loginUser } = require('../controllers/userController')

const router = express.Router()

router.post('/login', loginUser)

router.post('/signup', signupUser)


/* Not sure if we will need these apis still so commented out for now */

//Get a user using ID
// router.get('/:id', findUser)

// // Add a flashcard set to a user's library
// router.patch(':id/set', addSetToUser)

module.exports = router