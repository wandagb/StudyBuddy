import React from "react";
import "./Flashcard.css";
import { useCardsContext } from '../hooks/useCardsContext';
import { useAuthContext } from "../hooks/useAuthContext";
import { FlashcardSetPage } from "../pages/FlashSet"; 

export default function Card(props) {
    const [isFront, changeFace] = React.useState(true);

    const { card_id } = props.card_id

    const { cardDispatch} = useCardsContext();

    function handleClick() {
        changeFace(oldState => !oldState); }

    const handleDelete = async () => {

        console.log(props.card_id)

        const response = await fetch('/api/items/flashcard' + card_id, {
            method: 'DELETE'
        });

        const json = await response.json()
        
        if (response.ok){
            cardDispatch({type: 'DELETE_CARD', payload: json})
            }
     }

     const text = isFront ? props.frontSide :props.backSide;
     const sideClass = isFront ? "front" : "back";
     const classList = `flash-card ${sideClass}`;
    
    return (
        <div className={classList} onClick={handleClick}>
            {text}
            <button onClick={handleDelete}>X</button>
        </div>
    );
}
