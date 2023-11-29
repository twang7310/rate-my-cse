import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
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
        </div>
        <div className="bottombox">
          <h1>User Reviews</h1>
        </div>
      </div>
    );
}