import React, { useState, useEffect } from "react"
import SearchResults from "./Components/SearchResults"
import "./App.css"

function App() {
  const [searchTerm, setSearchTerm] = useState('james bond') // vi bruker james bond som default søk, når man åpner nettsiden for første gang
  const [searchResultsState, setSearchResultsState] = useState([])

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const myHeaders = new Headers()
      myHeaders.append("accept", "application/json") // Setter mime type vi ønsker til json (https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Accept)

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      }

      if (searchTerm.length >= 3){
      // Fra eksempelet https://openlibrary.org/search?q=title%3A+%22james+bond%22&mode=everything
      const response = await fetch(
        `https://openlibrary.org/search.json?q=title%3A+%22${searchTerm}%22&mode=everything`,
        requestOptions
      )
      if (response.ok) {
        const data = await response.json()
        setSearchResultsState(data.docs)
      } else {
        console.error(
          "Feil ved henting av data:",
          response.status,
          response.statusText
        )
      }
      }

    } catch (error) {
      console.error("Feil ved henting av data:", error)
    }
  }

  const handleSearch = () => {
    if (searchTerm.length >= 3) {
    fetchData()
    }
}

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value)
  }

  return (
    // flytt tabellen til en egen component samt som at søkefeltet kan også bli flyttet til en egen component
    // kanskje lage tabellen til et liste element om det kan
    <div className="App">
      <input type="text" value={searchTerm} onChange={handleInputChange} placeholder="skriv minst tre tegn"/>
      <button onClick={handleSearch}>Søk</button>
      {/* Egen komponent for listen over bøker fra søkeresultatene */}
      <SearchResults searchResults={searchResultsState} />
    </div>
  )
}

export default App
