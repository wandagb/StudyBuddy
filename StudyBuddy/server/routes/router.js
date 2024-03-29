const express = require('express')
const router = express.Router()
const schemas = require('../models/schemas')
const app = express()
var mongoose = require('mongoose');
const requireAuth = require('../middleware/requireAuth');

////////////////////
/* Flashcard APIs */
////////////////////

// Get all sets from database
router.get("/sets", async (req, res) => {

    const flashset = schemas.flashsets
    const set = await flashset.find()

    if(!set) {
        return res.status(400).json({error: error.message})
    }

    return res.status(200).json(set)
});

// Get flashcard from a set
router.get("/flashcard/:id", async (req, res) => {

    const flashcards = schemas.flashcards
    const set_id = req.params.id
    const card = await flashcards.find({set_id: set_id})

    if(!card) {
        return res.status(400).json({error: 'Flashcard not found.'})
    }

    return res.status(200).json(card)
});

// Find set with id
router.get("/set/:id", async (req, res) => {

        const id = req.params.id
        const flashset = schemas.flashsets
        const set = await flashset.findById(id)

        if(!set) {
            return res.status(404).json({error: 'No such set'})
        }

        res.status(200).json(set)
    });

//Below are routes that are secured ( require authentication )
router.use(requireAuth)

// Find user's sets only
router.get("/user-sets", async (req, res) => {

    const user_id = req.username.username
    const flashset = schemas.flashsets

    const sets = await flashset.find({owner: user_id})
    if(!sets) {
        return res.status(404).json({error: 'No sets found'})
    }

    res.status(200).json(sets)
});

// Create an empty flashcard set
// Requires: Name of set
router.post("/set", async (req, res) => {

    const {name} = req.body
    const user_id = req.username.username

    const FlashCardData = {name: name, owner: user_id}
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

// Create one flashcard
// Requires: Question and Answer
router.post("/flashcard", async (req, res) => {
    const {set_id, question, answer} = req.body

        let emptyFields = []

        if(!question){
            emptyFields.push('question')
        }
        if(!answer){
            emptyFields.push('answer')
        }

    const FlashCardData = {set_id: set_id, question: question, answer: answer}

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

//Delete flashcard from set
router.delete('/flashcard/:id', async (req, res) => {
    // Find specific card
    const { id } = req.params;
    const flashcards = schemas.flashcards;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: `Card ${id} not found.` });
    }

    try {
        const deleteCard = await flashcards.findOneAndDelete({ _id: id });

        if (!deleteCard) {
            return res.status(400).json({ error: `Could not delete card.` });
        }

        res.status(200).json(deleteCard);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//Delete flashcard set from user's sets
router.delete('/set/:id', async (req, res) => {
    // Find specific set
    const { id } = req.params;
    const flashsets = schemas.flashsets;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: `Set ${id} not found.` });
    }

    try {
        const deleteSet = await flashsets.findOneAndDelete({ _id: id });

        if (!deleteSet) {
            return res.status(400).json({ error: `Could not delete set.` });
        }

        res.status(200).json(deleteSet);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//Add comment to set
router.post("/set/:setID/comment", async (req, res) => {
    //Need set id to comment on
    const { setID } = req.params;
    const { text } = req.body;
    const flashset = schemas.flashsets;
    if(!text){
        return res.status(400).json({error: 'Please fill in all fields'})
    }
    const updatedSet = await flashset.findOneAndUpdate(
        {_id: setID},
        { $push: {comments: {text: text, poster: req.username.username}}},
        {new: true});

    if (!updatedSet) {
        return res.status(404).json({ error: 'Flashcard set not found' });
    }    
    res.status(200).json(updatedSet)
});

module.exports = router