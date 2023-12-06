import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import './Directory.css'
import '../App/App.css'

interface ClassListProps {
    classLevelNumber?: string;
}
const noResultsFound = "Class not found.";
const searchReminder = "Remember to search by course number, not name."
    
export const ClassList: React.FC<ClassListProps> = ({ classLevelNumber }) => {
    const { query } = useParams<{ query: string }>();
    const [classList, setClassList] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let search = false;

        if (query !== undefined) {
            search = true;
        }

        const fetchData = async () => {
            try {
                let apiUrl = '';
                setLoading(true);
                if (search) {
                    apiUrl = `/api/GetCourseData?num=${query}`;
                } else {
                    apiUrl = `/api/GetClassData?level=${classLevelNumber}`;
                }
                const response = await fetch(apiUrl);
                const data = await response.json();
                setClassList(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [query, classLevelNumber]);

    return (
        <div className="innerpage">
            {loading ? (
                <div>
                    <div className="loading-spinner center"/>
                    <div className="loading-text">Loading...</div>
                </div>
            ) : (
                <div className="class-list">
                    {classList.length > 0 ? (
                        classList.map((classItem) => (
                        <ClassCard
                            key={classItem.class_id}
                            num={classItem.number}
                            name={classItem.name}
                            desc={classItem.description}
                            rating1={classItem.rating_one}
                            rating2={classItem.rating_two}
                            rating3={classItem.rating_three}
                        />
                        ))
                    ) : (
                        <div>
                            <p>{noResultsFound}</p>
                            <p>{searchReminder}</p>
                        </div>
                    )}
                </div>            
            )}
        </div>
    );
};

export const ClassRating: React.FC<{category: string, rating: number, type: string}> = ({category, rating, type}) => {
    const dynamicClassName = `rating-pair-rating ratingbox-${type}`;
    const dynamicClassCategory = `rating-pair-category ${type}-category`
  
    let display : string;
    if (rating === null) {
        display = "N/A";
    } else {
        display = rating + "/5";
    }
  
    return(
        <div className="rating-pair">
            <div className={dynamicClassCategory}>{category}</div>
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
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/course/' + props.num);
    }

    return (
        <div className="card" onClick={ handleClick }>
            <div className="class-info">
                <div className="class-title">
                    <p className="class-number bold">{`CSE ${props.num}`}</p>
                    <p className="class-name bold">{props.name}</p>
                </div>
                <p className="class-description">{props.desc}</p>
            </div>
            <div className="class-ratings">
                <ClassRating category="Difficulty" type="diff" rating={props.rating1}/>
                <ClassRating category="Workload" type="work" rating={props.rating2}/>
                <ClassRating category="Practicality" type="prac" rating={props.rating3}/>
            </div>
        </div>
    );
}
