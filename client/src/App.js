import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { FlashCardPage } from './pages/flashcardPage';
import { Home } from './pages/Home';
import { LoginPage } from './pages/LoginPage';


function App(){

  return (
    <Router>
        <Routes>
            <Route path="/create" element={<FlashCardPage />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<LoginPage />} />                   
        </Routes>
    </Router>
)
}

export default App;