import React, { useEffect, useState } from 'react';
import { DataStorage } from '../../context/useCotext';
import State from '../../State';

function MonthYearCalendar() {
    const {mySuperTeam}=DataStorage()
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [state, setState] = useState("allstate")
    const { getStatusWithCountWithCount } = DataStorage();

    const handleDateChange = (event) => {

        const selected = new Date(event.target.value);
        setSelectedDate(selected);
        const year = selected.getFullYear();
        const month = selected.getMonth();
        const startOfMonth = new Date(year, month, 1).getTime();
        const endOfMonth = new Date(year, month + 1, 0).getTime();
        getStatusWithCountWithCount(`${process.env.REACT_APP_API}statusGetWithCount/?monthStart=${startOfMonth && startOfMonth}&monthEnd=${endOfMonth && endOfMonth}&userRole=${localStorage.getItem('crm_userRole')}&superTeamId=${localStorage.getItem("superTeam")}&state=${state}`)
        
    };
    useEffect(()=>{
        const selected =selectedDate;
        
        const year = selected.getFullYear();
        const month = selected.getMonth();
        const startOfMonth = new Date(year, month, 1).getTime();
        const endOfMonth = new Date(year, month + 1, 0).getTime();
        getStatusWithCountWithCount(`${process.env.REACT_APP_API}statusGetWithCount/?monthStart=${startOfMonth && startOfMonth}&monthEnd=${endOfMonth && endOfMonth}&userRole=${localStorage.getItem('crm_userRole')}&superTeamId=${localStorage.getItem("superTeam")}&state=${state}`)
    },[state,getStatusWithCountWithCount,selectedDate])
   

   

    return (
        <>
            <div className='d-flex gap-1'>
                <div className="month-year-calendar">
                    <label>
                        <input
                            type="month"
                            className='form-control px-2 border'
                            style={{
                                borderRadius: '5px',
                                border: '1px solid #8CA1EE',
                                background: 'rgba(217, 217, 217, 0.00)'
                            }}
                            onChange={handleDateChange}
                            value={selectedDate.toISOString().slice(0, 7)}
                        />
                    </label>
                </div>
                {mySuperTeam && mySuperTeam.showingField &&  mySuperTeam.showingField.find(e => e.includes("state")) && <div className="">
                    <label>
                        <select style={{ color: " #7c7c7c" }} className="form-control" onChange={(e) => setState(e.target.value.toLowerCase().trim())} >

                            <option selected>{state}</option>
                            {State.map((state, index) => {
                                return <option key={index} value={state}>{state}</option>
                            })}
                        </select>
                    </label>
                </div>}
            </div>
        </>
    );
}

export default MonthYearCalendar;
