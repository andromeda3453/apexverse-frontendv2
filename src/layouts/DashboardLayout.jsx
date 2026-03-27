
import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

const DashboardLayout = () => {
  return (
    <div className="app">
      <Sidebar />
      <div className="mc2">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
