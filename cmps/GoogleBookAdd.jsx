import { bookService } from "../services/book.service.js"
import { googleBookService } from "../services/google-book.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { debounce } from "../services/util.service.js"


const { useState, useRef, useEffect } = React

export function GoogleBookAdd(){

    const [books, setBooks] = useState([])
    const [searchText, setSearchText] = useState('')
    const onSetFilterDebounce = useRef(debounce((text) => {
        googleBookService.query(text)
            .then(setBooks)
            .catch(err => {
                console.error('Search error:', err)
                showErrorMsg('Failed to search books')
            })
    }, 1000)).current


    useEffect(()=> {
        if (searchText) {
            onSetFilterDebounce(searchText)
        } else {
            setBooks([])
        }
    },[searchText])


    function handleAdd(book){    
        delete book.id 
        let bookToSave = bookService.getEmptyBook() 
        bookToSave = {...bookToSave, ...book}  
        bookService.save(bookToSave)
        .then(() => showSuccessMsg('book added successfully!'))
        .catch((err) =>{
            console.log('error adding google book: ', err)
            showErrorMsg('couldnt add book')
        })
    }


    return(
        <section className="google-book-add">
            <form>
                <label htmlFor="searchBook">Search Book:</label>
                <input 
                    type="search" 
                    id="searchBox" 
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                />
            </form>

            <ul className="google-book-list">
                {books.map(book => (
                    <li key={book.id}>
                        {book.title}
                        <button onClick={() => handleAdd(book)}>+</button>
                    </li>
                ))}
            </ul>

        </section>

    )
}