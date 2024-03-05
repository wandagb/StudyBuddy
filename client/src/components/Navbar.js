import './Navbar.css'
import SearchBar from './SearchBar'

const Navbar = () => {
    return (
        <header className ="header">
            <div className = "navbar"> 
            <a className ="title" href="/home">FlashCard-App</a>
            <ul>
                <li>
                    <a className ="navbar__link" href="/home">Home</a>
                </li>
                <li>
                    <a className ="navbar__link"href="/create">Create</a>
                </li>
                <li>
                    <a className ="navbar__link"href="/explore">Explore</a>
                </li>
            </ul>
            <div className='search'>
            <SearchBar />
            </div>
            </div>
        </header>
    )
}

export default Navbar