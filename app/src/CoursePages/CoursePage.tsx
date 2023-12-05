import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {ClassRating} from "../Directories/Directory";
import {getEmail, getSignInStatus} from "../Login/LoginPage";
import {Link} from 'react-router-dom';
import Popup from "../Popup/Popup";
import './CoursePage.css'
import {ReviewState} from "../Rating/Rating";

export const CoursePage: React.FC = () => {

    // useParams acquires the portion of the URL (:classNum) that
    // changes in respect to the class card that was clicked.
    const { classNum } = useParams();

    // Although we are only requesting one course, the API call and SQL
    // aren't certain if there is only one and so it must return
    // an array.
    const [course, setCourse] = useState<any[]>([]);

    // useEffect to update the course page with the data fetched by
    // making an API call for the course with the number classNum.
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`/api/GetCourseData?num=${classNum}`);
                const data = await response.json();
                setCourse(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [classNum]);

    return (
        <div className="coursepage">
            <div className="top-box">
                <CourseInfo classNum={ classNum! }
                courseName={ course.length > 0 ? course[0].name : '' }
                desc={ course.length > 0 ? course[0].description : '' }
                loaded={course.length > 0}/>
                <div className="right-flexbox">
                    <h3 className="overall-ratings-header">Overall Ratings</h3>
                    <div className="ratings-flexbox">
                        <OverallRatingBox label="Difficulty" rating={ course.length > 0 ? course[0].rating_one : null }/>
                        <OverallRatingBox label="Workload" rating={ course.length > 0 ? course[0].rating_two : null }/>
                        <OverallRatingBox label="Practicality" rating={ course.length > 0 ? course[0].rating_three : null }/>
                    </div>
                </div>
            </div>

            <div className="bottom-box">
                <div className="page-reviews-header">User Reviews</div>
                <ReviewHolder classNum={classNum!}/>
            </div>
        </div>
    );
}

interface CourseInfoProps {
    classNum: string;
    courseName: string;
    desc: string;
    loaded: boolean;
}

export const CourseInfo: React.FC<CourseInfoProps> = (props) => {
    const [popupOpen, setPopupOpen] = useState(false);
    const navigate = useNavigate();
    const courseWebsiteURL = 'https://courses.cs.washington.edu/courses/cse' + props.classNum + '/';
    const dawgPathsURL = 'https://dawgpath.uw.edu/course?id=CSE+' + props.classNum + '&campus=seattle';


    const rateButtonClick = () => {
        // User is not logged in
        if (!getSignInStatus()) {
            setPopupOpen(true);
        } else {
            navigate('/course/' + props.classNum + '/review')
        }
    }

    const courseButtonClick = () => {
        window.open(courseWebsiteURL, '_blank');
    }

    const dawgButtonClick = () => {
        window.open(dawgPathsURL, '_blank');
    }

    return (
        <div className="course-info">
            {popupOpen && 
                <Popup onClose={() => setPopupOpen(false)} header="Login to Review">
                    <p>You must be logged in with a UW email address to leave a review.</p>
                    <p>
                        Click here to <Link to="/login" onClick={() => setPopupOpen(false)}>Login</Link> or <Link to="/signup" onClick={() => setPopupOpen(false)}>Sign Up</Link>
                    </p>
                </Popup>
            }
            <div className="left-flexbox">
                <div className="course-title">
                    <h1 className="course-title-num">{ "CSE " + props.classNum }</h1>
                    <h2 className="course-title-name">{ props.courseName }</h2>
                </div>
                {props.loaded ? (
                    <p className="course-desc">{ props.desc }</p>
                ) : (
                    <div>
                        <div className="loading-spinner center"/>
                        <div className="loading-text">Loading...</div>
                    </div>
                )}
                <div className="buttons-flexbox">
                    <button className="purple-button" onClick={ rateButtonClick }>Rate This Class</button>
                    <button className="purple-button" onClick={ courseButtonClick }>Course Website</button>
                    <button className="purple-button" onClick={ dawgButtonClick }>Dawg Path</button>
                </div>
            </div>
        </div>
    )
}

/* 
    Template for the rating boxes in the "Overall Ratings" section.

    Parameters:
    label - Determines the color and position of the box 
           (Difficulty, workload, practicality).
    rating - The numerical rating that goes in the center of the box.
*/
export const OverallRatingBox: React.FC<{label: string, rating: string}> = ({ label, rating }) => {
    const dynamicClassName = `overallratingbox overallratingbox-${label}`;
    
    let display: string;
    if (rating === null) {
        display = "N/A";
    } else {
        display = rating + "/5";
    }

    const category: React.CSSProperties = {
       margin: 1.5,
       fontSize: `clamp(1px, 117%, 2vw)`,
    };

    return (
        <div className="overall-rating-box">
            <h3 style={category}>{label}</h3>
            <div className={dynamicClassName}>
                <h3>{display}</h3>
            </div>
        </div>
    )
}

export const ReviewHolder: React.FC<{classNum: string}> = ({classNum}) => {
    const [reviews, setReviews] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`/api/GetCourseReviews?num=${classNum}`);
                const data = await response.json();

                // Sort the reviews such that the signed in user's review is first
                const sortedReviews = data.sort((a: { reviewer: string }, b: { reviewer: string }) => {
                    if (a.reviewer === getEmail()) return -1; // Current user's review comes first
                    if (b.reviewer === getEmail()) return 1; // Other user's reviews come after
                    return 0;
                });

                setReviews(sortedReviews);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [classNum]);

    return (
        <div className="review-holder">
            {loading ? (
                <div>
                    <div className="loading-spinner center"/>
                    <div className="loading-text">Loading...</div>
                </div>
            ) : (
                <div>
                    {reviews.length === 0 && <div className="no-reviews italics">No Reviews. Feel free to rate this course!</div>}
                    {reviews.length !== 0 && reviews.map((review) => (
                        <ReviewCard text={(review.text !== '') ? review.text : '(No Comment)'} 
                        rating1={review.rating_one}
                        rating2={review.rating_two}
                        rating3={review.rating_three}
                        quarter={(review.quarter !== '') ? review.quarter : 'N/A'}
                        professor={(review.professor !== '') ? review.professor : 'N/A'} 
                        class={classNum}
                        isCurrentUser={review.reviewer === getEmail()}/>
                    ))}
                </div>
            )}
        </div>
    );
}

interface ReviewCardProps {
    text: string;
    rating1: number;
    rating2: number;
    rating3: number;
    quarter: string;
    professor: string;
    class: string;
    isCurrentUser?: boolean;
}

export const ReviewCard: React.FC<ReviewCardProps> = (props) => {
    const navigate = useNavigate();
    const handleDelete = async () => {
        const confirmDelete = window.confirm("Warning! This action is irreversible. Continue?");

        if (confirmDelete) {
            const reviewer = getEmail();
            const classNumber = props.class;

            await fetch(`/api/DeleteReview?reviewer=${reviewer}&classNumber=${classNumber}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then(response => {
                if (!response.ok) {
                    console.error("Unable to delete review: status code ", response.status);
                }
                response.json();
            })
            .catch(error => {
                console.error('There was a problem with the delete operation:', error);
            });
            
            navigate('/course/' + classNumber + '/loading');
        }
    };

    const handleEdit = () => {
        const newReviewState: ReviewState = {
            reviewer: getEmail(),
            rating_one: props.rating1, 
            rating_two: props.rating2, 
            rating_three: props.rating3,
            text: props.text,
            course_number: props.class,
            quarter: props.quarter,
            professor: props.professor
        };
        navigate(`/course/${props.class}/review`, {state: {reviewState: newReviewState}});
    };

    return(
        <div className="card review-card">
            <div className="review-card-left">
                <ReviewCardHeader quarter={props.quarter} professor={props.professor}/>
                <div className={`review-text ${(props.text === '(No Comment)') ? 'italics' : ''}`}>
                    <p>{props.text}</p>
                </div>
            </div>
            <div className="review-ratings">
                <ClassRating category="Difficulty" rating={props.rating1} type="diff review-box"/>
                <ClassRating category="Workload" rating={props.rating2} type="work review-box"/>
                <ClassRating category="Practicality" rating={props.rating3} type="prac review-box"/>
            </div>
            {props.isCurrentUser && (
                <div className="icons">
                    <button className="icon-button edit-button" onClick={handleEdit}/>
                    <button className="icon-button delete-button" onClick={handleDelete} />
                </div>
            )}
        </div>
    );
}

export const ReviewCardHeader: React.FC<{quarter: string, professor: string}> = ({quarter, professor}) => {
    return (
        <div className="review-card-header">
            <div className="header-quarter"><strong>Quarter Taken:</strong> {quarter}</div>
            <div className="header-prof"><strong>Professor:</strong> {professor}</div>
        </div>
    );
}