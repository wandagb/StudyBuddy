import { useState} from "react"
import { useLogin } from "../hooks/useLogin"
import '../components/styling/Login.css'

export const LoginPage = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const {login, error, isLoading} = useLogin()
    

    const handleSubmit = async (e) => {
        e.preventDefault()

        await login(username, password)
    }

    return (
        <div className='form-container'>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
        
            <form className="Create" onSubmit={handleSubmit}>
            <h3>User Login</h3>
            <label>Username:</label>
            <input
                type="text"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                className = 'search-box'
                />

            <label>Password:</label>
            <input
                type="text"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className = 'search-box'
                />
            <button disabled={isLoading} className='submit-button'>Login</button>
            {error && <div className="error"> {error} </div>}
        </form>
        
        <div className="link-container">
            <p>Don't have an account?</p>
            <a href="/SignUp" className="signup-link">Sign up</a>
        </div>

        </div>
    )
}