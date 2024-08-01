import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

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

const categoryImages: { [key: string]: string } = {
  "Software Development": "https://t4.ftcdn.net/jpg/04/89/82/55/360_F_489825552_1lqk7tv078bgXEeMPJaCydwsgXrtdl0u.jpg",
  "Marketing": "https://miro.medium.com/v2/resize:fit:2000/1*7sZoXca4YQ-iS7gKPmqetg.png",
  "Design": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmvkTZJ1bLELcnqJaerk8t3w63R-lsGwu9fA&s",
  "Finance": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTL9mum0PgRb3_UCduOCrIEOHkd77GijR6tNQ&s"
};

const HomepageOur: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [locationTerm, setLocationTerm] = useState<string>('');
  const [categoryTerm, setCategoryTerm] = useState<string>('');
  const [categoryCounts, setCategoryCounts] = useState<{ [key: string]: number }>({
    "Software Development": 0,
    "Marketing": 0,
    "Design": 0,
    "Finance": 0,
  });

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/users/joblistings');
        const data = await response.json();
        setJobs(data);

        const counts = data.reduce((acc: { [key: string]: number }, job: Job) => {
          acc[job.category] = (acc[job.category] || 0) + 1;
          return acc;
        }, {});
        setCategoryCounts(counts);
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

  const handleCategoryClick = (category: string) => {
    setCategoryTerm(category);
  };

  return (
    <div className="homepage-container pt-5 mt-5">
      <div className="container">
        <div>
          
        </div>
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
          {Object.keys(categoryImages).map(category => (
            <div className="col-md-3" key={category}>
              <div className="card bg-dark text-white" onClick={() => handleCategoryClick(category)} style={{ cursor: 'pointer', height: '100%', maxWidth: '250px', margin: '0 auto' }}>
                <img src={categoryImages[category]} className="card-img-top" alt={category} style={{ height: '150px', objectFit: 'cover' }} />
                <div className="card-body">
                  <h5 className="card-title">{category}</h5>
                  <p className="card-text">Total Jobs: {categoryCounts[category]}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        {jobs.length > 0 ? (
          <div className="row mt-5">
            <div className="col-md-12">
              <h2 className="text-center mb-4 text-dark">Featured Jobs</h2>
            </div>
            {filteredJobs.map((job) => (
              <div className="col-md-4 mb-4" key={job.jobId}>
                <div className="card" style={{ height: '100%', maxWidth: '300px', margin: '0 auto' }}>
                  <div className="card-body">
                    <h5 className="card-title text-dark">{job.jobTitle}</h5>
                    <h6 className="card-subtitle mb-2 text-muted text-dark">Demo Company Name</h6>
                    <p className="card-text text-dark">Location: {job.location}</p>
                    <p className="card-text text-dark">Salary: {job.salary}</p>
                    <p className="card-text text-dark">Date Posted: {formatDate(job.dateOfPost)}</p>
                    <p className="card-text text-dark">Skills: {job.skills}</p>
                    <Link to={`/jobdetails/${job.jobId}`} className="btn btn-primary">Apply</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="row mt-5">
            <div className="col-md-12">
              <h2 className="text-center mb-4 text-dark">No jobs available</h2>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomepageOur;
