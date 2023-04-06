import React from 'react'
import { useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import '../App.css'



function Charts({min_chartData,max_chartData, chartData}) {
  return (
    <div className="Charts">
      <div className='max_tempature'>
        <label> Max Tempature</label>
        <BarChart width={600} height={300} data={max_chartData}>
          <XAxis dataKey="Date" stroke="#8884d8" />
          <YAxis />
          <Tooltip wrapperStyle={{ width: 125, backgroundColor: '#ccc' }} />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <Bar dataKey="Temp" fill="#8884d8" barSize={30} />
        </BarChart>
      </div>
      <div className='min_tempature'>
        <label> Min Tempature</label>
        <BarChart width={600} height={300} data={min_chartData}>
          <XAxis dataKey="Date" stroke="#8884d8" />
          <YAxis />
          <Tooltip wrapperStyle={{ width: 125, backgroundColor: '#ccc' }} />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <Bar dataKey="Temp" fill="#8884d8" barSize={30} />
        </BarChart>
      </div>
    </div>
  )
}

export default Charts