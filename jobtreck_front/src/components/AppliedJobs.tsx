import React, { useEffect, useState } from 'react';
import { selectUser } from '~/selectors';
import { useAppSelector } from '~/modules/hooks';
import { Button, Card, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

interface AppliedJob {
  jobTitle: string;
  description: string;
  location: string;
  salary: string;
  skills: string;
  status: string;
  jobId: string;
}

const AppliedJobs: React.FC = () => {
  const [appliedJobs, setAppliedJobs] = useState<AppliedJob[]>([]);
  const user = useAppSelector(selectUser);
  const { userDetails } = user;

  useEffect(() => {
    if (!userDetails?.userId) return;

    const fetchAppliedJobs = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/users/appliedjobs?userId=${encodeURIComponent(userDetails.userId)}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setAppliedJobs(data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching applied jobs:', error);
      }
    };

    fetchAppliedJobs();
  }, [userDetails]);

  return (
    <Container>
      <h2 className="my-4">Applied Jobs</h2>
      <Row>
        {appliedJobs.map((job, index) => (
          <Col key={index} sm={12} md={6} lg={4} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>{job.jobTitle}</Card.Title>
                <Card.Text><strong>Description:</strong> {job.description}</Card.Text>
                <Card.Text><strong>Location:</strong> {job.location}</Card.Text>
                <Card.Text><strong>Salary:</strong> {job.salary}</Card.Text>
                <Card.Text><strong>Skills:</strong> {job.skills}</Card.Text>
                <div className={`badge ${job.status === 'accepted' ? 'bg-success' : job.status === 'rejected' ? 'bg-danger' : 'bg-secondary'}`}>
                  {job.status || "N/A"}
                </div>
                
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default AppliedJobs;
