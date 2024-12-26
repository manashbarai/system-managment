
import React, { useEffect, useState, useCallback, useMemo } from 'react'
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import './Report.css'
import GrapicalReports from './GrapicalReports';
import { DataStorage } from '../../context/useCotext';
import State from '../../State';
import Loader from '../Loder/Loader';
const Report = ({ allUser, taemmember }) => {

    const { isLoading, mySuperTeam } = DataStorage()

    const [companyStatus, setCompanyStatus] = useState([])
    const [companyCallingStatus, setCompanyCallingStatus] = useState([])


    const getStartOfDay = (date) => {
        const startOfDay = new Date(date);
        startOfDay.setHours(0, 0, 0, 0); // Set time to 00:00:00.000
        return startOfDay;
    };

    const getEndOfDay = (date) => {
        const endOfDay = new Date(date);
        endOfDay.setHours(23, 59, 59, 999); // Set time to 23:59:59.999
        return endOfDay;
    };

   
    const [callingObject, setCallingObject] = useState({})
    const [statusObject, setStatusObject] = useState({})
   
    const [userId, setUserId] = useState('1')
   
    const [startDate, setStartDate] = useState(getStartOfDay(new Date()));
    const [state, setState] = useState("allState");
    const [endDate, setEndDate] = useState(getEndOfDay(new Date()));
    const customDateFormat = 'dd/MM/yyyy';






    function convertToIST(timeString) {
        const localDate = new Date(timeString);

        const options = {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        };

        return localDate.toLocaleString('en-IN', options);
    }


    const [leadStatusArr, setLeadStatusArr] = useState([])


    const [callingStatusArr, setCallingStatusArr] = useState([])
    const [page, setPage] = useState(1)


    const headers = useMemo(() => ({
        Authorization: `${localStorage.getItem("crm_token")}`,
        'Content-Type': 'application/json',
    }), [])
    



   
    const [allDataLoading, setAllDataLoading] = useState(false)
    const [allLogData, setAllLogData] = useState([])



    const getAllLiveFeedLog = useCallback(async (url) => {



        setAllDataLoading(true)
        try {
            const res = await axios.get(url, { headers })
            if (res.status === 200) setAllDataLoading(false)

            const liveFeeds = res.data.leads
            setAllLogData(liveFeeds)
            setCallingObject(res.data.countingCallingObject)
            setStatusObject(res.data.statusObject)






            const leadArr = companyStatus.map(item => ({

                status: item.status.charAt(0).toUpperCase() + item.status.slice(1),
                color: item.color.split(",")[2].split(" ")[0],
                leadCount: Object.entries(res.data.statusObject).find(([key, value]) => key.includes(item.status))?.[1] || 0

            }));


            const callingArr = companyCallingStatus.map(item => ({
                status: item.callingStatus.charAt(0).toUpperCase() + item.callingStatus.slice(1),
                color: item.color.split(",")[2].split(" ")[0],
                leadCount: Object.entries(res.data.countingCallingObject).find(([key, value]) => key.includes(item.callingStatus))?.[1] || 0
            }));


            setLeadStatusArr(leadArr)
            setCallingStatusArr(callingArr)












        } catch (error) {
            console.log(error);
        }
    }, [headers,companyCallingStatus,companyStatus])


    useEffect(()=>{
       setCompanyStatus( mySuperTeam && mySuperTeam.companyStatus)
       setCompanyCallingStatus(mySuperTeam && mySuperTeam.companyCallingStatus)
    },[mySuperTeam])



    useEffect(() => {



        getAllLiveFeedLog(`${process.env.REACT_APP_API}liveFeed_byDate?page=${page}&userId=${userId}&userRole=${localStorage.getItem('crm_userRole')}&ownerId=${localStorage.getItem('crm_id')}&startDate=${startDate}&endDate=${endDate}&allData=true&state=${state}`)



    }, [endDate, getAllLiveFeedLog, page, startDate, userId, state]);


    const filterLiveLead = (e) => {
        setPage(1)

        setUserId(e.target.value)
        let userName = allUser.find(user => user._id === e.target.value)
        userName ? sessionStorage.setItem('searchUserName', userName.fullName) : sessionStorage.setItem('searchUserName', 'All Users')

    }



    

    const generatePDF = (userList = allLogData, startDate, endDate, userName, callingObject, statusObject) => {
        // Create a new jsPDF instance
        const pdfDoc = new jsPDF();

        // Add a title to the PDF with the user's name and date range
        const title = `USER LIST REPORT FOR: ${userName} /${state} `;
        const dateRange = `Date: ${startDate} to ${endDate}`;

        // Calculate the center position for the title and date range
        const centerX = pdfDoc.internal.pageSize.width / 2;
        const titleY = 15; // Set a fixed Y position for the title, adjust as needed

        // Calculate the width of the title and date range
        const titleWidth = pdfDoc.getStringUnitWidth(title) * pdfDoc.internal.getFontSize() / pdfDoc.internal.scaleFactor;
        const dateRangeWidth = pdfDoc.getStringUnitWidth(dateRange) * pdfDoc.internal.getFontSize() / pdfDoc.internal.scaleFactor;

        // Calculate the positions
        const titleX = centerX - (titleWidth / 2);
        const dateRangeX = centerX - (dateRangeWidth / 2);

        pdfDoc.text(title, titleX, titleY);
        pdfDoc.text(dateRange, dateRangeX, titleY + pdfDoc.internal.getLineHeight() / pdfDoc.internal.scaleFactor);

        // Add callingObject key and value
        const callingStatusX = 14;
        let callingObjectY = titleY + pdfDoc.internal.getLineHeight() / pdfDoc.internal.scaleFactor + 10; // Set Y position for the callingObject key
        const callingStatusY = titleY + pdfDoc.internal.getLineHeight() / pdfDoc.internal.scaleFactor + 10;
        pdfDoc.text("Calling Status :", callingStatusX, callingStatusY);
        // Display callingObject key and value with flexbox-like format
        const callingObjectText = Object.entries(callingObject)
            .map(([key, value]) => `${key}: ${value}`)
            .join(', ');

        // Calculate the height of the callingObject text block
        const callingObjectTextHeight = pdfDoc.splitTextToSize(callingObjectText, pdfDoc.internal.pageSize.width - 20).length * 5 + 5;

        // Display callingObject text with commas
        pdfDoc.text(callingObjectText, callingStatusX + 40, callingObjectY);
        callingObjectY += callingObjectTextHeight;

        // Increase Y position for spacing
        callingObjectY += 0;

        // Add Status key and value
        pdfDoc.text("Status :", callingStatusX, callingObjectY);
        const statusObjectText = Object.entries(statusObject)
            .map(([key, value]) => `${key}: ${value}`)
            .join(', ');

        const statusObjectTextHeight = pdfDoc.splitTextToSize(statusObjectText, pdfDoc.internal.pageSize.width - 20).length * 5 + 5;

        pdfDoc.text(statusObjectText, callingStatusX + 20, callingObjectY);
        callingObjectY += statusObjectTextHeight;

        // Increase Y position for spacing
        callingObjectY += 0;

        const headerBackgroundColor = [95, 73, 138];
        const headers = [['Date/Time', 'Description', 'Activity']];

        // Extract data from the user list
        const data = userList.map((user) => [
            convertToIST(user.updatedAt),
            user.activityDescription,
            user.activity,
        ]);



        const tableStartY = callingObjectY + 0; // Adjust the starting Y position for the table
        pdfDoc.autoTable({
            head: headers,
            body: data,
            startY: tableStartY,
            headStyles: {
                fillColor: headerBackgroundColor,
                textColor: [255, 255, 255], // Text color on the headers
            },
        });

        // Add an image to the bottom-right corner with width 25px and height 5px
        const logoImageBottom = '../images/Logo.png'; // Replace with the path to your image
        const imageWidthBottom = 25;
        const imageHeightBottom = 5;
        const bottomRightX = pdfDoc.internal.pageSize.width - imageWidthBottom - 10;
        const bottomRightY = pdfDoc.internal.pageSize.height - imageHeightBottom - 10;
        pdfDoc.addImage(logoImageBottom, 'JPEG', bottomRightX, bottomRightY, imageWidthBottom, imageHeightBottom, '', 'FAST');

        // Save the PDF
        pdfDoc.save(`user_list_report_${userName}.pdf`);
    };







  


    const [statusButton, setStatusButton] = useState('callingStatus')

    if (isLoading) {
        return (
          <div>
            <Loader loading={"Loading"} />
    
          </div>
        );
      }

    return (
        <>
            <div style={{ paddingLeft: "30px", width: "100%", }} className='s_Page  mt-5'>

                <div style={{ width: "100%" }} className=''>
                    <div className=''>
                        <div className='d-flex gap-3'>
                            <button style={{ color: statusButton === 'callingStatus' ? 'rgba(95, 73, 138, 1)' : 'rgba(168, 168, 168, 1)', border: statusButton === 'callingStatus' ? '1px solid rgba(95, 73, 138, 1)' : '1px solid rgba(168, 168, 168, 1)' }} className='statusButton' onClick={() => {
                                setStatusButton('callingStatus')
                            }}>Calling Status</button>
                            <button style={{ color: statusButton === 'status' ? 'rgba(95, 73, 138, 1)' : 'rgba(168, 168, 168, 1)', border: statusButton === 'status' ? '1px solid rgba(95, 73, 138, 1)' : '1px solid rgba(168, 168, 168, 1)' }} className='statusButton' onClick={() => {
                                setStatusButton('status')
                            }}   >Lead Status</button>

                        </div>


                        {statusButton === 'status' && (
                            <div className='d-flex gap-2 mt-3'>

                                {leadStatusArr && leadStatusArr.map((item) => {

                                    const mySuperTeamColor = mySuperTeam && mySuperTeam.companyStatus.find(statusItem => statusItem.status.toLowerCase() === item.status.toLowerCase())

                                    return <div key={item.id} style={{ background: `linear-gradient(${mySuperTeamColor.color})` }} className={`d-flex justify-content-center gap-4 flex-grow-1 statusButton ${item.status.toLowerCase()}Status`}>
                                        {item.status.charAt(0).toUpperCase() + item.status.slice(1)} <span className='numberBox'>(

                                            {item.leadCount || 0}

                                            )</span>
                                    </div>
                                })}

                            </div>
                        )}

                        {statusButton === 'callingStatus' && (

                            <div className='d-flex gap-2 mt-3'>

                                {callingStatusArr && callingStatusArr.map((item, index) => {
                                    const mySuperTeamColor = mySuperTeam && mySuperTeam.companyCallingStatus.find(statusItem => statusItem.callingStatus.toLowerCase() === item.status.toLowerCase())

                                    return <div key={item.id} style={{ background: `linear-gradient(${mySuperTeamColor.color})` }} className={`d-flex justify-content-center gap-4 flex-grow-1 statusButton ${item.status.toLowerCase()}Status`}>
                                        {item.status.charAt(0).toUpperCase() + item.status.slice(1)} <span className='numberBox'>(

                                            {item.leadCount || 0}

                                            )</span>
                                    </div>
                                })}

                            </div>





                        )}



                    </div>

                    <div style={{ width: "100%" }} className='s_mainContext  mt-3'>

                        <div className="s_report-header  d-flex align-items-center">
                            <div style={{ height: "70px" }} className='m-auto d-flex justify-content-between align-items-center w-100' >
                                <div className='d-flex gap-2 w-100  w-100 justify-content-between ' onClick={() => taemmember && taemmember()}  >
                                    {mySuperTeam.showingField.find(e => e.includes("state")) && <div className='d-flex gap-2 align-items-center'>
                                        <div>


                                            <label style={{ color: "rgb(95, 73, 138)" }}>Select State:</label><br />

                                            <select style={{ color: " #7c7c7c" }} className="form-control" onChange={(e) => setState(e.target.value.toLowerCase().trim())} >

                                                <option selected>{state}</option>

                                                {State.map((state, index) => {
                                                    return <option key={index} value={state}>{state}</option>
                                                })}
                                            </select>
                                        </div>
                                    </div>}




                                    <div className='d-flex  gap-2 align-items-center '>

                                        <div>


                                            <label style={{ color: "rgb(95, 73, 138)" }}>Select User :</label>        <br />                                <select onChange={filterLiveLead} className='border rounded col-md-12 px-3 text-secondary'>
                                                <option style={{ color: "rgb(95, 73, 138)" }} value="1" key="1" > {sessionStorage.getItem('searchUserName')} </option>
                                                <option style={{ color: "rgb(95, 73, 138)" }} value="1" key="2" >All Users</option>
                                                {allUser && allUser.sort((a, b) => a.fullName.localeCompare(b.fullName)).map((user, index) => {
                                                    return <option style={{ color: "rgb(95, 73, 138)" }} value={user._id} key={user._id || index}>{user.fullName} </option>
                                                })}

                                            </select>
                                        </div>
                                        <div className=''>
                                            <label style={{ color: "rgb(95, 73, 138)" }}>Start Date: </label> <br />

                                            <DatePicker
                                                className='border rounded col-md-12 px-3 text-secondary '
                                                selected={startDate}
                                                onChange={(date) => {

                                                    setPage(1)
                                                    setStartDate(getStartOfDay(date));
                                                }}
                                                dateFormat={customDateFormat}
                                                showYearDropdown
                                                showMonthDropdown
                                            />
                                        </div>

                                        <div className=' fs-6'>
                                            <label style={{ color: "rgb(95, 73, 138)" }}>End Date: </label>
                                            <br />
                                            <DatePicker
                                                className='border rounded col-md-12 text-secondary px-3'

                                                selected={endDate}
                                                onChange={(date) => {
                                                    setPage(1)
                                                    setEndDate(getEndOfDay(date));
                                                }}
                                                dateFormat={customDateFormat}
                                                showYearDropdown
                                                showMonthDropdown
                                            />
                                        </div>

                                    </div>
                                    <div className='d-flex gap-2  '>

                                        <button className='border-0  rounded text-white px-2' style={{ background: "rgba(95, 73, 138, 1)" }} onClick={() => generatePDF(allLogData, new Date(startDate).toLocaleDateString().split("/")[1] + "/" + new Date(startDate).toLocaleDateString().split("/")[0] + "/" + new Date(startDate).toLocaleDateString().split("/")[2], new Date(endDate).toLocaleDateString().split("/")[1] + "/" + new Date(endDate).toLocaleDateString().split("/")[0] + "/" + new Date(endDate).toLocaleDateString().split("/")[2], sessionStorage.getItem("searchUserName"), callingObject, statusObject)}
                                            disabled={allDataLoading !== false} type='button' >

                                            {allDataLoading !== false ? <>Loading ...</> : <>
                                                Download  <span> <img style={{ width: "15px", marginBottom: "5px", marginLeft: "5px", cursor: "pointer" }} src={require("./reportIcon/Vector (1).png")} alt="reports" />  </span>
                                            </>}



                                        </button>

                                    </div>
                                </div>

                                <div>




                                </div>
                            </div>








                        </div>













                    </div>
                    <div className='my-3'>
                        <GrapicalReports statusButton={statusButton} status={statusButton === 'callingStatus' ? callingStatusArr : leadStatusArr} />

                    </div>


                </div>
            </div>

        </>
    )
}

export default Report







