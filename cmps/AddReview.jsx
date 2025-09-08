import { bookService } from "../services/book.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"

const {useParams, useNavigate, Link, Outlet} = ReactRouterDOM
const { useState } = React 

// const demoReview = {
//     fullname: 'Inbal Carmy',
//     rate: '4',
//     date: '15-08-2025'
// }


export function AddReview(){

    const params = useParams()
    const [review, setReview] = useState(bookService.getEmptyReview())
    const bookId = params.bookId
    const navigate = useNavigate()


    // console.log('params:' ,params)

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
        console.log('Saving review:', review, 'for bookId:', bookId)
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

                <label htmlFor="rating">Rating</label>
                <input onChange={handleChange} value={rate || ""} type="range" name="rate" id="rating" min="1" max="5"/>

                <label htmlFor="readAt">Reading Date:</label>
                <input onChange={handleChange} value={readAt || ''} type="date" name="readAt" id="readAt" />

                <section>
                    <button>Send Review</button>
                </section>
            </form>

        </section>

    )
}