const express = require('express')
const router = express.Router()
const schemas = require('../models/schemas')
const app = express
var mongoose = require('mongoose');
// APIs that our frontend can call

///////////////
/* User APIS */
///////////////

// Get a user using ID
router.get("/api/user/:id", async (req, res) => {

    const id = req.params.id

    const users = schemas.users

    try{
        const user = await users.findById(id)

        res.send(user)

    } catch (error) {
        console.log(err)
    }
});

// Create a user
// Requires: Name, Username and Email
router.post("/api/user", async (req, res) => {
    const {name, username, email} = req.body
    const userData = {name: name, username: username, email: email}

    const newUser = new schemas.users(userData)
    
    const saveUser = await newUser.save()

    if(saveUser){
    res.send('Added')
    } else {
        res.end('Failed to create user.')
    }

    res.end()
});

// Add a flashcard set to a user's library
// Requires: id of Set
router.put("/api/user/:id/set", async (req, res) => {
    const setID = req.body.id


    const userID = req.params.id
    
    const users = schemas.users

    // Find user and add setID to array
    const update = await users.findOneAndUpdate(
        {_id: userID},
        { $push: {sets: setID}});

    if(update){
        res.send('Added set to user liibrary.')
    } else {
        res.end('Failed to add.')
    }
    res.end()
});

////////////////////
/* Flashcard APIs */
////////////////////

// Find set with id
router.get("/api/set/:id", async (req, res) => {

    const id = req.params.id

    const flashset = schemas.flashsets

    try{
        const set = await flashset.findById(id)

        res.send(set)

    } catch (error) {
        console.log(err)
    }
});

// Create an empty flashcard set
// Requires: Name of set
router.post("/api/set", async (req, res) => {
    const {name} = req.body
    const FlashCardData = {name: name}

    const newSet = new schemas.flashsets(FlashCardData)
    
    const saveSet = await newSet.save()

    if(saveSet){
        res.send('Created flashcard set.')
    } else {
        res.end('Failed to create.')
    }
    res.end()
});

// Add a flashcard to an existing set
// Requires: body of an indiviual flashcard ( question and answer )
router.put("/api/set/:id/flashcard", async (req, res) => {
    const {question, answer} = req.body
    const FlashCardData = {question: question, answer: answer}

    // Add flashcard to database
    const newFlashcard = new schemas.flashcards(FlashCardData)
    const createdCard = await newFlashcard.save()
    const cardID = createdCard._id

   // Find specicic set
    const { id } = req.params;
    const sets = schemas.flashsets

    // Push to set's array 'card' with new flashcard's id
    const update = await sets.findOneAndUpdate(
        {_id: id},
        { $push: {cards: cardID}});
    
    if(createdCard && update){
        res.send('Added flashcard to set.')
    } else {
        res.end('Failed to add.')
    }
    res.end()
});

// Get a flashcard with id
router.get("/api/flashcard/:id", async (req, res) => {
    const flashcards = schemas.flashcards
    const id = req.params.id
    try{
        const card = await flashcards.findById(id)

        res.send(card)

    } catch (error) {
        console.log(err)
    }

});


// Create one flashcard
// Requires: Question and Answer
router.post("/api/flashcard", async (req, res) => {
    const {id, question, answer} = req.body
    const FlashCardData = {setID: id, question: question, answer: answer}

    const newCard = new schemas.flashcards(FlashCardData)
    
    const saveCard = await newCard.save()

    if(saveCard){
    res.send('Created flashcard.')
    } else {
        res.end('Failed to create.')
    }
    res.end()
});

module.exports = router