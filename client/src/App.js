import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { FlashCardPage } from './pages/flashcardPage';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Signup } from './pages/SignUp';
import { FlashcardSetPage } from './pages/FlashSet';
import { ExplorePage } from './pages/ExplorePage';
import {SetForm} from './pages/Create'
import Navbar from './components/Navbar';

function App(){

  return (
    <Router>
        <Navbar />
        <Routes>
            <Route path="/view-flashcard" element={<FlashCardPage />} />   
            <Route path="/create" element={<SetForm />} />                                 
            <Route path="/" element={<Home />} />
            <Route path="/explore" element={<ExplorePage />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} /> 
            <Route path="/set/:setID" element={<FlashcardSetPage />} />                    
        </Routes>
    </Router>
)
}

export default App;