import React from "react"
import BookCard from "./BookCard" // Importer Book-komponenten

const SearchResults = ({ searchResults }) => {
  return (
    <div>
      {searchResults.map((result, index) => (
        <div key={index}>
          <BookCard book={result} /> {/* Bruk Book-komponenten */}
        </div>
      ))}
    </div>
  )
}

export default SearchResults
