import { useContext } from "react";
import { BarContext } from "./globalState";
import { useNavigate } from "react-router";

function EmptyScreen({ icon, message, btnText, action }) {

    const { setContent } = useContext(BarContext);
    const navigate = useNavigate();

    return (
        <div className="position-absolute top-0 left-0 w-100 h-100 d-flex justify-content-center align-items-center">
            <div className="d-flex flex-column align-items-center">
                <img src={icon} alt="empty icon" width={"60px"} height={"60px"} />
                <p>{message}</p>
                <button type="button" className="btn btn-primary rounded-4 px-4" onClick={() => {
                    navigate('/create')
                    setContent('editBar')
                }
                }>{btnText}</button>
            </div>
        </div>
    )
}


export default EmptyScreen;