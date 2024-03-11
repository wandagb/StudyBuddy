// import React, { useState, useEffect } from 'react';
// import { FaStar } from 'react-icons/fa';
// import "../App.css"
// import "../components/ratingPage.css";
// import "../components/submitButton.css"
// import { useAuthContext } from '../hooks/useAuthContext';
// import { useFeedbackContext } from '../hooks/useFeedbackContext';

// export default function RatingComponent({closeFeedback, setID}) {
//     const [rating, setRating] = useState(null);
//     const [hover, setHover] = useState(null);
//     const [comment, setComment] = useState("");
//     const [comments, setComments] = useState([]);
//     const [averageRating, setAverageRating] = useState(null);
//     const { user } = useAuthContext()
//     const { dispatch } = useFeedbackContext()


//     useEffect(() => {
//         fetchComments();
//     }); 

//     const fetchComments = async () => {
//         try {
//             const response = await fetch(`/api/items/comment`, {
//                 method: 'GET',
//                 headers: {
//                     'Authorization': `Bearer ${user.token}`
//                 }
//             });
//             if (!response.ok) {
//                 throw new Error('Failed to fetch comments');
//             }
//             const data = await response.json();
//             setComments(data.comments);
//             setAverageRating(data.averageRating);
//             dispatch({type: 'GET_COMMENTS', payload: data.comments});
//             dispatch({type: 'GET_AVERAGE', payload: data.averageRating});
//         } catch (error) {
//             console.error('Error fetching comments:', error);
//         }
//     };



//     const onChangeHandler = (e) => {
//         setComment(e.target.value)
//     };
//     const onClickHandler = async () => {
//         if (!user) {
//             alert('You must be logged in')
//             return
//         }
//         if (rating === null) {
//             alert("Please select a rating before submitting.");
//             return;
//         }

//         const combinedFeedback = "Rating: " + rating + " stars\nComment: " + comment;

//         try {
//             const response = await fetch(`/api/items/feedback/${setID}`, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': `Bearer ${user.token}`
//                 },
//                 body: JSON.stringify({ combinedFeedback, rating }),
//             });

//             if (!response.ok) {
//                 throw new Error('Failed to submit feedback');
//             }

//             alert('Feedback submitted successfully');
//             setComment("");
//             setRating(null);
//             //dispatch({type: 'CREATE_COMMENT', payload: combinedFeedback})
//             fetchComments();
//         } catch (error) {
//             console.error('Error submitting feedback:', error);
//             alert('Failed to submit feedback. Please try again.');
//         }
//     };
//     return (
//         <div className="star-rating-container">
//             <button className="toggle-button" onClick ={() => closeFeedback(false)}>X</button>
//             <h1 className='title'>Leave some Feedback!</h1>
//             <h3>Average Rating: <pre>{ averageRating }</pre></h3>
//             <div className="star-array">
//             {[...Array(5)].map((star, index) => {
//                 const currentRating = index + 1;
//                 return(
//                     <label>
//                         <input 
//                         type="radio" 
//                         name="rating" 
//                         value={currentRating}
//                         onClick={() => setRating(currentRating)}
//                         />
//                         <FaStar 
//                             className='star' 
//                             size={40}
//                             color={currentRating <= (hover || rating) ? "#FFD100" : "#2774AE"}
//                             onMouseEnter={() => setHover(currentRating)}
//                             onMouseLeave={() => setHover(null)}
//                         />
//                     </label>
//                 );
//             })}
            
//             </div>
            
//             <textarea value={comment} onChange={onChangeHandler} placeholder="Enter your comment here..."className='comment-box'/>
            
//             <button className="submit-button" onClick={onClickHandler}>Submit</button>
//             <h1>Comments for this set:</h1>
//             <div className="comment-arr">
//             {comments.map((comment) => (
//                 <div className='show-comments'><pre>{comment}</pre></div>
//             ))}
//             </div>
//             </div>
            
//     )
// }