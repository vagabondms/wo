import React from 'react';
import styled from 'styled-components';

const TitleWrapper = styled.div`
  padding-left: 27px;
  color: #ffffff;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  display: flex;
  letter-spacing: 4px;
`;

const Title = ({ children }: { children: string }) => {
  return <TitleWrapper>{children}</TitleWrapper>;
};

export default Title;
