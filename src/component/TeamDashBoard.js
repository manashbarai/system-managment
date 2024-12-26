import React, {  useState } from 'react'

import axios from 'axios';
import './DashBoard.css'

import { DataStorage } from '../context/useCotext';

const TeamDashBoard = (props) => {


 

    const { myProfile, normalUser } = DataStorage()
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
            usersName: usersName,
           
        }

        try {
            await axios.post(`${process.env.REACT_APP_API}createTeam`, data, { headers })
            
            
            
            props.createTeam()

        } catch (error) {
            console.log(error);
        }

    }



    return (
<>
        <div>

            {/* <SuperAdminAssign /> */}
        </div>
        <div className='d-flex justify-content-center align-item-center '>
            <div className='rounded  container  '>
                <div className='d-flex justify-content-between col-md-6 border-bottom-0 '
                    style={{
                        border: "4px solid rgb(211, 211, 211)",

                        borderTopRightRadius: '4px ', borderBottomRightRadius: '0px ', borderBottomLeftRadius: '0px ', borderTopLeftRadius: '4px'
                    }}


                >
                    <input type="text" placeholder='Search by User Name' className='form-control border-0' onChange={search} />
                </div>
                <div className=''>
                    <div style={{ background: 'rgb(211, 211, 211)', borderTopRightRadius: '4px ', borderBottomRightRadius: '4px ', borderBottomLeftRadius: '4px ', borderTopLeftRadius: '0px ' }} className=' d-flex px-3  gap-3 py-1 mb-1'>
                        <p className='fw-bold px-2 m-0 col-md-3 '>Name</p>
                        <p className='fw-bold px-2 m-0 col-md-4 '>Email</p>
                        <p className='fw-bold px-2 m-0 col-md-3 '>User Role</p>
                    </div>
                    {filteredUsers.length !== 0 ? (filteredUsers.map((e, i) => {
                        let checked = selectedCheckboxes.find((lead) => lead === e._id);
                        checked = checked !== undefined ? true : false;
                        return <div style={{ border: "1px solid rgb(211, 211, 211)" }} className='d-flex g gap-3 align-items-center px-3  pb-0 rounded mb-1' key={e._id}>
                            <p className='px-2 m-0 col-md-3 pb-0'>   {e.fullName} </p>
                            <p className='px-2 m-0 col-md-4 pb-0'> {e.email} </p>
                            {myProfile.userRole !== '3' && <p className='px-2 m-0 col-md-2 pb-0 '>

                                {e.userRole === '3' && "User"}
                                {e.userRole === '1' && "SuperAdmin"}
                                {e.userRole === '2' && "Admin"}


                            </p>}


                            <div>
                                <input
                                    type="checkbox"

                                    checked={checked}
                                    className=''
                                    id={e._id}
                                    onChange={handleCheckboxChange}
                                />

                            </div>


                        </div>
                    })) : (normalUser.map((e, i) => {
                        let checked = selectedCheckboxes.find((lead) => lead === e._id);
                        checked = checked !== undefined ? true : false;
                        return <div style={{ border: "1px solid rgb(211, 211, 211)" }} className='d-flex g gap-3 align-items-center px-3  pb-0 rounded mb-1' key={e._id}>
                            <p className='px-2 m-0 col-md-3 pb-0'>   {e.fullName} </p>
                            <p className='px-2 m-0 col-md-4 pb-0'> {e.email} </p>
                            {myProfile.userRole !== '3' && <p className='px-2 m-0 col-md-2 pb-0 '>

                                {e.userRole === '3' && "User"}
                                {e.userRole === '1' && "SuperAdmin"}
                                {e.userRole === '2' && "Admin"}


                            </p>}


                            <div>
                                <input
                                    type="checkbox"

                                    checked={checked}
                                    className=''
                                    id={e._id}
                                    onChange={handleCheckboxChange}
                                />

                            </div>

                        </div>
                    }))}


                    <button className='btn btn-dark float-end' onClick={setTeamAdminToUser}   >Done</button>
                </div>
            </div>


        </div>
        </>
    )
}

export default TeamDashBoard
