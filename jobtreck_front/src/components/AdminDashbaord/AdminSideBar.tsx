
import React from 'react';
import Nav from 'react-bootstrap/Nav';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logOut } from '~/actions';
 
const AdminSidebar: React.FC = () => {
 
    let Navigate = useNavigate();
 
    let dispatch = useDispatch();
    function handleLogOut() {
        dispatch(logOut());
 
        window.localStorage.clear()
        Navigate('/login');
      }
 
    return (
 
        <div className='bg-white sidebar p-2'>
            <div className='m-2'>
                <i className='bi bi-bootstrap-fill me-3 fs-4'></i>
                <span className='brand-name fs-4'>Job Trek</span>
            </div>
            <hr className='text-dark' />
            <Nav className='list-group list-group-flush flex-column'>
                <Nav.Item className='py-2 my-1'>
                    <Nav.Link as={Link} to='/adminDashBoard1'>
                        <i className='bi bi-speedometer2 fs-5 me-3'></i>
                        Dashboard
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item className='py-2 my-1'>
                    <Nav.Link as={Link} to='/dashboard/applications'>
                        <i className='bi bi-speedometer2 fs-5 me-3'></i>
                        Job applications
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item className='py-2'>
                    <Nav.Link as={Link} to='/adminDashBoard1/jobcreate'>
                        <i className='bi bi-house fs-5 me-3'></i>
                        Job Creation
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item className='py-2'>
                    <Nav.Link as={Link} to='/dashboard/viewjob'>
                        <i className='bi bi-house fs-5 me-3'></i>
                        View Applications
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item className='py-2'>
                    <Nav.Link as={Link} to='/'>
                        <i className='bi bi-house fs-5 me-3'></i>
                        Home
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item className='py-2'>
                    <Nav.Link onClick={handleLogOut}>
                        <i className='bi bi-power fs-5 me-3'></i>
                        Logout
                    </Nav.Link>
                </Nav.Item>
            </Nav>
        </div>
    );
};
 
export default AdminSidebar;
 
 