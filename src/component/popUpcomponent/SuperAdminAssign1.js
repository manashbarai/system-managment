import React, { useState } from 'react'
import './SuperAdminAssign.css'
import { DataStorage } from '../../context/useCotext';
import axios from 'axios';

const SuperAdminAssign = (props) => {
    const { myProfile, normalUser,getAllTeam } = DataStorage()
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
    const [checkboxes, setCheckboxes] = useState(normalUser);
    const headers = {
        Authorization: `${localStorage.getItem("crm_token")}`,
        'Content-Type': 'application/json',
    };

    const search = (e) => {

        const searchValue = e.target.value;
        const filteredUsers = normalUser.filter(user => user.fullName.toLowerCase().includes(searchValue.toLowerCase()));
        setFilteredUsers(filteredUsers);
    }



    const handleCheckboxChange = (e) => {
       
        const { id, checked } = e.target;
        setCheckboxes({
            ...checkboxes,
            [id]: checked,
        });


        if (checked) {
            setSelectedCheckboxes((prevSelected) => [...prevSelected, id]);
        } else {
            setSelectedCheckboxes((prevSelected) =>
                prevSelected.filter((item) => item !== id)
            );
        }
    };

  

    const setTeamAdminToUser = async () => {


        const userName = normalUser.filter(e => selectedCheckboxes.includes(e._id))
        let usersName = [];
        for (let i = 0; i < userName.length; i++) {
            const element = userName[i];
            usersName.push(element.fullName)
        }

        const data = {
            email: props.email,
            teamName: props.teamName,
            adminId: props.teamAdminId,
            user: selectedCheckboxes,
            usersName: usersName
        }
        
        try {
            const setTeam = await axios.post(`${process.env.REACT_APP_API}createTeam`, data, { headers })
            getAllTeam(`${process.env.REACT_APP_API}team`)
            if (setTeam.status === 200) {
              alert("Hello")
            }
            props.createTeam()

        } catch (error) {

        }

    }
    return (
        <>
            <div className='S_mainSection position-fixed top-0 start-0'>
                <div className='S_Popup'>
                    <div className='S_Close'>
                        <button type='button' className='btn' id='S_closeButton' onClick={() => props.createTeam()}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
                                <path d="M14 27C21.1797 27 27 21.1797 27 14C27 6.8203 21.1797 1 14 1C6.8203 1 1 6.8203 1 14C1 21.1797 6.8203 27 14 27Z" stroke="#5F498A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M17.9001 10.1L10.1001 17.9" stroke="#5F498A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M10.1001 10.1L17.9001 17.9" stroke="#5F498A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </button>
                    </div>
                    <div className="S_search">
                        <i className="fa fa-search" id='S_Search'></i>
                        <input type="text" className="form-control" placeholder="Search by user name..." onChange={search} />
                    </div>

                    <ul className='S_Heading'>
                        <li className='col-md-3 S_Name'>Name</li>
                        <li className='col-md-3 S_Name'>Email Id</li>
                        <li className='col-md-3 S_Name'>User Role</li>
                        <li className='col-md-3 S_Name'>Option</li>
                    </ul>

                    {filteredUsers.length !== 0 ? (filteredUsers.map((e, i) => {
                        let checked = selectedCheckboxes.find((lead) => lead === e._id);
                        checked = checked !== undefined ? true : false;
                        return <ul className='S_Heading1' key={e._id}>
                            <li className='col-md-3 S_Name1'>
                                <input
                                    checked={checked}
                                    type="checkbox"
                                    className='form-check-input S_check'
                                    id={e._id}
                                    onChange={handleCheckboxChange}
                                />
                                <label className="form-check-label" for="flexCheckDefault">
                                    {e.fullName}
                                </label>
                            </li>
                            <li className='col-md-3 S_Email'>{e.email}</li>
                            {/* <p className='px-2 m-0 col-md-3 pb-0'>   {e.fullName} </p> */}
                            {/* <p className='px-2 m-0 col-md-4 pb-0'> {e.email} </p> */}
                            {myProfile.userRole !== '3' && <li className='col-md-3 S_User'>

                                {e.userRole === '3' && "User"}
                                {e.userRole === '1' && "SuperAdmin"}
                                {e.userRole === '2' && "Admin"}


                            </li>}
                            <button className='S_AssignButton'>Assign</button>

                            {/* <div>
                                <input
                                    type="checkbox"

                                    checked={checked}
                                    className=''
                                    id={e._id}
                                    onChange={handleCheckboxChange}

                                   
                                />

                            </div> */}















                        </ul>
                    })) : (normalUser.map((e, i) => {
                        let checked = selectedCheckboxes.find((lead) => lead === e._id);
                        checked = checked !== undefined ? true : false;
                        return <ul className='S_Heading1' key={e._id}>
                            <li className='col-md-3 S_Name1'>
                                <input 
                                className="form-check-input S_check"
                                 type="checkbox"
                                 checked={checked}
                              
                                 
                                 id={e._id}
                                 onChange={handleCheckboxChange}
                                 />
                                <label className="form-check-label" for="flexCheckDefault">
                                    {e.fullName}
                                </label>
                            </li>
                            <li className='col-md-3 S_Email'>{e.email}</li>
                            {/* <p className='px-2 m-0 col-md-3 pb-0'>   {e.fullName} </p> */}
                            {/* <p className='px-2 m-0 col-md-4 pb-0'> {e.email} </p> */}
                            {myProfile.userRole !== '3' && <li className='col-md-3 S_User'>

                                {e.userRole === '3' && "User"}
                                {e.userRole === '1' && "SuperAdmin"}
                                {e.userRole === '2' && "Admin"}


                            </li>}


                            <div>

                                <button className='S_AssignButton float-end' >Assign</button>
                            </div>















                        </ul>
                    }))}


                    <li className='col-md-3 S_assign'><button className='S_AssignButton float-start' onClick={setTeamAdminToUser}>Assign</button></li>



                </div>

            </div >
        </>
    )
}

export default SuperAdminAssign