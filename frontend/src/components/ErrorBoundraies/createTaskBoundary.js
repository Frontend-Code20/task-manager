import React from "react";
import { Link } from "react-router";

class CreateTaskBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false
        }
    }

    static getDerivedStateFromError(error) {
        return { hasError: true }
    }
    componentDidCatch(error, errorInfo) {
        console.log(error, errorInfo)
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="w-100 h-100 d-flex justify-content-center align-items-center">
                    <div className="d-flex flex-column align-items-center">
                        <h2>Something went wrong</h2>
                        <Link to={'/'} className="btn btn-primary">Go To Dashboard</Link>
                    </div>
                </div>
            )
        }
        return this.props.children;
    }

}

export default CreateTaskBoundary;