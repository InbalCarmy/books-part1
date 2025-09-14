
import { bookService } from "../services/book.service.js"
// import {Chart} from '../cmps/Chart.jsx'

const {useEffect, useState} = React

export function Dashboard() {
    const [books, setBooks] = useState(null)
    const [catStatus, setCatStatus] = useState([])
    
    useEffect(() => {
        bookService.query()
            .then(setBooks)
            .catch(err => console.log('Error loading books:', err))
        bookService.getCatStatus()
            .then(setCatStatus)
    }, [])
    



    if(!books) return <div className="loading">Loading...</div>    
    return (
        <section className="dashboard">
            <h1>Dashboard</h1>
            <ul className="chart">
                {
                    catStatus.map((item) => 
                    <li key={item.title}>
                        <span title={item.title}
                            style={{ height: item.value + '%' }}>
                                {item.value + '%'}
                        </span>
                    </li>
                    )}
            </ul>
        </section>
    )
}

