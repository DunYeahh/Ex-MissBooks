const { useState, useEffect } = React

export function BookFilter({ onSetFilterBy, filterBy, categories }) {

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

    const { txt, minPrice, authors, publishedDate } = filterByToEdit

    return (
        <section className="book-filter container">
            <h2>Filter Our Books</h2>
            <form onSubmit={onSubmitFilter}>
                <label htmlFor="txt">Title</label>
                <input onChange={handleChange} value={txt} name="txt" id="txt" type="text" />

                <label htmlFor="authors">Author</label>
                <input onChange={handleChange} value={authors} name="authors" id="authors" type="text" />

                <label htmlFor="minPrice">Min Price</label>
                <input onChange={handleChange} value={minPrice || ''} name="minPrice" id="minPrice" type="number" />
                
                <label htmlFor="publishedDate">Publication Year</label>
                <input onChange={handleChange} value={publishedDate} name="publishedDate" id="publishedDate"
                type="range" min="1950" max={new Date().getFullYear()} step="10" title={publishedDate}/> 

                <label htmlFor="categories">Categories:</label>
                    <select 
                        id="categories"
                        onChange={handleChange}
                        name="categories"
                    >
                        <option value="">Select an option</option>
                        {categories.map(category => {
                            return <option key={category} value={category}>{category}</option>
                        })}
                    </select>

                <button>Submit</button>
            </form>
        </section>
    )
}