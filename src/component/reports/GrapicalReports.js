import React from 'react'


import { PieChart, Pie, Cell } from 'recharts';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import MonthYearCalendar from '../../component/calender/Calender';

import { DataStorage } from '../../context/useCotext';


const GrapicalReports = ({ statusButton, status }) => {

    let data = [

        // { name: 'Open', value: 60, uv: 200 },
        // { name: 'Completed', value: 10, uv: 150 },
        // { name: 'In Progress', value: 10, uv: 170 },
        // { name: 'Closed', value: 10, uv: 125 },
        // { name: 'Follow Up', value: 10, uv: 250 },
    ];
    let Colors = []
    for (let i = 0; i < status.length; i++) {
        const element = status[i];
        data.push({ name: element.status, value: element.leadCount, uv: element.leadCount, background: element.color })
        Colors.push(element.color)
    }


    // const Colors = ['#1B00B9', '#FF0000', '#7E2FBF', '#00FF00', '#C8005D'];




    const CustomLegend = ({ colors }) => {
        return (
            <div className="legend mt-5">
                {data.map((entry, index) => (
                    <div key={`legend-item-${index}`} className="legend-item d-flex">
                        <div
                            className="legend-item-color"
                            style={{ backgroundColor: colors[index % colors.length] }}
                        />
                        <span className="legend-item-text">{entry.name}</span>
                    </div>
                ))}
            </div>
        );
    };




    return (
        <div>
            <div className=' d-lg-flex justify-content-between mt-4 gap-1'>
                <div className="w-auto" style={{ borderRadius: '14.817px', border: '1px solid #DDD', background: '#FFF', padding: '25px' }}>

                    <div className='mb-5 d-flex justify-content-around'>
                        <div>
                            <h1>CRM Activity Log </h1>
                            <h2>{statusButton === 'callingStatus' ? 'Calling Status' : 'Lead Status'} </h2>

                            {/* <input style={{ border: "1px solid #d9d9d9", borderRadius: "4px", padding: "2px 4px", color: "#5F498A", marginTop: '30px' }} type="date" /> */}
                        </div>

                        <div>
                            <CustomLegend colors={Colors} />
                        </div>
                    </div>
                    <div className='mt-5 w-auto '>
                        <BarChart width={600} height={400} data={data}>
                            <CartesianGrid strokeDasharray="4 0" />
                            <XAxis dataKey="name" />
                            <YAxis domain={[0, 100]} />
                            <Tooltip />
                            <Bar dataKey="uv" color="red">
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={Colors[index % Colors.length]} />
                                ))}
                            </Bar>
                        </BarChart>



                    </div>
                </div>

                <div className="w-auto m-auto " style={{ borderRadius: '14.817px', border: '1px solid #DDD', background: '#FFF', padding: '25px', }}>
                    <div>
                        <h1>Analysis</h1>
                    </div>
                    <PieChart style={{ width: "auto" }} width={410} height={410}>
                        <Pie
                            data={data}
                            cx={200}
                            cy={200}
                            labelLine={false}
                            outerRadius={150}
                            innerRadius={100}
                            dataKey="value"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={Colors[index % Colors.length]} />
                            ))}
                        </Pie>
                    </PieChart>
                    <CustomLegend colors={Colors} />
                </div>
            </div>
        </div>
    )
}

export default GrapicalReports
