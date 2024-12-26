import React, { Component, useState } from 'react'
import './Comment.css'

const Comment = (props) => {
    const [cmtMgs, setCmtMgs] = useState("");
    const cmtMessage = (e) => {
        setCmtMgs(e.target.value);
    };


    return (
        <>
            <div style={{ zIndex: 1 }} className='C_mainSection position-fixed top-0 start-0 z-4'>
                <div className='C_Popup'>
                    <div className='C_upperSection'>
                        <div className='col-md-9 c_Buttons'>
                            <div className='C_buTtons '>
                                <button className='btn'> 
                                </button>
                                <button className='btn'>
                                </button>
                                <button className='btn'> 
                                </button>
                            </div>
                            <div className='C_comment'>
                                <h2 className='c_Comments'>Comments</h2>
                            </div>
                        </div>
                        <div className='col-md-3 C_Close' onClick={() => props.openPopUp()}>
                            <button type='button' className='btn' id='C_closeButton'>
                                {/* <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
                                    <path d="M14 27C21.1797 27 27 21.1797 27 14C27 6.8203 21.1797 1 14 1C6.8203 1 1 6.8203 1 14C1 21.1797 6.8203 27 14 27Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M17.9001 10.1001L10.1001 17.9001" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M10.1001 10.1001L17.9001 17.9001" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                </svg> */}

                            </button>
                        </div>
                    </div>
                    <div className='c_commentSection'>
                        {props.comment.length !== 0 && props.comment.map((e, i) => {

                            var dateString = e.commentDate;
                            var date = new Date(dateString);
                            var formattedDate = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();

                            return <div key={e._id}>
                                <div className='C_first'>
                                    <div className='c_firstImg'>
                                       
                                    </div>
                                    <h1 className='c_Name'>{e.commentOwnerName}</h1>
                                    <h2 className='c_Time'> {formattedDate} </h2>
                                </div>
                                <p className='c_Text'>{e.Comment}</p>
                            </div>
                        })}





                        <div className='mt-5 C_commentBox'>
                            <textarea
                                className='c_postComment'
                                
                                name="postContent"
                                placeholder='Text Here...'
                                rows={4}
                                value={cmtMgs}
                                onChange={cmtMessage}
                                cols={70} />
                        </div>
                        <div className='C_Emoji'>
                            <button className='btn'></button>
                        </div>
                        <div className='C_Send'>
                            <button className='btn' onClick={() => props.submitComment(cmtMgs, props.statusdurringComment)}   ></button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Comment