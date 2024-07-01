import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const JobListingsGrid = ({ jobListings }) => {
    // Define the column definitions
    const columnDefs = [
        { headerName: 'Job Title', field: 'title', sortable: true, filter: true },
        { headerName: 'Job Description', field: 'description', sortable: true, filter: true },
        { headerName: 'Job Posted Date', field: 'postedDate', sortable: true, filter: true }
    ];

    // Define default grid options
    const defaultColDef = {
        flex: 1,
        minWidth: 150,
        resizable: true
    };

    return (
        <div className="ag-theme-alpine" style={{ height: '500px', width: '100%' }}>
            <AgGridReact
                rowData={jobListings}
                columnDefs={columnDefs}
                defaultColDef={defaultColDef}
                pagination={true}
                paginationPageSize={10} // Adjust as needed
            />
        </div>
    );
};

export default JobListingsGrid;
