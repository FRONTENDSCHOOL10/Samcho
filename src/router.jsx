import { RootLayout, PrivateRoute } from '@/layouts';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import {
  BuddyManagement,
  Chart,
  ChartMoreList,
  DetailDiary,
  ErrorPage,
  Home,
  Login,
  Mypage,
  MyPageSetting,
  Newdiary,
  Notification,
  PhotoGallery,
  Post,
  Register,
  SearchDiary,
} from './pages';
import { Outlet } from 'react-router-dom';

/*@type {import('react-router-dom').RouteObject[]}*/
export const routes = [
  {
    path: '/',
    element: (
      <PrivateRoute>
        <RootLayout />
      </PrivateRoute>
    ),
    children: [
      { index: true, element: <Navigate to="/home/calendar" replace /> },
      {
        path: 'home',
        children: [
          { path: 'calendar', element: <Home /> },
          { path: 'list', element: <Home /> },
          { path: 'notification', element: <Notification /> },
          { path: 'search', element: <SearchDiary /> },
        ],
      },
      {
        path: 'chart',
        children: [
          { index: true, element: <Chart /> },
          { path: 'more', element: <ChartMoreList /> },
        ],
      },
      { path: 'post', element: <Post /> },
      {
        path: 'mypage',
        children: [
          { index: true, element: <Mypage /> },
          {
            path: 'setting',
            element: <MyPageSetting />,
          },
          {
            path: 'buddy-management',
            element: <BuddyManagement />,
          },
          { path: 'photo', element: <PhotoGallery /> },
        ],
      },
    ],
  },
  {
    path: 'diary',
    element: (
      <PrivateRoute>
        <Outlet />
      </PrivateRoute>
    ),
    children: [
      {
        path: 'detail/:id',
        element: <DetailDiary />,
      },
      { path: 'new', element: <Newdiary /> },
    ],
  },
  { path: 'login', element: <Login /> },
  { path: 'register', element: <Register /> },
  {
    path: 'reset-password',
    lazy: () => import('/src/pages/auth/ResetPassword.jsx'),
  },
  { path: '*', element: <ErrorPage /> },
];

const router = createBrowserRouter(routes);

export default router;
