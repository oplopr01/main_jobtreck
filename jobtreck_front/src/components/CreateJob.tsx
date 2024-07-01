import React, { useState } from 'react';

function CreateJob() {
  const [jobId, setJobId] = useState('');
  const [userId, setUserId] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [salary, setSalary] = useState('');
  const [dateOfPost, setDateOfPost] = useState('');
  const [lastDate, setLastDate] = useState('');
  const [experience, setExperience] = useState('');
  const [category, setCategory] = useState('');

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const jobData = {
      jobId,
      userId,
      jobTitle,
      description,
      location,
      salary,
      dateOfPost,
      lastDate,
      experience,
      category
    };

    try {
      const response = await fetch('http://localhost:5000/api/users/createjobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(jobData)
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Job created successfully:', result);
        // Reset the form fields
        setJobId('');
        setUserId('');
        setJobTitle('');
        setDescription('');
        setLocation('');
        setSalary('');
        setDateOfPost('');
        setLastDate('');
        setExperience('');
        setCategory('');
      } else {
        console.error('Failed to create job:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };


  return (
    <div className="container mt-5">
      <h2>Create Job Listing</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="jobId" className="form-label">Job ID</label>
          <input
            type="text"
            className="form-control"
            id="jobId"
            placeholder="Enter job ID"
            value={jobId}
            onChange={(e) => setJobId(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="userId" className="form-label">User ID</label>
          <input
            type="text"
            className="form-control"
            id="userId"
            placeholder="Enter user ID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="jobTitle" className="form-label">Job Title</label>
          <input
            type="text"
            className="form-control"
            id="jobTitle"
            placeholder="Enter job title"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea
            className="form-control"
            id="description"
            placeholder="Enter job description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="location" className="form-label">Location</label>
          <input
            type="text"
            className="form-control"
            id="location"
            placeholder="Enter job location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="salary" className="form-label">Salary</label>
          <input
            type="text"
            className="form-control"
            id="salary"
            placeholder="Enter job salary"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="dateOfPost" className="form-label">Date of Post</label>
          <input
            type="date"
            className="form-control"
            id="dateOfPost"
            value={dateOfPost}
            onChange={(e) => setDateOfPost(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="lastDate" className="form-label">Last Date</label>
          <input
            type="date"
            className="form-control"
            id="lastDate"
            value={lastDate}
            onChange={(e) => setLastDate(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="experience" className="form-label">Experience</label>
          <input
            type="text"
            className="form-control"
            id="experience"
            placeholder="Enter required experience"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="category" className="form-label">Category</label>
          <select
            className="form-select"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Select category</option>
            <option value="IT">IT</option>
            <option value="Finance">Finance</option>
            <option value="Marketing">Marketing</option>
            <option value="Engineering">Engineering</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Create Job</button>
      </form>
    </div>
  );
}

export default CreateJob;