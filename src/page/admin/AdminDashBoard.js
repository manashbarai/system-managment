import React, { useState } from 'react'

import { DataStorage } from '../../context/useCotext';
import { useNavigate } from 'react-router-dom'
import './AdminDashBoard.css'
import DashBoardSuper from '../../component/DashBoardSuper';
import Status from '../../component/Status';

import axios from 'axios';
import Changepassword from '../../settings/Changepassword'
import LiveFeed1 from '../../component/liveFeed/LiveFeed1';
import ChartDashboard from '../superAdmin/dashBoardPanel/ChartDashboard';
import CallDuration from '../../component/callDuration/CallDuration';
import Report from '../../component/reports/Report';

const AdminDashBoard = () => {
    const navigate = useNavigate()
    const { myProfile, normalUser, myTeams, getLeadAccordingStatus, statusWithCounts, mySuperTeam } = DataStorage()

    if (!myProfile) navigate("/login")
    if (!myTeams) {
        alert("waiting For Your team")
        navigate("/adminWithOutTeam")
    }
    const [searchLead, setSearchLead] = useState("")
    const [userCallingDuration, setUserCallingDuration] = useState(false)
    const [userCallDuration, setUserCallDuration] = useState("")
    const [userNameForCallDuration, setUserNameForCallDuration] = useState("")

    const [userLists, setUserLists] = useState([])

    const [myTeam, setMyTeam] = useState([])
    const [userName, setUserName] = useState("")
    const [leads, setLeads] = useState("7")
    const [popUpuserList, setPopUpuserList] = useState(false)
    const taemmember = () => {

        const myTeamMember = normalUser.filter(nuser => myTeams.user.includes(nuser._id))
        setMyTeam(myTeamMember)

    }






    const [userLeadName, setUserLeadName] = useState("")
    const [userIdRole, setUserIdRole] = useState("")

    const [mobileMenu, setMobileMenu] = useState("mobileBorder displayShow largerDisplay");



    const option = (e, i, argument) => {
        setLeads(e)
        if (i !== undefined) {
            setUserLeadName(e)


        }

        if (argument) setUserName("user")
        else setUserName("")



        setPopUpuserList(false)
    }

    const closePopUp = () => {
        setPopUpuserList(false)
    }



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



                <div className="jobSearchBody  container-lg ">

                    <div className=' mobileMenuBtn'>
                        <div className='d-lg-none' onClick={showMobileMenu}  >
                            {mobileMenucross ? <img style={{ border: '1px solid #000', borderRadius: '4px', padding: '10px' }} src={require("../admin/images/bars-solid.svg").default} alt='icon' /> : <div style={{ background: 'var(--text-theme-color)' }} className=' text-white p-2 px-3'>
                                X
                            </div>

                            }
                        </div>
                    </div>



                    <div className="container position-relative d-lg-flex justify-content-between  d-md-block d-sm-block ">

                        <>{localStorage.getItem("givingLeads") && JSON.parse(localStorage.getItem("givingLeads")).length>0 && <button style={{ zIndex: "2" }} className='btn btn-dark rounded-pill mx-2 mt-2  end-0 sss_Assign' onClick={() => {
                            if (JSON.stringify(localStorage.getItem("givingLeads")).length !== 0 || localStorage.getItem("givingLeads")) {

                                setPopUpuserList(true)
                            }
                            taemmember()
                        }}>
                            Assign To
                        </button>}
                        </>






                       

                            <div className={mobileMenu}>


                                <div className="flex-column dashBoardLeftSide gap-2  bg-white  justify-content-between ">

                                    {/* <div className='d-flex d-lg-block'>
                                    <div className="jobFilter">
                                    </div>
                                </div> */}
                                    <div style={{ background: "" }} className='rounded d-flex flex-column '>



                                        <div style={{ minHeight: "550px", maxHeight: "auto" }} className='d-flex flex-column justify-content-between'>


                                            <ul className="list-unstyled mt-2">
                                                <li style={{ background: leads === "7" ? "#5F498A" : "#fff" }} className='d-flex px-4 mb-1 position-relative'>
                                                    <button style={{ color: leads === "7" ? "#fff" : "#919191", background: "transparent" }} className="live-button px-3" onClick={() => {
                                                        option("7")
                                                        taemmember()

                                                    }} >
                                                        Live Feed
                                                    </button>
                                                    <div className="red-light"></div>
                                                </li>
                                                <div style={{ background: leads === "searchLead" ? "#5F498A" : "#fff" }} className='jobSeekerOption  px-3 py-1  position-relative d-flex align-items-center' >

                                                    {leads === "searchLead" ? <button type='button' style={{ right: "18px", width: "25px", height: "25px", transform: "translate(0, 0)", verticalAlign: "top", cursor: "pointer" }} className='position-absolute   px-1 bg-transparent border-0' onClick={() => {
                                                        sessionStorage.setItem("setLeadStatus", 1)
                                                        statusWithCounts(`${process.env.REACT_APP_API}allLeadCount?name=${searchLead}`)

                                                        getLeadAccordingStatus(`${process.env.REACT_APP_API}allLeads?limit=10&page=1&name=${searchLead}&status=1`)
                                                    }} >


                                                        <img style={{ width: "100%", height: "100%" }} src="../../images/searchWhite.svg" alt="" />



                                                    </button> : <span >
                                                        <img src="../../images/searchIcon.svg" alt="" />
                                                    </span>}



                                                    {leads === "searchLead" ? <input onChange={(e) => setSearchLead(e.target.value)} style={{ width: "84%", paddingLeft: "5px", border: "none", outline: "none", borderRadius: '4px' }} type="text" placeholder='Search Leads' /> : <button style={{ color: leads === "searchLead" ? "#fff" : "#919191", background: "transparent", fontSize: "18px" }} className='border-0 py-2 px-2 ' onClick={() => {
                                                        option("searchLead")
                                                        sessionStorage.setItem("setLeadStatus", 1)
                                                        statusWithCounts(`${process.env.REACT_APP_API}allLeadCount`)
                                                        // sessionStorage.setItem('leadSearchText', "")

                                                        getLeadAccordingStatus(`${process.env.REACT_APP_API}allLeads?limit=10&page=1&status=1`)
                                                        //scrollToTop()

                                                    }} >Search Leads  </button>}

                                                </div>
                                                <li style={{ background: leads === "reports" ? "#5F498A" : "#fff" }} className='d-flex px-4 mb-1 position-relative align-items-center'>
                                                    {
                                                        leads === "reports" ? <span >
                                                            <img style={{ width: "19px", marginLeft: "-7px" }} src={"../images/Group1.png"} alt="" />
                                                        </span> : <span >
                                                            <img style={{ width: "19px", marginLeft: "-7px" }} src={"../images/Group.png"} alt="" />
                                                        </span>
                                                    }
                                                    <button style={{ color: leads === "reports" ? "#fff" : "#919191", background: "transparent" }} className="live-button " onClick={() => {
                                                        option("reports")
                                                        taemmember()

                                                    }} >

                                                        <span>




                                                        </span>
                                                        Reports
                                                    </button>

                                                </li>

                                                <li style={{ background: leads === "dashBoard" ? "#5F498A" : "#fff" }} className=' py-2 gap-2  d-flex  px-3   ' >
                                                    {
                                                        leads === "dashBoard" ? <span >
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                                                                <path fillRule="evenodd" clipRule="evenodd" d="M3.48225 9.81609e-08H4.76775C5.21865 -3.50184e-06 5.58232 -7.21648e-06 5.87835 0.0193824C6.1827 0.0393192 6.45187 0.0813494 6.70673 0.182689C7.31929 0.426276 7.80596 0.893484 8.05969 1.48154C8.16525 1.7262 8.20905 1.98461 8.22983 2.27678C8.25 2.56097 8.25 2.9101 8.25 3.34296V4.57704C8.25 5.0099 8.25 5.35907 8.22983 5.64322C8.20905 5.93539 8.16525 6.1938 8.05969 6.43846C7.80596 7.02652 7.31929 7.49372 6.70673 7.7373C6.45187 7.83864 6.1827 7.88069 5.87835 7.90063C5.58232 7.92 5.21865 7.92 4.76775 7.92H3.48225C3.03135 7.92 2.66768 7.92 2.37165 7.90063C2.0673 7.88069 1.79813 7.83864 1.54328 7.7373C0.930713 7.49372 0.444038 7.02652 0.190301 6.43846C0.0847389 6.1938 0.0409575 5.93539 0.02019 5.64322C-7.51717e-06 5.35903 -3.64775e-06 5.0099 1.02251e-07 4.57704V3.34296C-3.64775e-06 2.9101 -7.51717e-06 2.56097 0.02019 2.27678C0.0409575 1.98461 0.0847389 1.7262 0.190301 1.48154C0.444038 0.893484 0.930713 0.426276 1.54328 0.182689C1.79813 0.0813494 2.0673 0.0393192 2.37165 0.0193824C2.66768 -7.21648e-06 3.03135 -3.50184e-06 3.48225 9.81609e-08ZM2.43971 0.977148C2.18625 0.993744 2.03865 1.02481 1.92596 1.0696C1.55843 1.21576 1.26641 1.49609 1.11416 1.84892C1.06751 1.9571 1.03515 2.0988 1.01786 2.34212C1.00028 2.58977 1.00001 2.90614 1.00001 3.35999V4.56001C1.00001 5.01386 1.00028 5.33023 1.01786 5.57788C1.03515 5.8212 1.06751 5.9629 1.11416 6.07108C1.26641 6.42391 1.55843 6.70424 1.92596 6.8504C2.03865 6.89519 2.18625 6.92626 2.43971 6.94285C2.69768 6.95974 3.02722 6.95999 3.49999 6.95999H4.75001C5.22277 6.95999 5.55233 6.95974 5.81029 6.94285C6.06375 6.92626 6.21135 6.89519 6.32404 6.8504C6.69157 6.70424 6.98359 6.42391 7.13584 6.07108C7.18249 5.9629 7.21485 5.8212 7.23214 5.57788C7.24972 5.33023 7.24999 5.01386 7.24999 4.56001V3.35999C7.24999 2.90614 7.24972 2.58977 7.23214 2.34212C7.21485 2.0988 7.18249 1.9571 7.13584 1.84892C6.98359 1.49609 6.69157 1.21576 6.32404 1.0696C6.21135 1.02481 6.06375 0.993744 5.81029 0.977148C5.55233 0.960264 5.22277 0.960012 4.75001 0.960012H3.49999C3.02722 0.960012 2.69768 0.960264 2.43971 0.977148ZM3.48225 9.36H4.76775C5.21865 9.36 5.58232 9.36 5.87835 9.37937C6.1827 9.39931 6.45187 9.44136 6.70673 9.5427C7.31929 9.78628 7.80596 10.2535 8.05969 10.8415C8.16525 11.0862 8.20905 11.3446 8.22983 11.6368C8.25 11.921 8.25 12.2701 8.25 12.703V13.937C8.25 14.3699 8.25 14.7191 8.22983 15.0032C8.20905 15.2954 8.16525 15.5538 8.05969 15.7985C7.80596 16.3865 7.31929 16.8537 6.70673 17.0973C6.45187 17.1986 6.1827 17.2407 5.87835 17.2606C5.58232 17.28 5.21865 17.28 4.76775 17.28H3.48225C3.03135 17.28 2.66768 17.28 2.37165 17.2606C2.0673 17.2407 1.79813 17.1986 1.54328 17.0973C0.930713 16.8537 0.444038 16.3865 0.190301 15.7985C0.0847389 15.5538 0.0409575 15.2954 0.02019 15.0032C-7.51717e-06 14.719 -3.64775e-06 14.3699 1.02251e-07 13.937V12.703C-3.64775e-06 12.2701 -7.51717e-06 11.921 0.02019 11.6368C0.0409575 11.3446 0.0847389 11.0862 0.190301 10.8415C0.444038 10.2535 0.930713 9.78628 1.54328 9.5427C1.79813 9.44136 2.0673 9.39931 2.37165 9.37937C2.66768 9.36 3.03135 9.36 3.48225 9.36ZM2.43971 10.3371C2.18625 10.3537 2.03865 10.3848 1.92596 10.4296C1.55843 10.5758 1.26641 10.8561 1.11416 11.2089C1.06751 11.3171 1.03515 11.4588 1.01786 11.7021C1.00028 11.9498 1.00001 12.2661 1.00001 12.72V13.92C1.00001 14.3739 1.00028 14.6902 1.01786 14.9379C1.03515 15.1812 1.06751 15.3229 1.11416 15.4311C1.26641 15.7839 1.55843 16.0642 1.92596 16.2104C2.03865 16.2552 2.18625 16.2863 2.43971 16.3029C2.69768 16.3197 3.02722 16.32 3.49999 16.32H4.75001C5.22277 16.32 5.55233 16.3197 5.81029 16.3029C6.06375 16.2863 6.21135 16.2552 6.32404 16.2104C6.69157 16.0642 6.98359 15.7839 7.13584 15.4311C7.18249 15.3229 7.21485 15.1812 7.23214 14.9379C7.24972 14.6902 7.24999 14.3739 7.24999 13.92V12.72C7.24999 12.2661 7.24972 11.9498 7.23214 11.7021C7.21485 11.4588 7.18249 11.3171 7.13584 11.2089C6.98359 10.8561 6.69157 10.5758 6.32404 10.4296C6.21135 10.3848 6.06375 10.3537 5.81029 10.3371C5.55233 10.3203 5.22277 10.32 4.75001 10.32H3.49999C3.02722 10.32 2.69768 10.3203 2.43971 10.3371ZM13.2323 9.81609e-08H14.5177C14.9686 -3.50184e-06 15.3323 -7.21648e-06 15.6283 0.0193824C15.9327 0.0393192 16.2019 0.0813494 16.4567 0.182689C17.0693 0.426276 17.556 0.893484 17.8097 1.48154C17.9153 1.7262 17.9591 1.98461 17.9798 2.27678C18 2.56097 18 2.9101 18 3.34296V4.57704C18 5.0099 18 5.35907 17.9798 5.64322C17.9591 5.93539 17.9153 6.1938 17.8097 6.43846C17.556 7.02652 17.0693 7.49372 16.4567 7.7373C16.2019 7.83864 15.9327 7.88069 15.6283 7.90063C15.3323 7.92 14.9686 7.92 14.5177 7.92H13.2323C12.7814 7.92 12.4177 7.92 12.1217 7.90063C11.8173 7.88069 11.5481 7.83864 11.2933 7.7373C10.6807 7.49372 10.194 7.02652 9.94031 6.43846C9.83475 6.1938 9.79095 5.93539 9.77017 5.64322C9.75 5.35903 9.75 5.0099 9.75 4.57704V3.34296C9.75 2.9101 9.75 2.56097 9.77017 2.27678C9.79095 1.98461 9.83475 1.7262 9.94031 1.48154C10.194 0.893484 10.6807 0.426276 11.2933 0.182689C11.5481 0.0813494 11.8173 0.0393192 12.1217 0.0193824C12.4177 -7.21648e-06 12.7814 -3.50184e-06 13.2323 9.81609e-08ZM12.1897 0.977148C11.9363 0.993744 11.7886 1.02481 11.676 1.0696C11.3084 1.21576 11.0164 1.49609 10.8642 1.84892C10.8175 1.9571 10.7851 2.0988 10.7679 2.34212C10.7503 2.58977 10.75 2.90614 10.75 3.35999V4.56001C10.75 5.01386 10.7503 5.33023 10.7679 5.57788C10.7851 5.8212 10.8175 5.9629 10.8642 6.07108C11.0164 6.42391 11.3084 6.70424 11.676 6.8504C11.7886 6.89519 11.9363 6.92626 12.1897 6.94285C12.4477 6.95974 12.7772 6.95999 13.25 6.95999H14.5C14.9728 6.95999 15.3023 6.95974 15.5603 6.94285C15.8137 6.92626 15.9614 6.89519 16.074 6.8504C16.4416 6.70424 16.7336 6.42391 16.8858 6.07108C16.9325 5.9629 16.9649 5.8212 16.9821 5.57788C16.9997 5.33023 17 5.01386 17 4.56001V3.35999C17 2.90614 16.9997 2.58977 16.9821 2.34212C16.9649 2.0988 16.9325 1.9571 16.8858 1.84892C16.7336 1.49609 16.4416 1.21576 16.074 1.0696C15.9614 1.02481 15.8137 0.993744 15.5603 0.977148C15.3023 0.960264 14.9728 0.960012 14.5 0.960012H13.25C12.7772 0.960012 12.4477 0.960264 12.1897 0.977148ZM13.2323 9.36H14.5177C14.9686 9.36 15.3323 9.36 15.6283 9.37937C15.9327 9.39931 16.2019 9.44136 16.4567 9.5427C17.0693 9.78628 17.556 10.2535 17.8097 10.8415C17.9153 11.0862 17.9591 11.3446 17.9798 11.6368C18 11.921 18 12.2701 18 12.703V13.937C18 14.3699 18 14.7191 17.9798 15.0032C17.9591 15.2954 17.9153 15.5538 17.8097 15.7985C17.556 16.3865 17.0693 16.8537 16.4567 17.0973C16.2019 17.1986 15.9327 17.2407 15.6283 17.2606C15.3323 17.28 14.9686 17.28 14.5177 17.28H13.2323C12.7814 17.28 12.4177 17.28 12.1217 17.2606C11.8173 17.2407 11.5481 17.1986 11.2933 17.0973C10.6807 16.8537 10.194 16.3865 9.94031 15.7985C9.83475 15.5538 9.79095 15.2954 9.77017 15.0032C9.75 14.719 9.75 14.3699 9.75 13.937V12.703C9.75 12.2701 9.75 11.921 9.77017 11.6368C9.79095 11.3446 9.83475 11.0862 9.94031 10.8415C10.194 10.2535 10.6807 9.78628 11.2933 9.5427C11.5481 9.44136 11.8173 9.39931 12.1217 9.37937C12.4177 9.36 12.7814 9.36 13.2323 9.36ZM12.1897 10.3371C11.9363 10.3537 11.7886 10.3848 11.676 10.4296C11.3084 10.5758 11.0164 10.8561 10.8642 11.2089C10.8175 11.3171 10.7851 11.4588 10.7679 11.7021C10.7503 11.9498 10.75 12.2661 10.75 12.72V13.92C10.75 14.3739 10.7503 14.6902 10.7679 14.9379C10.7851 15.1812 10.8175 15.3229 10.8642 15.4311C11.0164 15.7839 11.3084 16.0642 11.676 16.2104C11.7886 16.2552 11.9363 16.2863 12.1897 16.3029C12.4477 16.3197 12.7772 16.32 13.25 16.32H14.5C14.9728 16.32 15.3023 16.3197 15.5603 16.3029C15.8137 16.2863 15.9614 16.2552 16.074 16.2104C16.4416 16.0642 16.7336 15.7839 16.8858 15.4311C16.9325 15.3229 16.9649 15.1812 16.9821 14.9379C16.9997 14.6902 17 14.3739 17 13.92V12.72C17 12.2661 16.9997 11.9498 16.9821 11.7021C16.9649 11.4588 16.9325 11.3171 16.8858 11.2089C16.7336 10.8561 16.4416 10.5758 16.074 10.4296C15.9614 10.3848 15.8137 10.3537 15.5603 10.3371C15.3023 10.3203 14.9728 10.32 14.5 10.32H13.25C12.7772 10.32 12.4477 10.3203 12.1897 10.3371Z" fill="white" />
                                                            </svg>
                                                        </span> : <span >
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                                                                <path fillRule="evenodd" clipRule="evenodd" d="M3.48225 9.81609e-08H4.76775C5.21865 -3.50184e-06 5.58232 -7.21648e-06 5.87835 0.0193824C6.1827 0.0393192 6.45187 0.0813494 6.70673 0.182689C7.31929 0.426276 7.80596 0.893484 8.05969 1.48154C8.16525 1.7262 8.20905 1.98461 8.22983 2.27678C8.25 2.56097 8.25 2.9101 8.25 3.34296V4.57704C8.25 5.0099 8.25 5.35907 8.22983 5.64322C8.20905 5.93539 8.16525 6.1938 8.05969 6.43846C7.80596 7.02652 7.31929 7.49372 6.70673 7.7373C6.45187 7.83864 6.1827 7.88069 5.87835 7.90063C5.58232 7.92 5.21865 7.92 4.76775 7.92H3.48225C3.03135 7.92 2.66768 7.92 2.37165 7.90063C2.0673 7.88069 1.79813 7.83864 1.54328 7.7373C0.930713 7.49372 0.444038 7.02652 0.190301 6.43846C0.0847389 6.1938 0.0409575 5.93539 0.02019 5.64322C-7.51717e-06 5.35903 -3.64775e-06 5.0099 1.02251e-07 4.57704V3.34296C-3.64775e-06 2.9101 -7.51717e-06 2.56097 0.02019 2.27678C0.0409575 1.98461 0.0847389 1.7262 0.190301 1.48154C0.444038 0.893484 0.930713 0.426276 1.54328 0.182689C1.79813 0.0813494 2.0673 0.0393192 2.37165 0.0193824C2.66768 -7.21648e-06 3.03135 -3.50184e-06 3.48225 9.81609e-08ZM2.43971 0.977148C2.18625 0.993744 2.03865 1.02481 1.92596 1.0696C1.55843 1.21576 1.26641 1.49609 1.11416 1.84892C1.06751 1.9571 1.03515 2.0988 1.01786 2.34212C1.00028 2.58977 1.00001 2.90614 1.00001 3.35999V4.56001C1.00001 5.01386 1.00028 5.33023 1.01786 5.57788C1.03515 5.8212 1.06751 5.9629 1.11416 6.07108C1.26641 6.42391 1.55843 6.70424 1.92596 6.8504C2.03865 6.89519 2.18625 6.92626 2.43971 6.94285C2.69768 6.95974 3.02722 6.95999 3.49999 6.95999H4.75001C5.22277 6.95999 5.55233 6.95974 5.81029 6.94285C6.06375 6.92626 6.21135 6.89519 6.32404 6.8504C6.69157 6.70424 6.98359 6.42391 7.13584 6.07108C7.18249 5.9629 7.21485 5.8212 7.23214 5.57788C7.24972 5.33023 7.24999 5.01386 7.24999 4.56001V3.35999C7.24999 2.90614 7.24972 2.58977 7.23214 2.34212C7.21485 2.0988 7.18249 1.9571 7.13584 1.84892C6.98359 1.49609 6.69157 1.21576 6.32404 1.0696C6.21135 1.02481 6.06375 0.993744 5.81029 0.977148C5.55233 0.960264 5.22277 0.960012 4.75001 0.960012H3.49999C3.02722 0.960012 2.69768 0.960264 2.43971 0.977148ZM3.48225 9.36H4.76775C5.21865 9.36 5.58232 9.36 5.87835 9.37937C6.1827 9.39931 6.45187 9.44136 6.70673 9.5427C7.31929 9.78628 7.80596 10.2535 8.05969 10.8415C8.16525 11.0862 8.20905 11.3446 8.22983 11.6368C8.25 11.921 8.25 12.2701 8.25 12.703V13.937C8.25 14.3699 8.25 14.7191 8.22983 15.0032C8.20905 15.2954 8.16525 15.5538 8.05969 15.7985C7.80596 16.3865 7.31929 16.8537 6.70673 17.0973C6.45187 17.1986 6.1827 17.2407 5.87835 17.2606C5.58232 17.28 5.21865 17.28 4.76775 17.28H3.48225C3.03135 17.28 2.66768 17.28 2.37165 17.2606C2.0673 17.2407 1.79813 17.1986 1.54328 17.0973C0.930713 16.8537 0.444038 16.3865 0.190301 15.7985C0.0847389 15.5538 0.0409575 15.2954 0.02019 15.0032C-7.51717e-06 14.719 -3.64775e-06 14.3699 1.02251e-07 13.937V12.703C-3.64775e-06 12.2701 -7.51717e-06 11.921 0.02019 11.6368C0.0409575 11.3446 0.0847389 11.0862 0.190301 10.8415C0.444038 10.2535 0.930713 9.78628 1.54328 9.5427C1.79813 9.44136 2.0673 9.39931 2.37165 9.37937C2.66768 9.36 3.03135 9.36 3.48225 9.36ZM2.43971 10.3371C2.18625 10.3537 2.03865 10.3848 1.92596 10.4296C1.55843 10.5758 1.26641 10.8561 1.11416 11.2089C1.06751 11.3171 1.03515 11.4588 1.01786 11.7021C1.00028 11.9498 1.00001 12.2661 1.00001 12.72V13.92C1.00001 14.3739 1.00028 14.6902 1.01786 14.9379C1.03515 15.1812 1.06751 15.3229 1.11416 15.4311C1.26641 15.7839 1.55843 16.0642 1.92596 16.2104C2.03865 16.2552 2.18625 16.2863 2.43971 16.3029C2.69768 16.3197 3.02722 16.32 3.49999 16.32H4.75001C5.22277 16.32 5.55233 16.3197 5.81029 16.3029C6.06375 16.2863 6.21135 16.2552 6.32404 16.2104C6.69157 16.0642 6.98359 15.7839 7.13584 15.4311C7.18249 15.3229 7.21485 15.1812 7.23214 14.9379C7.24972 14.6902 7.24999 14.3739 7.24999 13.92V12.72C7.24999 12.2661 7.24972 11.9498 7.23214 11.7021C7.21485 11.4588 7.18249 11.3171 7.13584 11.2089C6.98359 10.8561 6.69157 10.5758 6.32404 10.4296C6.21135 10.3848 6.06375 10.3537 5.81029 10.3371C5.55233 10.3203 5.22277 10.32 4.75001 10.32H3.49999C3.02722 10.32 2.69768 10.3203 2.43971 10.3371ZM13.2323 9.81609e-08H14.5177C14.9686 -3.50184e-06 15.3323 -7.21648e-06 15.6283 0.0193824C15.9327 0.0393192 16.2019 0.0813494 16.4567 0.182689C17.0693 0.426276 17.556 0.893484 17.8097 1.48154C17.9153 1.7262 17.9591 1.98461 17.9798 2.27678C18 2.56097 18 2.9101 18 3.34296V4.57704C18 5.0099 18 5.35907 17.9798 5.64322C17.9591 5.93539 17.9153 6.1938 17.8097 6.43846C17.556 7.02652 17.0693 7.49372 16.4567 7.7373C16.2019 7.83864 15.9327 7.88069 15.6283 7.90063C15.3323 7.92 14.9686 7.92 14.5177 7.92H13.2323C12.7814 7.92 12.4177 7.92 12.1217 7.90063C11.8173 7.88069 11.5481 7.83864 11.2933 7.7373C10.6807 7.49372 10.194 7.02652 9.94031 6.43846C9.83475 6.1938 9.79095 5.93539 9.77017 5.64322C9.75 5.35903 9.75 5.0099 9.75 4.57704V3.34296C9.75 2.9101 9.75 2.56097 9.77017 2.27678C9.79095 1.98461 9.83475 1.7262 9.94031 1.48154C10.194 0.893484 10.6807 0.426276 11.2933 0.182689C11.5481 0.0813494 11.8173 0.0393192 12.1217 0.0193824C12.4177 -7.21648e-06 12.7814 -3.50184e-06 13.2323 9.81609e-08ZM12.1897 0.977148C11.9363 0.993744 11.7886 1.02481 11.676 1.0696C11.3084 1.21576 11.0164 1.49609 10.8642 1.84892C10.8175 1.9571 10.7851 2.0988 10.7679 2.34212C10.7503 2.58977 10.75 2.90614 10.75 3.35999V4.56001C10.75 5.01386 10.7503 5.33023 10.7679 5.57788C10.7851 5.8212 10.8175 5.9629 10.8642 6.07108C11.0164 6.42391 11.3084 6.70424 11.676 6.8504C11.7886 6.89519 11.9363 6.92626 12.1897 6.94285C12.4477 6.95974 12.7772 6.95999 13.25 6.95999H14.5C14.9728 6.95999 15.3023 6.95974 15.5603 6.94285C15.8137 6.92626 15.9614 6.89519 16.074 6.8504C16.4416 6.70424 16.7336 6.42391 16.8858 6.07108C16.9325 5.9629 16.9649 5.8212 16.9821 5.57788C16.9997 5.33023 17 5.01386 17 4.56001V3.35999C17 2.90614 16.9997 2.58977 16.9821 2.34212C16.9649 2.0988 16.9325 1.9571 16.8858 1.84892C16.7336 1.49609 16.4416 1.21576 16.074 1.0696C15.9614 1.02481 15.8137 0.993744 15.5603 0.977148C15.3023 0.960264 14.9728 0.960012 14.5 0.960012H13.25C12.7772 0.960012 12.4477 0.960264 12.1897 0.977148ZM13.2323 9.36H14.5177C14.9686 9.36 15.3323 9.36 15.6283 9.37937C15.9327 9.39931 16.2019 9.44136 16.4567 9.5427C17.0693 9.78628 17.556 10.2535 17.8097 10.8415C17.9153 11.0862 17.9591 11.3446 17.9798 11.6368C18 11.921 18 12.2701 18 12.703V13.937C18 14.3699 18 14.7191 17.9798 15.0032C17.9591 15.2954 17.9153 15.5538 17.8097 15.7985C17.556 16.3865 17.0693 16.8537 16.4567 17.0973C16.2019 17.1986 15.9327 17.2407 15.6283 17.2606C15.3323 17.28 14.9686 17.28 14.5177 17.28H13.2323C12.7814 17.28 12.4177 17.28 12.1217 17.2606C11.8173 17.2407 11.5481 17.1986 11.2933 17.0973C10.6807 16.8537 10.194 16.3865 9.94031 15.7985C9.83475 15.5538 9.79095 15.2954 9.77017 15.0032C9.75 14.719 9.75 14.3699 9.75 13.937V12.703C9.75 12.2701 9.75 11.921 9.77017 11.6368C9.79095 11.3446 9.83475 11.0862 9.94031 10.8415C10.194 10.2535 10.6807 9.78628 11.2933 9.5427C11.5481 9.44136 11.8173 9.39931 12.1217 9.37937C12.4177 9.36 12.7814 9.36 13.2323 9.36ZM12.1897 10.3371C11.9363 10.3537 11.7886 10.3848 11.676 10.4296C11.3084 10.5758 11.0164 10.8561 10.8642 11.2089C10.8175 11.3171 10.7851 11.4588 10.7679 11.7021C10.7503 11.9498 10.75 12.2661 10.75 12.72V13.92C10.75 14.3739 10.7503 14.6902 10.7679 14.9379C10.7851 15.1812 10.8175 15.3229 10.8642 15.4311C11.0164 15.7839 11.3084 16.0642 11.676 16.2104C11.7886 16.2552 11.9363 16.2863 12.1897 16.3029C12.4477 16.3197 12.7772 16.32 13.25 16.32H14.5C14.9728 16.32 15.3023 16.3197 15.5603 16.3029C15.8137 16.2863 15.9614 16.2552 16.074 16.2104C16.4416 16.0642 16.7336 15.7839 16.8858 15.4311C16.9325 15.3229 16.9649 15.1812 16.9821 14.9379C16.9997 14.6902 17 14.3739 17 13.92V12.72C17 12.2661 16.9997 11.9498 16.9821 11.7021C16.9649 11.4588 16.9325 11.3171 16.8858 11.2089C16.7336 10.8561 16.4416 10.5758 16.074 10.4296C15.9614 10.3848 15.8137 10.3537 15.5603 10.3371C15.3023 10.3203 14.9728 10.32 14.5 10.32H13.25C12.7772 10.32 12.4477 10.3203 12.1897 10.3371Z" fill="#919191" />
                                                            </svg>
                                                        </span>
                                                    }

                                                    <button className='dashBoardHeading border-0' style={{ color: leads === "dashBoard" ? "#fff" : "#919191", background: "transparent" }} onClick={() => option("dashBoard")}> Dashboard  </button>
                                                </li>
                                                <li style={{ background: leads === "dura" ? "#5F498A" : "#fff" }} className='jobSeekerOption  px-3  my-2'>

                                                    {leads === "dura" ? <span>



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



                                                    <button style={{ color: leads === "dura" ? "#fff" : "#919191", background: "transparent" }} className='border-0 py-2 px-2' onClick={() => {
                                                        option("dura")
                                                        setUserCallDuration("");
                                                        // sessionStorage.setItem("setLeadStatus", 1)
                                                        taemmember()

                                                        setUserCallingDuration(false)

                                                        // sessionStorage.setItem('leadSearchText', "")


                                                    }} >DURA  </button>

                                                    <button className='border-0 bg-transparent my-2 float-end' onClick={() => {
                                                        taemmember()
                                                        userCallingDuration === true ? setUserCallingDuration(false) : setUserCallingDuration(true)
                                                        option('dura')
                                                    }}  >
                                                        {userCallingDuration ? <img style={{ width: "19px" }} src="../../images/upArrow.png" alt="upDirection" /> : <img style={{ width: "19px" }} src="../../images/downArrow.png" alt="downDirection" />}
                                                    </button>

                                                </li>

                                                {leads === 'dura' && userCallingDuration === true && <li className='list-unstyled p-2'>
                                                    <input
                                                        type="text"

                                                        style={{ border: "1px solid rgb(145, 145, 145)" }}
                                                        onChange={(e) => {
                                                            const filteredUsers = myTeam.filter((user) => {
                                                                return user.fullName.toLowerCase().includes(e.target.value.toLowerCase());
                                                            });

                                                            setUserLists(filteredUsers)
                                                        }}
                                                    />

                                                    {userLists && userLists.length > 0 ? <> {userLists.slice(0, 3).map((user, index) => (
                                                        <li style={{ background: userCallDuration === user._id ? "#5F498A" : "#fff" }} key={user._id}>
                                                            <button style={{ color: userCallDuration === user._id ? "#fff" : "#000" }} className='border-0 bg-transparent w-100 text-start' onClick={() => {

                                                                setUserCallDuration(user._id);
                                                                setUserNameForCallDuration(user.fullName);
                                                            }}>
                                                                {user.fullName}
                                                            </button>
                                                        </li>
                                                    ))}</> : <>{
                                                        myTeam.slice(0, 3).map((user, index) => (
                                                            <li style={{ background: userCallDuration === user._id ? "#5F498A" : "#fff" }} key={user._id}>
                                                                <button style={{ color: userCallDuration === user._id ? "#fff" : "#000" }} className='border-0 bg-transparent w-100 text-start' onClick={() => {

                                                                    setUserCallDuration(user._id);
                                                                    setUserNameForCallDuration(user.fullName);
                                                                }}>
                                                                    {user.fullName}
                                                                </button>
                                                            </li>
                                                        ))
                                                    } </>}

                                                </li>}





















                                                <li style={{ background: leads === "myLeads" ? "#5F498A" : "#fff" }} className='jobSeekerOption px-3  mb-2'>
                                                    {leads === "myLeads" ? <span>

                                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="22" viewBox="0 0 18 22" fill="none">
                                                            <path d="M11 1H3C2.46957 1 1.96086 1.21071 1.58579 1.58579C1.21071 1.96086 1 2.46957 1 3V19C1 19.5304 1.21071 20.0391 1.58579 20.4142C1.96086 20.7893 2.46957 21 3 21H15C15.5304 21 16.0391 20.7893 16.4142 20.4142C16.7893 20.0391 17 19.5304 17 19V7L11 1Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                            <path d="M11 1V7H17" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                            <path d="M13 12H5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                            <path d="M13 16H5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                            <path d="M7 8H6H5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                        </svg>
                                                    </span> : <><span>

                                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="22" viewBox="0 0 18 22" fill="none">
                                                            <path d="M11 1H3C2.46957 1 1.96086 1.21071 1.58579 1.58579C1.21071 1.96086 1 2.46957 1 3V19C1 19.5304 1.21071 20.0391 1.58579 20.4142C1.96086 20.7893 2.46957 21 3 21H15C15.5304 21 16.0391 20.7893 16.4142 20.4142C16.7893 20.0391 17 19.5304 17 19V7L11 1Z" stroke="grey" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                            <path d="M11 1V7H17" stroke="grey" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                            <path d="M13 12H5" stroke="grey" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                            <path d="M13 16H5" stroke="grey" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                            <path d="M7 8H6H5" stroke="grey" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                        </svg>
                                                    </span></>}


                                                    <button style={{ color: leads === "myLeads" ? "#fff" : "#919191", backgroundColor: "transparent" }} className='border-0 px-1 py-2' onClick={() => {
                                                        option("myLeads")
                                                        localStorage.setItem("currentPage", 1)
                                                        sessionStorage.setItem("setLeadStatus", 1)
                                                        statusWithCounts(`${process.env.REACT_APP_API}count/leads/${myProfile._id}?userRole=${myProfile.userRole}&myLead=true`)
                                                        sessionStorage.setItem('leadSearchText', "")
                                                        getLeadAccordingStatus(`${process.env.REACT_APP_API}classify/leads/${myProfile._id}?userRole=${myProfile.userRole}&status=1&page=${parseInt(localStorage.getItem('currentPage'))}&limit=${sessionStorage.getItem('leadsLimit') ? sessionStorage.getItem('leadsLimit') : 10}&myLead=true&states=allstate&aboutStatus=status`)
                                                        //scrollToTop()
                                                    }} >My Leads  </button>

                                                </li>






                                                <div>

                                                    <li style={{ background: leads === "My Team" ? "#5F498A" : "#fff" }} className='jobSeekerOption  px-3  my-2 ' >
                                                        {leads === "My Team" ?
                                                            <span>

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


                                                        <button style={{ color: leads === "My Team" ? "#fff" : "#919191", backgroundColor: "transparent" }} className='border-0 px-1 py-2' onClick={() => {
                                                            userName === "" ? setUserName("user") : setUserName("")

                                                            setLeads("My Team")
                                                            taemmember()
                                                            localStorage.setItem("currentPage", 1)
                                                            sessionStorage.setItem("setLeadStatus", 1)
                                                            statusWithCounts(`${process.env.REACT_APP_API}count/leads/${myProfile._id}?userRole=${myProfile.userRole}&myLead=true`)
                                                            sessionStorage.setItem('leadSearchText', "")
                                                            getLeadAccordingStatus(`${process.env.REACT_APP_API}classify/leads/${myProfile._id}?userRole=${myProfile.userRole}&status=1&page=${parseInt(localStorage.getItem('currentPage'))}&limit=${sessionStorage.getItem('leadsLimit') ? sessionStorage.getItem('leadsLimit') : 10}&myLead=true&states=allstate&aboutStatus=status`)

                                                        }}  >My Team   </button>

                                                    </li>








                                                    {userName !== "" && myTeam.length !== 0 && myTeam.map((e, i) => {
                                                        return <li key={e._id} style={{ background: leads === `${e.fullName}` ? "rgb(95, 73, 138)" : "#fff" }} className='jobSeekerOption  px-3'>

                                                            {leads === `${e.fullName}` ? <span>

                                                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="20" viewBox="0 0 18 20" fill="none">
                                                                    <path d="M17 19V17C17 15.9391 16.5786 14.9217 15.8284 14.1716C15.0783 13.4214 14.0609 13 13 13H5C3.93913 13 2.92172 13.4214 2.17157 14.1716C1.42143 14.9217 1 15.9391 1 17V19" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                    <path d="M9 9C11.2091 9 13 7.20914 13 5C13 2.79086 11.2091 1 9 1C6.79086 1 5 2.79086 5 5C5 7.20914 6.79086 9 9 9Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                </svg>
                                                            </span> : <span>
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="20" viewBox="0 0 18 20" fill="none">
                                                                    <path d="M17 19V17C17 15.9391 16.5786 14.9217 15.8284 14.1716C15.0783 13.4214 14.0609 13 13 13H5C3.93913 13 2.92172 13.4214 2.17157 14.1716C1.42143 14.9217 1 15.9391 1 17V19" stroke="#919191" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                    <path d="M9 9C11.2091 9 13 7.20914 13 5C13 2.79086 11.2091 1 9 1C6.79086 1 5 2.79086 5 5C5 7.20914 6.79086 9 9 9Z" stroke="#919191" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                </svg>
                                                            </span>}




                                                            <button style={{ background: "transparent", color: leads === `${e.fullName}` ? "#fff" : "#919191" }} className='border-0 px-1 py-2' onClick={() => {
                                                                option(e.fullName, e._id, "notClose")
                                                                setUserIdRole(e._id)
                                                                sessionStorage.setItem('leadSearchText', "")
                                                                sessionStorage.setItem("setLeadStatus", 1)
                                                                statusWithCounts(`${process.env.REACT_APP_API}count/leads/${e._id}?userRole=3&aboutStatus=status`)

                                                                // getLeadAccordingStatus(`${process.env.REACT_APP_API}classify/leads/${e._id}?userRole=${e.userRole}&status=1&page=${parseInt(localStorage.getItem('currentPage'))}&limit=${sessionStorage.getItem('leadsLimit')?sessionStorage.getItem('leadsLimit'):10}`)
                                                                getLeadAccordingStatus(`${process.env.REACT_APP_API}classify/leads/${e._id}?userRole=${e.userRole}&status=1&page=1&limit=${sessionStorage.getItem('leadsLimit') ? sessionStorage.getItem('leadsLimit') : 10}&aboutStatus=status&states=allstate`)
                                                                //scrollToTop()
                                                            }}

                                                            > {e.fullName}  </button>

                                                        </li>
                                                    })}

                                                    <li style={{ background: leads === "leadAccordingToCallingStatus" ? "#5F498A" : "#fff" }} className='jobSeekerOption  px-3  my-2 pb-0 mb-0'    >
                                                        {leads === "leadAccordingToCallingStatus" ?
                                                            <span>


                                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="23" viewBox="0 0 23 23" fill="none">
                                                                    <path d="M13.9381 5C14.9149 5.19057 15.8125 5.66826 16.5162 6.37194C17.2199 7.07561 17.6976 7.97326 17.8881 8.95M13.9381 1C15.9674 1.22544 17.8597 2.13417 19.3044 3.57701C20.749 5.01984 21.6601 6.91101 21.8881 8.94M20.8881 16.92V19.92C20.8892 20.1985 20.8322 20.4742 20.7206 20.7293C20.6091 20.9845 20.4454 21.2136 20.2402 21.4019C20.035 21.5901 19.7927 21.7335 19.5289 21.8227C19.265 21.9119 18.9855 21.9451 18.7081 21.92C15.631 21.5856 12.6751 20.5341 10.0781 18.85C7.66194 17.3147 5.61345 15.2662 4.07812 12.85C2.38809 10.2412 1.33636 7.27099 1.00812 4.18C0.983127 3.90347 1.01599 3.62476 1.10462 3.36162C1.19324 3.09849 1.33569 2.85669 1.52288 2.65162C1.71008 2.44655 1.93792 2.28271 2.19191 2.17052C2.44589 2.05833 2.72046 2.00026 2.99812 2H5.99812C6.48342 1.99522 6.95391 2.16708 7.32188 2.48353C7.68985 2.79999 7.93019 3.23945 7.99812 3.72C8.12474 4.68007 8.35957 5.62273 8.69812 6.53C8.83266 6.88792 8.86178 7.27691 8.78202 7.65088C8.70227 8.02485 8.51698 8.36811 8.24812 8.64L6.97812 9.91C8.40167 12.4135 10.4746 14.4864 12.9781 15.91L14.2481 14.64C14.52 14.3711 14.8633 14.1858 15.2372 14.1061C15.6112 14.0263 16.0002 14.0555 16.3581 14.19C17.2654 14.5286 18.2081 14.7634 19.1681 14.89C19.6539 14.9585 20.0975 15.2032 20.4146 15.5775C20.7318 15.9518 20.9003 16.4296 20.8881 16.92Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                                </svg>
                                                            </span> : <span>
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="23" viewBox="0 0 23 23" fill="none">
                                                                    <path d="M13.9381 5C14.9149 5.19057 15.8125 5.66826 16.5162 6.37194C17.2199 7.07561 17.6976 7.97326 17.8881 8.95M13.9381 1C15.9674 1.22544 17.8597 2.13417 19.3044 3.57701C20.749 5.01984 21.6601 6.91101 21.8881 8.94M20.8881 16.92V19.92C20.8892 20.1985 20.8322 20.4742 20.7206 20.7293C20.6091 20.9845 20.4454 21.2136 20.2402 21.4019C20.035 21.5901 19.7927 21.7335 19.5289 21.8227C19.265 21.9119 18.9855 21.9451 18.7081 21.92C15.631 21.5856 12.6751 20.5341 10.0781 18.85C7.66194 17.3147 5.61345 15.2662 4.07812 12.85C2.38809 10.2412 1.33636 7.27099 1.00812 4.18C0.983127 3.90347 1.01599 3.62476 1.10462 3.36162C1.19324 3.09849 1.33569 2.85669 1.52288 2.65162C1.71008 2.44655 1.93792 2.28271 2.19191 2.17052C2.44589 2.05833 2.72046 2.00026 2.99812 2H5.99812C6.48342 1.99522 6.95391 2.16708 7.32188 2.48353C7.68985 2.79999 7.93019 3.23945 7.99812 3.72C8.12474 4.68007 8.35957 5.62273 8.69812 6.53C8.83266 6.88792 8.86178 7.27691 8.78202 7.65088C8.70227 8.02485 8.51698 8.36811 8.24812 8.64L6.97812 9.91C8.40167 12.4135 10.4746 14.4864 12.9781 15.91L14.2481 14.64C14.52 14.3711 14.8633 14.1858 15.2372 14.1061C15.6112 14.0263 16.0002 14.0555 16.3581 14.19C17.2654 14.5286 18.2081 14.7634 19.1681 14.89C19.6539 14.9585 20.0975 15.2032 20.4146 15.5775C20.7318 15.9518 20.9003 16.4296 20.8881 16.92Z" stroke="#919191" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                                </svg>
                                                            </span>}


                                                        <button style={{ color: leads === "leadAccordingToCallingStatus" ? "#fff" : "#919191", background: "transparent" }} className='border-0 py-2 px-2' onClick={() => {
                                                            option("leadAccordingToCallingStatus")
                                                            sessionStorage.setItem("setLeadStatus", 1)

                                                            statusWithCounts(`${process.env.REACT_APP_API}count/leads/${myProfile._id}?userRole=${myProfile.userRole}&myLead=true&aboutStatus=callingStatus`)
                                                            sessionStorage.setItem('leadSearchText', "")
                                                            getLeadAccordingStatus(`${process.env.REACT_APP_API}classify/leads/${myProfile._id}?userRole=${myProfile.userRole}&status=${mySuperTeam && mySuperTeam.companyCallingStatus[0].id}&page=${parseInt(localStorage.getItem('currentPage'))}&limit=${sessionStorage.getItem('leadsLimit') ? sessionStorage.getItem('leadsLimit') : 10}&aboutStatus=callingStatus&states=allstate`)
                                                            //scrollToTop()

                                                        }} >Calling Status  </button>



                                                    </li>

                                                    <li style={{ background: leads === "todaysFollowUp" ? "#5F498A" : "#fff" }} className='jobSeekerOption  px-3  my-2 pb-0 mb-0'    >
                                                        {leads === "todaysFollowUp" ?
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

                                                        <button disabled style={{ color: leads === "todaysFollowUp" ? "#fff" : "#919191", background: "transparent" }} className='border-0 py-2 px-2' onClick={() => {
                                                            option("todaysFollowUp")

                                                            sessionStorage.setItem("setLeadStatus", 5)
                                                            statusWithCounts(`${process.env.REACT_APP_API}count/leads/${myProfile._id}?userRole=${myProfile.userRole}&myLead=true`)

                                                            sessionStorage.setItem('leadSearchText', "")
                                                            // getLeadAccordingStatus(`${process.env.REACT_APP_API}classify/leads/${myProfile._id}?userRole=${myProfile.userRole}&status=${sessionStorage.getItem('statusId')}&page=${parseInt(localStorage.getItem('currentPage'))}&limit=${sessionStorage.getItem('leadsLimit')?sessionStorage.getItem('leadsLimit'):10}&myLead=false&followUp=true&states=allstate&date=${sessionStorage.getItem('followUpdate')}`)

                                                            getLeadAccordingStatus(`${process.env.REACT_APP_API}classify/leads/${myProfile._id}?userRole=2&status=5&page=${parseInt(localStorage.getItem('currentPage'))}&limit=${sessionStorage.getItem('leadsLimit') ? sessionStorage.getItem('leadsLimit') : 10}&myLead=true&followUp=true&aboutStatus=status&states=allstate `)

                                                            //scrollToTop()


                                                        }} >Follow Up  </button>



                                                    </li>









                                                </div>
                                            </ul>


                                            {/* left side dashboard */}
                                            <ul className="list-unstyled">
                                                <li style={{ color: "#919191", cursor: 'pointer' }} className="mt-2 my-1 px-3 py-2 -2 d-flex gap-2 items-center" onClick={() => option("setting")}>

                                                    <span>
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
                                                    Settings
                                                </li>
                                                <li className=" my-1 px-3 py-2 rounded-2 d-flex gap-2 items-center">
                                                    {" "}
                                                    <span>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                                                            <path d="M17.4414 7.22164L15.9948 8.67629L18.6418 11.3483H8.20774V13.4116H18.6418L15.9948 16.0733L17.4414 17.5383L22.5713 12.38L17.4414 7.22164ZM4.10387 5.1583H12.3116V3.09497H4.10387C2.97531 3.09497 2.05194 4.02347 2.05194 5.1583V19.6016C2.05194 20.7365 2.97531 21.665 4.10387 21.665H12.3116V19.6016H4.10387V5.1583Z" fill="#919191" />
                                                        </svg>
                                                    </span>
                                                    <span style={{ color: "#919191", cursor: "pointer" }} onClick={async () => {
                                                        try {
                                                            const res = await axios.get(`${process.env.REACT_APP_API}logout/${myProfile._id}`)

                                                            if (res.status === 200) {
                                                                localStorage.removeItem("crm_id");
                                                                localStorage.removeItem("crm_userRole");
                                                                localStorage.removeItem("givingLeads");
                                                                localStorage.removeItem("teamAdmin");
                                                                localStorage.removeItem("statuses");
                                                                localStorage.removeItem("crm_token");
                                                                sessionStorage.clear()
                                                                window.location.reload()
                                                                window.location.href = '/login'
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
                            </div>
                        
                        <div className="float-end position-relative col-lg-10 col-md-12 col-sm-12 col-12">
                            {popUpuserList && <div className='  position-fixed d-flex justify-content-center align-items-center' style={{ zIndex: 2, width: "100%", left: "0", top: "0", height: "100vh", background: "rgba(0,0,0,0.8)" }}>
                                <div style={{ height: "500px", overflowY: "scroll", background: "#f6f6f6" }} className='col-md-6  p-3 rounded'>
                                    <div className='asignPopUp '>

                                        <button onClick={() => {
                                            option(`${leads}`)
                                            // localStorage.removeItem("")
                                        }
                                        }> X </button>
                                    </div>
                                    <DashBoardSuper close={closePopUp} allUser={myTeam} />

                                </div>
                            </div>}



                            {leads === "myLeads" && <><Status  userIdForStatus={myProfile._id} userRoleForStatus={myProfile.userRole} /> </>}
                            {leads === "My Team" && <><Status userIdForStatus={myProfile._id} userRoleForStatus={myProfile.userRole} /> </>}
                            {leads === "7" && <><LiveFeed1 allUser={myTeam} taemmember={taemmember} /> </>}

                            {leads === "leadAccordingToCallingStatus" &&
                                <><Status adminLeads={'callAccordingLead'} userIdForStatus={myProfile._id} userRoleForStatus={myProfile.userRole} /> </>}
                            {/* {leads === "AllLeads" && <><Status myLeads={myLeads}  />  </>} */}
                            {leads === userLeadName && <Status userIdForStatus={userIdRole} userRoleForStatus={'3'} />}
                            {leads === 'setting' && <Changepassword />}
                            {leads === 'todaysFollowUp' && <><Status userIdForStatus={myProfile._id} userRoleForStatus={myProfile.userRole} followUp={'todaysFollowUp'} adminLeads={'followUpStatus'} /> </>}
                            {leads === 'dashBoard' && <ChartDashboard />}
                            {leads === 'dura' && userCallDuration === "" && <CallDuration />}
                            {leads === 'reports' && userCallDuration === "" && <Report allUser={myTeam} taemmember={taemmember} />}
                            {leads === 'dura' && userCallDuration !== "" && <CallDuration userId={userCallDuration} userName={userNameForCallDuration} />}
                            {leads === 'searchLead' && <div className=' ' >
                                <Status searchLead={searchLead} adminLeads={"searchLead"} userIdForStatus={myProfile._id} userRoleForStatus={myProfile.userRole} />
                            </div>}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminDashBoard
