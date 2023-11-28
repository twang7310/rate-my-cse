import { useState } from "react";
import {ReviewState} from './Rating'
import './Rating.css'

export const ReviewHeader: React.FC<{num : string, name: string}> = ({num, name}) => {
    return (
        <div className="review-header">
            <p className="logo-start">
                Rate My
            </p>
            <p className="course-num">
                CSE {num}
            </p>
            <p className="course-name">
                {name}
            </p>
        </div>
    );
}

interface RatingScaleProps {
    category : number;
    setReview : React.Dispatch<React.SetStateAction<ReviewState>>;
}

export const RatingScale: React.FC<RatingScaleProps> = (props) => {
    const [selectedRating, setSelectedRating] = useState(0);

    let categoryNames : string[] = ['Difficulty', 'Workload', 'Practicality'];

    let fieldToSet : string;
    if (props.category === 1) {
        fieldToSet = 'rating_one';
    } else if (props.category === 2) {
        fieldToSet = 'rating_two';
    } else {
        fieldToSet = 'rating_three';
    }

    const handleRatingClick = (rating : number) => {
        setSelectedRating(rating);
        props.setReview((oldState) => ({
            ...oldState,
            [fieldToSet] : rating,
        }));
    };

    return (
        <div className="rating-group">
            <div className="rating-name">
                {categoryNames[props.category-1]}
            </div>
            <div className="rating-scale">
                {[1, 2, 3, 4, 5].map((rating) => (
                    <div key={rating} className="rating-square">
                        <div
                            className={`half-square ${(rating - 0.5) <= selectedRating ? `rating-${props.category}` : ''}`}
                            onClick={() => handleRatingClick(rating - 0.5)}
                        />
                        <div
                            className={`half-square ${rating <= selectedRating ? `rating-${props.category}` : ''}`}
                            onClick={() => handleRatingClick(rating)}
                        />
                    </div>
                ))}
            </div>
            <div className="numeric-rating">
                {selectedRating}/5
            </div>
        </div>
    );
}

interface CommentProps {
    setReview : React.Dispatch<React.SetStateAction<ReviewState>>;
}

export const Comment: React.FC<CommentProps> = (props) => {
    const [input, setInput] = useState('');

    const handleInputChange = (e : React.ChangeEvent<HTMLTextAreaElement>) => {
        setInput(e.target.value);
        props.setReview((oldState) => ({
            ...oldState,
            text : e.target.value,
        }));
    }

    return (
        <div>
            <p className="comment-header">Comment (optional)</p>
            <textarea
                className="comment-field"
                id="multilineInput"
                value={input}
                onChange={handleInputChange}
                placeholder="Type review here..."
            />
        </div>
    );
}

export const RatingDesc: React.FC<{rating: number}> = ({rating}) => {
    let labels : string[] = ["Difficulty", "Workload", "Practicality"];
    let descs : string[] = [
        "A combination of how hard the class material was to understand and how much effort the class takes to pass.",
        "Based on how much homework there is and how long the homework takes.",
        "How useful is this class in the real world? Have you seen the material in the industry?"
    ];

    return (
        <div className="rating-desc">
            <div className={`rating-box rating-${rating}`}>
                {labels[rating-1]}
            </div>
            <div className="rating-text">
                {descs[rating-1]}
            </div>
        </div>
    );
}
