import { Outlet, useNavigate } from "react-router";
import Header from "./header";
import BarContent from "./barContent";
import { useEffect } from "react";
import '../css/custom.css';

function Layout() {

    const token = window.sessionStorage.getItem('token') || window.localStorage.getItem('token');
    const navigate = useNavigate();
    useEffect(() => {

        if (token) {
            navigate('login');
        }

    }, [token, navigate])

    if (token) {
        return null;
    }

    return (
        <div className="w-100" style={{height: "100%", backgroundColor: "#EDF7FC"}}>
            <Header />
            <div className="row h-100 g-0">
                <div className="col-3 h-100 ">
                    <BarContent />
                </div>
                <div className="col-9 p-0 h-100 pb-5">
                    {<Outlet />}
                </div>
            </div>
        </div>
    )
}

export default Layout;