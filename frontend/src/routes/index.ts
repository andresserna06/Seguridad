import { lazy } from 'react';

const Chart = lazy(() => import('../pages/Chart'));
const FormLayout = lazy(() => import('../pages/Form/FormLayout'));
const TailwindUserProfile = lazy(() => import('../components/TailWind/TailwindProfile'));
const Settings = lazy(() => import('../pages/Settings'));
const Alerts = lazy(() => import('../pages/UiElements/Alerts'));
const Buttons = lazy(() => import('../pages/UiElements/Buttons'));

const ListUsers = lazy(() => import('../pages/Users/ListUsers'));
const CreateUser = lazy(() => import('../pages/Users/Create'));
const UpdateUser = lazy(() => import('../pages/Users/Update'));
const ProfilePage = lazy(() => import('../pages/Users/Profile'));

const coreRoutes = [
  {
    path: '/profile',
    title: 'Profile',
    component: TailwindUserProfile,
  },
  {
    path: '/forms/form-layout',
    title: 'Form Layouts',
    component: FormLayout,
  },
  {
    path: '/settings',
    title: 'Settings',
    component: Settings,
  },
  {
    path: '/chart',
    title: 'Chart',
    component: Chart,
  },
  {
    path: '/ui/alerts',
    title: 'Alerts',
    component: Alerts,
  },
  {
    path: '/ui/buttons',
    title: 'Buttons',
    component: Buttons,
  },
  {
    path: '/users/list',
    title: 'List Users',
    component: ListUsers,
  },
  {
    path: '/users/profile/:id',
    title: 'Perfil',
    component: ProfilePage,

  },
  {
  path: '/users/create',
  tittle: 'Create User',
  component: CreateUser,
  },
  {
    path: '/users/update/:id',
    title: 'Update Users',
    component: UpdateUser,
  },
];

const routes = [...coreRoutes];
export default routes;
