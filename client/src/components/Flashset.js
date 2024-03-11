import React from "react";
import "./styling/Flashset.css";
import { useNavigate } from 'react-router-dom'

// Sample Set Card

const FlashSet = ({set}) => {
    const navigate = useNavigate()
    const setName = set.name
    const setID = set._id
    const owner = set.owner

    function handleClick() {
        navigate(`/set/${setID}`)
    }

    return (
            <div className="set-card" onClick={handleClick}>
                <div className="set__data">
                    <span className="set__name">{setName}</span>
                    <span className="set__name">@{owner}</span>
                </div>
            </div>
    );
}

export default FlashSet