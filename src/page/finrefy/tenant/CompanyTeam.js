import axios from 'axios'
import React, { useEffect, useMemo, useState } from 'react'

const CompanyTeam = () => {
  const headers = useMemo(() => ({
    Authorization: `${localStorage.getItem("crm_token")}`,
    'Content-Type': 'application/json',
  }), [])
  const [superAdminList, setSuperAdminList] = useState([])
  const [superAdminCount, setSuperAdminCount] = useState()
  const fetchData = async (url) => {
    try {
      const superAdminList = await axios.get(url, { headers })
      setSuperAdminList(superAdminList.data.superAdmins)
      setSuperAdminCount(superAdminList.data.counts)
    } catch (error) {

    }
  }
  const [teamList, setTeamList] = useState([])
  const [userLists, setUserLists] = useState([])
  const [teamId, setTeamId] = useState("")
  const [userId, setUserId] = useState("")
  const myCompanyTeam = async (id) => {
    try {
      const team = await axios.get(`${process.env.REACT_APP_API}team/superAdmin/${id}`, { headers })
      setTeamList(team.data)
     
    } catch (error) {

    }
  }
  const userList = async (id) => {
   
 
    try {
      const teamUserList=await axios.get(`${process.env.REACT_APP_API}userList/${id}`,{headers})
      
      setUserLists(teamUserList.data)
    } catch (error) {

    }
  }

  useEffect(() => {
    fetchData(`${process.env.REACT_APP_API}company/superAdminList/${localStorage.getItem('crm_companyId')}`)
  }, [])






  return (
    <div>
      <div className="container mt-5">
        <div className="card">
          <div className="card-header">
            <div className="d-flex align-items-center justify-content-between">
              {/* Company Logo */}
              <img src="../../images/CRM-Logo.svg" alt="Company Logo" width="200" height="50" className="me-3" />
              {/* Company Name */}
              <h5 className="card-title m-0 fw-bold fs-3">Finerefy</h5>
            </div>
          </div>
          <div className="card-body">
            {/* Super Admin */}
            {superAdminList.map((superAdmin, index) => {
              return <div>

                <div className="accordion accordion-flush" id="accordionFlushExample">
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="flush-headingOne">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne" onClick={() => myCompanyTeam(superAdmin._id)}>
                        {superAdmin.fullName}
                      </button>
                    </h2>
                    <div id="flush-collapseOne" className="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                      <div className="accordion-body d-flex gap-3">
                        

                        {teamList && teamList.map((team, index) => {
                          return <div className='' key={team._id} >
                            <div className='d-flex justify-content-between'> <button style={{ color:teamId===team._id?"#052c65": "rgb(145, 145, 145)",border:teamId===team._id?'1px solid rgb(95, 73, 138)':'1px solid rgb(145, 145, 145)' ,background:teamId===team._id?'#cfe2ff':'#fff'}}className='  px-3 py-1 text-capitalize rounded' onClick={() => {
                              setTeamId(team._id)
                              userList(team.adminId)
                            }}> {team.teamName} </button> </div>

                          </div>
                        })}
                        
                       

                      </div>
                          <div className='float-end  '>
                            <select className='form-control'>
                              <option value="SuperAdmin" key=""> SuperAdmin </option>
                              {teamId!=="" && <option value="Admin" key=""> Admin </option>}
                             {userId!=="" && <option value="User" key=""> User </option>}
                            </select>
                          </div>
                      <div className='d-flex px-3 gap-2'>
                      {userLists && userLists.map((user,index)=>{
                        return <div className=' gap-2'>
                           

                            <div className='d-flex justify-content-between'> <button style={{ color:userId===user._id?"#052c65": "rgb(145, 145, 145)",border:userId===user._id?'1px solid rgb(95, 73, 138)':'1px solid rgb(145, 145, 145)' ,background:userId===user._id?'#cfe2ff':'#fff'}}className='  px-3 py-1 text-capitalize rounded' onClick={() => {
                              setUserId(user._id)
                              
                            }}> {user.fullName} </button> </div>

                          </div>
                         
                        })}
                    </div>
                        </div>
                  </div>
                </div>

              </div>
            })}



          </div>
        </div>
      </div>
    </div>
  )
}

export default CompanyTeam
