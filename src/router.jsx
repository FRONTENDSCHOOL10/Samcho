import { createBrowserRouter } from 'react-router-dom';
import { configRoutes, getNavigationItems } from '@/utils';
import RootLayout from '@/layouts/RootLayout';

import { Login, Register, Home } from './pages';

/**@type {import('react-router-dom').RouteObject[]} */
const navigation = [
  {
    text: '홈',
    path: '',
    element: <Home />,
  },
];

/**@type {import('react-router-dom').RouteObject[]} */
export const routes = [
  {
    path: '/',
    element: <RootLayout />,
    children: configRoutes(navigation),
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
];

const router = createBrowserRouter(routes, {
  basename: import.meta.env.BASE_URL,
});

export default router;

export const navigationItems = getNavigationItems(navigation);
