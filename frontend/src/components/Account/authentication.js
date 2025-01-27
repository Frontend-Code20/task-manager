import { useState } from "react";

// Importing reusable components
import Login from "./login";
import SignUp from "./signup";

// This component will manage login and signup in a single root
function Authentication(props) {

    // state to handle to login and signup preview
    const [formState, setFormState] = useState('login');

    return (
        <div className="d-flex justify-content-center align-items-center backgrd-gradient">

            {
                formState === "login" ? <Login setToken={props.setToken} setFormState={setFormState} /> : <SignUp setFormState={setFormState} />
            }
        </div>
    )

}

export default Authentication;