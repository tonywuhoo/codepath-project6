import React from 'react'
import '../App.css'
import { Link, useParams, useNavigate } from 'react-router-dom';

function WeatherDetails() {
  let { id } = useParams()
  return (
    <div className="weather-details">
      Poop
    </div>
  )
}

export default WeatherDetails
