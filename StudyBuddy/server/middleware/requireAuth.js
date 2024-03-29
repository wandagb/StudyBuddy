const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const requireAuth = async (req, res, next) => {

    //verify authentication
    const { authorization } = req.headers

    if(!authorization){
        return res.status(401).json({error: 'Authorization token required'})
    }

    const token = authorization.split(' ')[1] //extract token from authorization header

    try {
        const {_id} = jwt.verify(token, process.env.SECRET ) //verify token and extract user ID

        //fetch user from database by ID
        req.user = await User.findOne({_id}).select('_id')
        req.username = await User.findOne({_id}).select('username')
        next()

    } catch(error) {
        console.log(error)
        res.status(401).json({error: "Request is not authorized"})
    }
}

module.exports = requireAuth