import React from "react";
import "./Aboutpage.css";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Aboutpage = () => {
  return (
    <>
    
      <section className="sabout_firstSection">
        <div className=" container">
          <div className="sabout_aboutMain">
            <h2 className="sabout_aboutUs ">About Us</h2>
            <p className="sabout_firstPara">
              From startups to global giants, Finreify CRM <br /> empowers teams
              to extend the breadth and depth of <br /> their customer
              relationships
            </p>
          </div>
        </div>
      </section>
      <section>
        <div className="container mt-5">
          <ul className="sabout_firstlist">
            <a className="sabout_homeList" href="/">HOME</a>
            <a className="sabout_aboutList" href="/">ABOUT US</a>
          </ul>
          <div className="sabout_secondMainDiv">
            <div className="sabout_secondSecDiv">
              <h4 className="sabout_thirdAboutUs">About Us</h4>
              <h2 className="mt-3 sabout_customerRelation">
                About Finreify Customer Relationship Management
              </h2>
              <p className="sabout_secondPara">
                Finreify is one of India's fastest-growing Fin-Tech startups. <br />
                CRM from Finreify is the Effective tool for Maintaining
                Relationship with a Customer. <br />
                Finreify CRM is the true customer-centric tool for your sales
                needs. Track leads, get accurate <br /> forecasts, and focus on
                what matters: converting opportunities to Business.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="container mt-5">
          <div className="row">
            <div className="col-md-6 ">
              <img
                className="sabout_firstImage"
                src={require("./Images/crm-business.svg").default}
                alt=""
              />
            </div>
            <div className="col-md-6">
              <div className="sabout_sideBorder mt-5"></div>
              <h3 className="sabout_crmStory">
                About <span className="sabout_story">CRM Story</span>
              </h3>
              <p className="sabout_thirdPara">
                Finreify is one of India's fastest-growing Fin-Tech <br />
                startups. CRM from Finreify is the Effective tool for <br />{" "}
                Maintaining Relationship with a Customer. Finreify CRM is <br />{" "}
                the true customer-centric tool for your sales needs. <br />
                Track leads, get accurate forecasts, and focus on what <br />{" "}
                matters: converting opportunities to Business.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="container mt-5">
          <div className="row">
            <div className="col-md-6">
              <div className="sabout_sideBorder"></div>
              <div>
              <h3 className="sabout_crmStory">
                Our <span className="sabout_story">Mission</span>
              </h3>
              <p className="sabout_thirdPara">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed <br /> do
                eiusmod tempor incididunt ut labore et dolore. <br /> <br /> Ut enim ad minim
                veniam, quis nostrud exercitation ullamco laboris nisi ut
                aliquip ex ea commodo consequat. Duis aute irure dolor in
                reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur.
              </p>
              </div>
            </div>
            <div className="col-md-6 ">
              <img
                className="sabout_firstImage"
                src={require("./Images/businessTouching.svg").default}
                alt=""
              />
            </div>
          </div>
        </div>
      </section>
      <section className="sabout_fifthSection mt-5">
        <div className="container">
          <h4 className="sabout_ourTeam ">OUR TEAM</h4>
          <h2 className="sabout_crmTeam">Finreify CRM <span className="fifthSpan">Team</span> </h2>
          <p className="sabout_fifthPara">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor <br /> incididunt ut labore et dolore magna aliqua.</p>
        </div>
        <div className=" container sabout_imagesDiv mt-4">
          <div className="row">
            <div className="col-md-3 sabout_First1">
              <img className="sabout_fifthImage" src={require("./Images/profile1.jpeg")} alt="" />
              <h5 className="sabout_marketManager mt-3">Marketing</h5>
              <h6 className="sabout_jobDescription">Marketing Manager</h6>
            </div>
            <div className="col-md-3 sabout_First1">
              <img className="sabout_fifthImage" src={require("./Images/blue-shirt-man.svg").default} alt="" />
              <h5 className="sabout_marketManager mt-3">Sales</h5>
              <h6 className="sabout_jobDescription">Sales Manager</h6>
            </div>
            <div className="col-md-3 sabout_First1">
              <img className="sabout_fifthImage" src={require("./Images/pink-sweater.svg").default} alt="" />
              <h5 className="sabout_marketManager mt-3">Operations</h5>
              <h6 className="sabout_jobDescription">Operations Manager</h6>
            </div>
            <div className="col-md-3 sabout_First1">
              <img className="sabout_fifthImage" src={require("./Images/brown-jacket.svg").default} alt="" />
              <h5 className="sabout_marketManager mt-3">Marketing</h5>
              <h6 className="sabout_jobDescription">Marketing Manager</h6>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="container mt-5 mb-5">
          <div className="row">
            <div className="col-md-6 ">
              <img
                className="sabout_firstImage"
                src={require("./Images/customerRelation.svg").default}
                alt=""
              />
            </div>
            <div className="col-md-6">
              <div className="sabout_sideBorder mt-5"></div>
              <h3 className="sabout_crmStory">
                Apps and <span className="sabout_story">Extensions</span>
              </h3>
              <p className="sabout_thirdPara">
                Finreify is one of India's fastest-growing Fin-Tech <br />
                startups. CRM from Finreify is the Effective tool for <br />{" "}
                Maintaining Relationship with a Customer. Finreify CRM is <br />{" "}
                the true customer-centric tool for your sales needs. <br />
                Track leads, get accurate forecasts, and focus on what <br />{" "}
                matters: converting opportunities to Business.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />

    </>
  );
}

export default Aboutpage;
