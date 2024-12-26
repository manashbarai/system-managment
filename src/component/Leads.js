import React, { useEffect, useMemo, useState } from "react";
import { DataStorage } from "../context/useCotext";
import InfiniteScroll from 'react-infinite-scroll-component';
import "./Lead.css";
import '../App.css';

import TeamList from "./TeamList";

import History from "./History";
import Candidatehistory from "./candidateDetails/Candidatehistory";
import Loader from "./Loder/Loader";

import TimeConvert from "./TimeConvert";
import axios from "axios";

const Leads = (props) => {

  const { isLoading, status, myProfile, callingStatus, updateStatusOfLead, todayDate, classificationAccordingtoStatus, getLeadAccordingStatus, statusWithCounts, mySuperTeam, statusWithCount } = DataStorage();
  const scrollToTop = () => {

    const currentScroll = window.scrollY || window.pageYOffset;


    if (currentScroll < 200) {

      window.scrollTo({
        top: 200,
        behavior: 'smooth',
      });
    }

  };

  if (myProfile.userRole === '4') {

    localStorage.clear()
    alert("You are blocked By Team")
    window.location.reload()
    window.location.href = "/login";
  }


  const [followUPstatus, setFollowUPstatus] = useState("")
  const [followUPstatusDate, setFollowUPstatusDate] = useState({})


  const statusForComment = status;



  const [popUpuserList, setPopUpuserList] = useState(false)

  const teamPopUp = () => {
    setPopUpuserList(false)
  }






  const [selectedCheckboxes, setSelectedCheckboxes] = useState(
    localStorage.getItem("givingLeads")
      ? JSON.parse(localStorage.getItem("givingLeads"))
      : []
  );


  const handleCheckboxChange = (e) => {
    const { id, checked } = e.target;


    if (checked) {
      setSelectedCheckboxes((prevSelected) => [...prevSelected, id]);
    } else {
      setSelectedCheckboxes((prevSelected) =>
        prevSelected.filter((item) => item !== id)
      );
    }
  };
  localStorage.setItem("givingLeads", JSON.stringify(selectedCheckboxes));





  const [statusComment, setStatusComment] = useState("")
  const [statusId, setStatusId] = useState()

  const [callingSta, setCallingSta] = useState("")

  const setCallingStatus = (e, status, id) => {
    setStatusComment(id)
    setCallingSta(e.target.value)
  }






  const [commentStatusmgs, setCommentStatusmgs] = useState("")



  const [statusDetailsPopup, setStatusDetailsPopup] = useState("")

  const statusDetails = (id) => {

    setStatusDetailsPopup(id)
  }
  const [candidateDetails, setCandidateDetails] = useState({})
  const [ultimateShowingFields, setUltimateShowingFields] = useState([])



  const [candidateLead, setCandidateLead] = useState(false)

  const candidateDetailse = (e, showingData) => {
    candidateLead === false ? setCandidateLead(true) : setCandidateLead(false)
    setCandidateDetails(e)
    setUltimateShowingFields(showingData)

  }
  // const [currentPage, setCurrentPage] = useState(localStorage.getItem('currentPage'));



  const headers = useMemo(() => ({
    Authorization: `${localStorage.getItem("crm_token")}`,
    'Content-Type': 'application/json',
  }), [])

  const [page, setPage] = useState(2);
  const [leadData, setLeadData] = useState([]);

  const [loading, setLoading] = useState(false)
  const nextPaginating = async () => {

    try {
      setLoading(true)
      setPage((prevPage) => prevPage + 1);

      // Build the URL for the next page
      let url = sessionStorage.getItem('leadApi');

      // Use the updated page value in the URL
      url = url.replace(/page=(\d+)/, `page=${page}`);

      // Fetch data for the next page
      const getData = await axios.get(url, { headers });
      const statusData = getData.data.leads;

      // Update state with the new data
      setLeadData((prevLeadData) => prevLeadData.concat(statusData));
    } catch (error) {
      // Handle errors if needed
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false)
    }

  };


  const selectAllLeads = () => {

    const leadIds = leadData && leadData.map(e => e._id);


    const existLeadString = localStorage.getItem('givingLeads');
    let existLead = [];


    existLead = JSON.parse(existLeadString) || [];

    if (existLead) {

      localStorage.setItem('givingLeads', JSON.stringify(existLead.concat(leadIds)));

    }
    let url = sessionStorage.getItem('leadApi')
    getLeadAccordingStatus(url)
  }

  const deSelectAllLeads = () => {
    localStorage.setItem('givingLeads', [])
    localStorage.removeItem('givingLeads')

    let url = sessionStorage.getItem('leadApi')
    getLeadAccordingStatus(url)

  }





 

  // const [showingField, setShowingField] = useState(
  //   mySuperTeam.showingField.filter(data =>
  //     data !== "AppliedDate" &&
  //     data !== "Name" &&
  //     data !== "Status" &&
  //     data !== "CallingStatus"
  //   )
  // );


  useEffect(() => {

    if (statusDetailsPopup !== "") {
      const handleScroll = (event) => {
        // Check if the scroll direction is upwards
        if (event.deltaY < 0 && statusDetailsPopup !== "") {
          scrollToTop();
        }
      };

      // Add event listener for 'wheel' event
      window.addEventListener("wheel", handleScroll);

      // Cleanup function to remove the event listener when the component unmounts
      return () => {
        window.removeEventListener("wheel", handleScroll);
      };
    }
  }, [statusDetailsPopup])

  const [ultimateShowingField, setUltimateShowingField] = useState([]);





  useEffect(() => {

    setLeadData(classificationAccordingtoStatus)
    const ultimateShowing = mySuperTeam.showingField.filter((e) => {
      return e !== "AppliedDate" && e !== "Name" && e !== "Status" && e !== "CallingStatus";
    });
    setUltimateShowingField(ultimateShowing);



  }, [classificationAccordingtoStatus,mySuperTeam.showingField])


  const [color, setColor] = useState("")

  function changePrimaryColor(color,selectBox) {
    document.documentElement.style.setProperty('--primary-leadBorder', color);
    document.documentElement.style.setProperty('--primary-selectBox', selectBox);
    
  }


  useEffect(() => {
    const color = statusWithCount && statusWithCount.find(status => status.id === parseInt(sessionStorage.getItem('setLeadStatus')))
    setColor(`linear-gradient(${color ? color.color : "180deg,#000 0%,#55ff00 100%"})`)

    changePrimaryColor(`linear-gradient(${color ? color.color : "180deg,#000 0%,#55ff00 100%"})`,color ?color.color.split(",")[2].split("100%")[0]:'#787878')

  }, [statusWithCount,color])

 

  const [isHovered, setIsHovered] = useState("");

  const handleMouseEnter = (id) => {
    setIsHovered(id);
  };

  const handleMouseLeave = () => {
    setIsHovered("");
  };


  if (isLoading) {
    return (
      <div>
        <Loader loading={"Loading"} />

      </div>
    );
  }




  return (

    <>
      <div className="  rounded">


        <div className='bg-body d-flex gap-1 mb-2 px-2 px-lg-4  py-2 rounded shadow-sm'>
          {myProfile.userRole !== '3' && <>{leadData.length !== 0 && <>
            <button style={{ color: " #7c7c7c" }} className='selectButton  bg-body border-0' onClick={selectAllLeads} > <span style={{ borderRadius: "4px" }} className="border  py-1 px-2">Select All</span>  </button>
            <button style={{ color: " #7c7c7c" }} className='selectButton bg-body border-0' onClick={deSelectAllLeads}  > <span style={{ borderRadius: "4px" }} className="border  py-1 px-2" >Clear All</span>  </button> </>
          }
          </>}

        </div>

        {candidateLead && <div className="position-fixed  top-0 start-0 w-100 h-100 " style={{ zIndex: "2" }}>
          <Candidatehistory candidateDetailse={candidateDetailse} ultimateShowingField={ultimateShowingFields} candidateDetails={candidateDetails} />
        </div>}

        <div className="bg-body rounded">
          {JSON.parse(localStorage.getItem("givingLeads")).length !== 0 && <> {myProfile.userRole === '1' &&

            <button style={{ zIndex: "2" }} className='btn btn-dark position-fixed end-0 top-50' onClick={() => {
              if (JSON.stringify(localStorage.getItem("givingLeads")).length !== 0 || localStorage.getItem("givingLeads")) {
                setPopUpuserList(true)
              }


            }}>


              <span className="rounded-pill mx-2 mt-2">
                Assign To

              </span>

            </button>
          }</>
          }



          {myProfile.userRole === '1' && <>

            {popUpuserList === true && <>
              <div style={{ zIndex: 3, width: "100%", height: "100%", background: "rgba(95, 73, 138,0.4)" }} className="position-fixed  top-0 start-0 ">
                <div className="col-md-8 m-auto position-relative ">
                  <button style={{ backgroundColor: "rgb(95, 73, 138)", }} className='border-0 py-2 m-2 px-3 text-white rounded-pill position-absolute top-0 end-0' onClick={() => teamPopUp()}  > X </button>
                  <TeamList teamPopUp={teamPopUp} />
                </div>

              </div>
            </>
            }
          </>
          }










          <div className='d-flex leadList  p-0  p-lg-4   shadow-sm rounded'>
            <div className=''>

              <InfiniteScroll
                dataLength={leadData.length}

                next={nextPaginating}
                hasMore={parseInt(sessionStorage.getItem('totalLeadCount')) === leadData.length ? false : true}
                loader={loading ? <h4 className="loading">Loading...</h4> : ""}
                refreshFunction={nextPaginating}
                pullDownToRefresh
                pullDownToRefreshThreshold={50}
                endMessage={
                  <p style={{ textAlign: 'center' }}>
                    <b>Yay! You have seen it all</b>
                  </p>
                }
              >
                <ul className='d-flex position-relative m-0 p-0 '>
                 {myProfile.userRole !== '3' && <li className='selectLead border rounded-2'><div className="text-capitalize  rounded-3 ">

                  </div>  </li>}
                  {mySuperTeam.showingField.map((e, i) => {

                    return <li className='specific_width_border border fw-bold'><div style={{ background: color }} className="specific_width leadColor text-capitalize  rounded-3 ">
                      {e}
                    </div>  </li>

                  })}
                  <li style={{ background: color }} className='specific_width_border border  specific_width leadColor text-capitalize  rounded-3 '>Last Comment </li>
                </ul>

                <div id="leadColor">
                  {leadData &&

                    <>
                      {leadData &&
                        leadData.map((e, i) => {
                          let printStatus = status && status.find((item) => item.id === e.status);
                          let printCallingStatus = callingStatus && callingStatus.find((item) => item.id === e.callingStatus);
                          let checked = "";

                          if (status !== null && localStorage.getItem('givingLeads')) {
                            let selectedLeads = JSON.parse(localStorage.getItem('givingLeads'));
                            selectedLeads = [...new Set(selectedLeads)];


                            checked = selectedLeads.find(lead => lead === e._id)

                          }
                         




                         



                          const keysToCheck = ["name"];
                          let leadName = '';
                          
                          for (const key of keysToCheck) {
                            const entry = Object.entries(e.lead).find(([k, v]) => k.toLowerCase().includes(key));

                            if (entry) {
                              leadName = entry[1];
                        
                              break;
                            }
                          }

                          



                          

                          // const searchData = dataForDisplay.filter(field => showingField.includes(field));








                          return <ul className='d-flex  m-0 p-0 my-1' key={e._id || i} >



                            {/* <button className=" ss_Unassignbtn" onClick={() => statusDetails(e._id)}  >Unassign</button> */}

                            {/* <span className="d-flex " onClick={() => candidateDetailse(e)}> */}

                            {myProfile.userRole !== '3'  && <li className='selectLead border rounded-2 d-flex justify-content-center align-items-center '>
                              <div className="">
                                {myProfile.userRole !== '3' && <><input className="d-none"
                                  type="checkbox"
                                  checked={checked}

                                  id={e._id}
                                  onChange={handleCheckboxChange}



                                />
                                  <label className="checkbox-label " htmlFor={e._id} ></label>
                                </>


                                }
                              </div>


                            </li>}



                            <li className='specific_width_border  '>
                              <div className="specific_width leadColor">
                                <label className="form-check-label" >

                                  {e.uploadDate}


                                </label>
                              </div>


                            </li>
                            <li className='specific_width_border    ' onClick={() => candidateDetailse(e, ultimateShowingField)} onMouseEnter={() => handleMouseEnter(e._id)}
                              onMouseLeave={() => handleMouseLeave(e._id)} >
                              <div style={{
                                cursor: "pointer",
                                backgroundColor: isHovered === e._id ? " #D8BFD8" : "#fff", // Change background color on hover
                              }} className="specific_width leadColor">

                                {leadName}
                              </div>



                            </li>

                            {/* </span> */}

                            <li className='specific_width_border  ' onMouseEnter={() => handleMouseEnter(e._id + "status")}
                              onMouseLeave={() => handleMouseLeave(e._id + "status")}>
                              <div className="specific_width leadColor" style={{
                                cursor: "pointer",
                                backgroundColor: isHovered === e._id + "status" ? " #D8BFD8" : "#fff", // Change background color on hover
                              }}>



                                <select id=""
                                  style={{ backgroundColor: isHovered === e._id + "status" ? " #D8BFD8" : "#fff" }}
                                  className="border-0 m-0 py-2 w-100 h-100 text-capitalize"
                                  onChange={async (event) => {
                                    setStatusId(event.target.value)


                                    const statusName = leadName;

                                    const options = { hour: '2-digit', minute: '2-digit', second: '2-digit' };
                                    const previous = status && status.find(sta => sta.id === e.status);
                                    const change = status && status.find(sta => sta.id === parseInt(event.target.value));
                                    const callingStas = callingStatus.find(calling => calling.id === e.callingStatus);
                                    const statusUpdate = {
                                      "name": myProfile.fullName,
                                      "Date": new Date().toLocaleDateString(),
                                      "Time": new Date().toLocaleTimeString(undefined, options),
                                      "previousStatus": e.status,
                                      "changeStatus": event.target.value,
                                      "userRole": myProfile.userRole,
                                      // "commentAgnistStatus": e.statusHistory.name,
                                      "statusName": statusName,
                                      "previousStatusName": previous.status,
                                      "changeStatusName": change.status,
                                      "teamId": myProfile.teamId && myProfile.teamId,
                                      "callingStatus": e.callingStatus === null ? 5 : e.callingStatus,
                                      "callingStatusName": callingStas ? callingStas.callingStatus : "Unknown",
                                      "Location": "kolkata",
                                      tenantID: mySuperTeam.tenantId,
                                      superTeamId: mySuperTeam._id,
                                    }
                                    if (event.target.value === '5') {
                                      setFollowUPstatus(e._id)
                                      setFollowUPstatusDate(statusUpdate)


                                    } else {





                                      updateStatusOfLead(`${process.env.REACT_APP_API}statusHistory/${e._id}/${myProfile._id}`, statusUpdate)


                                      statusWithCounts(sessionStorage.getItem("countStatus"))

                                      getLeadAccordingStatus(sessionStorage.getItem("leadApi"))



                                    }




                                  }}  >


                                  <option style={{ fontSize: '0px' }} className="text-capitalize">
                                    {" "}
                                    {printStatus && printStatus.status}{" "}
                                  </option>
                                  {status &&
                                    status.map((status, index) => {
                                      return (
                                        <option style={{ fontSize: '14px' }} value={status.id} key={status._id} className='sum_Dashboard_makeAdmin'>{status.status}</option>
                                      );
                                    })}


                                </select>

                              </div>


                              {e.followUpDate && <div className="" >
                                <p style={{ color: "rgb(95, 73, 138)", fontSize: "10px" }} className="px-4 m-0 text-center" >

                                  {e.followUpDate === todayDate ? <><span style={{ fontWeight: "bold" }}>Follow up today at</span>  {e.followTime && <TimeConvert followTime={e.followTime} />} </> : <><span className="" style={{ fontWeight: "bold" }} >Follow up {e.followUpDate.split('-')[2]}/{e.followUpDate.split('-')[1]}/{e.followUpDate.split('-')[0]} at {e.followTime && <TimeConvert followTime={e.followTime} />}  </span>       </>}
                                </p>

                              </div>}



                              {followUPstatus === e._id && <div className="d-flex flex-column align-items-center mt-2  ">
                                <div className="d-flex justify-content-between">

                                  <input type="date" onChange={(e) => {
                                    const newFollowUPstatusDate = {
                                      ...followUPstatusDate,
                                      followUpDate: e.target.value,
                                    };
                                    setFollowUPstatusDate(newFollowUPstatusDate);
                                  }} />
                                  <input
                                    type="time"


                                    style={{ width: "37%", fontSize: "10px", color: "rgb(95, 73, 138)", margin: "1px 0", padding: 0, border: "1px solid purple", borderRadius: "4px" }}
                                    onChange={(e) => {
                                      const newFollowUPstatusDate = {
                                        ...followUPstatusDate,
                                        followTime: e.target.value,
                                      };
                                      setFollowUPstatusDate(newFollowUPstatusDate);
                                    }}
                                  />
                                </div>
                                <button style={{ color: "purple", fontSize: "13px", fontWeight: "bold", background: "transparent" }} className="border-0" onClick={async () => {

                                  try {
                                    if (followUPstatusDate.followUpDate === undefined || "") {
                                      alert("Enter Date ")
                                      return
                                    } else if (followUPstatusDate.followTime === undefined || "") {
                                      alert("Enter Time ")
                                      return
                                    } else {
                                      if (myProfile.userRole === '4') {

                                        localStorage.clear()
                                        alert("You are blocked By Team")
                                        window.location.reload()
                                        window.location.href = "/login";
                                      }

                                      updateStatusOfLead(`${process.env.REACT_APP_API}statusHistory/${e._id}/${myProfile._id}`, followUPstatusDate)

                                      statusWithCounts(sessionStorage.getItem("countStatus"))
                                      getLeadAccordingStatus(sessionStorage.getItem("leadApi"))




                                    }
                                  } catch (error) {
                                    if (error.response.status === 412) {

                                      localStorage.clear()
                                      window.location.reload()
                                      window.location.href('./login')
                                    }
                                  }

                                }}  >submit</button>
                              </div>}


                              {statusDetailsPopup === e._id && <div style={{ position: "fixed", width: "100%", height: "100vh", top: "0", left: "0", zIndex: 9 }}> <History leadName={leadName} closeHistory={statusDetails} id={e._id} currentStatus={e.status} /></div>}

                            </li>


                            <li className="specific_width_border  " onMouseEnter={() => handleMouseEnter(e._id + "calling")}
                              onMouseLeave={() => handleMouseLeave(e._id + "calling")} >
                              {statusComment !== e._id && <div className="specific_width leadColor" style={{
                                cursor: "pointer",
                                backgroundColor: isHovered === e._id + "calling" ? " #D8BFD8" : "#fff", // Change background color on hover
                              }}>


                                <select
                                  
                                  style={{ backgroundColor: isHovered === e._id + "calling" ? " #D8BFD8" : "#fff" }}
                                  className="border-0 m-0 py-2 w-100 h-100 text-capitalize"
                                  onChange={(event) => {

                                    setCallingStatus(event, e.status, e._id)
                                  }}>
                                  <option  className="text-capitalize">
                                    {" "}
                                    {printCallingStatus && printCallingStatus.callingStatus ? printCallingStatus.callingStatus : "Select"}{" "}
                                  </option>

                                  {callingStatus && callingStatus.map((callingStatus, index) => {
                                    return <option style={{ fontSize: "14px" }} className="text-capitalize" value={callingStatus.id} key={callingStatus._id}  >
                                      {callingStatus.callingStatus}

                                    </option>
                                  })}
                                </select>
                              </div>}
                              {statusComment === e._id && <div className="d-flex justify-content-center align-items-center flex-column">
                                <textarea style={{ padding: "1px 2px", margin: "1px 2px", width: "99%" }} cols="" rows="" placeholder={commentStatusmgs} onChange={(e) => setCommentStatusmgs(e.target.value)}  ></textarea>
                                <button type="button" style={{ border: "1px solid #5F498A", borderRadius: "4px", color: "#5F498A", fontSize: "10px", fontWeight: "bold", padding: "0 5px" }}

                                  onClick={async () => {
                                    const options = { hour: '2-digit', minute: '2-digit', second: '2-digit' };
                                    if (commentStatusmgs === "") {
                                      alert("Comment is mandatory")
                                      return;
                                    }
                                    const keysToCheck = ["full_name", "fullname", "name"];
                                    let leadName = '';

                                    for (const key of keysToCheck) {
                                      const entry = Object.entries(e.lead).find(([k, v]) => k.toLowerCase().includes(key));

                                      if (entry) {
                                        leadName = entry[1];
                                        break;
                                      }
                                    }

                                    const statusName = leadName;

                                    const previous = statusForComment && statusForComment.find(sta => sta.id === e.status);
                                    const change = statusForComment && statusForComment.find(sta => sta.id === parseInt(statusId));
                                    const callingStas = callingStatus.find(calling => calling.id === parseInt(callingSta));



                                    const statusUpdate = {
                                      name: myProfile.fullName,
                                      Date: new Date().toLocaleDateString(),
                                      Time: new Date().toLocaleTimeString(undefined, options),
                                      previousStatus: e.status,
                                      changeStatus: e.status,
                                      userRole: myProfile.userRole,
                                      commentAgnistStatus: commentStatusmgs,
                                      statusName: statusName,
                                      previousStatusName: previous.status,
                                      changeStatusName: change ? change.status : previous.status,
                                      callingStatus: callingSta,
                                      callingStatusName: callingStas.callingStatus,
                                      teamId: myProfile.teamId && myProfile.teamId,
                                      tenantID: mySuperTeam.tenantId,
                                      superTeamId: mySuperTeam._id,
                                      Location: "kolkata"
                                    }

                                    if (myProfile.userRole === '4') {


                                      localStorage.clear()
                                      alert("You are blocked By Team")
                                      window.location.reload()
                                      window.location.href = "/login";
                                    }
                                    updateStatusOfLead(`${process.env.REACT_APP_API}statusHistory/${e._id}/${myProfile._id}`, statusUpdate)



                                    statusWithCounts(sessionStorage.getItem("countStatus"))

                                    getLeadAccordingStatus(sessionStorage.getItem("leadApi"))



                                  }} >Submit  </button>

                              </div>}











                            </li>



                            {ultimateShowingField.length !== 0 && ultimateShowingField.map((element, index) => {

                              return <li className="specific_width_border ">
                                <div className="specific_width leadColor">
                                  {Object.entries(e.lead).find(([key, value]) => key.toLocaleLowerCase().includes(element.toLowerCase())) ? (
                                    <>
                                      {Object.entries(e.lead).find(([key, value]) => key.toLocaleLowerCase().includes(element.toLowerCase()))[1]}
                                    </>
                                  ) : ("No data Yet")}
                                </div>

                              </li>
                            })}

                            <li className="specific_width_border ">
                              <div className=" specific_width leadColor justify-content-start">

                                <span style={{ fontSize: "10px", padding: "0 2px" }} className="px-2 border float-start"> {e.latestComment && new Date(e.latestComment.DateWithTime).getDate() + "/" + new Date(e.latestComment.DateWithTime).getDay() + "/" + new Date(e.latestComment.DateWithTime).getFullYear()} </span>
                                <span style={{ fontSize: "10px", fontWeight: "bold", lineHeight: "10px" }}>{e.latestComment && e.latestComment.commentAgnistStatus}</span>
                              </div>
                            </li>





















                          </ul>





                        })}
                    </>
                  }
                </div>

              </InfiniteScroll>



            </div>
          </div>





















        </div >

      </div>
    </>
  );
};

export default Leads;
