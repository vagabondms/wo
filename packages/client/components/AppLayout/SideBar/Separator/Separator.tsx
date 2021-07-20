import React from 'react';
import styled from 'styled-components';

const SeparatorWrapper = styled.div`
  height: 10px;
  display: flex;
  justify-content: center;
  margin-bottom: 40px;

  & > div {
    height: 50%;
    width: 166px;
    border-bottom: 2px solid #e8eafe;
  }
`;

const Separator = () => {
  return (
    <SeparatorWrapper>
      <div />
    </SeparatorWrapper>
  );
};

export default Separator;
