import React, { useState } from 'react'
import './Candidatehistory.css'
import axios from 'axios'
import { DataStorage } from '../../context/useCotext'
import Loader from '../Loder/Loader'

const Candidatehistory = (props) => {

    const { isLoading, getLeadAccordingStatus } = DataStorage()
    const [paymentLink, setPaymentLink] = useState("")
    const [paymentDetails, setPaymentDetails] = useState({
        name: "",
        email: "",
        contact: "",
        amount: "",
        description: ""
    })
    const [generateLink, setGenerateLink] = useState("")

    const [fullName, setFullName] = useState({
        key: "",
        value: "",

    })
    const [email, setEmail] = useState({
        key: "",
        value: "",

    })
    const [phoneNumber, setPhoneNumber] = useState({
        key: "",
        value: "",

    })

    const initialFields = props.ultimateShowingField.reduce((acc, curr) => {
        acc[curr] = "";
        return acc;
    }, {});

    const [ultimateShowingField, setUltimateShowingField] = useState(initialFields);

    const handleInputChange = (key, value) => {
        setUltimateShowingField(prevState => ({
            ...prevState,
            [key]: value
        }));
    };








    const sendEmail = async (email) => {
        const headers = {
            Authorization: `${localStorage.getItem("crm_token")}`,
            'Content-Type': 'application/json',
        };
        const data = {
            email: email,
            data: "Grab Your Dream Job By Upskilling Yourself And Kick Start Of Your Career. Learn today’s most in-demand tech skills and kickstart your new career with Edureify..! ",
            website: "https://www.edureify.com/"
        }
        try {
            const sendMail = await axios.post(`${process.env.REACT_APP_API}leadCandidate`, data, { headers })
            if (sendMail.status === 200) {
                alert(`mail sent successfully`)
            }
        } catch (error) {

        }
    }




    const submitCandidateDetails = async () => {
        const headers = {
            Authorization: `${localStorage.getItem("crm_token")}`,
            'Content-Type': 'application/json',
        };

        if (fullName.key !== "") {
            try {
                await axios.put(`${process.env.REACT_APP_API}updateLead/${props.candidateDetails._id}`, fullName, { headers });

            } catch (error) {
                if (error.response.status === 412) {

                    localStorage.clear()
                    window.location.reload()
                    window.location.href('./login')
                }
            }
        }
        if (email.key !== "") {
            try {
                await axios.put(`${process.env.REACT_APP_API}updateLead/${props.candidateDetails._id}`, email, { headers });

            } catch (error) {
                if (error.response.status === 412) {

                    localStorage.clear()
                    window.location.reload()
                    window.location.href('./login')
                }
            }
        }
        if (phoneNumber.key !== "") {
            try {
                await axios.put(`${process.env.REACT_APP_API}updateLead/${props.candidateDetails._id}`, phoneNumber, { headers });

            } catch (error) {
                if (error.response.status === 412) {

                    localStorage.clear()
                    window.location.reload()
                    window.location.href('./login')
                }
            }
        }



        for (const [key, value] of Object.entries(ultimateShowingField)) {
            



            if (key !== "" && value!=="") { 
                let keyes;
                const foundEntry = Object.entries(props.candidateDetails.lead).find(([keys, value]) => keys.toLocaleLowerCase().includes(key));

                const keys = foundEntry ? foundEntry[0] : undefined;
                if (keys) {
                    keyes=keys
                }else{
                    keyes=key
                }
               
                
                try {
                    await axios.put(
                        `${process.env.REACT_APP_API}updateLead/${props.candidateDetails._id}`,
                        { keyes, value },
                        { headers }
                    );
                } catch (error) {
                    if (error.response.status === 412) {
                        localStorage.clear();
                        window.location.reload();
                        window.location.href('./login');
                    }
                  
                }
                
            }
        }


        getLeadAccordingStatus(sessionStorage.getItem('leadApi'))

    }



    const [vertualLoading, setVertualLoading] = useState(false)


    const createPaymentLink = async (amount, desp, name, email, number) => {
        const headers = {
            Authorization: `${localStorage.getItem("crm_token")}`,
            'Content-Type': 'application/json',
        };
        setVertualLoading(true)
        const data = {
            amount, desp, name, email, number
        }
        try {
            const resp = await axios.post(`${process.env.REACT_APP_API}payment`, data, { headers })
            if (resp.status === 200) {
                setVertualLoading(false)
            }
            setPaymentLink(resp.data.paymentLink);
            setGenerateLink("gotPaymentLink")
        } catch (error) {
            setVertualLoading(false)
            if (error.status === 406) {
                alert("This features available soon  ")
            }
        }



    };




















    if (isLoading || vertualLoading) {
        return (
            <Loader loading={'Loading'} />
        )
    }




    return (
        <div className='CH_Background'>
            <div className='container'>
                <div className='CH_Popup'>
                    <div className='CH_upperSection'>
                        <div className='col-md-10 CH_leadHistory'>
                            <h3 className='CH_historY'>Candidate Details</h3>
                        </div>
                        <div className='col-md-2 CH_Close'>
                            <button type='button' className='btn mb-2' id='CH_closeButton' onClick={props.candidateDetailse}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
                                    <path d="M14 27C21.1797 27 27 21.1797 27 14C27 6.8203 21.1797 1 14 1C6.8203 1 1 6.8203 1 14C1 21.1797 6.8203 27 14 27Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M17.9001 10.1001L10.1001 17.9001" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M10.1001 10.1001L17.9001 17.9001" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div className=' p-5 container'>


                        <div className="py-1 CH_mainContent">
                            <div className="d-flex  align-items-center mb-3">
                                <div className="d-flex flex-row align-items-center back">

                                </div>

                                {generateLink === "" && <button className="btn text-right CH_Edit" onClick={() => {

                                    const candidateName = Object.entries(props.candidateDetails.lead).find(([key, value]) => key.toLocaleLowerCase().includes("full_name")) ? Object.entries(props.candidateDetails.lead).find(([key, value]) => key.toLocaleLowerCase().includes("full_name"))[1] :
                                        Object.entries(props.candidateDetails.lead).find(([key, value]) => key.toLocaleLowerCase().includes("fullname")) ? Object.entries(props.candidateDetails.lead).find(([key, value]) => key.toLocaleLowerCase().includes("fullname"))[1] :
                                            Object.entries(props.candidateDetails.lead).find(([key, value]) => key.toLocaleLowerCase().includes("first name")) ? Object.entries(props.candidateDetails.lead).find(([key, value]) => key.toLocaleLowerCase().includes("first name"))[1] :
                                                Object.entries(props.candidateDetails.lead).find(([key, value]) => key.toLocaleLowerCase().includes("name")) ? Object.entries(props.candidateDetails.lead).find(([key, value]) => key.toLocaleLowerCase().includes("name"))[1] : null;

                                    const candidateEmail = Object.entries(props.candidateDetails.lead).find(([key, value]) => key.toLocaleLowerCase().includes("email"))[1]
                                    const candidatePhoneNumber = Object.entries(props.candidateDetails.lead).find(([key, value]) => key.toLocaleLowerCase().includes("number"))[1]
                                    setPaymentDetails({
                                        ...paymentDetails,
                                        name: candidateName, email: candidateEmail, contact: candidatePhoneNumber
                                    })

                                    setGenerateLink("openAmountDespInput")




                                }} >Generate Payment Link</button>}

                                {generateLink === "openAmountDespInput" && <div className='col-md-5'>
                                    <input type="number" value={paymentDetails.amount} className='form-control ' onChange={(e) => {
                                        setPaymentDetails({
                                            ...paymentDetails,
                                            amount: e.target.value
                                        })
                                    }} placeholder='Enter Amount' />
                                    <textarea value={paymentDetails.description} className='form-control my-2  ' onChange={(e) => {
                                        setPaymentDetails({
                                            ...paymentDetails,
                                            description: e.target.value
                                        })
                                    }} placeholder='Type Description Here' />
                                    <button type='button' className='btn  CH_Edit' onClick={() => {


                                        createPaymentLink(parseInt(paymentDetails.amount), paymentDetails.description, paymentDetails.name, paymentDetails.email, paymentDetails.contact)

                                    }}  >

                                        Submit
                                    </button>

                                </div>

                                }



                                {generateLink === "gotPaymentLink" && <button className='btn  CH_Edit' onClick={() => {

                                    let textarea = document.createElement('textarea');
                                    textarea.value = paymentLink;
                                    textarea.setAttribute('readonly', '');
                                    textarea.style.position = 'absolute';
                                    textarea.style.left = '-9999px';
                                    document.body.appendChild(textarea);
                                    textarea.select();
                                    document.execCommand('copy');
                                    document.body.removeChild(textarea);

                                    alert("Link Copied SuccessFully")

                                }}>
                                    Copy Payment Link
                                </button>

                                }



                            </div>
                            <div className='mt-2 mb-3'>
                                <h3>Personal Details</h3>
                            </div>
                            <div className="row mt-4">
                                <div className="col-md-6">
                                    <label>Name</label>
                                    {Object.entries(props.candidateDetails.lead).find(([key, value]) => key.toLocaleLowerCase().includes("full_name")) ? (
                                        <>
                                            <input type="text" className="form-control" value={fullName.value} placeholder={Object.entries(props.candidateDetails.lead).find(([key, value]) => key.toLocaleLowerCase().includes("full_name"))[1]}

                                                onClick={() => {
                                                    setFullName(prevState => ({
                                                        ...prevState, key: Object.entries(props.candidateDetails.lead).find(([key, value]) => key.toLocaleLowerCase().includes("full_name"))[0],
                                                        value: Object.entries(props.candidateDetails.lead).find(([key, value]) => key.toLocaleLowerCase().includes("full_name"))[1]

                                                    }))
                                                }
                                                }
                                                onChange={(e) => setFullName(pre => ({
                                                    ...pre,
                                                    value: e.target.value
                                                }))}

                                            />


                                        </>
                                    ) : (
                                        <>
                                            {Object.entries(props.candidateDetails.lead).find(([key, value]) => key.toLocaleLowerCase().includes("first name")) ? (<>
                                                <input type="text" className="form-control" value={fullName.value} placeholder={Object.entries(props.candidateDetails.lead).find(([key, value]) => key.toLocaleLowerCase().includes("first name"))[1]}

                                                    onClick={() => {
                                                        setFullName(prevState => ({
                                                            ...prevState, key: Object.entries(props.candidateDetails.lead).find(([key, value]) => key.toLocaleLowerCase().includes("first name"))[0],
                                                            value: Object.entries(props.candidateDetails.lead).find(([key, value]) => key.toLocaleLowerCase().includes("first name"))[1]

                                                        }))
                                                    }
                                                    }
                                                    onChange={(e) => setFullName(pre => ({
                                                        ...pre,
                                                        value: e.target.value
                                                    }))}

                                                />
                                            </>) : (
                                                <>
                                                    <input type="text" className="form-control" value={fullName.value} placeholder={Object.entries(props.candidateDetails.lead).find(([key, value]) => key.toLocaleLowerCase().includes("name"))[1]}

                                                        onClick={() => {
                                                            setFullName(prevState => ({
                                                                ...prevState, key: Object.entries(props.candidateDetails.lead).find(([key, value]) => key.toLocaleLowerCase().includes("name"))[0],
                                                                value: Object.entries(props.candidateDetails.lead).find(([key, value]) => key.toLocaleLowerCase().includes("name"))[1]

                                                            }))
                                                        }
                                                        }
                                                        onChange={(e) => setFullName(pre => ({
                                                            ...pre,
                                                            value: e.target.value
                                                        }))}

                                                    />

                                                </>
                                            )
                                            }
                                        </>
                                    )
                                    }







                                </div>
                                <div className="col-md-6">
                                    <label>Email</label>

                                    {Object.entries(props.candidateDetails.lead).find(([key, value]) => key.toLocaleLowerCase().includes("email")) ? (
                                        <>

                                            <div className='position-relative'>
                                                <button style={{ right: "1px", paddingTop: "1px" }} className='position-absolute  border-0 ' onClick={() => sendEmail(Object.entries(props.candidateDetails.lead).find(([key, value]) => key.toLocaleLowerCase().includes("email"))[1])}   > <img style={{ width: "30px", height: "30px", margin: "3px" }} src={require("./icons8-send-90.png")} alt="" /> </button>
                                                <input type="email" className="form-control" value={email.value} placeholder={Object.entries(props.candidateDetails.lead).find(([key, value]) => key.toLocaleLowerCase().includes("email"))[1]}

                                                    onClick={() => {

                                                        setEmail(prevState => ({
                                                            ...prevState, key: Object.entries(props.candidateDetails.lead).find(([key, value]) => key.toLocaleLowerCase().includes("email"))[0],
                                                            value: Object.entries(props.candidateDetails.lead).find(([key, value]) => key.toLocaleLowerCase().includes("email"))[1]
                                                        }))

                                                    }}
                                                    onChange={(e) => setEmail(pre => ({
                                                        ...pre,
                                                        value: e.target.value
                                                    }))}



                                                />
                                            </div>

                                        </>
                                    ) : (
                                        <>

                                            <div className='position-relative'>

                                                <input type="email" className="form-control" value={email.value} placeholder={'Input Email'}

                                                    onClick={() => {

                                                        setEmail(prevState => ({
                                                            ...prevState, key: "email",
                                                            value: "input Email"
                                                        }))

                                                    }}
                                                    onChange={(e) => setEmail(pre => ({
                                                        ...pre,
                                                        value: e.target.value
                                                    }))}



                                                />
                                            </div>

                                        </>
                                    )}







                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col-md-6">
                                    <label>Mobile No</label>


                                    {Object.entries(props.candidateDetails.lead).find(([key, value]) => key.toLocaleLowerCase().includes("number")) && (

                                        <input type="tel" className="form-control" value={phoneNumber.value} placeholder={Object.entries(props.candidateDetails.lead).find(([key, value]) => key.toLocaleLowerCase().includes("number"))[1]}

                                            onClick={() => setPhoneNumber(prevState => ({
                                                ...prevState, key: Object.entries(props.candidateDetails.lead).find(([key, value]) => key.toLocaleLowerCase().includes("number"))[0],
                                                value: Object.entries(props.candidateDetails.lead).find(([key, value]) => key.toLocaleLowerCase().includes("number"))[1]

                                            }))
                                            }
                                            onChange={(e) => setPhoneNumber(pre => ({
                                                ...pre,
                                                value: e.target.value
                                            }))}
                                        />
                                    )}





                                </div>



                                <div>
                                    {props.ultimateShowingField.map((element, index) => {
                                        const valueFromLead = Object.entries(props.candidateDetails.lead)
                                            .find(([leadKey]) => leadKey.toLowerCase().includes(element));
                                        const valueToShow = valueFromLead ? valueFromLead[1] : "data not found";
                                            
                                        return (
                                            <div className="col-md-6" key={index}>
                                                <label className='text-capitalize'>{element}</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder={valueFromLead ? valueFromLead[1] : "data not found"}
                                                    value={ultimateShowingField[element]}
                                                    onClick={() => handleInputChange(element, valueToShow)}
                                                    onChange={(e) => handleInputChange(element, e.target.value)}
                                                />
                                            </div>
                                        );
                                    })}

                                </div>


                            </div>



                            <div className="mt-5 text-right"><button className="btn CH_Profile-button" type="button"

                                onClick={submitCandidateDetails}

                            >Save Profile</button></div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Candidatehistory