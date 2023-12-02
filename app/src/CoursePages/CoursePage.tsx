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

    return (
        <div className="coursepage">
            <div className="topbox">
                <CourseInfo classNum={ classNum! }
                courseName={ course.length > 0 ? course[0].name : '...' }
                desc={ course.length > 0 ? course[0].description : 'Loading...' }/>
                <div className="rightflex">
                    <h3 className="overallratings-header">Overall Ratings</h3>
                    <div className="ratings-flexbox">
                        <OverallRatingBox label="Difficulty" rating={ course.length > 0 ? course[0].rating_one : '?/5' }></OverallRatingBox>
                        <OverallRatingBox label="Workload" rating={ course.length > 0 ? course[0].rating_two : '?/5' }></OverallRatingBox>
                        <OverallRatingBox label="Practicality" rating={ course.length > 0 ? course[0].rating_three : '?/5' }></OverallRatingBox>
                    </div>
                </div>
            </div>

            <div className="bottombox">
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
}

export const CourseInfo: React.FC<CourseInfoProps> = (props) => {
    const navigate = useNavigate();

    const rateButtonClick = () => {
      navigate('/course/' + props.classNum + '/review')
    }

    const courseButtonClick = () => {
      const url = 'https://courses.cs.washington.edu/courses/cse' + props.classNum + '/';

      window.open(url, '_blank');
    }

    const dawgButtonClick = () => {
      const url = 'https://dawgpath.uw.edu/course?id=CSE+' + props.classNum + '&campus=seattle';

      window.open(url, '_blank');
    }

    return (
        <div className="courseinfo">
            <div className="leftflex">
                <div className="coursetitle">
                    <h1 className="coursenum">{ "CSE " + props.classNum }</h1>
                    <h2 className="coursename">{ props.courseName }</h2>
                </div>
                <p className="coursedesc">{ props.desc }</p>
                <div className="buttons-flexbox">
                    <button className="purplebutton" onClick={ rateButtonClick }>Rate This Class</button>
                    <button className="purplebutton" onClick={ courseButtonClick }>Course Website</button>
                    <button className="purplebutton" onClick={ dawgButtonClick }>Dawg Path</button>
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
    const dynamicClassName = `ratingbox ratingbox-${label}`;

    const category: React.CSSProperties = {
       margin: 1.5
    };

    return (
        <div className="overallratingbox">
            <h3 style={category}>{label}</h3>
            <div className={dynamicClassName}>
                <h3>{rating}</h3>
            </div>
        </div>
    )
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
                <ReviewCard text={review.text} 
                rating1={review.rating_one}
                rating2={review.rating_two}
                rating3={review.rating_three}/>
            ))}
        </div>
    );
}

interface ReviewCardProps {
    text: string;
    rating1: number;
    rating2: number;
    rating3: number;
}

export const ReviewCard: React.FC<ReviewCardProps> = (props) => {
    return(
        <div className="card review-card">
            <div className="review-text">
                <p>{props.text}</p>
            </div>
            <div className="review-ratings">
                <ClassRating category="Difficulty" rating={props.rating1} type="diff review-box"/>
                <ClassRating category="Workload" rating={props.rating2} type="work review-box"/>
                <ClassRating category="Practicality" rating={props.rating3} type="prac review-box"/>
            </div>
        </div>
    );
}