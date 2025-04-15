const {  Link } = ReactRouterDOM

import { BookPreview } from "./BookPreview.jsx"

export function BookList({books, loadingClass, onRemoveBook}) {

    // console.log(books)

    if (!books.length) return <div>No Books To Show...</div>

    return (
        <ul className="book-list container">
            {books.map(book => {
                return <li className={loadingClass} key={book.id}>
                    <BookPreview book={book} />
                    <section>
                        <button onClick={() => onRemoveBook(book.id)}>
                            Remove
                        </button>
                        <button >
                            <Link to={`/book/${book.id}`}>Details</Link>
                        </button>
                        <button >
                            <Link to={`/book/edit/${book.id}`}>Edit</Link>
                        </button>
                    </section>
                </li>
            })}

        </ul>
    )
}