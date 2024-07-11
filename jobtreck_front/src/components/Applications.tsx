import React, { useEffect, useState } from 'react';
import { Button, Card, Container, Row, Col, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

interface Application {
  jobTitle: string;
  userName: string;
  userId: string;
  // Add other relevant fields if needed
}

const Applications: React.FC = () => {
  const [applications, setApplications] = useState<Application[]>([
    {
      "jobTitle": "Software Engineer",
      "userName": "John Doe",
      "userId": "12345"
    },
    {
      "jobTitle": "Software Engineer",
      "userName": "John Doe",
      "userId": "12345"
    },
    {
      "jobTitle": "Software Engineer",
      "userName": "John Doe",
      "userId": "12345"
    },
    {
      "jobTitle": "Software Engineer",
      "userName": "John Doe",
      "userId": "12345"
    },
    {
      "jobTitle": "Software Engineer",
      "userName": "John Doe",
      "userId": "12345"
    },
    {
      "jobTitle": "Product Manager",
      "userName": "Jane Smith",
      "userId": "67890"
    }
  ]);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState();

  useEffect(() => {
    // Fetch job applications from backend API
    const fetchApplications = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/users/applications');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setApplications(data);
        // console.log(applications);  // Uncomment if you want to debug the data
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchApplications();
  }, []);

  const handleViewApplication = async (userId: string) => {
    try {
      const response = await fetch(`http://localhost:5000/api/users/userdetails`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setSelectedUser(data);
      console.log(selectedUser);
      
      setShowModal(true);
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  const handleAccept = async () => {
    if (selectedUser) {
      try {
        const response = await fetch(`http://localhost:5000/api/users/acceptapplication/${selectedUser.userId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          console.log('Application accepted');
          setShowModal(false);
          setSelectedUser(null);
          // Refresh the applications list
          const fetchApplications = async () => {
            try {
              const response = await fetch('http://localhost:5000/api/users/applications');
              if (!response.ok) {
                throw new Error('Network response was not ok');
              }
              const data = await response.json();
              setApplications(data);
            } catch (error) {
              console.error('Error fetching data:', error);
            }
          };
          fetchApplications();
        } else {
          const result = await response.json();
          console.error('Failed to accept application:', result.msg);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  const handleReject = async () => {
    if (selectedUser) {
      try {
        const response = await fetch(`http://localhost:5000/api/users/rejectapplication/${selectedUser.userId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          console.log('Application rejected');
          setShowModal(false);
          setSelectedUser(null);
          // Refresh the applications list
          const fetchApplications = async () => {
            try {
              const response = await fetch('http://localhost:5000/api/users/applications');
              if (!response.ok) {
                throw new Error('Network response was not ok');
              }
              const data = await response.json();
              setApplications(data);
            } catch (error) {
              console.error('Error fetching data:', error);
            }
          };
          fetchApplications();
        } else {
          const result = await response.json();
          console.error('Failed to reject application:', result.msg);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  return (
    <Container>
      <h2 className="my-4">Applications</h2>
      <Row>
        {applications.map((application, index) => (
          <Col key={index} sm={12} md={6} lg={4} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>{application.jobTitle}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Applicant: {application.userName}</Card.Subtitle>
                <Card.Text>
                  User ID: {application.userId}
                </Card.Text>
                <Button variant="primary" onClick={() => handleViewApplication(application.userId)}>
                  View Application
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Modal for viewing application details */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Application Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedUser ? (
            <div>
              <p><strong>User ID:</strong> {selectedUser.userId}</p>
              <p><strong>Email:</strong> {selectedUser.email}</p>
              <p><strong>Contact:</strong> {selectedUser.contact}</p>
              <p><strong>Date of Birth:</strong> {selectedUser.date_of_birth}</p>
              <p><strong>Gender:</strong> {selectedUser.gender}</p>
              <p><strong>Skills:</strong> {selectedUser.skills}</p>
              <p><strong>College Name:</strong> {selectedUser.college_name}</p>
              <p><strong>Experience:</strong> {selectedUser.experience}</p>
              <p><strong>Percentage:</strong> {selectedUser.percentage}</p>
              <p><strong>Year of Passing:</strong> {selectedUser.yop}</p>
              <p><strong>Degree:</strong> {selectedUser.degree}</p>
              <p><strong>Name:</strong> {selectedUser.name}</p>
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAccept}>
            Accept
          </Button>
          <Button variant="danger" onClick={handleReject}>
            Reject
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Applications;