import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useFetch from '../useFetch';
import Card from '../components/flashcard'; 
import FlashcardForm from '../components/FlashcardForm';
import RatingComponent from '../components/ratingComponent';

export const FlashcardSetPage = () => {
    const { setID } = useParams();
    const { data: set, isLoading, error } = useFetch(`/api/set/${setID}`);
    const [openForm, setOpenForm] = useState(false);
    const [flashcards, setFlashcards] = useState([]);
    const [openFeedback, setOpenFeedback] = useState(false);

    useEffect(() => {
        const fetchFlashcards = async () => {
            if (set?.cards) {
                const fetchedFlashcards = await Promise.all(set.cards.map(async (cardID) => {
                    const response = await fetch(`/api/flashcard/${cardID}`);
                    const data = await response.json();
                    return data;
                }));
                setFlashcards(fetchedFlashcards);
            }
        };

        fetchFlashcards();
    }, [set]);

    const handleAddFlashcard = (newFlashcard) => {
        setFlashcards(currentFlashcards => [...currentFlashcards, newFlashcard]);
    };


    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <>       
            <div className='wrapper-main'>
            <div className='section-container'>
                <h1 className="title">{set?.name}</h1>
                    <div className='section-container'>
                    <button className='toggle-button'
                    onClick={() => {
                        setOpenForm(true);
                    }}
                    >
                        ⚙
                    </button>
                    {openForm && <FlashcardForm id={setID} closeForm ={setOpenForm} onAddFlashcard={handleAddFlashcard}/>}
                        <div className='set-container'>
                            {flashcards.map((flashcard) => (
                                <Card key={flashcard._id} frontSide={flashcard.question} backSide={flashcard.answer} />
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
                    {openFeedback && <RatingComponent closeForm ={setOpenFeedback}/>}
                </div>
            </div>
        </>
    );
};