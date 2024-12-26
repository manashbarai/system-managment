import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { DataStorage } from '../../context/useCotext'
import InfiniteScroll from 'react-infinite-scroll-component'

const CallDuration = (props) => {
    const { todayDate } = DataStorage()

    const [callingDuration, setCallingDuration] = useState([])
    const [totalCallDurationTime, setTotalCallDurationTime] = useState(0)
    const [count, setCount] = useState(0)
    const [page, setPage] = useState(1)
    const [date, setDate] = useState(todayDate)
    const [searchingDate, setSearchingDate] = useState(`${todayDate.split("-")[2]}/${todayDate.split("-")[1]}/${todayDate.split("-")[0]}`)
    const [url, setUrl] = useState(props.userId ? `${process.env.REACT_APP_API}callingDuration/${props.userId}?page=${page}&date=${searchingDate}` : `${process.env.REACT_APP_API}callingDurations/${localStorage.getItem('superTeam')}?page=${page}&date=${searchingDate}`)

    const getCallDuration = async (url) => {
      
        const headers = {
            Authorization: `${localStorage.getItem("crm_token")}`,
            'Content-Type': 'application/json',
        };
        try {
            const res = await axios.get(url, { headers })

            setCallingDuration( callingDuration.concat(res.data.callingDuration))
            setCount(res.data.callDurationCount)
            setTotalCallDurationTime(res.data.totalTime)
        } catch (error) {
            if (error.status === 401) {
                localStorage.clear()
                sessionStorage.clear()
                window.location.reload();
                window.location.href = "/login";
            }
        }
    }

    useEffect(() => {
       
        const newUrl = props.userId
            ? `${process.env.REACT_APP_API}callingDuration/${props.userId}?page=${page}&date=${searchingDate}`
            : `${process.env.REACT_APP_API}callingDurations/${localStorage.getItem('superTeam')}?page=${page}&date=${searchingDate}`;

        setUrl(newUrl);
    }, [props.userId, page, searchingDate]);

    useEffect(() => {

        getCallDuration(url)
    }, [url])
    useEffect(() => {
        setCallingDuration([])
        setPage(1)
       
    }, [props.userId])
    const dateAccordingCallingDuration = (e) => {
        setCallingDuration([])
        setPage(1)
        const date = e.target.value;
        const newDate = `${date.split("-")[2]}/${date.split("-")[1]}/${date.split("-")[0]}`
        setDate(e.target.value)
        setSearchingDate(newDate)
        if (props.userId) setUrl(`${process.env.REACT_APP_API}callingDuration/${props.userId}?page=${page}&date=${newDate}`)
        else setUrl(`${process.env.REACT_APP_API}callingDurations/${localStorage.getItem('superTeam')}?page=${page}&date=${newDate}`)

    }


    const nextPaginating = () => {
        
        let pageCount = page;
        const maxCount = count;

        const noOfPage = Math.ceil(maxCount / 10);

        if (page === noOfPage) {

            setPage(1);
            pageCount = 1;
        } else {
            setPage((prevPage) => prevPage + 1);
            pageCount++;
        }

        if (props.userId) setUrl(`${process.env.REACT_APP_API}callingDuration/${props.userId}?page=${pageCount}&date=${searchingDate}`);
        else setUrl(`${process.env.REACT_APP_API}callingDurations/${localStorage.getItem('superTeam')}?page=${pageCount}&date=${searchingDate}`);

    };

    // const previousPaginating = () => {
    //     const maxCount = count;

    //     const noOfPage = Math.ceil(maxCount / 10);
    //     let pageCount = page;
    //     if (page === 1) {
    //         setPage(noOfPage);
    //         pageCount = noOfPage;
    //     } else {
    //         setPage((prevPage) => prevPage - 1);
    //         pageCount--;
    //     }

    //     if (props.userId) setUrl(`${process.env.REACT_APP_API}callingDuration/${props.userId}?page=${pageCount}&date=${searchingDate}`);
    //     else setUrl(`${process.env.REACT_APP_API}callingDurations?page=${pageCount}&date=${searchingDate}`);

    // };



   







    return (
        <>
            <div style={{ paddingLeft: "30px" }} className=' mt-5 '>
                <div style={{ width: "100%" }} className=''>
                    <div className='s_mainContext'>

                        {/* <div className='container'>
                    <img className='mt-3 px-3' src={require("../images/CRM-Logo.svg").default} />
                    </div> */}
                        <div className="s_report-header  ">
                            <h2 className='border-bottom d-inline-block '>{props.userName} </h2>
                            <br />


                            <div style={{ height: "70px" }} className='m-auto d-flex justify-content-between align-items-center'>
                                <input style={{ color: "#5F498A" }} type="date" className='px-2 display-block' value={date} onChange={dateAccordingCallingDuration} />
                                <h4 style={{ color: "rgba(72, 70, 70, 0.75)" }} className='fw-bold'>No of calls : <span style={{ color: "#5F498A" }}>{count}</span>  </h4>
                                <h4 style={{ color: "rgba(72, 70, 70, 0.75)" }} className='fw-bold'>Total Duration : <span style={{ color: "#5F498A" }}>{
                                    `${Math.floor(totalCallDurationTime / 3600)}h: ${Math.floor((totalCallDurationTime % 3600) / 60)}m : ${totalCallDurationTime % 60}s`
                                }
                                </span>  </h4>

                            </div>
                        </div>







                        <div className=''>
                            <div className="s_report-body">
                                <div className='s_Heading22'>
                                    <div className='mb-3 s_LiveData border rounded'>
                                        <div className='col-md-3 slive_Name'>Date</div >
                                        <div className='col-md-3 slive_Name'>Number</div>
                                        <div className='col-md-3 slive_Name'>Time</div>
                                        <div className='col-md-3  slive_Name'>Call Duration</div>
                                    </div>


                                    <div style={{ height: 'auto' }}>

                                        <InfiniteScroll
                                            dataLength={callingDuration.length}
                                            next={nextPaginating} 
                                            hasMore={callingDuration.length < count} 
                                            loader={<h4 className="loading">Loading...</h4>}
                                            endMessage={
                                                <p style={{ textAlign: 'center' }}>
                                                    <b>Yay! You have seen it all</b>
                                                </p>
                                            }
                                        >
                                            {callingDuration && callingDuration.map((e, i) => {


                                                // const callingStatusName = callingStatus.find(calling => calling.id === e.callingStatus);

                                                return (
                                                    <div className='mb-4 slive_Data border-bottom' key={e._id}>
                                                        
                                                        <div className='col-md-3 text-center slive_Data1'>{new Date(e.Date_Time).toLocaleDateString()}</div>
                                                        <div className='col-md-3 text-center slive_Data2'>
                                                            {e.ph_number}


                                                        </div>
                                                        <div className='col-md-3 text-center slive_Data2'>
                                                            {new Date(e.Date_Time).toLocaleTimeString()}
                                                        </div>
                                                        <div className='col-md-3 text-center slive_Data3'>
                                                            {
                                                                `${Math.floor(e.callingDuration / 3600)}h: ${Math.floor((e.callingDuration % 3600) / 60)}m : ${e.callingDuration % 60}s`
                                                            }



                                                        </div>
                                                    </div>
                                                );
                                            }) }
                                        </InfiniteScroll>


                                    </div>
                                    {/* {callingDuration.length !== 0 &&
                                        <div className="d-flex justify-content-end">
                                            <nav aria-label="Page navigation example">
                                                <ul className="pagination">
                                                    <li className="page-item"><button style={{ color: "rgb(95, 73, 138)" }} onClick={previousPaginating} className="page-link fw-bold" href="#">Previous</button></li>
                                                    <li className="page-item"><button style={{ color: "rgb(95, 73, 138)" }} className="page-link fw-bold" href="#"> {page} </button></li>






                                                    <li className="page-item"><button style={{ color: "rgb(95, 73, 138)" }} onClick={nextPaginating} className="page-link fw-bold" href="#">Next</button></li>
                                                </ul>
                                            </nav>
                                        </div>
                                    } */}

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default CallDuration
