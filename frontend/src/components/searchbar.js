import { useEffect, useRef } from "react";
import { useNavigate } from "react-router";

function SearchBar({ className }) {

    // Reference to the search form
    const searchFormRef = useRef(null);

    // Navigation function from react-router
    const navigate = useNavigate();

    // useEffect hook to handle search form submission
    useEffect(() => {

        // Handle the form submission
        const handleSearchSubmit = (event) => {
            event.preventDefault();
            const formData = new FormData(searchFormRef.current); // Get form data
            const searchValue = formData.get('search'); // Extract the search value from the form
            
             // Navigate to the search results page with the search query
            navigate('/search/'+searchValue);
        }

         // Add event listener to handle form submission when form is available
        if (searchFormRef.current) {
            searchFormRef.current.addEventListener('submit', handleSearchSubmit);
        }
        
        // Cleanup the event listener when the component unmounts or updates
        return () => {
            if (searchFormRef.current) {
                searchFormRef.current.removeEventListener('submit', handleSearchSubmit);
            }
        }

    }, [])  // Empty dependency array to only run this effect once on component mount

    return (
        // Form element for searching, using the passed className for styling
        <form role="search" className={className} ref={searchFormRef}>
            <div>
                <label htmlFor="search" className="visually-hidden">Search</label>
                <div className="d-flex gap-2 bg-white form-control p-1 pe-2 align-items-center">
                    <input type="search" className="w-100 search-field" id="search" name="search" placeholder="Search" aria-label="search" />
                    <button className="btn p-0 border-none outline-none" type="submit">
                        <img src="/assets/icons/search.png" alt="Search" className="cr-pointer" width={"20px"} height={"20px"} aria-label="Search icon" />
                    </button>
                </div>
            </div>
        </form>
    )
}

export default SearchBar;