
import React, { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ColDef } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
 
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
 
  const jobListingHandler = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/users/joblistings');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
 
      const data = await response.json();
      console.log(data);
      setRowData(data);
    } catch (error) {
      console.error('Error fetching job details:', error);
    }
  };
 
  useEffect(() => {
    jobListingHandler();
  }, []);
 
  const columnDefs: ColDef[] = [
    { field: 'jobTitle', headerName: 'Job Title', sortable: true, filter: true },
    { field: 'description', headerName: 'Description', sortable: true, filter: true },
    { field: 'location', headerName: 'Location', sortable: true, filter: true },
    { field: 'salary', headerName: 'Salary', sortable: true, filter: true },
    { field: 'skills', headerName: 'Skills', sortable: true, filter: true },
    { field: 'category', headerName: 'Category', sortable: true, filter: true },
    { field: 'dateOfPost', headerName: 'Date of Post', sortable: true, filter: true },
    { field: 'lastDate', headerName: 'Last Date', sortable: true, filter: true },
  ];
 
  return (
    <div className="App" style={{ margin: '2rem 1rem', backgroundColor: 'black' }}>
      <h2 style={{ margin: '1rem', color: 'white', padding: '1rem' }}>Job Listing</h2>
      <div className="ag-theme-alpine ag-style" style={{ height: 400, width: '100%' }}>
        <AgGridReact
          defaultColDef={{ flex: 1 }}
          rowHeight={60}
          rowData={rowData}
          columnDefs={columnDefs}
        />
      </div>
    </div>
  );
};
 
export default ViewJob;
 