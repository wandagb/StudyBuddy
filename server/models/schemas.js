const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Models of our data

// Users that contain name, email, list of flashcard set IDs that they own
const userSchema = new Schema({
    name: {type:String, required:true},
    username: {type: String, required: true},
    email: {type:String,required:true},
    sets: [String],
    entryDate: {type:Date, default:Date.now}
})

// Sets of flashcards, link to indiviual flashcards
const flashcardSetSchema = new Schema({
    id: {type:Number},
    name: {type:String, required:true},
    cards: [String],
    comments: [String],
    ratings: [Number],
    averageRating: {type: Number},
    owner: {type:String}
})

// Indiviual flashcards
const flashcardSchema = new Schema({
    id: {type:Number},
    set: {type:String},
    question: {type:String, required:true},
    answer: {type:String, required:true}
})

//comments
const flashcardComments = new Schema({
    combinedFeedback: {type:String},
    set: {type:String}
})

// Exporting models
const Users = mongoose.model('users', userSchema)
const Flashcards = mongoose.model('flashcards', flashcardSchema)
const Flashsets = mongoose.model('flashsets', flashcardSetSchema)
const Feedback = mongoose.model('feedback', flashcardComments)
const mySchemas = {'users':Users, 'flashcards':Flashcards, 'flashsets':Flashsets, 'feedback':Feedback}

module.exports = mySchemas