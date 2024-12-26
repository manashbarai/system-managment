import React, { useMemo } from 'react';
import axios from 'axios';
import { useEffect, useState } from "react";
import * as XLSX from 'xlsx';
import './DashBoard.css'
import Leadform from './popUpcomponent/Leadform';
import Leads from './Leads';
import { DataStorage } from '../context/useCotext';
import Loader from './Loder/Loader';
import State from '../State';
const DashBoard = (props) => {
  const { isLoading, myProfile, getLeadAccordingStatus, statusWithCounts, mySuperTeam } = DataStorage()

  const [leadGenerate, setLeadGenerate] = useState(false)


  const [loading, setLoading] = useState(false)
  const headers = useMemo(() => ({
    Authorization: `${localStorage.getItem("crm_token")}`,
    'Content-Type': 'application/json',
  }), [])

  const [excelFile, setExcelFile] = useState(null);
  // const [typeError, setTypeError] = useState(null);

  // submit state
  const [excelFileName, setExcelFileName] = useState("")
  const [excelData, setExcelData] = useState(null);

  // onchange event
  const closeExcelData = () => {
    setExcelFileName("")
    setExcelFile(null)
    setExcelData(null)
    // setTypeError(null)
    statusWithCounts(sessionStorage.getItem('countStatus'))

  }

  const handleFile = (e) => {
    setExcelFileName(e.target.files[0].name);
    let fileTypes = ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'text/csv'];
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile && fileTypes.includes(selectedFile.type)) {
        // setTypeError(null);
        let reader = new FileReader();
        reader.readAsArrayBuffer(selectedFile);
        reader.onload = (e) => {
          setExcelFile(e.target.result);
        }
      }
      else {
        // setTypeError('Please select only excel file types');
        setExcelFile(null);
      }
    }
    else {
      console.log('Please select your file');
    }
  }

  // submit event
  const handleFileSubmit = async (e) => {
    e.preventDefault();
    if (excelFile !== null) {
      const workbook = XLSX.read(excelFile, { type: 'buffer' });
      const worksheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[worksheetName];
      const data = XLSX.utils.sheet_to_json(worksheet);
      setExcelData(data);
    }
    setLoading(true)



  }



  // const selectAllLeads = () => {

  //   const leadIds = classificationAccordingtoStatus && classificationAccordingtoStatus.map(e => e._id);

  //   const existLeadString = localStorage.getItem('givingLeads');
  //   let existLead = [];

  //   try {
  //     console.log('Existing data from localStorage:', existLeadString);

  //     existLead = JSON.parse(existLeadString) || [];
  //   } catch (error) {
  //     console.error('Error parsing JSON:', error);
  //   }


  //   if (existLead) {
  //     localStorage.setItem('givingLeads', JSON.stringify(existLead.concat(leadIds)));
  //   }

  //   let url = sessionStorage.getItem('leadApi');
  //   getLeadAccordingStatus(url);




  // }
  // const deSelectAllLeads = () => {
  //   localStorage.setItem('givingLeads', [])
  //   localStorage.removeItem('givingLeads')

  //   let url = sessionStorage.getItem('leadApi')
  //   getLeadAccordingStatus(url)

  // }








  // --------------------Filter--------------------------


  // const [selectedState, setSelectedState] = useState('All States');
  // const [selectedCourse, setSelectedCourse] = useState('All Courses');

  // const [leadAccordingState, setLeadAccordingState] = useState([])
  // const [leadAccordingCourse, setLeadAccordingCourse] = useState([])


















  // --------------------------

  useEffect(() => {
    if (excelData !== null) {
      let data = excelData;

      let fieldsToAdd = {
        ownerId: localStorage.getItem('crm_id'),
        userRole: myProfile.userRole,
        tenantId: mySuperTeam.tenantId,
        superTeamId: mySuperTeam._id,

      };

      for (let i = 0; i < excelData.length; i++) {
        data[i] = { ...excelData[i], ...fieldsToAdd };
      }



      const uploadData = async () => {
        try {
          const response = await axios.post(`${process.env.REACT_APP_API}upLoadExcelData/${mySuperTeam._id}`, data, { headers });

          if (response.status === 200) {

            alert(response.data.uploadedLead)
            setLoading(false)
            statusWithCounts(sessionStorage.getItem('countStatus'))
            // getAllLeads(`${process.env.REACT_APP_API}leads`)


          }


        } catch (error) {
          if (error) {

            alert("Not successFully Uploaded")
            setLoading(false)

          }
          if (error.response.status === 412) {
            alert("Your Token Expire Need To login")
            localStorage.clear()
            window.location.reload()
            window.location.href('./login')
          }
        }
      };

      uploadData();
      setExcelData(null)
    }



  }, [excelData, headers, myProfile.userRole, statusWithCounts]);
  const handleFilterState = (event) => {
    // setLeadAccordingState([]);
    localStorage.setItem('currentPage', 1)
    sessionStorage.setItem('selectState', event.target.value)
    let url = sessionStorage.getItem("leadApi")

    if (url.includes('name=')) {

      url = url.replace(/name=[^&]*/, '');
    }


    url = url.replace(/states=([^&]*)/, `states=${sessionStorage.getItem('selectState')}`);
    url = url.replace(/page=(\d+)/, `page=${localStorage.getItem('currentPage')}`)



    getLeadAccordingStatus(url)
    // alert(url);


  };
  const [searchData, setSearchData] = useState(sessionStorage.getItem('leadSearchText'))

  const inputTextChange = (e) => {

    sessionStorage.setItem('leadSearchText', e.target.value)
    setSearchData(e.target.value)
    // getLeadAccordingStatus(`${url}&value=${e.target.value}`)

  }


  const searchByName = (e) => {
    e.preventDefault()
    if (searchData.split("").length === 1) {
      alert("Minimum 2 input required")
      return
    }
    // localStorage.setItem('currentPage',1)
    let url = sessionStorage.getItem("leadApi");

    if (url.match(/states=[^&]*/)) {
      url.replace(/states=([^&]*)/, '')
    }

    if (url.includes('name=')) {

      url = url.replace(/name=[^&]*/, `name=${searchData}`);
    } else {
      url = `${url}&name=${searchData}`;
    }
    if (searchData.split("").length === 0) {
      url = url.replace(/&name=[^&]*/, '');
      getLeadAccordingStatus(url)
    } else {

      getLeadAccordingStatus(url)
    }

  }

  const openLeadForm = () => {
    leadGenerate === true ? setLeadGenerate(false) : setLeadGenerate(true)

  }




  if (isLoading) {
    return <>
      <Loader loading={"Loading"} />

    </>
  }
  if (loading) {
    return <>
      <Loader loading={"Uploading"} />

    </>
  }



  return (
    <div >

      <div className='rounded      '>
        <div className=' mb-2 bg-body rounded shadow-sm py-0 py-sm-1'>



          <div className='d-flex justify-content-between flex-wrap'>
            <div className='m-0 p-0 d-flex gap-2 justify-content-center'>

              {props.adminLeads !== 'searchLead' && <> <div className='ss_Filterdata'>



              </div>









                <div className='ss_Filterdata  d-flex align-items-center px-0 px-lg-3 gap-2' >


                  {mySuperTeam.showingField.find(e => e.includes("state")) && <select style={{color:" #7c7c7c"}} className="form-control"  onChange={handleFilterState} >
                    <option selected>{sessionStorage.getItem('selectState')} </option>
                    {State.sort((a, b) => a.localeCompare(b)).map((state, index) => {
                      return <option key={index} value={state}>{state}</option>
                    })}
                  </select>}






                  <form onSubmit={searchByName} className='position-relative'>
                    <input style={{color:" #7c7c7c",width:"200px"}} type="text" value={searchData} className='form-control' placeholder='Search Lead' onFocus={() => { sessionStorage.setItem('leadSearchText', sessionStorage.getItem('leadSearchText')) }} onChange={inputTextChange} />
                    <button style={{ top: "5px",right:"7px" }} className='position-absolute  border-0 bg-transparent' type='submit'> 
                    
                    <img src="../../Images/searchIcon.svg" alt="" />
                    
                    
                    </button>
                  </form>

                </div></>}




            </div>

            {props.adminLeads !== 'searchLead' && <div className='d-flex align-items-center'>


              {myProfile.userRole === '1' && props.option !== "myLeads" && <div className='py-2  px-4'>

                <input  type="file" id='exelFile' className='d-none' onChange={handleFile} />
                {excelFileName === "" && <label htmlFor='exelFile' className='px-3 py-1 border rounded selectButton'  style={{color:" #7c7c7c"}} > Choose File   </label>}


                {excelFileName !== "" && <div style={{ display: "inline" }} className='' > <label style={{ backgroundColor: "#5F498A" }} className='px-4 text-white mx-2 py-1 rounded position-relative'>{excelFileName} <button className='position-absolute top-0 end-0 ' style={{ width: "20px", height: "100%", borderRadius: "2px" }} onClick={closeExcelData}  >x</button></label> </div>}

                {excelFileName !== "" && <button style={{
                  background: '#5F498A', border: ' 1px solid rgba(95, 73, 138, 0.25)', borderRadius: "4px"

                }} className=' border-0 text-white px-2 py-1 --add_column_after' onClick={handleFileSubmit}>Upload</button>}
              </div>}
              {myProfile.userRole !== '3' && props.option !== "myLeads" && <div style={{ marginRight: "20px" }} className='py-2  px-2'>

                <button style={{color:" #7c7c7c"}}  className=' border rounded bg-body py-1 px-2 selectButton' onClick={openLeadForm}   >Create Lead</button>
              </div>}

              {leadGenerate && <Leadform openLeadForm={openLeadForm} />}



              {props.adminLeads === "followUpStatus" && <div className='float-left'>
                <input style={{ border: "1px solid #d9d9d9", borderRadius: "4px", padding: "2px 4px", color: "#5F498A" }} type="date" value={sessionStorage.getItem('followUpdate')} onChange={(e) => {
                  // setDateOfFollowUp(e.target.value)
                  sessionStorage.setItem('followUpdate', e.target.value)
                  getLeadAccordingStatus(`${process.env.REACT_APP_API}classify/leads/${myProfile._id}?userRole=${myProfile.userRole}&status=5&limit=${sessionStorage.getItem('leadsLimit') ? sessionStorage.getItem('leadsLimit') : 10}&myLead=true&followUp=true&states=allState&aboutStatus=status&date=${e.target.value}`)


                }} />

              </div>}




            </div>}
          </div>
        </div>

        {/* {myProfile.userRole === '3' && <>
          {props.adminLeads === "followUpStatus" && <div className='d-flex justify-content-end px-2 py-2 '>
            <input value={dateOfFollowUp} style={{ border: "1px solid #d9d9d9", borderRadius: "4px", padding: "2px 4px", color: "#5F498A" }} type="date" onChange={(e) => {
              setDateOfFollowUp(e.target.value)
            }} />
          </div>}</>} */}




        <Leads color={props.color} option={props.option} followUp={props.followUp} adminLeads={props.adminLeads} />




      </div>


    </div>
  )
}

export default DashBoard
