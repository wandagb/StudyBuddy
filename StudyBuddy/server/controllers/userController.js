const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

//JSON Web Token
const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, { expiresIn: '1d' })
}

//login user
const loginUser = async (req, res) => {
    const {username, password} = req.body

    try {
        const user = await User.login(username, password)

        //create a token
        const token = createToken(user._id)
        const userid = user._id
        res.status(200).json({username, token})
    } catch(error) {
        res.status(400).json({error: error.message})
    }
}

//sign up user
const signupUser = async (req, res) => {
    const {email, username, password} = req.body

    try {
        const user = await User.signup(email, username, password)
        
        //create token
        const token = createToken(user._id)

        res.status(200).json({email, username, token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = { loginUser, signupUser }  // findUser, addSetToUser
