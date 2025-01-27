import { useNavigate } from "react-router";
import { useEffect, useReducer, useRef, useState } from "react";

// Importing reusable components
import FormInput from "./formInput";
import SpinnerButton from "./spinnerButton";
import GoogleButton from "./googleButton";
import FacebookButton from "./facebookButton";

// Helper function to handle login logic
import { LoginTo } from "../../model/loginAuth";

// Login component that renders the login form
function Login(props) {

    // useNavigate hook for navigation after successful login
    const navigate = useNavigate();

    const loginFormRef = useRef(null);
    const [error, setError] = useState(false);
    const [spinner, showSpinner] = useState(false);

    // Effect hook to add event listener for form submission
    useEffect(() => {
        // Access form and alert elements by their IDs
        const loginForm = loginFormRef.current;
    
        // Function to handle login form submission asynchronously
        const handleLoginForm = async (event) => {
            showSpinner(true)
        
            // Call helper function LoginTo to authenticate user
            const result = await LoginTo(event, loginForm);
            showSpinner(false)
            
            // Check if the login is successful (accessToken present)
            if (result?.accessToken) {
                // Store the access token in sessionStorage and navigate to home page
                window.sessionStorage.setItem('token', result.accessToken);
                navigate('/');
            } else if (result?.message) {
                // If login fails, show error alert
                setError(true);
            }
        }

        // Add event listener to the login form to handle submission
        loginForm?.addEventListener('submit', handleLoginForm);

        // Cleanup function to remove event listener when component unmounts
        return () => {
            loginForm?.removeEventListener('submit', handleLoginForm);
        }

    }, []); // Empty dependency array means this effect runs once after the component mounts

    return (
        <form className="w-25 border border-dark bg-dark p-4 rounded-3" id="loginForm" ref={loginFormRef} noValidate>
            <h4 className="text-center mb-4 text-white text-uppercase">Login</h4>
            {/* Login failed alert, initially hidden */}
            <p className={`form-text text-danger mt0 ${error ? '' : 'd-none'}`} id="loginFailedAlert">Invalid credentials!</p>

            {/* Form fields for email and password input */}
            <FormInput type={"email"} text={"Email"} id={'email'} error={"Enter your email"} name={"email"} />
            <FormInput type={"password"} text={"Password"} id={'password'} error={"Enter your password"} name={"password"} />

            {/* Submit button with spinner */}
            <SpinnerButton value={"Login"} spinnerId={"loginSpinner"} spinner={spinner}/>

            {/* Social login buttons */}
            <GoogleButton />
            <FacebookButton />

            {/* Switch to signup page */}
            <p className="text-center text-white">
                Don't have an account
                <span className="btn p-0 text-warning" onClick={() => { props.setFormState("Signup") }}>
                    Signup
                </span>
            </p>
        </form>
    )
}

export default Login;