
export function BookPreview({book}) {

    const { title, authors, publishedDate } = book

    return(
        <article className="book-preview">
            <h2>Title: {title}</h2>
            <h4>Authors: {authors}</h4>
            <h1>Publish Date: {publishedDate}</h1>
            <img src={book.thumbnail} alt={title} />
        </article>        
    )

}