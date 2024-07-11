import React from 'react';
import { Button } from 'react-bootstrap';

interface ActionButtonsProps {
  data: any;
  onEdit: (job: any) => void;
  onDelete: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ data, onEdit, onDelete }) => {
  const handleEdit = () => {
    onEdit(data);
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/users/deletejob/${data.jobId}`, {
        method: 'DELETE',
      });


      if (response.ok) {
      
        onDelete();
      } else {
        console.error('Failed to delete job');
      }
    } catch (error) {
      console.error('Error deleting job:', error);
    }
  };

  return (
    <div>
      <Button variant="warning" onClick={handleEdit}>Edit</Button>
      <Button variant="danger" onClick={handleDelete}>Delete</Button>
    </div>
  );
};

export default ActionButtons;
