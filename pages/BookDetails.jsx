import { bookService } from "../services/book.service.js"
import { LongTxt } from "../cmps/LongTxt.jsx"
import { AddReview } from "../cmps/AddReview.jsx"

const { useState, useEffect } = React
const { useParams, useNavigate, Link, Outlet } = ReactRouterDOM


export function BookDetails() {

    const [book, setBook] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadBook()
    },[params.bookId])

    function loadBook() {
        setIsLoading(true)
        bookService.get(params.bookId)
            .then (book => setBook(book))
            .catch(err => {
                console.log('err:', err)
                showErrorMsg('Cannot get book details!')
            })
            .finally(() => setIsLoading(false))
    }

    function onBack() {
        navigate('/book')
    }

    function typeOfRead() {
        let typeOfRead = ''

        if (book.pageCount > 500) {
            return 'Serious Reading'
        } else if (book.pageCount > 200) {
            return 'Decent Reading'
        } else if (book.pageCount < 100) {
            return 'Light Reading'
        }

        return typeOfRead
    }

    function bookAge() {
        if (new Date().getFullYear() - book.publishedDate > 10) return 'Vintage!'
        if (new Date().getFullYear() - book.publishedDate < 1) return 'New!'
        return ''
    }

    if (!book) return <div>Loading...</div>

    function priceColor() {
        if (book.listPrice.amount > 150) return 'red'
        if (book.listPrice.amount < 20) return 'green'
        return ''
    }

    function saveReview(review) {
        bookService.addReview(params.bookId, review)
            .then(() => {
                loadBook()
                showSuccessMsg(`Your Review was submitted successfully!`)
            })
            .catch(err => {
                console.log('Cannot save review!', err)
                showErrorMsg('Cannot save review!')
            })
    }

    function removeReview(reviewId) {
        bookService.removeReview(params.bookId, reviewId)
        .then(() => {
            loadBook()
            showSuccessMsg(`Your Review was deleted successfully!`)
        })
        .catch(err => {
            console.log('Cannot delete review!', err)
            showErrorMsg('Cannot delete review!')
        })
    }

    if (isLoading) return <div className="loader">Loading...</div>

    const { title, subtitle, authors, publishedDate, description, thumbnail, listPrice, reviews} = book
    return (
        <section className="book-details container">
            <h1>{title}</h1>
            <h2>{subtitle}</h2>
            <p>{authors},{publishedDate}. <span>{bookAge()} {typeOfRead()}</span></p>
            <div className="img-container">
            <h2 className={priceColor()}>{listPrice.amount}{listPrice.currencyCode}</h2>
            <img src={thumbnail} alt="Book Image"/>
            {listPrice.isOnSale ? <p className="on-sale">on sale!</p> : ''}
            </div>
            <LongTxt txt={description} length={100}/>
            {/* <div className="review-link">
            <Link to={`/book/${params.bookId}/review`}>Add a Review</Link>
            </div>
            <section>
                <Outlet />
            </section> */}
            <AddReview 
            saveReview={saveReview} 
            reviews={reviews || null}
            removeReview={removeReview}
            />
            <button onClick={onBack}>Back</button>
            <section>
                <button ><Link to={`/book/${book.prevBookId}`}>Prev Book</Link></button>
                <button ><Link to={`/book/${book.nextBookId}`}>Next Book</Link></button>
            </section>
        </section>
    )
}