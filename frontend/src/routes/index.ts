import { patch } from '@mui/material';
import { Component, lazy } from 'react';
import SignIn from '../pages/Authentication/SignIn';

// Pages
const FormElements = lazy(() => import('../pages/Form/FormElements'));
const FormLayout = lazy(() => import('../pages/Form/FormLayout'));
const ListRoles = lazy(() => import('../pages/Roles/ListRole'));
const CreateRole = lazy(() => import('../pages/Roles/CreateRole'));
const UpdateRole = lazy(() => import('../pages/Roles/UpdateRole'));
const ListUserRole = lazy(() => import('../pages/UserRole/ListUserRole'));
const CreateUserRole = lazy(() => import('../pages/UserRole/CreateUserRole'));
const ListUsers = lazy(() => import('../pages/Users/ListUsers'));
const CreateUser = lazy(() => import('../pages/Users/CreateUsers'));
const UpdateUser = lazy(() => import('../pages/Users/UpdateUsers'));
const AddressPage = lazy(() => import('../pages/Address/AddressPage'));
const PasswordPage = lazy(() => import('../pages/Password/PasswordPage'));
const ProfilePage = lazy(() => import('../pages/Profile/Profile'));
const AllSessionsPage = lazy(() => import('../pages/Sessions/AllSessionsPage'));
const ListPermissions = lazy(() => import('../pages/Permissions/ListPermissions'));
const CreatePermission = lazy(() => import('../pages/Permissions/CreatePermission'));
const UpdatePermission = lazy(() => import('../pages/Permissions/UpdatePermission'));
const RolePermissions = lazy(() => import('../pages/RolePermissions/RolePermissions'));
const CreateSession = lazy(() => import('../pages/Sessions/CreateSession'));
const UpdateSession = lazy(() => import('../pages/Sessions/UpdateSession'));

// Components
const TailwindUserProfile = lazy(() => import('../components/common/TailWind/TailwindProfile'));

const coreRoutes = [
  // Perfil
  {
    path: '/profile',
    title: 'Profile',
    component: TailwindUserProfile,
  },

  // Formularios
  {
    path: '/forms/form-layout',
    title: 'Form Layouts',
    component: FormLayout,
  },
  {
    path: '/forms/form-elements',
    title: 'Form Elements',
    component: FormElements,
  },

  // Roles
  {
    path: '/roles',
    title: 'Roles',
    component: ListRoles,
  },
  {
    path: '/roles/create',
    title: 'Create Role',
    component: CreateRole,
  },
  {
    path: '/roles/update/:id',
    title: 'Update Role',
    component: UpdateRole,
  },

  // User Roles
  {
    path: '/user-roles/:id',
    title: 'User Role',
    component: ListUserRole,
  },
  {
    path: '/user-roles/:id/create',
    title: 'Create User Role',
    component: CreateUserRole,
  },

  {
    path: '/users/list',
    title: 'List Users',
    component: ListUsers,
  },
  {
    path: '/users/create',
    title: 'Create User',
    component: CreateUser,
  },
  {
    path: '/users/update/:id',
    title: 'Update User',
    component: UpdateUser,
  },
  {
    path: '/users/address/:id',
  title: 'User Address',
  component: AddressPage,
},
{
  path: '/users/password/:id',
  title: 'User Password',
  component: PasswordPage,
},

{
  path: '/users/address/:id',
  title: 'User Address',
  component: AddressPage,
},
  {
    path: '/profile/:id',
    title: 'Perfil',
    component: ProfilePage,
  },
  {
    path: 'singIn',
    title: 'Iniciar Sesión',
    component: SignIn,
  },
  {
    path: "/sessions",
    title: "Todas las sesiones",
    component: AllSessionsPage,
  },
  {
    path: "/sessions/create",
    title: "Crear sesion",
    component: CreateSession,
  },
  {
    path: "/sessions/update/:id",
    title: "Actualizar sesion",
    component: UpdateSession,
  },

  {
    path: "/permissions",
    title: "Todos los permisos",
    component: ListPermissions,
  },
  {
    path: "/permissions/create",
    title: "Crear Permiso",
    component: CreatePermission,
  },
  {
    path: "/permissions/update/:id",
    title: "Actualizar Permiso",
    component: UpdatePermission,
  },
    {
    path: "/roles/:id/permissions",
    title: "Role Permissions",
    component: RolePermissions,
  },

];

const routes = [...coreRoutes];
export default routes;
