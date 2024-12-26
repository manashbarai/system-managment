
import React, { useState } from 'react';
import axios from 'axios';
import './CreateTenants.css';

const CreateTenants = () => {

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
        const regex = /^[6-9]\d{9}$/;
        return regex.test(phoneNumber);
    };
    const handleSubmit = async () => {
        if (!validateEmail(email)) {
            alert('Please enter a valid email address.');
            return;
        }

        if (!validatePhoneNumber(tel)) {
            alert('Please enter a valid Indian phone number.');
            return;
        }

        const data = {
            name,
            email,
            phNumber: {
                countryCode, number: tel
            },
            companyName: company,
            companyEmail,
            employSize: employeesize,
            requirements: message
        }




        try {
            const res = await axios.post(`${process.env.REACT_APP_API}crm/demo`, data)
            if (res.status === 200) alert("We will get back to You Very Soon");
            if (res.status === 200) {
                setName(""); setEmail(""); settel(''); setCompany(""); setEmployeesize(""); setMessage(""); setCompanyEmail(""); setCountryCode("")
            }

        } catch (error) {
            alert("Bad Request")
        }
    };


    return (
        <div className="professional-form-container mt-5">
            <div  className="professional-form">
                <div className="professional-form-group">
                    <label htmlFor="name" className="professional-label">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder='Enter Your Name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="professional-input"
                        required
                    />
                </div>

                <div className="professional-form-group">
                    <label htmlFor="email" className="professional-label">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder='Enter your Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="professional-input"
                        required
                    />
                </div>

                <div className="professional-form-group">
                    <label htmlFor="phone" className="professional-label">Phone No: <select className='professional-counterycode' onChange={(e) => setCountryCode(e.target.value)}>
                        <option value="+91" key="">+91</option>
                    </select></label>
                    <input
                        type="tel"
                        placeholder='Enter your Phone No'
                        id="Number"
                        name="phone"
                        value={tel}
                        onChange={(e) => settel(e.target.value)}
                        className="professional-input"
                        required
                    />
                </div>

                <div className="professional-form-group professional-inline-group">
                    <div className="professional-inline-item">
                        <label htmlFor="companyName" className="professional-label">Company Name:</label>
                        <input
                            type="text"
                            placeholder='Company Name'
                            id="companyName"
                            name="companyName"
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                            className="professional-input"
                            required
                        />
                    </div>

                    <div className="professional-inline-item">
                        <label htmlFor="employeeSize" className="professional-label">Employee Size:</label>
                        <input
                            type="Number"
                            placeholder='Employee Size'
                            id="EmployeeSize"
                            name="EmployeeSize"
                            value={employeesize}
                            onChange={(e) => setEmployeesize(e.target.value)}
                            className="professional-input"
                            required
                        />
                    </div>
                </div>

                <div className="professional-form-group">
                    <label htmlFor="email" className="professional-label">Company Email:</label>
                    <input
                        type="text"
                        placeholder='Company Email'
                        id="company"
                        name="email"
                        value={companyEmail}
                        onChange={(e) => setCompanyEmail(e.target.value)}
                        className="professional-input"
                        required
                    />
                </div>

                <div className="professional-form-group">
                    <label htmlFor="requirements" className="professional-label">Your Requirements:</label>
                    <textarea
                        id="requirements"
                        placeholder='Your Requirements'
                        name="requirements"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="professional-textarea"
                        required
                    ></textarea>
                </div>

                <button type="submit" className="professional-button" onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    );
};

export default CreateTenants;
