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

    //Add feedback string to db and rating
    router.post("/feedback/:setID", async (req, res) => {
        try{
            const { setID } = req.params;
            const { combinedFeedback, rating } = req.body;
            const flashset = schemas.flashsets;

            const updatedSet = await flashset.findByIdAndUpdate(setID, { 
                $push: { 
                    comments: combinedFeedback,
                    ratings: rating
                }, 
            }, {new: true});



            if (!updatedSet) {
                return res.status(404).json({ error: 'Flashcard set not found' });
            }    

            const averageRating = updatedSet.ratings.reduce((total, num) => total + num, 0) / updatedSet.ratings.length;
            updatedSet.averageRating = averageRating;
            await updatedSet.save();


            res.json(updatedSet);
        } catch(error){
            console.error("Error saving feedback:", error)
            res.status(500).json({ error: 'An error occurred while saving feedback'})
        }
    }); 
// Find the flashset by ID and return its comments
    router.get("/comments/:setID", async (req, res) => {
        try {
            const { setID } = req.params;
            
            const flashset = schemas.flashsets;
            const set = await flashset.findById(setID);
    
            if (!set) {
                return res.status(404).json({ error: 'Flashcard set not found' });
            }

            average = set.averageRating
            average = average.toFixed(2)
    
            res.status(200).json({ comments: set.comments, averageRating: average });
    
        } catch (error) {
            console.error("Error fetching comments:", error);
            res.status(500).json({ error: 'An error occurred while fetching comments' });
        }
    });
    

    module.exports = router