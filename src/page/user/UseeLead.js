import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { DataStorage } from '../../context/useCotext';
const UseeLead = (props) => {

  const { isLoading, status } = DataStorage()
  


  const headers = {
    Authorization: `${localStorage.getItem("crm_token")}`,
    'Content-Type': 'application/json',
  };

  const [myleads, setMyleads] = useState(props.myLeads)
  const [openStatusOptions, setPpenStatusOptions] = useState("")

  const [leadId, setLeadId] = useState("")
  const setStatus = async (e) => {
    const data = {
      status: parseInt(e.target.value)
    }

    try {
      const res = await axios.put(`${process.env.REACT_APP_API}updateStatus/${leadId}`, data, { headers })
      setPpenStatusOptions("")
      if (res.status === 200) {
        setMyleads(res.data);

      }
    } catch (error) {
      console.log(error);
    }

  }
  const [cmtBox, setCmtBox] = useState({
    name: "",
    value: ""
  })
  const [leadName, setLeadName] = useState("")
  const [leadComment, setLeadComment] = useState(false)
  const leadComments = (e) => {
    setLeadId(e)
    const name = props.myleads.find(item => item._id === e)


    setCmtBox({
      name: Object.keys(name.lead)[0],
      value: name.lead[Object.keys(name.lead)[0]]
    })
    setLeadName()
    setLeadComment(true)
  }


  const [cmtMgs, setCmtMgs] = useState("")

  const cmtMessage = (e) => {
    setCmtMgs(e.target.value)

  }
  const submitComment = async () => {



    const data = {
      Comment: cmtMgs
    }
    try {
      if (data.Comment === "") {
        alert("Please write Your message")
        return
      }
      const res = await axios.put(`${process.env.REACT_APP_API}updateStatus/${leadId}`, data, { headers })
      res.status === 200 && setMyleads(res.data);
    } catch (error) {
      console.log(error);
    }


    setLeadComment(false)



  }





  if (isLoading === true) {

    return <div>
      <h1>Loading . . . </h1>
    </div>
  }








  return (
    <div className=''>
      {leadComment && <div className='position-absolute top-0 start-0' style={{ background: "rgba(0,0,0,0.8)", width: "100%", height: "100%", zIndex: 4 }} >


        <div style={{ width: "800px", zIndex: 2, background: "rgba(0,0,0,0.9)", top: '50%', left: "50%", transform: 'translate(-50%, -50%)' }} className='position-absolute rounded d-flex justify-content-center align-items-center p-5 '  >
          <button type='button' className=' position-absolute top-0 end-0 btn rounded-pill border border-dark  bg-body' onClick={() => setLeadComment(false)} >X</button>

          <div className='col-md-12 position-relative bg-secondary rounded'>

            <div className='py-1 col-md-12 d-flex justify-content-center flex-column align-items-center' >

              <label for="exampleFormControlTextarea1" class="form-label bg-white px-3 my-2"> <strong>{cmtBox.name} :</strong> {cmtBox.value}  </label>



              <textarea value={cmtMgs} style={{ width: "90%" }} class="form-control " id="exampleFormControlTextarea1" rows="5" onChange={cmtMessage} ></textarea>
              <button type='button' className='btn mt-1 border border-dark btn-sm btn-secondary mt-2 mb-1 fw-bold' onClick={submitComment} >Submit</button>
            </div>
            




          </div> </div>  </div>}

      <ul className='m-0 p-0  '>


        {myLeads && myLeads.map((e, i) => {

          let printStatus = status.find(item => item.id === e.status)

          let checked = status !== null && selectedCheckboxes.find((lead) => lead === e._id);
          checked = checked !== undefined ? true : false;
          
          return <div key={e._id}>
            <div style={{ border: "1px solid grey", overflow: "scrollX", paddingLeft: "30px" }} className='d-flex justify-content-between py-3 rounded-top mt-2  position-relative '  >
              {props.userRole === '2' && <div style={{ top: "18px", left: "7px" }} className=' position-absolute '>

                <input
                  type="checkbox"
                  checked={checked}

                  className=''
                  id={e._id}
                  onChange={handleCheckboxChange}
                />

              </div>}

              {Object.entries(e.lead).map(([key, value]) => (
                <p key={key} >
                  <strong>{key}:</strong> {value}
                </p>
              ))}

              <div className='col-md-3 '>

                <button
                  style={{ background: `rgba(${printStatus && printStatus.color})` }}
                  className='btn btn-sm border border-dark' type='btn' onClick={() => openStatusOption(e._id)} >
                  {printStatus && printStatus.status}
                </button>
                <button className='btn border border-dark btn-sm' type='button' onClick={() => leadComments(e._id)}  > Comment </button>
                <select style={{ display: openStatusOptions === `${e._id}` ? "block" : "none" }} className="form-select" onChange={setStatus} value={status.status} >
                  <option className='d-none'  > {printStatus && printStatus.status} </option>
                  {status && status.map((status) => {
                    return <option value={status.id} key={status._id}  > {status.status} </option>

                  })}
                </select>
              </div>








            </div>

            <p className=' px-3 rounded-bottom border-bottom text-white ' style={{ background: "#a6a6a6" }}> <strong> Comment :</strong>

              <i className=''>
                {e.Comment}
              </i>


            </p>

          </div>
        })}



      </ul>
    </div>
  )
}

export default UseeLead
