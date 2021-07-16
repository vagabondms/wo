import React from 'react';
import styled from 'styled-components';

import User from '@icons/user.svg';

const HeaderDiv = styled.div`
  grid-area: head;
  height: 120px;
  background: skyblue;
`;

const CustomUser = styled(User)`
  height: 10px;
  color: blue;
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
