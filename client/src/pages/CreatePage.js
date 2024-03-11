import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import "../App.css";
import '../components/styling/submitButton.css';
import '../components/styling/create.css';
import { useSetsContext } from '../hooks/useSetsContext';


// Create form, create a new set
export const SetForm = () => {

    const { user } = useAuthContext()

    const { dispatch } = useSetsContext()

    const [name, setName] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate(); 


    const handleSubmit = async (e) =>{
        e.preventDefault();

        if (!user) {
            setError('You must be logged in')
            return
        }

        const set = { name }

        const response = await fetch('/api/items/set', {
            method: 'POST',
            body: JSON.stringify(set),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        });

        const newSet = await response.json();
        
        if(!response.ok){
            setError(newSet.error); 
        }

        if(response.ok){
            setError(null);
            console.log('New set added!', newSet);
            setName('');
            const id_path = newSet._id
            dispatch({type: 'CREATE_SET', payload: newSet})
            // route to set that was just created
            navigate(`/set/`+id_path);
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