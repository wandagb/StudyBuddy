import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthContextProvider } from './context/AuthContext';
import { SetsContextProvider } from './context/SetsContext';
import { CardsContextProvider } from './context/CardContext';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
    <SetsContextProvider>
    <CardsContextProvider>
    <App />
    </CardsContextProvider>
    </SetsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);