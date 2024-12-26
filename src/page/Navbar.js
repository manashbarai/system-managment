import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { DataStorage } from '../context/useCotext';
import Logo from './Images/Finreify-CRM.webp';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Import Bootstrap JavaScript


import './Navbar.css';

const Navbar = () => {
    const { myProfile } = DataStorage();

    const [profileType, setProfileType] = useState("")
    const navigate = useNavigate();


    useEffect(() => {

        if (myProfile.companyRole) setProfileType("company")
        else if (myProfile.userRole) setProfileType("user")
    }, [myProfile]);

    const handleClick = () => {
        navigate('/login');
    };

    return (
        <>
            <div className='p-2 container'>
                <nav className="navbar navbar-expand-lg">
                    <div className="container-fluid">
                        <div className='sl_CompanyLogo' onClick={() => navigate("/")}>
                            <img src={Logo} alt="Logo" />
                        </div>
                        {!myProfile.userRole && <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>}
                        <div className="collapse navbar-collapse " id="navbarSupportedContent">

                            {!myProfile.userRole ?  <ul className="navbar-nav me-auto mb-2 mb-lg-0 s_Navmiddle">
                                <li className="nav-item">
                                    <NavLink exact to="/" className="nav-link s_Home">Home</NavLink>
                                </li>
                                <li className="nav-item dropdown">
                                    <button className="nav-link dropdown-toggle s_Solutions" id="navbarDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                                        FEATURES
                                    </button>
                                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <li><button className="dropdown-item" onClick={() => navigate("/sales")}>Sales Enablement</button></li>
                                        <li><button className="dropdown-item" onClick={() => navigate("/analysis")}>Analytics & Intelligence</button></li>
                                        <li><button className="dropdown-item" onClick={() => navigate("/productivity")}>Productivity</button></li>
                                    </ul>
                                </li>

                                <li className="nav-item">
                                    <NavLink to="/blog" className="nav-link s_Aboutus">Blog</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/about" className="nav-link s_Aboutus">About</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/price" className="nav-link s_Aboutus">Pricing</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/contact" className="nav-link s_Contactus">Contact</NavLink>
                                </li>
                            </ul> : <ul className='s_Navmiddle'> </ul>}
                            <div className="d-flex s_Loginbuttons d-flex align-items-center position-relative" role="search">


                                {profileType === "company" && <button typeof='button' className="btn s_Login border-0" type="submit" >  {myProfile.companyRole && myProfile.companyName} </button>}
                                {profileType === "user" && <button typeof='button' className="btn s_Login border-0" type="submit">  {myProfile.user && myProfile.fullName} </button>}
                                {profileType === "" && <button typeof='button' className="btn s_Login border-0" type="submit" onClick={handleClick} >Log In </button>}








                                {profileType === "" && <button className="btn s_Signup" onClick={() => navigate("/requestDemo")} >Sign Up</button>}
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        </>
    )
}

export default Navbar;
