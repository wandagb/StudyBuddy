const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Models of our data

// Users that contain name, email, list of flashcard set IDs that they own
const userSchema = new Schema({
    name: {type:String, required:true},
    username: {type: String, required: true},
    email: {type:String, required:true, unique:true},
    password: {type: String, required: true},
    sets: [String],
    entryDate: {type:Date, default:Date.now}
})

// static signup method
userSchema.statics.signup = async function(email, password) {
    // validation
    if(!email||!password) {
        throw Error('All fields must be filled')
    }

    if(!validator.isEmail(email)){
        throw Error('Email is not valid')
    }
    if (!validator.isStrongPassword(password)){
        throw Error('Password not strong enough')
    }

    const exists = await this.findOne( {email})

    if (exists) {
        throw Error('Email already in use')
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    const user = await this.create({email, password: hash})

    return user
}

userSchema.statics.login = async function(email, password){
    if(!email||!password) {
        throw Error('All fields must be filled')
    }
        const user = await this.findOne({email})

        if (!user){
            throw Error('Incorrect email')
        }

        const match = await bcrypt.compare(password, user.password)

        if (!match) {
            throw Error ('Incorrect password')
        }

        return user
    }

module.exports = mongoose.model('User', userSchema)

// Sets of flashcards, link to indiviual flashcards
const flashcardSetSchema = new Schema({
    name: {type:String, required:true},
    cards: [String],
    owner: {type:String}
})

// Indiviual flashcards
const flashcardSchema = new Schema({
    set_id: {type:String},
    question: {type:String, required:true},
    answer: {type:String, required:true}
})

// Exporting models
const Flashcards = mongoose.model('flashcards', flashcardSchema)
const Flashsets = mongoose.model('flashsets', flashcardSetSchema)
const mySchemas = {'flashcards':Flashcards, 'flashsets':Flashsets}

module.exports = mySchemas