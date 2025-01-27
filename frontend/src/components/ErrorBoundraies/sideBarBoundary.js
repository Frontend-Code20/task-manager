import React from "react";

class SideBarBoundary extends React.Component {
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
        console.log(error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="w-100 h-100 d-flex justify-content-center align-items-center">
                    <p>Something went wrong</p>
                </div>
            )
        }
        return this.props.children;
    }
}

export default SideBarBoundary;