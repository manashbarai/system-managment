import React, { useEffect, useState } from 'react'
import './Myteam1.css'
import { DataStorage } from '../../context/useCotext';
import axios from 'axios';
import SuperAdminAssign from '../popUpcomponent/SuperAdminAssign';

const MyTeamOnlyShow = (props) => {

    const headers = {
        Authorization: `${localStorage.getItem("crm_token")}`,
        'Content-Type': 'application/json',
    };
    

    const { team, allAdmin, normalUser, getAllTeam } = DataStorage()



    useEffect(()=>{
        getAllTeam(`${process.env.REACT_APP_API}team/superAdmin/${localStorage.getItem('crm_id')}`)
    },[team])
    




    const deleteThisTeam = async (id) => {


        try {


            const removeTeam = await axios.delete(`${process.env.REACT_APP_API}deleteTeam/${id}`, { headers })

            if(removeTeam.status = 200){

                
                alert(removeTeam.data.message)
                getAllTeam(`${process.env.REACT_APP_API}team/superAdmin/${localStorage.getItem('crm_id')}`)
                
            }




        } catch (error) {
            console.log(error);
        }
    }


    

    const [openTeamList, setOpenTeamList] = useState("d-none")
    const teamShow = (id) => {

        setTeamId(id)
        openTeamList === 'd-none' ? setOpenTeamList("openTeamList") : setOpenTeamList("d-none")

    }
    const [teamId, setTeamId] = useState("")

    const [teamUpdate, setTeamUpdate] = useState("")
    const [removie,setRemovie]=useState(false)

    
    const addmemberToTeam = (teamId) => {
        setTeamUpdate(teamId)

    }
    const removeMemberFromTeam=(teamId)=>{
        setTeamUpdate(teamId)
        setRemovie(true)
    }

    return (
        <>

            {teamUpdate !== "" && <SuperAdminAssign removie={removie} removeUser={teamUpdate} teamUpdate={teamUpdate} addmemberToTeam={addmemberToTeam} updateTeam={"updateTeam"} />}


            <div className=' ST_upperSection mt-5   p-0 m-0 '>
                <div style={{ height: "614px", overflow: "auto"}} className='ST_main  marginLeft'>
                    <ul className='d-flex'>
                        <li className='fixTeamWidths  px-4 border-bottom list-unstyled'>Admin Name</li>
                        <li className='fixTeamWidths  px-4 border-bottom list-unstyled'>Team Name</li>
                        <li className='fixTeamWidths  px-4 border-bottom list-unstyled'>Team Member</li>
                        <li className='fixTeamWidths  px-4 border-bottom list-unstyled'>Leads Assigned</li>
                       
                    </ul>
                    {team && team.length != 0 && team.map((e, i) => {
                        let adminName = allAdmin && allAdmin.find(adminName => adminName._id === e.adminId)

                        const matchingObjects = normalUser && normalUser.filter(obj1 =>
                            e.user.some(obj2 => obj1._id === obj2)
                        );

                        return <ul className='d-flex'>

                            <li className='fixTeamWidths  px-4 border-bottom list-unstyled'>
                                {/* <input style={{ marginTop: "10px" }} className="form-check-input ST_check" type="checkbox" value="" /> */}
                                <label className="form-check-label ST_User" htmlFor="flexCheckDefault" >
                                    {adminName && adminName.fullName}
                                </label>
                            </li>
                            <li className='fixTeamWidths  px-4 border-bottom list-unstyled'>Lead-A</li>
                            <li className='fixTeamWidths  px-4 border-bottom list-unstyledposition-relative'>
                                {matchingObjects.length !== 0 && matchingObjects[0].fullName}




                                <button id='' className="btn S_tooltipButton" onClick={() => teamShow(e._id)}   >
                                    {matchingObjects.length}
                                </button>
                                <div>
                                <button style={{ fontSize: "10px", }} className='btn btn-sm border rounded p-0 m-0 ' onClick={() =>{
                                    setRemovie(false)
                                     addmemberToTeam(e._id)}  
                                     
                                }>Add user</button>

                                <button style={{ fontSize: "10px", }} className='btn btn-sm border rounded p-0 m-0 ' onClick={() => removeMemberFromTeam(e._id)}  >Remove User</button>
                                </div>

                                {e._id === teamId && <div style={{ position: "absolute", left: "144px", top: "-2px", paddingBottom: "20px" }} className={openTeamList}>
                                    {e && matchingObjects.map((e, i) => {
                                        return <span key={e._id} className='mx-1 text-white'>
                                            {e.fullName} ,
                                        </span>
                                    })}

                                </div>}
                            </li>
                            {/* <li className='col-md-2 ST_User'>Tapas Das</li> */}
                            <li className='col-md-2 px-5 ST_User border-bottom'>{e.lead.length} Leads</li>

                            <li className='col-md-2 ST_assign border-bottom'><button className='ST_BlockButton' onClick={() => deleteThisTeam(e._id)}>Delete</button></li>
                        </ul>
                    })}


                </div>
            </div>
        </>
    )
}

export default MyTeamOnlyShow