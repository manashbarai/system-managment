import React from "react";
import "./Login.css";
import { useFormik } from "formik";
import { DataStorage } from "../../context/useCotext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AdminDashBoard from "../admin/AdminDashBoard";
import UserDashBoard from "../user/UserDashBoard";

function Logins() {


  const { isLoading } = DataStorage()


  const navigate = useNavigate()
  const initialValues = { email: "", password: "" }

  const { values, handleBlur, handleChange, handleSubmit } = useFormik({

    initialValues, onSubmit: async (values, action) => {
      try {
        const headers = {
          // Authorization: `${localStorage.getItem("token")}`,
          'Content-Type': 'application/json',
        };
        const response = await axios.post(`${process.env.REACT_APP_API}/login`, { email: values.email, password: values.password });
        localStorage.setItem('crm_id', response.data._id)
        localStorage.setItem('crm_userRole', response.data.userRole)
        localStorage.setItem('crm_token', response.data.token)
        if (response.status === 200 && response.data.userRole === '3') {

          localStorage.setItem("crm_id", response.data.id)
          localStorage.setItem("crm_userRole", response.data.userRole)
          window.location.reload();
          window.location.href = '/userDashboard';

        }
        else if (response.status === 200 && response.data.userRole === '2') {
          localStorage.setItem("crm_id", response.data.id)
          localStorage.setItem("crm_userRole", response.data.userRole)
          window.location.reload();
          window.location.href = '/adminBoard';
        } else if (response.status === 200 && response.data.userRole === '1') {
          localStorage.setItem("crm_id", response.data.id)
          localStorage.setItem("crm_userRole", response.data.userRole)
          window.location.reload();
          window.location.href = '/superAdmin';
        }

      } catch (error) {
        if (error) {
          alert(error)
        }
        console.error('Error during login:', error.response?.data?.error || error.message);
      }

    }


  })

  if (isLoading) {
    return <div>
      ... Loading
    </div>
  }

























  return (

    <div>
      {localStorage.getItem('crm_userRole') === '2' ? (
        <> <AdminDashBoard /> </>
      ) : localStorage.getItem('crm_userRole') === '3' ? (<>

        <UserDashBoard />

      </>) : (<>


        <>
          <h2 className="text-center A_Login">Log In</h2>
          <div class="mt-4 login-container">
            <form id="login-form" onSubmit={handleSubmit}>
              <div class="input-container A_Input">
                <div className="A_field">

                  <input
                    className="A_UsernameInputtext"
                    type="text"
                                        name="email"
                                        placeholder='Email Id '
                                        value={values.email}
                                        onChange={handleChange}
                                        onBlur={handleBlur}

                  />
                  <img className="envel" src={require('./images/Group 36 (1).svg').default} alt="" />


                </div>

              </div>
              <div class="input-container A_Pass">
                <input
                  className="A_Password"
                  type="password"

                                        name='password'
                                        placeholder='Password'
                                        value={values.password}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                />
                <img className="lock" src={require('./images/Group 39.svg').default} alt="" />
              </div>
              <div className="input-container A_Remember">
                <input type="checkbox" className="d-none chk" name="remember" id="checking" value="yes" />
                <label style={{ background: "transparent", width: "20px", height: "20px", border: "1px solid #fff", borderRadius: "4px" }} htmlFor="checking"></label>
                <span className="A_me">Remember Me</span>

                <br />

                <a className="forgt" href="#" id="forgot-password">
                  Forgot Password?
                </a>

              </div>
              <button className="A_Submit" type="submit">Login</button>
            </form>
          </div>
          <div className="A_condn">
            <p className="A_foot">I understand and agree with the <a href="#" className="A_under">Terms & Conditions </a> and <br /> <a href="#" className="A_under">Privacy Policy</a></p>
            <p className=" A_notAccount">Don't have a account yet? <a href="#" className="A_Signup">Sign Up</a> </p>
          </div>
        </>
      </>)}
    </div>
  );
}

export default Logins;
