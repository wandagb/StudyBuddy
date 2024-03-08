const mongoose = require('mongoose')

const Schema = mongoose.Schema

// Users that contain name, email, list of flashcard set IDs that they own
const userSchema = new Schema({
    name: {type:String, required:true},
    username: {type: String, unique: true, required: true},
    email: {type:String, unique: true, required:true},
    password: {type: String, required: true},
    sets: [String],
    entryDate: {type:Date, default:Date.now}
})

module.exports = mongoose.model('User', userSchema)