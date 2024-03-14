import React from "react";
import "./styling/Flashset.css";
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from "../hooks/useAuthContext";
import { useSetsContext } from "../hooks/useSetsContext";

// Set of Flashcards Component

const FlashSet = ({set, isHomePage}) => {
    const navigate = useNavigate()
    const setName = set.name
    const setID = set._id
    const owner = set.owner
    const { user } = useAuthContext();
    const { dispatch } = useSetsContext();

    //Redirect to the set page
    function handleClick() {
        navigate(`/set/${setID}`)
    }

    //Deletes the cards in the set and the set itself
    const handleDelete = async () => {
        console.log(set._id)

        const response = await fetch(`/api/items/set/${set._id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            },
        });

        if (response.ok) {
            const json = await response.json();
            console.log(json)
            dispatch({type: 'DELETE_SET', payload: json});
            console.log(json)
        }

    };

    return (
        <div className="flashset-container">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
            <div className="set-card" onClick={handleClick}>
                <div className="set__data">
                    <span className="set__name">{setName}</span>
                    <span className="set__name">@{owner}</span>
                </div>
                
                {isHomePage && (
                    <div className="delete-card" onClick={(e) => {
                        e.stopPropagation();
                        handleDelete();
                    }}>
                     <div className="delete-set-button">
                        <button className="delete-set-button"><i className="fa fa-close"></i></button>
                         </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default FlashSet