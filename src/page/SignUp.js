import React from 'react'
import { useFormik } from 'formik'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

import { useState } from 'react'



const initialValues = {
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",

}



const SignUp = () => {
    const navigate=useNavigate()


    const { values, errors, handleBlur, touched, handleChange, handleSubmit } = useFormik({
        initialValues: initialValues,
        // validationSchema: Schema,

        onSubmit: async (values) => {
           
            const response = await axios.post(`${process.env.REACT_APP_API}/signUp`, {
                fullName: values.fullName,
                email: values.email,
                password: values.password,
                confirmPassword: values.confirmPassword,
                userRole:"3"
            })
            if (response.status===200 ) {
                navigate('/login')
            }






        }
    })





    return (
        <div>
            <div className='container rounded bg-body p-4 p-lg-5'>
                <div className='p-lg-5'>
                    <div style={{ width: "215px", margin: "auto" }} >
                        {/* <img style={{ width: "100%", cursor: "pointer" }} src={require("../images/Logo-a.png")} alt="" /> */}
                    </div>
                    <h1 style={{ color: "#000", fontSize: "30px" }} className='text-center mt-3'>


                        Sign Up</h1>

                    <form onSubmit={handleSubmit} className='p-0  p-md-3 col-md-6 m-auto'>
                        <div className="row mb-4 loginInputAreas">
                            <div className=" position-relative">



                                <input
                                    type="text"
                                    className="form-control"
                                    name="fullName"
                                    placeholder='Name'
                                    value={values.fullName}
                                    onChange={handleChange}
                                    onBlur={handleBlur}

                                />





                                <div className="signUpPageIcon">
                                    {/* <img src={require("../images/Group 36 (1).png")} alt={""} /> */}

                                </div>
                            </div>









                            <div className=" position-relative">



                                <input
                                    type="email"
                                    className="form-control"
                                    name="email"
                                    placeholder='Email id'
                                    value={values.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    required
                                />
                                {/* {errors.email && touched.email ? (<p className="text-danger"> {errors.email} </p>) : null} */}

                                <div className="signUpPageIcon">
                                    {/* <img src={require("../images/Group 39.png")} alt={""} /> */}

                                </div>
                            </div>



                            <div style={{ position: "relative" }} className="  position-relative">
                                <input
                                    type="password"
                                    name='password'
                                    className="form-control "
                                    placeholder='Create Password'
                                    value={values.password}
                                    onChange={handleChange}
                                    onBlur={handleBlur}

                                />
                                {/* {errors.password && touched.password ? (<p className="text-danger"> {errors.password} </p>) : null} */}





                                <div className="signUpPageIcon">
                                    {/* <img src={require("../images/Group 39 (1).png")} alt={""} /> */}

                                </div>
                                <div className=' eyeicon '  >

                                    {/* <i style={{ color: "#C4C4C4" }} className={passEye}></i> */}
                                </div>
                            </div>
                            <div className=" position-relative">
                                <input
                                    type="password"
                                    className="form-control"
                                    name="confirmPassword"
                                    placeholder='Conform Password'
                                    value={values.confirmPassword}
                                    onChange={handleChange}
                                    onBlur={handleBlur}

                                />
                                {/* {errors.conformPassword && touched.conformPassword ? (<p className="text-danger"> {errors.conformPassword} </p>) : null} */}

                                <div className="signUpPageIcon ">
                                    {/* <img src={require("../images/Group 39 (1).png")} alt={""} /> */}

                                </div>

                            </div>


                        </div>







                        <div style={{ "margin": "auto" }} className="loginButtons ">
                            <button type="submit" className="loginbtn" >Sign Up</button>
                        </div>
                        <p className='mt-1 fs-6 text-center'>Already have account please go <button onClick={()=>navigate("/login")} className='btn'><strong>Login</strong></button>  </p>
                    </form>



                    {/* <h5 style={{ color: " #9C9C9C", fontSize: " 16px" }} className="text-center mt-5 ">

                            Already have an account? <span> <NavLink style={{ color: "#8A24F1" }} className="text-decoration-none" to='/userLogin' > Sign In</NavLink>  </span>
                        </h5> */}


                </div>
            </div>
        </div>
    )
}

export default SignUp
