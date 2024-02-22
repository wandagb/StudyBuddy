import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { FlashCardPage } from './flashcardPage';


function App(){

  return (
    <Router>
        <Routes>
            <Route path="/create" element={<FlashCardPage />} />                
        </Routes>
    </Router>
)
}

export default App;