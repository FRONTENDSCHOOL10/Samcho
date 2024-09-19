import { Footer } from '@/components';
import { ScrollToTop } from '@/hooks';
import { Outlet } from 'react-router-dom';

function RootLayout() {
  ScrollToTop();

  return (
    <>
      <Outlet />
      <Footer />
    </>
  );
}

export default RootLayout;
