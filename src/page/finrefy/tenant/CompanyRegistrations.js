
import React, { useMemo, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactDatePicker from 'react-datepicker';
import { DataStorage } from '../../../context/useCotext';
import axios from 'axios';
import './CompanyRegistration.css'
const CompanyRegistrations = (props) => {
    const headers = useMemo(() => ({
        Authorization: `${localStorage.getItem("crm_token")}`,
        'Content-Type': 'application/json',
    }), [])

    const { plan } = DataStorage()

    const [generateLink, setGenerateLink] = useState("")
     const [vertualLoading, setVertualLoading] = useState(false)
    const [formData, setFormData] = useState({
        companyName: props.data.companyName,
        email: props.data.companyEmail ? props.data.companyEmail : props.data.email,
        countryCode: props.data.phNumber.countryCode,
        number: props.data.phNumber.number,
        password: props.data.password ? props.data.password : '',
        confirmPassword: '',
        panId: props.data.document !== undefined ? props.data.document.panId.panId : "",
        gstNo: props.data.document !== undefined ? props.data.document.gstNo : "",
        planId: props.data.plan ? props.data.plan.planId : "",

        validationEndingTime: props.data.plan !== undefined ? props.data.plan.validation.endingTime : '',

        companyRole: '2',

    });
    const customDateFormat = 'dd/MM/yyyy';
    const [startDate, setStartDate] = useState(props.data.plan && props.data.plan.validation.startingTime);

    const [endDate, setEndDate] = useState();
    const getStartOfDay = (date) => {
        const startOfDay = new Date(date);
        startOfDay.setHours(0, 0, 0, 0); // Set time to 00:00:00.000
        return startOfDay;
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(pre => ({
            ...pre,
            [name]: value
        }))
    };


    const [paymentLink, setPaymentLink] = useState("")
    const [paymentDetails, setPaymentDetails] = useState({
        name: props.data.companyName,
        email: props.data.companyEmail ? props.data.companyEmail : props.data.email,
        contact: props.data.phNumber.number,
        amount: "",
        description: ""
    })



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
    
    console.log(paymentLink)













    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            companyName: formData.companyName,
            email: formData.email,
            phNumber: {
                countryCode: formData.countryCode,
                number: formData.number
            },
            password: formData.password,
            confirmPassword: formData.confirmPassword,
            companyName: formData.companyName,
            document: {
                panId: {
                    panId: formData.panId
                },
                gstNo: formData.gstNo
            },
            plan: {
                planId: parseInt(formData.planId),
                validation: {
                    startingTime: Date.now(startDate),
                    endingTime: formData.validationEndingTime
                }
            }
        }

        try {
            if (props.modification === 'new') {

                const companyRegistration = await axios.post(`${process.env.REACT_APP_API}company`, data, { headers })
                if (companyRegistration.status === 200) {
                    props.offclintOnboard()
                    props.dealFinalizeds(props.data._id)
                }
            } else if (props.modification === 'edit') {
                const companyRegistration = await axios.put(`${process.env.REACT_APP_API}company/${props.data._id}`, data, { headers })
                if (companyRegistration.status === 200) {
                    props.offclintOnboard()
                    props.dealFinalizeds(props.data._id, companyRegistration.data)

                }
            }
        } catch (error) {
            console.log(error);
        }

    };

    return (
        <>
            <div className='col-md-6'>
                <div className="container  bg-body  position-relative rounded ">
                    <button className='btn rounded-pill float-end bg-dark text-white position-absolute top-0 end-0' onClick={() => props.offclintOnboard()}> x </button>
                    <form onSubmit={handleSubmit} className='p-5 d-flex flex-column gap-3'>
                        <div className="form-group">

                            <input
                                placeholder='Company Name'
                                type="text"
                                className="form-control text-secondary"
                                id="companyName"
                                name="companyName"
                                value={formData.companyName}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">

                            <input
                                placeholder='Email'
                                type="email"
                                className="form-control text-secondary"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">

                            <input
                                type="text"
                                placeholder='Country Code'
                                className="form-control text-secondary"
                                id="countryCode"
                                name="countryCode"
                                value={formData.countryCode}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">

                            <input
                                type="text"
                                placeholder='Phone Number'
                                className="form-control text-secondary"
                                id="number"
                                name="number"
                                value={formData.number}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="d-flex  justify-content-between gap-4">
                            <div className=' flex-1 w-100 '>



                                <input
                                    type="text"
                                    placeholder='Gst No'
                                    className="form-control text-secondary"
                                    id="gstNo"
                                    name="gstNo"
                                    value={formData.gstNo}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className='w-100 flex-1'>

                                <input
                                    type="text"
                                    placeholder='Pan Id'
                                    className="form-control text-secondary"
                                    id="panId"
                                    name="panId"
                                    value={formData.panId}
                                    onChange={handleChange}
                                />








                            </div>
                        </div>
                        <div className="d-flex  justify-content-between gap-4">
                            <div className='w-auto'>
                                <ReactDatePicker


                                    className='custom-datepicker form-control text-secondary'
                                    placeholderText='Validation Start Form'
                                    selected={startDate}
                                    onChange={(date) => {



                                        setStartDate(getStartOfDay(date));
                                        setFormData(pre => ({
                                            ...pre,
                                            validationStartingTime: Date.now(startDate)
                                        }))
                                    }}
                                    dateFormat={customDateFormat}
                                    showYearDropdown
                                    showMonthDropdown
                                />


                            </div>
                            <div className="form-group w-100">
                                <select
                                    name="planId"
                                    className='form-control text-secondary w-100'
                                    onChange={(e) => {
                                        
                                        if (!startDate) {
                                            alert('Please select start date');
                                            return
                                        }


                                        if (e.target.value === "Choose Plan") {
                                            alert('Please select Right Plan');
                                            return
                                        }




                                        handleChange(e);
                                        const amount = plan && plan.find(planId => planId.id === parseInt(e.target.value))
                                        const days = plan && plan.find(planId => planId.id === parseInt(e.target.value));
                                        const validationEndTime = startDate.getTime() + (parseInt(days.validation) * 24 * 60 * 60 * 1000);
                                        createPaymentLink(amount.planDetails.price, validationEndTime , props.data.name,props.data.email,props.data.phNumber.number )
                                        setFormData(prev => ({
                                            ...prev,
                                            validationEndingTime: validationEndTime
                                        }));
                                    }}
                                >
                                    <option selected>{plan && plan.find(planId => planId.id === parseInt(formData.planId)) !== undefined ? plan.find(planId => planId.id === parseInt(formData.planId)).planName : "Choose Plan"} </option>
                                    {plan && plan.map((plan, index) => (
                                        <option value={plan.id} key={index}>{plan.planName}</option>
                                    ))}
                                </select>
                                
                            </div>

                        </div>
                        {formData.validationEndingTime !== "" && <button className='btn border text-secondary'>Copy Payment Link</button>}

                        <div className='w-100 flex-1'>

                            <input
                                type="text"
                                placeholder={formData.validationEndingTime === "" ? 'Validation EndingTime' : ''}
                                className="form-control text-secondary"
                                id="validationEndingTime"
                                name="validationEndingTime"
                                value={formData.validationEndingTime !== "" ? `${("0" + new Date(formData.validationEndingTime).getDate()).slice(-2)}/${("0" + (new Date(formData.validationEndingTime).getMonth() + 1)).slice(-2)}/${new Date(formData.validationEndingTime).getFullYear()}` : ''}
                            />


                           
                        </div>
                        {props.modification === 'new' && <> <div className="form-group">

                            <input
                                type="password"
                                placeholder='Password'
                                className="form-control text-secondary"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </div>
                            <div className="form-group">

                                <input
                                    type="password"
                                    placeholder='Confirm Password'
                                    className="form-control text-secondary"
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                />
                            </div></>}
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form >
                </div >
            </div>
        </>
    );
}

export default CompanyRegistrations
