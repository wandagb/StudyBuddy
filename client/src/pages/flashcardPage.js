import React, { useEffect, useState } from 'react'
import "../App.css";
import Card from "../components/flashcard"

export const FlashCardPage = () => {
  // state variable that will contain information from backend api 
  const [flashCardSet, setFlashCardSet] = useState([{}]);

  // Fetching all flashcards in DB
  useEffect(()=> {
    fetch("/api/flashcards").then( // we can use relative route since we defined the proxy in the json file
      response => response.json()
    ).then(
      data => {
        setFlashCardSet(data);
      }
    )
  }, []) // empty array so it only runs on the first render of the component
    

    return (

        <>
        <h1>FlashCard Page</h1>
        <h2>Click on a card to show the other side</h2>

        <div>
            {typeof flashCardSet === 'undefined' ? (
            <p>Loading...</p>
            ) : (
              //Iterating through all of the flashcards in DB
              flashCardSet.map((card, i) => (
                <Card key={i} frontSide={card.question} backSide={card.answer} />
              ))
            )}
                
        </div>
        </>

    );
}