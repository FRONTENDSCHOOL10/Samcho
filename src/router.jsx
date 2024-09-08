import RootLayout from '@/layouts/RootLayout';
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
  Notification,
  PhotoGallery,
  Post,
  Register,
} from './pages';

/**@type {import('react-router-dom').RouteObject[]} */
export const routes = [
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <Navigate to="/home/calendar" replace /> },
      {
        path: 'home',
        children: [
          { path: 'calendar', element: <Home viewMode="calendar" /> },
          { path: 'list', element: <Home viewMode="list" /> },
          { path: 'notification', element: <Notification /> },
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
          { path: 'setting', element: <MyPageSetting /> },
          { path: 'buddy-management', element: <BuddyManagement /> },
          { path: 'photo', element: <PhotoGallery /> },
        ],
      },
      {
        path: 'diary',
        children: [
          { path: 'detail/:id', element: <DetailDiary /> },
          { path: 'new', lazy: () => import('@/pages/diary/NewDiary') },
          { path: 'edit', lazy: () => import('@/pages/diary/EditDiary') },
        ],
      },
    ],
  },
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> },
  { path: '*', element: <ErrorPage /> },
];

const router = createBrowserRouter(routes);

export default router;
