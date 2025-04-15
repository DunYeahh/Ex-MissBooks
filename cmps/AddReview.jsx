import { showErrorMsg } from "../services/event-bus.service.js"

const { useState, useEffect } = React

export function AddReview({ saveReview, reviews, removeReview }) {
    const [review, setReview] = useState({ fullname:'', rating:'', readAt:'' })
    const [isFormOpen, setIsFormOpen] = useState(false)
    const [allReviews, setAllReviews] = useState(reviews)

    function handleChange({ target }) {
        const field = target.name
        let value = target.value
        switch (target.type) {
            case 'number':
            case 'range':
            case 'select-one':
                value = +value
                break;

            case 'checkbox':
                value = target.checked
                break
        }
        setReview(prevReview => ({ ...prevReview, [field]: value }))
    }

    function handleSubmit(ev) {
        ev.preventDefault()
        setIsFormOpen(false)
        // saveReview(review)
        setAllReviews(prevReviews => [...prevReviews, review])
    }

    function onRemoveReview(reviewId) {
        removeReview(reviewId)
        setAllReviews(prevReviews => prevReviews.filter(review => review.id !== reviewId))
    }

    return (
        <section>
            <h3>Readers' Reviews:</h3>
            <ul className="clean-list">
                {allReviews && allReviews.map(review => {
                    return <li key={review.fullname}>
                        <section>
                        {`${review.fullname}, ${review.readAt}: ${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}`}
                        <button onClick={() => onRemoveReview(review.id)}>x</button>
                        </section>
                    </li>
                })}
            </ul>
            <h3 onClick={() => setIsFormOpen(true)} className="review-title">Add Your Review Here!</h3>
            {isFormOpen && 
                <form onSubmit={handleSubmit} className="add-review">

                    <label htmlFor="fullname">Full Name</label>
                    <input onChange={handleChange} type="text" name="fullname" id="fullname" />

                    <label htmlFor="rating">Rating</label>
                    <select onChange={handleChange} name="rating" id="rating">
                        <option value="">Select rating</option>
                        {[1, 2, 3, 4, 5].map(num => (
                        <option key={num} value={num}>{num}</option>
                    ))} 
                    </select>

                    <label htmlFor="readAt">Read At</label>
                    <input onChange={handleChange} type="date" name="readAt" id="readAt" />

                    <button>Submit</button>

                </form>
            }
        </section>
    )
}