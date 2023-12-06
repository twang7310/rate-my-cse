import {useState} from "react";
import {ReviewState} from './Rating'
import './Rating.css'

export const ReviewHeader: React.FC<{num : string, name: string, loaded: boolean}> = ({num, name, loaded}) => {
    return (
        <div className="review-header">
            <p className="logo-start">Rate My</p>
            <p className="course-num">CSE {num}</p>
            {loaded ? (
                <p className="course-name">{name}</p>
            ) : (
                <div className="loading-spinner"/>
            )}
        </div>
    );
}

interface RatingScaleProps {
    category: number;
    setReview: React.Dispatch<React.SetStateAction<ReviewState>>;
    initialValue: number;
}

export const RatingScale: React.FC<RatingScaleProps> = (props) => {
    const [selectedRating, setSelectedRating] = useState(props.initialValue);
    const [hoverRating, setHoverRating] = useState(0);

    let categoryNames: string[] = ['Difficulty', 'Workload', 'Practicality'];

    let fieldToSet: string;
    if (props.category === 1) {
        fieldToSet = 'rating_one';
    } else if (props.category === 2) {
        fieldToSet = 'rating_two';
    } else {
        fieldToSet = 'rating_three';
    }

    const handleRatingClick = (rating: number) => {
        setSelectedRating(rating);
        props.setReview((oldState) => ({
            ...oldState,
            [fieldToSet] : rating,
        }));
    };

    const handleRatingHover = (rating: number)=> {
        setHoverRating(rating);
    };

    const handleHoverLeave = () => {
        setHoverRating(0);
    };

    return (
        <div className="rating-group">
            <div className="rating-name">
                {categoryNames[props.category-1]}
            </div>
            <div className="rating-scale" onMouseLeave={() => handleHoverLeave()}>
                {[1, 2, 3, 4, 5].map((rating) => (
                    <div key={rating} className="rating-square">
                        <div
                            className={`half-square ${(rating - 0.5) <= (hoverRating || selectedRating) ? `rating-${props.category}` : ''}`}
                            onClick={() => handleRatingClick(rating - 0.5)}
                            onMouseEnter={() => handleRatingHover(rating - 0.5)}
                        />
                        <div
                            className={`half-square ${rating <= (hoverRating || selectedRating) ? `rating-${props.category}` : ''}`}
                            onClick={() => handleRatingClick(rating)}
                            onMouseEnter={() => handleRatingHover(rating)}
                        />
                    </div>
                ))}
            </div>
            <div className="numeric-rating">
                {(hoverRating || selectedRating)}/5
            </div>
        </div>
    );
}

interface CommentProps {
    setReview: React.Dispatch<React.SetStateAction<ReviewState>>;
    initialValue: string;
}

export const Comment: React.FC<CommentProps> = (props) => {
    const [input, setInput] = useState(props.initialValue);

    const handleInputChange = (e : React.ChangeEvent<HTMLTextAreaElement>) => {
        setInput(e.target.value);
        props.setReview((oldState) => ({
            ...oldState,
            text : e.target.value,
        }));
    }

    return (
        <div>
            <p className="comment-header">Comment</p>
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

interface InputProps {
    field: string;
    setReview: React.Dispatch<React.SetStateAction<ReviewState>>;
    initialValue: string;
}

export const InputField: React.FC<InputProps> = (props) => {
    const [input, setInput] = useState(props.initialValue);

    const dynamicClassName = `comment-field small-comment field-${props.field}`;

    const fieldToSet: string = (props.field === 'Professor') ? "professor" : "quarter";
    const previewText: string = (props.field === 'Professor') ? "Ex. H. Perkins" : "Ex. Au23";

    const handleInputChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
        props.setReview((oldState) => ({
            ...oldState,
            [fieldToSet] : e.target.value,
        }));
    }

    return (
        <div className="input-field">
            <div className="input-name">{props.field}</div>
            <input
                className={dynamicClassName}
                id="multilineInput"
                value={input}
                onChange={handleInputChange}
                placeholder={previewText}
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
