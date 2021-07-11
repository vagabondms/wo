import React, { ReactNode } from 'react';

import SideBar from './SideBar/SideBar';
import Header from './Header/Header';

const AppLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <SideBar />
      <Header />
      <div>
        mainArea
        {children}
      </div>
    </div>
  );
};

export default AppLayout;
