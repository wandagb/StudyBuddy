import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { LoginPage } from './pages/LoginPage';
import { FlashCardPage } from './pages/FlashCardPage';


export const Routing = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/create" element={<FlashCardPage />} />
                <Route path="*" element={<NotFoundPage />} />
                
            </Routes>
        </Router>
    )
    
}