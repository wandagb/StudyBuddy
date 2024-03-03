import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { FlashCardPage } from './pages/flashcardPage';
import { Home } from './pages/Home';
import { LoginPage } from './pages/LoginPage';
import { FlashcardSetPage } from './pages/FlashSet';
import Navbar from './components/Navbar';

function App(){

  return (
    <Router>
        <Navbar />
        <Routes>
            <Route path="/view-flashcard" element={<FlashCardPage />} />                  
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<LoginPage />} /> 
            <Route path="/set/:setID" element={<FlashcardSetPage />} />                    
        </Routes>
    </Router>
)
}

export default App;