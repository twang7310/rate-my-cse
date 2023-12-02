import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {ClassRating} from "../Directories/Directory";
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
                console.log(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [classNum]);

    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/course/' + classNum + '/review')
    }

    return (
      <div className="coursepage">
        <div className="topbox">
          {course.map((courseObject) => (
            <>
            <p>{ courseObject.number }</p>
            <p>{ courseObject.name }</p>
            <p>{ courseObject.description }</p>
            <p>{ courseObject.rating_one }</p>
            <p>{ courseObject.rating_two }</p>
            <p>{ courseObject.rating_three }</p>
            </>
          ))}
          <button onClick={handleClick}>Review</button>
        </div>
        <div className="bottombox">
            <div className="page-reviews-header">User Reviews</div>
            <ReviewHolder classNum={classNum!}/>
        </div>
      </div>
    );
}

export const ReviewHolder: React.FC<{classNum: string}> = ({classNum}) => {
    const [reviews, setReviews] = useState<any[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`/api/GetCourseReviews?num=${classNum}`);
                console.log(response);
                const data = await response.json();
                setReviews(data);
                console.log(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [classNum]);

    return (
        <div className="review-holder">
            {reviews.map((review) => (
                <ReviewCard text={(review.text !== '') ? review.text : '(No Comment)'} 
                rating1={review.rating_one}
                rating2={review.rating_two}
                rating3={review.rating_three}
                quarter={(review.quarter !== '') ? review.quarter : 'N/A'}
                professor={(review.professor !== '') ? review.professor : 'N/A'}/>
            ))}
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