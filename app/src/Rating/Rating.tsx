import {Link, useLocation, useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Comment, InputField, RatingDesc, RatingScale, ReviewHeader} from "./Rating-components";
import {getEmail, getSignInStatus} from "../Login/LoginPage";
import Popup from "../Popup/Popup";
import './Rating.css'

export const ReviewPage: React.FC = () => {
    const {classNum} = useParams();

    const [course, setCourse] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const location = useLocation();

    const newReviewState: ReviewState = location.state?.reviewState;
  
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`/api/GetCourseData?num=${classNum}`);
                const data = await response.json();
                setCourse(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [classNum]);

    return (
        <div className="rating-innerpage">
            {loading ? (
                <ReviewHeader num={classNum!} name="" loaded={false}/>
            ) : (
                <div>
                    {course.map((courseObject) => (
                        <ReviewHeader num={courseObject.number} name={courseObject.name} loaded={true}/>
                    ))}
                </div>
            )}
            <div className="page-contents">
            <ReviewHolder classNum={classNum!} reviewState={newReviewState} />                
            <div className="rating-instr">
                    <RatingDesc rating={1}/>
                    <RatingDesc rating={2}/>
                    <RatingDesc rating={3}/>
                </div>
            </div>
        </div>
    );
}

export interface ReviewState {
    reviewer: string;
    rating_one: number;
    rating_two: number;
    rating_three: number;
    text: string;
    course_number: string;
    quarter: string;
    professor: string;
}

export const ReviewHolder: React.FC<{ classNum: string, reviewState: ReviewState }> = ({ classNum, reviewState }) => {
    const initialState: ReviewState = reviewState ? reviewState : {
        reviewer: getEmail(),  
        rating_one: 0, 
        rating_two: 0, 
        rating_three: 0,
        text: '(No Comment)',
        course_number : classNum,
        quarter: 'N/A',
        professor: 'N/A'
    }

    const [ratingContents, setRatingContents] = useState<ReviewState>(initialState);
    const [popupOpen, setPopupOpen] = useState(!getSignInStatus());

    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate('/course/' + classNum);
    }

    const closePopup = () => {
        setPopupOpen(false);
        navigate('/course/' + classNum);
    }

    const postReview = async () => {
        try {
            const response = await fetch('/api/PostReview', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(ratingContents),
            });
            await response.json();
            navigate('/course/' + classNum);
        } catch (error) {
            alert('Error posting reivew');
        }
    };

    return (
        <div className="rating-inputs">
            {popupOpen && 
                <Popup onClose={closePopup} header="Login to Review">
                    <p>You must be logged in with a UW email address to leave a review.</p>
                    <p>
                        Click here to <Link to="/login" onClick={() => setPopupOpen(false)}>Login</Link> or <Link to="/signup" onClick={() => setPopupOpen(false)}>Sign Up</Link>
                    </p>
                </Popup>
            }
            <div className="scales">
                <RatingScale category={1} setReview={setRatingContents} initialValue={initialState.rating_one}/>
                <RatingScale category={2} setReview={setRatingContents} initialValue={initialState.rating_two}/>
                <RatingScale category={3} setReview={setRatingContents} initialValue={initialState.rating_three}/>
            </div>
            <div className="other-inputs">
                <InputField setReview={setRatingContents} initialValue={reviewState !== undefined ? initialState.quarter : ""} field="Quarter Taken"/>
                <InputField setReview={setRatingContents} initialValue={reviewState !== undefined ? initialState.professor : ""} field="Professor"/>
            </div>
            <Comment setReview={setRatingContents} initialValue={reviewState !== undefined ? initialState.text : ""}/>
            <button className="review-button" onClick={postReview}>Submit</button>
            <button className="review-button" onClick={handleBackClick}>Back</button>
        </div>
    );
}
