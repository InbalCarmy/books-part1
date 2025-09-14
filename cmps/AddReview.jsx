import { bookService } from "../services/book.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"

const {useParams, useNavigate, Link, Outlet} = ReactRouterDOM
const { useState } = React 


export function AddReview(){

    const params = useParams()
    const [review, setReview] = useState(bookService.getEmptyReview())
    const bookId = params.bookId
    const navigate = useNavigate()

    const [cmpType, setCmpType] = useState('select')

    function handeleReview(){

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
        setReview(prevReview => ({ ...prevReview, [field]: value }))
    }

    function onSaveReview(ev) {
        ev.preventDefault()
        bookService.addReview(bookId, review)
        .then((savedBook) => {
            console.log('Review saved, book:', savedBook)
            showSuccessMsg('Review has successfully added!')
        })
        .catch((err) => {
            console.log('Error saving review:', err)
            showErrorMsg('couldnt save review')
        })
        .finally(() => navigate(`/book/${bookId}`))
    }



    const {
        fullname, rate, readAt
    } = review

    return(
        <section className="add-review">
            <form onSubmit = {onSaveReview}>
                <label htmlFor="fullName">Full Name:</label>
                <input onChange={handleChange} value={fullname || ''} type="text" id="fullName" name="fullname"/>

                {/* <section className="dynamic-cmps"> */}
                    <label htmlFor="rateMethod">Rate Method:</label>
                    <select id="rateMethod" value={cmpType} onChange={(ev) => setCmpType(ev.target.value)}>
                        <option value="select">Rate By Select</option>
                        <option value="textBox">Rate By Text Box</option>
                        <option value="stars">rate by stars</option>
                    </select>
                    <DynamicCmp cmpType={cmpType} handleChange={handleChange} rate={rate} />

                {/* </section> */}

                <label htmlFor="readAt">Reading Date:</label>
                <input onChange={handleChange} value={readAt || ''} type="date" name="readAt" id="readAt" />

                <section>
                    <button>Send Review</button>
                </section>
            </form>

        </section>

    )
}

function DynamicCmp(props) {
    const dynCmpsMap = {
        select: <RateBySelect {...props} />,
        textBox: <RateByTextbox {...props} />,
        stars: <RateByStars {...props} />
    }

    return dynCmpsMap[props.cmpType]

}


function RateBySelect({ handleChange, rate }){
    return(
        <div className="rate-by-select">
            <label htmlFor="selectRate">Select Rate:</label>
            <select id="selectRate" name="rate" value={rate || 'notBad'} onChange={handleChange}>
                <option value="notBad">Not Bad</option>
                <option value="good">Good</option>
                <option value="varyGood">Very Good</option>
            </select>
        </div>

    )
}

function RateByTextbox({handleChange, rate}){

    return(
        <div className="rate-by-text">
            <label htmlFor="textBoxRate">what do tou think about the book?</label>
            <input name="rate" value={rate || ''} type="text" id="textBoxRate" onChange={handleChange} />
        </div>

    )
}


function RateByStars({handleChange, rate}){
    const stars = [1, 2, 3, 4, 5]
    
    function onStarClick(starRating) {
        handleChange({
            target: {
                name: 'rate',
                value: starRating
            }
        })
    }

    return(
        <div className="rate-by-stars">
            <label>Rate this book:</label>
            <div className="stars">
                {stars.map(star => (
                    <span 
                        key={star}
                        className={`star ${rate >= star ? 'filled' : ''}`}
                        onClick={() => onStarClick(star)}
                    >
                        ★
                    </span>
                ))}
            </div>
        </div>
    )
}
