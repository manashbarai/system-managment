import React, { useMemo, useState } from 'react'
import './Leadform.css'
import axios from 'axios'
import { DataStorage } from '../../context/useCotext'

const Leadform = (props) => {
    const { getLeadAccordingStatus, statusWithCounts, mySuperTeam,myProfile } = DataStorage()
    const headers = useMemo(() => {
        return {
            Authorization: `${localStorage.getItem("crm_token")}`,
            'Content-Type': 'application/json',
        };
    }, []);
    console.log("mySuperTeam",mySuperTeam);
    const state = [
        'Andhra Pradesh',
        'Arunachal Pradesh',
        'Assam',
        'Bihar',
        'Chhattisgarh',
        'Goa',
        'Gujarat',
        'Haryana',
        'Himachal Pradesh',
        'Jharkhand',
        'Karnataka',
        'Kerala',
        'Madhya Pradesh',
        'Maharashtra',
        'Manipur',
        'Meghalaya',
        'Mizoram',
        'Nagaland',
        'Odisha',
        'Punjab',
        'Rajasthan',
        'Sikkim',
        'Tamil Nadu',
        'Telangana',
        'Tripura',
        'Uttar Pradesh',
        'Uttarakhand',
        'West Bengal',
        'Andaman and Nicobar Islands',
        'Chandigarh',
        'Dadra and Nagar Haveli and Daman and Diu',
        'Lakshadweep',
        'Delhi',
        'Puducherry',
        'Kolkata'
    ]
    const initialValues = mySuperTeam.mandatoryField;
    const [leadData, setLeadData] = useState(() => {
        const initialState = {};
        initialValues.forEach(key => {
            initialState[key] = '';
        });
        return initialState;
    });

    const takingLeadData = (e) => {
        setLeadData({
            ...leadData,
            [e.target.name]: e.target.value,
        });
    };

    const submitLeadData = async () => {
        // Check if any of the fields are empty
        const isEmptyField = Object.values(leadData).some(value => value === '');
    
        if (isEmptyField) {
            alert('Please fill in all fields');
            return;
        }
    
        try {
            const generateLead = await axios.post(`${process.env.REACT_APP_API}generateLead/${mySuperTeam._id}`, leadData, {
                headers
            });
            if (generateLead.status === 200) {
                alert("Submitted form");
                statusWithCounts(sessionStorage.getItem('countStatus'));
                getLeadAccordingStatus(sessionStorage.getItem('leadApi'));
                props.openLeadForm();
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <div style={{ zIndex: 1 }} className='LG_Background position-fixed w-100 top-0 start-0 '>
                <div className='container'>
                    <div className='LG_Popup'>
                        <div className='LG_upperSection'>
                            <div className='col-md-10 LG_leadHistory'>
                                <h3 className='LG_historY'>New Lead</h3>
                            </div>
                            <div className='col-md-2 LG_Close'>
                                <button type='button' className='btn mb-2' id='LG_closeButton' onClick={() => props.openLeadForm()}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
                                        <path d="M14 27C21.1797 27 27 21.1797 27 14C27 6.8203 21.1797 1 14 1C6.8203 1 1 6.8203 1 14C1 21.1797 6.8203 27 14 27Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M17.9001 10.1001L10.1001 17.9001" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M10.1001 10.1001L17.9001 17.9001" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div className=' p-5 container'>
                            <div className="py-1">
                                <div className="d-flex justify-content-between align-items-center">
                                    <div className="d-flex flex-row align-items-center back">
                                    </div>
                                </div>
                                <div>
                                    <div className="row mt-4">
                                        {initialValues.map((key, index) => (
                                            <div className="col-md-6" key={index}>
                                                <label>{key.charAt(0).toUpperCase() + key.slice(1)}</label>
                                                <input
                                                    name={key}
                                                    value={leadData[key]}
                                                    onChange={takingLeadData}
                                                    type="text"
                                                    className="form-control"
                                                  
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="mt-5 text-right">
                                    <button style={{ background: "#452E74" }} className="btn LG_Profile-button text-white" type="button" onClick={submitLeadData}>Save Lead</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Leadform
