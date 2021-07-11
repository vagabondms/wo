import React, { ReactNode } from 'react';
import styled from 'styled-components';

import SideBar from './SideBar/SideBar';
import Header from './Header/Header';

const Container = styled.div`
  display: grid;
  grid-template-columns: 230px 4fr 1fr;

  grid-template-areas:
    'side head head'
    'side body body'
    'side body body';
`;

const AppLayout = ({ children }: { children: ReactNode }) => {
  return (
    <Container>
      <Header />
      <SideBar />
      <div>
        mainArea
        {children}
      </div>
    </Container>
  );
};

export default AppLayout;
