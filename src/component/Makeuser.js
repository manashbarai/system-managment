import React from 'react'
import './Makeuser.css'

const Makeuser = () => {
    return (
        <>
            <div className='container SU_upperSection'>
                <div className='SU_main'>
                    <ul className='SU_Heading'>
                        <li className='col-md-2 SU_Name'>Name</li>
                        <li className='col-md-2 SU_Name'>Email Id</li>
                        <li className='col-md-2 SU_Name'>User Role</li>
                        <li className='col-md-2 SU_Name'>View</li>
                        <li className='col-md-2 SU_Name'>Option</li>
                    </ul>
                    <ul className='SU_Heading1'>
                        <li className='col-md-2 SU_Name1'>
                            <input className="form-check-input SU_check" type="checkbox" value="" />
                            <label className="form-check-label" for="flexCheckDefault">
                                Asima Chatterjee
                            </label>
                        </li>
                        <li className='col-md-2 SU_Email'>asima.chatterjee@gmail.com</li>
                        <li className='col-md-2 SU_User'>Admin</li>
                        <li className='col-md-2 SU_assign'><button className='SU_BlockButton'>Block</button></li>
                        <li className='col-md-2 SU_assign'><button className='SU_AssignButton'>Make User</button></li>
                    </ul>
                    <ul className='SU_Heading1'>
                        <li className='col-md-2 SU_Name1'>
                            <input className="form-check-input SU_check" type="checkbox" value="" />
                            <label className="form-check-label" for="flexCheckDefault">
                                Dinesh Das
                            </label>
                        </li>
                        <li className='col-md-2 SU_Email'>dinesh.das@gmail.com</li>
                        <li className='col-md-2 SU_User'>Admin</li>
                        <li className='col-md-2 SU_assign'><button className='SU_BlockButton'>Block</button></li>
                        <li className='col-md-2 SU_assign'><button className='SU_AssignButton'>Make User</button></li>
                    </ul>
                    <ul className='SU_Heading1'>
                        <li className='col-md-2 SU_Name1'>
                            <input className="form-check-input SU_check" type="checkbox" value="" />
                            <label className="form-check-label" for="flexCheckDefault">
                                Benoy Basu
                            </label>
                        </li>
                        <li className='col-md-2 SU_Email'>benoy.basu@gmail.com</li>
                        <li className='col-md-2 SU_User'>Admin</li>
                        <li className='col-md-2 SU_assign'><button className='SU_BlockButton'>Block</button></li>
                        <li className='col-md-2 SU_assign'><button className='SU_AssignButton'>Make User</button></li>
                    </ul>
                    <ul className='SU_Heading1'>
                        <li className='col-md-2 SU_Name1'>
                            <input className="form-check-input SU_check" type="checkbox" value="" />
                            <label className="form-check-label" for="flexCheckDefault">
                                Sudip Roy
                            </label>
                        </li>
                        <li className='col-md-2 SU_Email'>sudip.roy@gmail.com</li>
                        <li className='col-md-2 SU_User'>Admin</li>
                        <li className='col-md-2 SU_assign'><button className='SU_BlockButton'>Block</button></li>
                        <li className='col-md-2 SU_assign'><button className='SU_AssignButton'>Make User</button></li>
                    </ul>
                    <ul className='SU_Heading1'>
                        <li className='col-md-2 SU_Name1'>
                            <input className="form-check-input SU_check" type="checkbox" value="" />
                            <label className="form-check-label" for="flexCheckDefault">
                                Dipankar Dey
                            </label>
                        </li>
                        <li className='col-md-2 SU_Email'>dipankar.day@gmail.com</li>
                        <li className='col-md-2 SU_User'>Admin</li>
                        <li className='col-md-2 SU_assign'><button className='SU_BlockButton'>Block</button></li>
                        <li className='col-md-2 SU_assign'><button className='SU_AssignButton'>Make User</button></li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Makeuser