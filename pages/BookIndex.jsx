import { BookList} from "../cmps/BookList.jsx"
import { BookFilter} from "../cmps/BookFilter.jsx"
import { bookService } from "../services/book.service.js"


const {useEffect, useState} = React
 

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
                console.log('Problem getting books', err)
            })
    }

    function onSetFilterBy(filterBy) {
        setFilterBy(prevFilter =>({...prevFilter, ...filterBy}))
    }


    if (!books) return <div>Loading...</div>
     return (
        <section className="book-index">
            <BookFilter onSetFilterBy={onSetFilterBy} filterBy={filterBy}/>
            <BookList books = {books}/>
        </section>
     )
}