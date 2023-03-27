import React from 'react'
import '../App.css'

function Header({sunrise,sunset,lowest,highest}) {
  return (
    <div className="header-container">
      <div className='header-slot'>
        <h3>Sunrise</h3>
        {sunrise}
      </div>
      <div className='header-slot'>
        <h3>Sunset</h3>
        {sunset}
      </div>
      <div className='header-slot'>
      <h3>Highest/Lowest</h3>
        Highest : {highest} °C
        Lowest: {lowest} °C
      </div>
    </div>
  )
}

export default Header
