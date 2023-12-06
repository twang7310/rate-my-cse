import './Homepage.css'
import {SearchBar} from '../utils/utils';
import CoursePageExample from '../images/course-page.png';

/* 
    Template for the rating boxes.

    Parameters:
    label - Text in the center of the box.
    rating - Determines the color and position of the box 
           (Difficulty, workload, practicality).
*/
export const RatingBox: React.FC<{label: string, rating: string}> = ({ label, rating }) => {
    const dynamicClassName = `ratingbox ratingbox-${rating}`;
  
    return (
        <div className={dynamicClassName}>
            {label}
        </div>
    );
};
  
type RatingDescProps = {
    children: React.ReactNode;
}

/* 
    Template for the descriptions underneath the rating boxes that accepts
    children as the text for the description.
*/
export const RatingDesc: React.FC<RatingDescProps> = ( props: RatingDescProps ) => {
    
    return (
        <div className="ratingdesc">
            {props.children}
        </div>
    );
}

export const HomePage: React.FC = () => {
    return (
        <div className="homepage">
            <h1 className="welcome">
                Welcome to RateMyCSE
            </h1>
            <h3 className="tagline">Wondering if a UW CSE class is as hard as they say?</h3>
            <SearchBar isHeader={false}/>
            <div className="howitworks">
                <h2>How it works:</h2>
                <h3 className="explanation">
                    Students will post ratings based on 3 categories
                </h3>
                <div className="ratingsflexbox">
                    <RatingBox label="Difficulty" rating="diff" />
                    <RatingBox label="Workload" rating="work" />
                    <RatingBox label="Practicality" rating="prac" />
                </div>
                <div className="ratingsflexbox">
                    <RatingDesc>
                        A combination of how hard the class material was to 
                        understand and how much effort the class takes to
                        pass.
                    </RatingDesc>
                    <RatingDesc>
                        Based on how much homework there is and how long the 
                        homework takes.
                    </RatingDesc>
                    <RatingDesc>
                        How useful is this class in the real world? Have you
                        seen the material in the industry?
                    </RatingDesc>
                </div>
                <div className="page-instructions">
                    <h3 className="explanation">
                        View course lists using the tabs on the left or search by 
                        course number in the searchbar to navigate to a course page.
                    </h3>
                    <img 
                        src={CoursePageExample} 
                        alt="Example course page" 
                        width="90%" 
                        height="auto"
                        className="example-img"
                    />
                    <h3 className="explanation">
                        Here you can read reviews, or leave a review yourself by Signing In at the top right then clicking
                        <button className="purple-button example-button">Rate This Class</button>
                    </h3>

                </div>
            </div>
        </div>
    );
}
