import React from 'react';
import styled from 'styled-components';

const SideBarDiv = styled.div`
  grid-area: side;
  height: 100vh;
  background: red;
`;

const SideBar = () => {
  return <SideBarDiv>SideBar</SideBarDiv>;
};

export default SideBar;
