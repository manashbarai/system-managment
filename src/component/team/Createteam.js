import React from 'react'
import './Createteam.css'

const Createteam = () => {
    return (
        <>
            <div style={{paddingLeft:"30px"}} className='container SC_upperSection'>
                <div className='SC_main'>
                    <div className='SC_createButton'>
                        <button className='btn SC_Createteam'>Create Team</button>
                    </div>
                    <ul className='SC_Heading'>
                        <li className='col-md-2 SC_Name'>Name</li>
                        <li className='col-md-2 SC_Name'>Email Id</li>
                        <li className='col-md-2 SC_Name'>User Role</li>
                        <li className='col-md-2 SC_Name'>View</li>
                        <li className='col-md-2 SC_Name'>Option</li>
                    </ul>
                    <ul className='SC_Heading1'>
                        <li className='col-md-2 SC_Name1'>
                            <input className="form-check-input SC_check" type="checkbox" value="" />
                            <label className="form-check-label" for="flexCheckDefault">
                                Asima Chatterjee
                            </label>
                        </li>
                        <li className='col-md-2 SC_Email'>asima.chatterjee@gmail.com</li>
                        <li className='col-md-2 SC_User'>User</li>
                        <li className='col-md-2 SC_assign'><button className='SC_BlockButton'>Block</button></li>
                        <li className='col-md-2 SC_assign'><button className='SC_AssignButton'>Make Admin</button></li>
                    </ul>
                    <ul className='SC_Heading1'>
                        <li className='col-md-2 SC_Name1'>
                            <input className="form-check-input SC_check" type="checkbox" value="" />
                            <label className="form-check-label" for="flexCheckDefault">
                                Dinesh Das
                            </label>
                        </li>
                        <li className='col-md-2 SC_Email'>dinesh.das@gmail.com</li>
                        <li className='col-md-2 SC_User'>User</li>
                        <li className='col-md-2 SC_assign'><button className='SC_BlockButton'>Block</button></li>
                        <li className='col-md-2 SC_assign'><button className='SC_AssignButton'>Make Admin</button></li>
                    </ul>
                    <ul className='SC_Heading1'>
                        <li className='col-md-2 SC_Name1'>
                            <input className="form-check-input SC_check" type="checkbox" value="" />
                            <label className="form-check-label" for="flexCheckDefault">
                                Benoy Basu
                            </label>
                        </li>
                        <li className='col-md-2 SC_Email'>benoy.basu@gmail.com</li>
                        <li className='col-md-2 SC_User'>User</li>
                        <li className='col-md-2 SC_assign'><button className='SC_BlockButton'>Block</button></li>
                        <li className='col-md-2 SC_assign'><button className='SC_AssignButton'>Make Admin</button></li>
                    </ul>
                    <ul className='SC_Heading1'>
                        <li className='col-md-2 SC_Name1'>
                            <input className="form-check-input SC_check" type="checkbox" value="" />
                            <label className="form-check-label" for="flexCheckDefault">
                                Sudip Roy
                            </label>
                        </li>
                        <li className='col-md-2 SC_Email'>sudip.roy@gmail.com</li>
                        <li className='col-md-2 SC_User'>User</li>
                        <li className='col-md-2 SC_assign'><button className='SC_BlockButton'>Block</button></li>
                        <li className='col-md-2 SC_assign'><button className='SC_AssignButton'>Make Admin</button></li>
                    </ul>
                    <ul className='SC_Heading1'>
                        <li className='col-md-2 SC_Name1'>
                            <input className="form-check-input SC_check" type="checkbox" value="" />
                            <label className="form-check-label" for="flexCheckDefault">
                                Dipankar Dey
                            </label>
                        </li>
                        <li className='col-md-2 SC_Email'>dipankar.day@gmail.com</li>
                        <li className='col-md-2 SC_User'>User</li>
                        <li className='col-md-2 SC_assign'><button className='SC_BlockButton'>Block</button></li>
                        <li className='col-md-2 SC_assign'><button className='SC_AssignButton'>Make Admin</button></li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Createteam