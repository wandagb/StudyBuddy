const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

// Users that contain name, email, list of flashcard set IDs that they own
const userSchema = new Schema({
    username: {type: String, unique: true, required: true},
    email: {type:String, unique: true, required:true},
    password: {type: String, required: true},
})

userSchema.statics.signup = async function(email, username, password) {
    
    // validation
    if (!email || !password || !username){
        throw Error('All fields must be filled')
    }

    if(!validator.isEmail(email)){
        throw Error('Invalid email')
    }

    if(username.length <= 3){
        throw Error('Username must be longer than 3 characters')
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

userSchema.statics.login = async function(username, password){
    if(!username ||! password) {
        throw Error('All fields must be filled')
    }
        const user = await this.findOne({username})

        if (!user){
            throw Error('Username not found.')
        }

        const match = await bcrypt.compare(password, user.password)

        if (!match) {
            throw Error ('Incorrect password')
        }

        return user
    }

module.exports = mongoose.model('User', userSchema)