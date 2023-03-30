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
  const [precipitation, setprecipitation] = useState([])
  const [displayTempature, setdisplayTempature] = useState([])
  const [displayHourly, setdisplayHourly] = useState([])
  const [displayPrecipitation, setdisplayPrecipitation] = useState([])
  const [highest, sethighest] = useState("")
  const [lowest, setlowest] = useState("")
  const [selectedOption, setSelectedOption] = useState("");
  const [fetchStatus, setfetchStatus] = useState(true)
  const [checked, setChecked] = useState(false)
  const [startTempatureSearch, setstartTempatureSearch] = useState("")
  const [endTempatureSearch, setendTempatureSearch] = useState("")
  const [filteredIndexes, setFilteredIndexes] = useState([])
  
  const options = [
    { value: 'Morning', label: 'Morning' },
    { value: 'Afternoon', label: 'Afternoon' },
    { value: 'Night', label: 'Night' },
    { value: 'All', label: 'All' },
  ];

  function handleChange(event) {
    if (event.target.id == "checkbox-precipitation") {
      setChecked(!checked)
    }
    if (event.target.id == "starting-tempature") {
      setstartTempatureSearch(event.target.value)
    }
    if (event.target.id == "ending-tempature") {
      setendTempatureSearch(event.target.value)
    }
  };

  function handleSubmit(event) {
    event.preventDefault()
    if (event.target.id == "reset") {
      setSelectedOption({ value: 'All', label: 'All' })
    }
    if (event.target.id == "tempature-form") {
      if (startTempatureSearch == "" || endTempatureSearch == "") {
        alert("Enter Values to Filter")
      } else {
        let indexes = []
        for (let i = 0; i < tempature.length; i++){
          if (tempature[i] >= startTempatureSearch && tempature[i] <= endTempatureSearch) {
            indexes.push(i)
          }
        }
        setFilteredIndexes(indexes)
        setSelectedOption("TempatureSearch")
      }
    }
  }

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
          setdisplayPrecipitation(data.hourly.precipitation.slice(0, 24))
          setlowest(Math.min(...data.hourly.temperature_2m.slice(0, 24)))
          sethighest(Math.max(...data.hourly.temperature_2m.slice(0, 24)))
        })
    }
    setfetchStatus(false)
    if (selectedOption.value == "Morning") {
      setdisplayHourly(hourly.slice(0, 13))
      setdisplayTempature(tempature.slice(0, 13))
      setdisplayPrecipitation(precipitation.slice(0, 13))
      console.log(displayHourly)
      console.log("Morning")
    }
    if (selectedOption.value == "Afternoon") {
      setdisplayHourly(hourly.slice(12, 19))
      setdisplayTempature(tempature.slice(12, 19))
      setdisplayPrecipitation(precipitation.slice(12,19))
      console.log("Afternoon")
    }
    if (selectedOption.value == "Night") {
      setdisplayHourly(hourly.slice(18, 24))
      setdisplayTempature(tempature.slice(18, 24))
      setdisplayPrecipitation(precipitation.slice(18,24))
      console.log("Night")
    }
    if (selectedOption.value == "All") {
      setdisplayHourly(hourly)
      setdisplayTempature(tempature)
      setdisplayPrecipitation(precipitation)
      console.log("All")
    }
    if (selectedOption == "TempatureSearch") {
      console.log(filteredIndexes)
      let newTempatureDisplay = []
      let newHourlyDisplay = []
      let newPrecipitationDisplay = []
            setdisplayHourly([])
      setdisplayTempature([])
      setdisplayPrecipitation([])
      for (let i = 0; i < filteredIndexes.length; i++){
        newTempatureDisplay[i] = tempature[filteredIndexes[i]]
        newHourlyDisplay[i] = hourly[filteredIndexes[i]]
        newPrecipitationDisplay[i] = precipitation[filteredIndexes[i]]
      }
      setdisplayHourly(newHourlyDisplay)
      setdisplayTempature(newTempatureDisplay)
      setdisplayPrecipitation(newPrecipitationDisplay)
    }
    if (checked == true) {
      let newTempatureDisplay = []
      let newHourlyDisplay = []
      let newPrecipitationDisplay = []
      for (let i = 0; i < precipitation.length; i++){
        if (precipitation[i] != 0) {
          newTempatureDisplay.push(i)
          newHourlyDisplay.push(i)
          newPrecipitationDisplay.push(i)
        }
      }
      setdisplayHourly([])
      setdisplayTempature([])
      setdisplayPrecipitation([])
      for (let i = 0; i < newTempatureDisplay.length; i++){
        newTempatureDisplay[i] = tempature[newTempatureDisplay[i]]
        newHourlyDisplay[i] = hourly[newHourlyDisplay[i]]
        newPrecipitationDisplay[i] = precipitation[newPrecipitationDisplay[i]]
      }
      setdisplayHourly(newHourlyDisplay)
      setdisplayTempature(newTempatureDisplay)
      setdisplayPrecipitation(newPrecipitationDisplay)
    }
  },[selectedOption,checked,filteredIndexes]);

  return (
    <div className="App">
      <Header
        sunset={sunset}
        sunrise={sunrise}
        highest={highest}
        lowest={lowest}
      />
      <label>Filter By Morning | Afternoon | Night</label>
      <Select
        defaultValue={selectedOption}
        onChange={setSelectedOption}
        options={options}
        className="react-select-container"
      />
      <br></br>
      <label>Show Precipation:</label>
      <input
        type="checkbox"
        checked={checked}
        onChange={handleChange}
        id = "checkbox-precipitation"
      />
      <br></br>
      <br></br>
      <form  id = "tempature-form" onSubmit={handleSubmit}>
        <label>Filter By Tempature Range: </label>
        <br></br>
        <label>Starting: </label>
        <input type="text" id = "starting-tempature" onChange={handleChange}/>
        <label>Ending: </label>
        <input type="text" id = "ending-tempature" onChange={handleChange}/>
        <input type="submit"/>
      </form>
      <br></br>
      <button id = "reset" onClick = {handleSubmit}>Reset</button>
      <Dashboard
        displayHourly={displayHourly}
        displayTempature={displayTempature}
        displayPrecipitation = {displayPrecipitation}
      />
    </div>
  )
}

export default App
