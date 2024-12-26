import axios from 'axios';
import React, { useState } from 'react';
import { DataStorage } from '../../context/useCotext';

const GeneralSetting = () => {
    const {leads_Limit,getLeadLimit}=DataStorage()
  const [leadsLimit, setLeadsLimit] = useState(10);

  const limitSubmit = async (e) => {
    e.preventDefault(); // Fixed typo
    const headers = {
      Authorization: `${localStorage.getItem("crm_token")}`,
      'Content-Type': 'application/json',
  };
    if (leadsLimit < 1) {
      alert("Limit can't be set less than 1");
      return; // Added return to stop further execution
    }

    try {
      const res = await axios.post(`${process.env.REACT_APP_API}/leadsLimit`, {
        leadLimit: leadsLimit, 
      },{headers});
      
      if (res.status === 200) {

          getLeadLimit(`${process.env.REACT_APP_API}leadsLimit`)
          alert('Limit set successfully');
      }
    } catch (error) {
      console.log(error);
      
    }
  };

  return (
    <>
      <p className="float-end">
        Leads Limit : <span className="text-danger fw-bold">{leads_Limit[0].leadLimit && leads_Limit[0].leadLimit}</span>
      </p>
      <div className="container d-flex justify-content-center bg-body mt-5 py-5">
        <div className="col-md-6 d-flex justify-content-center flex-column align-items-center gap-3">
          <form onSubmit={limitSubmit} className='col-md-12 d-flex justify-content-center flex-column align-items-center gap-3'>
            <label className="form-level">
              <h2>Set New Leads Limit</h2>
            </label>
            <input
              type="number"
              value={leadsLimit}
              className="form-control"
              onChange={(e) => setLeadsLimit(e.target.value)}
            />
            <button type="submit" style={{ background: 'rgb(95, 73, 138)' }} className="btn text-white w-50">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default GeneralSetting;
