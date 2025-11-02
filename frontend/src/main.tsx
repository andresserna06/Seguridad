import React from 'react'; // Importamos la librería principal de React para poder usar JSX y componentes.
import ReactDOM from 'react-dom/client'; // Importamos ReactDOM, que permite renderizar (mostrar) la aplicación React en el navegador.
// Importamos el componente BrowserRouter y lo renombramos como Router.
// Esto permite la navegación entre páginas sin recargar la página (Single Page Application).
import { BrowserRouter as Router } from 'react-router-dom'; // Importamos el componente BrowserRouter y lo renombramos como Router. Esto permite la navegación entre páginas sin recargar la página (Single Page Application)
import { Provider } from 'react-redux'; // Importamos Provider de react-redux Provider conecta toda la aplicación con el "store" (almacén global de datos) de Redux.
import { store } from './store/store';  // Importamos el store 

// Importamos el componente principal de la aplicación (App),
// que contiene todas las rutas, páginas y componentes.
import App from './App';
import './index.css';
import './satoshi.css';
// Linea 13 <Provider store={store}> envuelve la aplicación para que el store esté disponible en todos los componentes

// Creamos la raíz de React dentro del elemento HTML con id "root" y renderizamos la aplicación dentro.
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}> 
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>
);
