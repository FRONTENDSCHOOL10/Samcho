import { createBrowserRouter } from 'react-router-dom';
import { configRoutes } from '@/utils';
import RootLayout from '@/layouts/RootLayout';
import {
  Login,
  Register,
  Home,
  Chart,
  Mypage,
  Post,
  ChartMoreList,
  MyPageSetting,
} from './pages';

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
    text: '계정관리',
    path: 'mypage/setting',
    element: <MyPageSetting />
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
];

const router = createBrowserRouter(routes);

export default router;
