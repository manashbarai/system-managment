import React from 'react';
import { DataStorage } from '../context/useCotext';


const StatusField = (props) => {
  const { getLeadAccordingStatus,mySuperTeam} = DataStorage();

  

  return (
    <div className='col-md-12 d-flex gap-3  flex-1'>
      {props.statusWithCount &&
        props.statusWithCount.sort((a, b) => parseInt(a.sort) - parseInt(b.sort)).map((e, i) => (
          
          <div
            key={e._id || i}
            style={{
              background: `linear-gradient(${e.color})`,
              opacity: parseInt(sessionStorage.getItem('setLeadStatus')) === e.id ? '1' : '0.2',
              borderRadius: '15px',
            }}
            className=' ss_StatusBox23 flex-1 '
            onClick={() => {
              if (props.adminLeads === "searchLead") {

                localStorage.setItem('currentPage', 1);
                sessionStorage.setItem('setLeadStatus', e.id);
                sessionStorage.setItem('leadListCount', e.count);
                sessionStorage.setItem('selectState', 'allstate');
                sessionStorage.setItem('leadSearchText', '');

                if (props.searchLead.split("").length < 1) {
                  
                  getLeadAccordingStatus(
                    `${process.env.REACT_APP_API}allLeads?limit=${sessionStorage.getItem('leadsLimit') ? sessionStorage.getItem('leadsLimit') : 10}&superTeamId=${mySuperTeam._id}&status=${e.id}&page=${parseInt(
                      localStorage.getItem('currentPage')
                    )}`
                  );
                } else {

                  getLeadAccordingStatus(
                    `${process.env.REACT_APP_API}allLeads?limit=${sessionStorage.getItem('leadsLimit') ? sessionStorage.getItem('leadsLimit') : 10}&status=${e.id}&name=${props.searchLead}&page=${parseInt(
                      localStorage.getItem('currentPage')
                    )}`
                  );
                }


                // scrollToTop(); // Trigger the scrollToTop function

              } else {


                if (props.adminLeads !== 'followUpStatus') {
                  localStorage.setItem('currentPage', 1);
                  sessionStorage.setItem('setLeadStatus', e.id);
                  sessionStorage.setItem('leadListCount', e.count);
                  sessionStorage.setItem('selectState', 'allstate');
                  sessionStorage.setItem('leadSearchText', '');

                  const fetchData = async () => {
                    await getLeadAccordingStatus(
                      `${process.env.REACT_APP_API}classify/leads/${props.userIdForStatus}?userRole=${props.userRoleForStatus}&status=${e.id}&page=${parseInt(
                        localStorage.getItem('currentPage')
                      )}&limit=${sessionStorage.getItem('leadsLimit') ? sessionStorage.getItem('leadsLimit') : 10}&myLead=${props.option === 'myLeads' ? 'true' : 'false'
                      }&todaysFollowUp===${props.option === 'todaysFollowUp' ? 'true' : 'false'}&aboutStatus=${props.adminLeads === 'callAccordingLead' ? 'callingStatus' : 'status'
                      }&states=allstate`
                    );

                    // scrollToTop(); // Trigger the scrollToTop function
                  };

                  fetchData();
                }
              }
            }}
          >


            <div className='dl-flex justify-content-center '>
              <div style={{ backgroundImage: `linear-gradient(to bottom, ${e.color.split(",")[2].replace("100%", "")}, #fff)` }} className='ss_StatusNo22 '>{e.count && e.count}</div>
              <h5 className='ss_stautusLeads'>{e.status}</h5>
            </div>
          </div>

        ))}
    </div>
  );
};

export default StatusField;
