import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";

// Importing reusable components
import FormInput from "./formInput";
import SpinnerButton from "./spinnerButton";
import GoogleButton from "./googleButton";
import FacebookButton from "./facebookButton";

// Async function to handle form submission and signup logic
import { signUpTo } from "../../model/signAuth";

// Effect hook to handle form submission and clean up the event listener
function SignUp(props) {

    // useNavigate hook for navigation after successful signup
    const navigate = useNavigate();
    
    const signupFormRef = useRef(null);
    const [error, setError] = useState(null);
    const [spinner, showSpinner] = useState(false);

    // Effect hook to add event listener for form submission
    useEffect(() => {
        const signupForm = signupFormRef.current;
        const signupSpinner = document.getElementById('signupSpinner');

        // Function to handle login form submission asynchronously
        const handleSignupForm = async (event) => {
            
            // Display spinner loader 
            showSpinner(true);
            
            // Submit form using helper function
            const result = await signUpTo(event, signupForm);
            
            // Hide spinner loader 
            showSpinner(false);
            if(result?.accessToken){
                // Storing token after successful signup
                window.sessionStorage.setItem('token',result.accessToken);
                navigate('/');
            }else if(result?.accountExist === true){
                setError("Email is already registered.")
            }
        }

        // Adding event listener to form
        signupForm?.addEventListener('submit', handleSignupForm)
        
        return () => {
            // Clean up event listener from form
            signupForm?.removeEventListener('submit', handleSignupForm)
        }
    }, [navigate]);

    return (
        <form className="w-25 border border-dark bg-dark p-4 rounded-3" ref={signupFormRef} noValidate>
            <h4 className="text-center mb-4 text-white text-uppercase">SignUp</h4>

            {/* Input Field */}
            <FormInput type={"text"} text={"Name"} id={'name'} error={"Enter your Name"} name={"username"} />
            <FormInput type={"email"} text={"Email"} id={'email'} error={"Enter your Email"} name={"email"} />
            
            {/* Display error */}
            <div className={`text-danger form-text ${error ? '' : 'd-none' }`} id="error">{error}</div>
            
            {/* Input Field */}
            <FormInput type={"password"} text={"Password"} id={'password'} error={"Enter your Password"} name={"password"} />
            
            {/* Submit button with loading spinner */}
            <SpinnerButton value={"Signup"} spinnerId={"signupSpinner"} spinner={spinner} />
            
            {/* Socail media integeration */}
            <GoogleButton />
            <FacebookButton />
            <p className="text-center text-white">Already have an account <span className="btn p-0 text-warning" onClick={() => { props.setFormState("login") }}>Login</span> </p>
        </form>
    )
}

export default SignUp;