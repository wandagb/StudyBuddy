const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Models of our data

// Sets of flashcards, link to indiviual flashcards
const flashcardSetSchema = new Schema({
    name: {type:String, required:true},
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