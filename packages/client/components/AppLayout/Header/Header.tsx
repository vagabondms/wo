import React from 'react';
import styled from 'styled-components';
// import Profile from '../../Profile/Profile';
import User from './user.svg';

const HeaderDiv = styled.div`
  grid-area: head;
  height: 120px;
  background: skyblue;
`;

const CustomUser = styled(User)`
  height: 10px;
`;

const Header = () => {
  return (
    <HeaderDiv>
      <CustomUser />
      Header
    </HeaderDiv>
  );
};
// ㅎㅏ 디자인 어렵

export default Header;
