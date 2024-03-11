import React, { useEffect, useState } from 'react';
import { useCardsContext } from '../hooks/useCardsContext';
import { useParams } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import Card from '../components/flashcard'; 
import FlashcardForm from '../components/FlashcardForm';
import { useSetsContext } from '../hooks/useSetsContext';
import RatingComponent from '../components/ratingComponent';

export const FlashcardSetPage = () => {
    const { user } = useAuthContext()
    const { setID } = useParams();
    const [openForm, setOpenForm] = useState(false);
    const {cards, cardDispatch} = useCardsContext()
    const {sets, dispatch } = useSetsContext()
    const {setName, setSetName} = useState()
    const [openFeedback, setOpenFeedback] = useState(false);
    
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
            console.log(setID)
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
                    {user && <button className='toggle-button'
                    onClick={() => {
                        setOpenForm(true);
                    }}
                    >
                        ⚙
                    </button>}
                    {openForm && <FlashcardForm set_id={setID} closeForm ={setOpenForm}/>}
                        <div className='set-container'>
                            {cards && cards.map((card) => (
                                <Card key={card._id} frontSide={card.question} backSide={card.answer} />
                            ))}
                        </div>
                    </div>
                    <button className='toggle-button'
                    onClick={() => {
                        setOpenFeedback(true);
                    }}
                    >
                        +
                    </button>
                    {openFeedback && <RatingComponent closeFeedback ={setOpenFeedback} setID={ setID }/>}
                </div>
            </div>
        </>
    );
};