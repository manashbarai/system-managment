import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'
import "./Login.css"

import { DataStorage } from '../context/useCotext'
import Loader from '../component/Loder/Loader'
import UpdatePassword from './UpdatePassword'
const Login = () => {

  const { isLoading, myProfile, todayDate,getMySuperTeam } = DataStorage();
  const [ip, setIp] = useState('');
  const navigate = useNavigate();

  // Redirect based on user role
  useEffect(() => {
    if (myProfile) {
      if (myProfile.userRole === '2') {
        navigate('/adminBoard');
      } else if (myProfile.userRole === '3') {
        navigate('/userdashBoard');
      } else if (myProfile.userRole === '1') {
        navigate('/superAdmin');
      } else {
        if (myProfile.companyRole === '1') {
          navigate('/finrefy');
        }else if (myProfile.companyRole === '2') {
          navigate('/companyDashBoard');
        }
      }
    }
  }, [myProfile, navigate]);

  const initialValues = { email: '', password: '' };

  const { values, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues,
    onSubmit: async (values, action) => {
      try {

        const response = await axios.post(`${process.env.REACT_APP_API}login`, {
          email: values.email,
          password: values.password,
          ip,
        });
      

        
        if (response.status === 200) {
  
          localStorage.setItem('currentPage', 1);
          localStorage.setItem('crm_id', response.data._id);
          localStorage.setItem('crm_token', response.data.token);
         
          if (response.data.userRole) {
            localStorage.setItem('superTeam', response.data.superTeam)
            localStorage.setItem('crm_id', response.data.id);
            localStorage.setItem('crm_userRole', response.data.userRole);
            localStorage.setItem('crm_fullName', response.data.fullName);
            localStorage.setItem('crm_Email', response.data.email);
            localStorage.setItem('crm_userRole', response.data.userRole);
            
            if (response.data.userRole === '3') {
              window.location.href = '/userDashboard';
            } else if (response.data.userRole === '2') {
              window.location.href = '/adminBoard';
            } else if (response.data.userRole === '1') {
              window.location.href = '/superAdmin';
            }
          } else if (response.data.companyRole) {

            localStorage.setItem('crm_companyId', response.data.id);
            localStorage.setItem('crm_companyRole', response.data.companyRole);
            localStorage.setItem('crm_companyName', response.data.companyName);
            localStorage.setItem('crm_companyEmail', response.data.email);



            if (response.data.companyRole === '1') {
              window.location.href = '/finrefy';
            }else if(response.data.companyRole === '2'){
              window.location.href = '/companyDashBoard';
            }

          }
        } else if (response.status === 206) {
          navigate(`/updatePassword/${response.data._id}`);
        }
      } catch (error) {
        const match = error.response?.data;

        alert(match ? match.split('Error:')[1].split('<br>')[0] : 'An error occurred.');
      }
    },
  });

  const [updatePassword, setUpdatePassword] = useState(false);

  const forgotPassword = () => {
    setUpdatePassword(!updatePassword);
  };

  // Set initial session storage values
  useEffect(() => {
    sessionStorage.setItem('selectState', 'allState');
    sessionStorage.setItem('followUpdate', todayDate);
    sessionStorage.setItem('searchUserId', '1');
    sessionStorage.setItem('searchUserName', 'All Users');
    sessionStorage.setItem('setLeadStatus', 1);
    sessionStorage.setItem('currentPage', 1);
  }, [todayDate]);

  // Fetch IP address
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get('https://api.ipify.org/?format=json');
        setIp(res.data.ip);

      } catch (error) {
        console.error('Error fetching IP:', error);
      }
    };
   
    getData();
  }, []);

  if (isLoading) {
    return (
      <div>
        <Loader loading={'Loading'} />
      </div>
    );
  }

  return (
    <div>

      {updatePassword === true && <UpdatePassword forgotPassword={forgotPassword} />}


      <div style={{ height: "100vh" }} className='my_bg  d-flex justify-content-center flex-column'>



        <div className='container' >
          <div className=''>
            <h1 className='text-center my-3 mb-4 S_LogIn'>
              <div style={{ width: "215px", margin: "auto" }} >
                {/* <img style={{ width: "100%", cursor: "pointer" }} src={require("../images/Logo-a.png")} alt="" /> */}
              </div>
              Log In
            </h1>
            <div >
              <div className=" mb-4 loginInputAreas">
                <div style={{ margin: "auto" }} className="col-md-5 position-relative mb-lg-4">
                  <input
                    className=""

                    type="text"
                    name="email"
                    placeholder='Username or email'
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />

                  <div style={{ top: "31%", left: "4%" }} className="emailIcon position-absolute ">
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="18" viewBox="0 0 22 18" fill="none">
                      <path d="M3 1H19C20.1 1 21 1.9 21 3V15C21 16.1 20.1 17 19 17H3C1.9 17 1 16.1 1 15V3C1 1.9 1.9 1 3 1Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M21 3L14.4408 7.59146C12.3749 9.0376 9.62515 9.0376 7.55923 7.59146L1 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>

                  </div>
                </div>
                <div style={{ margin: "auto" }} className="col-md-5  position-relative">
                  <input
                    className="form-control "
                    type="password"
                    name='password'
                    placeholder='Password'
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <div className="signUpPageIcons">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="22" viewBox="0 0 20 22" fill="none">
                      <path d="M17 10H3C1.89543 10 1 10.8954 1 12V19C1 20.1046 1.89543 21 3 21H17C18.1046 21 19 20.1046 19 19V12C19 10.8954 18.1046 10 17 10Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M5 10V6C5 4.67392 5.52678 3.40215 6.46447 2.46447C7.40215 1.52678 8.67392 1 10 1C11.3261 1 12.5979 1.52678 13.5355 2.46447C14.4732 3.40215 15 4.67392 15 6V10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div className=' eyeicons '  >
                    <i style={{ color: "#C4C4C4" }} ></i>
                  </div>
                </div>
              </div>
              <div className='mb-5 S_ChecboxSection'>
                <div className='S_rememberMeSection'>
                  <input type="checkbox" className="d-none " id="checkings" />
                  <label className='S_checkBox' htmlFor="checkings"></label>
                  <h4 className='S_Remember'>Remember Me</h4>
                </div>
                <div className='S_forgot'>
                  <button style={{ background: "inherit" }} className='S_ForgotPassword border-0' onClick={forgotPassword} >   Forgot Password?   </button>
                </div>
              </div>









              <div className="loginButtonss col-md-5">
                <button type="submit" className="loginbtn" onClick={
                  handleSubmit}
                >Login</button>
              </div>

              <div className='mt-4 S_Terms'>
                <p className='S_Conditions'>I understand and agree with the <span>Terms & Conditions</span> and <br /><span>Privacy Policy.</span></p>
              </div>

              <div className='mt-3 S_Account'>
                <p className='S_Haveaccount'>Doesn't have an account yet? <span>Sign Up</span></p>
              </div>

            </div>





          </div>
        </div>
      </div>



    </div>
  )
}

export default Login
