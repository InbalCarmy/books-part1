

export function HomePage() {
    const img = `../assets/img/home-img.png`

     return (
        <section className="home-page">
            <h1>Welcome To Miss Books!</h1>
            <img src={img} alt="books-image" />
        </section>
        
     )
}