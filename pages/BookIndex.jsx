import { BookList} from "../cmps/BookList.jsx"
import { BookFilter} from "../cmps/BookFilter.jsx"
import { bookService } from "../services/book.service.js"
import {BookEdit} from "./BookEdit.jsx"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"



const {useEffect, useState} = React
const {Link} = ReactRouterDOM
 

export function BookIndex() {
    const [books, setBooks] = useState(null)
    const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter)

    useEffect(() => {
        loadBooks()
    }, [filterBy])


    function loadBooks() {
        bookService.query(filterBy)
            .then(setBooks)
            .catch(err=> {
                showErrorMsg('Problem getting cars')
                console.log('Problem getting books', err)
            })
    }

    function onRemoveBook(bookId) {
        bookService.remove(bookId)
        .then(()=> {
            setBooks(books => books.filter(book => book.id !==bookId))
            showSuccessMsg('Car removed successfully!')
        })
        .catch(err => {
            console.log('Problems removing book: ', err)
            showErrorMsg('Problem removing car')
        })
    }

    function onSetFilterBy(filterBy) {
        setFilterBy(prevFilter =>({...prevFilter, ...filterBy}))
    }


    if (!books) return <div>Loading...</div>
     return (
        <section className="book-index">
            <BookFilter onSetFilterBy={onSetFilterBy} filterBy={filterBy}/>
            <section className="add-book-section">
                <Link to="/book/edit">Add Book</Link>
            </section>
            <BookList books = {books} onRemoveBook={onRemoveBook}/>
        </section>
     )
}