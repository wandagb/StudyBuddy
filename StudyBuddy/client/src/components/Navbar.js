import './styling/Navbar.css'
import SearchBar from './SearchBar'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'
import { useNavigate } from 'react-router-dom';
import mainLogo from "./styling/logo.png"

// Navigation bar component

const Navbar = () => {
    const { logout } = useLogout()
    const { user } = useAuthContext()
    const navigate = useNavigate(); 

    const handleClick = () => {
      logout();
      navigate('/home/');
    }

    return (
        <header className ="header">
            <div className = "navbar"> 
            <a className ="title" href="/home">StudyBuddy</a>
            <img className = "logo" src={mainLogo} alt="Logo"></img>
            <ul>     

                {!user && (
                    <li>
                    <a className ="navbar__link" href="/login">Login</a>
                </li>
                
                )}
                {!user && (
                <li>
                    <a className ="navbar__link" href="/signup">Signup</a>
                </li>)}
                {user && (
                <li>
                    <a className ="navbar__link" href="/home">Home</a>
                </li>
                )}
                {user && (
                <li>
                    <a className ="navbar__link"href="/create">Create</a>
                </li>
                )}
                <li>
                    <a className ="navbar__link"href="/explore">Explore</a>
                </li>
            </ul>
            <div className='search'>
                <SearchBar />
            </div>
          
            {user &&
                (<div>
                    <button className="logout-button" onClick={handleClick}>Log out</button>
                </div>)
                
            }
            </div>
        </header>
    )
}

export default Navbar