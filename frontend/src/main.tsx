import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import './index.css';
import './satoshi.css';
import { msalInstance } from './components/Auth/msalConfig'; // 👈 importa tu instancia configurada

// ⚠️ Asegúrate de inicializar antes de renderizar la app
msalInstance.initialize().then(() => {
  ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
      <Router>
        <App />
      </Router>
    </React.StrictMode>
  );
});
