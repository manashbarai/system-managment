import React from 'react'
import './Footer.css'

import Logo from './Images/Finreify-CRM - White Logo.png'
import Phoneicon from './Images/Vector (21).svg'
import Mail from './Images/Group 11.svg'
import Location from './Images/Group 10.svg'
import Fbicon from './Images/Vector (31).svg'
import Twitter from './Images/Vector (32).svg'
import Linkedin from './Images/linkedin 1.svg'
import Youtube from './Images/youtube 1.svg'


const Footer = () => {
  return (
    <>

      {/* ------------------Footer Section----------------- */}

      <div className="SLA_footer ">
        <div className="container pb-5">
          <div className="row SLA_Footerdetails">
            <div className="col-md-3">
              <div className='SLA_Footerlogo'>
              <img src={Logo} alt="logo" />
              </div>
              <p className="s_footerContent mt-3">
                Finreify CRM is the true customer-<br />centric tool for your sales needs.<br />
                Track leads, get accurate forecasts, and<br /> focus on what matters: converting<br /> opportunities to Business.
              </p>
            </div>
            <div className='col-md-1'></div>
            <div className="col-md-2">
              <h3 className="mb-3">Quick Links</h3>
              <ul className="list-unstyled ">
                <li className="p-0"><a className="SLA_socialAnchor" href="/">Home</a> </li>
                <li className="p-0"><a className="SLA_socialAnchor" href="/">Features</a> </li>
                <li className="p-0"><a className="SLA_socialAnchor" href="/">Pricing</a> </li>
                <li className="p-0"><a className="SLA_socialAnchor" href="/">Blog</a> </li>
                <li className="p-0"><a className="SLA_socialAnchor" href="/">Contact</a> </li>
              </ul>
            </div>
            <div className="col-md-3">
              <h3 className="mb-3">Company</h3>
              <ul className="list-unstyled ">
                <li className="p-0"><a className="SLA_socialAnchor" href="/">About</a> </li>
                <li className="p-0"><a className="SLA_socialAnchor" href="/" >FAQs</a> </li>
                <li className="p-0"><a className="SLA_socialAnchor" href="/">Terms & Conditions</a> </li>
                <li className="p-0"><a className="SLA_socialAnchor" href="/" >Privacy Policy</a> </li>
              </ul>
            </div>
            <div className="col-md-3">
              <h3 className="mb-3">Contact Us</h3>
              <ul className="list-unstyled ">
                <li className="my-2 d-flex SLA_social">
                  <div style={{ marginRight: '5px', width: '12px' }}> <img src={Phoneicon} alt="phone" /> </div> <a className="SLA_socialAnchor" href='/'>+91 8076909119</a>
                </li>
                <li className="my-2 d-flex p-0 SLA_social">
                  <div style={{ marginRight: '5px', width: '12px' }}>  <img src={Mail} alt="mail" /></div> <a className="SLA_socialAnchor" href='/'>support@crm.com</a>
                </li>
                <li className="my-2 d-flex SLA_social">
                  <div style={{ marginRight: '5px', width: '12px' }}> <img src={Location} alt="location" /></div> <a className="SLA_socialAnchor" href='/'>+B-70, First Floor, Sector-2, Noida,<br />
                    Gautam Buddha Nagar,<br />
                    U.P-2013019</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className='SLA_Line2233'></div>
        <div className='container'>
          <div className='row'>
            <div className="col-md-10 SLA_copyWrite ">
              <p className="">Copyright © 2024 Finreify CRM | Product of Finreify</p>
            </div>
            <div className='col-md-2 SLA_socialmedia'>
              <button className='SLA_btn23'><img src={Fbicon} alt="Facebook" /></button>
              <button className='SLA_btn23'><img src={Twitter} alt="Twitter" /></button>
              <button className='SLA_btn23'><img src={Linkedin} alt="LinkedIn" /></button>
              <button className='SLA_btn23'><img src={Youtube} alt="Youtube" /></button>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default Footer