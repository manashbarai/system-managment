import React from 'react'
import './Navbar.css'
import './Responsive.css'

import Logo from './Images/CRM-Logo.svg'
import Dropdown from './Images/Vector .svg'

const Navbar = () => {
    return (
        <>
            <div className='container'>
                <nav className="navbar navbar-expand-lg">
                    <div className="container-fluid">
                        <div className='sl_CompanyLogo'>
                            <img src={Logo} alt="Logo" />
                        </div>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse " id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0 s_Navmiddle">
                                <li className="nav-item">
                                    <a className="nav-link s_Home" aria-current="page" href="/">Home</a>
                                </li>
                                <li className="nav-item dropdown s_solutionDrop">
                                    <a className="nav-link s_Solutions" href="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        Features
                                    </a>
                                    <img src={Dropdown} alt="Dropdown arrow" />
                                    <ul className="dropdown-menu">
                                        <li><a className="dropdown-item" href="/">Sales Enablement</a></li>
                                        <li><a className="dropdown-item" href="/">Analytics & Intelligence</a></li>
                                        <li><a className="dropdown-item" href="/">Productivity</a></li>
                                    </ul>
                                </li>
                                <li className="nav-item">
                                    <a style={{ cursor: 'pointer' }} href='/' className="nav-link s_Aboutus">Blog</a>
                                </li>
                                <li className="nav-item">
                                    <a style={{ cursor: 'pointer' }} href='/' className="nav-link s_Aboutus">About</a>
                                </li>
                                <li className="nav-item">
                                    <a style={{ cursor: 'pointer' }} href='/' className="nav-link s_Aboutus">Pricing</a>
                                </li>
                                <li className="nav-item ">
                                    <a style={{ cursor: 'pointer' }} href='/' className="nav-link s_Contactus">Contact</a>
                                </li>
                            </ul>
                            <form className="d-flex s_Loginbuttons" role="search">
                                <button className="btn s_Login " type="submit">Log In</button>
                                <button className="btn s_Signup " type="submit">Sign Up</button>
                            </form>
                        </div>
                    </div>
                </nav>
            </div>

        </>
    )
}

export default Navbar