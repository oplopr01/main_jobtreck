import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { selectUser } from '~/selectors';
import { useAppSelector } from '~/modules/hooks';

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

const JobDetails: React.FC = () => {
  const { jobId } = useParams<{ jobId: string }>();
  const [job, setJob] = useState<Job | null>(null);
  const [applied, setApplied] = useState<boolean>(false);
  const user = useAppSelector(selectUser);
  const { userDetails } = user;

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        // Fetch job details
        const response = await fetch(`http://localhost:5000/api/users/joblistings/${jobId}`);
        const data = await response.json();
        setJob(data);

        // Check if the user has already applied for this job
        const appliedResponse = await fetch(`http://localhost:5000/api/users/check-application`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId: userDetails.userId, jobId: jobId }),
        });

        const appliedData = await appliedResponse.json();
        setApplied(appliedData.applied);
      } catch (error) {
        console.error('Error fetching job details:', error);
      }
    };

    fetchJobDetails();
  }, [jobId, userDetails.userId]);

  const handleApply = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/users/apply`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: userDetails.userId, jobId: jobId }),
      });

      if (response.ok) {
        setApplied(true);
      } else {
        console.error('Error applying for job');
      }
    } catch (error) {
      console.error('Error applying for job:', error);
    }
  };

  if (!job) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <div className="jumbotron mt-5">
        <h1>{job.jobTitle}</h1>
        <p className="lead">{job.description}</p>
        <hr className="my-4" />
        <p>Location: {job.location}</p>
        <p>Salary: {job.salary}</p>
        <p>Date Posted: {new Date(job.dateOfPost).toLocaleDateString()}</p>
        <p>Skills: {job.skills}</p>
        <button
          className={`btn ${applied ? 'btn-success' : 'btn-primary'}`}
          onClick={handleApply}
          disabled={applied}
        >
          {applied ? 'Applied' : 'Apply'}
        </button>
      </div>
    </div>
  );
};

export default JobDetails;
