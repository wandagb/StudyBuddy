import React from "react";
import "./Flashset.css";
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from "../hooks/useAuthContext";
import { useSetsContext } from "../hooks/useSetsContext";

// Sample Set Card

const FlashSet = ({set, isHomePage}) => {
    const navigate = useNavigate()
    const setName = set.name
    const setID = set._id
    const owner = set.owner
    const { user } = useAuthContext();
    const { dispatch } = useSetsContext();

    function handleClick() {
        navigate(`/set/${setID}`)
    }

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
        <div>
            <div className="set-card" onClick={handleClick}>
                <div className="set__data">
                    <span className="set__name">{setName}</span>
                    <span className="set__name">@{owner}</span>
                </div>
            </div>
            
            {isHomePage && (
                <div className="delete-card">
                    <button onClick={handleDelete}>X</button>
                </div>
            )}
        </div>
    );
}

export default FlashSet