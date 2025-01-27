import React from "react";

class DashboardBoundary extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            hasError: false
        }
    }

    static getDerivedStateFromError(error){
        return {hasError: true}
    }

    componentDidCatch(error, errorInfo){
        console.log(error, errorInfo)
    }

    render(){
        if(this.state.hasError){
            return (
                <div>
                    <p>Something went wrong.</p>
                </div>
            )
        }
        return this.props.children;
    }
}

export default DashboardBoundary;