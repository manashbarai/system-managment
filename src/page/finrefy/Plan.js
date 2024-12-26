import React, { useMemo, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Plan.css';
import axios from 'axios';
import { DataStorage } from '../../context/useCotext';

const Plan = (props) => {
  
  const headers = useMemo(() => ({
    Authorization: `${localStorage.getItem("crm_token")}`,
    'Content-Type': 'application/json',
  }), [])
  const [planDetails, setPlanDetails] = useState({
    id: "",
    planName: "",
    planPrice: "",
  
    userSize: "",
    validation: "",
  });
  const handleChange = (e) => {
    setPlanDetails({
      ...planDetails,
      [e.target.name]: e.target.value
    })
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      id: parseInt(planDetails.id),
      planName: planDetails.planName,
      validation: parseInt(planDetails.validation),
      planDetails: {
        employSize: parseInt(planDetails.userSize),
        leadSize: parseInt(planDetails.LeadSize),
        price: parseInt(planDetails.planPrice),
      },



    }
    console.log(data);
    try {
      const submitData = await axios.post(`${process.env.REACT_APP_API}company/plan`,{ data },{ headers })
      if (submitData.status === 200) {
        alert("Plan Add Successfully")
        props.openclose()
        
      }
    } catch (error) {
      console.log(error);
    }

  };

  return (
    <>




      <div>
        {/* <div className="blur-background" onClick={handleClosePopup}></div> */}
        <div className="popup">
          <span className="close" onClick={() => props.openclose()}>&times;</span>
          <h2 className='mt-4'>Plan Details</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label >Plan Name:</label>
              <input type="text" id="planName" name='planName' value={planDetails.planName} onChange={handleChange} />
            </div>
            <div>
              <label >Plan Id:</label>
              <input type="text" id="id" name='id' value={planDetails.id} onChange={handleChange} />
            </div>
            <div>
              <label >Price:</label>
              <input type="number" id="planPrice" name='planPrice' value={planDetails.planPrice} onChange={handleChange} placeholder="Add Price" />
            </div>
            {/* <div>
              <label >Lead Size:</label>
              <input type="number" id="planPrice" name='LeadSize' value={planDetails.LeadSize} onChange={handleChange} placeholder="Add Price" />
            </div> */}
            <div>
              <select name='validation' className='form-control' onChange={handleChange}>
                <option selected> {planDetails.validation ? planDetails.validation : "Monthly"}  </option>
                <option value="7" key="">Weekly </option>
                <option value="30" key="">Monthly </option>
                <option value="90" key="">Quarterly </option>
                <option value="365" key="">Yearly</option>


              </select>
            </div>
            <div>
              <label >User Size</label>
              <input className='form-control' type="number" id="numberOfUsers" name='userSize' value={planDetails.userSize} onChange={handleChange} />
            </div>
            <button id='ss_SubmitButton' type="submit" className='btn'>Submit</button>
          </form>
        </div>
      </div>

    </>
  );
}

export default Plan;
