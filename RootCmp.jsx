
import { AppHeader } from "./cmps/AppHeader.jsx"
import { Home } from "./cmps/Home.jsx"
import { NotFound } from "./cmps/NotFound.jsx"
import { HomePage } from "./pages/HomePage.jsx"
import { BookIndex } from "./pages/BookIndex.jsx"
import { AboutUs } from "./pages/AboutUs.jsx"
import { BookDetails } from "./pages/BookDetails.jsx"
import { BookEdit } from "./pages/BookEdit.jsx"
import { AddReview } from "./cmps/AddReview.jsx"
import { UserMsg } from "./cmps/UserMsg.jsx"


const Router = ReactRouterDOM.HashRouter
const {Routes, Route, Navigate} =ReactRouterDOM

export function RootCmp() {

    return (
        <Router>

            <section className="app main-layout">
                <AppHeader />
                <main>
                    <Routes>
                        <Route path="/" element={<Navigate to="/home"/>}/>
                        <Route path="/home" element={<HomePage/>}/>
                        <Route path="/about" element={<AboutUs/>}/>
                        <Route path="/book" element={<BookIndex/>}/>
                        <Route path="/book/:bookId" element={<BookDetails />}>
                            <Route path="addReview" element={<AddReview />}/>
                        </Route>
                        <Route path="/book/edit" element={<BookEdit />}/>
                        <Route path="/book/edit/:bookId" element={<BookEdit />}/>
                    
                        <Route path="*" element={<NotFound />} />

                    </Routes>
                </main>
                <UserMsg/>
            </section>
        </Router>
    )
}