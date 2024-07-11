import React from 'react';
import { toast } from "react-toastify";

interface DeleteButtonProps {
  jobId: string;
  onDelete: () => void;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ jobId, onDelete }) => {
  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/users/deletejob/${jobId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        toast.success('Job deleted successfully');
        onDelete(); // Call the onDelete callback to refresh the job list
      } else {
        const result = await response.json();
        toast.error(`Failed to delete job: ${result.msg}`);
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('An unexpected error occurred');
    }
  };

  return (
    <button className="btn btn-danger" onClick={handleDelete}>
      Delete
    </button>
  );
};

export default DeleteButton;
