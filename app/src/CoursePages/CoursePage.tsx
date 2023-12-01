import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
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

    const courseButtonClick = () => {
      const url = 'https://courses.cs.washington.edu/courses/cse' + classNum + '/';

      window.open(url, '_blank');
    }

    const dawgButtonClick = () => {
      const url = 'https://dawgpath.uw.edu/course?id=CSE+' + classNum + '&campus=seattle';

      window.open(url, '_blank');
    }

    const temp = "Design and implementation of domain-specific languages. Creation of new programming abstractions, formal and informal language specification techniques, implementation strategies to support language analysis and execution on traditional and non-traditional computing platforms. Selection and use of appropriate software tools and development environments to build novel DSLs. Prerequisite: CSE 332 and CSE 351.";

    return (
      <div className="coursepage">
        <div className="topbox">
          <div className="leftflex">
              <div className="coursetitle">
                <h1 className="coursenum">{ course.length > 0 ? `CSE ${course[0].number}` : 'CSE XXX' }</h1>
                <h2 className="coursename">{ course.length > 0 ? course[0].name : 'Design and Implementation of Domain-Specific Languages' }</h2>
              </div>
              <p className="coursedesc">{ course.length > 0 ? course[0].description : temp }</p>
            <div className="buttons-flexbox">
              <button className="purplebutton" onClick={ handleClick }>Rate This Class</button>
              <button className="purplebutton" onClick={ courseButtonClick }>Course Website</button>
              <button className="purplebutton" onClick={ dawgButtonClick }>Dawg Path</button>
            </div>
          </div>

          <div className="rightflex">
            <h3 className="overall-ratings">Overall Ratings</h3>
            <div className="ratings-flexbox">
              <OverallRatingBox label="Difficulty" rating="2/5"></OverallRatingBox>
              <OverallRatingBox label="Workload" rating="2/5"></OverallRatingBox>
              <OverallRatingBox label="Practicality" rating="2/5"></OverallRatingBox>
            </div>
          </div>
        </div>

        <div className="bottombox">
          <h1>User Reviews</h1>
        </div>
      </div>
    );
}

/* 
    Template for the rating boxes.

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