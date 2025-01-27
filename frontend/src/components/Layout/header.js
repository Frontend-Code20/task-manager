import { useNavigate } from "react-router";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

// This fetches user data from database and store it in redux store
import { fetchUser } from "../Redux/userReducer";

// Importing component
import SearchBar from "../searchbar";

function Header() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Get user Info from redux store
    const { userInfo, status } = useSelector((state) => state.userInfo);

    // handle quick icon logic to navigate to new task create roote
    const handleQuickIconClick = () => {
        navigate('/create/new')
    }

    useEffect(() => {

        if (status === 'idle'){
            dispatch(fetchUser());
        }

    }, []);

    return (
        <nav className="navbar bg-warning">
            <div className="container">
                <div className="narbar-brand d-flex justify-content-center align-items-center">
                    <img src="/assets/icons/logo.png" alt="site icon" className="me-2" width={"32px"} height={"32px"} />
                    <span className="fw-bold">Task Manager</span>
                </div>
               <SearchBar className={"w-50 d-none d-sm-block"}/>
                <div className="d-flex">
                    <img src="/assets/icons/add.png" className="me-3 cr-pointer" onClick={handleQuickIconClick} width={"24px"} height={"24px"} alt="Quick add new task" />
                    <h5 className="m-0">{userInfo?.username}</h5>
                </div>
            </div>
        </nav>
    )
}

export default Header;