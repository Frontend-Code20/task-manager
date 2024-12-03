
function Header() {
    return (
        <nav className="navbar bg-warning" style={{ backgroundColor: "#F78C6A" }}>
            <div className="container">
                <div className="narbar-brand">
                    <img src="./assets/icons/logo.png" alt="site icon" className="me-4" width={"32px"} height={"32px"} />
                    Task Manager
                </div>
                <form role="search" className="w-50">
                    <input type="search" className="form-control" placeholder="Search" aria-label="search"/>
                </form>
                <div className="d-flex">
                    <img src="./assets/icons/add.png" className="me-3" width={"32px"} height={"32px"} alt="Quick add new task"/>
                    <h5>Usama</h5>
                </div>
            </div>
        </nav>
    )
}

export default Header;