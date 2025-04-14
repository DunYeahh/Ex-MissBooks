
export function BookPreview({ book }) {
    
    const { title, thumbnail, listPrice } = book
    return (
            <article className="book-preview">
                <h2>{title}</h2>
                <h4>Book Price: {listPrice.amount}{listPrice.currencyCode}</h4>
                <img src={thumbnail} alt="Book Image" />
            </article>
        )
}