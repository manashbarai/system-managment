import React, { useEffect, useState } from 'react'
import './SuperAdminAssign.css'
import { DataStorage } from '../../context/useCotext';
import axios from 'axios';

const SuperAdminAssign = (props) => {
    const { myProfile, normalUser, getAllTeam, team, allUser, superTeams } = DataStorage()
    const [filteredUsers, setFilteredUsers] = useState(props.makeSuperAdminTeam === true ? allUser.filter(e => e.userRole !== '1') : normalUser);
    const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
    const [checkboxes, setCheckboxes] = useState(normalUser);
    const headers = {
        Authorization: `${localStorage.getItem("crm_token")}`,
        'Content-Type': 'application/json',
    };

    const search = (e) => {
        const filterData = props.makeSuperAdminTeam === true ? allUser.filter(e => e.userRole !== '1') : normalUser;
        const searchValue = e.target.value;
        const filteredUsers = filterData.filter(user => user.fullName.toLowerCase().includes(searchValue.toLowerCase()));
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


    useEffect(() => {
        if (props.removie) {

            const teamuser = team.find(team => team._id === props.removeUser);

            const filteredUser = normalUser.filter(user => teamuser.user.includes(user._id));
            setFilteredUsers(filteredUser);
            
        } else {
            setFilteredUsers(normalUser);
        }
    }, [props.removie,filteredUsers])


    const setTeamAdminToUser = async () => {
        if (props.removie) {
            try {
                const setTeam = await axios.put(`${process.env.REACT_APP_API}removeTeamMember/${props.removeUser}`, { selectedCheckboxes }, { headers })
                if (setTeam.status === 200) {
                    alert("user Remove successfully")
                    getAllTeam(`${process.env.REACT_APP_API}team`)
                }
                props.createTeam()

            } catch (error) {
                console.log(error);
            }


        } else {


            if (props.updateTeam) {
                try {
                    const setTeam = await axios.put(`${process.env.REACT_APP_API}updateMember/${props.teamUpdate}`, { selectedCheckboxes }, { headers })
                    getAllTeam(`${process.env.REACT_APP_API}team`)
                    if (setTeam.status === 200) {
                        alert("user added successfully")
                    }
                    props.createTeam()

                } catch (error) {

                }
            }

            if (!props.updateTeam) {

                const filterData = props.makeSuperAdminTeam === true ? allUser.filter(e => e.userRole !== '1') : normalUser;

                const userName = filterData.filter(e => selectedCheckboxes.includes(e._id))
                let usersName = [];
                for (let i = 0; i < userName.length; i++) {
                    const element = userName[i];
                    usersName.push(element.fullName)
                }

                let data = {
                    email: props.email,
                    teamName: props.teamName,
                    adminId: props.teamAdminId,
                    teamId: myProfile._id,
                    superTeamId: superTeams._id,
                    tenantId: superTeams.tenantId,
                    user: selectedCheckboxes,
                    usersName: usersName
                }
                if (props.makeSuperAdminTeam === true) {
                    const selectTedUsers = allUser.filter(e => selectedCheckboxes.includes(e._id))
                    const selectTedUser = selectTedUsers.map(({ _id, userRole, fullName }) => ({
                        id: _id,
                        userRole,
                        userName: fullName
                    }));
                    data = {
                        email: props.email,
                        teamName: props.teamName,
                        superAdminId: props.teamAdminId,
                        user: selectTedUser,
                        tenantId: myProfile._id

                    }
                }

                try {
                    const url = props.makeSuperAdminTeam !== true ? `${process.env.REACT_APP_API}createTeam` : `${process.env.REACT_APP_API}superAdminTeam`

                    const setTeam = await axios.post(url, data, { headers })
                    if (setTeam.status === 200) {
                        getAllTeam(`${process.env.REACT_APP_API}team/superAdmin/${localStorage.getItem('crm_id')}`)

                    }
                    props.createTeam()

                } catch (error) {

                }
            }
        }
    }


    return (
        <>
            <div style={{ zIndex: 1 }} className='S_mainSection position-fixed top-0 start-0'>
                <div className='S_Popup'>
                    <div className='S_Close'>
                        <button type='button' className='btn' id='S_closeButton' onClick={() => {
                            props.updateTeam ? props.addmemberToTeam("") : props.createTeam()


                        }}>
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
                        <li className='col-md-4 S_Name'>Name</li>
                        <li className='col-md-4 S_Name'>Email Id</li>
                        <li className='col-md-4 S_Name'>User Role</li>

                    </ul>

                    {filteredUsers.length !== 0 && (filteredUsers.map((e, i) => {
                        let checked = selectedCheckboxes.find((lead) => lead === e._id);
                        checked = checked !== undefined ? true : false;
                        let box = team && team.some(team => team.user.includes(e._id));

                        const searchPurpose = superTeams.find(superTeam => superTeam._id === e.superTeamId)
                        if (props.removie) {
                            box = false
                        }

                        return <ul className='S_Heading1' key={e._id}>
                            <li className='col-md-4 S_Name1'>
                                {searchPurpose && searchPurpose._id === e.superTeamId ? <div className='bg-dark rounded-pill text-white px-1'>{searchPurpose.teamName} </div> : <div className='S_check'>

                                    {box === false && <input
                                        checked={checked}
                                        type="checkbox"
                                        className='form-check-input '
                                        id={e._id}
                                        onChange={handleCheckboxChange}
                                    />}
                                </div>}
                                <label className="form-check-label" for="flexCheckDefault">
                                    {e.fullName}
                                </label>
                            </li>
                            <li className='col-md-4 S_Email'>{e.email}</li>
                            {/* <p className='px-2 m-0 col-md-3 pb-0'>   {e.fullName} </p> */}
                            {/* <p className='px-2 m-0 col-md-4 pb-0'> {e.email} </p> */}
                            {myProfile.userRole !== '3' && <li className='col-md-4 S_User'>

                                {e.userRole === '3' && "User"}
                                {e.userRole === '1' && "SuperAdmin"}
                                {e.userRole === '2' && "Admin"}


                            </li>}


                        </ul>
                    }))}


<div className='mt-3 S_assign'><button className='S_assignButton23' onClick={setTeamAdminToUser}>{props.removie?"Remove":"Assign"} </button></div>



                </div>

            </div >
        </>
    )
}

export default SuperAdminAssign



