
import React from 'react';
import { Outlet } from 'react-router-dom';
import PubNav from '../components/PubNav';

const MainLayout = () => {
  return (
    <div>
      <PubNav />
      <Outlet />
    </div>
  );
};

export default MainLayout;
