import { Outlet, useNavigate } from "react-router";
import { useEffect } from "react";

// Importing components
import Header from "./header";
import SideBar from "./sidebar";
import SideBarBoundary from "../ErrorBoundraies/sideBarBoundary";

// Layout component that renders app content
function Layout() {

    const token = window.sessionStorage.getItem('token');
    const navigate = useNavigate();
    useEffect(() => {

        if (!token) {
            navigate('login');
        }

    }, [token, navigate])

    if (!token) {
        return null;
    }

    return (
        <div className="w-100" style={{ height: "100%", backgroundColor: "#EDF7FC" }}>

            {/* App Header */}
            <Header />
            <div className="row h-100 g-0 position-relative">
                <div className="col col-lg-3 col-sm-1 h-100 position-relative">

                    {/* Sidebar with error boundary */}
                    <SideBarBoundary>
                        <SideBar />
                    </SideBarBoundary>
                </div>
                <div className="col-11 col-lg-9 p-0 h-100 pb-5 position-relative overflow-auto">
                    <div className="position-sticky top-0 start-0 w-100 z-1" id="taskAlert"></div>

                    {/* Display components based on rootes */}
                    {<Outlet />}
                </div>
                <div className="position-absolute opacity-50 top-0 start-0 w-100 h-100 bg-dark z-3 d-flex justify-content-center align-items-center d-none" id="mainLoader">
                    <div className="spinner-border text-primary">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Layout;