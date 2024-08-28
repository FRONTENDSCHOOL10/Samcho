import { Outlet } from 'react-router-dom';

function RootLayout() {
  return (
    <div className="">
      <Outlet />
    </div>
  );
}

export default RootLayout;
