import { bookService } from "../services/book.service.js"
import { LongTxt } from "../cmps/LongTxt.jsx"
import { AddReview } from "../cmps/AddReview.jsx"
import { ReviewList } from "../cmps/ReviewList.jsx"


const {useState, useEffect} = React
const {useParams, useNavigate, Link, Outlet, useLocation} = ReactRouterDOM

export function BookDetails() {

    const [book, setBook] = useState(null)
    const params = useParams()
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        loadBook()
    },[params.bookId, location.pathname])

    function loadBook() {
        //show loader
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
        const currDate = new Date()
        const currYear = currDate.getFullYear()
        const currYearDiff = currYear - book.publishedDate
        return currYearDiff > 10 ? 'Vintage' : 'New'
    }

    function priceLevel() {
        if(book.listPrice.amount > 150) return 'hight'
        else return 'low'
    }

    function onSale() {
        return book.listPrice.isOnSale
    }

    if(!book) return <div>Loading...</div>
    
    console.log('book.reviews:', book.reviews)
    
     return (
        <section className="book-details">
            <h1>{book.title}</h1>
            <h2>{book.subtitle}</h2>
            <h2>Authors: {book.authors}</h2>
            <h4>Publish Date: {book.publishedDate} - <span className="is-new">{isNew()}</span></h4>
            {book.description && <LongTxt txt={book.description} length={50} />}            
            <p>Page Count: {book.pageCount}- <span className="reading-level">{readingLevel()} Reading</span></p>
            <p className={`price-${priceLevel()}`}>Price: {book.listPrice.amount} NIS</p>
            <div className="img-container">
                <img src={book.thumbnail} alt={book.title} />
                {onSale() && 
                <div className="on-sale">On Sale!</div>}
            </div>
            <nav>
               <button><Link to={`/book/${book.id}/addReview`}>Add Review</Link></button> 
            </nav>
            <Outlet />
            
            {book.reviews && book.reviews.length > 0 && (
                <ReviewList reviews={book.reviews} maxReviews ={1} />
            )}

            <button onClick={onBack}>Back</button>
            <section>
                <button><Link to={`/book/${book.prevBookId}`}>Prev</Link></button>
                <button><Link to={`/book/${book.nextBookId}`}>Next</Link></button>
            </section>            
        </section>
     )
}