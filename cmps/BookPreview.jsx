
export function BookPreview({book}) {

    const { title, authors, publishedDate, listPrice } = book

    return(
        <article className="book-preview">
            <h2>Title: {title}</h2>
            <h4>Authors: {authors}</h4>
            <h1>Publish Date: {publishedDate}</h1>
            <div className="img-book-preview">
                <img src={book.thumbnail} alt={title} />
                { listPrice.isOnSale && <div className="on-sale">On Sale!</div> }
            </div>

        </article>        
    )

}