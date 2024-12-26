import React, { useEffect, useState } from "react";

import axios from "axios";
import "./DashBoard.css";

import "./Makeuser.css";
import { DataStorage } from "../context/useCotext";

import SuperAdminAssign from "./popUpcomponent/SuperAdminAssign";
const DashBoardSuper = (props) => {


  const { superTeams, myProfile, team, getAllUser, allUser, getLeadAccordingStatus, statusWithCounts } = DataStorage();

  const [filteredUsers, setFilteredUsers] = useState([]);
  useEffect(() => {
    setFilteredUsers(props.allUser)
  }, [allUser, team, props.allUser])


  const headers = {
    Authorization: `${localStorage.getItem("crm_token")}`,
    "Content-Type": "application/json",

  };

  const search = (e) => {
    const searchValue = e.target.value;
    const filteredUsers = props.allUser.filter((user) =>
      user.fullName.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredUsers(filteredUsers);
  };

  const makeAdmin = async (e, userRole) => {
    const apiUrl = `${process.env.REACT_APP_API}/change_user_role/${e}`;

    const data = {
      userRole: userRole,
    };
    try {
      const response = await axios.put(apiUrl, data, { headers });

      if (response.status === 200) {
        getAllUser(`${process.env.REACT_APP_API}allUser`)
        alert("update userRole");

      }
    } catch (error) {
      console.error("Failed to update user role:", error);
    }
  };

  const pushLeads = async (userId) => {


    const unique = JSON.parse(localStorage.getItem('givingLeads'));
    const leadsArr = [...new Set(unique)];



    if (leadsArr.length === 0 || !leadsArr) {
      alert("Select at least one Lead");
      return;
    }




    try {
      const response = await axios.put(`${process.env.REACT_APP_API}updateAdminStatusOnLead`, { leadsArr }, { headers });
      localStorage.removeItem('givingLeads')
      if (response.status === 200) {

        alert(`${leadsArr.length} assigned successfully`);

      }
    } catch (error) {
      if (error.response.status === 412) {
        alert("Your Token Expire Need To login")
        localStorage.clear()
        window.location.reload()
        window.location.href('./login')
      }
      console.error("Failed to update user role:", error);
    }

    const apiUrl = `${process.env.REACT_APP_API}receiveLeads/${myProfile._id}/${userId}`;
   


    try {
      const response = await axios.put(apiUrl, leadsArr, { headers });
      if (response.status === 200) {
        getAllUser(`${process.env.REACT_APP_API}allUser`)
        // getAllLeads(`${process.env.REACT_APP_API}leads`)
        // getAllTeam(`${process.env.REACT_APP_API}team`)

        statusWithCounts(sessionStorage.getItem('countStatus'))
        getLeadAccordingStatus(sessionStorage.getItem('leadApi'))
        localStorage.removeItem('givingLeads')

        props.close()
      }
    } catch (error) {
      console.error("Failed to update user role:", error);
    }
  };

  const [teamMember, setTeamMember] = useState(false);
  const [teamAdminId, setTeamAdminId] = useState("");
  const [teamName, setTeamName] = useState("");
  const [adminEmail, setAdminEmail] = useState("");

  const createTeam = (id, userRole, name, email) => {
    setTeamAdminId(id);

    setTeamName(name);
    setAdminEmail(email);
    if (teamMember === true) {
      setTeamMember(false);
    }
    if (teamMember === false) {
      setTeamMember(true);
    }
  };
  const blockUser = async (e) => {
    const apiUrl = `${process.env.REACT_APP_API}/change_user_role/${e}`;

    const data = {
      userRole: "4",
    };
    try {
      const response = await axios.put(apiUrl, data, { headers });

      if (response.status === 200) {
        getAllUser(`${process.env.REACT_APP_API}allUser`)

        alert("Block Successfully");

      }
    } catch (error) {
      console.error("Failed to update user role:", error);
    }
  };
  const unblockUser = async (e) => {
    const apiUrl = `${process.env.REACT_APP_API}/change_user_role/${e}`;

    const data = {
      userRole: "3",
    };
    try {
      const response = await axios.put(apiUrl, data, { headers });

      if (response.status === 200) {
        alert("Unblock Successfully");
        getAllUser(`${process.env.REACT_APP_API}allUser`)

      }
    } catch (error) {
      console.error("Failed to update user role:", error);
    }
  };




  return (
    <div  className=" mt-5 paddingLeft ">
      {teamMember && (
        <div
          className="  "
          style={{
            zIndex: 2,
            width: "100%",
            left: "0",
            top: "0",
            height: "100vh",
            background: "rgba(95, 73, 138, 0.80)"
          }}
        >
          <div
            style={{ height: "80vh", overflowY: "scroll" }}
            className="col-md-10 bg-body p-3 rounded"
          >
            <div className="asignPopUp ">
              {/* <button onClick={createTeam}> X </button> */}
              <SuperAdminAssign createTeam={createTeam}
                makeSuperAdminTeam={myProfile.userRole === undefined ? true : false}
                teamAdminId={teamAdminId}
                teamName={teamName}
                email={adminEmail} />
            </div>


          </div>
        </div>
      )}

      <div className="rounded    ">
        <div
          className="d-flex justify-content-between col-md-5 border-bottom-0 "
          style={{
            border: "8px solid #fff",
            background: 'transparent',

            borderTopRightRadius: "4px ",
            borderBottomRightRadius: "0px ",
            borderBottomLeftRadius: "0px ",
            borderTopLeftRadius: "4px",
          }}
        >
          <input
            style={{ background: "transparent" }}
            type="text"
            placeholder="Search by User Name"
            className="form-control border-0"
            onChange={search}
          />
        </div>
        <div style={{ height: "81vh", overflow: "auto" }} className="SU_upperSection ">
          <div

            className="  SU_main rounded-0 border-0 shadow-none py-2"
          >
            <ul className="SU_Heading ">

              <li className="userDashBoardWidthFix   ">Name</li>
              <li className="userDashBoardWidthFix  ">Email Id</li>
              <li className="userDashBoardWidthFix    ">User Role</li>
              <li className="userDashBoardWidthFix   ">View</li>
              {/* <li className="userDashBoardWidthFix SU_Name  ">Option</li> */}

            </ul>

            {myProfile.userRole === undefined ? <>{
              filteredUsers.length !== 0
              && filteredUsers.map((e, i) => {

                const superTeam = superTeams.find((superAdmin) => superAdmin.superAdminId === e._id)
                  
                const superTeamsUser = superTeams.find(({_id}) => _id === e.superTeamId);
               
                return (
                  <ul
                    className="d-flex "
                    key={e._id}
                  >
                    <li className='userDashBoardWidthFix'>
                      <label className="form-check-label" htmlFor="flexCheckDefault">
                      {superTeamsUser &&<span className="bg-dark rounded-pill text-white px-1"> {superTeamsUser.teamName}</span>} {e.fullName}

                      </label>

                    </li>
                    <li className='userDashBoardWidthFix'>{e.email}</li>
                    {/* <li className='col-md-4  SU_Email'>{e.email}</li> */}



                    {myProfile.userRole !== "3" && (
                      <li className="userDashBoardWidthFix">
                        {e.userRole === "3" && "User"}
                        {e.userRole === "1" && "SuperAdmin"}
                        {e.userRole === "2" && "Admin"}
                        {e.userRole === "4" && "Block Users"}
                      </li>
                    )}
                    {e.userRole === "4" && (
                      <p className="px-2 m-0">
                        {" "}

                        <button
                          className="border-dark btn-sm btn"
                          onClick={() => makeAdmin(e._id, "3")}
                        >
                          {" "}
                          Unblock{" "}
                        </button>{" "}
                      </p>
                    )}


                    {e.userRole === "3" && (

                      <p className="px-2 m-0">
                        {" "}
                        <button
                          className="border-dark btn-sm btn"
                          onClick={() => makeAdmin(e._id, "2")}
                        >
                          {" "}
                          Make Admin{" "}
                        </button>{" "}
                        <button
                          className="border-dark btn-sm btn"
                          onClick={() => makeAdmin(e._id, "1")}
                        >
                          {" "}
                          Super Admin{" "}
                        </button>{" "}
                        <button
                          className="border-dark btn-sm btn"
                          onClick={() => makeAdmin(e._id, "4")}
                        >
                          {" "}
                          B{" "}
                        </button>{" "}
                      </p>
                    )}
                    {e.userRole === "2" && (
                      <p className="px-2 m-0">
                        {" "}
                        <button
                          className=" border-dark btn-sm btn"
                          onClick={() => makeAdmin(e._id, "3")}
                        >
                          {" "}
                          Make User{" "}
                        </button>{" "}
                        <button
                          className=" border-dark btn-sm btn"
                          onClick={() => makeAdmin(e._id, "1")}
                        >
                          {" "}
                          Super Admin{" "}
                        </button>{" "}
                      </p>
                    )}



                    {myProfile.userRole === "3" && (
                      <>
                        {e.userRole === "3" && (
                          <p className="px-2 m-0">
                            {" "}
                            <button
                              className="border-dark btn-sm btn"
                              onClick={() => makeAdmin(e._id, "2")}
                            >
                              {" "}
                              Make Admin{" "}
                            </button>{" "}
                          </p>
                        )}
                        {e.userRole === "2" && (
                          <p className="px-2 m-0">
                            {" "}
                            <button
                              className=" border-dark btn-sm btn"
                              onClick={() => makeAdmin(e._id, "3")}
                            >
                              {" "}
                              Make User{" "}
                            </button>{" "}
                          </p>
                        )}
                      </>
                    )}
                    {props.userRole === "" && (
                      <>


                        <>
                          {superTeam && superTeam.superAdminId === e._id ? <button className="border-dark btn-sm btn">Assigned</button> : <p className="px-2 m-0">
                            {" "}
                            <button
                              className="border-dark btn-sm btn"
                              onClick={() =>
                                createTeam(
                                  e._id,
                                  "2",
                                  e.fullName,
                                  e.email
                                )
                              }
                            >
                              {" "}

                              Select
                            </button>{" "}
                          </p>}
                        </>

                      </>
                    )}




                  </ul>
                );
              })

            }</> : <>{filteredUsers.length !== 0
              && filteredUsers.map((e, i) => {



                return (
                  <ul
                    className="SU_Heading1 list-unstyled "
                    key={e._id}
                  >
                    <li className=' px-2 userDashBoardWidthFix '>
                      <label className="form-check-label" htmlFor="flexCheckDefault">
                        {e.fullName}
                      </label>
                    </li>
                    <li className=' userDashBoardWidthFix  px-2'>{e.email}</li>



                    {myProfile.userRole !== "3" && (
                      <li className="px-2 userDashBoardWidthFix">
                        {e.userRole === "3" && "User"}
                        {e.userRole === "1" && "SuperAdmin"}
                        {e.userRole === "2" && "Admin"}
                      </li>
                    )}

                    {myProfile.userRole === "3" && (
                      <>
                        {e.userRole === "3" && (
                          <p className="px-2 m-0 userDashBoardWidthFix">
                            {" "}
                            <button
                              className="border-dark btn-sm btn"
                              onClick={() => makeAdmin(e._id, "2")}
                            >
                              {" "}
                              Make Admin{" "}
                            </button>{" "}
                          </p>
                        )}
                        {e.userRole === "2" && (
                          <p className="px-2 m-0">
                            {" "}
                            <button
                              className=" border-dark btn-sm btn userDashBoardWidthFix"
                              onClick={() => makeAdmin(e._id, "3")}
                            >
                              {" "}
                              Make User{" "}
                            </button>{" "}
                          </p>
                        )}
                      </>
                    )}

                    {myProfile.userRole === "3" && (
                      <>
                        {e.userRole === "3" && (
                          <p className="px-2 m-0">
                            {" "}
                            <button
                              className="border-dark btn-sm btn"
                              onClick={() => makeAdmin(e._id, "2")}
                            >
                              {" "}
                              Make Admin{" "}
                            </button>{" "}
                          </p>
                        )}
                        {e.userRole === "2" && (
                          <p className="px-2 m-0">
                            {" "}
                            <button
                              className=" border-dark btn-sm btn"
                              onClick={() => makeAdmin(e._id, "3")}
                            >
                              {" "}
                              Make User{" "}
                            </button>{" "}
                          </p>
                        )}
                      </>
                    )}

                    {myProfile.userRole === "1" && (
                      <>
                        {props.userRole === "3" && (
                          <li className="col-md-1 SU_assign">
                            {" "}
                            <button
                              className="SU_BlockButton"
                              onClick={() => blockUser(e._id)}
                            >
                              {" "}
                              Block{" "}
                            </button>{" "}
                          </li>
                        )}
                        {props.userRole === "3" && (
                          <p className="col-md-2 SU_assign">
                            {" "}
                            <button
                              className="SU_AssignButton"
                              onClick={() => makeAdmin(e._id, "2")}
                            >
                              {" "}
                              Make Admin{" "}
                            </button>{" "}
                          </p>
                        )}
                        {props.userRole === "2" && (
                          <li className="col-md-1 SU_assign">
                            {" "}
                            <button
                              className="SU_BlockButton"
                              onClick={() => blockUser(e._id)}
                            >
                              {" "}
                              Block{" "}
                            </button>{" "}
                          </li>
                        )}

                        {props.userRole === "4" && (
                          <p className="px-2 m-0">
                            {" "}
                            <button
                              className="border-dark btn-sm btn"
                              onClick={() => unblockUser(e._id)}
                            >
                              {" "}
                              Unblock{" "}
                            </button>{" "}
                          </p>
                        )}
                        {props.userRole === "" && (
                          <>
                            {team && team.find(team => team.adminId === e._id) ===
                              undefined ? (
                              <>
                                <p className="px-2 m-0">
                                  {" "}
                                  <button
                                    className="border-dark btn-sm btn"
                                    onClick={() =>
                                      createTeam(
                                        e._id,
                                        "2",
                                        e.fullName,
                                        e.email
                                      )
                                    }
                                  >
                                    {" "}
                                    Select
                                  </button>{" "}
                                </p>
                              </>
                            ) : (
                              <>
                                <strong>Assigned</strong>
                              </>
                            )}
                          </>
                        )}

                        {props.userRole === "2" && (
                          <li className="col-md-2 SU_assign">
                            {" "}
                            <button
                              className="SU_AssignButton"
                              onClick={() => makeAdmin(e._id, "3")}
                            >
                              {" "}
                              Make User{" "}
                            </button>{" "}
                          </li>
                        )}
                      </>
                    )}

                    {myProfile.userRole === "2" && (
                      <>
                        {e.userRole === "3" && (
                          <div className="">
                            {" "}
                            <button
                              className="btn-secondary btn-sm btn "
                              onClick={() => pushLeads(e._id)}
                            >
                              {" "}
                              Assign   {" "}
                            </button>{" "}
                          </div>
                        )}
                      </>
                    )}
                  </ul>
                );
              })
            }</>}

          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoardSuper;
