import { Link } from "react-router";

// Component Search Result 
function SearchResult({ }) {

    return (
        <div className="w-100 h-100 d-flex justify-content-center align-items-center" >
            <div className="d-flex justify-content-center align-items-center flex-column">
                <h3>Search Featured is Comming Soon!</h3>
                <Link className="btn btn-primary" to={"/"} >Go To Dashboard</Link>
            </div>
        </div>
    )
}

export default SearchResult;