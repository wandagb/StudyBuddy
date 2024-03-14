import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Home } from './pages/Home';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignUpPage';
import { FlashcardSetPage } from './pages/FlashSetPage';
import { ExplorePage } from './pages/ExplorePage';
import { SetForm } from './pages/CreatePage'
import { useAuthContext } from './hooks/useAuthContext';
import { PageNotFound } from './pages/PageNotFound';
import Navbar from './components/Navbar';

function App(){
    const { user } = useAuthContext()
  return (
    <Router>
        <Navbar />
        <Routes>
            <Route exact path="/" element={!user ? <Navigate to="/login" /> : <Navigate to="/home" />} />
                <Route
                    path="*"
                    element={<PageNotFound />}
                />
            <Route path="/create" element= {<SetForm/>  } />                          
            <Route path="/home" element={!user ? <Navigate to="/login"/> : <Home />} />
            <Route path="/explore" element={<ExplorePage />} />
            <Route path="/signup" element={!user ? <SignupPage />: <Navigate to ="/home"/>} />
            <Route path="/login" element={!user ? <LoginPage />: <Navigate to ="/home"/>} /> 
            <Route path="/set/:setID" element={<FlashcardSetPage />} />                    
        </Routes>
    </Router>
)
}

export default App;