
import React, { useEffect, useState } from 'react'
import { useAuthContext } from '../hooks/useAuthContext.js';
import { useSetsContext } from '../hooks/useSetsContext.js';
import "../App.css";
import FlashSet from "../components/Flashset.js"

export const ExplorePage = () => {

    const {sets, dispatch} = useSetsContext()

    const { user } = useAuthContext()

    useEffect(() => {
        const fetchSets = async () => {
            const response = await fetch(`/api/items/sets`, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()

            if(response.ok){
                dispatch({type: 'GET_SETS', payload: json})
            }
        }
        if (user){
            fetchSets()
        }
        
        }, [dispatch, user]);
    return (
        <>
        <div className='wrapper-main'>
            <div className='section-container'>
                <h1 className="title">Explore</h1>
                    <div className='section-container'>
                        <div className='card-container'>
                            <div className="set-container">
                            {sets && sets.map((set) => (
                                    <FlashSet key={set._id} set={set}/>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>  
            </div>
        </>
    );
}