import React, { useCallback, useEffect, useMemo, useState } from 'react'
import './History.css'
import { DataStorage } from '../context/useCotext'
import axios from 'axios'

const History = (props) => {
    const { status, callingStatus } = DataStorage()
    const [statusHistory, setStatusHistory] = useState([])
    const [leadJourneyAccordingStatus, setLeadJourneyAccordingStatus] = useState([])
    const [leadJourneyAccordingCalingStatus, setLeadJourneyAccordingCalingStatus] = useState([])


    const headers = useMemo(() => ({
        Authorization: `${localStorage.getItem("crm_token")}`,
        'Content-Type': 'application/json',
    }), [])

    const fetchdata = useCallback(async () => {
        try {

            const res = await axios.get(`${process.env.REACT_APP_API}leadHistory/${props.id}`, { headers })

            setStatusHistory(res.data)
            const statusHistory = res.data.filter(item => !item.commentAgnistStatus);
            const callingHistory = res.data.filter(item => item.commentAgnistStatus);
            setLeadJourneyAccordingStatus(statusHistory)
            setLeadJourneyAccordingCalingStatus(callingHistory)
        } catch (error) {

        }
    }, [props.id, headers])


    const [leadHistoryShow, setLeadHistoryShow] = useState("leadHistory")
    const [leadCallJourney, setLeadCallJourney] = useState(false)
    const leadhistory = (history) => {
        setLeadHistoryShow(history)
    }
    useEffect(() => {


        fetchdata()


    }, [props.id, fetchdata])




    return (
        <div className='H_Background'>
            <div className='container'>
                <div className='H_Popup'>
                    <div className='H_upperSection'>
                        <div className='col-md-10 H_leadHistory d-flex gap-2'>

                            <button style={{ border: leadHistoryShow !== 'leadHistory' && 'none' }} className='H_historY px-2 ' onClick={() => leadhistory("leadHistory")} >Lead History</button>
                            <button style={{ border: leadHistoryShow !== 'leadJourney' && 'none' }} className='H_historY px-2' onClick={() => leadhistory("leadJourney")} >Lead Journey</button>
                        </div>

                        <div className='col-md-2 H_Close z-3'>
                            <button type='button' className='btn mb-2' id='H_closeButton' onClick={() => {

                                props.closeHistory("")
                            }} >
                                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
                                    <path d="M14 27C21.1797 27 27 21.1797 27 14C27 6.8203 21.1797 1 14 1C6.8203 1 1 6.8203 1 14C1 21.1797 6.8203 27 14 27Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M17.9001 10.1001L10.1001 17.9001" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M10.1001 10.1001L17.9001 17.9001" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </div>

                    </div>

                    <div className='container'>
                        <div className='H_heading '>
                            <h4 className='h_Heading1 text-capitalize fs-4'>Name :<span className='fs-2 text-dark'>  {props.leadName}</span></h4>  <h4 className='h_Heading1 text-capitalize fs-4'>Current Status :<span className='fs-2 text-dark'>  {props.currentStatus && status.find(e => e.id === parseInt(props.currentStatus)).status} </span> </h4>

                        </div>
                        {leadHistoryShow === 'leadJourney' && <> {leadCallJourney === false ? <div className='d-flex gap-3 px-5 mb-2'> {status && status.sort((a, b) => a.id - b.id).map((leadStatus) => {
                            return <div className='d-flex align-items-center'>
                                <div style={{ width: "20px", borderRadius: "50%", height: "20px", backgroundImage: `linear-gradient(${leadStatus.color})` }}>

                                </div> <p className='m-0 p-0 text-capitalize fw-bold'> {leadStatus.status}</p>
                            </div>
                        })}</div> : <div className='d-flex gap-3 px-5 mb-2'> {callingStatus && callingStatus.sort((a, b) => a.id - b.id).map((leadStatus) => {
                            return <div className='d-flex align-items-center'>
                                <div style={{ width: "20px", borderRadius: "50%", height: "20px", backgroundImage: `linear-gradient(${leadStatus.color})` }}>

                                </div> <p className='m-0 p-0 text-capitalize fw-bold'> {leadStatus.callingStatus}</p>
                            </div>
                        })}</div>}</>}

                        {leadHistoryShow === 'leadHistory' && <div className='H_innerContent'>
                            <ul className='H_Details'>
                                <li className='col-md-2 H_Name'>Name</li>
                                <li className='col-md-2 H_Leadstatus'>Lead Status</li>
                                <li className='col-md-2 H_callingStatus'>Calling Status</li>
                                <li className='col-md-3 H_statusDate'>Status Date/Time</li>
                                <li className='col-md-2 H_locaTion'>Location</li>
                                <li className='col-md-3 H_coMment'>Comment</li>
                            </ul>
                            <div className='ss_userdata1111'>
                                {statusHistory && statusHistory.map((e, i) => {
                                    return <ul className='H_details1' key={e._id}>
                                        <li className='col-md-2 H_First1'>
                                            {e.userRole === '1' && <svg className='mt-1' xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                                                <circle cx="7" cy="7" r="7" transform="matrix(1 0 0 -1 0 14)" fill="#F05454" />
                                            </svg>}
                                            {e.userRole === '2' && <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                                                <circle cx="7" cy="7" r="7" transform="matrix(1 0 0 -1 0 14)" fill="#4DC959" />
                                            </svg>}
                                            {e.userRole === '3' && <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                                                <circle cx="7" cy="7" r="7" transform="matrix(1 0 0 -1 0 14)" fill="#FDC500" />
                                            </svg>}
                                            <h4 className='H_Name1'>
                                                {e.name}
                                            </h4>
                                        </li>
                                        <li className='col-md-2 H_Status'> {e.changeStatus && status.find(sta => sta.id === parseInt(e.changeStatus)).status}   </li>
                                        <li className='col-md-2 H_Status'> {e.callingStatus && callingStatus.find(elem => elem.id === parseInt(e.callingStatus)) ? callingStatus.find(elem => elem.id === parseInt(e.callingStatus)).callingStatus : "Unknown"}   </li>
                                        <li className='col-md-3 H_Time'>{ e.DateWithTime?new Date(e.DateWithTime).getDate()  :e.Date.split("/")[1]}/{e.Date.split("/")[0]}/{e.Date.split("/")[2]}  &nbsp;{e.Time} </li>
                                        <li className=' col-md-2 H_Location'>{e.Location}</li>
                                        <li style={{ background: "#D4CCE3" }} className='col-md-3 px-2 rounded H_commentText'><span style={{}} className=' rounded'> {e.commentAgnistStatus} </span></li>
                                    </ul>
                                }).reverse()}

                            </div>


                        </div>}
                        {leadHistoryShow === 'leadJourney' && <div className='px-5  d-flex gap-1'>

                            <button style={{ border: leadCallJourney !== false && 'none' }} className='border-dark px-2' onClick={() => setLeadCallJourney(false)}>LeadStatus Journey</button>
                            <button style={{ border: leadCallJourney !== true && 'none' }} className='border-dark px-2' onClick={() => setLeadCallJourney(true)}>CallingStatus Journey</button>
                        </div>}


                        {leadHistoryShow === 'leadJourney' && <div style={{ height: "280px" }} className='px-5  mt-4 d-flex align-items-center  ss_userdata1111 gap-3 overflow-auto'>

                            {leadCallJourney === false ? <>

                                {leadJourneyAccordingStatus && leadJourneyAccordingStatus.map((elem, i) => {
                                    const statusColor = status.find(item => item.id === parseInt(elem.changeStatus))

                                    return <div style={{ minHeight: `110px`, minWidth: "120px", backgroundImage: `linear-gradient(${statusColor && statusColor.color})` }} className='position-relative rounded d-flex justify-content-center align-items-center' key={i}>
                                        <div className=' d-flex justify-content-center flex-column' >
                                                
                                           <p  style={{backgroundImage: `linear-gradient(to bottom, ${statusColor.color.split(",")[2].replace("100%","")}, #fff)`}} className='text-center m-0 p-0 bg-body d-inline-block text-capitalize fw-bold p-1 rounded'> {statusColor.status}</p>
                                           <p className='m-0 p-0 fw-bold text-center text-white'> {elem.DateWithTime?new Date(elem.DateWithTime).toLocaleDateString():elem.Date}</p> 

                                           </div>

                                    </div>
                                }).reverse()}
                            </> : <>
                                {leadJourneyAccordingCalingStatus && leadJourneyAccordingCalingStatus.map((elem, i) => {
                                    const statusColor = callingStatus.find(item => item.id === parseInt(elem.callingStatus))

                                    return <div style={{ minHeight: `110px`, minWidth: "120px", backgroundImage: `linear-gradient(${statusColor && statusColor.color})` }} className='position-relative rounded d-flex justify-content-center align-items-center' key={i}>
                                    <div className=' d-flex justify-content-center flex-column px-2' >
                                            
                                       <p  style={{backgroundImage: `linear-gradient(to bottom, ${statusColor.color.split(",")[2].replace("100%","")}, #fff)`}} className='text-center m-0 p-0 bg-body d-inline-block text-capitalize fw-bold p-1 rounded'> {statusColor.callingStatus}</p>
                                       <p className='m-0 p-0 fw-bold text-center text-white'>{elem.DateWithTime?new Date(elem.DateWithTime).toLocaleDateString():elem.Date}</p> </div>

                                </div>
                                }).reverse()}
                            </>}

                        </div>}

                    </div>

                </div>
            </div>
        </div>
    )
}

export default History