import FormInput from "./formInput";

function SignUp(props) {
    return (
        <form className="w-25 border border-dark p-4 rounded-3">
            <h4 className="text-center mb-4 text-white text-uppercase">SignUp</h4>
            <FormInput text={"Name"} id={'name'} error={"Enter your Name"} />
            <FormInput text={"Email"} id={'email'} error={"Enter your Email"} />
            <FormInput text={"Password"} id={'password'} error={"Enter your Password"} />
            <input type="submit" value={"Signup"} className="btn btn-outline-success text-white w-100 mb-3" />
            <div className="btn btn-danger w-100 d-flex justify-content-around mb-2">
                <img src="./assets/icons/google.png" style={{ width: "24px", hieght: "24px" }} alt="google icon" />
                <span className="">Contine with Google</span>
            </div>
            <div className="btn btn-primary w-100 d-flex justify-content-around mb-3">
                <img src="./assets/icons/facebook.png" style={{ width: "24px", hieght: "24px" }} alt="google icon" />
                <span className="">Contine with Facebook</span>
            </div>
            <p className="text-center text-white">Already have an account <span className="btn p-0 text-warning" onClick={() => { props.setFormState("login") }}>Login</span> </p>
        </form>
    )
}

export default SignUp;