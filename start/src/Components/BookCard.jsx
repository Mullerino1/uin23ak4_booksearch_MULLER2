import React from "react"

const BookCard = ({ book }) => {
  const handleAmazonLink = () => {
    // Noen bøker i resultatene har flere id'er i id_amazon og noen av disse kan være en tom streng(?!!).
    // Jeg har valgt å bare hente ut den første verdien i arrayet for id_amazon som ikke er en tom string.
    // Bruker find() for å finne den første verdien i id_amazon-arrayen som ikke er en tom streng (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find)
    const firstValidId = book.id_amazon.find((id) => id.trim() !== "")

    // Åpne lenken hvis en gyldig ID ble funnet
    if (firstValidId) {
      window.open(`https://www.amazon.com/s?k=${firstValidId}`, "_blank")
    }
  }

  return (
    <article style={{ display: "flex", alignItems: "center" }}>
      <div style={{ flex: 1 }}>
        <h3>{book.title}</h3>
        <p>
          Forfatter: {book.author_name ? book.author_name.join(", ") : "Ukjent"}
        </p>
        <p>
          Første publiseringsår:{" "}
          {book.first_publish_year ? book.first_publish_year : "Ukjent"}
        </p>
        <p>
          Generell rating:{" "}
          {book.ratings_average ? book.ratings_average : "Ukjent"}
        </p>
        <button
          onClick={handleAmazonLink}
          disabled={
            !book.id_amazon || book.id_amazon.every((id) => id.trim() === "")
          }
        >
          {book.id_amazon && book.id_amazon.some((id) => id.trim() !== "")
            ? "Utfør Amazon.com-søk"
            : "Ingen Amazon-ID funnet"}
        </button>
      </div>
      <div>
        {book.cover_i ? (
          // jeg henter ut cover-bildet til boka (dersom det finnes) ved å bruke id hentet fra response-dataen
          // https://openlibrary.org/swagger/docs#/covers
          <img
            src={`https://covers.openlibrary.org/b/id/${book.cover_i}-S.jpg`}
            alt="Cover"
            style={{ maxWidth: "100px" }}
          />
        ) : (
          <span>Ingen omslag</span>
        )}
      </div>
    </article>
  )
}

export default BookCard
