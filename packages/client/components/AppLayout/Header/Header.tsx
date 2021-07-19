import React from 'react';
import styled from 'styled-components';

import User from '@icons/user.svg';
import SubHeader from '../SubHeader/SubHeader';

const HeaderDiv = styled.div`
  grid-area: head;
  height: 144px;
  background: skyblue;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 47px;
  padding-left: 90px;
  font-weight: bold;
  font-size: 20px;
  color: #26207e;
`;

const ProfileWrapper = styled.div`
  display: flex;
  width: 220px;
  align-items: center;
  justify-content: space-between;
  font-weight: normal;
  font-size: 16px;
  color: #949cff;
`;

const Header = () => {
  return (
    <HeaderDiv>
      공유
      <ProfileWrapper>
        안녕하세요. 김민석님!
        <User />
      </ProfileWrapper>
      <SubHeader />
    </HeaderDiv>
  );
};
// ㅎㅏ 디자인 어렵

export default Header;
