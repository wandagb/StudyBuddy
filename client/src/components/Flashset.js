import React from "react";
import "./Flashset.css";
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from "../hooks/useAuthContext";
import { useSetsContext } from "../hooks/useSetsContext";

// Sample Set Card

const FlashSet = ({set}) => {
    const navigate = useNavigate()
    const setName = set.name
    const setID = set._id
    const owner = set.owner
    const { user } = useAuthContext();
    const { dispatch } = useSetsContext();

    function handleClick() {
        navigate(`/set/${setID}`)
    }

    const handleDelete = async (setID) => {
        console.log(setID)

        const response = await fetch('/api/items/set/' + setID, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            },
        });

        if (response.ok) {
            const json = await response.json();
            dispatch({type: 'DELETE_SET', payload: json});
        }
    };

    return (
            <div className="set-card" onClick={handleClick}>
                <div className="set__data">
                    <span className="set__name">{setName}</span>
                    <span className="set__name">@{owner}</span>
                </div>
                <button onClick={handleDelete}>X</button>
            </div>
    );
}

export default FlashSet