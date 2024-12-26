import axios from 'axios'
import React, { useMemo, useState } from 'react'
import { DataStorage } from '../../context/useCotext'
import './Createuser.css'

const CreateUser = (props) => {
    const headers = useMemo(() => ({
        Authorization: `${localStorage.getItem("crm_token")}`,
        'Content-Type': 'application/json',
    }), [])
    const { allUser, getAllUser, myProfile,mySuperTeam } = DataStorage()
    let user = allUser.reverse();
    user.length = 3;
    const [fromData, setFromData] = useState({
        fullName: "",
        email: ""
    })
    const setfrom = (e) => {
        setFromData({
            ...fromData,
            [e.target.name]: e.target.value
        })
    }
    const [mailError,setMailError]=useState("")
   
    const createUserCredential = async () => {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fromData.email)) {
            alert('Please enter a valid email address');
            return;
        }
        let data;
        if (props.roleType === 'company') data = { ...fromData, tenantId: myProfile._id }
        else data = {...fromData,tenantId: mySuperTeam.tenantId, superTeamId:mySuperTeam._id}
        
    
        try {
            const res = await axios.post(`${process.env.REACT_APP_API}created/user`, data, { headers })

            if (res.status === 200) alert('User Create SuccessFully')
            getAllUser(`${process.env.REACT_APP_API}allUser`)
        } catch (error) {
            if (error) {
                const match = error.response?.data;

                const error=match ? match.split('Error:')[1].split('<br>')[0] : 'An error occurred.';
                setMailError(error)
            }
           
        }
    }
    const deleteRecentUser = async (id) => {
        try {
            const deleteUser = await axios.delete(`${process.env.REACT_APP_API}userDelete/${id}`)
            if (deleteUser.status === 200) alert(`Delete User Successfully ${deleteUser.data.fullName} `)
            getAllUser(`${process.env.REACT_APP_API}allUser`)
        } catch (error) {

        }
        
    }

    const sendmail = async (name, email, usersName, title, body) => {
        const headers = {
            Authorization: `${localStorage.getItem("crm_token")}`,
            'Content-Type': 'application/json',
        };
        const emailData = {
            name: name, email: email, usersName: usersName, password: title, body
        }

        try {
            const sendmailData = await axios.post(`${process.env.REACT_APP_API}sendMail`, emailData, { headers })
            if (sendmailData.status === 200) {
                alert("Mail has been sent Successfully")
            }
        } catch (error) {

        }

    }
    const inviteLink = (userId) => {
        const copyText = `${process.env.REACT_APP_API1}updatePassword/${userId}`;

        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(copyText)
                .then(() => {
                    // Alert copied
                    alert(`Copied the text: ${copyText}`);
                })
                .catch((err) => {
                    console.error('Unable to copy:', err);
                    // Handle error if copying fails
                });
        } else {
            console.error('Clipboard API not available');
            // Fallback mechanism or alternative method to copy text
            // You might use document.execCommand('copy') as a fallback for older browsers
            // or suggest manual copying to users
        }
    };

    

    return (
        <div style={{ paddingLeft: "30px" }} className=' mt-5 ss_heroSection'>
            <div className='bg-body rounded border mt-2 p-5 ss_creatNewUser'>
                <h2 style={{ color: "rgb(145, 145, 145)" }} >Create User</h2>
                <hr />
                <div>

                    <label style={{ color: "rgb(145, 145, 145)" }} className='form-level'>Name</label>
                    <input
                        type="text"
                        className='form-control cu_textArea'
                        placeholder='Enter Name'
                        name='fullName'
                        value={fromData.fullName}
                        onChange={setfrom}
                    />
                </div>
                <div className='mt-2'>

                    <label style={{ color: "rgb(145, 145, 145)" }} className='form-level'>Email</label>
                    <input
                        type="email"


                        className='form-control cu_textArea'
                        placeholder='Enter Email'
                        name='email'
                        value={fromData.email}
                        onChange={setfrom}
                    />
                    <span className='text-danger'> {mailError} </span>
                </div>
                <div>
                    <button style={{ background: "rgb(95, 73, 138)" }} className='btn text-white mt-4' onClick={createUserCredential}>
                        Create
                    </button>
                </div>
            </div>
            <div className='bg-body rounded border mt-2 p-5 ss_recentlyAdded'>

                <h4 style={{ color: "rgb(145, 145, 145)" }} >Recently Added User</h4>
                <hr />
                <div className='d-flex border-bottom'>
                    <ul className='col-md-7 gap-4 px-4 list-unstyled p-0 m-0 cu_Heading '>
                        <li style={{ color: "rgb(145, 145, 145)" }} className='col-md-5'>Name</li>
                        <li style={{ color: "rgb(145, 145, 145)" }} className='col-md-7 '>Email</li>


                    </ul>



                </div>
                {user && user.map((e, i) => {
                    return <div className='d-flex border-bottom cu_headingMain' key={e._id}>
                        <ul className='col-md-6 d-flex gap-4 px-4 list-unstyled p-0 m-0 '>
                            <li style={{ color: "rgb(95, 73, 138)" }} className='col-md-5 cu_Name'>{e && e.fullName}</li>
                            <li style={{ color: "rgb(95, 73, 138)" }} className='col-md-7 ss_Useremail '>{e && e.email}</li>
                        </ul>
                        <ul className='col-md-6 cu_Data gap-4 list-unstyled'>
                            <li className='col-md-2'>

                                {e.fresh === true && <li className='ss_Createuser'
                                    onClick={() => {
                                        sendmail(e.fullName, e.email, e.email, "Edureify", `${e.password}`)
                                    }}
                                >Resend Mail</li>}
                            </li>
                            <li className='ss_deleteButton' onClick={() => deleteRecentUser(e && e._id)} >Delete</li>
                            {e.fresh === true && <li className='ss_inviteLink'
                                onClick={() => {
                                    inviteLink(e && e._id)
                                }}
                            >Invite Link</li>}

                        </ul>
                    </div>
                })}





            </div>

        </div>
    )
}

export default CreateUser
