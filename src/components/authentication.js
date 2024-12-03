import { useState } from "react";
import Login from "./login";
import SignUp from "./signup";

function Authentication(props){

    const [formState, setFormState] = useState('login');

    return(
        <div className="d-flex justify-content-center align-items-center backgrd-gradient">

        {
            formState === "login" ? <Login setToken={props.setToken} setFormState={setFormState} /> : <SignUp setFormState={setFormState} />
        }
        </div>
    )

}

export default Authentication;