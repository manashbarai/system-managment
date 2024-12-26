import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { DataStorage } from '../../../context/useCotext';

import './CompanyRegistration.css'
import CompanyRegistrations from './CompanyRegistrations';

const CompanyLead = (props) => {
    const { status, statusWithCounts } = DataStorage()
    const headers = useMemo(() => ({
        Authorization: `${localStorage.getItem("crm_token")}`,
        'Content-Type': 'application/json',
    }), []);
   

    const dealFinalizeds = async (id) => {
     
        try {

            const res = await axios.put(`${process.env.REACT_APP_API}crm/changeStatus/${id}`, { data: 8 });
            console.log(res.data);
            if (res.status === 200) {
                statusWithCounts(`${process.env.REACT_APP_API}crm/statusWithCount`);
                const index = demoCompany.findIndex(company => company._id === id);
                if (demoCompany[index].status !== 8) {
                    demoCompany.splice(index, 1);
                }
            }


        } catch (error) {

        }




    };
    const [clintOnboard, setClintOnboard] = useState(false)

    const offclintOnboard = () => {

        setClintOnboard(false)
    }



    const [hasMore, setHasMore] = useState(true);
    const [demoCompany, setDemoCompany] = useState([]);
    const [page, setPage] = useState(1);
    const [commentBox, setCommentBox] = useState("")
    const [commentBoxmMessage, setCommentBoxMessage] = useState("")
    const [registration, setRegistration] = useState({})
    const fetchData = async (url) => {

        try {
            const res = await axios.get(url, { headers });
            const newData = res.data.leadDemo;
            if (newData.length === 0) {
                setHasMore(false); // No more data to load
                return;
            }
            setDemoCompany(prevData => [...prevData, ...newData]);
            setPage(prevPage => prevPage + 1); // Increment page for next fetch
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        setPage(1); // Reset page to 1 when props.statusId changes
        setDemoCompany([]); // Reset demoCompany to an empty array
    }, [props.statusId]);

    useEffect(() => {
        fetchData(`${process.env.REACT_APP_API}/crm/demo/${props.statusId}?page=${page}`);
    }, [props.statusId, page]); // Fetch data when props.statusId or page changes

    return (
        <div className='SUM_upperSection  '>
            {clintOnboard && <div className='d-flex position-absolute top-0 w-100 py-5 h-100   justify-content-center  backgroundRgba start-0 z-1'>
                <CompanyRegistrations offclintOnboard={offclintOnboard} data={registration} dealFinalizeds={dealFinalizeds} modification={'new'} />
            </div>}


            <div className=' border p-2 rounded'>

                <InfiniteScroll
                    className='portPoliyoDocument'
                    dataLength={demoCompany.length}
                    next={fetchData}
                    hasMore={hasMore}
                    loader={<h4>Loading...</h4>}
                    endMessage={<p className='text-center'>No more items to load</p>}
                >
                    <ul style={{ width: "100%" }} className='d-flex align-items-center  list-unstyled text-secondary px-2 rounded' >
                        <li className='companyLeadWidth bg-body-secondary p-1 h-auto '>Name</li>
                        <li className='companyLeadWidth bg-body-secondary p-1 h-auto  '>Email</li>
                        <li className='companyLeadWidth bg-body-secondary p-1 h-auto '>Number</li>

                        <li className='companyLeadWidth bg-body-secondary p-1 h-auto '>Company Name</li>
                        <li className='companyLeadWidth bg-body-secondary p-1 h-auto '>Requirement</li>
                        <li className='companyLeadWidth bg-body-secondary p-1 h-auto '>Status</li>
                        <li className='companyLeadWidth bg-body-secondary p-1 h-auto '>Comment</li>
                    </ul>
                    {demoCompany.map((e, i) => (
                        <ul style={{ fontSize: "14px" }} className=' d-flex align-items-center list-unstyled   px-2  ' key={e._id}>
                            <li className='companyLeadWidth bg-body p-1  h-auto portPoliyoDocument'>{e.name}</li>
                            <li className='companyLeadWidth bg-body p-1  h-auto  portPoliyoDocument '>{e.email}</li>
                            <li className='companyLeadWidth bg-body p-1  h-auto portPoliyoDocument'>{e.phNumber.countryCode}{e.phNumber.number}</li>
                            <li className='companyLeadWidth bg-body p-1  h-auto portPoliyoDocument'>{e.companyName}</li>
                            <li className='companyLeadWidth bg-body p-1  h-auto portPoliyoDocument'>{e.requirements}</li>
                            <li className='companyLeadWidth bg-body p-1  h-auto portPoliyoDocument'>
                               {status[status.length-1].id===8 && <select className='rounded border' onChange={async (value) => {

                                    try {
                                        if (value.target.value === '8') {
                                            setClintOnboard(true)
                                            setRegistration(e)




                                        } else {
                                            const res = await axios.put(`${process.env.REACT_APP_API}crm/changeStatus/${e._id}`, { data: parseInt(value.target.value) });
                                            if (res.status === 200) {
                                                statusWithCounts(`${process.env.REACT_APP_API}crm/statusWithCount`);
                                                const index = demoCompany.findIndex(company => company._id === e._id);
                                                if (demoCompany[index].status !== parseInt(value.target.value)) {
                                                    demoCompany.splice(index, 1); // Remove the company from the demoCompany array
                                                }
                                            }
                                        }

                                    } catch (error) {
                                        // Handle error if needed
                                    }

                                }}>
                                    <option value={e.id} key={e._id + i} >{e.status && status && status.find(companyStatus => companyStatus.id === e.status).status} </option>
                                    {status && status.map((e, i) => {
                                        return <option value={e.id} key={e._id + i}  >{e.status} </option>
                                    })}
                                </select>}
                            </li>
                            <li className='companyLeadWidth p-1   position-relative  p-1 bg-body  '>

                                {<span style={{ display: commentBox === e._id ? 'none' : 'block' }}>  {e.comment && e.comment.length === 0 ? "No Comment" : e.comment[e.comment.length - 1].commentMessage}</span>}




                                <button style={{ display: commentBox === e._id ? 'none' : 'block' }} className='position-absolute end-0 top-0 border-0 px-1 bg-secondary text-white rounded' onClick={() => setCommentBox(e._id)}>
                                    i
                                </button>
                                {commentBox === e._id && <div className='d-flex justify-content-center flex-column gap-1 position-relative'> <textarea className='form-control h-auto' type="text" onChange={(e) => setCommentBoxMessage(e.target.value)} />
                                    <button style={{ fontSize: "13px", background: "rgb(95, 73, 138)" }} className='border-0 rounded text-white ' onClick={async () => {
                                        const data = {
                                            commentMessage: commentBoxmMessage,
                                            time: Date.now()
                                        }
                                        try {
                                            const res = await axios.put(`${process.env.REACT_APP_API}crm/comment/${e._id}`, data, { headers });
                                            if (res.status === 200) {
                                                const index = demoCompany.findIndex(company => company._id === e._id);
                                                setCommentBox("")
                                                demoCompany.splice(index, 1, res.data)

                                            }


                                        } catch (error) {
                                            console.error("Error fetching data:", error);
                                        }

                                    }} >Submit</button>
                                    <button className='position-absolute top-0 end-0 border-0 text-white rounded-pill px-1 ' style={{ fontSize: "13px", background: "rgb(95, 73, 138)" }} onClick={() => setCommentBox("")} >x </button>
                                </div>
                                }
                            </li>
                        </ul>
                    ))}
                </InfiniteScroll>
            </div>
        </div>
    );
};

export default CompanyLead;
