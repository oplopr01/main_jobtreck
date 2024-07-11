
import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminDashboardNav from './AdminDashboardNav';
 
interface AdminMainProps {
    Toggle: () => void;
}
 
const AdminMain: React.FC<AdminMainProps> = ({ Toggle }) => {
 
   
    return (
        <div className='px-3'>
            <AdminDashboardNav Toggle={Toggle} />
            <Outlet/>
           
         
        </div>
    );
};
 
export default AdminMain;
 
 