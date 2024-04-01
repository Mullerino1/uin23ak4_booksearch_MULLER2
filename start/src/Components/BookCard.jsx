import { useState } from "react"

export default function BookCard(props) {
    const [readMore, setReadMore] = useState(Array(props.books?.length).fill(false))

    const extraContent = (book) => {
        return (
            <div>
                <p>{book.Writer === 'N/A' ? null : "Writers: "+book.Writer}</p>
                <p>{book.Runtime === 'N/A' ? null : "Runtime: "+book.Runtime}</p>
                <p>{book.Plot === 'N/A' ? null : "Plot: "+book.Plot}</p>
            </div>
        )
    }

    const toggleReadMore = (index) => {
        const newReadMore = [...readMore]
        newReadMore[index] = !newReadMore[index]
        setReadMore(newReadMore)
    }

    //const PlaceholderImg = 'https://static1.srcdn.com/wordpress/wp-content/uploads/2021/09/James-Bond-key-art.jpeg'

    return (
        <>
        {props.books?.map((book, index) => 
        <div className="col bookcard align-text-center" key={index}>
        <img className="rounded-top imageSy center" src={book.Poster === 'N/A' ? PlaceholderImg : book.Poster} alt={book.type}></img>
        <div className="text-box rounded-bottom">
        <h2>{book.Title}</h2>    
        <h5>{book.Year === 'N/A' ? null : "Year: "+book.Year}</h5>
        <p>{book.Genre === 'N/A' ? null : "Genre: "+book.Genre}</p>
        <p>{book.Author === 'N/A' ? null : "Author: "+book.Author}</p>
        {readMore[index] && extraContent(book)}
        <span className="btn"><button className="rounded" onClick={() => toggleReadMore(index)}>{readMore[index] ? "Read Less" : "Read More"}</button></span>
        </div>
        </div>
        )}
        </>
    )

}