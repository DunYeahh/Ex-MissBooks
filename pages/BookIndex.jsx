import { bookService } from "../services/book.service.js"
import { BookFilter } from "../cmps/BookFilter.jsx"
import { BookList } from "../cmps/BookList.jsx"
import { BookDetails } from "../pages/BookDetails.jsx"

const { useState, useEffect } = React

export function BookIndex() {
    
    const [books, setBooks] = useState(null)
    const [filterBy, setfilterBy] = useState(bookService.getDefaultFilter())
    const [isLoading, setIsLoading] = useState(false)
    const [selectedBookId, setSelectedBookId] = useState(null)

    useEffect (() => {
        loadBooks()
    }, [filterBy])

    function loadBooks() {
        bookService.query(filterBy)
            .then (books => setBooks(books))
            .catch(err => console.log('err:', err))
    }

    function onSetFilterBy(filterByToEdit) {
        setfilterBy(prevFilterBy => ({...prevFilterBy, ...filterByToEdit}))
    }

    function onRemoveBook(bookId) {
        setIsLoading(true)
        bookService.remove(bookId)
            .then (() => {
                setBooks(prevBooks => prevBooks.filter(book => book.id !== bookId))

            })
            .catch(err => console.log('err:', err))
            .finally(() => setIsLoading(false))
    }

    function onSelectBookId(bookId) {
        setSelectedBookId(bookId)
    }

    const loadingClass = isLoading ? 'loading' : ''
    return(
        <section className="book-index">
            {(selectedBookId &&
                <BookDetails
                onBack={() => onSelectBookId(null)} 
                bookId={selectedBookId}
                />
            )}
        {!selectedBookId && (books ?
        <React.Fragment>
            <BookFilter onSetFilterBy={onSetFilterBy} filterBy={filterBy}/>
            <BookList 
            books={books}
            loadingClass={loadingClass}
            onRemoveBook={onRemoveBook}
            onSelectBookId={onSelectBookId}
            />
        </React.Fragment>
        : <div>Loading...</div>)
        }
        </section>
    )
}