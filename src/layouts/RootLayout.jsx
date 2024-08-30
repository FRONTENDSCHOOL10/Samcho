import { Footer } from '@/components';
import { Outlet } from 'react-router-dom';

function RootLayout() {
  return (
    <>
      <Outlet />
      <Footer />
    </>
  );
}

export default RootLayout;
