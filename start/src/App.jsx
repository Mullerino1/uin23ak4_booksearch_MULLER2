import React, { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [searchTerm, setSearchTerm] = useState('james bond') // vi bruker james bond som default søk, når man åpner nettsiden for første gang
  const [searchResults, setSearchResults] = useState([])

  useEffect(() => {
    fetchData()
  }, []);

  const fetchData = async () => {
    try {
      const myHeaders = new Headers()
      myHeaders.append("accept", "application/json")

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
      };

      const response = await fetch(`https://openlibrary.org/search.json?q=${searchTerm}`, requestOptions)
      if (response.ok) {
        const data = await response.json()
        setSearchResults(data.docs)
      } else {
        console.error("Feil ved henting av data:", response.status, response.statusText)
      }
    } catch (error) {
      console.error("Feil ved henting av data:", error)
    }
  };

  const handleSearch = () => {
    fetchData()
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value)
  };

  return ( 
    // mflytt tabellen til en egen component samt som at søkefeltet kan også bli flyttet til en egen component
    <div className="App">
      <input type="text" value={searchTerm} onChange={handleInputChange} /> 
      <button onClick={handleSearch}>Søk</button>
      <table>
        <thead>
          <tr>
            <th>Boktittel</th>
            <th>Forfatter</th>
            <th>Første publiseringsår</th>
            <th>Coverbilde</th>{/* Ny kolonne for coverbildet */}
          </tr>
        </thead>
        <tbody>
          {searchResults.map((result, index) => (
            <tr key={index}>
              <td>{result.title}</td>
              <td>{result.author_name ? result.author_name.join(', ') : 'Unknown'}</td>
              <td>{result.first_publish_year ? result.first_publish_year : 'Unknown'}</td>
              <td>
                {result.cover_i ? (
                // Vi henter ut cover-bildet til boka (dersom det finnes) ved å bruke id hentet fra response-dataen
                // https://openlibrary.org/swagger/docs#/covers
                  <img src={`https://covers.openlibrary.org/b/id/${result.cover_i}-S.jpg`} alt="Cover" style={{ maxWidth: '100px' }} />
                ) : (
                  <span>No Cover</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default App
