const { useState, useEffect } = React

export function BookFilter({ onSetFilterBy, filterBy }) {

    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })

    useEffect(() => {
        onSetFilterBy(filterByToEdit)
    }, [filterByToEdit])

    function onSubmitFilter(ev) {
        ev.preventDefualt()
        onSetFilterBy (filterByToEdit)
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
        setFilterByToEdit(prevFilterBy => ({...prevFilterBy, [field]: value}))
    }

    const { txt, minPrice } = filterByToEdit

    return (
        <section className="book-filter container">
            <h2>Filter Our Books</h2>
            <form onSubmit={onSubmitFilter}>
                <label htmlFor="txt">Title</label>
                <input onChange={handleChange} value={txt} name="txt" id="txt" type="text" />

                <label htmlFor="minPrice">Min Price</label>
                <input onChange={handleChange} value={minPrice || ''} name="minPrice" id="minPrice" type="number" />

                <button>Submit</button>
            </form>
        </section>
    )
}