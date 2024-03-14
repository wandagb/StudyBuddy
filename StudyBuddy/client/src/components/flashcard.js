import React from "react";
import "./styling/Flashcard.css";
import { useCardsContext } from '../hooks/useCardsContext';
import { useAuthContext } from "../hooks/useAuthContext";
import {useState} from "react"

//Flashcard component

export default function Card({ card_id, closeForm, frontSide, backSide }) {
    const [isFlipped, setIsFlipped] = useState(false);

    const { user } = useAuthContext();
    const { cardDispatch } = useCardsContext();

    //flip card to reveal contents
    const handleClick = () => {
        setIsFlipped(!isFlipped);
    }

    //delete flashcard from set by grabbing card id
    const handleDelete = async (e) => {

        const response = await fetch('/api/items/flashcard/' + card_id, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            },
        });

        if (response.ok) {
            const json = await response.json();
            cardDispatch({type: 'DELETE_CARD', payload: json});
        }
    };

    return (
        <div className="flash-card-container" onClick={handleClick}>
            <div 
              className="flash-card" 
              
              //Flipping animation when the card is clicked
              style={{transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)"}}>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
                <div className="flash-card-front">
                    {frontSide}
                    <div className="delete-card-button">
                    {closeForm && <button className="delete-card-button" onClick={handleDelete}><i className="fa fa-close"></i></button>}
                    </div>
                </div>
                <div className="flash-card-back">
                    {backSide}
                    <div className="delete-card-button">
                    {closeForm && <button className="delete-card-button" Click={handleDelete}><i className="fa fa-close"></i></button>}
                    </div>
                </div>
            </div>
        </div>
    );
}