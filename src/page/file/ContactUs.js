import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import './Contactus.css'

import Phoneicon from './Images/Phone.svg'
import Mailicon from './Images/MailIcon.svg'
import Location from './Images/Location.svg'


const ContactUs = () => {
    const handleSendMessage = () => {
        alert('Thanks for your submission. Our Sales team will contact you shortly!');
    };

    return (
        <>
           

            {/* ----------------------------------First Section------------------------------------------ */}

            <div className='sc_Firstbackground'>
                <div className='container'>
                    <div className='sc_First'>
                        <div className='col-md-5'>
                            <h1 className='sc_firstHeading'>Contact Us</h1>
                            <p className='sc_firstPara'>From startups to global giants, Finreify CRM<br /> empowers teams to extend the breadth and depth of<br /> their customer relationships</p>
                        </div>
                    </div>
                </div>
            </div>
            {/* ----------------------------------First Section Ends here------------------------------------------ */}

            {/* -----------------------------------Second Section--------------------------------------- */}

            <div className='container'>
                <div className='sc_Secondgroup'>
                    <a href='/' className='sc_Home'>home</a>
                    <a className='sc_Dot'><svg xmlns="http://www.w3.org/2000/svg" width="4" height="4" viewBox="0 0 4 4" fill="none">
                        <circle cx="2" cy="2" r="2" fill="black" />
                    </svg></a>
                    <a href='/' className='sc_Contact'>contact us</a>
                </div>
            </div>

            {/* -----------------------------------Second Section Ends Here--------------------------------------- */}

            {/* -----------------------------------Third Section--------------------------------- */}

            <div className='sc_Thirdbackground'>
                <div className='container'>
                    <div className='mb-4 sc_Thirdheading'>
                        <h1 className='sc_ContactUs'>Contact Us</h1>
                        <p className='sc_Para3'>Send us a message, but don't forget to add your contact info.<br/>
                            We'd love to help your business reach its goals!</p>
                    </div>
                    <div className='sc_Form'>
                        <h1 className='sc_Getin'>Get in Touch</h1>
                        <h5 className='sc_Freindly'>Our friendly team would love to hear from you.</h5>
                        <form className='mt-4'>
                            <div className="form-row sc_Row">
                                <div className="form-group col-md-6 sc_Inputbox">
                                    <label className='sc_firstName'>First Name<span style={{ color: '#F00' }}>&nbsp;*</span></label>
                                    <input type="text" className="mt-2 form-control sc_Inputarea" />
                                </div>
                                <div className="form-group col-md-6 sc_Inputbox">
                                    <label className='sc_lastName'>Last Name<span style={{ color: '#F00' }}>&nbsp;*</span></label>
                                    <input type="text" className="mt-2 form-control sc_Inputarea" />
                                </div>
                            </div>
                            <div className="mt-3 form-row sc_Row">
                                <div className="form-group col-md-6 sc_Inputbox">
                                    <label className='sc_Email'>Email<span style={{ color: '#F00' }}>&nbsp;*</span></label>
                                    <input type="email" className="mt-2 form-control sc_Inputarea" id="inputEmail4" />
                                </div>
                                <div class="form-group col-md-6 sc_Inputbox">
                                    <label className='sc_Phone'>Phone<span style={{ color: '#F00' }}>&nbsp;*</span></label>
                                    <input type="tel" className="mt-2 form-control sc_Inputarea" />
                                </div>
                            </div>
                            <div className="mt-5 form-group sc_Inputbox">
                                <label className='sc_Message'>Message</label>
                                <textarea className="mt-2 form-control" rows="5"></textarea>
                            </div>
                        </form>
                        <div className='sc-sendMessage'>
                            <button className='btn sc_Send' onClick={handleSendMessage}>send message<span>&nbsp;&nbsp;<svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none"><path d="M8.17714 15.3543C12.141 15.3543 15.3543 12.141 15.3543 8.17714C15.3543 4.21332 12.141 1 8.17714 1C4.21332 1 1 4.21332 1 8.17714C1 12.141 4.21332 15.3543 8.17714 15.3543Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M8.17725 11.0479L11.0481 8.17701L8.17725 5.30615" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /><path d="M5.30615 8.177H8.17701H11.0479" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            </svg></span></button>
                        </div>
                    </div>
                </div>
            </div>

            {/* ------------------------------------------------Third Section Ends Here----------------------------------------- */}

            {/* ---------------------------------------Fourth Section----------------------------------------- */}

            <div className='sc_Fourthbackground'>
                <div className='container'>
                    <div className='row sc_Fourthgroup'>
                        <div className='col-md-6'>
                            <div className='sc-Support'>
                                <h3 className='sc_suPPort'>Phone & Support</h3>
                            </div>
                            <div className='sc_contactSection'>
                                <h1 className='sc_Contactinfo'>Contact Information</h1>
                                <div className='sc_contactGroup'>
                                    <img src={Phoneicon} alt="phone" />
                                    <a href='/' className='sc_Phoneno'>+91 8076909119</a>
                                </div>
                                <div className='sc_contactGroup1'>
                                    <img src={Mailicon} alt="mailIcon" />
                                    <a href='/' className='sc_crmMail'>support@crm.com</a>
                                </div>
                            </div>
                        </div>
                        <div className='col-md-6'>
                            <div className='sc-Support'>
                                <h3 className='sc_suPPort'>Finreify CRM Office Locations</h3>
                            </div>
                            <div className='sc_contactSection1'>
                                <h5 className='sc_Contactinfo'>Office Address</h5>
                                <div className='sc_contactGroup'>
                                    <div>
                                        <img src={Location} alt="Location" />
                                    </div>
                                    <h6 href='#' className='sc_Address'>B-70, First Floor, Sector-2, Noida,<br />Gautam Buddha Nagar,<br />U.P-201301</h6>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* -------------------------------------Fourth Section Ends--------------------------- */}

            {/* ---------------------------------Fifth Section----------------------------------------- */}
            <div className='container'>
                <div className='col-md-12'>
                    <div className="mapouter">
                        <div className="gmap_canvas">
                            <iframe
                                border-radiu='10px'
                                border='2px solid #9FD7AF'
                                title='Finreify'
                                width="100%"
                                style={{ borderRadius: "10px" }}
                                height="359px"
                                id="gmap_canvas"
                                src="https://maps.google.com/maps?q=B-70, First Floor, Sector-2, Noida,  Gautam Buddha Nagar,  U.P-201301&t=&z=10&ie=UTF8&iwloc=&output=embed"
                                frameBorder={0}
                                scrolling="no"
                                marginHeight={0}
                                marginWidth={0}
                            />
                            <a href="https://2yu.co"></a>
                            <br />
                            <style
                                dangerouslySetInnerHTML={{
                                    __html:
                                        ".mapouter{position:relative;text-align:right;height:100%;width:100%;}"
                                }}
                            />
                            <a href="https://embedgooglemap.2yu.co/"></a>
                            <style
                                dangerouslySetInnerHTML={{
                                    __html:
                                        ".gmap_canvas {overflow:hidden;background:none!important;height:100%;width:100%;}"
                                }} />
                        </div>
                    </div>
                </div>
            </div>
            <div className='mt-5'>
                <Footer />
            </div>



        </>
    )
}

export default ContactUs