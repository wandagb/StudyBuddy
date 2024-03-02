
import React, { useEffect, useState } from 'react'
import "../App.css";
import useFetch from '../useFetch';
import FlashSet from "../components/flash-set.js"

// Home page, see all sets that user owns

export const Home = () => {
    
    const [flashSet, setFlashSet] = useState([]);
    // Hardcoded UserID from database
    // TODO: figure out how to keep track of user logged in 
    const userID = "65e256f05ca22e1f4b545aa3"
  
    //Using useFetch.js to generalize code
    const { data: user } = useFetch(`/api/user/${userID}`)

    const sets = user.sets
    
    // Iterating through user's sets and fetching data 
    // storing in flashSet state
    useEffect(() => {
        if (sets) {
            Promise.all(sets.map((item) => fetch(`/api/set/${item}`)))
                .then((res) => Promise.all(res.map(r => r.json())))
                .then(results => {setFlashSet(results)})
                .catch((error) => console.log(error));
        }
        }, [sets]);

    //Iterates through flashSet and puts into list blocks
    const listSets = flashSet.map(set =>
        <FlashSet key={set._id} name={set.name} />
        );
  
    return (
        <>
            <h1>{user.name}'s home</h1>
            
            <div>
                Saved Sets:
                {listSets}
            </div>

        </>

    );
}