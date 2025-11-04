import { lazy } from 'react';


const FormElements = lazy(() => import('../pages/Form/FormElements'));
const FormLayout = lazy(() => import('../pages/Form/FormLayout'));
const Profile = lazy(() => import('../pages/Profile'));
const ListRoles = lazy(() => import('../pages/Roles/ListRole'));
const CreateRole = lazy(() => import('../pages/Roles/CreateRole'));
const UpdateRole = lazy(() => import('../pages/Roles/UpdateRole'));
const ListUserRole = lazy(() => import('../pages/UserRole/ListUserRole'));
const CreateUserRole = lazy(() => import('../pages/UserRole/CreateUserRole'));

const ListUsers = lazy(() => import('../pages/Users/ListUsers'));
const CreateUser = lazy(() => import('../pages/Users/CreateUsers'));
const UpdatetUser = lazy(() => import('../pages/Users/UpdateUsers'));
const AddressPage = lazy(() => import('../pages/Address/AddressPage'));

const coreRoutes = [
  
  {
    path: '/profile',
    title: 'Profile',
    component: Profile,
  },
  {
    path: '/forms/form-elements',
    title: 'Forms Elements',
    component: FormElements,
  },
  {
    path: '/forms/form-layout',
    title: 'Form Layouts',
    component: FormLayout,
  },
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
  {
    path: '/roles/update/:id',
    title: 'Update Role',
    component: UpdateRole,
  },
  {
    path: '/user-roles/:id',
    title: 'User Role',
    component: ListUserRole,
  },
  {
    path: '/user-roles/:id/create',
    title: ' Create User Role',
    component: CreateUserRole,
  },

  {
    path: '/users',
    title: 'Users',
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
    component: UpdatetUser,
  },
  {
    path: '/users/address/:id',
  title: 'User Address',
  component: AddressPage,
}

  
];

const routes = [...coreRoutes];
export default routes;
