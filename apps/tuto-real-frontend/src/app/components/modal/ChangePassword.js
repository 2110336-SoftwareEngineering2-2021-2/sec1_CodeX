import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { useAuth } from '../../auth';
import './ChangePassword.css';

const ChangePassword = ({ show, setShow }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { updateUserPassword } = useAuth();

  const handleClose = () => {
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setShow(false);
  };

  const handleSubmit = async () => {
    if (currentPassword.length < 8) alert('Invalid password');
    else if (newPassword.length < 8) alert('New password is too short');
    else if (newPassword === confirmPassword)
      await updateUserPassword(currentPassword, newPassword, handleClose);
    else alert('Password mismatch');
  };
  return (
    <Modal className="change-password" show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <h4>Change your password</h4>
      </Modal.Header>

      <Modal.Body style={{ paddingBottom: '0px' }}>
        <Form.Group className="mb-3" controlId="oldPassword">
          <h6>OLD PASSWORD</h6>
          <Form.Control
            className="textInput"
            value={currentPassword}
            type="password"
            placeholder="Enter your old password."
            autoCapitalize="none"
            securetextentry="true"
            onChange={(e) => {
              setCurrentPassword(e.target.value);
            }}
          />
        </Form.Group>
      </Modal.Body>
      <hr />
      <Modal.Body style={{ paddingBottom: '0px' }}>
        <Form.Group className="mb-3" controlId="newPassword">
          <h6>NEW PASSWORD</h6>
          <Form.Control
            className="textInput"
            type="password"
            value={newPassword}
            placeholder="Enter your new password."
            autoCapitalize="none"
            securetextentry="true"
            onChange={(e) => {
              setNewPassword(e.target.value);
            }}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="confirmPassword">
          <h6>CONFIRM NEW PASSWORD</h6>
          <Form.Control
            className="textInput"
            value={confirmPassword}
            placeholder="Enter your new password again."
            autoCapitalize="none"
            securetextentry="true"
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
            type="password"
          />
        </Form.Group>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="outline-secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button className="confirm-button" onClick={handleSubmit}>
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ChangePassword;

// render(<changePassword />);
