import React, { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa';
import "../App.css"
import "../components/ratingPage.css";
import "../components/submitButton.css"
import RateBar from '../components/RateBar';
import RatingComponent from '../components/ratingComponent';

export const RatingPage = () => {
    const [rating, setRating] = useState(null);
    const [hover, setHover] = useState(null);
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);
    const [flashcardSetName, setFlashcardSetName] = useState("");
    const [openFeedback, setOpenFeedback] = useState(false)

    useEffect(() => {
        fetchComments();
    }, []);

    const fetchComments = async () => {
        try {
            const response = await fetch('/api/comments');
            if (!response.ok) {
                throw new Error('Failed to fetch comments');
            }
            const data = await response.json();
            setComments(data.comments);
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    };


    const onChangeHandler = (e) => {
        setComment(e.target.value)
    };
    const onClickHandler = async () => {
        if (!flashcardSetName){
            alert("Must select flashcard set to comment");
            return;
        }
        if (rating === null) {
            alert("Please select a rating before submitting.");
            return;
        }

        const combinedFeedback = "Set Name: " + flashcardSetName + "\nRating: " + rating + " stars\nComment: " + comment;

        try {
            const response = await fetch('/api/feedback', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ combinedFeedback }),
            });

            if (!response.ok) {
                throw new Error('Failed to submit feedback');
            }

            alert('Feedback submitted successfully');
            setComment("");
            setRating(null);
            setComments([...comments, combinedFeedback])
        } catch (error) {
            console.error('Error submitting feedback:', error);
            alert('Failed to submit feedback. Please try again.');
        }
    };
    return (
        <div className="star-rating-container">
            <h1 className='title'>Leave some Feedback!</h1>
            <RateBar onSelect={(setName) => setFlashcardSetName(setName)} />
            <div className="star-array">
            {[...Array(5)].map((star, index) => {
                const currentRating = index + 1;
                return(
                    <label>
                        <input 
                        type="radio" 
                        name="rating" 
                        value={currentRating}
                        onClick={() => setRating(currentRating)}
                        />
                        <FaStar 
                            className='star' 
                            size={40}
                            color={currentRating <= (hover || rating) ? "#FFD100" : "#2774AE"}
                            onMouseEnter={() => setHover(currentRating)}
                            onMouseLeave={() => setHover(null)}
                        />
                    </label>
                );
            })}
            
            </div>
            
            <textarea value={comment} onChange={onChangeHandler} placeholder="Enter your comment here..."className='comment-box'/>
            
            <h1>Your rating is {rating}</h1>
            <button onClick={onClickHandler} className="submit-button">Submit</button>
            <div className="comment-arr">
            {comments.map((comment) => (
                <div className='show-comments'><pre>{comment.combinedFeedback}</pre></div>
            ))}
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
    )
}