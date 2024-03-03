import React from "react";
import "./Flashset.css";
import { useNavigate } from 'react-router-dom'

// Sample Set Card

export default function FlashSet(props) {
    const navigate = useNavigate()
    const setName = props.name
    const setID = props.setID

    function handleClick() {
        navigate(`/set/${setID}`)
    }

    return (
            <div className="set-card" onClick={handleClick}>
                <div class="set__data">
                    <span class="set__name">{setName}</span>

                </div>
            </div>
    );
}
