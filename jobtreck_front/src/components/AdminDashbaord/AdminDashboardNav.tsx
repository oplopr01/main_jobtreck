
 
import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
 
interface AdminDashboardNavProps {
    Toggle: () => void;
}
 
const AdminDashboardNav: React.FC<AdminDashboardNavProps> = ({ Toggle }) => {
    return (
        <Navbar expand="sm" variant="dark" bg="transparent">
            <Navbar.Brand className="fs-4" onClick={Toggle}>
                <i className="bi bi-justify-left"></i>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarSupportedContent">
                <i className='bi bi-justify'></i>
            </Navbar.Toggle>
            <Navbar.Collapse id="navbarSupportedContent">
                <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
                    <li className="nav-item dropdown">
                        <NavDropdown title="Admin" id="dropdownId">
                            <NavDropdown.Item href="#">Profile</NavDropdown.Item>
                            <NavDropdown.Item href="#">Setting</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#">Logout</NavDropdown.Item>
                        </NavDropdown>
                    </li>
                </ul>
            </Navbar.Collapse>
        </Navbar>
    );
};
 
export default AdminDashboardNav;
 
 