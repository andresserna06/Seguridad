import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux'; // Importamos Provider de react-redux
import { store } from './store/store';  // Importamos el store que creaste
import App from './App';
import './index.css';
import './satoshi.css';
// Linea 13 <Provider store={store}> envuelve la aplicación para que el store esté disponible en todos los componentes

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}> 
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>
);
