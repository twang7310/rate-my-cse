import {useEffect} from "react";
import {useParams} from "react-router-dom";

export const CoursePage: React.FC = () => {
    const { classNum } = useParams();

    return (
       <div className="coursepage">
            <h1>{ classNum }</h1>
            <h1>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid, consectetur ullam. Ipsum reiciendis libero quidem rerum assumenda. Consectetur quis in omnis laboriosam? Laboriosam odio, veritatis dolorum eos et est temporibus?</h1>
       </div>
    );
}