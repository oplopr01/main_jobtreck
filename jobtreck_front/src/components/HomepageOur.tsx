import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

interface Job {
  jobId: number;
  userId: number;
  jobTitle: string;
  description: string;
  location: string;
  salary: string;
  dateOfPost: string;
  skills: string;
  category: string;
}

const HomepageOur: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [locationTerm, setLocationTerm] = useState<string>('');
  const [categoryTerm, setCategoryTerm] = useState<string>('');
 
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/users/joblistings'); // Replace with your API endpoint
        const data = await response.json();
        setJobs(data);
          } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };
    
    fetchJobs();
  }, []);
  

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // The jobs are already filtered by the search term in the render method
  };

  const handleReset = () => {
    setSearchTerm('');
    setLocationTerm('');
    setCategoryTerm('');
  };

  const filteredJobs = jobs.filter(job => {
    const matchesSkill = job.skills.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = job.location.toLowerCase().includes(locationTerm.toLowerCase());
    const matchesCategory = categoryTerm ? job.category.toLowerCase().includes(categoryTerm.toLowerCase()) : true;

    return matchesSkill && matchesLocation && matchesCategory;
  });

  return (
    <div className="homepage-container pt-5 mt-5">
      <div className="container">
        <div className="jumbotron mt-5">
          <h1 className="display-4">Find Job</h1>
          <p className="lead">Search jobs by skill, location, and category.</p>
          <form onSubmit={handleSearch}>
            <div className="form-row">
              <div className="form-group col-md-4">
                <input
                  type="text"
                  className="form-control"
                  id="inputSkill"
                  placeholder="Skill"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="form-group col-md-4">
                <input
                  type="text"
                  className="form-control"
                  id="inputLocation"
                  placeholder="Location"
                  value={locationTerm}
                  onChange={(e) => setLocationTerm(e.target.value)}
                />
              </div>
              <div className="form-group col-md-4">
                <select
                  id="inputCategory"
                  className="form-control"
                  value={categoryTerm}
                  onChange={(e) => setCategoryTerm(e.target.value)}
                >
                  <option value="">Choose Category...</option>
                  <option value="Software Development">Software Development</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Finance">Finance</option>
                  <option value="Design">Design</option>
                </select>
              </div>
            </div>
           
            <button type="button" className="btn btn-secondary" onClick={handleReset}>Reset</button>
          </form>
        </div>
        <div className="row">
          <div className="col-md-12">
            <h2 className="text-center mb-4 text-dark">Explore by Categories</h2>
          </div>
          <div className="col-md-3">
            <div className="card bg-dark text-white">
              <img src="demo-icon.jpg" className="card-img" alt="Demo Icon" />
              <div className="card-body">
                <h5 className="card-title">Software Development</h5>
                <p className="card-text">Total Jobs: {}</p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card bg-dark text-white">
              <img src="demo-icon.jpg" className="card-img" alt="Demo Icon" />
              <div className="card-body">
                <h5 className="card-title">Marketing</h5>
                <p className="card-text">Total Jobs: 200</p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card bg-dark text-white">
              <img src="demo-icon.jpg" className="card-img" alt="Demo Icon" />
              <div className="card-body">
                <h5 className="card-title">Finance</h5>
                <p className="card-text">Total Jobs: {}</p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card bg-dark text-white">
              <img src="demo-icon.jpg" className="card-img" alt="Demo Icon" />
              <div className="card-body">
                <h5 className="card-title">Design</h5>
                <p className="card-text">Total Jobs: 300</p>
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-md-12">
            <h2 className="text-center mb-4 text-dark">Featured Jobs</h2>
          </div>
          {filteredJobs.map((job) => (
            <div className="col-md-4 mb-4" key={job.jobId}>
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title text-dark">{job.jobTitle}</h5>
                  <h6 className="card-subtitle mb-2 text-muted text-dark">Demo Company Name</h6>
                  <p className="card-text text-dark">Location: {job.location}</p>
                  <p className="card-text text-dark">Salary: {job.salary}</p>
                  <p className="card-text text-dark">Date Posted: {formatDate(job.dateOfPost)}</p>
                  <p className="card-text text-dark">Skills: {job.skills}</p>
                  <a href="#" className="btn btn-primary">Apply</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomepageOur;
