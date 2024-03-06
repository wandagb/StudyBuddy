import './Navbar.css'
import SearchBar from './SearchBar'
import { useLogout } from '../hooks/useLogout'

const Navbar = () => {
    const { logout } = useLogout()
  
    const handleClick = () => {
      logout()
    }

    return (
        <header className ="header">
            <div className = "navbar"> 
            <a className ="title" href="/home">FlashCard-App</a>
            <ul>
                <nav>
                    <div>
                        <button onClick={handleClick}>Log out</button>
                    </div>
                <li>
                    <a class ="navbar__link" href="/login">Login</a>
                </li>
                <li>
                    <a class ="navbar__link" href="/signup">Signup</a>
                </li>
                </nav>
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