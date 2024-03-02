import React from "react";
import "../App.css";

// Sample Set Card

export default function FlashSet(props) {

    function handleClick() {
        //TODO: what happens when you click on a set?
        // Go to that sets page to view all flashcards
        // associacted with the set
    }
    const text = props.name
    const classList = 'flash-set';
    return (
        <div className={classList} onClick={handleClick}>
            {text}
        </div>
    );
}
