
import React, { useEffect, useState } from 'react'
import "../App.css";
import useFetch from '../useFetch';
import FlashSet from "../components/Flashset.js"

export const ExplorePage = () => {
    
    const { data: sets } = useFetch(`/api/sets`)

    //Iterates through flashSet and puts into list blocks
    const listSets = sets.map(set =>
        <FlashSet key={set._id} name={set.name} setID={set._id} />
        );
    
    return (
        <>
        <div className='wrapper-main'>
            <div className='section-container'>
                <h1 className="title">Explore</h1>
                    <div className='section-container'>
                        <div className='card-container'>
                            <div className="set-container">
                                {listSets}
                            </div>
                        </div>
                    </div>
                </div>  
            </div>
        </>
    );
}