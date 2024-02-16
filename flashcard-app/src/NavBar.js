import { Link } from 'react-router-dom'

export const Navbar = () => {

    return (
        <nav>
            <Link to='/create'>Create</Link>
            <Link to='/home'>Home</Link>
        </nav>
    )

}