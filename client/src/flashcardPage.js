import React, { useEffect, useState } from 'react'
import "./App.css";
import Card from "./components/flashcard"

export const FlashCardPage = () => {
  // state variable that will contain information from backend api 
  const [backendData, setBackendData] = useState([{}]);

  useEffect(()=> {
    fetch("/api").then( // we can use relative route since we defined the proxy in the json file
      response => response.json()
    ).then(
      data => {
        setBackendData(data);
      }
    )
  }, []) // empty array so it only runs on the first render of the component
    

    return (

        <>
        <h1>FlashCard Page</h1>
        <h2>Click on a card to show the other side</h2>

        <div>
            {typeof backendData.users === 'undefined' ? (
            // if backendData.users is undefined meaning we haven't gotten the users or the API is being fetched
            <p>Loading...</p>
            ) : (
            backendData.users.map((flashCardBack, i) => (
                <Card key={i} frontSide="flashCardFront" backSide={flashCardBack} />
            ))
            )}
        </div>
        </>

    );
}