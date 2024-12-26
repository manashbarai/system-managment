import axios from 'axios'
import React, { useState } from 'react'

const UpdatePassword = (props) => {



    const [fromData, setFromData] = useState({
        email: "",
        updatePassword: "",
        confirmPassword: ""
    })
    const [password, setPassword] = useState("password")
    const [confirmPassword, setConfirmPassword] = useState("password")

    const handleChange = (e) => {
        setFromData({
            ...fromData,
            [e.target.name]: e.target.value
        })
    }

    const updatePass = async () => {
        if (fromData.updatePassword !== fromData.confirmPassword) {
            alert("Password Not Matched")
            return;
        }
       
        try {
            const updatePass = await axios.put(`${process.env.REACT_APP_API}updatePassword`, { fromData })

            if (updatePass.status === 200) {
                alert("password update successfully")
                props.forgotPassword()
            }


        } catch (error) {
           
            const match = error.response?.data;
  
          alert(match ? match.split('Error:')[1].split('<br>')[0] : 'An error occurred.');
        }


    }




    return (
        <>
            <div style={{ zIndex: 2, background: "rgba(95, 73, 138,0.9)" }} className=" mb-4  position-fixed top-0 start-0 col-md-12 h-100 d-flex justify-content-center align-items-center flex-column" >
                <div className='col-md-8 bg-body rounded-2 p-1'>
                    <button style={{ background: "purple" }} className='btn float-end  rounded-circle text-white ' onClick={props.forgotPassword}  > X </button>
                    <div className='py-5 my-3'>



                        <div style={{ margin: "auto" }} className="col-md-10 position-relative mb-lg-4">
                            <label>Enter Your Email :</label>
                            <input


                                type="email"
                                name="email"
                                placeholder='Username or email '
                                className="form-control px-5"
                                value={fromData.email}
                                onChange={handleChange}

                            />

                            <div style={{ top: "50%", left: "2%" }} className=" position-absolute ">
                                <i style={{ color: "purple" }} className="fa-solid fa-envelope"></i>
                            </div>
                        </div>
                        <div style={{ margin: "auto" }} className="col-md-10  position-relative my-4">
                            <label>Enter New Password :</label>
                            <input
                                className="form-control px-5 "
                                type={password}
                                name='updatePassword'
                                placeholder='Update Password'
                                value={fromData.updatePassword}
                                onChange={handleChange}

                            />
                            <div style={{ top: "50%", right: "2%" }} className=" position-absolute " onClick={() => {
                                password === 'password' ? setPassword('text') : setPassword('password')
                            }}

                            >
                                {password === 'password' ? <i style={{ color: "purple" }} className="fa-solid fa-eye-slash"></i> : <i style={{ color: "purple" }} className="fa-solid fa-eye"></i>}


                            </div>
                            <div style={{ top: "50%", left: "2%" }} className=" position-absolute ">
                                <i style={{ color: "purple" }} className="fa-solid fa-lock"></i>

                            </div>

                        </div>
                        <div style={{ margin: "auto" }} className="col-md-10  position-relative">
                            <label>Confirm Your Password :</label>
                            <input
                                className="form-control px-5"
                                type={confirmPassword}
                                name='confirmPassword'
                                placeholder='Confirm Password'
                                value={fromData.confirmPassword}
                                onChange={handleChange}

                            />
                            <div style={{ top: "50%", right: "2%" }} className=" position-absolute " onClick={() => {
                                confirmPassword === 'password' ? setConfirmPassword('text') : setConfirmPassword('password')
                            }}  >
                                {confirmPassword === 'password' ? <i style={{ color: "purple" }} className="fa-solid fa-eye-slash"></i> : <i style={{ color: "purple" }} className="fa-solid fa-eye"></i>}

                            </div>
                            <div style={{ top: "50%", left: "2%" }} className=" position-absolute ">
                                <i style={{ color: "purple" }} className="fa-solid fa-lock"></i>

                            </div>


                        </div>
                        <div className='d-flex justify-content-center mt-5'>
                            <button style={{ background: "purple" }} className='btn px-5 text-white' onClick={updatePass}  >
                                Update Password
                            </button>
                        </div>

                    </div>
                </div>
            </div>


        </>
    )
}

export default UpdatePassword
