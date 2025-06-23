import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const AddUserModal = ({
  show,
  onClose,
  onAdd,
  name,
  email,
  password,
  designation,     
  setName,
  setEmail,
  setPassword,
  setDesignation   
}) => {
  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add New User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Enter name"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Enter email"
            />
          </Form.Group>
   <Form.Group className="mb-3">
            <Form.Label>Designation</Form.Label>
            <Form.Control
              type="text"
              value={designation}
              onChange={e => setDesignation(e.target.value)}
              placeholder="Enter designation"
            />
          </Form.Group>
        </Form>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Enter password"
            />
          </Form.Group>


        
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>Cancel</Button>
        <Button variant="primary" onClick={onAdd}>Add User</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddUserModal;
