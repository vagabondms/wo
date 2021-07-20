import React from 'react';
import styled from 'styled-components';

const SelectedBox = styled.div`
  width: 114px;
  height: 34px;
  border-top: 5px solid #d5a629;
  color: #26207e;
  text-align: center;
  vertical-align: middle;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NonSelectedBox = styled.div`
  width: 114px;
  height: 34px;
  border-top: 5px solid #d4d7ff;
  color: #d4d7ff;
  text-align: center;
  vertical-align: middle;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SubHeaderWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const SubHeader = () => {
  return (
    <SubHeaderWrapper>
      <SelectedBox>
        <div>박스1</div>
      </SelectedBox>
      <NonSelectedBox>
        <div>박스2</div>
      </NonSelectedBox>
      <NonSelectedBox>
        <div>박스3</div>
      </NonSelectedBox>
      <NonSelectedBox>
        <div>박스4</div>
      </NonSelectedBox>
    </SubHeaderWrapper>
  );
};

export default SubHeader;
