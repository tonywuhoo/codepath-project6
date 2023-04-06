import React from 'react'
import '../App.css'

function Dashboard({displayData}) {
  return (
    <div className="dashboard">
      {displayData !== [] && (
        <div className='dashboard-container'>
        <div className='container-elements'>
      Date:
      {displayData.map((element, index) => {
        return (
          <ul key= {index} className='lists'>
          <button>{element.datetime}</button>
          </ul>
        )
      })}
      </div>
      <div className='container-elements'>
      Average Tempature:
      {displayData.map((element, index) => {
        return (
          <ul key= {index} className='lists'>
          {element.temp}
          </ul>
        )
      })}
      </div>
      <div className='container-elements'>
      Tempature High:
      {displayData.map((element, index) => {
        return (
          <ul key= {index} className='lists'>
          {element.app_max_temp}
          </ul>
        )
      })}
      </div>
      <div className='container-elements'>
      Tempature Low:
      {displayData.map((element, index) => {
        return (
          <ul key= {index} className='lists'>
          {element.app_min_temp}
          </ul>
        )
      })}
      </div>
      <div className='container-elements'>
      Precipitation:
      {displayData.map((element, index) => {
        return (
          <ul key= {index} className='lists'>
          {element.precip}
          </ul>
        )
      })}
      </div>
          </div>
      )}
    </div>
  )
}

export default Dashboard
