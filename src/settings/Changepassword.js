import React, { useState } from 'react'
import './Createpassword.css'
import { DataStorage } from '../context/useCotext'
import axios from 'axios'

const Changepassword = () => {
const {myProfile}=DataStorage()

    const [formData, setFormData] = useState({
        
        currentPassword: "",
        password: "",
        confirmPassword:""
    })
    const hadleChane = (e) => {
        setFormData({
            ...formData,
            [e.target.name]:e.target.value
        })

    }

    const changePass=async()=>{
      
       
        const headers = {
            Authorization: `${localStorage.getItem("crm_token")}`,
            'Content-Type': 'application/json', 
        };
        if ( formData.password!==formData.confirmPassword) {
            alert("password not matched")
            return;
        }

        try {
            if(formData.password==="") {
                alert("set password")
                return ;
            } ;
            const changePas=await axios.put(`${process.env.REACT_APP_API}updatePassword/${myProfile._id}`,formData,{headers})

            if (changePas.status===200) {
                alert('password change success fully')
                setFormData({
                    currentPassword: "",
                    password: "",
                    confirmPassword:""
                })
            }



        } catch (error) {
            if (error) {
                alert("some thing went wrong")
            }
            if (error.response.status===412) {
                localStorage.clear()
                window.location.reload()
                window.location.href('./login')
            }
        }
       
    }

    return (
        <>
            <div className='container'>
                <div className='cp_mainArea'>

                    <div className='cp_MainCOntent'>
                        <div>
                            <div className='mt-3 mb-5 cp_Create'>
                                <h1 className='cp_createNew'>Create New Password</h1>
                            </div>
                            <div className='cp_Form' id="password-reset-form">
                                <div className='cp_Currentpassword'>
                                    <label for="password">Current Password</label>
                                    <div>
                                        <input
                                         className='cp_textArea' 
                                         name='currentPassword'
                                         value={formData.currentPassword}
                                         onChange={hadleChane}
                                         
                                         type="password" id="password" />
                                    </div>
                                </div>
                                <div className='mt-3 cp_newPassword'>
                                    <label for="password">New Password</label>
                                    <div>
                                        <input 
                                         name='password'
                                         value={formData.password}
                                         onChange={hadleChane}
                                        
                                        className='cp_textArea' type="password" id="password" />
                                    </div>
                                </div>
                                <div className='mt-3 cp_retypePassword'>
                                    <label for="password-verify">Confirm password</label>
                                    <div>
                                        <input
                                         name='confirmPassword'
                                         value={formData.confirmPassword}
                                         onChange={hadleChane}
                                        
                                        className='cp_textArea' type="password" id="password-verify" />
                                    </div>
                                </div>
                                <div className='mt-4 mb-5'>
                                    <button className='btn cp_Reset' type="button"  onClick={changePass}  >Reset password</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Changepassword