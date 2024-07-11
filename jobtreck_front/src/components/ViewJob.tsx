import React, { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ColDef } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { Button, Modal } from 'react-bootstrap';
import CreateJob from './CreateJob';
import 'bootstrap/dist/css/bootstrap.min.css';
import ActionButtons from './actionButtons/ActionButtons';

interface JobDetails {
  id: string;
  title: string;
  description: string;
  location: string;
  salary: string;
  skills: string;
  category: string;
  dateOfPost: string;
  lastDate: string;
}

const ViewJob: React.FC = () => {
  const [rowData, setRowData] = useState<JobDetails[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState<JobDetails | null>(null);

  const jobListingHandler = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/users/joblistings');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
     
      setRowData(data);
    } catch (error) {
      console.error('Error fetching job details:', error);
    }
  };

  useEffect(() => {
    jobListingHandler();
  }, []);

  const refreshJobList = () => {
    
    jobListingHandler();
  };

  const columnDefs: ColDef[] = [
    { field: 'jobTitle', headerName: 'Job Title', sortable: true, filter: true },
    { field: 'description', headerName: 'Description', sortable: true, filter: true },
    { field: 'location', headerName: 'Location', sortable: true, filter: true },
    { field: 'salary', headerName: 'Salary', sortable: true, filter: true },
    { field: 'skills', headerName: 'Skills', sortable: true, filter: true },
    { field: 'category', headerName: 'Category', sortable: true, filter: true },
    { field: 'dateOfPost', headerName: 'Date of Post', sortable: true, filter: true },
    { field: 'lastDate', headerName: 'Last Date', sortable: true, filter: true },
    {
      field: 'actions',
      headerName: 'Actions',
      cellRenderer: (params) => <ActionButtons data={params.data} onEdit={handleEdit} onDelete={refreshJobList} />,
    },
  ];

  const handleEdit = (job: JobDetails) => {
    setSelectedJob(job);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedJob(null);
  };

  return (
    <div className="App" style={{ margin: '2rem 1rem', backgroundColor: 'black' }}>
      <h2 style={{ margin: '1rem', color: 'white', padding: '1rem' }}>View Jobs</h2>
      <Button variant="primary" onClick={() => setShowModal(true)}>
        Create Job
      </Button>
      <div className="ag-theme-alpine ag-style" style={{ height: 400, width: '100%', marginTop: '1rem' }}>
        <AgGridReact
          defaultColDef={{ flex: 1 }}
          rowHeight={60}
          rowData={rowData}
          columnDefs={columnDefs}
        />
      </div>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedJob ? 'Edit Job' : 'Create Job'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CreateJob jobData={selectedJob} onSuccess={() => { refreshJobList(); handleCloseModal(); }} />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ViewJob;
