export function AppHeader({ onSetPage }) {
    return(
        <header className="app-header container">
            <section>
            <h1>React Book App</h1>
            <nav className="app-nav">
                <a onClick={(ev) => onSetPage(ev, 'home')}>Home</a>
                <a onClick={(ev) => onSetPage(ev, 'about')}>About</a>
                <a onClick={(ev) => onSetPage(ev, 'book')}>Books</a>
            </nav>
            </section>
        </header>
    )
}