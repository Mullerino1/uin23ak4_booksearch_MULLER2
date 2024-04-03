import React, { useState, useEffect } from "react"
import SearchResults from "./Components/SearchResults"
import Layout from "./Components/Layout"
import "./Styles/Styles.scss"




function App() {
  const [searchResultsState, setSearchResultsState] = useState([])

  const fetchData = async (query) => {
    try {
      const response = await fetch(`https://openlibrary.org/search.json?title=${query}`)
      const data = await response.json()
      setSearchResultsState(data.docs)
    } catch (error) {
      console.error("Det har skjedd en feil:", error)
    }
  }

 

  return (
     <>
      <Layout>
       <SearchResults searchResults={searchResultsState} />
       </Layout>
     </>
    
  )
}

export default App

