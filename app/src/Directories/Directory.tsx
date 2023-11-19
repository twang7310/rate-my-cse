import {useEffect, useState} from "react";
import './Directory.css'

interface ClassListProps {
    classLevelNumber: string;
  }
    
export const ClassList: React.FC<ClassListProps> = ({ classLevelNumber }) => {
    const [classList, setClassList] = useState<any[]>([]);
  
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`/api/GetClassData?level=${classLevelNumber}`);
                const data = await response.json();
                setClassList(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [classLevelNumber]);
  
    return (
        <div className="innerpage">
            <div className="class-list">
                {classList.map((classItem) => (
                    <ClassCard key={classItem.class_id} 
                    num={classItem.number} 
                    name={classItem.name} 
                    desc={classItem.description} 
                    rating1={classItem.rating_one} 
                    rating2={classItem.rating_two} 
                    rating3={classItem.rating_three}/>
                ))}
            </div>
        </div>
    );
};

export const ClassRating: React.FC<{category: string, rating: number, type: string}> = ({category, rating, type}) => {
    const dynamicClassName = `rating-pair-rating ratingbox-${type}`;
  
    let display : string;
    if (rating === null) {
        display = "N/A";
    } else {
        display = rating + "/5";
    }
  
    return(
        <div className="rating-pair">
            <div className="rating-pair-category">{category}</div>
            <div className={dynamicClassName}>{display}</div>
        </div>
    );
}
  
interface ClassCardProps {
    num: number;
    name: string;
    desc: string;
    rating1: number;
    rating2: number;
    rating3: number;
}
  
export const ClassCard: React.FC<ClassCardProps> = (props) => {
    return (
        <div className="card">
            <div className="class-info">
                <div className="class-title">
                    <p className="class-number bold">{`CSE ${props.num}`}</p>
                    <p className="class-name bold">{props.name}</p>
                </div>
                <p className="class-description">Description: {props.desc}</p>
            </div>
            <div className="class-ratings">
                <ClassRating category="Difficulty" type="diff" rating={props.rating1}/>
                <ClassRating category="Workload" type="work" rating={props.rating2}/>
                <ClassRating category="Practicality" type="prac" rating={props.rating3}/>
            </div>
        </div>
    );
}
