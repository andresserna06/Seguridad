import { lazy } from 'react';


const Calendar = lazy(() => import('../pages/Calendar'));
const Chart = lazy(() => import('../pages/Chart'));
const FormElements = lazy(() => import('../pages/Form/FormElements'));
const FormLayout = lazy(() => import('../pages/Form/FormLayout'));
const Profile = lazy(() => import('../pages/Profile'));
const Settings = lazy(() => import('../pages/Settings'));
const ListRoles = lazy(() => import('../pages/Roles/List'));
const CreateRole = lazy(() => import('../pages/Roles/Create'));
const UpdateRole = lazy(() => import('../pages/Roles/Update'));
const Alerts = lazy(() => import('../pages/UiElements/Alerts'));
const Buttons = lazy(() => import('../pages/UiElements/Buttons'));

const ListUsers = lazy(() => import('../pages/Users/page'));
const CreatetUser = lazy(() => import('../pages/Users/create'));
const UpdatetUser = lazy(() => import('../pages/Users/update'));

const coreRoutes = [
  {
    path: '/calendar',
    title: 'Calendar',
    component: Calendar,
  },
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
    path: '/users',
    title: 'Users',
    component: ListUsers,
  },
  {
    path: '/users/create',
    title: 'Create User',
    component: CreatetUser,
  },
  {
    path: '/users/update/:id',
    title: 'Update User',
    component: UpdatetUser,
  }
  
];

const routes = [...coreRoutes];
export default routes;
