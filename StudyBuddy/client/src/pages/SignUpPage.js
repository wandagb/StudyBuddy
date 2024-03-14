import { useState } from 'react'
import { useSignup } from "../hooks/useSignUp"

export const SignupPage = () => {
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const {signup, error, isLoading} = useSignup()

    //creates new user after inputing email, username and password
    const handleSubmit = async (e) => {
        e.preventDefault()

        await signup(email, username, password)
    }

    return ( 
        <div className='form-container'>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
        
        <form className="Create" onSubmit={handleSubmit}>
        
            <h3>Sign up!</h3>
            
            <label>Email:</label>
            <input
                type="text"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className='search-box'
                />

            <label>username:</label>
            <input
                type="text"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                className= 'search-box'
                />

            <label>Password:</label>
            <input
                type="text"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className= 'search-box'
                />
                
            <button disabled={isLoading} className='submit-button'>Signup</button>
            {error && <div className="error"> {error} </div>}
        </form>
        </div>
    )
}