import React from "react";
import "./Userlogin.css";

function Userlogin() {
  return (
    <div className="d-flex A_main ">
      <div className="  ">
        <div className="">
          <div className="mb-5">
            <h1 className="A_log">Log In</h1>
          </div>
        </div>
        <form action=" ">
        <div className="">
          <input type="text" className="  A_email" id="" placeholder="Username or email" />
          <img
            className="A_envelope"
            src={require("../Img/Group 36 (1).svg").default}
            alt=""
          />
        </div>
        <div className="A_word">
          <input type="text" className=" A_passwrd" id="" placeholder="Password" />
          <img
                className="A_lock"
                src={require("../Img/Group 39.svg").default}
                alt=""
              />
        </div>
        <div className="col-md-12 d-flex A_Forget">
          <div className="col-md-6 d-flex ">
            <input type="checkbox" className="d-none " id="checkings" />
            <label
                style={{
                  background: "transparent",
                  width: "15px",
                  height: "15px",
                  border: "1px solid #fff",
                  borderRadius: "4px",
                  marginTop:"5px"
                }}
                htmlFor="checkings"
              ></label>
            <p className="A_Remember">Remember me</p>
          </div>
          <div className="col-md-5">
            <a className="A_forgot" href="#">Forget password?</a>
          </div>
        </div>
        <div className="">
          <button className="btn A_logbtn">Login</button>
        </div>
        </form>
        <div className="A_understand">
          <p className="A_agree">
            I understand and agree with the <span><a href="#" className="A_sign">Terms & Conditions</a></span> and{" "}
            <br />
           <a href="#" className="A_sign">Privacy Policy</a> 
          </p>
          <p className=" A_agree">
            Don't have a account yet?{" "}
            <a href="#" className="A_sign">
              Sign Up
            </a>{" "}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Userlogin;
