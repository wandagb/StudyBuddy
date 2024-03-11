import React, { useState } from "react";
import "./Flashcard.css";

export default function Card({ frontSide, backSide }) {
    const [isFlipped, setIsFlipped] = useState(false);

    function handleClick() {
        setIsFlipped(!isFlipped);
    }

    return (
        <div className="flash-card-container" onClick={handleClick}>
            <div 
              className="flash-card" 
              style={{transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)"}}>
                <div className="flash-card-front">
                    {frontSide}
                </div>
                <div className="flash-card-back">
                    {backSide}
                </div>
            </div>
        </div>
    );
}
