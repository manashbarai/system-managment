import React from 'react';
import './WithOutTeam.css'; 

const WithOutTeam = () => {
  return (
    <div className="waiting-animation-container">
      <div className="waiting-text">Waiting for your Team... <br/> <button className='btn border' onClick={()=>{
        
        localStorage.clear();
sessionStorage.clear();
window.location.reload();
window.location.href = "/";
        
        }}  >Log Out</button>  </div>

    </div>
  );
}

export default WithOutTeam;
