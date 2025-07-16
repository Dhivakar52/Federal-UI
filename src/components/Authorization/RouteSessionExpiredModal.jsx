// components/Authorization/RouteSessionExpiredModal.jsx
import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const RouteSessionExpiredModal = ({ show, onConfirm,message }) => (
  <Modal show={show} backdrop="static" keyboard={false} centered>
    <Modal.Header>
      <Modal.Title>Session Expired</Modal.Title>
    </Modal.Header>
    <Modal.Body>
    {message}
    </Modal.Body>
    <Modal.Footer>
      <Button variant="primary btnColor" onClick={onConfirm}>
        Log In
      </Button>
    </Modal.Footer>
  </Modal>
);

export default RouteSessionExpiredModal;
