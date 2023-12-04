import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Comment, InputField, RatingDesc, RatingScale, ReviewHeader} from "./Rating-components";
import './Rating.css'

export const ReviewPage: React.FC = () => {
    const {classNum} = useParams();

    const [course, setCourse] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

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
        reviewer: 'test_user',  
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
