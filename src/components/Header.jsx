import React from 'react'
import '../App.css'

function Header({timezone,today,lowest, highest}) {
  return (
    <div className="header-container">
      <div className='header-slot'>
        <h3>Timezone</h3>
        {timezone}
      </div>
      <div className='header-slot'>
        <h3>Today</h3>
        {today}
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
