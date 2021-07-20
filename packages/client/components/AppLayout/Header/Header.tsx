import React from 'react';
import styled from 'styled-components';

import SubHeader from '../SubHeader/SubHeader';
import PageIndicator from '../PageIndicator/PageIndicator';
import Profile from '../Profile/Profile';

const HeaderWrapper = styled.div`
  grid-area: head;
  height: 94px;
  background: skyblue;
  display: flex;
  flex-direction: column;
`;

const MainHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50%;
  margin-left: 90px;
  margin-right: 47px;
`;

const Header = () => {
  return (
    <HeaderWrapper>
      <MainHeader>
        <PageIndicator />
        <Profile />
      </MainHeader>
      <SubHeader />
    </HeaderWrapper>
  );
};

export default Header;
