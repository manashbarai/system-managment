import React from 'react'

const ComentBoxPopUp = (props) => {
    
  return (
    <div style={{width:"600px",height:"600px",overflow:"scroll"}} className='border bg-secondary p-4  bg-body'>
        <button className='float-end rounded-pill border border-dark p-1' onClick={props.openPopUp} > X </button>

        {props.Comment && props.Comment.map((comment,i)=>{
             return <div className="bg-secondary px-2 py-2" >
            {comment.commentOwnerUserRole === '2' && <div className="m-0 p-0" style={{ width: "20px", height: "20px", background: "green" }}>A</div>}
            {comment.commentOwnerUserRole === '1' && <div className="m-0 p-0" style={{ width: "20px", height: "20px", background: "red" }}>S</div>}
            {comment.commentOwnerUserRole === '3' && <div className="m-0 p-0" style={{ width: "20px", height: "20px", background: "red" }}>U</div>}
            {/* <p> <strong> Comment Owner :{comment.commentOwnerName && comment.commentOwnerName}  </strong></p> */}
            <p className="m-0 p-0">Date: {comment.commentDate.slice(0, 10)} </p>
            <p className="m-0 p-0">Comment: {comment.Comment} </p>
          </div>
        })}

        
    </div>
  )
}

export default ComentBoxPopUp
