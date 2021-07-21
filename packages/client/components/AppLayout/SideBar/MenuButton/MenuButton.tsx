import React, { ReactChild } from 'react';
import styled from 'styled-components';

const MenuButtonWrapper = styled.div`
  font-weight: bold;
  height: 40px;
  font-size: 15px;
  display: flex;
  color: #ffffff;
  align-items: center;
  & > * {
    margin-right: 11px;
  }
`;

const MenuButton = ({ children, text }: { children: ReactChild; text: string }) => {
  return (
    <MenuButtonWrapper>
      {children}
      <div>{text}</div>
    </MenuButtonWrapper>
  );
};

export default MenuButton;
