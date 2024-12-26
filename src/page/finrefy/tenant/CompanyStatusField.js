
import React, { useEffect, useState } from 'react';
import { DataStorage } from '../../../context/useCotext';
import CompanyLead from './CompanyLead';



const CompanyStatusField = (props) => {
    const { getLeadAccordingStatus, statusWithCount, classificationAccordingtoStatus } = DataStorage();

    // console.log("statusWithCount",statusWithCount);
    const [companyStatus, setCompanyStatus] = useState([])
    const [statusId, setStatusId] = useState(1)
    useEffect(() => {

        setCompanyStatus(statusWithCount)
    }, [statusWithCount])
    return (
        <div className='d-flex flex-column align-items-end'>
            <div className='col-md-11 float-end d-flex gap-1 mt-5  justify-content-between p-3 bg-body rounded statusFieldList ' >
                {companyStatus &&
                    companyStatus.map((e, i) => (

                        <div
                            key={e._id || i}
                            style={{
                                background: `linear-gradient(${e.color})`,
                                opacity: statusId === e.id ? '1' : '0.2',
                                borderRadius: '15px',
                            }}
                            className=' companyStatusField  '
                            onClick={() => {
                                setStatusId(e.id)
                                
                            }}
                        >


                            <div className='dl-flex justify-content-center '>
                                <div style={{ backgroundImage: `linear-gradient(to bottom, ${e.color.split(",")[2].replace("100%", "")}, #fff)` }} className='companyStatusUnderCount '>{e.count && e.count}</div>
                                <h5 className='ss_stautusLeads'>{e.status}</h5>
                            </div>
                        </div>



                    ))}



            </div>
            <div className='col-md-11 mt-4'>
                <CompanyLead statusId={statusId} />
            </div>

        </div>

    );
};

export default CompanyStatusField;
