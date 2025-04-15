import { bookService } from "../services/book.service.js"
import { showErrorMsg } from "../services/event-bus.service.js"
const { useEffect } = React
const { useNavigate, useParams, Link } = ReactRouterDOM

const { useState } = React

export function BookEdit() {

    const [bookToEdit, setBookToEdit] = useState(bookService.getEmptyBook())
    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate()
    const { bookId } = useParams()

    useEffect(() => {
        if (bookId) loadBook()
    }, [])

    function loadBook() {
        setIsLoading(true)
        bookService.get(bookId)
            .then(book => {
                setBookToEdit(book)
            })
            .catch(err => console.log('err:', err))
            .finally(() => setIsLoading(false))
    }

    function handleChange({ target }) {
        const field = target.name
        let value = target.value
        switch (target.type) {
            case 'number':
            case 'range':
                value = +value
                break;

            case 'checkbox':
                value = target.checked
                break
        }
        if (field === categories) value = value.split(', ')
        if (field === 'listPrice.amount') {
            setBookToEdit(prevBook => ({...prevBook, listPrice: {...prevBook.listPrice, amount: value}}))
        } else setBookToEdit(prevBook => ({ ...prevBook, [field]: value }))
    }
    

    function onSaveBook(ev) {
        ev.preventDefault()
        bookService.save(bookToEdit)
            .then(() => navigate('/book'))
            .catch(err => {
                console.log('Cannot save book!:', err)
                showErrorMsg('Cannot save book!')
            })
    }

    const loadingClass = isLoading ? 'loading' : ''
    const { title, listPrice, categories, description } = bookToEdit
    return (
        <section className={"book-edit " + loadingClass}>
            <h1>{bookId ? 'Edit' : 'Add'} Book</h1>
            <form onSubmit={onSaveBook}>
                <label htmlFor="title">Title</label>
                <input value={title} onChange={handleChange} type="text" name="title" id="title" />

                <label htmlFor="listPrice.amount">Price</label>
                <input value={listPrice.amount} onChange={handleChange} type="number" name="listPrice.amount" id="listPrice.amount" />

                <label htmlFor="categories">Categories</label>
                <input value={categories ? categories.join(', ') : ''} onChange={handleChange} type="text" name="categories" id="categories" />

                <div>
                    <button>Save</button>
                    <button type="button">
                        <Link to='/book'>Back</Link>
                    </button>
                </div>
            </form>
        </section>
    )


}