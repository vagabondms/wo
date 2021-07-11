import React from 'react';
import styled from 'styled-components';

const HeaderDiv = styled.div`
  grid-area: head;
  height: 120px;
  background: skyblue;
`;

const Header = () => {
  return <HeaderDiv>Header</HeaderDiv>;
};

export default Header;
