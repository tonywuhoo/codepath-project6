import React from 'react'
import '../App.css'



function Search({handleChange, handleSubmit, checked}) {
  return (
    <div className="search-container">
      <form className='form' id = "search-by-date" onSubmit={handleSubmit}>
          <label>Search By Day: </label>
          <input type= "text" id = "search-date-input" onChange={handleChange}/>
          <input type="submit"/>
      </form>
      <label>Show Precipation:</label>
      <input
        type="checkbox"
        checked={checked}
        onChange={handleChange}
        id = "checkbox-precipitation"
      />
      <br></br>
      <button id="reset" onClick={handleSubmit}>Reset</button>

    </div>
  )
}

export default Search