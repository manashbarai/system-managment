import React from 'react'
import './Assignpopup.css'

const Assignpopup = () => {
  return (
    <>
    <div className='mainSection'>
        <div className='Popup'>
            <div className='Close'>
                <button type='button' className='btn' id='closeButton'> 
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
  <path d="M14 27C21.1797 27 27 21.1797 27 14C27 6.8203 21.1797 1 14 1C6.8203 1 1 6.8203 1 14C1 21.1797 6.8203 27 14 27Z" stroke="#5F498A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M17.9001 10.1L10.1001 17.9" stroke="#5F498A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M10.1001 10.1L17.9001 17.9" stroke="#5F498A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
                </button>
            </div>
            <div className='Assign'>
                <button type='button' className='btn asignButton'>Assign</button>
            </div>
        </div>

    </div>
    </>
  )
}

export default Assignpopup