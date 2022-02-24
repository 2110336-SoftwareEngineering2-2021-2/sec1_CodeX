import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import './ForgotPassword.css';
import { useAuth } from '../../auth';

const ForgotPassword = (props) => {
  // const { show } = props;
  const { resetPassword } = useAuth();
  const [show, setShow] = useState(props.show);
  const [sending, setSending] = useState('');
  const [emailFill, setEmailFill] = useState('');

  const handleShow = () => setShow(true);
  const handleSubmit = () => {
    resetPassword(emailFill);
    props.handleClose();
  };

  return (
    <Modal
      className="forgot-password"
      show={props.show}
      onHide={props.handleClose}
    >
      <Modal.Header closeButton>
        <h4>Forgot your password</h4>
      </Modal.Header>

      <Modal.Body style={{ paddingBottom: '0px' }}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <h6>
            Please enter your email to receive an email used to reset your
            password.
          </h6>
          <Form.Control
            className="textInput"
            value={emailFill}
            type="text"
            placeholder="Enter your email."
            autoCapitalize="none"
            // secureTextEntry={true}
            onChange={(e) => {
              setEmailFill(e.target.value);
            }}
          />
        </Form.Group>
      </Modal.Body>

      <hr />
      <Modal.Footer>
        <Button variant="outline-secondary" onClick={props.handleClose}>
          Cancel
        </Button>
        <Button className="confirm-button" onClick={handleSubmit}>
          Reset my password
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
export default ForgotPassword;
