import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const LogoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: #545699;

  
  z-index: 100;
`;

export const Nav = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem 0;
`;

export const NavItem = styled(NavLink)`
  margin: 0 1rem;
  text-decoration: none;
  font-size: 1rem;
  font-weight: bold;
  color: #fff;
  &.active {
    color: #fff;
  }
`;
export const RightItems = styled.div`
  margin-left: auto;
  margin-right: 20%;
`;

//헤더부분
/*export const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%; 
  background-color: #b5dcff;
  z-index: 100;
  justify-content: flex-end;
  opacity: 0.7;
`;

export const Color = styled.nav`
  display: flex;
  position: absoulte;
  align-items: center;
  top: 0;
  left: 0;
  right: 0;
  width: 100%; 
  background-color: #b5dcff;
  z-index: 100;
`;

export const NavLogo = styled.nav`
  display: flex;
  align-items: center;
  padding: 1rem 0;
  margin-right: 800px;
  width: 150px;
`;

export const Nav = styled.nav`
  display: flex;
  align-items: center;
  padding: 1rem 0;
  margin-right: 300px;
  width: auto;
`;

export const NavItemLogo = styled(NavLink)`
  margin: 0 1rem;
  text-decoration: none;
  font-size: 1rem;
  font-weight: bold;
  color: #fff;
  &.active {
    color: #fff;
  }
`;

export const NavItem = styled(NavLink)`
  margin: 0 1rem;
  text-decoration: none;
  font-size: 1.25rem;
  font-weight: bold;
  color: #000000;
  &.active {
    color: #fff;
  }
`;*/