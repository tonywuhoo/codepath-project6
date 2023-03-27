import React from 'react'
import { useState } from 'react';
import Select from 'react-select';
import '../App.css'

function Dashboard({displayHourly, displayTempature,precipitation}) {
  return (
    <div className="dashboard-container">
      <div className='container-elements'>
        Time:
      {displayHourly.map((element, index) => {
        return (
          <ul key= {index}>
          {element}
          </ul>
        )
      })}
      </div>
      <div className='container-elements'>
        Tempature:
      {displayTempature.map((element, index) => {
        return (
          <ul key= {index}>
          {element}
          </ul>
        )
      })}
      </div>
      <div className='container-elements'>
        Precipitation:
      {precipitation.map((element, index) => {
        return (
          <ul key= {index}>
          {element}
          </ul>
        )
      })}
      </div>
    </div>
  )
}

export default Dashboard
