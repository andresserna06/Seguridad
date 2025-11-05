import { lazy } from 'react';

// Pages
const FormElements = lazy(() => import('../pages/Form/FormElements'));
const FormLayout = lazy(() => import('../pages/Form/FormLayout'));
const ListRoles = lazy(() => import('../pages/Roles/ListRole'));
const CreateRole = lazy(() => import('../pages/Roles/CreateRole'));
const UpdateRole = lazy(() => import('../pages/Roles/UpdateRole'));
const ListUserRole = lazy(() => import('../pages/UserRole/ListUserRole'));
const CreateUserRole = lazy(() => import('../pages/UserRole/CreateUserRole'));
const ListUsers = lazy(() => import('../pages/Users/ListUsers'));
const CreateUser = lazy(() => import('../pages/Users/create'));
const UpdateUser = lazy(() => import('../pages/Users/UpdateUsers'));
const AddressPage = lazy(() => import('../pages/Address/AddressPage'));
const PasswordPage = lazy(() => import('../pages/Password/PasswordPage'));
const ProfilePage = lazy(() => import('../pages/Users/Profile'));

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
];

const routes = [...coreRoutes];
export default routes;
