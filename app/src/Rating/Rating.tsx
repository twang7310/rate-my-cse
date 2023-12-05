import {Link, useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Comment, InputField, RatingDesc, RatingScale, ReviewHeader} from "./Rating-components";
import {getEmail, getSignInStatus} from "../Login/LoginPage";
import Popup from "../Popup/Popup";
import './Rating.css'

export const ReviewPage: React.FC = () => {
    const {classNum} = useParams();
    const navigate = useNavigate();

    const [course, setCourse] = useState<any[]>([]);
    const [review, setReview] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [signPopupOpen, setSignPopupOpen] = useState(!getSignInStatus());

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const response = await fetch(`/api/GetCourseData?num=${classNum}`);
                const data = await response.json();
                setCourse(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        const fetchReview = async () => {
            try {
                const response = await fetch(`/api/GetReview?num=${classNum}&user=${getEmail()}`);
                const data = await response.json();
                setReview(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchCourse();
        fetchReview();
        setLoading(false);
    }, [classNum]);

    const closePopup = () => {
        setSignPopupOpen(false);
        navigate('/course/' + classNum);
    }

    return (
        <div className="rating-innerpage">
            {signPopupOpen && 
                <Popup onClose={closePopup} header="Login to Review">
                    <p>You must be logged in with a UW email address to leave a review.</p>
                    <p>
                        Click here to <Link to="/login" onClick={() => setSignPopupOpen(false)}>Login</Link> or <Link to="/signup" onClick={() => setSignPopupOpen(false)}>Sign Up</Link>
                    </p>
                </Popup>
            }
            {(!signPopupOpen) && (review.length > 0) &&
                <Popup onClose={closePopup} header="">
                    <p>You've already left a review on this course!</p>
                    <p>You can edit or delete your review on the course page.</p>
                </Popup>
            }
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

export const ReviewHolder: React.FC<{classNum : string}> = ({classNum}) => {
    const initialState : ReviewState = {
        reviewer: getEmail(),  
        rating_one: 0, 
        rating_two: 0, 
        rating_three: 0,
        text: '(No Comment)',
        course_number : classNum,
        quarter: 'N/A',
        professor: 'N/A'
    };
    const [ratingContents, setRatingContents] = useState<ReviewState>(initialState);


    const navigate = useNavigate();

    const handleBackClick = () => {
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
            <div className="scales">
                <RatingScale category={1} setReview={setRatingContents}/>
                <RatingScale category={2} setReview={setRatingContents}/>
                <RatingScale category={3} setReview={setRatingContents}/>
            </div>
            <div className="other-inputs">
                <InputField setReview={setRatingContents} field="Quarter Taken"/>
                <InputField setReview={setRatingContents} field="Professor"/>
            </div>
            <Comment setReview={setRatingContents}/>
            <button className="review-button" onClick={postReview}>Submit</button>
            <button className="review-button" onClick={handleBackClick}>Back</button>
        </div>
    );
}
