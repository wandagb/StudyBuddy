const mongoose = require('mongoose')
const Schema = mongoose.Schema

//Models of our data

const userSchema = new Schema({
    name: {type:String, required:true},
    email: {type:String,required:true},
    sets: [Number],
    entryDate: {type:Date, default:Date.now}
})

const flashcardSchema = new Schema({
    id: {type:Number},
    name: {type:String, required:true},
    question: {type:String, required:true},
    answer: {type:String, required:true}
})

//Setting up in order to call

const Users = mongoose.model('users', userSchema)
const Flashcards = mongoose.model('flashcards', flashcardSchema)
const mySchemas = {'users':Users, 'flashcards':Flashcards}

module.exports = mySchemas