import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { FlashCardPage } from './pages/flashcardPage';
import { Home } from './pages/Home';


function App(){

  return (
    <Router>
        <Routes>
            <Route path="/create" element={<FlashCardPage />} />
            <Route path="/home" element={<Home />} />                   
        </Routes>
    </Router>
)
}

export default App;