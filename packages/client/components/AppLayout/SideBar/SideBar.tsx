import React from 'react';
import styled from 'styled-components';
import LogoSVG from '@icons/Logo.svg';
// import Part from '@icons/Part.svg';

import Separator from './Separator/Separator';
import Title from './Title/Title';

const SideBarDiv = styled.div`
  grid-area: side;
  height: 100vh;
  background: #26207e;
`;

const Logo = styled.div`
  height: 81px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SideMenuWrapper = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 400px;
`;

const SideBar = () => {
  return (
    <SideBarDiv>
      <Logo>
        <LogoSVG />
      </Logo>
      <SideMenuWrapper>
        <Title>Exercise</Title>
        <div>부위별운동리스트</div>
        <div>도구별운동리스트</div>
        <Separator />
        <Title>Records</Title>
        <div>운동별 기록</div>
        <div>날짜별 기록</div>
        <Separator />
        <Title>Programs</Title>
        <div>나의 프로그램</div>
        <div>프로그램 찾아보기</div>
      </SideMenuWrapper>
    </SideBarDiv>
  );
};

export default SideBar;
