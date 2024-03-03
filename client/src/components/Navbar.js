import './Navbar.css'

const Navbar = () => {

    return (
        <header class ="header">
            <div class = "navbar"> 
            <div class ="title">FlashCard-App</div>
            <ul>
                <li>
                    <a class ="navbar__link" href="/home">Home</a>
                </li>
                <li>
                    <a class ="navbar__link"href="/create">Create</a>
                </li>
            </ul>

            <div className ='search-box'>
                <input type="text" placeholder='Search'/>
            </div>
            </div>
        </header>
    )
}

export default Navbar