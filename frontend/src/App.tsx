// Importamos React y varios hooks del core de React
import { Suspense, lazy, useEffect, useState } from 'react';

// Importamos componentes del router para manejar rutas
import { Route, Routes } from 'react-router-dom';
// Importamos el componente Toaster (de react-hot-toast) para mostrar notificaciones en pantalla
import { Toaster } from 'react-hot-toast';

// Importamos las páginas principales
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';

// Importamos el componente de carga (Loader) para mostrar mientras se cargan las páginas
import Loader from './common/Loader';

// Importamos el arreglo de rutas adicionales
import routes from './routes';

// Importamos un componente que protege rutas (solo accesibles si el usuario está autenticado)
import ProtectedRoute from "../src/components/Auth/ProtectedRoute";
import RolesList from './pages/Roles/ListRole';
import ListUsers from './pages/Users/ListUsers';

// Importamos el layout principal de la aplicación de forma "perezosa" (lazy loading),
// es decir, que se carga solo cuando se necesita.
const DefaultLayout = lazy(() => import('./layout/DefaultLayout'));

function App() {
   // useState crea un estado local llamado "loading" (inicialmente true)
  // que controlará si la aplicación está en modo de carga o ya lista.
  const [loading, setLoading] = useState<boolean>(true);

   // useEffect se ejecuta cuando el componente se monta.
  // Aquí simulamos un pequeño retraso de carga (1 segundo) antes de mostrar la app.
  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? ( // Si todavía está cargando, se muestra el componente Loader
    <Loader />
  ) : (
    <>
      {/* Toaster se encarga de mostrar mensajes tipo "toast" (notificaciones pequeñas) */}
      <Toaster 
        position="top-right"
        reverseOrder={false}
        containerClassName="overflow-auto"
      />

      {/* Aquí comienzan las rutas de la aplicación */}
      <Routes>

        {/* Rutas públicas (no requieren autenticación) */}
        <Route path="/auth/signin" element={<SignIn />} />
        <Route path="/auth/signup" element={<SignUp />} />

        {/* Rutas protegidas (requieren autenticación) */}
        <Route element={<ProtectedRoute />}>
          <Route element={<DefaultLayout />}>
            <Route index element={<ListUsers />} />
            {routes.map((routes, index) => {
              const { path, component: Component } = routes;
              return (
                <Route
                  key={index}
                  path={path}
                  element={
                    <Suspense fallback={<Loader />}>
                      <Component />
                    </Suspense>
                  }
                />
              );
            })}
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
