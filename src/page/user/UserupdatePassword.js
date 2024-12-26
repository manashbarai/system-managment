import axios from 'axios';
import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'

const UserupdatePassword = () => {
    const navigate = useNavigate()
    const {id} = useParams();
    const [passwordUpdate, setPasswordUpdate] = useState({
        password: "",
        confirmPassword: ""
    })
    const updatePassword = (e) => {
        setPasswordUpdate({
            ...passwordUpdate,
            [e.target.name]: e.target.value
        })

    }
    const updatePasswordField = async () => {
        const config = {
            headers: {
              'Content-Type': 'application/json'
            
            }
          };
        try {
            const updatePassword=await axios.put(`${process.env.REACT_APP_API}updatePassword/${id}`,passwordUpdate,config)
            if(updatePassword.status===200){
                alert("update password successfully")   
                navigate('/login')
            
            }

        } catch (error) {
            alert("something went wrong")
        }
    }



    return (
        <div style={{background:"#5F498A",height:"100vh"}} className='d-flex justify-content-center align-items-center'>
            
        <div  className='container d-flex flex-column gap-4 col-md-6'>
            <h2 className='text-center text-white'>Update Your Password</h2>
            <hr className='bg-body'/>
            <input
                type="password"
                className='form-control py-2'
                placeholder='Create Password'
                name='password'
                value={passwordUpdate.password}
                onChange={updatePassword}
                />
            <input type="password"
                placeholder='Confirm Password'
                className='form-control py-2 '
                name='confirmPassword'
                value={passwordUpdate.confirmPassword}
                onChange={updatePassword}
                />
            <button style={{color:"#5F498A"}} type='button' className='btn btn-dark  py-2' onClick={updatePasswordField}>

                Update Password
            </button>
        </div>
                </div>
    )
}

export default UserupdatePassword
