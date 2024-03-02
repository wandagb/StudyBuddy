import React, { useEffect, useState } from 'react'
import "../App.css";
import Card from "../components/flashcard"

export const FlashCardPage = () => {
  // state variable that will contain information from api
  // flashcard is in JSON format
  const [flashCard, setFlashCard] = useState([{}]);

  // Hard coded in ID from database as an example
  const id = "65e2488eedf24d52e5381839";

  // Calling api with ID to find one flashcard
  useEffect(() => {
    
    // Can find list of apis to use under server/routes/router.js
    fetch(`/api/flashcard/${id}`, {
      method: "GET"
    })
    // Saving the response we get from API as a json then storing it in our 'flashCard' variable
      .then((response) => response.json())
      .then((data) => {
        setFlashCard(data);
      })
      .catch((error) => console.log(error));
  }, []);
    
    // Indiviual Flashcards are structed as question and answer
    // Can see structure of our data under server/models/schemas.js
    return (

        <>
        <h1>FlashCard Page</h1>
        <h2>Click on a card to show the other side</h2>

        <div>
          <Card frontSide={flashCard.question} backSide={flashCard.answer} />
                
        </div>
        </>

    );
}