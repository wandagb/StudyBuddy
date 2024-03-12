
import React, { useEffect } from 'react'
import { useSetsContext } from '../hooks/useSetsContext.js';
import "../App.css";
import FlashSet from "../components/Flashset.js"

export const ExplorePage = () => {
    const {sets, dispatch} = useSetsContext()

    useEffect(() => {
        const fetchSets = async () => {
            const response = await fetch(`/api/items/sets`, {
            })
            const json = await response.json()

            if(response.ok){
                dispatch({type: 'GET_SETS', payload: json})
            }
        }
        fetchSets()
        
        }, [dispatch]);
    return (
        <>
        <div className='wrapper-main'>
            <div className='section-container'>
                <h1 className="title">Explore</h1>
                    <div className='section-container'>
                        <div className='card-container'>
                            <div className="set-container">
                            {sets && sets.map((set) => (
                                    <FlashSet key={set._id} set={set} isHomePage={false}/>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>  
            </div>
        </>
    );
}