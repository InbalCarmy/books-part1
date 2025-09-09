import { LongTxt } from "../cmps/LongTxt.jsx"
const {Link, Outlet} = ReactRouterDOM


export function AboutUs() {

     return (
        <section className="about-us">
            <h1>about Books and Us..</h1>
            <LongTxt 
                txt="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tempore officiis dolorem architecto sed vel, ducimus cupiditate id hic voluptate quibusdam iure dolor iusto expedita nobis consectetur reiciendis culpa itaque molestias adipisci modi voluptatum at accusamus autem. Molestias rerum minima voluptatibus dignissimos nulla corporis voluptas accusantium unde dolore doloremque quod quidem pariatur aperiam placeat excepturi obcaecati modi, sunt, mollitia tenetur numquam ipsa porro. Officia reprehenderit delectus asperiores, unde nostrum quam consectetur labore sed voluptas aliquam eveniet assumenda sapiente optio obcaecati veniam in totam enim inventore, accusamus est iusto velit necessitatibus quibusdam! Nemo asperiores aliquam incidunt quam eum molestias modi necessitatibus tempore." 
                length={300}
            />
            <nav>
                <Link to='/about/team'>About the Team</Link>
                <Link to='/about/goal'>About the Goal</Link>
            </nav>
            <Outlet/>

        </section>
     )
}