import { useDispatch } from 'react-redux';
import styled from '@emotion/styled';
import { Container, Icon, responsive, Text } from '@gilbarbara/components';

import { appColor, headerHeight } from '~/modules/theme';

import { logOut } from '~/actions';
import { Dropdown } from 'react-bootstrap';
import Logo from '~/components/Logo';
import { Link } from 'react-router-dom';

const HeaderWrapper = styled.header`
  background-color: #113740;
  height: ${headerHeight}px;
  left: 0;
  position: relative;
  right: 0;
  top: 0;
  z-index: 200;

  &:before {
    background-color: ${appColor};
    bottom: 0;
    content: '';
    height: 2px;
    left: 0;
    position: absolute;
    right: 0;
  }
`;

const NavbarList = styled.ul`
  display: flex;
  list-style: none;
  margin: 0;
  height: 100%;
  padding: 0;
  flex-grow: 1;
  justify-content: center;
  align-items: center;

  li {
    margin: 0 15px;
  }

  a {
    color: #fff;
    text-decoration: none;
    font-size: 14px;
    padding: 10px;

    ${responsive({ lg: { fontSize: '16px' } })};

    &:hover {
      text-decoration: underline;
    }
  }
`;

const Logout = styled.button`
  align-items: center;
  color: #fff;
  display: flex;
  font-size: 14px;

  ${responsive({ lg: { fontSize: '16px' } })};

  span {
    display: inline-block;
    text-transform: uppercase;
  }
`;

export default function Header({ isAuthenticated, userDetails }) {
  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(logOut());
  };

  return (
    <HeaderWrapper data-component-name="Header">
      <Container direction="row" justify="space-between" padding="md">
        <Logo />
        <nav>
          <NavbarList>
            <li>
              <Link to="/Home">Home</Link>
            </li>
            {!isAuthenticated ? (<> <li>
              <Link to="/register">Register</Link>
            </li>
              <li>

                <Link to="/login">Login</Link>

              </li></>)
              : (
                <>
                  <div className="container-fluid d-flex justify-content-between">

                    <Dropdown>
                      <Dropdown.Toggle variant="secondary" id="dropdown-admin">
                        {userDetails.username}
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item onClick={handleLogOut}>Logout</Dropdown.Item>
                        {
                          userDetails.user_role === "user"?<Dropdown.Item onClick={handleLogOut}>Applied jobs</Dropdown.Item>:""
                        }
                        <Dropdown.Item as={Link} to="/profile">
                          Profile
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                </>
              )}



          </NavbarList>
        </nav>
      </Container>
    </HeaderWrapper>
  );
}
