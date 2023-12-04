import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {ClassRating} from "../Directories/Directory";
import {getSignInStatus} from "../Login/LoginPage";
import './CoursePage.css'

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
                courseName={ course.length > 0 ? course[0].name : '...' }
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
    const navigate = useNavigate();
    const courseWebsiteURL = 'https://courses.cs.washington.edu/courses/cse' + props.classNum + '/';
    const dawgPathsURL = 'https://dawgpath.uw.edu/course?id=CSE+' + props.classNum + '&campus=seattle';


    const rateButtonClick = () => {
        // User is not logged in
        if (!getSignInStatus()) {
            navigate('/login');
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
            <div className="left-flexbox">
                <div className="course-title">
                    <h1 className="course-num">{ "CSE " + props.classNum }</h1>
                    <h2 className="course-name">{ props.courseName }</h2>
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
       margin: 1.5
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
                setReviews(data);
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
                        professor={(review.professor !== '') ? review.professor : 'N/A'}/>
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
}

export const ReviewCard: React.FC<ReviewCardProps> = (props) => {
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