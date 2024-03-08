const User = require('../models/userModel')
const jwt = require('jsonwebtoken')


const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, { expiresIn: '1d' })
}

//login user
const loginUser = async (req, res) => {
    const {email, password} = req.body

    try {
        const user = await User.login(email, password)

        //create a token
        const token = createToken(user._id)

        res.status(200).json({email, token})
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
        res.status(200).json({email, token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

/* Not sure if we will need these anymore, so commenting out just in case */

// const addSetToUser = async (req, res) => {
//     const setID = req.body.id

//     const userID = req.params.id

//     const users = schemas.users

//     // Find user and add setID to array
//     const update = await users.findOneAndUpdate(
//         {_id: userID},
//         { $push: {sets: setID}});


//     if(!update) {
//         return res.status(400).json({error: 'User not found'})
//     }

//     res.status(200).json(update)
// }

// const findUser = async (req, res) => {
//     const id = req.params.id

//     const users = schemas.users

//     const user = await users.findById(id)
//     if(!user) {
//         return res.status(404).json({error: 'User not found.'})
//     }

//     res.status(200).json(user)
// }


module.exports = { loginUser, signupUser }  // findUser, addSetToUser