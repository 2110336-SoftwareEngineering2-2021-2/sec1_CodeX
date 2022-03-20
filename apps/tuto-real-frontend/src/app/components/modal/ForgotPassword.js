import { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import './ForgotPassword.css';
import { useAuth } from '../../auth';

const ForgotPassword = ({ show, handleClose }) => {
  const [emailFill, setEmailFill] = useState('');

  const { resetPassword } = useAuth();

  const handleSubmit = () => {
    if (emailFill.length === 0) alert('Please enter your email.');
    else resetPassword(emailFill, handleClose);
  };

  return (
    <Modal className="forgot-password" show={show} onHide={handleClose}>
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
            onChange={(e) => {
              setEmailFill(e.target.value);
            }}
          />
        </Form.Group>
      </Modal.Body>

      <hr />
      <Modal.Footer>
        <Button variant="outline-secondary" onClick={handleClose}>
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
