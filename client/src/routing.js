import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { FlashCardPage } from './flashcardPage';



export const Routing = () => {
    return (
        <Router>
            <Routes>
                <Route path="/create" element={<FlashCardPage />} />                
            </Routes>
        </Router>
    )
    
}

