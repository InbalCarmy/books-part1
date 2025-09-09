import { bookService } from "../services/book.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"

const { useState, useEffect } = React
const { useNavigate, useParams } = ReactRouterDOM

export function BookEdit() {
    const [book, setBook] = useState(bookService.getEmptyBook())
    const navigate = useNavigate()
    const { bookId } = useParams()

    useEffect(()=> {
        if(bookId) loadBook()
    }, [])

    function loadBook() {
        bookService.get(bookId)
            .then(setBook)
            .catch(err=> {
                console.log('Problem getting book', err)
            })
    }

    function onSaveBook(ev){
        ev.preventDefault()
        bookService.save(book)
        .then(()=> showSuccessMsg('Book has successfully saved!'))
        .catch(()=> showErrorMsg(`couldn't save book`))
        .finally(() => navigate('/book'))
    }

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
        setBook(prevBook => ({ ...prevBook, [field]: value }))
    }

    
    function handleChangeListPrice({ target }) {
        const { type, name: prop } = target
        let { value } = target

        switch (type) {
            case 'range':
            case 'number':
                value = +value
                break;

            case 'checkbox':
                value = target.checked
                break;
        }

        setBook(prevBook => ({
            ...prevBook,
            listPrice: { ...prevBook.listPrice, [prop]: value }
        }))
    }

    const {
        title,
        listPrice,
        authors,
        description,
        pageCount
    } = book

    return (
        <section className="book-edit">
            <h1>{bookId ? 'Edit' : 'Add'}</h1>
            <form onSubmit={onSaveBook}>

                <label htmlFor="title">Title</label>
                <input onChange={handleChange} value={title} type="text" name="title" id="title" />

                <label htmlFor="authors">Authors</label>
                <input onChange={handleChange} type="text" value={authors} name="authors" id="authors"/>

                <label htmlFor="description">Description</label>
                <input onChange={handleChange} value={description} type="text" name="description" id="description" />

                <label htmlFor="pageCount">Page Count</label>
                <input onChange={handleChange} value={pageCount || ''} type="number" name="pageCount" id="pageCount" />

                <label htmlFor="price">Price</label>
                <input onChange={handleChangeListPrice} value={listPrice.amount || ''} type="number" name="amount" id="price" />

                <label htmlFor="isOnSale">On Sale</label>
                <input onChange={handleChangeListPrice} checked={listPrice.isOnSale} id="isOnSale" type="checkbox" name="isOnSale" />

                <section className="btns flex">
                    <button>Save</button>
                </section>
            </form>
        </section>
    )
}