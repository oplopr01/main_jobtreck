import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { logOut } from '~/actions';

function DashBoard() {
  let Navigate = useNavigate();

  let dispatch = useDispatch();
  function handleLogOut() {
    dispatch(logOut());
    localStorage.removeItem('token');
    Navigate('/login');
  }
  return (
    <div>
      <h1>DashBoard</h1>
      <button onClick={handleLogOut}>Log Out</button>
      <div className="container-fluid">
        <div className="row">
          <nav className="col-md-2 col-lg-2 d-md-block bg-light sidebar">
            <div className="sidebar-sticky">
              <ul className="nav flex-column">
                <li className="nav-item">
                  <a className="nav-link active" href="#">
                    <i className="fas fa-home"></i>
                    Dashboard <span className="sr-only">(current)</span>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    <i className="fas fa-briefcase"></i>
                    Manage Job
                  </a>
                  <ul className="nav flex-column pl-4">
                    <li className="nav-item">
                      <a className="nav-link" href="#">
                        Create Job
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#">
                        Edit Job
                      </a>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/viewJob">
                        View Job
                      </Link>
                    </li>
                  </ul>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    <i className="fas fa-users"></i>
                    Application
                  </a>
                </li>
              </ul>
            </div>
          </nav>
          <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
              <h1 className="h2">Dashboard</h1>
            </div>

            <div className="row">
              <div className="col-md-4">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Total Job Listings</h5>
                    <p className="card-text">1,234</p>
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

            <h2 className="mt-5">Recent Job Listings</h2>
            <div className="table-responsive">
              <table className="table table-striped table-sm">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Company</th>
                    <th>Category</th>
                    <th>Date Posted</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Software Engineer</td>
                    <td>ABC Company</td>
                    <td>Technology</td>
                    <td>June 9, 2024</td>
                  </tr>

                  <tr>
                    <td>Software Engineer</td>
                    <td>XYZ Company</td>
                    <td>Technology</td>
                    <td>June 9, 2024</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default DashBoard;
