import React, { useEffect, useState } from 'react'
import './Myteam1.css'
import { DataStorage } from '../../context/useCotext';
import axios from 'axios';

const Myteam = (props) => {

    const headers = {
        Authorization: `${localStorage.getItem("crm_token")}`,
        'Content-Type': 'application/json',
    };


    const { isLoading, team, allAdmin, normalUser, allLeads, getAllTeam, getAllLeads } = DataStorage()


    
    const [teams, setTeams] = useState(team)
    const [teamObject, setTeamObject] = useState()


    useEffect(() => {

    }, [team])

    const deleteThisTeam = async (id) => {

        const thisTeam = team.find(e => e._id === id)
        const leads = allLeads.filter(e => thisTeam.lead.includes(e._id))

        try {
            const removeTeam = await axios.delete(`${process.env.REACT_APP_API}deleteTeam/${id}`, { headers })

                alert(removeTeam);
            // alert(removeTeam)


            // if (removeTeam.status === 200) {
            //     alert("Remove successFully This Team")
            //     getAllTeam(`${process.env.REACT_APP_API}team`)
            // }




        } catch (error) {
            alert(error);
        }
    }

    const updateTeam = async (teamId) => {

        const thisTeam = team.find(e => e._id === teamId)
        const leads = JSON.parse(localStorage.getItem('givingLeads'))


        const data = {
            lead: leads
        }

        try {
            const updateteam = await axios.put(`${process.env.REACT_APP_API}updateTeamLeads/${teamId}`, data, { headers })

            for (let i = 0; i < leads.length; i++) {
                const element = leads[i];
                const removeTeam = await axios.post(`${process.env.REACT_APP_API}leadUpdate/${element}`, { teamId }, { headers })

            }



            if (updateteam.status === 200) {
                getAllTeam(`${process.env.REACT_APP_API}team`)
                getAllLeads(`${process.env.REACT_APP_API}leads`)

            }



        } catch (error) {
            console.log(error);
        }

    }
    useEffect(() => {

    }, [team])

    
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

            <div className='container ST_upperSection mt-5 col-md-11 float-end p-0 m-0'>
                <div style={{ height: "614px", overflow: "auto" }} className='ST_main'>
                    <ul className='ST_Heading'>
                        <li className='fixTeamWidths  px-4 border-bottom list-unstyled'>Admin Name</li>
                        <li className='fixTeamWidths  px-4 border-bottom list-unstyled'>Team Name</li>
                        <li className='fixTeamWidths  px-4 border-bottom list-unstyled'>Team Member</li>
                        <li className='fixTeamWidths  px-4 border-bottom list-unstyled'>Leads Assigned</li>
                        <li className='fixTeamWidths  px-4 border-bottom list-unstyled'></li>
                        <li className='fixTeamWidths  px-4 border-bottom list-unstyled'></li>
                    </ul>
                    {team && team.map((e, i) => {
                        let adminName = allAdmin && allAdmin.find(adminName => adminName._id === e.adminId)
                        const matchingObjects = normalUser.filter(obj1 =>
                            e.user.some(obj2 => obj1._id === obj2)
                        );

                        return <ul className='d-flex'>
                            <li  className="fixTeamWidths  px-4 border-bottom list-unstyled  ">
                                <input style={{ marginTop: "10px" }} className="form-check-input ST_check" type="checkbox" value="" />
                                <label className="form-check-label ST_User" for="flexCheckDefault" >
                                    {adminName.fullName}
                                </label>
                            </li>
                            <li className='fixTeamWidths  px-4 border-bottom list-unstyled  '>Lead-A</li>
                            <li className=' fixTeamWidths  px-4 border-bottom list-unstyled  position-relative'>
                                {matchingObjects.map((e, i) => {
                                    return <span key={e._id} className='mx-1'>
                                        {e.fullName} ,
                                    </span>
                                })}
                            </li>
                            {/* <li className='col-md-2 ST_User'>Tapas Das</li> */}
                            <li className='col-md-2 ST_User'>{e.lead.length} Leads Assigned</li>
                            <li className='col-md-2 ST_assign'><button className='ST_AssignButton' onClick={() => updateTeam(e._id)}  >Add Leads</button></li>
                            <li className='col-md-2 ST_assign'><button className='ST_BlockButton' onClick={() => deleteThisTeam(e._id)}>Delete</button></li>
                        </ul>
                    })}


                </div>
            </div>
        </>
    )
}

export default Myteam




