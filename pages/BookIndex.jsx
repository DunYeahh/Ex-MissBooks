import { bookService } from "../services/book.service.js"
import { BookFilter } from "../cmps/BookFilter.jsx"
import { BookList } from "../cmps/BookList.jsx"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"

const { useState, useEffect } = React
const { Link } = ReactRouterDOM

export function BookIndex() {
    
    const [books, setBooks] = useState(null)
    const [filterBy, setfilterBy] = useState(bookService.getDefaultFilter())
    const [isLoading, setIsLoading] = useState(false)

    const categories = bookService.getCategories()

    useEffect (() => {
        loadBooks()
    }, [filterBy])

    function loadBooks() {
        bookService.query(filterBy)
            .then (books => {
                setBooks(books)
            })
            .catch(err => {
                console.log('err:', err)
                showErrorMsg('Cannot get books!')
            })
    }

    function onSetFilterBy(filterByToEdit) {
        setfilterBy(prevFilterBy => ({...prevFilterBy, ...filterByToEdit}))
    }

    function onRemoveBook(bookId) {
        setIsLoading(true)
        bookService.remove(bookId)
            .then (() => {
                setBooks(prevBooks => prevBooks.filter(book => book.id !== bookId))
                showSuccessMsg(`Book (${bookId}) removed successfully!`)

            })
            .catch(err => {
                console.log('err:', err)
                showErrorMsg('Problem removing book!')
            })
            .finally(() => setIsLoading(false))
    }

    if (!books) return <div className="loader">Loading...</div>
    const loadingClass = isLoading ? 'loading' : ''

    return(
        <section className="book-index">
            <BookFilter 
                onSetFilterBy={onSetFilterBy} 
                filterBy={filterBy} 
                categories={categories}/>
            <section style={{ marginTop: '10px' }} className="container">
            <Link to="/book/edit">Add Book</Link>
            </section>
            <BookList books={books} loadingClass={loadingClass} onRemoveBook={onRemoveBook} />
        </section>
    )
}