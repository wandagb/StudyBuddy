const express = require('express')
const router = express.Router()
const schemas = require('../models/schemas')
const app = express

// APIs that our frontend can call

router.get("/api/users", async (req, res) => {
    const users = schemas.users
    
    users.find()
    .then(users => res.json(users))
    .catch(err => res.json(err))

})

router.post("/api/users", async (req, res) => {
    const {name, email} = req.body
    const userData = {name: name, email: email}

    const newUser = new schemas.users(userData)
    
    const saveUser = await newUser.save()

    if(saveUser){
    res.send('Added')
    } else {
        res.end('Failed to create user.')
    }

    res.end()
})

// Find all flashcards in database
router.get("/api/flashcards", async (req, res) => {
    const flashcards = schemas.flashcards
    
    flashcards.find()
    .then(flashcards => res.json(flashcards))
    .catch(err => res.json(err))

});

// Find set with id
router.get("/api/flashcards/:id", async (req, res) => {

    const id = req.params.id

    const flashcards = schemas.flashcards

    try{
        const set = await flashcards.findById(id)
        res.send(set)

    } catch (error) {
        console.log(err)
    }
});

// Create flashcard given name, question, and answer
router.post("/api/flashcard", async (req, res) => {
    const {name, question, answer} = req.body
    const FlashCardData = {name: name, question: question, answer: answer}

    const newSet = new schemas.flashcards(FlashCardData)
    
    const saveSet = await newSet.save()

    if(saveSet){
    res.send('Created flashcard set.')
    } else {
        res.end('Failed to create.')
    }

    res.end()

})

module.exports = router