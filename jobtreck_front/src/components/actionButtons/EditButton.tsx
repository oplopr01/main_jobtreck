import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import CreateJob from '../CreateJob'; // Assuming CreateJob is the form component

interface EditButtonProps {
  data: any;
}

const EditButton: React.FC<EditButtonProps> = ({ data }) => {
  const [showModal, setShowModal] = useState(false);

  const handleEdit = () => {
    setShowModal(true);
  };

  const handleClose = () => setShowModal(false);

  return (
    <>
      <Button variant="warning" onClick={handleEdit}>Edit</Button>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Job</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CreateJob jobData={data} />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default EditButton;
