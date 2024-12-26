import React from 'react'
import './Blockeduser.css'

const Blockeduser = () => {
    return (
        <>
            <div className='container SBU_upperSection'>
                <div className='SBU_main'>
                    <ul className='SBU_Heading'>
                        <li className='col-md-2 SBU_Name'>Name</li>
                        <li className='col-md-2 SBU_Name'>Email Id</li>
                        <li className='col-md-2 SBU_Name'>User Role</li>
                        <li className='col-md-2 SBU_Name'>View</li>
                        <li className='col-md-2 SBU_Name'>Option</li>
                    </ul>
                    <ul className='SBU_Heading1'>
                        <li className='col-md-2 SBU_Name1'>
                            <input className="form-check-input SBU_check" type="checkbox" value="" />
                            <label className="form-check-label" for="flexCheckDefault">
                                Asima Chatterjee
                            </label>
                        </li>
                        <li className='col-md-2 SBU_Email'>asima.chatterjee@gmail.com</li>
                        <li className='col-md-2 SBU_User'>User</li>
                        <li className='col-md-2 SBU_assign'><button className='SBU_BlockButton'>Unblock</button></li>
                        <li className='col-md-2 SBU_assign'><button className='SBU_AssignButton'>Make Admin</button></li>
                    </ul>
                    <ul className='SBU_Heading1'>
                        <li className='col-md-2 SBU_Name1'>
                            <input className="form-check-input SBU_check" type="checkbox" value="" />
                            <label className="form-check-label" for="flexCheckDefault">
                                Dinesh Das
                            </label>
                        </li>
                        <li className='col-md-2 SBU_Email'>dinesh.das@gmail.com</li>
                        <li className='col-md-2 SBU_User'>User</li>
                        <li className='col-md-2 SBU_assign'><button className='SBU_BlockButton'>Unblock</button></li>
                        <li className='col-md-2 SBU_assign'><button className='SBU_AssignButton'>Make Admin</button></li>
                    </ul>
                    <ul className='SBU_Heading1'>
                        <li className='col-md-2 SBU_Name1'>
                            <input className="form-check-input SBU_check" type="checkbox" value="" />
                            <label className="form-check-label" for="flexCheckDefault">
                                Benoy Basu
                            </label>
                        </li>
                        <li className='col-md-2 SBU_Email'>benoy.basu@gmail.com</li>
                        <li className='col-md-2 SBU_User'>User</li>
                        <li className='col-md-2 SBU_assign'><button className='SBU_BlockButton'>Unblock</button></li>
                        <li className='col-md-2 SBU_assign'><button className='SBU_AssignButton'>Make Admin</button></li>
                    </ul>
                    <ul className='SBU_Heading1'>
                        <li className='col-md-2 SBU_Name1'>
                            <input className="form-check-input SBU_check" type="checkbox" value="" />
                            <label className="form-check-label" for="flexCheckDefault">
                                Sudip Roy
                            </label>
                        </li>
                        <li className='col-md-2 SBU_Email'>sudip.roy@gmail.com</li>
                        <li className='col-md-2 SBU_User'>User</li>
                        <li className='col-md-2 SBU_assign'><button className='SBU_BlockButton'>Unblock</button></li>
                        <li className='col-md-2 SBU_assign'><button className='SBU_AssignButton'>Make Admin</button></li>
                    </ul>
                    <ul className='SBU_Heading1'>
                        <li className='col-md-2 SBU_Name1'>
                            <input className="form-check-input SBU_check" type="checkbox" value="" />
                            <label className="form-check-label" for="flexCheckDefault">
                                Dipankar Dey
                            </label>
                        </li>
                        <li className='col-md-2 SBU_Email'>dipankar.day@gmail.com</li>
                        <li className='col-md-2 SBU_User'>User</li>
                        <li className='col-md-2 SBU_assign'><button className='SBU_BlockButton'>Unblock</button></li>
                        <li className='col-md-2 SBU_assign'><button className='SBU_AssignButton'>Make Admin</button></li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Blockeduser