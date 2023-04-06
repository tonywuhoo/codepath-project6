import { useState } from 'react'
import { useEffect } from 'react'
import Header from './components/header.jsx'
import Dashboard from './components/dashboard.jsx'
import Charts from './components/charts.jsx'
import Search from './components/Search.jsx'
import WeatherDetails from './components/WeatherDetail.jsx'
import { Routes, Route } from "react-router-dom";
import './App.css'

function App() {
  //Header Display States
  const [timezone, settimezone] = useState("")
  const [today, set_today] = useState([])
  const [highest, sethighest] = useState("")
  const [lowest, setlowest] = useState("")

  //Main Data Fetched
  const [fetched_weather, set_fetched_weather] = useState([])

  //Search Data
  const [search, set_search] = useState("")
  //Chart Data (Static)

  const [min_chartData, set_min_chartData] = useState([])
  const [max_chartData, set_max_chartData] = useState([])
  
  //Dynamic States, to be displayed
  const [displayData, set_displayData] = useState([])

  //Bools
  const [selectedOption, setSelectedOption] = useState("");
  const [fetch_status, set_fetch_status] = useState(true)
  const [checked, set_checked] = useState(false)


  function handleChange(event) {
    if (event.target.id == "search-date-input") {
      set_search(event.target.value)
    }
    if (event.target.id == "checkbox-precipitation") {
      set_checked(!checked)
    }
  };

  function handleSubmit(event) {
    event.preventDefault()
    if (event.target.id == "search-by-date") {
      setSelectedOption("Searching")
    }
    if (event.target.id == "reset") {
      set_displayData(fetched_weather)
      setSelectedOption("Default")
      set_checked(false)
    }
  }

  const URL = "https://api.weatherbit.io/v2.0/forecast/daily?city=NewYork,NY&key=e4f367599827495a9f72bc3972821006"

  useEffect(() => {
    if (fetch_status == true) {
      fetch(URL)
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        console.log(data)
        set_fetched_weather(data.data)
        const max_temp_data = data.data.map((element) => {
          return {
            Date: element.datetime,
            Temp: element.app_max_temp 
          };
        })
        const min_temp_data = data.data.map((element) => {
          return {
            Date: element.datetime,
            Temp: element.app_min_temp 
          };
        })
        set_max_chartData(max_temp_data.slice(0, 6))
        set_min_chartData(min_temp_data.slice(0, 6))
        set_displayData(data.data)
        set_today(data.data[0].valid_date)
        settimezone(data.timezone)
        sethighest(data.data[0].app_max_temp)
        setlowest(data.data[0].app_min_temp)
      })
      const min_temp_data = fetched_weather.map((element) => {
        return {
          Date: element.datetime,
          Temp: element.app_min_temp 
        };
      })
      console.log(min_temp_data)
      set_fetch_status(false)

    }
    if (selectedOption == "Searching") {
      for (let i = 0; i < fetched_weather.length; i++){
        if (fetched_weather[i].datetime == search) {
          console.log(fetched_weather[i].datetime)
          console.log(displayData[i])
          set_displayData([fetched_weather[i]])
        }
      }
    }
    if (checked == true) {
      let newDisplay = []
      for (let i = 0; i < fetched_weather.length; i++){
        if (fetched_weather[i].precip > 0) {
          console.log(fetched_weather[i].precip)
          newDisplay.push(fetched_weather[i])
        }
      }
      set_displayData(newDisplay)
    }

  },[selectedOption,checked]);

  return (
    <div className="App">
      <h1> New York Weather App</h1>
      <Header
        timezone={timezone}
        today={today}
        highest={highest}
        lowest={lowest}
      />
      <h3>Search/Filter</h3>
      <Search
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        checked={checked}
      />
      <h3>Dashboard</h3>
      <Dashboard
        displayData={displayData} />
      <h3>Charts</h3>
      {min_chartData <= 0 ? (
        <p>Loading...</p>
      ) : (
        <Charts
            min_chartData={min_chartData}
            max_chartData = {max_chartData}
      />
      )}
      </div>
  )
}

export default App
