import React, { useEffect, useMemo, useState } from "react";




// import SuperAdminAssign from "./popUpcomponent/SuperAdminAssign";
import { DataStorage } from "../../../context/useCotext";

import axios from "axios";
import CompanyRegistrations from "./CompanyRegistrations";
import Loader from "../../../component/Loder/Loader";
const CompanyLists = (props) => {
    const headers = useMemo(() => ({
        Authorization: `${localStorage.getItem("crm_token")}`,
        'Content-Type': 'application/json',
    }), [])

    const { isLoading, plan } = DataStorage();
    const [allUser, setAllUser] = useState([])
    const [clintOnboard, setClintOnboard] = useState(false)
    const [registration, setRegistration] = useState({})
    const offclintOnboard = () => {

        setClintOnboard(false)
    }


    const fetchData = async (url) => {

        try {
            const res = await axios.get(url, { headers });
            const newData = res.data;
            setAllUser(newData)

        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const dealFinalizeds = (id, updated) => {
        const index = allUser.findIndex(user => user._id === id);
        if (index !== -1) {
            allUser.splice(index, 1, updated);
        }
    }
    useEffect(() => {
        fetchData(`${process.env.REACT_APP_API}company/all`)
    }, [allUser])

    if (isLoading) {
        return (
            <div>
                <Loader loading={"Loading"} />
                {/* <h1>Loading ...</h1> */}
            </div>
        );
    }


    return (
        <div style={{ paddingLeft: "30px" }} className=" mt-5 ">
            {clintOnboard && <div className='d-flex position-absolute top-0 w-100 py-5 h-100   justify-content-center  backgroundRgba start-0 z-1'>
                <CompanyRegistrations offclintOnboard={offclintOnboard} data={registration} dealFinalizeds={dealFinalizeds} modification={"edit"} />
            </div>}


            <div className="rounded  comopanylistsBorder ">
                <div
                    className="d-flex  justify-content-between col-md-5 border-bottom-0 bg-body   w-100"
                    style={{
                       
                       

                        borderTopRightRadius: "4px ",
                        borderBottomRightRadius: "0px ",
                        borderBottomLeftRadius: "0px ",
                        borderTopLeftRadius: "4px",
                    }}
                >
                    <input
                        style={{ background: "#F6F6F6" }}
                        type="text"
                        placeholder="Search by User Name"
                        className="form-control border-0 "
                    // onChange={search}
                    />
                </div>
                <div style={{ height: "81vh", overflow: "auto" }} className=" bg-body">
                    <div

                        className="  SU_main rounded-0 border-0 shadow-none py-2"
                    >
                        <ul className="d-flex m-0 p-0">

                            <li className="companyLead m-0 px-2 border-bottom list-unstyled text-secondary  ">Name</li>
                            <li className="companyLead m-0 px-2 border-bottom list-unstyled text-secondary ">Email Id</li>
                            <li className="companyLead m-0 px-2 border-bottom list-unstyled text-secondary ">Registration</li>
                            <li className="companyLead m-0 px-2 border-bottom list-unstyled text-secondary ">Validity</li>
                            <li className="companyLead m-0 px-2 border-bottom list-unstyled text-secondary ">Plan</li>
                            <li className="companyLead m-0 px-2 border-bottom list-unstyled text-secondary ">Modification</li>


                        </ul>

                        {allUser && allUser.length !== 0
                            && allUser.map((e, i) => {

                                const myPla = plan && plan.find((plan) => plan.id === parseInt(e.plan.planId));
                                let myPlan;
                                if (myPla) myPlan= myPla.planName
                                return (
                                    <ul
                                        className="d-flex   m-0 p-0 "
                                        key={e._id}
                                    >
                                        <li className=' companyLead border-bottom m-0 px-2 py-2'>
                                            <label className="form-check-label" htmlFor="flexCheckDefault">
                                                {e.companyName}
                                            </label>
                                        </li>
                                        <li className=' companyLead border-bottom m-0 px-2 py-2'>{e.email}</li>
                                        <li className="companyLead border-bottom m-0 px-2 py-2 ">
                                            {("0" + new Date(e.createdAt).getDate()).slice(-2)}/{("0" + (new Date(e.createdAt).getMonth() + 1)).slice(-2)}/{new Date(e.createdAt).getFullYear()}
                                        </li>
                                        <li className=' companyLead border-bottom m-0 px-2 py-2'> {("0" + new Date(e.plan.validation.endingTime).getDate()).slice(-2)}/{("0" + (new Date(e.plan.validation.endingTime).getMonth() + 1)).slice(-2)}/{new Date(e.plan.validation.endingTime).getFullYear()}    </li>
                                        <li className=' companyLead border-bottom m-0 px-2 py-2'>{myPlan !== undefined && myPlan}</li>

                                        <li className=' companyLead border-bottom m-0 px-2 py-2 d-flex gap-2'>
                                            <button className="btn border-0 position-relative p-0 m-0" onClick={async () => {
                                                try {
                                                    const deleteCompany = await axios.delete(`${process.env.REACT_APP_API}company/${e._id}`, { headers })
                                                    if (deleteCompany.status === 200) {
                                                        fetchData(`${process.env.REACT_APP_API}company/all`)

                                                    }
                                                } catch (error) {

                                                }
                                            }}> <img src="../../../../../images/delete.svg" alt="delete" /></button>
                                            <button className="btn border-0 position-relative p-0 m-0" onClick={() => {
                                                setRegistration(e)
                                                setClintOnboard(true)
                                            }}> <img style={{ width: "24px" }} src="../../../../../images/edit.svg" alt="delete" /></button>
                                            <button className="btn border position-relative " onClick={async () => {

                                                try {
                                                    const data = {
                                                        companyRole: e.companyRole === '4' ? '2' : '4'
                                                    }
                                                    const companyRegistration = await axios.put(`${process.env.REACT_APP_API}company/${e._id}`, data, { headers })
                                                    if (companyRegistration.status === 200) {
                                                        props.offclintOnboard()
                                                        props.dealFinalizeds(props.data._id, companyRegistration.data)
                                                        fetchData(`${process.env.REACT_APP_API}company/all`)
                                                    }
                                                } catch (error) {

                                                }
                                            }} > {e.companyRole === '4' && <span className="unblock">Unblock </span>}  <img style={{ width: "20px" }} src="../../../../../images/block.svg" alt="delete" />   </button>
                                        </li>

                                    </ul>
                                );
                            })}


                    </div>
                </div>
            </div>
        </div>
    );
};

export default CompanyLists;

