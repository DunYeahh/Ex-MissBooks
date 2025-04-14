import { bookService } from "../services/book.service.js"

const { useState, useEffect } = React

export function BookDetails({ bookId, onBack }) {

    const [book, setBook] = useState(null)

    useEffect(() => {
        loadBook()
    },[])

    function loadBook() {
        bookService.get(bookId)
            .then (book => setBook(book))
            .catch(err => console.log('err:', err))
    }

    if (!book) return <div>Loading...</div>
    const {title, subtitle, authors, publishedDate, description, thumbnail, listPrice} = book
    return (
        <section className="book-details container">
            <h1>{title}</h1>
            <h2>{subtitle}</h2>
            <p>{authors}{publishedDate}</p>
            <img src={thumbnail} alt="Book Image" />
            <p>{description}</p>
            <h2>{listPrice.amount}{listPrice.currencyCode}</h2>
            <button onClick={onBack}>Back</button>
        </section>
    )
}