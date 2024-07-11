import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { logOut } from '~/actions';
import JobListingsGrid from './JobListingsGrid';
import ViewJob from './ViewJob'; // Import the ViewJob component
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Ensure Bootstrap JS is included
import Applications from './Applications';

function DashBoard(props : Props) {
  const [jobListings, setJobListings] = useState([]);
 
  let dispatch = useDispatch();

  function handleLogOut() {
    dispatch(logOut());
    localStorage.removeItem('token');
   
  }

  useEffect(() => {
    // Fetch job listings from backend API
    const fetchJobListings = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/users/joblistings');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data.length);
        
        setJobListings(data);
        // console.log(jobListings);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchJobListings();
  }, []);

  return (
    <>
      {props.role === "admin" ?  (
        <>
      <h1>DashBoard</h1>
      <button onClick={handleLogOut}>Log Out</button>
      <div className="container-fluid">
        <div className="row">
          <nav className="col-md-2 col-lg-2 d-md-block bg-light sidebar">
            <div className="sidebar-sticky">
              <ul className="nav flex-column">
                <li className="nav-item">
                  <Link className="nav-link active" to="/dashboard">
                    <i className="fas fa-home"></i>
                    Dashboard <span className="sr-only">(current)</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link active" to="/dashboard/viewJob">
                    <i className="fas fa-home"></i>
                    View Job
                  </Link>
                </li>
                <li className="nav-item">
                <Link className="nav-link active" to="/dashboard/applications">
                    <i className="fas fa-home"></i>
                    Applications
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
          <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
           
            <Routes>
              <Route path="/" element={<DefaultDashboardContent jobListings={jobListings} />} />
              <Route path="viewJob" element={<ViewJob />} />
              <Route path="applications" element={<Applications />} />
            </Routes>
          </main>
        </div>
      </div>
      </>) : 
       ( <Navigate to={"/Home"}/>)
       }
     
    </>
  );
}

function DefaultDashboardContent({jobListings}) {
  return (
    <div className="row">
      <div className="col-md-4">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Total Job Listings</h5>
            <p className="card-text">{jobListings.length}</p>
          </div>
        </div>
      </div>
      <div className="col-md-4">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Total Users</h5>
            <p className="card-text">567</p>
          </div>
        </div>
      </div>
      <div className="col-md-4">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Active Jobs</h5>
            <p className="card-text">789</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashBoard;
