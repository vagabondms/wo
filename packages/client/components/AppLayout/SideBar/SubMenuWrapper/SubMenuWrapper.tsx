import React, { ReactChild } from 'react';
import styled from 'styled-components';

const Title = styled.div`
  color: #ffffff;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  display: flex;
  height: 40px;
  letter-spacing: 4px;
`;

const StyledSubMenuWrapper = styled.div`
  margin-left: 30px;
`;

const SubMenuWrapper = ({
  title,
  children,
}: {
  title: string;
  children: ReactChild[] | ReactChild;
}) => {
  return (
    <StyledSubMenuWrapper>
      <Title>{title}</Title>
      {children}
    </StyledSubMenuWrapper>
  );
};

export default SubMenuWrapper;
