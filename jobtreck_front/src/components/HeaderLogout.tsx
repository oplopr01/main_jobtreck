import { useDispatch } from 'react-redux';
import { useNavigate, Outlet } from 'react-router-dom';
import { logOut } from '~/actions';
import { Link } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
 
function HeaderLogout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
 
  const handleLogOut = () => {
    dispatch(logOut());
    localStorage.removeItem('token');
    navigate('/login');
  };
 
  return (
    <div>
      <nav className="navbar navbar-dark bg-dark">
        <div className="container-fluid d-flex justify-content-between">
          <Link to="/" className="navbar-brand">
            Job_Trek
          </Link>
          <Dropdown>
            <Dropdown.Toggle variant="secondary" id="dropdown-admin">
              Admin
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={handleLogOut}>Logout</Dropdown.Item>
              <Dropdown.Item as={Link} to="/profile">
                Profile
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </nav>
      </div>
     
         );
        }
         
        export default HeaderLogout;
         