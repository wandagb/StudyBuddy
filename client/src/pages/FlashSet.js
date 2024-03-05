import { useParams } from 'react-router-dom';
import FlashcardForm from '../components/FlashcardForm';
import useFetch from '../useFetch'
import "../App.css";
import "../components/Flashset"
import { useState } from 'react';

export const FlashcardSetPage = () => {

    const [openForm, setOpenForm] = useState(false);

    // Get parameter from URL 
    const { setID } = useParams();

    const { data: set } = useFetch(`/api/set/${setID}`)

    // TO DO: loop through set's flashcard IDs and fetch their data
    // ( similar to way done to fetch a user's sets in Home.js )
    // then we can render it using the Flashcard component instead

    return (
        <>       
            <div className='wrapper-main'>
            <div className='section-container'>
                <h1 className="title">{set.name}</h1>
                    <button className='toggle-button'
                    onClick={() => {
                        setOpenForm(true);
                    }}
                    >
                        ⚙
                    </button>
                    {openForm && <FlashcardForm id={setID} closeForm ={setOpenForm} />}
                <div className='section-container'>
                    <div className='set-container'>
                        Flashcards go here
                    </div>
                </div>
            </div>
                
        </div>
        
        </>

    );
}