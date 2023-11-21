import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import './CoursePage.css'

export const CoursePage: React.FC = () => {
    const { classNum } = useParams();
    const [course, setCourse] = useState<any>([]);

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
            <h1>{ classNum }</h1>
            <h1>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid, consectetur ullam. Ipsum reiciendis libero quidem rerum assumenda. Consectetur quis in omnis laboriosam? Laboriosam odio, veritatis dolorum eos et est temporibus?</h1>
       </div>
    );
}