
import React, { useEffect } from 'react'
import "../App.css";
import { useSetsContext } from '../hooks/useSetsContext.js';
import FlashSet from "../components/Flashset.js"

import { useAuthContext } from '../hooks/useAuthContext.js';

// Home page, see all sets that user owns

export const Home = () => {
    
    const {sets, dispatch} = useSetsContext()

    const { user } = useAuthContext()
  
    // Iterating through user's sets and fetching data 
    // storing in flashSet state
    useEffect(() => {
        const fetchSets = async () => {
            const response = await fetch(`/api/items/user-sets`, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()

            if(response.ok){
                dispatch({type: 'GET_USER_SETS', payload: json})
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
                <h1 className="title"> {user.username}'s home</h1>
                {sets && sets.map((set) => (
                    <FlashSet key={set._id} set={set}/>
                ))}
                </div>
            </div>

        </>

    );
}