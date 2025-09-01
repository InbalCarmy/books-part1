import { bookService } from "../services/book.service.js"
import { LongTxt } from "../cmps/LongTxt.jsx"


const {useState, useEffect} = React
const {useParams, useNavigate, Link} = ReactRouterDOM

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

    function onSale() {
        return book.listPrice.isOnSale
    }

    // console.log('book prev id: ', book.prevbookId)


    if(!book) return <div>Loading...</div>
     return (
        <section className="book-details">
            <h1>{book.title}</h1>
            <h2>{book.subtitle}</h2>
            <h2>Authors: {book.authors}</h2>
            <h4>Publish Date: {book.publishedDate} - <span className="is-new">{isNew()}</span></h4>
            {/* <p>Description: {book.description}</p> */}
            <LongTxt txt={book.description} length={50} />
            <p>Page Count: {book.pageCount}- <span className="reading-level">{readingLevel()} Reading</span></p>
            {/* <p className="reading-level">{readingLevel()} Reading</p> */}
            <p className={`price-${priceLevel()}`}>Price: {book.listPrice.amount} NIS</p>
            <div className="img-container">
                <img src={book.thumbnail} alt={book.title} />
                {onSale() && 
                <div className="on-sale">On Sale!</div>}
            </div>
            <button onClick={onBack}>Back</button>
            <section>
                <button><Link to={`/book/${book.prevBookId}`}>Prev</Link></button>
                <button><Link to={`/book/${book.nextBookId}`}>Next</Link></button>
            </section>            
        </section>
     )
}