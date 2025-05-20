import React from 'react';
import ReactDOM from 'react-dom/client'; // Use the new API
import App from './App';
import './styles/App.css';
import { AuthProvider } from './context/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root')); // Create a root
root.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);