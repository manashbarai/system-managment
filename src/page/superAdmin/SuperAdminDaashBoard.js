import React, { useEffect, useState } from 'react'
import DashBoardSuper from '../../component/DashBoardSuper';
import { DataStorage } from '../../context/useCotext';
import { useNavigate } from 'react-router-dom';
import CallDuration from '../../component/callDuration/CallDuration';
import Status from '../../component/Status';
import MyTeamOnlyShow from '../../component/team/MyTeamOnlyShow';
import CreateUser from './CreateUser';
import './Button.css'
import Changepassword from '../../settings/Changepassword'

import LiveFeed1 from '../../component/liveFeed/LiveFeed1';
import axios from 'axios';
import SuperAdminApiKeySetting from './SuperAdminApiKeySetting';
import GeneralSetting from './GeneralSetting';
import ChartDashboard from './dashBoardPanel/ChartDashboard';
import Report from '../../component/reports/Report';


const SuperAdminDaashBoard = () => {
    const navigate = useNavigate();
    const { allAdmin, normalUser, myProfile, blockUser, team, statusWithCounts, getLeadAccordingStatus, totalStatusWithMonth, totalLeadsCount, allUser, mySuperTeam } = DataStorage();

    const [searchLead, setSearchLead] = useState("")
    useEffect(() => {
        // Check user role and navigate if needed
        if (myProfile.userRole !== '1') {
            navigate("/login");
        }
    }, [myProfile.userRole, navigate]);

    const [myteamAdmin, setMyteamAdmin] = useState(false);
    const [userCallingDuration, setUserCallingDuration] = useState(false);
    const [userCallDuration, setUserCallDuration] = useState("");
    const [userNameForCallDuration, setUserNameForCallDuration] = useState("");
    const [userLists, setUserLists] = useState([]);
    const [setting, setSetting] = useState("generalSetting");
    const [userRole, setUserRole] = useState("7");
    const [mobileMenu, setMobileMenu] = useState("mobileBorder displayShow largerDisplay");

    const option = (e, notClose) => {
        setUserRole(e);
        setMyTeam([]);
        setAdminProfile("");

        if (!notClose) {
            setMyteamAdmin(false);
        }
    };

    const [myTeamUser, setMyTeamUser] = useState("");
    const [teamAdminMatch, setTeamAdminMatch] = useState("AdminID");
    const [adminProfile, setAdminProfile] = useState("");
    const [myTeam, setMyTeam] = useState([]);

    const teamAdmin = (id) => {
        setTeamAdminMatch(id);
    };

    const teamLeadId = (leads) => {
        setMyTeam([]);
    };



    const openAdminProfileuser = (id) => {
        if (adminProfile === id) {
            setAdminProfile("");
        } else {
            setAdminProfile(id);
            taemmember(id);
        }
    };
    const myteamAdminfunction = () => {
        myteamAdmin === true ? setMyteamAdmin(false) : setMyteamAdmin(true)

    }
    const taemmember = (id) => {
        let newTeam = team.find((e) => e.adminId === id);

        if (newTeam !== undefined) {
            const matchingObjects = normalUser.filter((obj1) => newTeam.user.some((obj2) => obj1._id === obj2));
            setMyTeam(matchingObjects);
        }
    };

    const [mobileMenucross, setMobileMenucross] = useState(false)
    const showMobileMenu = () => {
        if (mobileMenu === "mobileBorder displayShow largerDisplay") {
            setMobileMenu("mobileBorder disPlayNone largerDisplay")
            setMobileMenucross(true)
        } else {
            setMobileMenu("mobileBorder displayShow largerDisplay")
            setMobileMenucross(false)
        }
        //    document.querySelector('.mobileBorder').style.border='50px solid blue'

    };



    return (
        <>
            <div className='crmBody'>

                <div className="jobSearchBody container-lg">

                    <div className=' mobileMenuBtn'>
                        <div className='d-lg-none' onClick={showMobileMenu}  >
                            {mobileMenucross ? <img style={{ border: '1px solid #000', borderRadius: '4px', padding: '10px' }} src={require("../admin/images/bars-solid.svg").default} alt='icon' /> : <div style={{ background: 'var(--text-theme-color)' }} className=' text-white p-2 px-3'>
                                X
                            </div>

                            }
                        </div>
                    </div>

                    <div className="container container-md container-sm d-block d-lg-flex justify-content-between  d-md-block d-sm-block     ">

                        <div className={mobileMenu}>






                            <div style={{ background: "" }} className=' d-flex flex-column   '>

                                <div style={{ background: userRole === "7" ? "#5F498A" : "#fff" }} className='d-flex px-4 mb-1 position-relative'>
                                    <button style={{ color: userRole === "7" ? "#fff" : "#919191", background: "transparent" }} className="live-button px-3" onClick={() => option("7")} >
                                        Live Feed

                                    </button>
                                    <div className="red-light"></div>
                                </div>
                                <div style={{ background: userRole === "searchLead" ? "#5F498A" : "#fff" }} className='jobSeekerOption  px-3 py-1  position-relative d-flex align-items-center' >

                                    {userRole === "searchLead" ? <button type='button' style={{ right: "18px", width: "25px", height: "25px", transform: "translate(0, 0)", verticalAlign: "top", cursor: "pointer" }} className='position-absolute   px-1 bg-transparent border-0' onClick={() => {
                                        sessionStorage.setItem("setLeadStatus", 1)
                                        statusWithCounts(`${process.env.REACT_APP_API}allLeadCount?name=${searchLead}`)

                                        getLeadAccordingStatus(`${process.env.REACT_APP_API}allLeads?limit=10&page=1&name=${searchLead}&status=1&superTeamId=${mySuperTeam._id}`)
                                    }} >


                                        <img style={{ width: "100%", height: "100%" }} src="../../images/searchWhite.svg" alt="" />



                                    </button> : <span >
                                        <img src="../../images/searchIcon.svg" alt="" />
                                    </span>}



                                    {userRole === "searchLead" ? <input onChange={(e) => setSearchLead(e.target.value)} style={{ width: "84%", paddingLeft: "5px", border: "none", outline: "none", borderRadius: '4px' }} type="text" placeholder='Search Leads' /> : <button style={{ color: userRole === "searchLead" ? "#fff" : "#919191", background: "transparent", fontSize: "18px" }} className='border-0 py-2 px-2 ' onClick={() => {
                                        option("searchLead")
                                        sessionStorage.setItem("setLeadStatus", 1)
                                        statusWithCounts(`${process.env.REACT_APP_API}allLeadCount`)
                                        // sessionStorage.setItem('leadSearchText', "") 

                                        getLeadAccordingStatus(`${process.env.REACT_APP_API}allLeads?limit=10&page=1&superTeamId=${mySuperTeam._id}&status=1`)
                                        //scrollToTop()


                                    }} >Search Leads  </button>}

                                </div>
                                <div style={{ background: userRole === "dashBoard" ? "#5F498A" : "#fff" }} className='jobSeekerOption py-2 gap-2  d-flex  px-3   ' >
                                    {
                                        userRole === "dashBoard" ? <span >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M3.48225 9.81609e-08H4.76775C5.21865 -3.50184e-06 5.58232 -7.21648e-06 5.87835 0.0193824C6.1827 0.0393192 6.45187 0.0813494 6.70673 0.182689C7.31929 0.426276 7.80596 0.893484 8.05969 1.48154C8.16525 1.7262 8.20905 1.98461 8.22983 2.27678C8.25 2.56097 8.25 2.9101 8.25 3.34296V4.57704C8.25 5.0099 8.25 5.35907 8.22983 5.64322C8.20905 5.93539 8.16525 6.1938 8.05969 6.43846C7.80596 7.02652 7.31929 7.49372 6.70673 7.7373C6.45187 7.83864 6.1827 7.88069 5.87835 7.90063C5.58232 7.92 5.21865 7.92 4.76775 7.92H3.48225C3.03135 7.92 2.66768 7.92 2.37165 7.90063C2.0673 7.88069 1.79813 7.83864 1.54328 7.7373C0.930713 7.49372 0.444038 7.02652 0.190301 6.43846C0.0847389 6.1938 0.0409575 5.93539 0.02019 5.64322C-7.51717e-06 5.35903 -3.64775e-06 5.0099 1.02251e-07 4.57704V3.34296C-3.64775e-06 2.9101 -7.51717e-06 2.56097 0.02019 2.27678C0.0409575 1.98461 0.0847389 1.7262 0.190301 1.48154C0.444038 0.893484 0.930713 0.426276 1.54328 0.182689C1.79813 0.0813494 2.0673 0.0393192 2.37165 0.0193824C2.66768 -7.21648e-06 3.03135 -3.50184e-06 3.48225 9.81609e-08ZM2.43971 0.977148C2.18625 0.993744 2.03865 1.02481 1.92596 1.0696C1.55843 1.21576 1.26641 1.49609 1.11416 1.84892C1.06751 1.9571 1.03515 2.0988 1.01786 2.34212C1.00028 2.58977 1.00001 2.90614 1.00001 3.35999V4.56001C1.00001 5.01386 1.00028 5.33023 1.01786 5.57788C1.03515 5.8212 1.06751 5.9629 1.11416 6.07108C1.26641 6.42391 1.55843 6.70424 1.92596 6.8504C2.03865 6.89519 2.18625 6.92626 2.43971 6.94285C2.69768 6.95974 3.02722 6.95999 3.49999 6.95999H4.75001C5.22277 6.95999 5.55233 6.95974 5.81029 6.94285C6.06375 6.92626 6.21135 6.89519 6.32404 6.8504C6.69157 6.70424 6.98359 6.42391 7.13584 6.07108C7.18249 5.9629 7.21485 5.8212 7.23214 5.57788C7.24972 5.33023 7.24999 5.01386 7.24999 4.56001V3.35999C7.24999 2.90614 7.24972 2.58977 7.23214 2.34212C7.21485 2.0988 7.18249 1.9571 7.13584 1.84892C6.98359 1.49609 6.69157 1.21576 6.32404 1.0696C6.21135 1.02481 6.06375 0.993744 5.81029 0.977148C5.55233 0.960264 5.22277 0.960012 4.75001 0.960012H3.49999C3.02722 0.960012 2.69768 0.960264 2.43971 0.977148ZM3.48225 9.36H4.76775C5.21865 9.36 5.58232 9.36 5.87835 9.37937C6.1827 9.39931 6.45187 9.44136 6.70673 9.5427C7.31929 9.78628 7.80596 10.2535 8.05969 10.8415C8.16525 11.0862 8.20905 11.3446 8.22983 11.6368C8.25 11.921 8.25 12.2701 8.25 12.703V13.937C8.25 14.3699 8.25 14.7191 8.22983 15.0032C8.20905 15.2954 8.16525 15.5538 8.05969 15.7985C7.80596 16.3865 7.31929 16.8537 6.70673 17.0973C6.45187 17.1986 6.1827 17.2407 5.87835 17.2606C5.58232 17.28 5.21865 17.28 4.76775 17.28H3.48225C3.03135 17.28 2.66768 17.28 2.37165 17.2606C2.0673 17.2407 1.79813 17.1986 1.54328 17.0973C0.930713 16.8537 0.444038 16.3865 0.190301 15.7985C0.0847389 15.5538 0.0409575 15.2954 0.02019 15.0032C-7.51717e-06 14.719 -3.64775e-06 14.3699 1.02251e-07 13.937V12.703C-3.64775e-06 12.2701 -7.51717e-06 11.921 0.02019 11.6368C0.0409575 11.3446 0.0847389 11.0862 0.190301 10.8415C0.444038 10.2535 0.930713 9.78628 1.54328 9.5427C1.79813 9.44136 2.0673 9.39931 2.37165 9.37937C2.66768 9.36 3.03135 9.36 3.48225 9.36ZM2.43971 10.3371C2.18625 10.3537 2.03865 10.3848 1.92596 10.4296C1.55843 10.5758 1.26641 10.8561 1.11416 11.2089C1.06751 11.3171 1.03515 11.4588 1.01786 11.7021C1.00028 11.9498 1.00001 12.2661 1.00001 12.72V13.92C1.00001 14.3739 1.00028 14.6902 1.01786 14.9379C1.03515 15.1812 1.06751 15.3229 1.11416 15.4311C1.26641 15.7839 1.55843 16.0642 1.92596 16.2104C2.03865 16.2552 2.18625 16.2863 2.43971 16.3029C2.69768 16.3197 3.02722 16.32 3.49999 16.32H4.75001C5.22277 16.32 5.55233 16.3197 5.81029 16.3029C6.06375 16.2863 6.21135 16.2552 6.32404 16.2104C6.69157 16.0642 6.98359 15.7839 7.13584 15.4311C7.18249 15.3229 7.21485 15.1812 7.23214 14.9379C7.24972 14.6902 7.24999 14.3739 7.24999 13.92V12.72C7.24999 12.2661 7.24972 11.9498 7.23214 11.7021C7.21485 11.4588 7.18249 11.3171 7.13584 11.2089C6.98359 10.8561 6.69157 10.5758 6.32404 10.4296C6.21135 10.3848 6.06375 10.3537 5.81029 10.3371C5.55233 10.3203 5.22277 10.32 4.75001 10.32H3.49999C3.02722 10.32 2.69768 10.3203 2.43971 10.3371ZM13.2323 9.81609e-08H14.5177C14.9686 -3.50184e-06 15.3323 -7.21648e-06 15.6283 0.0193824C15.9327 0.0393192 16.2019 0.0813494 16.4567 0.182689C17.0693 0.426276 17.556 0.893484 17.8097 1.48154C17.9153 1.7262 17.9591 1.98461 17.9798 2.27678C18 2.56097 18 2.9101 18 3.34296V4.57704C18 5.0099 18 5.35907 17.9798 5.64322C17.9591 5.93539 17.9153 6.1938 17.8097 6.43846C17.556 7.02652 17.0693 7.49372 16.4567 7.7373C16.2019 7.83864 15.9327 7.88069 15.6283 7.90063C15.3323 7.92 14.9686 7.92 14.5177 7.92H13.2323C12.7814 7.92 12.4177 7.92 12.1217 7.90063C11.8173 7.88069 11.5481 7.83864 11.2933 7.7373C10.6807 7.49372 10.194 7.02652 9.94031 6.43846C9.83475 6.1938 9.79095 5.93539 9.77017 5.64322C9.75 5.35903 9.75 5.0099 9.75 4.57704V3.34296C9.75 2.9101 9.75 2.56097 9.77017 2.27678C9.79095 1.98461 9.83475 1.7262 9.94031 1.48154C10.194 0.893484 10.6807 0.426276 11.2933 0.182689C11.5481 0.0813494 11.8173 0.0393192 12.1217 0.0193824C12.4177 -7.21648e-06 12.7814 -3.50184e-06 13.2323 9.81609e-08ZM12.1897 0.977148C11.9363 0.993744 11.7886 1.02481 11.676 1.0696C11.3084 1.21576 11.0164 1.49609 10.8642 1.84892C10.8175 1.9571 10.7851 2.0988 10.7679 2.34212C10.7503 2.58977 10.75 2.90614 10.75 3.35999V4.56001C10.75 5.01386 10.7503 5.33023 10.7679 5.57788C10.7851 5.8212 10.8175 5.9629 10.8642 6.07108C11.0164 6.42391 11.3084 6.70424 11.676 6.8504C11.7886 6.89519 11.9363 6.92626 12.1897 6.94285C12.4477 6.95974 12.7772 6.95999 13.25 6.95999H14.5C14.9728 6.95999 15.3023 6.95974 15.5603 6.94285C15.8137 6.92626 15.9614 6.89519 16.074 6.8504C16.4416 6.70424 16.7336 6.42391 16.8858 6.07108C16.9325 5.9629 16.9649 5.8212 16.9821 5.57788C16.9997 5.33023 17 5.01386 17 4.56001V3.35999C17 2.90614 16.9997 2.58977 16.9821 2.34212C16.9649 2.0988 16.9325 1.9571 16.8858 1.84892C16.7336 1.49609 16.4416 1.21576 16.074 1.0696C15.9614 1.02481 15.8137 0.993744 15.5603 0.977148C15.3023 0.960264 14.9728 0.960012 14.5 0.960012H13.25C12.7772 0.960012 12.4477 0.960264 12.1897 0.977148ZM13.2323 9.36H14.5177C14.9686 9.36 15.3323 9.36 15.6283 9.37937C15.9327 9.39931 16.2019 9.44136 16.4567 9.5427C17.0693 9.78628 17.556 10.2535 17.8097 10.8415C17.9153 11.0862 17.9591 11.3446 17.9798 11.6368C18 11.921 18 12.2701 18 12.703V13.937C18 14.3699 18 14.7191 17.9798 15.0032C17.9591 15.2954 17.9153 15.5538 17.8097 15.7985C17.556 16.3865 17.0693 16.8537 16.4567 17.0973C16.2019 17.1986 15.9327 17.2407 15.6283 17.2606C15.3323 17.28 14.9686 17.28 14.5177 17.28H13.2323C12.7814 17.28 12.4177 17.28 12.1217 17.2606C11.8173 17.2407 11.5481 17.1986 11.2933 17.0973C10.6807 16.8537 10.194 16.3865 9.94031 15.7985C9.83475 15.5538 9.79095 15.2954 9.77017 15.0032C9.75 14.719 9.75 14.3699 9.75 13.937V12.703C9.75 12.2701 9.75 11.921 9.77017 11.6368C9.79095 11.3446 9.83475 11.0862 9.94031 10.8415C10.194 10.2535 10.6807 9.78628 11.2933 9.5427C11.5481 9.44136 11.8173 9.39931 12.1217 9.37937C12.4177 9.36 12.7814 9.36 13.2323 9.36ZM12.1897 10.3371C11.9363 10.3537 11.7886 10.3848 11.676 10.4296C11.3084 10.5758 11.0164 10.8561 10.8642 11.2089C10.8175 11.3171 10.7851 11.4588 10.7679 11.7021C10.7503 11.9498 10.75 12.2661 10.75 12.72V13.92C10.75 14.3739 10.7503 14.6902 10.7679 14.9379C10.7851 15.1812 10.8175 15.3229 10.8642 15.4311C11.0164 15.7839 11.3084 16.0642 11.676 16.2104C11.7886 16.2552 11.9363 16.2863 12.1897 16.3029C12.4477 16.3197 12.7772 16.32 13.25 16.32H14.5C14.9728 16.32 15.3023 16.3197 15.5603 16.3029C15.8137 16.2863 15.9614 16.2552 16.074 16.2104C16.4416 16.0642 16.7336 15.7839 16.8858 15.4311C16.9325 15.3229 16.9649 15.1812 16.9821 14.9379C16.9997 14.6902 17 14.3739 17 13.92V12.72C17 12.2661 16.9997 11.9498 16.9821 11.7021C16.9649 11.4588 16.9325 11.3171 16.8858 11.2089C16.7336 10.8561 16.4416 10.5758 16.074 10.4296C15.9614 10.3848 15.8137 10.3537 15.5603 10.3371C15.3023 10.3203 14.9728 10.32 14.5 10.32H13.25C12.7772 10.32 12.4477 10.3203 12.1897 10.3371Z" fill="white" />
                                            </svg>
                                        </span> : <span >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M3.48225 9.81609e-08H4.76775C5.21865 -3.50184e-06 5.58232 -7.21648e-06 5.87835 0.0193824C6.1827 0.0393192 6.45187 0.0813494 6.70673 0.182689C7.31929 0.426276 7.80596 0.893484 8.05969 1.48154C8.16525 1.7262 8.20905 1.98461 8.22983 2.27678C8.25 2.56097 8.25 2.9101 8.25 3.34296V4.57704C8.25 5.0099 8.25 5.35907 8.22983 5.64322C8.20905 5.93539 8.16525 6.1938 8.05969 6.43846C7.80596 7.02652 7.31929 7.49372 6.70673 7.7373C6.45187 7.83864 6.1827 7.88069 5.87835 7.90063C5.58232 7.92 5.21865 7.92 4.76775 7.92H3.48225C3.03135 7.92 2.66768 7.92 2.37165 7.90063C2.0673 7.88069 1.79813 7.83864 1.54328 7.7373C0.930713 7.49372 0.444038 7.02652 0.190301 6.43846C0.0847389 6.1938 0.0409575 5.93539 0.02019 5.64322C-7.51717e-06 5.35903 -3.64775e-06 5.0099 1.02251e-07 4.57704V3.34296C-3.64775e-06 2.9101 -7.51717e-06 2.56097 0.02019 2.27678C0.0409575 1.98461 0.0847389 1.7262 0.190301 1.48154C0.444038 0.893484 0.930713 0.426276 1.54328 0.182689C1.79813 0.0813494 2.0673 0.0393192 2.37165 0.0193824C2.66768 -7.21648e-06 3.03135 -3.50184e-06 3.48225 9.81609e-08ZM2.43971 0.977148C2.18625 0.993744 2.03865 1.02481 1.92596 1.0696C1.55843 1.21576 1.26641 1.49609 1.11416 1.84892C1.06751 1.9571 1.03515 2.0988 1.01786 2.34212C1.00028 2.58977 1.00001 2.90614 1.00001 3.35999V4.56001C1.00001 5.01386 1.00028 5.33023 1.01786 5.57788C1.03515 5.8212 1.06751 5.9629 1.11416 6.07108C1.26641 6.42391 1.55843 6.70424 1.92596 6.8504C2.03865 6.89519 2.18625 6.92626 2.43971 6.94285C2.69768 6.95974 3.02722 6.95999 3.49999 6.95999H4.75001C5.22277 6.95999 5.55233 6.95974 5.81029 6.94285C6.06375 6.92626 6.21135 6.89519 6.32404 6.8504C6.69157 6.70424 6.98359 6.42391 7.13584 6.07108C7.18249 5.9629 7.21485 5.8212 7.23214 5.57788C7.24972 5.33023 7.24999 5.01386 7.24999 4.56001V3.35999C7.24999 2.90614 7.24972 2.58977 7.23214 2.34212C7.21485 2.0988 7.18249 1.9571 7.13584 1.84892C6.98359 1.49609 6.69157 1.21576 6.32404 1.0696C6.21135 1.02481 6.06375 0.993744 5.81029 0.977148C5.55233 0.960264 5.22277 0.960012 4.75001 0.960012H3.49999C3.02722 0.960012 2.69768 0.960264 2.43971 0.977148ZM3.48225 9.36H4.76775C5.21865 9.36 5.58232 9.36 5.87835 9.37937C6.1827 9.39931 6.45187 9.44136 6.70673 9.5427C7.31929 9.78628 7.80596 10.2535 8.05969 10.8415C8.16525 11.0862 8.20905 11.3446 8.22983 11.6368C8.25 11.921 8.25 12.2701 8.25 12.703V13.937C8.25 14.3699 8.25 14.7191 8.22983 15.0032C8.20905 15.2954 8.16525 15.5538 8.05969 15.7985C7.80596 16.3865 7.31929 16.8537 6.70673 17.0973C6.45187 17.1986 6.1827 17.2407 5.87835 17.2606C5.58232 17.28 5.21865 17.28 4.76775 17.28H3.48225C3.03135 17.28 2.66768 17.28 2.37165 17.2606C2.0673 17.2407 1.79813 17.1986 1.54328 17.0973C0.930713 16.8537 0.444038 16.3865 0.190301 15.7985C0.0847389 15.5538 0.0409575 15.2954 0.02019 15.0032C-7.51717e-06 14.719 -3.64775e-06 14.3699 1.02251e-07 13.937V12.703C-3.64775e-06 12.2701 -7.51717e-06 11.921 0.02019 11.6368C0.0409575 11.3446 0.0847389 11.0862 0.190301 10.8415C0.444038 10.2535 0.930713 9.78628 1.54328 9.5427C1.79813 9.44136 2.0673 9.39931 2.37165 9.37937C2.66768 9.36 3.03135 9.36 3.48225 9.36ZM2.43971 10.3371C2.18625 10.3537 2.03865 10.3848 1.92596 10.4296C1.55843 10.5758 1.26641 10.8561 1.11416 11.2089C1.06751 11.3171 1.03515 11.4588 1.01786 11.7021C1.00028 11.9498 1.00001 12.2661 1.00001 12.72V13.92C1.00001 14.3739 1.00028 14.6902 1.01786 14.9379C1.03515 15.1812 1.06751 15.3229 1.11416 15.4311C1.26641 15.7839 1.55843 16.0642 1.92596 16.2104C2.03865 16.2552 2.18625 16.2863 2.43971 16.3029C2.69768 16.3197 3.02722 16.32 3.49999 16.32H4.75001C5.22277 16.32 5.55233 16.3197 5.81029 16.3029C6.06375 16.2863 6.21135 16.2552 6.32404 16.2104C6.69157 16.0642 6.98359 15.7839 7.13584 15.4311C7.18249 15.3229 7.21485 15.1812 7.23214 14.9379C7.24972 14.6902 7.24999 14.3739 7.24999 13.92V12.72C7.24999 12.2661 7.24972 11.9498 7.23214 11.7021C7.21485 11.4588 7.18249 11.3171 7.13584 11.2089C6.98359 10.8561 6.69157 10.5758 6.32404 10.4296C6.21135 10.3848 6.06375 10.3537 5.81029 10.3371C5.55233 10.3203 5.22277 10.32 4.75001 10.32H3.49999C3.02722 10.32 2.69768 10.3203 2.43971 10.3371ZM13.2323 9.81609e-08H14.5177C14.9686 -3.50184e-06 15.3323 -7.21648e-06 15.6283 0.0193824C15.9327 0.0393192 16.2019 0.0813494 16.4567 0.182689C17.0693 0.426276 17.556 0.893484 17.8097 1.48154C17.9153 1.7262 17.9591 1.98461 17.9798 2.27678C18 2.56097 18 2.9101 18 3.34296V4.57704C18 5.0099 18 5.35907 17.9798 5.64322C17.9591 5.93539 17.9153 6.1938 17.8097 6.43846C17.556 7.02652 17.0693 7.49372 16.4567 7.7373C16.2019 7.83864 15.9327 7.88069 15.6283 7.90063C15.3323 7.92 14.9686 7.92 14.5177 7.92H13.2323C12.7814 7.92 12.4177 7.92 12.1217 7.90063C11.8173 7.88069 11.5481 7.83864 11.2933 7.7373C10.6807 7.49372 10.194 7.02652 9.94031 6.43846C9.83475 6.1938 9.79095 5.93539 9.77017 5.64322C9.75 5.35903 9.75 5.0099 9.75 4.57704V3.34296C9.75 2.9101 9.75 2.56097 9.77017 2.27678C9.79095 1.98461 9.83475 1.7262 9.94031 1.48154C10.194 0.893484 10.6807 0.426276 11.2933 0.182689C11.5481 0.0813494 11.8173 0.0393192 12.1217 0.0193824C12.4177 -7.21648e-06 12.7814 -3.50184e-06 13.2323 9.81609e-08ZM12.1897 0.977148C11.9363 0.993744 11.7886 1.02481 11.676 1.0696C11.3084 1.21576 11.0164 1.49609 10.8642 1.84892C10.8175 1.9571 10.7851 2.0988 10.7679 2.34212C10.7503 2.58977 10.75 2.90614 10.75 3.35999V4.56001C10.75 5.01386 10.7503 5.33023 10.7679 5.57788C10.7851 5.8212 10.8175 5.9629 10.8642 6.07108C11.0164 6.42391 11.3084 6.70424 11.676 6.8504C11.7886 6.89519 11.9363 6.92626 12.1897 6.94285C12.4477 6.95974 12.7772 6.95999 13.25 6.95999H14.5C14.9728 6.95999 15.3023 6.95974 15.5603 6.94285C15.8137 6.92626 15.9614 6.89519 16.074 6.8504C16.4416 6.70424 16.7336 6.42391 16.8858 6.07108C16.9325 5.9629 16.9649 5.8212 16.9821 5.57788C16.9997 5.33023 17 5.01386 17 4.56001V3.35999C17 2.90614 16.9997 2.58977 16.9821 2.34212C16.9649 2.0988 16.9325 1.9571 16.8858 1.84892C16.7336 1.49609 16.4416 1.21576 16.074 1.0696C15.9614 1.02481 15.8137 0.993744 15.5603 0.977148C15.3023 0.960264 14.9728 0.960012 14.5 0.960012H13.25C12.7772 0.960012 12.4477 0.960264 12.1897 0.977148ZM13.2323 9.36H14.5177C14.9686 9.36 15.3323 9.36 15.6283 9.37937C15.9327 9.39931 16.2019 9.44136 16.4567 9.5427C17.0693 9.78628 17.556 10.2535 17.8097 10.8415C17.9153 11.0862 17.9591 11.3446 17.9798 11.6368C18 11.921 18 12.2701 18 12.703V13.937C18 14.3699 18 14.7191 17.9798 15.0032C17.9591 15.2954 17.9153 15.5538 17.8097 15.7985C17.556 16.3865 17.0693 16.8537 16.4567 17.0973C16.2019 17.1986 15.9327 17.2407 15.6283 17.2606C15.3323 17.28 14.9686 17.28 14.5177 17.28H13.2323C12.7814 17.28 12.4177 17.28 12.1217 17.2606C11.8173 17.2407 11.5481 17.1986 11.2933 17.0973C10.6807 16.8537 10.194 16.3865 9.94031 15.7985C9.83475 15.5538 9.79095 15.2954 9.77017 15.0032C9.75 14.719 9.75 14.3699 9.75 13.937V12.703C9.75 12.2701 9.75 11.921 9.77017 11.6368C9.79095 11.3446 9.83475 11.0862 9.94031 10.8415C10.194 10.2535 10.6807 9.78628 11.2933 9.5427C11.5481 9.44136 11.8173 9.39931 12.1217 9.37937C12.4177 9.36 12.7814 9.36 13.2323 9.36ZM12.1897 10.3371C11.9363 10.3537 11.7886 10.3848 11.676 10.4296C11.3084 10.5758 11.0164 10.8561 10.8642 11.2089C10.8175 11.3171 10.7851 11.4588 10.7679 11.7021C10.7503 11.9498 10.75 12.2661 10.75 12.72V13.92C10.75 14.3739 10.7503 14.6902 10.7679 14.9379C10.7851 15.1812 10.8175 15.3229 10.8642 15.4311C11.0164 15.7839 11.3084 16.0642 11.676 16.2104C11.7886 16.2552 11.9363 16.2863 12.1897 16.3029C12.4477 16.3197 12.7772 16.32 13.25 16.32H14.5C14.9728 16.32 15.3023 16.3197 15.5603 16.3029C15.8137 16.2863 15.9614 16.2552 16.074 16.2104C16.4416 16.0642 16.7336 15.7839 16.8858 15.4311C16.9325 15.3229 16.9649 15.1812 16.9821 14.9379C16.9997 14.6902 17 14.3739 17 13.92V12.72C17 12.2661 16.9997 11.9498 16.9821 11.7021C16.9649 11.4588 16.9325 11.3171 16.8858 11.2089C16.7336 10.8561 16.4416 10.5758 16.074 10.4296C15.9614 10.3848 15.8137 10.3537 15.5603 10.3371C15.3023 10.3203 14.9728 10.32 14.5 10.32H13.25C12.7772 10.32 12.4477 10.3203 12.1897 10.3371Z" fill="#919191" />
                                            </svg>
                                        </span>
                                    }

                                    <button className='dashBoardHeading border-0' style={{ color: userRole === "dashBoard" ? "#fff" : "#919191", background: "transparent" }} onClick={() => option("dashBoard")}> Dashboard  </button>
                                </div>





                                <div style={{ height: "auto" }} className='d-flex flex-column  justify-content-between'>



                                    <ul className="list-unstyled "  >

                                        <li style={{ background: userRole === "dura" ? "#5F498A" : "#fff" }} className='jobSeekerOption  px-3  my-2'>

                                            {userRole === "dura" ? <span>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 24 28" fill="none">
                                                    <path d="M12 27C18.0751 27 23 22.0751 23 16C23 9.92487 18.0751 5 12 5C5.92487 5 1 9.92487 1 16C1 22.0751 5.92487 27 12 27Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                    <path d="M12 16L17 11" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                    <path d="M9 1H15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </span> : <span>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 24 28" fill="none">
                                                    <path d="M12 27C18.0751 27 23 22.0751 23 16C23 9.92487 18.0751 5 12 5C5.92487 5 1 9.92487 1 16C1 22.0751 5.92487 27 12 27Z" stroke="#919191" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                    <path d="M12 16L17 11" stroke="#919191" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                    <path d="M9 1H15" stroke="#919191" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </span>}



                                            <button style={{ color: userRole === "dura" ? "#fff" : "#919191", background: "transparent" }} className='border-0 py-2 px-2' onClick={() => {
                                                option("dura")
                                                sessionStorage.setItem("setLeadStatus", 1)
                                                // statusWithCounts(`${process.env.REACT_APP_API}count/superAdminLead_all`)
                                                setUserCallingDuration(false)

                                                sessionStorage.setItem('leadSearchText', "")

                                                // getLeadAccordingStatus(`${process.env.REACT_APP_API}classify_lead/1/${myProfile._id}/${myProfile.userRole}?limit=${sessionStorage.getItem('leadsLimit')}`)
                                            }} >DURA  </button>

                                            <button className='border-0 bg-transparent my-1 float-end' onClick={() => {
                                                userCallingDuration === true ? setUserCallingDuration(false) : setUserCallingDuration(true)
                                                option("dura")
                                            }}  >
                                                {userCallingDuration ? <img style={{ width: "19px" }} src="../../images/upArrow.png" alt="upDirection" /> : <img style={{ width: "19px" }} src="../../images/downArrow.png" alt="downDirection" />}
                                            </button>

                                        </li>
                                        {userCallingDuration === true && <ul className='list-unstyled p-2'>
                                            <input
                                                type="text"

                                                style={{ border: "1px solid rgb(145, 145, 145)" }}
                                                onChange={(e) => {
                                                    const filteredUsers = allUser.filter((user) => {
                                                        return user.fullName.toLowerCase().includes(e.target.value.toLowerCase());
                                                    });
                                                    setUserLists(filteredUsers)
                                                }}
                                            />

                                            {userLists && userLists.length > 0 ? <> {userLists.slice(0, 3).map((user, index) => (
                                                <li key={user._id}>
                                                    <button className='border-0 px-2 w-100 text-start' style={{ background: userCallDuration === user._id ? "#5F498A" : "#fff", color: userCallDuration === user._id ? "#fff" : "rgb(145, 145, 145)" }} onClick={() => {
                                                        option("userCallingDuration");
                                                        setUserCallDuration(user._id);
                                                        setUserNameForCallDuration(user.fullName);
                                                    }}>
                                                        {user.fullName}
                                                    </button>
                                                </li>
                                            ))}</> : <>{
                                                allUser.slice(0, 3).map((user, index) => (
                                                    <li style={{ margin: "2px 0" }} key={user._id}>
                                                        <button className='border-0 px-2 w-100 text-start' style={{ background: userCallDuration === user._id ? "#5F498A" : "#fff", color: userCallDuration === user._id ? "#fff" : "rgb(145, 145, 145)" }} onClick={() => {
                                                            option("userCallingDuration", "userList");
                                                            setUserCallDuration(user._id);
                                                            setUserNameForCallDuration(user.fullName);
                                                        }}>
                                                            {user.fullName}
                                                        </button>
                                                    </li>
                                                ))
                                            } </>}

                                        </ul>}





















































                                        <li style={{ background: userRole === "AllLeads" ? "#5F498A" : "#fff" }} className='jobSeekerOption  px-3  my-2'>

                                            {userRole === "AllLeads" ? <span>



                                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="22" viewBox="0 0 18 22" fill="none">
                                                    <path d="M11 1H3C2.46957 1 1.96086 1.21071 1.58579 1.58579C1.21071 1.96086 1 2.46957 1 3V19C1 19.5304 1.21071 20.0391 1.58579 20.4142C1.96086 20.7893 2.46957 21 3 21H15C15.5304 21 16.0391 20.7893 16.4142 20.4142C16.7893 20.0391 17 19.5304 17 19V7L11 1Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    <path d="M11 1V7H17" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    <path d="M13 12H5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    <path d="M13 16H5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    <path d="M7 8H6H5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </span> : <span>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="22" viewBox="0 0 18 22" fill="none">
                                                    <path d="M11 1H3C2.46957 1 1.96086 1.21071 1.58579 1.58579C1.21071 1.96086 1 2.46957 1 3V19C1 19.5304 1.21071 20.0391 1.58579 20.4142C1.96086 20.7893 2.46957 21 3 21H15C15.5304 21 16.0391 20.7893 16.4142 20.4142C16.7893 20.0391 17 19.5304 17 19V7L11 1Z" stroke="#919191" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    <path d="M11 1V7H17" stroke="#919191" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    <path d="M13 12H5" stroke="#919191" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    <path d="M13 16H5" stroke="#919191" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    <path d="M7 8H6H5" stroke="#919191" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </span>}



                                            <button style={{ color: userRole === "AllLeads" ? "#fff" : "#919191", background: "transparent" }} className='border-0 py-2 px-2' onClick={() => {
                                                option("AllLeads")

                                                sessionStorage.setItem("setLeadStatus", 1)
                                                statusWithCounts(`${process.env.REACT_APP_API}count/leads/${mySuperTeam._id}?userRole=${myProfile.userRole}&myLead=false&aboutStatus=status`)

                                                // let url = sessionStorage.getItem("leadApi")
                                                sessionStorage.setItem('leadSearchText', "")




                                                getLeadAccordingStatus(`${process.env.REACT_APP_API}classify/leads/${mySuperTeam._id}?userRole=${myProfile.userRole}&status=1&limit=${sessionStorage.getItem('leadsLimit') ? sessionStorage.getItem('leadsLimit') : 10}&myLead=false&states=allstate&aboutStatus=status&followUp=false&date=${sessionStorage.getItem('followUpdate')}&page=1`)


                                                //scrollToTop()



                                            }} >All Leads  </button>

                                        </li>
                                        <li style={{ background: userRole === "myLeads" ? "#5F498A" : "#fff" }} className='jobSeekerOption  px-3  my-2'>

                                            {userRole === "myLeads" ? <span>



                                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="22" viewBox="0 0 18 22" fill="none">
                                                    <path d="M11 1H3C2.46957 1 1.96086 1.21071 1.58579 1.58579C1.21071 1.96086 1 2.46957 1 3V19C1 19.5304 1.21071 20.0391 1.58579 20.4142C1.96086 20.7893 2.46957 21 3 21H15C15.5304 21 16.0391 20.7893 16.4142 20.4142C16.7893 20.0391 17 19.5304 17 19V7L11 1Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    <path d="M11 1V7H17" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    <path d="M13 12H5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    <path d="M13 16H5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    <path d="M7 8H6H5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </span> : <span>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="22" viewBox="0 0 18 22" fill="none">
                                                    <path d="M11 1H3C2.46957 1 1.96086 1.21071 1.58579 1.58579C1.21071 1.96086 1 2.46957 1 3V19C1 19.5304 1.21071 20.0391 1.58579 20.4142C1.96086 20.7893 2.46957 21 3 21H15C15.5304 21 16.0391 20.7893 16.4142 20.4142C16.7893 20.0391 17 19.5304 17 19V7L11 1Z" stroke="#919191" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    <path d="M11 1V7H17" stroke="#919191" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    <path d="M13 12H5" stroke="#919191" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    <path d="M13 16H5" stroke="#919191" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    <path d="M7 8H6H5" stroke="#919191" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </span>}



                                            <button style={{ color: userRole === "myLeads" ? "#fff" : "#919191", background: "transparent" }} className='border-0 py-2 px-2' onClick={() => {
                                                option("myLeads")
                                                sessionStorage.setItem("setLeadStatus", 1)
                                                statusWithCounts(`${process.env.REACT_APP_API}count/leads/${mySuperTeam._id}/?userRole=${myProfile.userRole}&myLead=true&aboutStatus=status`)
                                                sessionStorage.setItem('leadSearchText', "")

                                                getLeadAccordingStatus(`${process.env.REACT_APP_API}classify/leads/${mySuperTeam._id}?userRole=${myProfile.userRole}&status=1&limit=${sessionStorage.getItem('leadsLimit') ? sessionStorage.getItem('leadsLimit') : 10}&myLead=true&states=allstate&aboutStatus=status&followUp=false&page=1`)
                                                //scrollToTop()

                                            }} >My Leads  </button>

                                        </li>









                                        <li style={{ background: userRole === "5" ? "#5F498A" : "#fff" }} className='jobSeekerOption  px-3  my-2 ' >
                                            {userRole === "5" ? <span>

                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="20" viewBox="0 0 24 20" fill="none">
                                                    <path d="M17 19V17C17 15.9391 16.5786 14.9217 15.8284 14.1716C15.0783 13.4214 14.0609 13 13 13H5C3.93913 13 2.92172 13.4214 2.17157 14.1716C1.42143 14.9217 1 15.9391 1 17V19" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    <path d="M9 9C11.2091 9 13 7.20914 13 5C13 2.79086 11.2091 1 9 1C6.79086 1 5 2.79086 5 5C5 7.20914 6.79086 9 9 9Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    <path d="M23 19V17C22.9993 16.1137 22.7044 15.2528 22.1614 14.5523C21.6184 13.8519 20.8581 13.3516 20 13.13" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    <path d="M16 1.13C16.8604 1.35031 17.623 1.85071 18.1676 2.55232C18.7122 3.25392 19.0078 4.11683 19.0078 5.005C19.0078 5.89318 18.7122 6.75608 18.1676 7.45769C17.623 8.1593 16.8604 8.6597 16 8.88" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </span> : <span>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="20" viewBox="0 0 24 20" fill="none">
                                                    <path d="M17 19V17C17 15.9391 16.5786 14.9217 15.8284 14.1716C15.0783 13.4214 14.0609 13 13 13H5C3.93913 13 2.92172 13.4214 2.17157 14.1716C1.42143 14.9217 1 15.9391 1 17V19" stroke="#919191" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    <path d="M9 9C11.2091 9 13 7.20914 13 5C13 2.79086 11.2091 1 9 1C6.79086 1 5 2.79086 5 5C5 7.20914 6.79086 9 9 9Z" stroke="#919191" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    <path d="M23 19V17C22.9993 16.1137 22.7044 15.2528 22.1614 14.5523C21.6184 13.8519 20.8581 13.3516 20 13.13" stroke="#919191" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    <path d="M16 1.13C16.8604 1.35031 17.623 1.85071 18.1676 2.55232C18.7122 3.25392 19.0078 4.11683 19.0078 5.005C19.0078 5.89318 18.7122 6.75608 18.1676 7.45769C17.623 8.1593 16.8604 8.6597 16 8.88" stroke="#919191" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </span>}


                                            <button style={{ color: userRole === "5" ? "#fff" : "#919191", background: "transparent" }} className=' border-0 py-2 px-2' onClick={() => {
                                                sessionStorage.setItem('leadSearchText', "")

                                                option('5')
                                            }}  >My Team    </button> <button className='border-0 float-end bg-transparent my-1 ' onClick={myteamAdminfunction}>


                                                {myteamAdmin === true ? <img style={{ width: "19px" }} src="../../images/upArrow.png" alt="upDirection" /> : <img style={{ width: "19px" }} src="../../images/downArrow.png" alt="downDirection" />}

                                            </button>

                                            {myteamAdmin === true && <ul style={{ listStyle: "none" }} className='m-0 p-0'>
                                                {team && team.map((admin, index) => {
                                                    const adminName = allAdmin && allAdmin.find(e => e._id === admin.adminId)

                                                    return <div>
                                                        {adminName && <li
                                                            style={{ background: teamAdminMatch === admin.adminId ? "rgb(182, 149, 247)" : "#f5eaea", color: teamAdminMatch === admin.adminId ? "#fff" : "rgb(153 142 142)", cursor: "pointer", fontSize: "13px", fontWeight: "bold" }}
                                                            className=''>
                                                            <div className='d-flex px-2 align-items-center justify-content-between'>


                                                                <button type='button border-0' style={{ border: "none", background: teamAdminMatch === admin.adminId ? "rgb(182, 149, 247)" : "#f5eaea", cursor: "pointer", fontWeight: "bold", fontSize: "13px" }} className='btn rounded mb-1 w-100' key={admin._id} onClick={() => {
                                                                    teamAdmin(adminName._id)
                                                                    option(admin.adminId, "notClose")
                                                                    teamLeadId(admin.lead)
                                                                    sessionStorage.setItem('leadSearchText', "")

                                                                    // statusWithCounts(`${process.env.REACT_APP_API}count/leads/${adminName._id}?userRole=2&myLead=true&aboutStatus=status`)

                                                                    // getLeadAccordingStatus(`${process.env.REACT_APP_API}classify/leads/${adminName._id}?userRole=${adminName.userRole}&status=1&limit=${sessionStorage.getItem('leadsLimit')?sessionStorage.getItem('leadsLimit'):10}&myLead=true`)
                                                                    sessionStorage.setItem("setLeadStatus", 1)

                                                                    statusWithCounts(`${process.env.REACT_APP_API}count/leads/${adminName._id}?userRole=2&myLead=true&aboutStatus=status`)

                                                                    getLeadAccordingStatus(`${process.env.REACT_APP_API}classify/leads/${adminName._id}?userRole=${adminName.userRole}&status=1&page=${parseInt(localStorage.getItem('currentPage'))}&limit=${sessionStorage.getItem('leadsLimit') ? sessionStorage.getItem('leadsLimit') : 10}&myLead=true&states=allstate`)


                                                                    //scrollToTop()





                                                                }}>

                                                                    {adminName && adminName.fullName}
                                                                </button>

                                                                <button type='button' style={{ background: "inherit" }} className='border-0 ' onClick={() => {
                                                                    openAdminProfileuser(adminName._id)
                                                                    teamAdmin(admin.adminId)

                                                                    //  teamLeadId(admin.lead)


                                                                }} >

                                                                    <span className='float-end'>

                                                                        {adminProfile === adminName._id ? <img style={{ width: "15px" }} src="../../images/upArrow.png" alt="upDirection" /> : <img style={{ width: "15px" }} src="../../images/downArrow.png" alt="downDirection" />}
                                                                    </span>

                                                                </button>
                                                            </div>

                                                            {adminProfile === adminName._id && <ul className='list-unstyled'>
                                                                {myTeam && myTeam.map((teamUser, index) => {
                                                                    return <li className='px-2'> <button style={{ fontSize: "12px", background: myTeamUser === teamUser._id ? "#5F498A" : "#fff", color: myTeamUser === teamUser._id ? "#fff" : "#000" }} type='button' className='px-1 py-1 w-100 border-0 my-1 btn' onClick={() => {
                                                                        setMyTeamUser(teamUser._id)
                                                                        // setUserLeads(normalUser.find(user => user._id === teamUser._id).receiveLeads)
                                                                        setUserRole("userLeads")

                                                                        teamAdmin(teamUser._id)
                                                                        sessionStorage.setItem("setLeadStatus", 1)

                                                                        statusWithCounts(`${process.env.REACT_APP_API}count/leads/${teamUser._id}?userRole=3&aboutStatus=status`)


                                                                        getLeadAccordingStatus(`${process.env.REACT_APP_API}classify/leads/${teamUser._id}?userRole=${teamUser.userRole}&status=1&page=1&limit=${sessionStorage.getItem('leadsLimit') ? sessionStorage.getItem('leadsLimit') : 10}&aboutStatus=status&states=allstate`)
                                                                        //scrollToTop()

                                                                    }} > {teamUser.fullName} </button>   </li>
                                                                })}

                                                            </ul>}


                                                        </li>}</div>

                                                })}






                                            </ul>}

                                        </li>


                                        <li style={{ background: userRole === "3" ? "#5F498A" : "#fff" }} className='jobSeekerOption  px-3  my-2 ' >
                                            {userRole === "3" ? <span>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="20" viewBox="0 0 18 20" fill="none">
                                                    <path d="M17 19V17C17 15.9391 16.5786 14.9217 15.8284 14.1716C15.0783 13.4214 14.0609 13 13 13H5C3.93913 13 2.92172 13.4214 2.17157 14.1716C1.42143 14.9217 1 15.9391 1 17V19" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    <path d="M9 9C11.2091 9 13 7.20914 13 5C13 2.79086 11.2091 1 9 1C6.79086 1 5 2.79086 5 5C5 7.20914 6.79086 9 9 9Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </span> : <span>
                                                <span>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="20" viewBox="0 0 18 20" fill="none">
                                                        <path d="M17 19V17C17 15.9391 16.5786 14.9217 15.8284 14.1716C15.0783 13.4214 14.0609 13 13 13H5C3.93913 13 2.92172 13.4214 2.17157 14.1716C1.42143 14.9217 1 15.9391 1 17V19" stroke="#919191" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                        <path d="M9 9C11.2091 9 13 7.20914 13 5C13 2.79086 11.2091 1 9 1C6.79086 1 5 2.79086 5 5C5 7.20914 6.79086 9 9 9Z" stroke="#919191" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                </span>
                                            </span>}



                                            <button style={{ color: userRole === "3" ? "#fff" : "#919191", background: "transparent" }} className='border-0 py-2 px-2' onClick={() => option("3")}  >User  </button>

                                        </li>

                                        <li style={{ background: userRole === "2" ? "#5F498A" : "#fff" }} className='jobSeekerOption  px-3  my-2'>
                                            {userRole === "2" ? <span>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                                                    <path d="M8.15742 0C5.32026 0 3.00585 2.31942 3.00585 5.15935C3.00585 6.52721 3.54832 7.83977 4.51433 8.80717C4.7311 9.02393 4.96593 9.22069 5.21466 9.39411C2.16379 10.5716 0 13.5258 0 16.9871V20.1355C7.8933e-06 20.3305 0.0774838 20.5176 0.215386 20.6555C0.353288 20.7934 0.54032 20.8708 0.735343 20.8709H8.94584C9.04241 20.8709 9.13803 20.8518 9.22725 20.8149C9.31647 20.7779 9.39754 20.7238 9.46582 20.6555C9.5341 20.5872 9.58827 20.5061 9.62522 20.4169C9.66217 20.3277 9.68119 20.2321 9.68118 20.1355C9.68119 20.0389 9.66217 19.9433 9.62522 19.8541C9.58827 19.7649 9.5341 19.6838 9.46582 19.6155C9.39754 19.5472 9.31647 19.4931 9.22725 19.4561C9.13803 19.4192 9.04241 19.4002 8.94584 19.4002H1.47069V16.9871C1.47069 13.2845 4.43457 10.324 8.14797 10.319C9.34742 10.3204 10.4646 10.6314 11.4328 11.176C11.6028 11.2717 11.8037 11.2959 11.9915 11.2433C12.1793 11.1908 12.3385 11.0658 12.4341 10.8959C12.5297 10.726 12.5539 10.525 12.5014 10.3373C12.4489 10.1495 12.3239 9.99027 12.154 9.89462C11.8125 9.70286 11.4548 9.53473 11.0846 9.39244C11.332 9.22014 11.5662 9.02421 11.7827 8.80717C12.7487 7.83977 13.2912 6.52721 13.2912 5.15935C13.2912 3.79177 12.7487 2.47921 11.7827 1.51154C10.817 0.544143 9.5061 0 8.13963 0H8.15742ZM8.15742 1.47069C9.13371 1.47069 10.0691 1.85865 10.7597 2.55063C11.4503 3.24235 11.8386 4.18056 11.8386 5.15935C11.8386 6.13842 11.4503 7.07636 10.7597 7.76835C10.0711 8.45839 9.13899 8.84607 8.16576 8.8483C7.19308 8.84579 6.26126 8.45811 5.57288 7.76835C4.88228 7.07636 4.49432 6.13842 4.49432 5.15935C4.49432 3.11284 6.13425 1.47069 8.1752 1.47069H8.15742ZM16.5372 10.319C16.3421 10.319 16.1551 10.3965 16.0172 10.5344C15.8793 10.6723 15.8018 10.8593 15.8018 11.0543V11.6882C15.4389 11.8022 15.0868 11.9467 14.7502 12.1237L14.302 11.6752C14.164 11.5373 13.977 11.4598 13.782 11.4598C13.587 11.4598 13.3999 11.5373 13.262 11.6752L11.6752 13.262C11.5373 13.3999 11.4598 13.587 11.4598 13.782C11.4598 13.977 11.5373 14.164 11.6752 14.302L12.1234 14.7502C11.9456 15.0868 11.8008 15.4389 11.6877 15.8018H11.0543C10.8593 15.8018 10.6723 15.8793 10.5344 16.0172C10.3965 16.1551 10.319 16.3421 10.319 16.5372V18.7818C10.319 18.9768 10.3965 19.1639 10.5344 19.3018C10.6723 19.4397 10.8593 19.5172 11.0543 19.5172H11.6877C11.8016 19.8804 11.9461 20.2322 12.1234 20.569L11.6752 21.017C11.5373 21.1549 11.4598 21.342 11.4598 21.537C11.4598 21.732 11.5373 21.9191 11.6752 22.057L13.262 23.6438C13.3999 23.7817 13.587 23.8592 13.782 23.8592C13.977 23.8592 14.164 23.7817 14.302 23.6438L14.7502 23.1955C15.0868 23.3734 15.4389 23.5179 15.8018 23.6308V24.2649C15.8019 24.4599 15.8794 24.6469 16.0173 24.7847C16.1552 24.9226 16.3422 25 16.5372 25H18.781C18.976 25 19.163 24.9226 19.3008 24.7847C19.4387 24.6469 19.5162 24.4599 19.5163 24.2649V23.6308C19.8796 23.5168 20.2314 23.3723 20.5679 23.1955L21.0162 23.6438C21.1541 23.7817 21.3411 23.8592 21.5362 23.8592C21.7312 23.8592 21.9182 23.7817 22.0561 23.6438L23.643 22.057C23.7809 21.9191 23.8583 21.732 23.8583 21.537C23.8583 21.342 23.7809 21.1549 23.643 21.017L23.1947 20.569C23.3726 20.2322 23.5176 19.8804 23.6305 19.5172H24.2647C24.4597 19.5172 24.6467 19.4397 24.7846 19.3018C24.9225 19.1639 25 18.9768 25 18.7818V16.5372C25 16.3421 24.9225 16.1551 24.7846 16.0172C24.6467 15.8793 24.4597 15.8018 24.2647 15.8018H23.6335C23.5196 15.438 23.3751 15.0854 23.1967 14.7483L23.643 14.302C23.7809 14.164 23.8583 13.977 23.8583 13.782C23.8583 13.587 23.7809 13.3999 23.643 13.262L22.0561 11.6752C21.9182 11.5373 21.7312 11.4598 21.5362 11.4598C21.3411 11.4598 21.1541 11.5373 21.0162 11.6752L20.5699 12.1218C20.2328 11.9439 19.8801 11.7983 19.5163 11.6852V11.0543C19.5163 10.8593 19.4388 10.6723 19.3009 10.5344C19.163 10.3965 18.976 10.319 18.781 10.319H16.5372ZM17.2725 11.7897H18.0459V12.2532C18.0459 12.4223 18.1041 12.5861 18.2108 12.7173C18.3174 12.8484 18.466 12.9388 18.6315 12.9733C19.2206 13.0956 19.7815 13.3279 20.2845 13.658C20.4258 13.7509 20.5948 13.7921 20.763 13.7749C20.9312 13.7577 21.0884 13.6831 21.208 13.5636L21.5362 13.2353L22.0831 13.7823L21.7549 14.1105C21.6353 14.2301 21.5606 14.3873 21.5434 14.5556C21.5262 14.7238 21.5675 14.8929 21.6604 15.0342C21.9908 15.5373 22.2234 16.0981 22.346 16.6872C22.3804 16.8527 22.4708 17.0012 22.6019 17.1079C22.733 17.2145 22.8968 17.2727 23.0658 17.2728H23.5296V18.0468H23.0627C22.8936 18.0467 22.7297 18.105 22.5986 18.2117C22.4674 18.3184 22.377 18.467 22.3426 18.6326C22.2204 19.2212 21.9883 19.7815 21.6584 20.2842C21.5657 20.4255 21.5245 20.5944 21.5417 20.7626C21.5589 20.9307 21.6335 21.0878 21.7529 21.2074L22.0828 21.5373L21.5359 22.0842L21.206 21.7543C21.0864 21.6349 20.9294 21.5604 20.7613 21.5432C20.5932 21.526 20.4244 21.5672 20.2831 21.6598C19.7803 21.9894 19.2201 22.2215 18.6315 22.3435C18.4659 22.3779 18.3173 22.4682 18.2106 22.5994C18.1039 22.7305 18.0456 22.8945 18.0456 23.0635V23.5304H17.2722V23.0635C17.2722 22.8944 17.2139 22.7305 17.1072 22.5993C17.0004 22.4682 16.8517 22.3778 16.6861 22.3435C16.0978 22.2212 15.5375 21.9894 15.0348 21.6598C14.8935 21.5671 14.7245 21.5258 14.5564 21.5431C14.3883 21.5603 14.2312 21.6349 14.1116 21.7543L13.7817 22.0842L13.2348 21.5373L13.5647 21.2074C13.6841 21.0878 13.7587 20.9307 13.7759 20.7626C13.7931 20.5944 13.7519 20.4255 13.6592 20.2842C13.3296 19.7815 13.0972 19.2212 12.9749 18.6326C12.9406 18.4671 12.8502 18.3185 12.7191 18.2118C12.588 18.1051 12.4242 18.0468 12.2552 18.0468H11.7891V17.2728H12.2552C12.4242 17.2727 12.588 17.2145 12.7191 17.1078C12.8502 17.0011 12.9406 16.8525 12.9749 16.687C13.0972 16.0983 13.3296 15.5381 13.6592 15.0353C13.7519 14.894 13.7931 14.7251 13.7759 14.557C13.7587 14.3888 13.6841 14.2317 13.5647 14.1121L13.2348 13.7823L13.7817 13.2353L14.1116 13.5652C14.2312 13.6847 14.3883 13.7593 14.5564 13.7765C14.7245 13.7937 14.8935 13.7525 15.0348 13.6597C15.5375 13.3301 16.0978 13.0983 16.6861 12.9761C16.8517 12.9417 17.0003 12.8514 17.1071 12.7203C17.2138 12.5892 17.2722 12.4253 17.2722 12.2563L17.2725 11.7897ZM17.6596 14.0079C15.6515 14.0079 14.0079 15.6515 14.0079 17.6596C14.0079 19.6675 15.6515 21.3113 17.6596 21.3113C19.6675 21.3113 21.3113 19.6675 21.3113 17.6596C21.3113 15.6515 19.6675 14.0079 17.6596 14.0079ZM17.6596 15.4783C18.873 15.4783 19.8406 16.4463 19.8406 17.6596C19.8406 18.8727 18.873 19.8406 17.6596 19.8406C16.4463 19.8406 15.4783 18.8727 15.4783 17.6596C15.4783 16.4463 16.4463 15.4783 17.6596 15.4783Z" fill="white" />
                                                </svg>
                                            </span> : <span>

                                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                                                    <path d="M8.15742 0C5.32026 0 3.00585 2.31942 3.00585 5.15935C3.00585 6.52721 3.54832 7.83977 4.51433 8.80717C4.7311 9.02393 4.96593 9.22069 5.21466 9.39411C2.16379 10.5716 0 13.5258 0 16.9871V20.1355C7.8933e-06 20.3305 0.0774838 20.5176 0.215386 20.6555C0.353288 20.7934 0.54032 20.8708 0.735343 20.8709H8.94584C9.04241 20.8709 9.13803 20.8518 9.22725 20.8149C9.31647 20.7779 9.39754 20.7238 9.46582 20.6555C9.5341 20.5872 9.58827 20.5061 9.62522 20.4169C9.66217 20.3277 9.68119 20.2321 9.68118 20.1355C9.68119 20.0389 9.66217 19.9433 9.62522 19.8541C9.58827 19.7649 9.5341 19.6838 9.46582 19.6155C9.39754 19.5472 9.31647 19.4931 9.22725 19.4561C9.13803 19.4192 9.04241 19.4002 8.94584 19.4002H1.47069V16.9871C1.47069 13.2845 4.43457 10.324 8.14797 10.319C9.34742 10.3204 10.4646 10.6314 11.4328 11.176C11.6028 11.2717 11.8037 11.2959 11.9915 11.2433C12.1793 11.1908 12.3385 11.0658 12.4341 10.8959C12.5297 10.726 12.5539 10.525 12.5014 10.3373C12.4489 10.1495 12.3239 9.99027 12.154 9.89462C11.8125 9.70286 11.4548 9.53473 11.0846 9.39244C11.332 9.22014 11.5662 9.02421 11.7827 8.80717C12.7487 7.83977 13.2912 6.52721 13.2912 5.15935C13.2912 3.79177 12.7487 2.47921 11.7827 1.51154C10.817 0.544143 9.5061 0 8.13963 0H8.15742ZM8.15742 1.47069C9.13371 1.47069 10.0691 1.85865 10.7597 2.55063C11.4503 3.24235 11.8386 4.18056 11.8386 5.15935C11.8386 6.13842 11.4503 7.07636 10.7597 7.76835C10.0711 8.45839 9.13899 8.84607 8.16576 8.8483C7.19308 8.84579 6.26126 8.45811 5.57288 7.76835C4.88228 7.07636 4.49432 6.13842 4.49432 5.15935C4.49432 3.11284 6.13425 1.47069 8.1752 1.47069H8.15742ZM16.5372 10.319C16.3421 10.319 16.1551 10.3965 16.0172 10.5344C15.8793 10.6723 15.8018 10.8593 15.8018 11.0543V11.6882C15.4389 11.8022 15.0868 11.9467 14.7502 12.1237L14.302 11.6752C14.164 11.5373 13.977 11.4598 13.782 11.4598C13.587 11.4598 13.3999 11.5373 13.262 11.6752L11.6752 13.262C11.5373 13.3999 11.4598 13.587 11.4598 13.782C11.4598 13.977 11.5373 14.164 11.6752 14.302L12.1234 14.7502C11.9456 15.0868 11.8008 15.4389 11.6877 15.8018H11.0543C10.8593 15.8018 10.6723 15.8793 10.5344 16.0172C10.3965 16.1551 10.319 16.3421 10.319 16.5372V18.7818C10.319 18.9768 10.3965 19.1639 10.5344 19.3018C10.6723 19.4397 10.8593 19.5172 11.0543 19.5172H11.6877C11.8016 19.8804 11.9461 20.2322 12.1234 20.569L11.6752 21.017C11.5373 21.1549 11.4598 21.342 11.4598 21.537C11.4598 21.732 11.5373 21.9191 11.6752 22.057L13.262 23.6438C13.3999 23.7817 13.587 23.8592 13.782 23.8592C13.977 23.8592 14.164 23.7817 14.302 23.6438L14.7502 23.1955C15.0868 23.3734 15.4389 23.5179 15.8018 23.6308V24.2649C15.8019 24.4599 15.8794 24.6469 16.0173 24.7847C16.1552 24.9226 16.3422 25 16.5372 25H18.781C18.976 25 19.163 24.9226 19.3008 24.7847C19.4387 24.6469 19.5162 24.4599 19.5163 24.2649V23.6308C19.8796 23.5168 20.2314 23.3723 20.5679 23.1955L21.0162 23.6438C21.1541 23.7817 21.3411 23.8592 21.5362 23.8592C21.7312 23.8592 21.9182 23.7817 22.0561 23.6438L23.643 22.057C23.7809 21.9191 23.8583 21.732 23.8583 21.537C23.8583 21.342 23.7809 21.1549 23.643 21.017L23.1947 20.569C23.3726 20.2322 23.5176 19.8804 23.6305 19.5172H24.2647C24.4597 19.5172 24.6467 19.4397 24.7846 19.3018C24.9225 19.1639 25 18.9768 25 18.7818V16.5372C25 16.3421 24.9225 16.1551 24.7846 16.0172C24.6467 15.8793 24.4597 15.8018 24.2647 15.8018H23.6335C23.5196 15.438 23.3751 15.0854 23.1967 14.7483L23.643 14.302C23.7809 14.164 23.8583 13.977 23.8583 13.782C23.8583 13.587 23.7809 13.3999 23.643 13.262L22.0561 11.6752C21.9182 11.5373 21.7312 11.4598 21.5362 11.4598C21.3411 11.4598 21.1541 11.5373 21.0162 11.6752L20.5699 12.1218C20.2328 11.9439 19.8801 11.7983 19.5163 11.6852V11.0543C19.5163 10.8593 19.4388 10.6723 19.3009 10.5344C19.163 10.3965 18.976 10.319 18.781 10.319H16.5372ZM17.2725 11.7897H18.0459V12.2532C18.0459 12.4223 18.1041 12.5861 18.2108 12.7173C18.3174 12.8484 18.466 12.9388 18.6315 12.9733C19.2206 13.0956 19.7815 13.3279 20.2845 13.658C20.4258 13.7509 20.5948 13.7921 20.763 13.7749C20.9312 13.7577 21.0884 13.6831 21.208 13.5636L21.5362 13.2353L22.0831 13.7823L21.7549 14.1105C21.6353 14.2301 21.5606 14.3873 21.5434 14.5556C21.5262 14.7238 21.5675 14.8929 21.6604 15.0342C21.9908 15.5373 22.2234 16.0981 22.346 16.6872C22.3804 16.8527 22.4708 17.0012 22.6019 17.1079C22.733 17.2145 22.8968 17.2727 23.0658 17.2728H23.5296V18.0468H23.0627C22.8936 18.0467 22.7297 18.105 22.5986 18.2117C22.4674 18.3184 22.377 18.467 22.3426 18.6326C22.2204 19.2212 21.9883 19.7815 21.6584 20.2842C21.5657 20.4255 21.5245 20.5944 21.5417 20.7626C21.5589 20.9307 21.6335 21.0878 21.7529 21.2074L22.0828 21.5373L21.5359 22.0842L21.206 21.7543C21.0864 21.6349 20.9294 21.5604 20.7613 21.5432C20.5932 21.526 20.4244 21.5672 20.2831 21.6598C19.7803 21.9894 19.2201 22.2215 18.6315 22.3435C18.4659 22.3779 18.3173 22.4682 18.2106 22.5994C18.1039 22.7305 18.0456 22.8945 18.0456 23.0635V23.5304H17.2722V23.0635C17.2722 22.8944 17.2139 22.7305 17.1072 22.5993C17.0004 22.4682 16.8517 22.3778 16.6861 22.3435C16.0978 22.2212 15.5375 21.9894 15.0348 21.6598C14.8935 21.5671 14.7245 21.5258 14.5564 21.5431C14.3883 21.5603 14.2312 21.6349 14.1116 21.7543L13.7817 22.0842L13.2348 21.5373L13.5647 21.2074C13.6841 21.0878 13.7587 20.9307 13.7759 20.7626C13.7931 20.5944 13.7519 20.4255 13.6592 20.2842C13.3296 19.7815 13.0972 19.2212 12.9749 18.6326C12.9406 18.4671 12.8502 18.3185 12.7191 18.2118C12.588 18.1051 12.4242 18.0468 12.2552 18.0468H11.7891V17.2728H12.2552C12.4242 17.2727 12.588 17.2145 12.7191 17.1078C12.8502 17.0011 12.9406 16.8525 12.9749 16.687C13.0972 16.0983 13.3296 15.5381 13.6592 15.0353C13.7519 14.894 13.7931 14.7251 13.7759 14.557C13.7587 14.3888 13.6841 14.2317 13.5647 14.1121L13.2348 13.7823L13.7817 13.2353L14.1116 13.5652C14.2312 13.6847 14.3883 13.7593 14.5564 13.7765C14.7245 13.7937 14.8935 13.7525 15.0348 13.6597C15.5375 13.3301 16.0978 13.0983 16.6861 12.9761C16.8517 12.9417 17.0003 12.8514 17.1071 12.7203C17.2138 12.5892 17.2722 12.4253 17.2722 12.2563L17.2725 11.7897ZM17.6596 14.0079C15.6515 14.0079 14.0079 15.6515 14.0079 17.6596C14.0079 19.6675 15.6515 21.3113 17.6596 21.3113C19.6675 21.3113 21.3113 19.6675 21.3113 17.6596C21.3113 15.6515 19.6675 14.0079 17.6596 14.0079ZM17.6596 15.4783C18.873 15.4783 19.8406 16.4463 19.8406 17.6596C19.8406 18.8727 18.873 19.8406 17.6596 19.8406C16.4463 19.8406 15.4783 18.8727 15.4783 17.6596C15.4783 16.4463 16.4463 15.4783 17.6596 15.4783Z" fill="#919191" />
                                                </svg>                        </span>}



                                            <button style={{ color: userRole === "2" ? "#fff" : "#919191", backgroundColor: "transparent" }} className='border-0 py-2 px-2' onClick={() => option("2")} >Admin  </button>

                                        </li>








                                        <li style={{ background: userRole === "" ? "#5F498A" : "#fff" }} className='jobSeekerOption  px-3  my-2'>
                                            {userRole === "" ? <span>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="20" viewBox="0 0 24 20" fill="none">
                                                    <path d="M16 19V17C16 15.9391 15.5786 14.9217 14.8284 14.1716C14.0783 13.4214 13.0609 13 12 13H5C3.93913 13 2.92172 13.4214 2.17157 14.1716C1.42143 14.9217 1 15.9391 1 17V19" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    <path d="M8.5 9C10.7091 9 12.5 7.20914 12.5 5C12.5 2.79086 10.7091 1 8.5 1C6.29086 1 4.5 2.79086 4.5 5C4.5 7.20914 6.29086 9 8.5 9Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    <path d="M20 6V12" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    <path d="M23 9H17" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </span> : <span>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="20" viewBox="0 0 24 20" fill="none">
                                                    <path d="M16 19V17C16 15.9391 15.5786 14.9217 14.8284 14.1716C14.0783 13.4214 13.0609 13 12 13H5C3.93913 13 2.92172 13.4214 2.17157 14.1716C1.42143 14.9217 1 15.9391 1 17V19" stroke="#919191" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    <path d="M8.5 9C10.7091 9 12.5 7.20914 12.5 5C12.5 2.79086 10.7091 1 8.5 1C6.29086 1 4.5 2.79086 4.5 5C4.5 7.20914 6.29086 9 8.5 9Z" stroke="#919191" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    <path d="M20 6V12" stroke="#919191" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    <path d="M23 9H17" stroke="#919191" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </span>}



                                            <button style={{ color: userRole === "" ? "#fff" : "#919191", background: "transparent" }} className='border-0 py-2 px-2' onClick={() => option("")} >Create Team  </button>

                                        </li>

                                        <li style={{ background: userRole === "createUser" ? "#5F498A" : "#fff" }} className='jobSeekerOption  px-3  my-2'>
                                            {userRole === "createUser" ? <span>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="20" viewBox="0 0 24 20" fill="none">
                                                    <path d="M16 19V17C16 15.9391 15.5786 14.9217 14.8284 14.1716C14.0783 13.4214 13.0609 13 12 13H5C3.93913 13 2.92172 13.4214 2.17157 14.1716C1.42143 14.9217 1 15.9391 1 17V19" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    <path d="M8.5 9C10.7091 9 12.5 7.20914 12.5 5C12.5 2.79086 10.7091 1 8.5 1C6.29086 1 4.5 2.79086 4.5 5C4.5 7.20914 6.29086 9 8.5 9Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    <path d="M20 6V12" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    <path d="M23 9H17" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </span> : <span>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="20" viewBox="0 0 24 20" fill="none">
                                                    <path d="M16 19V17C16 15.9391 15.5786 14.9217 14.8284 14.1716C14.0783 13.4214 13.0609 13 12 13H5C3.93913 13 2.92172 13.4214 2.17157 14.1716C1.42143 14.9217 1 15.9391 1 17V19" stroke="#919191" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    <path d="M8.5 9C10.7091 9 12.5 7.20914 12.5 5C12.5 2.79086 10.7091 1 8.5 1C6.29086 1 4.5 2.79086 4.5 5C4.5 7.20914 6.29086 9 8.5 9Z" stroke="#919191" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    <path d="M20 6V12" stroke="#919191" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    <path d="M23 9H17" stroke="#919191" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </span>}



                                            <button style={{ color: userRole === "createUser" ? "#fff" : "#919191", background: "transparent" }} className='border-0 py-2 px-2' onClick={() => option("createUser")} >Create User  </button>

                                        </li>











                                        <li style={{ background: userRole === "4" ? "#5F498A" : "#fff" }} className='jobSeekerOption  px-3  my-2'>
                                            {userRole === "4" ? <span>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                                                    <path d="M11 21C16.5228 21 21 16.5228 21 11C21 5.47715 16.5228 1 11 1C5.47715 1 1 5.47715 1 11C1 16.5228 5.47715 21 11 21Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    <path d="M3.92999 3.92999L18.07 18.07" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </span> : <span>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                                                    <path d="M11 21C16.5228 21 21 16.5228 21 11C21 5.47715 16.5228 1 11 1C5.47715 1 1 5.47715 1 11C1 16.5228 5.47715 21 11 21Z" stroke="#919191" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    <path d="M3.92999 3.92999L18.07 18.07" stroke="#919191" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </span>}



                                            <button style={{ color: userRole === "4" ? "#fff" : "#919191", background: "transparent" }} className='border-0 py-2 px-2' onClick={() => option("4")} >Blocked User  </button>

                                        </li>
                                        <li style={{ background: userRole === "leadAccordingToCallingStatus" ? "#5F498A" : "#fff" }} className='jobSeekerOption  px-3  my-2 pb-0 mb-0'    >
                                            {userRole === "leadAccordingToCallingStatus" ?
                                                <span>


                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="23" viewBox="0 0 23 23" fill="none">
                                                        <path d="M13.9381 5C14.9149 5.19057 15.8125 5.66826 16.5162 6.37194C17.2199 7.07561 17.6976 7.97326 17.8881 8.95M13.9381 1C15.9674 1.22544 17.8597 2.13417 19.3044 3.57701C20.749 5.01984 21.6601 6.91101 21.8881 8.94M20.8881 16.92V19.92C20.8892 20.1985 20.8322 20.4742 20.7206 20.7293C20.6091 20.9845 20.4454 21.2136 20.2402 21.4019C20.035 21.5901 19.7927 21.7335 19.5289 21.8227C19.265 21.9119 18.9855 21.9451 18.7081 21.92C15.631 21.5856 12.6751 20.5341 10.0781 18.85C7.66194 17.3147 5.61345 15.2662 4.07812 12.85C2.38809 10.2412 1.33636 7.27099 1.00812 4.18C0.983127 3.90347 1.01599 3.62476 1.10462 3.36162C1.19324 3.09849 1.33569 2.85669 1.52288 2.65162C1.71008 2.44655 1.93792 2.28271 2.19191 2.17052C2.44589 2.05833 2.72046 2.00026 2.99812 2H5.99812C6.48342 1.99522 6.95391 2.16708 7.32188 2.48353C7.68985 2.79999 7.93019 3.23945 7.99812 3.72C8.12474 4.68007 8.35957 5.62273 8.69812 6.53C8.83266 6.88792 8.86178 7.27691 8.78202 7.65088C8.70227 8.02485 8.51698 8.36811 8.24812 8.64L6.97812 9.91C8.40167 12.4135 10.4746 14.4864 12.9781 15.91L14.2481 14.64C14.52 14.3711 14.8633 14.1858 15.2372 14.1061C15.6112 14.0263 16.0002 14.0555 16.3581 14.19C17.2654 14.5286 18.2081 14.7634 19.1681 14.89C19.6539 14.9585 20.0975 15.2032 20.4146 15.5775C20.7318 15.9518 20.9003 16.4296 20.8881 16.92Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                </span> : <span>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="23" viewBox="0 0 23 23" fill="none">
                                                        <path d="M13.9381 5C14.9149 5.19057 15.8125 5.66826 16.5162 6.37194C17.2199 7.07561 17.6976 7.97326 17.8881 8.95M13.9381 1C15.9674 1.22544 17.8597 2.13417 19.3044 3.57701C20.749 5.01984 21.6601 6.91101 21.8881 8.94M20.8881 16.92V19.92C20.8892 20.1985 20.8322 20.4742 20.7206 20.7293C20.6091 20.9845 20.4454 21.2136 20.2402 21.4019C20.035 21.5901 19.7927 21.7335 19.5289 21.8227C19.265 21.9119 18.9855 21.9451 18.7081 21.92C15.631 21.5856 12.6751 20.5341 10.0781 18.85C7.66194 17.3147 5.61345 15.2662 4.07812 12.85C2.38809 10.2412 1.33636 7.27099 1.00812 4.18C0.983127 3.90347 1.01599 3.62476 1.10462 3.36162C1.19324 3.09849 1.33569 2.85669 1.52288 2.65162C1.71008 2.44655 1.93792 2.28271 2.19191 2.17052C2.44589 2.05833 2.72046 2.00026 2.99812 2H5.99812C6.48342 1.99522 6.95391 2.16708 7.32188 2.48353C7.68985 2.79999 7.93019 3.23945 7.99812 3.72C8.12474 4.68007 8.35957 5.62273 8.69812 6.53C8.83266 6.88792 8.86178 7.27691 8.78202 7.65088C8.70227 8.02485 8.51698 8.36811 8.24812 8.64L6.97812 9.91C8.40167 12.4135 10.4746 14.4864 12.9781 15.91L14.2481 14.64C14.52 14.3711 14.8633 14.1858 15.2372 14.1061C15.6112 14.0263 16.0002 14.0555 16.3581 14.19C17.2654 14.5286 18.2081 14.7634 19.1681 14.89C19.6539 14.9585 20.0975 15.2032 20.4146 15.5775C20.7318 15.9518 20.9003 16.4296 20.8881 16.92Z" stroke="#919191" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                </span>}

                                            <button style={{ color: userRole === "leadAccordingToCallingStatus" ? "#fff" : "#919191", background: "transparent" }} className='border-0 py-2 px-2' onClick={() => {
                                                option("leadAccordingToCallingStatus")
                                                sessionStorage.setItem("setLeadStatus", mySuperTeam.companyCallingStatus[0] && mySuperTeam.companyCallingStatus[0].id)
                                                statusWithCounts(`${process.env.REACT_APP_API}count/leads/${mySuperTeam._id}?userRole=${myProfile.userRole}&myLead=true&aboutStatus=callingStatus`)
                                                sessionStorage.setItem('leadSearchText', "")


                                                getLeadAccordingStatus(`${process.env.REACT_APP_API}classify/leads/${mySuperTeam._id}?userRole=${myProfile.userRole}&status=${mySuperTeam.companyCallingStatus[0] && mySuperTeam.companyCallingStatus[0].id} &page=${parseInt(localStorage.getItem('currentPage'))}&limit=${sessionStorage.getItem('leadsLimit') ? sessionStorage.getItem('leadsLimit') : 10}&myLead=true&aboutStatus=callingStatus&states=allstate&followUp=false`)
                                                //scrollToTop()

                                            }}  >Calling Status  </button>

                                        </li>
                                        <li style={{ background: userRole === "todaysFollowUp" ? "#5F498A" : "#fff" }} className='jobSeekerOption  px-3  my-2 pb-0 mb-0'    >
                                            {userRole === "todaysFollowUp" ?
                                                <span>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="32" viewBox="0 0 32 32" fill="none">
                                                        <path d="M26.5417 21.7933C27.4199 21.0112 27.9769 19.8759 27.9769 18.6102C27.9769 16.2575 26.0628 14.3431 23.7098 14.3431C21.3567 14.3431 19.4426 16.2575 19.4426 18.6102C19.4426 19.8759 19.9997 21.0112 20.8779 21.7933C18.2189 22.4503 16.2389 24.8494 16.2389 27.7085V30.4185C16.2389 30.7689 16.5228 31.0525 16.8729 31.0525H30.5467C30.8968 31.0525 31.1807 30.7689 31.1807 30.4185V27.7085C31.1807 24.8494 29.2006 22.4503 26.5417 21.7933ZM20.7107 18.6102C20.7107 16.9565 22.0561 15.6111 23.7098 15.6111C25.3635 15.6111 26.7089 16.9565 26.7089 18.6102C26.7089 20.2639 25.3635 21.6093 23.7098 21.6093C22.0561 21.6093 20.7107 20.2639 20.7107 18.6102ZM29.9127 29.7845H17.5069V27.7085C17.5069 25.0443 19.6739 22.8773 22.3378 22.8773H25.0818C27.7457 22.8773 29.9127 25.0443 29.9127 27.7085V29.7845Z" fill="white" />
                                                        <path d="M10.3028 7.45027C11.181 6.66809 11.738 5.53278 11.738 4.26713C11.738 1.91439 9.82394 0 7.47089 0C5.11784 0 3.20376 1.91439 3.20376 4.26713C3.20376 5.53278 3.76079 6.66809 4.63897 7.45027C1.98006 8.10718 0 10.5063 0 13.3654V16.0754C0 16.4259 0.283877 16.7094 0.634003 16.7094H14.3078C14.6579 16.7094 14.9418 16.4259 14.9418 16.0754V13.3654C14.9418 10.5063 12.9617 8.10718 10.3028 7.45027ZM4.47176 4.26713C4.47176 2.6134 5.81716 1.26801 7.47089 1.26801C9.12462 1.26801 10.47 2.6134 10.47 4.26713C10.47 5.92087 9.12462 7.26626 7.47089 7.26626C5.81716 7.26626 4.47176 5.92087 4.47176 4.26713ZM8.1475 8.53427L7.97735 9.46236H6.96443L6.79428 8.53427H8.1475ZM5.21055 15.4414H1.26801V13.3654C1.26801 10.9002 3.1247 8.86435 5.51246 8.57355L5.7956 10.1187L5.21055 15.4414ZM6.48638 15.4414L7.00421 10.7304H7.93757L8.4554 15.4414H6.48638ZM13.6738 15.4414H9.73123L9.14617 10.1187L9.42932 8.57355C11.8171 8.86435 13.6738 10.9002 13.6738 13.3654V15.4414Z" fill="white" />
                                                        <path d="M22.7062 10.2735L21.7462 9.15339C21.5189 8.88654 21.119 8.85682 20.8521 9.08404C20.5865 9.31189 20.5556 9.71247 20.7834 9.97809L22.8588 12.4002C22.9792 12.5407 23.155 12.6218 23.3402 12.6218C23.5253 12.6218 23.7011 12.5407 23.8215 12.4002L25.8969 9.97809C26.1248 9.71247 26.0938 9.31189 25.8282 9.08404C25.5619 8.85682 25.1626 8.88654 24.9341 9.15339L23.9742 10.2735V6.29233C23.9742 5.94189 23.6903 5.65833 23.3402 5.65833H15.2049C14.8548 5.65833 14.5709 5.94189 14.5709 6.29233C14.5709 6.64276 14.8548 6.92633 15.2049 6.92633H22.7062V10.2735Z" fill="white" />
                                                        <path d="M14.2521 24.3917H6.75082V21.0452L7.7108 22.1653C7.83618 22.312 8.01388 22.387 8.1925 22.387C8.33831 22.387 8.48504 22.3368 8.60485 22.2347C8.87046 22.0068 8.90142 21.6062 8.67357 21.3406L6.5982 18.9185C6.35736 18.6374 5.87628 18.6374 5.63544 18.9185L3.56007 21.3406C3.33223 21.6062 3.36318 22.0068 3.62879 22.2347C3.89503 22.4619 4.29468 22.4322 4.52284 22.1653L5.48282 21.0452V25.0257C5.48282 25.3762 5.7667 25.6598 6.11682 25.6598H14.2521C14.6022 25.6598 14.8861 25.3762 14.8861 25.0257C14.8861 24.6753 14.6022 24.3917 14.2521 24.3917Z" fill="white" />
                                                    </svg>
                                                </span> : <span>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="32" viewBox="0 0 32 32" fill="none">
                                                        <path d="M26.5417 21.7933C27.4199 21.0112 27.9769 19.8759 27.9769 18.6102C27.9769 16.2575 26.0628 14.3431 23.7098 14.3431C21.3567 14.3431 19.4426 16.2575 19.4426 18.6102C19.4426 19.8759 19.9997 21.0112 20.8779 21.7933C18.2189 22.4503 16.2389 24.8494 16.2389 27.7085V30.4185C16.2389 30.7689 16.5228 31.0525 16.8729 31.0525H30.5467C30.8968 31.0525 31.1807 30.7689 31.1807 30.4185V27.7085C31.1807 24.8494 29.2006 22.4503 26.5417 21.7933ZM20.7107 18.6102C20.7107 16.9565 22.0561 15.6111 23.7098 15.6111C25.3635 15.6111 26.7089 16.9565 26.7089 18.6102C26.7089 20.2639 25.3635 21.6093 23.7098 21.6093C22.0561 21.6093 20.7107 20.2639 20.7107 18.6102ZM29.9127 29.7845H17.5069V27.7085C17.5069 25.0443 19.6739 22.8773 22.3378 22.8773H25.0818C27.7457 22.8773 29.9127 25.0443 29.9127 27.7085V29.7845Z" fill="grey" />
                                                        <path d="M10.3028 7.45027C11.181 6.66809 11.738 5.53278 11.738 4.26713C11.738 1.91439 9.82394 0 7.47089 0C5.11784 0 3.20376 1.91439 3.20376 4.26713C3.20376 5.53278 3.76079 6.66809 4.63897 7.45027C1.98006 8.10718 0 10.5063 0 13.3654V16.0754C0 16.4259 0.283877 16.7094 0.634003 16.7094H14.3078C14.6579 16.7094 14.9418 16.4259 14.9418 16.0754V13.3654C14.9418 10.5063 12.9617 8.10718 10.3028 7.45027ZM4.47176 4.26713C4.47176 2.6134 5.81716 1.26801 7.47089 1.26801C9.12462 1.26801 10.47 2.6134 10.47 4.26713C10.47 5.92087 9.12462 7.26626 7.47089 7.26626C5.81716 7.26626 4.47176 5.92087 4.47176 4.26713ZM8.1475 8.53427L7.97735 9.46236H6.96443L6.79428 8.53427H8.1475ZM5.21055 15.4414H1.26801V13.3654C1.26801 10.9002 3.1247 8.86435 5.51246 8.57355L5.7956 10.1187L5.21055 15.4414ZM6.48638 15.4414L7.00421 10.7304H7.93757L8.4554 15.4414H6.48638ZM13.6738 15.4414H9.73123L9.14617 10.1187L9.42932 8.57355C11.8171 8.86435 13.6738 10.9002 13.6738 13.3654V15.4414Z" fill="grey" />
                                                        <path d="M22.7062 10.2735L21.7462 9.15339C21.5189 8.88654 21.119 8.85682 20.8521 9.08404C20.5865 9.31189 20.5556 9.71247 20.7834 9.97809L22.8588 12.4002C22.9792 12.5407 23.155 12.6218 23.3402 12.6218C23.5253 12.6218 23.7011 12.5407 23.8215 12.4002L25.8969 9.97809C26.1248 9.71247 26.0938 9.31189 25.8282 9.08404C25.5619 8.85682 25.1626 8.88654 24.9341 9.15339L23.9742 10.2735V6.29233C23.9742 5.94189 23.6903 5.65833 23.3402 5.65833H15.2049C14.8548 5.65833 14.5709 5.94189 14.5709 6.29233C14.5709 6.64276 14.8548 6.92633 15.2049 6.92633H22.7062V10.2735Z" fill="grey" />
                                                        <path d="M14.2521 24.3917H6.75082V21.0452L7.7108 22.1653C7.83618 22.312 8.01388 22.387 8.1925 22.387C8.33831 22.387 8.48504 22.3368 8.60485 22.2347C8.87046 22.0068 8.90142 21.6062 8.67357 21.3406L6.5982 18.9185C6.35736 18.6374 5.87628 18.6374 5.63544 18.9185L3.56007 21.3406C3.33223 21.6062 3.36318 22.0068 3.62879 22.2347C3.89503 22.4619 4.29468 22.4322 4.52284 22.1653L5.48282 21.0452V25.0257C5.48282 25.3762 5.7667 25.6598 6.11682 25.6598H14.2521C14.6022 25.6598 14.8861 25.3762 14.8861 25.0257C14.8861 24.6753 14.6022 24.3917 14.2521 24.3917Z" fill="grey" />
                                                    </svg>
                                                </span>}

                                            <button disabled style={{ color: userRole === "todaysFollowUp" ? "#fff" : "#919191", background: "transparent" }} className='border-0 py-2 px-2' onClick={() => {
                                                option("todaysFollowUp")
                                                sessionStorage.setItem("setLeadStatus", 5)
                                                statusWithCounts(`${process.env.REACT_APP_API}count/leads/${mySuperTeam._id}?userRole=${myProfile.userRole}&myLead=true&aboutStatus=status`)
                                                localStorage.setItem('currentPage', 1)
                                                sessionStorage.setItem('leadSearchText', "")
                                                const fetchData = async () => {
                                                    await getLeadAccordingStatus(`${process.env.REACT_APP_API}classify/leads/${mySuperTeam._id}?userRole=${myProfile.userRole}&status=5&limit=${sessionStorage.getItem('leadsLimit') ? sessionStorage.getItem('leadsLimit') : 10}&myLead=true&followUp=true&states=allstate&aboutStatus=status&page=1&date=${sessionStorage.getItem('followUpdate')}`)
                                                }
                                                fetchData()

                                                //scrollToTop()



                                            }} >Follow Up  </button>



                                        </li>







                                    </ul>




                                    <ul className="list-unstyled">
                                        <li style={{ background: userRole === "setting" ? "#5F498A" : "#fff" }} className="mt-2 my-1  py-2 -2 d-flex justify-content-between   items-center" onClick={() => {

                                            userRole === "setting" ? option("noSettings") : option("setting")

                                        }}>
                                            <div className='d-flex gap-2'>

                                                <span style={{ paddingLeft: "10px" }} className=''>
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="24"
                                                        height="23"
                                                        viewBox="0 0 24 23"
                                                        fill="none"
                                                    >
                                                        <path
                                                            d="M19.2415 10.4506C19.2792 10.754 19.3075 11.0575 19.3075 11.3799C19.3075 11.7024 19.2792 12.0058 19.2415 12.3093L21.2314 13.8741C21.4106 14.0163 21.4578 14.2724 21.3446 14.481L19.4584 17.7622C19.3735 17.914 19.2132 17.9993 19.0434 17.9993C18.9868 17.9993 18.9303 17.9898 18.8831 17.9709L16.5348 17.0225C16.0444 17.4019 15.5163 17.7148 14.941 17.9519L14.5826 20.465C14.5543 20.6926 14.3563 20.8633 14.1205 20.8633H10.3481C10.1123 20.8633 9.91429 20.6926 9.88599 20.465L9.52762 17.9519C8.95233 17.7148 8.4242 17.3924 7.93379 17.0225L5.58549 17.9709C5.5289 17.9898 5.47231 17.9993 5.41573 17.9993C5.2554 17.9993 5.09508 17.914 5.0102 17.7622L3.12401 14.481C3.00141 14.2724 3.05799 14.0163 3.23718 13.8741L5.22711 12.3093C5.18939 12.0058 5.16109 11.6929 5.16109 11.3799C5.16109 11.067 5.18939 10.754 5.22711 10.4506L3.23718 8.88583C3.05799 8.74358 3.01084 8.48753 3.12401 8.2789L5.0102 4.99767C5.09508 4.84593 5.2554 4.76058 5.42516 4.76058C5.48175 4.76058 5.53833 4.77007 5.58549 4.78903L7.93379 5.73736C8.4242 5.35803 8.95233 5.04508 9.52762 4.808L9.88599 2.29492C9.91429 2.06732 10.1123 1.89662 10.3481 1.89662H14.1205C14.3563 1.89662 14.5543 2.06732 14.5826 2.29492L14.941 4.808C15.5163 5.04508 16.0444 5.36751 16.5348 5.73736L18.8831 4.78903C18.9397 4.77007 18.9963 4.76058 19.0529 4.76058C19.2132 4.76058 19.3735 4.84593 19.4584 4.99767L21.3446 8.2789C21.4578 8.48753 21.4106 8.74358 21.2314 8.88583L19.2415 10.4506ZM17.3742 12.0722C17.4119 11.7782 17.4213 11.5791 17.4213 11.3799C17.4213 11.1808 17.4025 10.9722 17.3742 10.6877L17.2421 9.61605L18.0815 8.95222L19.1 8.15562L18.4399 7.00813L17.2421 7.49178L16.2613 7.89008L15.4125 7.24522C15.007 6.94175 14.6203 6.71415 14.2337 6.55293L13.234 6.14515L13.0831 5.07353L12.8945 3.79328H11.5741L11.3949 5.07353L11.244 6.14515L10.2444 6.55293C9.83884 6.72363 9.4616 6.94175 9.08436 7.22625L8.22615 7.89008L7.22647 7.4823L6.02874 6.99865L5.36857 8.14613L6.38712 8.94273L7.22647 9.60657L7.09444 10.6782C7.06614 10.9722 7.04728 11.1903 7.04728 11.3799C7.04728 11.5696 7.06614 11.7877 7.09444 12.0722L7.22647 13.1438L6.38712 13.8077L5.36857 14.6043L6.02874 15.7518L7.22647 15.2681L8.20729 14.8698L9.05607 15.5147C9.4616 15.8181 9.84827 16.0457 10.2349 16.207L11.2346 16.6147L11.3855 17.6864L11.5741 18.9666H12.885L13.0642 17.6864L13.2151 16.6147L14.2148 16.207C14.6203 16.0363 14.9976 15.8181 15.3748 15.5336L16.233 14.8698L17.2327 15.2776L18.4304 15.7612L19.0906 14.6138L18.0815 13.8077L17.2421 13.1438L17.3742 12.0722ZM12.2343 15.1733C10.1501 15.1733 8.46192 13.4758 8.46192 11.3799C8.46192 9.28413 10.1501 7.58662 12.2343 7.58662C14.3185 7.58662 16.0067 9.28413 16.0067 11.3799C16.0067 13.4758 14.3185 15.1733 12.2343 15.1733ZM12.2343 9.48328C11.1969 9.48328 10.3481 10.3368 10.3481 11.3799C10.3481 12.4231 11.1969 13.2766 12.2343 13.2766C13.2717 13.2766 14.1205 12.4231 14.1205 11.3799C14.1205 10.3368 13.2717 9.48328 12.2343 9.48328Z"
                                                            fill="#858585"
                                                        />
                                                    </svg>
                                                </span>{" "}
                                                <span style={{ color: userRole === "setting" ? "#fff" : "#919191", background: "transparent" }}>

                                                    Settings
                                                </span>

                                            </div>
                                            <span className='px-2'>
                                                {userRole === 'setting' ? <img style={{ width: "19px" }} src="../../images/upArrow.png" alt="upDirection" /> : <img style={{ width: "19px" }} src="../../images/downArrow.png" alt="downDirection" />}
                                            </span>

                                        </li>
                                        {userRole === "setting" && <ul className='m-0 p-0  list-unstyled'>
                                            <li style={{ background: setting === "passwordSetting" ? "#5F498A" : "#fff" }} className='m-0 py-0 px-3'  >


                                                <button style={{ color: setting === "passwordSetting" ? "#fff" : "#919191", backgroundColor: "transparent" }} className='border-0 py-1 px-2' onClick={() => {
                                                    setSetting("passwordSetting")
                                                }} >Password Setting  </button>

                                            </li>

                                            <li style={{ background: setting === "apiSetting" ? "#5F498A" : "#fff" }} className='m-0 py-0 px-3'  >


                                                <button style={{ color: setting === "apiSetting" ? "#fff" : "#919191", backgroundColor: "transparent" }} className='border-0 py-1 px-2' onClick={() => {
                                                    setSetting("apiSetting")
                                                }} >Api Setting  </button>

                                            </li>
                                            <li style={{ background: setting === "generalSetting" ? "#5F498A" : "#fff" }} className='m-0 py-0 px-3'  >


                                                <button style={{ color: setting === "generalSetting" ? "#fff" : "#919191", backgroundColor: "transparent" }} className='border-0 py-1 px-2' onClick={() => {
                                                    setSetting("generalSetting")
                                                }} >General Setting  </button>

                                            </li>
                                            <li style={{ background: setting === "report" ? "#5F498A" : "#fff" }} className='m-0 py-0 px-3'  >


                                                <button style={{ color: setting === "report" ? "#fff" : "#919191", backgroundColor: "transparent" }} className='border-0 py-1 px-2' onClick={() => {
                                                    setSetting("report")
                                                }} >Reports </button>

                                            </li>





                                        </ul>}
                                        <li style={{ color: "#919191" }} className=" my-1 px-3 py-2 d-flex gap-2 items-center">
                                            {" "}
                                            <span>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                                                    <path d="M17.4414 7.22164L15.9948 8.67629L18.6418 11.3483H8.20774V13.4116H18.6418L15.9948 16.0733L17.4414 17.5383L22.5713 12.38L17.4414 7.22164ZM4.10387 5.1583H12.3116V3.09497H4.10387C2.97531 3.09497 2.05194 4.02347 2.05194 5.1583V19.6016C2.05194 20.7365 2.97531 21.665 4.10387 21.665H12.3116V19.6016H4.10387V5.1583Z" fill="#919191" />
                                                </svg>
                                            </span>{" "}
                                            <span style={{ cursor: "pointer" }} onClick={async () => {
                                                try {

                                                    const res = await axios.get(`${process.env.REACT_APP_API}logout/${myProfile._id}`)

                                                    if (res.status === 200) {

                                                        localStorage.clear()
                                                        sessionStorage.clear()
                                                        window.location.reload()
                                                        window.location.href = "/login";
                                                    }



                                                } catch (error) {
                                                    alert("Something went Wrong")
                                                }


                                            }}>

                                                Logout
                                            </span>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                        </div>
                        <div className="float-end position-relative col-lg-10 col-md-12 col-sm-12 col-12">




                            {userRole === '3' && <DashBoardSuper allUser={normalUser} userRole={userRole} />}
                            {userRole === '2' && <DashBoardSuper allUser={allAdmin} userRole={userRole} />}

                            {userRole === '5' && <MyTeamOnlyShow allUser={allAdmin} userRole={userRole} />}
                            {userRole === '4' && <DashBoardSuper allUser={blockUser} userRole={userRole} />}
                            {userRole === '' && <DashBoardSuper allUser={allAdmin} userRole={userRole} />}
                            {userRole === '7' && <LiveFeed1 allUser={allUser} />}
                            {userRole === 'dashBoard' && <ChartDashboard totalStatusWithMonth={totalStatusWithMonth} totalLeadsCount={totalLeadsCount} />}
                            {userRole === 'createUser' && <CreateUser />}
                            {userRole === 'setting' && <>
                                {setting === "apiSetting" && <SuperAdminApiKeySetting />}
                                {setting === "passwordSetting" && <Changepassword />}
                                {setting === "generalSetting" && <GeneralSetting />}
                                {setting === "report" && <Report allUser={allUser} taemmember={taemmember} />}
                            </>}
                            {userRole === 'noSettings' && <> {setting === "apiSetting" && <SuperAdminApiKeySetting />}
                                {setting === "passwordSetting" && <Changepassword />}
                            </>}


                            {userRole === 'AllLeads' && <div className=' '>
                                <Status userIdForStatus={mySuperTeam._id} userRoleForStatus={myProfile.userRole} />
                            </div>}
                            {userRole === 'todaysFollowUp' && <div className=' ' >
                                <Status adminLeads={"followUpStatus"} userIdForStatus={mySuperTeam._id} userRoleForStatus={myProfile.userRole} />
                            </div>}
                            {userRole === 'searchLead' && <div className=' ' >
                                <Status searchLead={searchLead} adminLeads={"searchLead"} userIdForStatus={mySuperTeam._id} userRoleForStatus={myProfile.userRole} />
                            </div>}

                            {userRole === teamAdminMatch && <div className=' '>
                                <Status userRoleForStatus={2} userIdForStatus={teamAdminMatch} />

                            </div>}
                            {userRole === 'leadAccordingToCallingStatus' && <div className=' '>
                                <Status adminLeads={"callAccordingLead"} userIdForStatus={mySuperTeam._id} userRoleForStatus={myProfile.userRole} />
                            </div>}
                            {userRole === 'dura' && <CallDuration />}
                            {userRole === 'userCallingDuration' && <CallDuration userId={userCallDuration} userName={userNameForCallDuration} />}


                            {userRole === 'myLeads' && <div className=' '>
                                <Status userIdForStatus={mySuperTeam._id} userRoleForStatus={myProfile.userRole} option={"myLeads"} />
                            </div>}



                            {userRole === 'userLeads' && <div className=' '>
                                <Status userRoleForStatus={3} userIdForStatus={teamAdminMatch} adminLeads={"userLeadsToShow"} option={"userLeads"} />
                            </div>}


                            {/* {userRole === 'AllLeads' && <DashBoard myLeads={allLeads} userRole={userRole} />} */}



                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SuperAdminDaashBoard
