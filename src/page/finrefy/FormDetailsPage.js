// FormDetailsPage.js
import React, { useState } from 'react';
import './formdetail.css'
import Plan from './Plan';
import { DataStorage } from '../../context/useCotext';

const FormDetailsPage = ({ planName, planPrice, numberOfUsers }) => {
  const {plan}=DataStorage()

  const [addField,setAddField]=useState(false)
  const openclose=()=>{
    addField===false?setAddField(true):setAddField(false);
  }

  return (
    <>
      <div style={{marginLeft:"30px"}} className='container bg-body '>
        <div className='mt-5 px-2 pt-5 d-flex justify-content-between m-0 p-0'>
          <h2 className='m-0 p-0'>Form Details</h2>
          <button className='border px-4 my-1 py-2' onClick={openclose}>Add Plan</button>
        </div>

        {addField===true && <Plan openclose={openclose}  />}




        <div className='ss_Formdetail'>
          <ul className='ss_PDetails'>
            <li className='col-md-2 ss_Pname'>Plan Id</li>
            <li className='col-md-2 ss_Pname'>Plan Name</li>
            <li className='col-md-2 ss_PPrice'>Plan Price</li>
            <li className='col-md-2 ss_NoUser'>Users Size</li>
            {/* <li className='col-md-2 ss_NoUser'>Lead Size</li> */}
            <li className='col-md-2 ss_NoUser'>Validation</li>
          </ul>
          {plan && plan.map((e,i)=>{
            return <ul className='ss_PData'>
            <li className='col-md-2 ss_PPrice1'>{e.id} </li>
            <li className='col-md-2 ss_PName1'>
              <label className="form-check-label" for="flexCheckDefault">
               {e.planName}
              </label>
            </li>
            <li className='col-md-2 ss_PPrice1'>{e.planDetails.price} /-</li>
            <li className='col-md-2 ss_NoUser1'>{e.planDetails.employSize} user  </li>
            {/* <li className='col-md-2 ss_NoUser1'>{e.planDetails.leadSize} leads</li> */}
            <li className='col-md-2 ss_NoUser1'>{e.validation} days  </li>
            
          </ul>
          })}
          



        </div>
      </div>
    </>
  );
}

export default FormDetailsPage;
