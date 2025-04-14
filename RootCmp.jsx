const { useState } = React

import { AppHeader } from "./cmps/AppHeader.jsx"
import { Home } from "./pages/Home.jsx"
import { About } from "./pages/About.jsx"
import { BookIndex } from "./pages/BookIndex.jsx"

export function RootCmp() {

    const [page, setPage] = useState('home')

    function onSetPage(ev, page) {
        ev.preventDefault()
        setPage(page)
    }

    return(
        <section className="app">
            <AppHeader onSetPage={onSetPage}/>

            <main>
                {page === 'home' && <Home />}
                {page === 'about' && <About />}
                {page === 'book' && <BookIndex />}
            </main>
        </section>
    )
}