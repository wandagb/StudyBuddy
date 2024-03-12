import React from "react";
import "./Flashcard.css";
import { useCardsContext } from '../hooks/useCardsContext';
import { useAuthContext } from "../hooks/useAuthContext";
import {useState} from "react"

export default function Card({ card_id, closeForm, frontSide, backSide }) {
    const [isFlipped, setIsFlipped] = useState(false);

    const { user } = useAuthContext();
    const { cardDispatch } = useCardsContext();

    const handleClick = () => {
        setIsFlipped(!isFlipped);
    }

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
              style={{transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)"}}>
                <div className="flash-card-front">
                    {frontSide}
                    {closeForm && <button onClick={handleDelete}>X</button>}
                </div>
                <div className="flash-card-back">
                    {backSide}
                    {closeForm && <button onClick={handleDelete}>X</button>}
                </div>
            </div>
        </div>
    );
}