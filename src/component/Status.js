import React, { useEffect, useState } from 'react'
import { DataStorage } from '../context/useCotext'

import DashBoard from './DashBoard'

import './Status.css'


import StatusField from './StatusField'

const Status = (props) => {

  const { statusWithCount, myProfile, classificationAccordingtoStatus, getLeadAccordingStatus } = DataStorage()



  const [leadClassify, setLeadClassify] = useState(classificationAccordingtoStatus)




  const [leadStatus, setLeadStatus] = useState(props.adminLeads === 'followUpStatus' ? 5 : 1)

 


  useEffect(() => {
    if (!localStorage.getItem('crm_id')) {
      window.location.href('/login')
    }
    sessionStorage.setItem("statusId", 1)
    setLeadClassify(classificationAccordingtoStatus)
    if (props.followUpStatus === 'followUpStatus') {
      setLeadStatus(5)
    }


    
    

  }, [statusWithCount, classificationAccordingtoStatus, props.followUpStatus])


 
 




  return (
    <>

      <div className='   paddingLeft   overflow-auto  '>
        <div className='mt-5 mb-4 p-2 p-lg-4 ss_Statuses '>


          {statusWithCount && <StatusField  searchLead={props.searchLead} statusWithCount={statusWithCount} getLeadAccordingStatus={getLeadAccordingStatus} userIdForStatus={props.userIdForStatus} userRoleForStatus={props.userRoleForStatus} adminLeads={props.adminLeads} option={props.option} />}

        </div>



        {myProfile && myProfile.userRole === '1' && <DashBoard  option={props.option} leadsStatus={leadStatus} adminLeads={props.adminLeads} myLeads={leadClassify} />}

        {myProfile && myProfile.userRole === '2' && <DashBoard  adminLeads={props.adminLeads} myLeads={leadClassify} followUp={props.followUp} />}













        {myProfile && myProfile.userRole === '3' && <>

          {props.status === "callAccordingLead" ? <DashBoard  adminLeads={props.adminLeads} myLeads={leadClassify} option={props.option} /> : <DashBoard  followUp={props.followUp} adminLeads={props.adminLeads} myLeads={leadClassify} />
          }

        </>
        }









      </div>
    </>
  )
}

export default Status
