  import React from 'react'
import './Loader.css'

const Loader = (props) => {
  return (
    <>
    <div className='loderBody bg-info position-fixed top-0 start-0 '>

    <div className="wrapper ">
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="shadow"></div>
        <div className="shadow"></div>
        <div className="shadow"></div>
        <span className='pleaseWait'>PLEASE WAIT </span>
        <span className='uploadinG'>{props.loading}...</span>
    </div>
    </div>

    </>
  )
}

export default Loader