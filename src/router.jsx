import RootLayout from '@/layouts/RootLayout';
import { createBrowserRouter } from 'react-router-dom';
import {
  Chart,
  ChartMoreList,
  Home,
  Login,
  Mypage,
  Post,
  MyPageSetting,
  Register,
  ErrorPage,
  BuddyManagement,
  PhotoGallery,
} from './pages';

/**@type {import('react-router-dom').RouteObject[]} */
export const routes = [
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { path: '', element: <Home /> },
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
          { path: 'detail', lazy: () => import('@/pages/diary/DetailDiary') },
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
