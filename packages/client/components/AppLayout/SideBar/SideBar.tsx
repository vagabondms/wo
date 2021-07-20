import React from 'react';
import styled from 'styled-components';
import LogoSVG from '@icons/Logo.svg';
import PartSVG from '@icons/Part.svg';
import WeightSVG from '@icons/Weight.svg';
import ByExerciseSVG from '@icons/ByExercise.svg';
import MyProgramSVG from '@icons/MyProgram.svg';
import SearchProgramSVG from '@icons/SearchProgram.svg';

import Separator from './Separator/Separator';

import MenuButton from './MenuButton/MenuButton';
import SubMenuWrapper from './SubMenuWrapper/SubMenuWrapper';

const SideBarDiv = styled.div`
  grid-area: side;
  height: 100vh;
  background: #26207e;
`;

const Logo = styled.div`
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MenuWrapper = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 450px;

  & SVG {
    height: 25px;
    width: 25px;
  }
`;

const SideBar = () => {
  return (
    <SideBarDiv>
      <Logo>
        <LogoSVG />
      </Logo>
      <MenuWrapper>
        <SubMenuWrapper title="Exercise">
          <MenuButton text="부위별 운동리스트">
            <PartSVG />
          </MenuButton>
          <MenuButton text="도구별 운동리스트">
            <WeightSVG />
          </MenuButton>
        </SubMenuWrapper>
        <Separator />
        <SubMenuWrapper title="Records">
          <MenuButton text="운동별 기록">
            <ByExerciseSVG />
          </MenuButton>
        </SubMenuWrapper>
        <Separator />
        <SubMenuWrapper title="Programs">
          <MenuButton text="나의 프로그램">
            <MyProgramSVG />
          </MenuButton>
          <MenuButton text="프로그램 찾아보기">
            <SearchProgramSVG />
          </MenuButton>
        </SubMenuWrapper>
        <Separator />
      </MenuWrapper>
    </SideBarDiv>
  );
};

export default SideBar;
