import {useNavigate} from "react-router-dom";
import './SearchBar.css';

interface SearchBarProps {
    isHeader: boolean;
}

// Will change depending if the search bar is for the homepage or not
export const SearchBar: React.FC<SearchBarProps> = ({ isHeader }) => {
    const navigate = useNavigate();

    const performSearch = () => {
        const searchInput = document.querySelector<HTMLInputElement>(
            isHeader ? '.header-search-bar' : '.search-bar'
        );
        if (searchInput && searchInput.value !== '') {
            const searchString = searchInput.value.toLowerCase();

            // Replaces all strings and instances of CSE
            const stringWithoutSpacesOrCSE = searchString.replace(/\s|cse/g, '');

            navigate(`/search/${stringWithoutSpacesOrCSE}`);
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            performSearch();
        }
    };

    const handleSearch = () => {
        performSearch();
    };

    return (
        <div className={isHeader ? "header-search-container" : "search-container"}>
            <input
                type="text"
                placeholder={isHeader ? "Search..." : "Look up a CSE class"}
                className={isHeader ? "header-search-bar" : "search-bar"}
                onKeyDown={handleKeyDown}
            />
            <button className={isHeader ? "header-search-button" : "search-button"} onClick={handleSearch} />
        </div>
    );
};
