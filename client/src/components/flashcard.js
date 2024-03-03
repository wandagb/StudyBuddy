import React from "react";
import "./Flashcard.css";

export default function Card(props) {
    const [isFront, changeFace] = React.useState(true);
    function handleClick() {
        changeFace(oldState => !oldState);
    }
    
    const text = isFront ? props.frontSide :props.backSide;
    const sideClass = isFront ? "front" : "back";
    const classList = `flash-card ${sideClass}`;
    return (
        <div className={classList} onClick={handleClick}>
            {text}
        </div>
    );
}
