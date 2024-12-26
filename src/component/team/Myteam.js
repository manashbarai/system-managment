import React, { useState } from 'react'
import './Myteam.css'
import { DataStorage } from '../../context/useCotext';
import axios from 'axios';
import Loader from '../Loder/Loader';

const Myteam = (props) => {

    const headers = {
        Authorization: `${localStorage.getItem("crm_token")}`,
        'Content-Type': 'application/json',
    };


    const { statusWithCounts, team, allAdmin, normalUser, isLoading, getAllTeam, getLeadAccordingStatus, getAllUser } = DataStorage()

    








    const updateTeam = async (teamId) => {

        const thisTeam = team && team.find(e => e._id === teamId)

        const unique = JSON.parse(localStorage.getItem('givingLeads'));
        const leads = [...new Set(unique)];
        const data = {
            lead: leads
        }

        try {
            const updateteam = await axios.put(`${process.env.REACT_APP_API}updateTeamLeads/${teamId}`, data, { headers })





            if (updateteam.status === 200) {
                statusWithCounts(sessionStorage.getItem('countStatus'))



                localStorage.removeItem('givingLeads')
                getAllTeam(`${process.env.REACT_APP_API}team/superAdmin/${localStorage.getItem('crm_id')}`)


                // getAllUser(`${process.env.REACT_APP_API}allUser`)

                alert(`${leads.length} Leads assign to ${team && thisTeam.teamName}`)
                getLeadAccordingStatus(sessionStorage.getItem('leadApi'))
            }



        } catch (error) {
            console.log(error);
        }

    }

    const assignToUser = async (userId) => {
        try {



            const unique = JSON.parse(localStorage.getItem('givingLeads'));
            const leads = [...new Set(unique)];
            const data = {
                receiveLeads: leads
                
            }
            const updateUserReceiveLeads = await axios.put(`${process.env.REACT_APP_API}updateUserLeads/${userId}`, data, { headers })
            if(updateUserReceiveLeads.status=200){ 
                
                alert(`${data.receiveLeads.length} Lead Submit successfully`)
                localStorage.removeItem('givingLeads')
                getAllTeam(`${process.env.REACT_APP_API}team`)
                getAllUser(`${process.env.REACT_APP_API}allUser`)

                statusWithCounts(`${process.env.REACT_APP_API}count/leads/${localStorage.getItem('crm_id')}?userRole=${localStorage.getItem('crm_userRole')}&myLead=${localStorage.getItem('crm_userRole') === '2' ? 'true' : 'false'}`)
                // getAllUser(`${process.env.REACT_APP_API}allUser`)
               
            }
        } catch (error) {
           if(error.status === 401) {
            localStorage.clear()
            sessionStorage.clear()
            window.location.reload();
            window.location.href = "/login";
           }
        }
    }
    const updateTeamWithUser=async(teamId, userId)=>{
        
        try {
            try {



                const unique = JSON.parse(localStorage.getItem('givingLeads'));
                const leads = [...new Set(unique)];
                const data = {
                    receiveLeads: leads
                    
                }
                const updateUserReceiveLeads = await axios.put(`${process.env.REACT_APP_API}updateTeamWithUserLeads/${teamId}/${userId}`, data, { headers })

                console.log("updateUserReceiveLeads",updateUserReceiveLeads);
                if(updateUserReceiveLeads.status=200){ 
                    
                    alert(`${data.receiveLeads.length} Lead Submit successfully`)
                    localStorage.removeItem('givingLeads')
                    getAllTeam(`${process.env.REACT_APP_API}team`)
                    getAllUser(`${process.env.REACT_APP_API}allUser`)
    
                    statusWithCounts(`${process.env.REACT_APP_API}count/leads/${localStorage.getItem('crm_id')}?userRole=${localStorage.getItem('crm_userRole')}&myLead=${localStorage.getItem('crm_userRole') === '2' ? 'true' : 'false'}`)
                    // getAllUser(`${process.env.REACT_APP_API}allUser`)
                   
                }
            } catch (error) {
               if(error.status === 401) {
                localStorage.clear()
                sessionStorage.clear()
                window.location.reload();
                window.location.href = "/login";
               }
            }
        } catch (error) {
            
        }
    }

    const [openTeamList, setOpenTeamList] = useState("d-none")
    const teamShow = () => {
        openTeamList === 'd-none' ? setOpenTeamList("openTeamList") : setOpenTeamList("d-none")

    }
    const [teamId, setTeamId] = useState("")
    const handleHover = (id) => {
        setTeamId(id)
        openTeamList === 'd-none' ? setOpenTeamList("openTeamList") : setOpenTeamList("d-none")
    }
    if (isLoading) {
        return (
            <div>
                <Loader loading={"Loading"} />
                {/* <h1>Loading ...</h1> */}
            </div>
        );
    }


    return (
        <>


            <div className='  ST_upperSection mt-5  p-0 m-0'>
                <div style={{ height: "614px", overflow: "auto" }} className='ST_main p-4'>
                    <div className='  d-inline-block border-bottom mb-2'>

                        <h2>Team List</h2>

                    </div>
                    <ul style={{ background: "var(--text-theme-color)", color: "var(--text-white-color)" }} className='d-flex border-bottom  custom-ul text-start'>
                        <li className='fixTeamWidths   list-unstyled fw-bold '>Admin Name  </li>
                        <li className='fixTeamWidths   list-unstyled fw-bold '>Team Name</li>
                        <li className='fixTeamWidths   list-unstyled fw-bold '>Team Member</li>
                        <li className='fixTeamWidths   list-unstyled fw-bold '>Leads Assigned</li>
                        <li className='fixTeamWidths   list-unstyled fw-bold '></li>

                    </ul>
                    {team && team.map((e, i) => {
                        let adminName = allAdmin && allAdmin.find(adminName => adminName._id === e.adminId)

                        const matchingObjects = normalUser.filter(obj1 =>
                            e.user.some(obj2 => obj1._id === obj2)
                        );

                        return <ul className='ST_Heading1'>
                            <li className='fixTeamWidths    list-unstyled  '>

                                <label className="form-check-label ST_User" for="flexCheckDefault" >
                                    {adminName && adminName.fullName}
                                </label>
                            </li>
                            <li className='fixTeamWidths    list-unstyled  '>Lead-A</li>
                            <li className='fixTeamWidths   list-unstyled '>
                                {matchingObjects.length !== 0 && matchingObjects[0].fullName}





                                <button style={{ fontSize: "13px", border: "1px solid #ccc", padding: "0 7px", borderRadius: "4px" }} id='' className=" mx-2 bg-body " onClick={teamShow}    >
                                    {matchingObjects.length}
                                </button>
                                {e._id === teamId && <div className={openTeamList}>
                                    {e.length !== 0 && matchingObjects.map((e, i) => {
                                        return <span key={e._id} className='mx-1 text-white'>
                                            {e.fullName} ,
                                        </span>
                                    })}

                                </div>}
                            </li>

                            <li className='fixTeamWidths   list-unstyled'>{e.lead.length} Leads</li>
                            <li className='fixTeamWidths   list-unstyled'><button className='btnHover' onClick={() => updateTeam(e._id)}  >Add Leads</button></li>

                        </ul>
                    })}
                    <div className='  d-inline-block border-bottom mb-2'>

                        <h2>User List</h2>

                    </div>
                    <ul style={{ background: "var(--text-theme-color)", color: "var(--text-white-color)" }} className=' d-flex border  custom-ul '>
                        <li className='fixTeamWidths   list-unstyled  '>User Name </li>
                        <li className='fixTeamWidths   list-unstyled  '>Team Name </li>


                        <li className='fixTeamWidths   list-unstyled  '>Leads Assigned</li>
                        <li className='fixTeamWidthsButton   list-unstyled  '></li>

                    </ul>
                    {normalUser && normalUser.map((e, i) => {


                        const searchData = team.find(data => data.user.includes(e._id));



                        return <ul className='d-flex custom-li border'>
                            <li className='fixTeamWidths   list-unstyled  '>

                                <label className="form-check-label ST_User" for="flexCheckDefault" >
                                    {e.fullName}
                                </label>
                            </li>

                            <li className='fixTeamWidths   list-unstyled  '>

                                <label className="form-check-label ST_User" for="flexCheckDefault" >
                                    {searchData ? searchData.teamName : "No Team "}
                                </label>
                            </li>


                            <li className='fixTeamWidths   list-unstyled  '>{e.receiveLeads.length} Leads</li>
                            <li className='fixTeamWidthsButton   list-unstyled  '><button className=' btnHover ' onClick={() => searchData ? updateTeamWithUser(searchData._id, e._id) : assignToUser(e._id)}  >Add Leads</button></li>

                        </ul>
                    })}

                </div>
            </div>
        </>
    )
}

export default Myteam