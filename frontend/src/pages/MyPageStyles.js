import styled from 'styled-components';
import { Link, NavLink} from 'react-router-dom';

//공백용
const Container = styled.div`
  margin-top: 80px;
  display: flex;
  height: 800px;
  width: 100%;
  z-index:3;
`;

const Container2 = styled.div`
  display: flex;
  position: absolute;
  top: 0;
  height: 500px;
  width: 100%;
  z-index:1;
  background: linear-gradient( to top, white, #43459d )
`;
//

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 20px;
  width: 100%;
  background-color: white;
  padding: 10px 20px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  z-index:3;
`;

const Nav = styled.nav`
  display: flex;
  justify-content: flex-end;
  margin-left: auto;
  z-index:3;
`;

const NavItem = styled(Link)`
  font-weight: bold;
  color: black;
  margin-right: 20px;
  text-decoration: none;
  z-index:3;
`;

const Title = styled.h1`
  font-weight: bold;
  font-size: 30px;
  color: black;
  margin-left: 20px;
  margin-top: 60px;
  position: absolute;
  z-index:3;
`;

const Main = styled.main`
  display: flex;
  flex-grow: 1;
  margin-top: 0px;
  overflow-y: auto;
  height: 890px;
  margin-left: 200px;
  z-index:3;
`;
const Sidebarwrap = styled.div`
  display: flex;
  flex-direction: column;
  border-right: 2px solid rgba(0, 0, 0, .2);
  width: 250px;
  margin-top: 40px;
  height: 790px;
  z-index:3;
`;

//사이드 table
const Sidebar = styled.div`
  margin-top: 120px;
  display: flex;
  flex-direction: column;
  padding: 10px;
  width: 150px;
  height: 400px;
  left: 100px;
  background-color: #fff;
  box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  z-index:3;
  justify-content: center;
  align-items: center;
`;

// 사이드쪽 이름 넣는칸
const SidebarItem = styled(NavLink)`
  font-weight: bold;
  color: black;
  font-size: 20px;
  display:flex;
  margin-bottom : 15px;
  width: 50px; 
  height: 100px;
  border-bottom: 1px solid #dcdcdc; 
  text-decoration: none;
  white-space: nowrap;
  justify-content: center;
  align-items: center;
  &.active {
    color: #007bff;
  }
  &:hover {
    transition: all 0.3s ease;
    font-size:25px;
  }
  z-index:3;
  
`;

const SidebarItemLast = styled(NavLink)`
font-weight: bold;
color: black;
font-size: 20px;
display:flex;
width: 50px; 
height: 100px; 
text-decoration: none;
white-space: nowrap;
justify-content: center;
align-items: center;
&.active {
  color: #007bff;
}
&:hover {
  transition: all 0.3s ease;
  font-size:25px;
}
z-index:3;

`;

const Content = styled.div`
  flex-grow: 1;
  padding: 20px;
  padding-left: 40px;
  z-index:3;
`;

//내정보용
const PageContainer = styled.div`
  background-color: #f9f9f9;
  padding: 20px;
  align-items: center;
  box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  margin-top: 20px;
  width: 1060px;
  height: 800px;
  z-index:3;
`;

export {
  Container,
  Header,
  Nav,
  NavItem,
  Title,
  Main,
  Sidebar,
  SidebarItem,
  Content,
  PageContainer,
  Sidebarwrap,
  Container2,
  SidebarItemLast
};