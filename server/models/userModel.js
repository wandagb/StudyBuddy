const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

// Users that contain name, email, list of flashcard set IDs that they own
const userSchema = new Schema({
    username: {type: String, unique: true, required: true},
    email: {type:String, unique: true, required:true},
    password: {type: String, required: true},
    sets: [String]
})

userSchema.statics.signup = async function(email, username, password) {
    
    // validation
    if (!email || !password || !username){
        throw Error('All fields must be filled')
    }

    if(!validator.isEmail(email)){
        throw Error('Invalid email')
    }

    if(!validator.isStrongPassword(password)){
        throw Error('Weak password')
    }
    
    const emailExists = await this.findOne({ email })

    if(emailExists) {
        throw Error('Email already in use')
    }

    const usernameExists = await this.findOne({ username })
    if(usernameExists) {
        throw Error('Username already in use')
    }


    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({ email, username, password: hash})

    return user
}

module.exports = mongoose.model('User', userSchema)