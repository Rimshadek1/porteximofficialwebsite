import React from 'react'
import './css/style.css'
import './css/bootstrap.min.css'
import { Link } from 'react-router-dom';
function Header() {
    return (
        <div>
            {/* Navbar Start */}
            <nav className="navbar navbar-expand-lg bg-white navbar-light sticky-top p-0">
                <a href="index.html" className="navbar-brand d-flex align-items-center px-4 px-lg-5">
                    <img src="img/portexim.png" style={{ height: '60%' }} alt="portexim logo" />
                </a>
                <button type="button" className="navbar-toggler me-4" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarCollapse">
                    <div className="navbar-nav ms-auto p-4 p-lg-0">
                        <Link to="/home" className="nav-item nav-link">Home</Link>
                        <Link to="/booking" className="nav-item nav-link">Items to Export</Link>
                        <Link to="/about" className="nav-item nav-link">About</Link>
                        <Link to="/itemtoexport" className="nav-item nav-link">Cartitems</Link>
                    </div>
                </div>
            </nav >
            {/* Navbar End */}
        </div >
    )
}

export default Header