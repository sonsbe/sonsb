import React from 'react';
import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { Nav, NavItem, LogoWrapper, RightItems } from './NavbarStyles';
import { AuthContext } from '../../contexts/LoggedIn';

const Navbar = () => {

  const { isLoggedIn, toggleLogin } = useContext(AuthContext);

  const handleLoginButtonClick = () => {
    toggleLogin();
  };
  return (
    <LogoWrapper>
      <Nav>
      <NavItem exact to="/" activeClassName="active" style={{ marginRight: 'auto', marginLeft: '20%' }}>
          <img 
          src={process.env.PUBLIC_URL + '/img/logo13.png'} 
          alt="Logo"
          style={{ height: '40px'}} />
        </NavItem>
        <RightItems>
        {isLoggedIn ? (
            <>
              <NavItem to="/" onClick={handleLoginButtonClick}>
                로그아웃
              </NavItem>
            </>
          ) : (
            <>
              <NavItem to="/login" activeClassName="active">
                로그인
              </NavItem>
              <NavItem to="/signup" activeClassName="active">
                회원가입
              </NavItem>
            </>
          )}
          <NavItem to="/mypage" activeClassName="active">
            마이 페이지
          </NavItem>
          <NavItem to="userselectitem" activeClassName="active">
              게시판
          </NavItem>
          </RightItems>
          
      </Nav>
    </LogoWrapper>
  );
};

export default Navbar;

/*import React from 'react';
import { NavLink } from 'react-router-dom';
import { Nav, NavItem, NavLogo, LogoWrapper, NavItemLogo, Color } from './NavbarStyles';
import "./Navbar.css";

const Navbar = () => {
  return (
    <table className="abc">
      <LogoWrapper>
          <NavLogo>
            <NavItemLogo exact to="/" activeClassName="active">
                <img src="/img/logo.png" alt="상의1" width="100px" height="50px"></img>
            </NavItemLogo>
          </NavLogo>
          <Nav>
            <NavItem to="/login" activeClassName="active">
              로그인
            </NavItem>
            <NavItem to="/signup" activeClassName="active">
              회원가입
            </NavItem>
            <NavItem to="/mypage/myinfo" activeClassName="active">
              마이 페이지
            </NavItem>
            <NavItem to="userselectitem" activeClassName="active">
              게시판
            </NavItem>
          </Nav>
      </LogoWrapper>
    </table>
  );
};

export default Navbar;
*/