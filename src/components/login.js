import {  useNavigate } from "react-router";
import FormInput from "./formInput";

function Login(props) {
    const navigate = useNavigate();
    return (
        <form className="w-25 border border-dark p-4 rounded-3">
            <h4 className="text-center mb-4 text-white text-uppercase">Login</h4>
            <FormInput text={"Email"} id={'email'} error={"Enter your email"} />
            <FormInput text={"Password"} id={'password'} error={"Enter your password"} />
            <input type="submit" value={"Login"} className="btn btn-outline-secondary text-white w-100 mb-3" onClick={(event) => {event.preventDefault(); window.localStorage.setItem('token',""); navigate('/')}} />
            <div className="btn btn-danger w-100 d-flex justify-content-around mb-2">
                <img src="./assets/icons/google.png" style={{width:"24px", hieght: "24px"}} alt="google icon" />
                <span className="">Contine with Google</span>  
            </div>
            <div className="btn btn-primary w-100 d-flex justify-content-around mb-3">
                <img src="./assets/icons/facebook.png" style={{width:"24px", hieght: "24px"}} alt="google icon" />
                <span className="">Contine with Facebook</span>  
            </div>
            <p className="text-center text-white">Don't have an account <span className="btn p-0 text-warning" onClick={() => {props.setFormState("Signup")}}>Signup</span> </p>
        </form>
    )
}

export default Login;