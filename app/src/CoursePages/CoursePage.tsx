import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import './CoursePage.css'

export const CoursePage: React.FC = () => {
    const { classNum } = useParams();
    const [course, setCourse] = useState<any[]>([]);

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
    );
}