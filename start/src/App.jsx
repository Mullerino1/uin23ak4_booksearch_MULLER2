// import React, { useState, useEffect } from "react"
// import SearchResults from "./Components/SearchResults"
// import "./App.css"

// function App() {
//   const [searchTerm, setSearchTerm] = useState("") // vi bruker james bond som default søk, når man åpner nettsiden for første gang
//   const [searchResultsState, setSearchResultsState] = useState([])
//   const [query, setQuery] = useState("James Bond")

//    const fetchData = async()=>{
//     try{
//       const response = await fetch(`https://openlibrary.org/search.json?title=${query}`)
//       const data = await response.json()
//       setSearchResultsState(data.results)

//       const requestOptions = {
//                 method: "GET",
//                 headers: myHeaders,
//                 redirect: "follow",
//               }
        
//               if (searchTerm.length >= 3){
//               // Fra eksempelet https://openlibrary.org/search?q=title%3A+%22james+bond%22&mode=everything
//               const response = await fetch(
//                 `https://openlibrary.org/search.json?title=${searchTerm}`,
//                 requestOptions
//               )
//               if (response.ok) {
//                 const data = await response.json()
//                 setSearchResultsState(data.docs)
//               } else {
//                 console.error(
//                   "Feil ved henting av data:",
//                   response.status,
//                   response.statusText
//                 )
//               }
//               }
        
//     }catch{
//       console.error("Det har skjedd en feil")
//     }
//   }

//   useEffect(()=>{
//     fetchData()
//     setSearchTerm(localStorage.getItem("James Bond"))
//   },[query])

//   //  useEffect(() => {
//   //   fetchData()
//   //  }, [query])

// //   const fetchData = async () => {
// //     try {
// //       const myHeaders = new Headers()
// //       myHeaders.append("accept", "application/json") // Setter mime type vi ønsker til json (https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Accept)

// //       const requestOptions = {
// //         method: "GET",
// //         headers: myHeaders,
// //         redirect: "follow",
// //       }

// //       if (searchTerm.length >= 3){
// //       // Fra eksempelet https://openlibrary.org/search?q=title%3A+%22james+bond%22&mode=everything
// //       const response = await fetch(
// //         `https://openlibrary.org/search.json?title=${searchTerm}`,
// //         requestOptions
// //       )
// //       if (response.ok) {
// //         const data = await response.json()
// //         setSearchResultsState(data.docs)
// //       } else {
// //         console.error(
// //           "Feil ved henting av data:",
// //           response.status,
// //           response.statusText
// //         )
// //       }
// //       }

// //     } catch (error) {
// //       console.error("Feil ved henting av data:", error)
// //     }
// //   }

//   const handleSearch = () => {
//     if (searchTerm.length >= 3) {
//     fetchData()
//     }
// }

//   const handleInputChange = (e) => {
//     setSearchTerm(e.target.value)
//   }

//   return (
//     // flytt tabellen til en egen component samt som at søkefeltet kan også bli flyttet til en egen component
//     // kanskje lage tabellen til et liste element om det kan
//     <div className="App">
//       <input type="text" setQuery={setQuery} onChange={handleInputChange} placeholder="skriv minst tre tegn"/>
//       <button onClick={handleSearch}>Søk</button>
//       {/* Egen komponent for listen over bøker fra søkeresultatene */}
//       <SearchResults searchResults={searchResultsState} />
//     </div>
//   )
// }

// export default App

import React, { useState, useEffect } from "react";
import SearchResults from "./Components/SearchResults";
import "./App.css";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResultsState, setSearchResultsState] = useState([]);
  const [query, setQuery] = useState("James Bond");

  const fetchData = async (query) => {
    try {
      const response = await fetch(`https://openlibrary.org/search.json?title=${query}`);
      const data = await response.json();
      setSearchResultsState(data.docs);
    } catch (error) {
      console.error("Det har skjedd en feil:", error);
    }
  };

  useEffect(() => {
    if (query) {
      fetchData(query);
    }
  }, [query]);

  const handleSearch = () => {
    if (searchTerm.length >= 3) {
      setQuery(searchTerm);
    }
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="App">
      <input type="text" value={searchTerm} onChange={handleInputChange} placeholder="Skriv minst tre tegn" />
      <button onClick={handleSearch}>Søk</button>
      <SearchResults searchResults={searchResultsState} />
    </div>
  );
}

export default App;

