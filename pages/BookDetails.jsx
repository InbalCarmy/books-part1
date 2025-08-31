import { bookService } from "../services/book.service.js"

const {useState, useEffect} = React
const {useParams, useNavigate} = ReactRouterDOM

export function BookDetails() {

    const [book, setBook] = useState(null)
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadBook()
    },[params.bookId])


    function loadBook() {
        bookService.get(params.bookId)
        .then(book => setBook(book))
        .catch(err => console.log('err: ', err))
    }

    function onBack(){
        navigate('/book')
    }

    function readingLevel() {
        if(book.pageCount > 500){
            return 'Serious'
        }
        else if(book.pageCount > 200 && book.pageCount < 500){
            return 'Descent'
        }
        else if( book.pageCount < 100){
            return 'Light'
        }
    }

    function isNew(){
        if(book.publishedDate > 10) return 'Vintage'
        else return 'New'
    }

    function priceLevel() {
        if(book.listPrice.amount > 150) return 'hight'
        else return 'low'
    }


    if(!book) return <div>Loading...</div>
     return (
        <section className="book-details">
            <h1>{book.title}</h1>
            <h2>{book.subtitle}</h2>
            <h2>Authors: {book.authors}</h2>
            <h4>Publish Date: {book.publishedDate}</h4>
            <p className="is-new">{isNew()}</p>
            <p>Description: {book.description}</p>
            <p>Page Count: {book.pageCount}</p>
            <p className="reading-level">{readingLevel()} Reading</p>
            <p className={`price-${priceLevel()}`}>Price: {book.listPrice.amount} NIS</p>
            <img src={book.thumbnail} alt={book.title} />
            <button onClick={onBack}>Back</button>
            
        </section>
     )
}