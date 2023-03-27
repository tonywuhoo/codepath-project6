import { useState } from 'react'
import { useEffect } from 'react'
import Header from './components/header.jsx'
import Dashboard from './components/dashboard.jsx'
import Select from 'react-select';

import './App.css'

function App() {
  const [sunset, setsunset] = useState("")
  const [sunrise, setsunrise] = useState("")
  const [hourly, sethourly] = useState([])
  const [tempature, settempature] = useState([])
  const [displayTempature, setdisplayTempature] = useState([])
  const [displayHourly, setdisplayHourly] = useState([])
  const [precipitation, setprecipitation] = useState([])
  const [highest, sethighest] = useState("")
  const [lowest, setlowest] = useState("")
  const [selectedOption, setSelectedOption] = useState("");
  const [fetchStatus, setfetchStatus] = useState(true)
  const [checked, setChecked] = useState(false)
  
  const options = [
    { value: 'Morning', label: 'Morning' },
    { value: 'Afternoon', label: 'Afternoon' },
    { value: 'Night', label: 'Night' },
    { value: 'All', label: 'All' },
  ];

  const handleChange = () => {
    setChecked(!checked);
  };

  const URL = "https://api.open-meteo.com/v1/forecast?latitude=40.71&longitude=-74.01&hourly=temperature_2m,precipitation&daily=sunrise,sunset&timezone=auto"

  useEffect(() => {
    if (fetchStatus == true) {
      fetch(URL)
        .then((response) => response.json())
        .then((data) => {
          console.log(data)
          setsunset(data.daily.sunset[0])
          setsunrise(data.daily.sunrise[0])
          sethourly(data.hourly.time.slice(0, 24))
          settempature(data.hourly.temperature_2m.slice(0, 24))
          setprecipitation(data.hourly.precipitation.slice(0, 24))
          setdisplayHourly(data.hourly.time.slice(0, 24))
          setdisplayTempature(data.hourly.temperature_2m.slice(0, 24))
          setlowest(Math.min(...data.hourly.temperature_2m.slice(0, 24)))
          sethighest(Math.max(...data.hourly.temperature_2m.slice(0, 24)))
        })
    }
    setfetchStatus(false)
    if (selectedOption.value == "Morning") {
      setdisplayHourly(hourly.slice(0, 13))
      setdisplayTempature(tempature.slice(0,13))
      console.log("Morning")
    }
    if (selectedOption.value == "Afternoon") {
      setdisplayHourly(hourly.slice(12, 19))
      setdisplayTempature(tempature.slice(12,19))
      console.log("Afternoon")
    }
    if (selectedOption.value == "Night") {
      setdisplayHourly(hourly.slice(18, 24))
      setdisplayTempature(tempature.slice(18,24))
      console.log("Night")
    }
    if (selectedOption.value == "All") {
      setdisplayHourly(hourly)
      setdisplayTempature(tempature)
      console.log("All")
    }
    if (checked == true) {
      
    }
  },[selectedOption,checked]);

  return (
    <div className="App">
      <Header
        sunset={sunset}
        sunrise={sunrise}
        highest={highest}
        lowest={lowest}
      />
      <Select
        defaultValue={selectedOption}
        onChange={setSelectedOption}
        options={options}
        className="react-select-container"
      />
      <label>Show Precipation:</label>
      <input
          type="checkbox"
          checked={checked}
        onChange={handleChange}
      />
      <Dashboard
        displayHourly={displayHourly}
        displayTempature={displayTempature}
        precipitation = {precipitation}
      />
    </div>
  )
}

export default App
