import React from 'react';
import Header from './Header';

interface AppLayoutProps {
  children: React.ReactNode
}

const AppLayout = ({children}:AppLayoutProps ) => {
  return (
    <div>
      <Header/>
      <div className="layout__wrapper">
        {children}
      </div>
    </div>
  );
};

export default AppLayout;
