import RootLayout from '@/layouts/RootLayout';
import { configRoutes } from '@/utils';
import { createBrowserRouter } from 'react-router-dom';
import {
  Chart,
  ChartMoreList,
  Home,
  Login,
  Mypage,
  Post,
  Register,
} from './pages';
import ErrorPage from './pages/ErrorPage';

/**@type {import('react-router-dom').RouteObject[]} */
const navigation = [
  {
    text: '홈',
    path: '',
    element: <Home />,
  },
  {
    text: '통계',
    path: 'chart',
    element: <Chart />,
  },
  {
    text: '통계',
    path: 'chart/more',
    element: <ChartMoreList />,
  },
  {
    text: '우편함',
    path: 'post',
    element: <Post />,
  },
  {
    text: '내정보',
    path: 'mypage',
    element: <Mypage />,
  },
  {
    text: '일기 상세',
    path: '/diary/detail',
    lazy: () => import('@/pages/Diary/DetailDiary'),
  },
  {
    text: '일기 작성',
    path: '/diary/new',
    lazy: () => import('@/pages/Diary/NewDiary'),
  },
  {
    text: '일기 수정',
    path: '/diary/edit',
    lazy: () => import('@/pages/Diary/EditDiary'),
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
  {
    path: '*',
    element: <ErrorPage />, // 에러 페이지 컴포넌트
  },
];

const router = createBrowserRouter(routes);

export default router;
