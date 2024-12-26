import React, { useState, useEffect } from 'react';
import './ChartDashboard.css'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

 const initialData = [
     {month: 'Jan', leads: 100, completedLeads: 10, status: 'inProgress' },
     {month: 'Feb', leads: 100, completedLeads: 100, status: 'inProgress' },
     {month: 'Mar', leads: 400, completedLeads: 200, status: 'inProgress' },
     {month: 'Apr', leads: 800, completedLeads: 300, status: 'inProgress' },
     {month: 'May', leads: 500, completedLeads: 400, status: 'inProgress' },
     {month: 'Jun', leads: 100, completedLeads: 500, status: 'inProgress' },
     {month: 'Jul', leads: 200, completedLeads: 400, status: 'inProgress' },
     {month: 'Aug', leads: 800, completedLeads: 300, status: 'inProgress' },
     {month: 'Sep', leads: 700, completedLeads: 200, status: 'completed' },
     {month: 'Oct', leads: 600, completedLeads: 300, status: 'completed' },
     {month: 'Nov', leads: 500, completedLeads: 400, status: 'completed' },
     {month: 'Dec', leads: 400, completedLeads: 500, status: 'completed' },
    ];

const Linechart = () => {

     const [data, setData] = useState(initialData);

  const updateData = (month, newLeads) => {
     setData(prevData =>
       prevData.map(item => (item.month === month ? { ...item, leads: newLeads } : item))
     );
  };
  return (
    <>
    
    <div className='mt-5'>
                    <div className="sd_Linechart">

                        <select name="Leads over Month" className='mb-5 sd_Leadsmonth'>
                            <option value="Leads over Month">Leads over the Month</option>
                            <option value="Jan" >Jan</option>
                            <option value="Feb" >Feb</option>
                            <option value="Mar">Mar</option>
                            <option value="Apr">Apr</option>
                            <option value="May">May</option>
                            <option value="Jun">Jun</option>
                            <option value="Jul">Jul</option>
                            <option value="Aug">Aug</option>
                            <option value="Sep">Sep</option>
                            <option value="Oct">Oct</option>
                            <option value="Nov">Nov</option>
                            <option value="Dec">Dec</option>
                        </select>
       <h1>Leads Over the Month</h1>
       <table>
       </table>
       <LineChart width={1124} height={400} data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                     <CartesianGrid strokeDasharray="4 4 " />
                     <XAxis dataKey="month" />
                     <YAxis dataKey="leads" domain={[0, 50]} allowDuplicatedCategory={false} tickCount={6} />
                     <Tooltip />
                     <Legend />
                     <Line type="monotone" dataKey="leads" stroke="#8884d8" fill="#8884d8" />
                     <Line type="monotone" dataKey="completedLeads" stroke="#82ca9d" fill="#82ca9d" />
                 </LineChart>
</div>
</div>

    
    </>
  )
}

export default Linechart