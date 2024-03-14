import React, { useEffect, useState } from 'react';
import { useCardsContext } from '../hooks/useCardsContext';
import { useParams } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import Card from '../components/flashcard'; 
import FlashcardForm from '../components/FlashcardForm';
import { useSetsContext } from '../hooks/useSetsContext';
import Comment from '../components/Comment'

export const FlashcardSetPage = () => {
    const { user } = useAuthContext()
    const { setID } = useParams();
    const [openForm, setOpenForm] = useState(false);
    const {cards, cardDispatch} = useCardsContext()
    const {sets, comments, dispatch } = useSetsContext()
    const [comment, setComment] = useState('')
    
    //submits comments to database and displays it on the page
    const handleSubmit = async (e) => {
        e.preventDefault()

        const newComment = {text: comment}

        const response = await fetch(`/api/items/set/${setID}/comment`, {
            method: 'POST',
            body: JSON.stringify(newComment),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        });

        const postedComment = await response.json()

        if(!response.ok){
        }

        if (response.ok){
            setComment('')
            dispatch({type: 'ADD_COMMENT', payload: postedComment.comments[postedComment.comments.length-1]})
            dispatch({type: 'GET_SETS', payload: postedComment})
        }
    }
    
    //fetches sets everytime data is changed or updated
    useEffect(() => {
        const fetchSet = async () => {
            const response = await fetch(`/api/items/set/${setID}`, {
            })
            const json = await response.json()

            if(response.ok){
                dispatch({type: 'GET_SETS', payload: json})
            }
        }

        const fetchCards = async () => {
            const response = await fetch(`/api/items/flashcard/${setID}`, {
            })
            const json = await response.json()

            if(response.ok){
                cardDispatch({type: 'GET_CARDS', payload: json})
            }
        }
       
        fetchSet()
        fetchCards()
        
        }, [dispatch, cardDispatch, setID, user]);
    return (
        <>       
            <div className='wrapper-main'>
            <div className='section-container'>
                <h1 className="title">{sets?.name}</h1>
                <h2 className="title">@{sets?.owner}</h2>
                    <div className='section-container'>
                    {user?.username === sets?.owner && <button className='toggle-button'
                    onClick={() => {
                        setOpenForm(true);
                    }}
                    >
                        ⚙  
                    </button>}
                    {openForm && <FlashcardForm set_id={setID} closeForm ={setOpenForm}/>}
                        <div className='set-container'>
                            {cards && cards?.map((card) => (
                                <Card key={card._id} card_id = {card._id} frontSide={card.question} backSide={card.answer} closeForm ={openForm}/>
                            ))}
                        </div>
                    </div>
                    {user !== null && <form className="post-comment" onSubmit={handleSubmit}>
                        <div>
                            <h2>Comments:</h2>
                            <textarea 
                            id="comment-message"
                            type="text"
                            onChange={(e) => setComment(e.target.value)}
                            value={comment} 
                            rows="4" required></textarea>
                        </div>
                        <button className='submit-button'>Post Comment</button>
                     </form>}
                </div>
                {comments && comments?.toReversed().map((comment) => (
                    <Comment text={comment.text} poster={comment.poster}/>
                ))}
            </div>
        </>
    );
};