const {Link} = ReactRouterDOM

import { BookPreview } from "./BookPreview.jsx"

export function BookList({books}) {

    return(
        <ul className="book-list">
            {books.map(book => 
                <li key={book.id}>
                    <BookPreview book={book} />
                    <section>
                        <button><Link to={`/book/${book.id}`}>Details</Link></button>
                    </section>
                </li>
            )}
        </ul>
    )
}