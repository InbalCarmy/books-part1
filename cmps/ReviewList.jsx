const { useState } = React

export function ReviewList({ reviews, maxReviews = 2}) {
    const [isExpanded, setIsExpanded] = useState(false)
    // const maxReviews = 2
    
    const displayedReviews = isExpanded ? reviews : reviews.slice(0, maxReviews)
    const hasMoreReviews = reviews.length > maxReviews

    function toggleExpanded() {
        setIsExpanded(!isExpanded)
    }

    return (
        <section className="reviews">
            <h3>Reviews:</h3>
            {displayedReviews.map((review, idx) => (
                <div key={idx} className="review">
                    <p><strong>{review.fullname}</strong> - Rating: {review.rate}/5</p>
                    <p>Read on: {review.readAt}</p>
                </div>
            ))}
            {hasMoreReviews && (
                <button onClick={toggleExpanded}>
                    {isExpanded ? 'Show Less' : `Show ${reviews.length - maxReviews} More Reviews`}
                </button>
            )}
        </section>
    )
}