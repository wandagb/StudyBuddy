import './Navbar.css'
import SearchBar from './SearchBar'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'

const Navbar = () => {
    const { logout } = useLogout()
    const { user } = useAuthContext()
  
    const handleClick = () => {
      logout()
    }

    return (
        <header className ="header">
            <div className = "navbar"> 
            <a className ="title" href="/home">FlashCard-App</a>
            <ul>     
                
                {user && (<span>{user.email}</span>) &&(<div>
                    <button onClick={handleClick}>Log out</button>
                </div>)}
                {!user && (
                    <li>
                    <a className ="navbar__link" href="/login">Login</a>
                </li>
                
                )}
                {!user && (
                <li>
                    <a className ="navbar__link" href="/signup">Signup</a>
                </li>)}
            
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