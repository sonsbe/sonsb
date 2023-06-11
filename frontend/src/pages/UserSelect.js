import React from 'react';
import { Route, Routes} from 'react-router-dom';
import UserSelectItem from '../components/Mypage/UserSelectItem';

import {
  Container,
  Main,
  Content,
  PageContainer,
  Container2,
} from './UserSelectStyles';

const UserSelect = () => {
  return (
    <>
      <Container2>
        
      </Container2>
      <Container>
        <Main>
          <Content>
            <PageContainer>
              <Routes>
                <Route path="/" element={<UserSelectItem />} /> 
              </Routes>
            </PageContainer>
          </Content>
        </Main>
      </Container>
    </>
  );
};

export default UserSelect;