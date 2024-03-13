import "../App.css"
import "./styling/Comment.css"

export default function Comment({ text, poster }) {

    return (
    <>
        <div className="comment">
                <div className="comment-data">
                <div className="comment-poster">👤{poster}:</div>
                <div className="comment-text">{text}</div>    
                </div>
            </div>
    </>
    )
};