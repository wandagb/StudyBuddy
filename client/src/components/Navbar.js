import './Navbar.css'
import SearchBar from './SearchBar'

const Navbar = () => {
    return (
        <header class ="header">
            <div class = "navbar"> 
            <a class ="title" href="/home">FlashCard-App</a>
            <ul>
                <li>
                    <a class ="navbar__link" href="/home">Home</a>
                </li>
                <li>
                    <a class ="navbar__link"href="/create">Create</a>
                </li>
                <li>
                    <a class ="navbar__link"href="/explore">Explore</a>
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