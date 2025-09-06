import { bookService } from "../services/book.service.js"
import { debounce } from "../services/util.service.js"
const { useState, useEffect, useRef } = React


export function BookFilter({ onSetFilterBy, filterBy}) {

    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
    const onSetFilterDebounce = useRef(debounce(onSetFilterBy, 1000)).current

    useEffect(() => {
        onSetFilterDebounce(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({target}) {
        let { value, name: field} = target

        switch (target.type) {
            case 'range':
            case 'number':
                value = +target.value
                break
            case 'checkbox':
                value = target.checked
                break
        }
        setFilterByToEdit((prevFilter)=> ({...prevFilter, [field]: value }))
    }



    function onSubmitFilter(ev) {
        ev.preventDefault()
        onSetFilterBy(filterByToEdit)
    }

    const {title, price} = filterByToEdit
    return(
        <section className="book-filter">
            <h2>Filter Our Books</h2>
            <form onSubmit={onSubmitFilter}>
                <label htmlFor="title">Title</label>
                <input onChange={handleChange} type="text"  value={title} name="title" id="title"/>

                <label htmlFor="price">Price</label>
                <input onChange={handleChange} type="number"  value={price} name="price" id="price"/>

                <button>Submit</button>
            </form>
        </section>

    )
}