import { useNavigate } from 'react-router-dom'

export const LoginPage = () => {
    
    const navigate = useNavigate();

    return (
        <>
        <div className='wrapper'>
            <h1>Login</h1>

            <form onSubmit={() => navigate("/home")}>
            <div className="input-box">
                <input type="text" placeholder="Username"/>
            </div>
            <div className="input-box">
                <input type="text" placeholder="Password"/>
            </div>

            <button type="submit">Login</button>
            </form>

        </div>
        </>

    );
}