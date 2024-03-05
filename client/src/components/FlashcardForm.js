import { useState } from 'react'
import '../components/submitButton.css';
import '../components/create.css';

const FlashcardForm = (id) => {
    const [question, setQuestion] = useState('')
    const [answer, setAnswer] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()

        const flashcard = {question, answer}

        const response = await fetch(`/api/flashcard`, {
            method: 'POST',
            body: JSON.stringify(flashcard),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const newFlashcard = await response.json()

        if(!response.ok){
            setError(newFlashcard.error)
            setEmptyFields(newFlashcard.emptyFields)
        }

        if (response.ok){

            const response = await fetch(`/api/set/${id.id}/flashcard`, {
                method: 'PATCH',
                body: JSON.stringify({cardID: newFlashcard._id}),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            setAnswer('')
            setQuestion('')
            setError(null)
            setEmptyFields([])
        }
    }

    return ( 
        <div className='create-container'>
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