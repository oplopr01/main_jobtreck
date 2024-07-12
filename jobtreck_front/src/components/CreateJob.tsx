import React, { useState, useEffect } from 'react';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

interface CreateJobProps {
  jobData?: any;
  onSuccess?: () => void; // Added onSuccess prop
}

const CreateJob: React.FC<CreateJobProps> = ({ jobData, onSuccess }) => {
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
  const [skills, setSkills] = useState('');

  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    if (jobData) {
      setJobId(jobData.jobId);
      setUserId(jobData.userId);
      setJobTitle(jobData.jobTitle);
      setDescription(jobData.description);
      setLocation(jobData.location);
      setSalary(jobData.salary);
      setDateOfPost(jobData.dateOfPost ? jobData.dateOfPost.split('T')[0] : '');  // Extract date part
      setLastDate(jobData.lastDate ? jobData.lastDate.split('T')[0] : '');        // Extract date part
      setExperience(jobData.experience);
      setCategory(jobData.category);
      setSkills(jobData.skills)
      setIsEditMode(true);
    } else {
      setIsEditMode(false);
    }
  }, [jobData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const jobData = {
      jobId: jobId.toString(),  // Convert jobId to string
      userId: userId.toString(),
      jobTitle: jobTitle.toString(),
      description: description.toString(),
      location: location.toString(),
      salary: salary.toString(),
      dateOfPost: dateOfPost.toString(),
      lastDate: lastDate.toString(),
      experience: experience.toString(),
      skills: skills.toString(),
      category: category.toString()
    };

    try {
      const response = isEditMode
        ? await fetch(`http://localhost:5000/api/users/editjob/${jobId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(jobData)
          })
        : await fetch('http://localhost:5000/api/users/createjobs', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(jobData)
          });

      if (response.ok) {
        const result = await response.json();
        console.log('Job created/updated successfully:', result);
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
        setSkills('')

        toast.success(`Job ${isEditMode ? 'updated' : 'created'} successfully`);

        if (onSuccess) {
          onSuccess(); // Call onSuccess to refresh job list
        }
      } else {
        const result = await response.json();
        console.error(`Failed to ${isEditMode ? 'update' : 'create'} job:`, result.msg);
        toast.error(result.msg);
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('An unexpected error occurred');
    }
  };

  return (
    <div className="container mt-5">
      <h2>{isEditMode ? 'Edit' : 'Create'} Job Post</h2>
      <form onSubmit={handleSubmit}>
        {/* Form fields */}
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
            disabled={!!jobData}  // Disable field if in edit mode
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
          <label htmlFor="skills" className="form-label">Skills</label>
          <input
            type="text"
            className="form-control"
            id="skills"
            placeholder="Enter skills"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
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
          <input
            type="text"
            className="form-control"
            id="category"
            placeholder="Enter job category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          {isEditMode ? 'Update Job' : 'Create Job'}
        </button>
      </form>
    </div>
  );
};

export default CreateJob;
