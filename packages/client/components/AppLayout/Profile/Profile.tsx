import React from 'react';
import styled from 'styled-components';
import ProfileIcon from '@icons/user.svg';

const ProfileWrapper = styled.div`
  display: flex;
  width: 220px;
  align-items: center;
  justify-content: space-between;
  font-weight: normal;
  font-size: 16px;
  color: #949cff;
`;

const Profile = () => {
  return (
    <ProfileWrapper>
      안녕하세요. 김민석님!
      <ProfileIcon />
    </ProfileWrapper>
  );
};

export default Profile;
