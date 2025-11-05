import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux'; // Importamos Provider de react-redux
import { store } from './store/store';  // Importamos el store que creaste
import App from './App';
import './index.css';
import './satoshi.css';
import { msalInstance } from './components/Auth/msalConfig'; // 👈 importa tu instancia configurada
import { LibraryProvider } from './context/LibraryContext'; // <-- importa el contexto

//  Inicializar MSAL antes de renderizar la app
msalInstance
  .initialize()
  .then(() => {
    ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
      <React.StrictMode>
        <LibraryProvider>      
          <Provider store={store}>
            <Router>
              <App />
            </Router>
          </Provider>
        </LibraryProvider>     
      </React.StrictMode>
    );
  })
  .catch((error: any) => {
    console.error("Error inicializando MSAL:", error);
  });