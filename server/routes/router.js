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

    const user = await users.findById(id)
    if(!user) {
        return res.status(404).json({error: 'User not found.'})
    }

    res.status(200).json(user)
});

// Create a user
// Requires: Name, Username and Email
router.post("/api/user", async (req, res) => {
    const {name, username, email} = req.body
    const userData = {name: name, username: username, email: email}

    const newUser = new schemas.users(userData)
    
    const saveUser = await newUser.save()
     
    try{
        const saveUser = await newUser.save()
        res.status(200).json(saveUser)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
});

// Add a flashcard set to a user's library
// Requires: id of Set
router.patch("/api/user/:id/set", async (req, res) => {
    const setID = req.body.id

    const userID = req.params.id
    
    const users = schemas.users

    // Find user and add setID to array
    const update = await users.findOneAndUpdate(
        {_id: userID},
        { $push: {sets: setID}});

    
    if(!update) {
        return res.status(400).json({error: 'User not found'})
    }

    res.status(200).json(update)
});

////////////////////
/* Flashcard APIs */
////////////////////

// Find set with id
router.get("/api/set/:id", async (req, res) => {

    const id = req.params.id

    const flashset = schemas.flashsets

    const set = await flashset.findById(id)
    if(!set) {
        return res.status(404).json({error: 'No such set'})
    }

    res.status(200).json(set)
});

// Get all sets from database
router.get("/api/sets", async (req, res) => {

    const flashset = schemas.flashsets

    const set = await flashset.find()

    if(!set) {
        return res.status(400).json({error: error.message})
    }

    return res.status(200).json(set)
});

// Create an empty flashcard set
// Requires: Name of set
router.post("/api/set", async (req, res) => {
    const {name, userID} = req.body

    const FlashCardData = {name: name, owner: userID}
    const newSet = new schemas.flashsets(FlashCardData)
    
    try{
        const saveSet = await newSet.save()
        res.status(200).json(saveSet)
    } catch (error) {
        if(!name){
            res.status(400).json({error: 'Please fill in all fields'})
        }
        else{
            res.status(400).json({error: error.message})
        }
    }
});

// Add an existing flashcard to an existing set
// Requires: cardID
router.patch("/api/set/:id/flashcard", async (req, res) => {

   // Find specicic set
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: `Set ${id} not found.`})
    }

    const sets = schemas.flashsets

    const { cardID } = req.body;

    // Push to set's array 'card' with new flashcard's id
    const update = await sets.findOneAndUpdate(
        {_id: id},
        { $push: {cards: cardID}},
        {new: true});
    
    if(!update) {

        return res.status(400).json({error: `Could not update`})
    }

    res.status(200).json(update)
});

// Get a flashcard with id
router.get("/api/flashcard/:id", async (req, res) => {
    const flashcards = schemas.flashcards
    const id = req.params.id

    const card = await flashcards.findById(id)

    if(!card) {
        return res.status(400).json({error: 'Flashcard not found.'})
    }

    return res.status(200).json(card)
});


// Create one flashcard
// Requires: Question and Answer
router.post("/api/flashcard", async (req, res) => {
    const {id, question, answer} = req.body

    let emptyFields = []

    if(!question){
        emptyFields.push('question')
    }
    if(!answer){
        emptyFields.push('answer')
    }

    const FlashCardData = {setID: id, question: question, answer: answer}

    const newCard = new schemas.flashcards(FlashCardData)

    try{
        const saveCard = await newCard.save()
        res.status(200).json(saveCard)
    } catch (error) {

        if(emptyFields.length > 0){
            res.status(400).json({error: 'Please fill in all fields', emptyFields})
        }
        else{
            res.status(400).json({error: error.message})
        }
    }
});

module.exports = router