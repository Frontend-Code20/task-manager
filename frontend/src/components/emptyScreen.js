import { useNavigate } from "react-router";

// Empty screen component  
function EmptyScreen({ icon, message, btnText }) {

    const navigate = useNavigate();

    // Handle button click logic
    const handleButtonClick = () => {
        navigate('/create/new');
    }

    return (
        <div className="w-100 h-100 d-flex justify-content-center align-items-center">
            <div className="d-flex flex-column align-items-center pt-5 pb-5">
                <img src={icon} alt="empty icon" width={"60px"} height={"60px"} />
                <p>{message}</p>
                <button type="button" className="btn btn-primary rounded-4 px-4" onClick={handleButtonClick}>{btnText}</button>
            </div>
        </div>
    )
}


export default EmptyScreen;