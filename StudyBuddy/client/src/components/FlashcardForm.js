import { useState } from 'react'
import { useAuthContext } from '../hooks/useAuthContext';
import { useCardsContext } from '../hooks/useCardsContext';
import '../components/styling/submitButton.css';
import '../components/styling/create.css';

// Form that handles adding a flashcard given set ID Component

const FlashcardForm = ({ set_id, closeForm}) => {
    const [question, setQuestion] = useState('')
    const [answer, setAnswer] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])
    const { user } = useAuthContext()
    const { cardDispatch } = useCardsContext()

    const handleSubmit = async (e) => {
        e.preventDefault()

        const flashcard = {set_id, question, answer}

        //send a new flashcard to the database
        const response = await fetch(`/api/items/flashcard`, {
            method: 'POST',
            body: JSON.stringify(flashcard),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        });

        const newFlashcard = await response.json()

        if(!response.ok){
            setError(newFlashcard.error)
            setEmptyFields(newFlashcard.emptyFields)
        }

        //resets the form after a successful submission
        if (response.ok){
            setAnswer('')
            setQuestion('')
            setError(null)
            setEmptyFields([])
            cardDispatch({type: 'CREATE_CARD', payload: newFlashcard})
        }
    }
    return ( 
        <div className='create-container'>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
        <button className="toggle-button" onClick ={() => closeForm(false)}><i className="fa fa-close"></i></button>
        <form className="Create" onSubmit={handleSubmit}>
        
            <h3>Add flashcard</h3>

            <label>Question:</label>
            <input
                type="text"
                onChange={(e) => setQuestion(e.target.value)}
                value={question}
                className={emptyFields.includes('question') ? `error_textbox` : 'search-box'}
                />

            <label>Answer:</label>
            <input
                type="text"
                onChange={(e) => setAnswer(e.target.value)}
                value={answer}
                className={emptyFields.includes('answer') ? `error_textbox` : 'search-box'}
                />
            <button className='submit-button'>Add Flashcard</button>
            {error && <div className="error"> {error} </div>}
        </form>
        </div>
    )
}

export default FlashcardForm