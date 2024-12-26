
import React, { useEffect, useState } from 'react'


import axios from 'axios';
import { DataStorage } from '../../../context/useCotext';

const CompanyTeamList = () => {

    const headers = {
        Authorization: `${localStorage.getItem("crm_token")}`,
        'Content-Type': 'application/json',
    };


    const { superTeams, getAllTeam } = DataStorage()









    // const deleteThisTeam = async (id) => {


    //     try {


    //         const removeTeam = await axios.delete(`${process.env.REACT_APP_API}deleteTeam/${id}`, { headers })



    //         alert(removeTeam.data.message)
    //         getAllTeam(`${process.env.REACT_APP_API}team`)





    //     } catch (error) {
    //         console.log(error);
    //     }
    // }


    // useEffect(() => {

    // }, [team])


    // const [openTeamList, setOpenTeamList] = useState("d-none")
    // const teamShow = (id) => {

    //     setTeamId(id)
    //     openTeamList === 'd-none' ? setOpenTeamList("openTeamList") : setOpenTeamList("d-none")

    // }
    // const [teamId, setTeamId] = useState("")

    // const [teamUpdate, setTeamUpdate] = useState("")

    return (
        <>



            <div className=' ST_upperSection mt-5   p-0 m-0 '>
                <div style={{ height: "614px", overflow: "auto", marginLeft: "30px" }} className='ST_main  '>
                    <ul  className='ST_Heading'>

                        <li  className='col-md-3 ST_Name'>Creation Time / Time </li>
                        <li  className='col-md-3 ST_Name'>Update Time / Time</li>
                        <li  className='col-md-2 ST_Name'>Team Name</li>
                        <li  className='col-md-2 ST_Name'>User List</li>
                      
                        <li  className='col-md-2 ST_Name'>Modify</li>
                    </ul>
                    {superTeams && superTeams.map((e, i) => {
                        return <ul className='ST_Heading'>

                            <li style={{color:"rgb(95, 73, 138)"}} className='col-md-3 ST_Name'>{new Date(e.createdAt).toISOString().slice(0,10)}{" / "}{new Date(e.createdAt).toLocaleTimeString()}</li>
                            <li style={{color:"rgb(95, 73, 138)"}} className='col-md-3 ST_Name'>{new Date(e.updatedAt).toISOString().slice(0,10)}{" / "}{new Date(e.updatedAt).toLocaleTimeString()}</li>
                            <li style={{color:"rgb(95, 73, 138)"}} className='col-md-2 ST_Name text-capitalize'>{e.teamName} </li>
                            <li style={{color:"rgb(95, 73, 138)"}} className='col-md-2 ST_Name'>{e.user[0].userName}<span className='bg-dark text-white px-2  mx-2'>{e.user.length}</span>  </li>
                            <li style={{color:"rgb(95, 73, 138)"}} className='col-md-2 ST_Name'>
                                <button className='border-0'> <img style={{width:"24px"}} src="../../images/edit.svg" alt="" /> </button>
                                <button className='border-0 mx-2'> <img style={{width:"90%"}} src="../../images/delete.svg" alt="" /> </button>

                            </li>
                            
                        </ul>
                    })}


                </div>
            </div>
        </>
    )
}

export default CompanyTeamList