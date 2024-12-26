import React, { useMemo, useState } from 'react';
import './Requestdemo.css'

import Tickicon from './circle-check-regular.svg'
import Footer from '../../../Footer';
import CrousalSection from '../../../LandingPagePart/CrousalSection';
import axios from 'axios';

const RequestDemo = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [tel, settel] = useState('');
    const [countryCode, setCountryCode] = useState('+91');
    const [company, setCompany] = useState('');
    const [companyEmail, setCompanyEmail] = useState('');
    const [employeesize, setEmployeesize] = useState('');
    const [message, setMessage] = useState('');

    const validateEmail = (email) => {
       
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const validatePhoneNumber = (phoneNumber) => {
        // Regular expression for validating Indian phone numbers
        const regex = /^[6-9]\d{9}$/;
        return regex.test(phoneNumber);
    };
  
    const handleSubmit =async () => {
        // Validation
        if (!validateEmail(email)) {
            alert('Please enter a valid email address.');
            return;
        }

        if (!validatePhoneNumber(tel)) {
            alert('Please enter a valid Indian phone number.');
            return;
        }
        const data={
            name,
            email,
            phNumber:{
                countryCode,number:tel
            },
            companyName:company,
            companyEmail,
            employSize:employeesize,
            requirements:message
        }




        try {
            const res=await axios.post(`${process.env.REACT_APP_API}crm/demo`,data)
            if(res.status===200)alert("We will get back to You Very Soon");
            if (res.status===200) {
                setName("");setEmail(""); settel(''); setCompany(""); setEmployeesize(""); setMessage(""); setCompanyEmail(""); setCountryCode("")
            }
           
        } catch (error) {
            alert("Bad Request")
        }
        console.log('Form submitted:', { name, email, tel, company, employeesize, message, companyEmail, countryCode });
    };

    return (
        <>
            <div className='sr_Firstbackground'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-6'>
                            <div className='sr_Heading'>
                                <h1 className='sr_Schedule'>Schedule a live Demo</h1>
                                <p className='sr_Para1'>The end-to-end solution to drive higher productivity for<br />  call-center,digital sales, and feet-on-street teams</p>
                                <div className='mt-5 sr_Content'>
                                    <h3 className='sr_Whatcan'>What can Finreify's CRM do?</h3>
                                    <div className='mt-4 sr_List'>
                                        <ul className='sr_Listorder'>
                                            <li className='sr_List1'><span><img src={Tickicon} alt="tick" /></span>&nbsp;&nbsp;&nbsp;Segment your leads for targeted communication</li>
                                            <li className='mt-2 sr_List1'><span><img src={Tickicon} alt="tick" /></span>&nbsp;&nbsp;&nbsp; Lead Management - 360 degree coverage</li>
                                            <li className='mt-2 sr_List1'><span><img src={Tickicon} alt="tick" /></span>&nbsp;&nbsp;&nbsp;
                                                Email Integration</li>
                                            <li className='mt-2 sr_List1'><span><img src={Tickicon} alt="tick" /></span>&nbsp;&nbsp;&nbsp;Insights & Reports</li>
                                            <li className='mt-2 sr_List1'><span><img src={Tickicon} alt="tick" /></span>&nbsp;&nbsp;&nbsp;
                                                100% Secure</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-md-6'>
                            <div className='sr_Form'>
                                <h1 className='sr_Get'>Get a Demo</h1>
                                <p className='sr_Para mt-2'>We are here to answer all your questions!</p>
                                <div className='sr_Main' >
                                    <div>
                                        <input
                                            className='sr_Inputarea px-3'
                                            type="text"
                                            id="name"
                                            placeholder='Enter Your Name'
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className='mt-2'>
                                        <input
                                            className='sr_Inputarea px-3'
                                            type="email"
                                            placeholder='Enter your Email'
                                            id="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className='mt-2 position-relative'>
                                        <select className='border countryCode ' onChange={(e) => setCountryCode(e.target.value)}>
                                            <option value="+91" key="">+91</option>
                                        </select>

                                        <input
                                            className='sr_Inputarea '
                                            type="tel"
                                            placeholder='Enter your Phone No'
                                            id="Number"
                                            value={tel}
                                            onChange={(e) => settel(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className='mt-2 sr_Company'>
                                        <div className='col-md-5'>
                                            <input
                                                className='sr_Inputarea1 px-3'
                                                type="text"
                                                placeholder='Company Name'
                                                id="company"
                                                value={company}
                                                onChange={(e) => setCompany(e.target.value)}
                                                required
                                            />
                                        </div>

                                        <div className='col-md-5'>
                                            <input
                                                className='sr_Inputarea1 px-3'
                                                type="number"
                                                placeholder='Employee size'
                                                id="number"
                                                value={employeesize}
                                                onChange={(e) => setEmployeesize(e.target.value)}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className='mt-2 sr_Company'>
                                        <input
                                            className='sr_Inputarea px-3'
                                            type="text"
                                            placeholder='Company Email'
                                            id="company"
                                            value={companyEmail}
                                            onChange={(e) => setCompanyEmail(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className='mt-2'>
                                        <textarea
                                            className='sr_Inputarea22 px-3'
                                            rows={3}
                                            id="message"
                                            placeholder='Your Requirements'
                                            value={message}
                                            onChange={(e) => setMessage(e.target.value)}
                                            required
                                        ></textarea>
                                    </div>
                                    <button className='btn mt-2 sr_Submit' onClick={handleSubmit}  >Submit</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <CrousalSection />
            <Footer />
        </>
    )
}

export default RequestDemo;
