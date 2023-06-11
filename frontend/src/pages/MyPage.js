import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MyInfo from '../components/Mypage/MyInfo';
import Timeline from '../components/Mypage/Timeline';
import Favorites from '../components/Mypage/Favorites';
import InterestedProducts from '../components/Mypage/InterestedProducts';

import {
  Container,
  Main,
  Sidebar,
  SidebarItem,
  Content,
  PageContainer,
  Sidebarwrap,
  Container2,
  SidebarItemLast,
} from './MyPageStyles';

const Mypage = () => {
  return (
    <>
      <Container2>
        
      </Container2>
      <Container>
        <Main>
          <Sidebarwrap>
            <Sidebar>
              <SidebarItem to="/mypage/myinfo">내 정보</SidebarItem>
              <SidebarItem to="/mypage/timeline">타임라인</SidebarItem>
              <SidebarItem to="/mypage/favorites">찜 목록</SidebarItem>
              <SidebarItemLast to="/mypage/interested-products">추천 상품</SidebarItemLast>
            </Sidebar>
          </Sidebarwrap>
          <Content>
            <PageContainer>
              <Routes>
                <Route path="myinfo" element={<MyInfo />} />
                <Route path="timeline" element={<Timeline />} />
                <Route path="favorites" element={<Favorites />} />
                <Route path="interested-products" element={<InterestedProducts />} />
              </Routes>
            </PageContainer>
          </Content>
        </Main>
      </Container>
    </>
  );
};

export default Mypage;





