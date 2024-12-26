import React from "react";
import "./Pricing.css";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Pricing= () => {
  return (
    <>

      <section className="spricing_firstSection">
        <div className=" container spricing_aboutMain   ">
          <h2 className="spricing_aboutUs ">Pricing</h2>
          <p className="spricing_firstPara">
            From startups to global giants, Finreify CRM <br /> empowers teams
            to extend the breadth and depth of <br /> their customer
            relationships
          </p>
        </div>
      </section>

      <section>
        <div className="container mt-5">
          <ul className="spricing_firstlist">
            <a href="/" className="spricing_homeList">HOME</a>
            <a href="/" className="spricing_aboutList">PRICING</a>
          </ul>
          <div className="spricing_secondMainDiv">
            <div className="spricing_secondSecDiv">
              <h4 className="spricing_thirdAboutUs">PRICING</h4>
              <h2 className="mt-3 spricing_customerRelation">
               Finreify CRM Pricing and Plans{" "}
              </h2>
              <p className="spricing_secondPara">
                Reach your goals faster with the CRM, business automation, and
                email marketing <br/> software built for growing small
                businesses
              </p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container mt-5">       
            <div className="row">
              <div className="col-md-4">
                <div className="card spricing_firstCard">
                  <h3 className="spricing_proHead">Pro</h3>
                  <p className="spricing_paraCard1">
                    For smaller teams looking to automate  basic sales,
                    marketing and business  processes
                  </p>
                  <div className="d-flex">
                    <h2 className="spricing_rupeeSign">₹ </h2>
                    <h3 className="spricing_rupees">150</h3>
                    <h2 className="spricing_perMonth">/&nbsp;mo</h2>
                  </div>
                  <p className="spricing_monthlyBill">(Billed monthly)</p>
                  <h5 className="spricing_includesHead">Includes</h5>
                  <h5 className="spricing_contactUsers">1500 Contacts and 1 users</h5>
                  <p className="spricing_additionalUsers">
                    Additional users are{" "}
                    <span className="spricing_twentyRupees">₹20</span> each
                  </p>
                  <h4 className="spricing_coreFeature">Core Features:</h4>
                  <div className="spricing_features">
                  <img src={require("./Images/GreenIcon.svg").default} alt=""/>
                    <h6 className="spricing_firstTickMail">Email marketing</h6>
                  </div>
                  <div className="spricing_features">
                  <img src={require("./Images/GreenIcon.svg").default} alt=""/>
                    <h6 className="spricing_firstTickMail">
                      Marketing, sales & workflow automation
                    </h6>
                  </div>
                  <div className="spricing_features">
                  <img src={require("./Images/GreenIcon.svg").default} alt=""/>
                    <h6 className="spricing_firstTickMail">
                      Lead capture & automated follow-up
                    </h6>
                  </div>
                  <div className="spricing_features">
                  <img src={require("./Images/GreenIcon.svg").default} alt=""/>
                    <h6 className="spricing_firstTickMail">
                      Lead & client management (CRM)
                    </h6>
                  </div>
                  <div className="spricing_features">
                  <img src={require("./Images/GreenIcon.svg").default} alt=""/>
                    <h6 className="spricing_firstTickMail">Pipeline</h6>
                  </div>
                  <div className="spricing_features">
                  <img src={require("./Images/GreenIcon.svg").default} alt=""/>
                    <h6 className="spricing_firstTickMail">
                      Quotes, invoices & payments
                    </h6>
                  </div>
                  <div className="spricing_features">
                  <img src={require("./Images/GreenIcon.svg").default} alt=""/>
                    <h6 className="spricing_firstTickMail">
                      Landing pages & online sales
                    </h6>
                  </div>
                  <div className="spricing_features">
                  <img src={require("./Images/GreenIcon.svg").default} alt=""/>
                    <h6 className="spricing_firstTickMail">Text marketing (INDIA)*</h6>
                  </div>
                  <div className="spricing_signButton">
                    <button className="btn px-5 py-3 spricing_signUp "> SIGN UP</button>
                  </div>
                </div>
              </div>
              <div className="col-md-4 spricing_secCard">
                <div className="card spricing_firstCard">
                  <h3 className="spricing_maxHead">Max</h3>
                  <p className="spricing_paraCard2">
                    For growing teams who need advanced ecommerce and reporting
                    capabilities
                  </p>
                  <div className="d-flex">
                    <h2 className="spricing_rupeeSign">₹ </h2>
                    <h3 className="spricing_rupees">250</h3>
                    <h2 className="spricing_perMonth">/&nbsp;mo</h2>
                  </div>
                  <p className="spricing_monthlyBill">(Billed monthly)</p>
                  <h5 className="spricing_includesHead">Includes</h5>
                  <h5 className="spricing_contactUsers">2500 Contacts and 2 users</h5>
                  <p className="spricing_additionalUsers">
                    Additional users are{" "}
                    <span className="spricing_twentyRupees">₹20</span> each
                  </p>
                  <h4 className="spricing_proPlus">Everything in Pro, plus:</h4>
                  <div className="spricing_features">
                  <img src={require("./Images/BlueIcon.svg").default} alt=""/>
                    <h6 className="spricing_firstTickMail">
                      Advanced lead optimization
                    </h6>
                  </div>
                  <div className="spricing_features">
                  <img src={require("./Images/BlueIcon.svg").default} alt=""/>
                    <h6 className="spricing_firstTickMail">
                      Enhanced landing pages & sales tools
                    </h6>
                  </div>
                  <div className="spricing_features">
                  <img src={require("./Images/BlueIcon.svg").default} alt=""/>
                    <h6 className="spricing_firstTickMail">Ecommerce tools</h6>
                  </div>
                  <div className="spricing_features">
                  <img src={require("./Images/BlueIcon.svg").default} alt=""/>
                    <h6 className="spricing_firstTickMail">Advanced reporting</h6>
                  </div>

                  <div className="spricing_signButton">
                    <button className="btn px-5 py-3 spricing_signUp2 "> SIGN UP</button>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card spricing_firstCard">
                  <h3 className="spricing_ultimateHead">Ultimate</h3>
                  <p className="spricing_paraCard3">
                    For larger teams with advanced workflows and powerful
                    automation needs
                  </p>
                  <div className="d-flex">
                    <h2 className="spricing_rupeeSign">₹ </h2>
                    <h3 className="spricing_rupees">350</h3>
                    <h2 className="spricing_perMonth">/&nbsp;mo</h2>
                  </div>
                  <p className="spricing_monthlyBill">(Billed monthly)</p>
                  <h5 className="spricing_includesHead">Includes</h5>
                  <h5 className="spricing_contactUsers">3500 Contacts and 3 users</h5>
                  <p className="spricing_additionalUsers">
                    Additional users are{" "}
                    <span className="spricing_twentyRupees">₹20</span> each
                  </p>
                  <h4 className="spricing_featurePlus">Core features, plus: </h4>
                  <div className="spricing_features">
                  <img src={require("./Images/YellowIcon.svg").default} alt=""/>
                    <h6 className="spricing_firstTickMail">
                      Premium CRM & sales management
                    </h6>
                  </div>
                  <div className="spricing_features">
                  <img src={require("./Images/YellowIcon.svg").default} alt=""/>
                    <h6 className="spricing_firstTickMail">
                      Advanced marketing & sales tools
                    </h6>
                  </div>
                  <div className="spricing_features">
                  <img src={require("./Images/YellowIcon.svg").default} alt=""/>
                    <h6 className="spricing_firstTickMail">
                      Custom user access controls
                    </h6>
                  </div>
                  <div className="spricing_features">
                  <img src={require("./Images/YellowIcon.svg").default} alt=""/>
                    <h6 className="spricing_firstTickMail">
                      Affiliate management & collaboration
                    </h6>
                  </div>
                  <div className="spricing_features">
                  <img src={require("./Images/YellowIcon.svg").default} alt=""/>
                    <h6 className="spricing_firstTickMail">Advanced reporting</h6>
                  </div>
                  <div className="spricing_signButton">
                    <button className="btn px-5 py-3 spricing_signUp3 "> SIGN UP</button>
                  </div>
                </div>
              </div>
            </div>
        </div>
      </section>

      <section className="mt-5 mb-5">
        <div className="container spricing_fourthSection">
          <div className="col-md-12">
            <div className="row">
                <div className="col-md-6 spricing_leftColumn">
                    <h2 className="spricing_customerHelp">We’re here to help</h2>
                    <h5 className="spricing_customerSubscription">
                    Your Keap subscription also includes:
                    </h5>
                    <div className="spricing_supportDiv mt-4">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="22"
                        height="22"
                        viewBox="0 0 22 22"
                        fill="none"
                    >
                        <path
                        d="M21 10.0857V11.0057C20.9988 13.1621 20.3005 15.2604 19.0093 16.9875C17.7182 18.7147 15.9033 19.9782 13.8354 20.5896C11.7674 21.201 9.55726 21.1276 7.53447 20.3803C5.51168 19.633 3.78465 18.2518 2.61096 16.4428C1.43727 14.6338 0.879791 12.4938 1.02168 10.342C1.16356 8.19029 1.99721 6.14205 3.39828 4.5028C4.79935 2.86354 6.69279 1.72111 8.79619 1.24587C10.8996 0.770634 13.1003 0.988061 15.07 1.86572"
                        stroke="#4D249B"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        />
                        <path
                        d="M21 3.00586L11 13.0159L8 10.0159"
                        stroke="#4D249B"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        />
                    </svg>
                    <h6 className="spricing_supportHead">India-based phone support</h6>
                    </div>
                    <div className="spricing_supportDiv">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="22"
                        height="22"
                        viewBox="0 0 22 22"
                        fill="none"
                    >
                        <path
                        d="M21 10.0857V11.0057C20.9988 13.1621 20.3005 15.2604 19.0093 16.9875C17.7182 18.7147 15.9033 19.9782 13.8354 20.5896C11.7674 21.201 9.55726 21.1276 7.53447 20.3803C5.51168 19.633 3.78465 18.2518 2.61096 16.4428C1.43727 14.6338 0.879791 12.4938 1.02168 10.342C1.16356 8.19029 1.99721 6.14205 3.39828 4.5028C4.79935 2.86354 6.69279 1.72111 8.79619 1.24587C10.8996 0.770634 13.1003 0.988061 15.07 1.86572"
                        stroke="#4D249B"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        />
                        <path
                        d="M21 3.00586L11 13.0159L8 10.0159"
                        stroke="#4D249B"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        />
                    </svg>
                    <h6 className="spricing_supportHead">24/7 chat support</h6>
                    </div>
                    <div className="spricing_supportDiv">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="22"
                        height="22"
                        viewBox="0 0 22 22"
                        fill="none"
                    >
                        <path
                        d="M21 10.0857V11.0057C20.9988 13.1621 20.3005 15.2604 19.0093 16.9875C17.7182 18.7147 15.9033 19.9782 13.8354 20.5896C11.7674 21.201 9.55726 21.1276 7.53447 20.3803C5.51168 19.633 3.78465 18.2518 2.61096 16.4428C1.43727 14.6338 0.879791 12.4938 1.02168 10.342C1.16356 8.19029 1.99721 6.14205 3.39828 4.5028C4.79935 2.86354 6.69279 1.72111 8.79619 1.24587C10.8996 0.770634 13.1003 0.988061 15.07 1.86572"
                        stroke="#4D249B"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        />
                        <path
                        d="M21 3.00586L11 13.0159L8 10.0159"
                        stroke="#4D249B"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        />
                    </svg>
                    <h6 className="spricing_supportHead">
                        A dedicated Customer Success Manager
                    </h6>
                    </div>
                    <div className="spricing_supportDiv">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="22"
                        height="22"
                        viewBox="0 0 22 22"
                        fill="none"
                    >
                        <path
                        d="M21 10.0857V11.0057C20.9988 13.1621 20.3005 15.2604 19.0093 16.9875C17.7182 18.7147 15.9033 19.9782 13.8354 20.5896C11.7674 21.201 9.55726 21.1276 7.53447 20.3803C5.51168 19.633 3.78465 18.2518 2.61096 16.4428C1.43727 14.6338 0.879791 12.4938 1.02168 10.342C1.16356 8.19029 1.99721 6.14205 3.39828 4.5028C4.79935 2.86354 6.69279 1.72111 8.79619 1.24587C10.8996 0.770634 13.1003 0.988061 15.07 1.86572"
                        stroke="#4D249B"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        />
                        <path
                        d="M21 3.00586L11 13.0159L8 10.0159"
                        stroke="#4D249B"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        />
                    </svg>
                    <h6 className="spricing_supportHead">Business automation education</h6>
                    </div>
                </div>
                <div className="col-md-6 spricing_lastImg">
                    <div className="spricing_customerSupport">
                    <img
                        style={{width:"100%"}}
                        src={require("./Images/Women_customer.webp").default}
                        alt=""
                    />
                    </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer/>
    </>
  );
}

export default Pricing;
