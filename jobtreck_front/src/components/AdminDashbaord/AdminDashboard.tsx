
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import AdminSidebar from './AdminSideBar';
import AdminMain from './AdminMain';
import { Navigate } from 'react-router-dom';
 
interface Props {
    role: string;
}
 
const AdminDashBoard= (props : Props) => {
    const [toggle, setToggle] = useState(true);
 
    const Toggle = () => {
        setToggle(!toggle);
    }
 
    return (
        <>
        {props.role === 'admin' ? (
            <div className='container-fluid bg-secondary min-vh-100'>
                <div className='row'>
                    {toggle && (
                        <div className='col-4 col-md-2 bg-white vh-100 position-fixed'>
                            <AdminSidebar />
                        </div>
                    )}
                    {toggle && <div className='col-4 col-md-2'></div>}
                    <div className='col'>
                        <AdminMain Toggle={Toggle} />
                    </div>
                </div>
            </div>
        ) : (
            <Navigate to={'/Home'} />
        )}
        </>
    );
};
 
export default AdminDashBoard;
 
 