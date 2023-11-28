import { useNavigate, useParams } from "react-router-dom";
import './Rating.css'
import { useState } from "react";

export const ReviewPage: React.FC = () => {
    const {classNum} = useParams();

    return (
        <div className="rating-innerpage">
            <ReviewHeader num={classNum!} name="The Hardware/Software Interface"/>
            <div className="rating-contents">
                <ReviewHolder classNum={classNum!}/>
                <div className="rating-instr">
                    <RatingDesc rating={1}/>
                    <RatingDesc rating={2}/>
                    <RatingDesc rating={3}/>
                </div>
            </div>
        </div>
    );
}

export const RatingDesc: React.FC<{rating: number}> = ({rating}) => {
    let labels : string[] = ["Difficulty", "Workload", "Practicality"];
    let descs : string[] = [
        "A combination of how hard the class material was to \
        understand and how much effort the class takes to \
        pass.",
        "Based on how much homework there is and how long the \
        homework takes.",
        "How useful is this class in the real world? Have you \
        seen the material in the industry?"
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

interface ReviewState {
    comment : string;
    rating1 : number;
    rating2 : number;
    rating3 : number;
}

export const ReviewHolder: React.FC<{classNum : string}> = ({classNum}) => {
    const initialState : ReviewState = {comment: '', rating1: 0, rating2: 0, rating3: 0}
    const [ratingContents, setRatingContents] = useState<ReviewState>(initialState);

    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate('/course/' + classNum);
    }

    return (
        <div className="rating-inputs">
            <div className="scales">
                <RatingScale category={1} setReview={setRatingContents}/>
                <RatingScale category={2} setReview={setRatingContents}/>
                <RatingScale category={3} setReview={setRatingContents}/>
            </div>
            <Comment setReview={setRatingContents}/>
            <button className="review-button">Submit</button>
            <button className="review-button" onClick={handleBackClick}>Back</button>
        </div>
    );
}

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
        fieldToSet = 'rating1';
    } else if (props.category === 2) {
        fieldToSet = 'rating2';
    } else {
        fieldToSet = 'rating3';
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
            comment : e.target.value,
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
