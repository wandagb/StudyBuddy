
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import "../App.css";
import '../components/submitButton.css';
import '../components/create.css';


// Create form, create a new set
export const SetForm = () => {

    // const [flashSet, setFlashSet] = useState([]);
    const [name, setName] = useState('');
    const [error, setError] = useState(null);
    // const navigate = useNavigate(); 


    // Hardcoded UserID from database
    const userID = "65e256f05ca22e1f4b545aa3"

    const handleSubmit = async (e) =>{
        // navigate('/home');

        e.preventDefault();
        
        const set = {name, userID}

        
        //fetch request
        const response = await fetch('/api/set', {
            method: 'POST',
            body: JSON.stringify(set),
            headers: {
                'Content-Type': 'application/json'
            }

        });

        const json = await response.json();

        if(!response.ok){
            setError(json.error); 
        }

        if(response.ok){
            setError(null);
            console.log('New set added!', json);
            setName('');
        }
    }    
    // redirect: reference home.js
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