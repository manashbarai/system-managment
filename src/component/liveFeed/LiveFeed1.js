


import React, { useEffect, useState } from 'react'
import './Livefeed.css'
// import { DataStorage } from '../../context/useCotext';
// import Loader from '../Loder/Loader';
import axios from 'axios';
import { DataStorage } from '../../context/useCotext';
import Loader from '../Loder/Loader';

const LiveFeed1 = ({ allUser, taemmember }) => {
    const { mySuperTeam, myProfile } = DataStorage()
    const [isLoading, setIsLoading] = useState(false)
    const [liveFeed, setLiveFeed] = useState([])
    const [urls, setUrls] = useState( sessionStorage.getItem('searchUserId')==='1'?` ${process.env.REACT_APP_API}liveFeed/${localStorage.getItem('crm_userRole')==='1'? mySuperTeam._id:localStorage.getItem('crm_id')}?page=1&userId=1&userRole=${localStorage.getItem('crm_userRole')}`:`${process.env.REACT_APP_API}liveFeed/${sessionStorage.getItem('searchUserId')}?page=${sessionStorage.getItem('currentPage')}&userId=2&userRole=${localStorage.getItem('crm_userRole')}&ownerId=${localStorage.getItem('crm_id')}`)

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

   






    const nextPaginating = () => {
        const maxCount = parseInt(sessionStorage.getItem('liveFeedCount'));

        const itemsPerPage = parseInt(sessionStorage.getItem('currentPage')) * 10;
        const noOfPage = Math.ceil(maxCount / itemsPerPage);

        const nextPage = noOfPage === 1 ? 1 : parseInt(sessionStorage.getItem('currentPage')) + 1;

        sessionStorage.setItem('currentPage', nextPage)

        if (myProfile.userRole === '1') {
            
            getLiveFeed(`${process.env.REACT_APP_API}liveFeed/${localStorage.getItem('crm_userRole')==='1'? mySuperTeam._id:localStorage.getItem('crm_id')}?page=${nextPage}&userId=${sessionStorage.getItem('searchUserId')}&userRole=${localStorage.getItem('crm_userRole')}`);
        } else if (myProfile.userRole === '2') {
            getLiveFeed(`${process.env.REACT_APP_API}liveFeed/${localStorage.getItem('crm_userRole')==='1'? mySuperTeam._id:localStorage.getItem('crm_id')}?page=${nextPage}&userId=${sessionStorage.getItem('searchUserId')}&userRole=${localStorage.getItem('crm_userRole')}`);
        }


    };

    const previousPaginating = () => {

        const maxCount = parseInt(sessionStorage.getItem('liveFeedCount'));

        const itemsPerPage = parseInt(sessionStorage.getItem('currentPage')) * 10;
        const noOfPage = Math.ceil(maxCount / itemsPerPage);
        const nextPage = parseInt(sessionStorage.getItem('currentPage')) === 1 ? noOfPage : Math.max(parseInt(sessionStorage.getItem('currentPage')) - 1, 1);
        sessionStorage.setItem('currentPage', nextPage)
        if (myProfile.userRole === '1') {
           
            getLiveFeed(`${process.env.REACT_APP_API}liveFeed/${localStorage.getItem('crm_userRole')==='1'? mySuperTeam._id:localStorage.getItem('crm_id')}?page=${nextPage}&userId=${sessionStorage.getItem('searchUserId')}&userRole=${localStorage.getItem('crm_userRole')}`);
        } else if (myProfile.userRole === '2') {
           
            getLiveFeed(`${process.env.REACT_APP_API}liveFeed/${localStorage.getItem('crm_userRole')==='1'? mySuperTeam._id:localStorage.getItem('crm_id')}?page=${nextPage}&userId=${sessionStorage.getItem('searchUserId')}&userRole=${localStorage.getItem('crm_userRole')}`);
        }

    };

    const getLiveFeed = async (url) => {
        sessionStorage.setItem('liveFeed', url)

        const headers = {
            Authorization: `${localStorage.getItem("crm_token")}`,
            'Content-Type': 'application/json',
        };
        
        try {
            setIsLoading(true)
            let liveFeed = await axios.get(url, { headers })
            if (liveFeed.status === 200) {
                setIsLoading(false)
                const liveFeeds = liveFeed.data.leads
                setLiveFeed(liveFeeds)
                sessionStorage.setItem('liveFeedCount', liveFeed.data.totalCount)
            }



        } catch (error) {

            if (error.response.status === 401) {
              
                localStorage.clear()
                sessionStorage.clear()
                window.location.reload();
                window.location.href = "/login";

            }
        }
    }

    let [count, setCount] = useState(0)

    useEffect(() => {


        const timeoutId = setTimeout(() => {
            setCount(prevCount => prevCount + 1);

        }, 48000);



        getLiveFeed(urls)
        return () => clearTimeout(timeoutId);

    }, [count,urls]);
    
    
    const refreshLiveFeed = () => {
        sessionStorage.setItem('currentPage', 1)


        setUrls(`${process.env.REACT_APP_API}liveFeed/${localStorage.getItem('crm_userRole')==='1'? mySuperTeam._id:localStorage.getItem('crm_id')}?page=1&userId=1&userRole=${localStorage.getItem('crm_userRole')}`)

        
        getLiveFeed(`${process.env.REACT_APP_API}liveFeed/${localStorage.getItem('crm_userRole')==='1'? mySuperTeam._id:localStorage.getItem('crm_id')}?page=1&userId=1&userRole=${localStorage.getItem('crm_userRole')}`)
    }

    const filterLiveLead = (e) => {
        if (e.target.value === '1') {
            sessionStorage.setItem('searchUserId', e.target.value)
            sessionStorage.setItem('searchUserName', 'All Users')
            refreshLiveFeed()
        } else {

            sessionStorage.setItem('currentPage', 1)

            sessionStorage.setItem('searchUserId', e.target.value)
            let userName = allUser.find(user => user._id === e.target.value)
            userName ? sessionStorage.setItem('searchUserName', userName.fullName) : sessionStorage.setItem('searchUserName', 'All Users')
            setUrls(`${process.env.REACT_APP_API}liveFeed/${e.target.value}?page=${sessionStorage.getItem('currentPage')}&userId=2&userRole=${localStorage.getItem('crm_userRole')}&ownerId=${localStorage.getItem('crm_id')}`)
            getLiveFeed(`${process.env.REACT_APP_API}liveFeed/${e.target.value}?page=${sessionStorage.getItem('currentPage')}&userId=2&userRole=${localStorage.getItem('crm_userRole')}&ownerId=${localStorage.getItem('crm_id')}`);

        }


    }




    if (isLoading) {
        return <div>
            <Loader loading={"loading"} />
        </div>
    }
    return (
        <>
            <div  className='s_Page mt-5 paddingLeft'>
                <div style={{ width: "100%" }} className=''>
                    <div style={{ width: "100%" }} className='s_mainContext  '>
                        {/* <div className='container'>
                    <img className='mt-3 px-3' src={require("../images/CRM-Logo.svg").default} />
                    </div> */}
                        <div className="s_report-header  ">
                            <div style={{ height: "70px" }} className='m-auto d-flex justify-content-between align-items-center'>
                                <div className='d-flex gap-2' onClick={() => taemmember && taemmember()}  >

                                    <h1 className='s_Livefeed'>Activity Log</h1>
                                    <select onChange={filterLiveLead} style={{ height: "30px", width: "120px" }} className='mt-2 p-0 ss_adminDropdown'>
                                        <option value={sessionStorage.getItem('searchUserId')} key="1" > {sessionStorage.getItem('searchUserName')} </option>
                                        <option value="1" key="2" >All Users</option>
                                        {allUser && allUser.sort((a, b) => a.fullName.localeCompare(b.fullName)).map((user, index) => {
                                            return <option value={user._id} key={user._id || index}>{user.fullName} </option>
                                        })}
                                    

                                    </select>

                                </div>

                                <div>


                                    <button type='button' onClick={refreshLiveFeed} className='btn  btn-sm'> {isLoading === true ? <img src={require("./loader/icons8-refresh.gif")} alt="" /> : <img style={{ width: "30px" }} src="../../images/refresh.png" alt="" />} </button>
                                    {localStorage.getItem('crm_userRole') === '1' && <button type='button' onClick={async () => {
                                        const headers = {
                                            Authorization: `${localStorage.getItem("crm_token")}`,
                                            'Content-Type': 'application/json',
                                        };
                                        try {
                                            const deleteAllData = await axios.delete(`${process.env.REACT_APP_API}deleteAllLiveFeed`, { headers })
                                            if (deleteAllData.status === 200) {
                                                alert("delete successfully")
                                                getLiveFeed(sessionStorage.getItem('liveFeed'))
                                            }
                                        } catch (error) {

                                        }
                                    }} className='btn  btn-sm'>  <img style={{ width: "30px" }} src="../../images/trash.svg" alt="" />  </button>}
                                </div>
                            </div>
                        </div>







                        <div className=''>
                            <div className="s_report-body">
                                <div className='s_Heading22'>
                                    <div className='mb-3 s_LiveData border rounded'>
                                        <div className='col-md-3 slive_Name'>Date/Time</div >
                                        <div className='col-md-6 slive_Name'>Description</div>
                                        <div className='col-md-3  slive_Name'>Activity</div>
                                    </div>


                                    <div style={{ height: 'auto' }}>


                                        {liveFeed.length !== 0 ? liveFeed.sort((a, b) => a.updatedAt - b.updatedAt).map((e, i) => {
                                            return <div className='mb-4 slive_Data border-bottom' key={e._id}>
                                                <div className='col-md-3 text-center slive_Data1'>{convertToIST(e.updatedAt)}</div>
                                                <div className='col-md-6  text-center slive_Data2'><p>{e.activityDescription} </p>  </div>
                                                <div className='col-md-3 text-center slive_Data3'>{e.activity} </div>
                                            </div>
                                        }) : <div>
                                            <h3 className='text-center'>No Activity Found</h3>
                                        </div>}


                                    </div>
                                    {liveFeed.length !== 0 &&
                                        <div className="d-flex justify-content-end">
                                            <nav aria-label="Page navigation example">
                                                <ul className="pagination">
                                                    <li className="page-item"><button style={{ color: "rgb(95, 73, 138)" }} onClick={previousPaginating} className="page-link fw-bold" href="#">Previous</button></li>
                                                    <li className="page-item"><button style={{ color: "rgb(95, 73, 138)" }} className="page-link fw-bold" href="#"> {JSON.parse(sessionStorage.getItem('currentPage'))} </button></li>
                                                    <li className="page-item"><button style={{ color: "rgb(95, 73, 138)" }} onClick={nextPaginating} className="page-link fw-bold" href="#">Next</button></li>
                                                </ul>
                                            </nav>
                                        </div>
                                    }

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default LiveFeed1