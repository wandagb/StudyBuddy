import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import "../App.css";
import '../components/submitButton.css';
import '../components/create.css';


// Create form, create a new set
export const SetForm = () => {
    // TODO: Don't allow duplicate sets for same user

    // const [flashSet, setFlashSet] = useState([]);
    const [name, setName] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate(); 


    // Hardcoded UserID from database
    const userID = "65e256f05ca22e1f4b545aa3"

    const handleSubmit = async (e) =>{

        e.preventDefault();
        
        const set = {name, userID}

        const createSetResponse = await fetch('/api/set', {
            method: 'POST',
            body: JSON.stringify(set),
            headers: {
                'Content-Type': 'application/json'
            }

        });

        const json = await createSetResponse.json();

        if(!createSetResponse.ok){
            setError(json.error); 
        }

        if(createSetResponse.ok){
            setError(null);
            console.log('New set added!', json);
            setName('');
            const id_path = json._id.toString();
            
            //add this setID to the users sets
            const setUserResponse = await fetch(`/api/user/${userID}/set`, {
                method: 'PATCH',
                body: JSON.stringify({id: id_path}),
                headers: {
                    'Content-Type': 'application/json'
                }    
            });

            const addedSetJson = await setUserResponse.json();
            if(!setUserResponse.ok){
                console.log("Error adding set to user");
            }
            if(setUserResponse.ok){
                console.log('Added set to user')
            }

            // route to set that was just created
            navigate('/set/' + id_path);
        }
    }    
    return (
        <>
        <div className='wrapper-main'>
            <div className='create-container'>
                <h1>Create</h1>
                    <form className='Create' onSubmit={handleSubmit}>
                        <h3> Name your set</h3>

                        <label>Set name:</label>
                        <input className = 'search-box'
                            type='text'
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                        />
                        <button className='submit-button'> submit </button>
                        {error && <div className="error">{error}</div>}

                    </form>

            </div>

        </div>

        </>

    );
}