import './Homepage.css'

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

const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
        performSearch();
    }
};

const handleSearch = () => {
    performSearch();
};

const performSearch = () => {
    const searchInput = document.querySelector<HTMLInputElement>('.search-bar');
    if (searchInput && searchInput.value !== '') {
        const searchQuery = searchInput.value;
        console.log('Search Query:', searchQuery);
    }
};

export const HomePage: React.FC = () => {
    return (
        <div className="homepage">
            <h1 className="welcome">
                Welcome to RateMyCSE
            </h1>
            <h3 className="tagline">Wondering if a UW CSE class is as hard as they say?</h3>
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Look up a CSE class"
                    className="search-bar"
                    onKeyDown={handleKeyDown}
                />
                <button className="search-button" onClick={handleSearch} />
            </div>
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
            </div>
        </div>
    );
}
