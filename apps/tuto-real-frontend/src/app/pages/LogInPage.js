import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth';
import './RegistrationPage.css';
import ForgotPassword from '../../app/components/modal/ForgotPassword';

export default function Signin() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [showModal, setShowModal] = useState(false); // Forgot password modal //

  const navigate = useNavigate();
  const { logIn } = useAuth();

  const handleSubmit = async () => {
    await logIn(email, password, () => navigate('/'));
  };
  const handleClose = () => {
    setShowModal(false);
  };
  return (
    <div className="page-container">
      <div className="regispage-left-side">
        <p className="tutoreal-icon">TutoReal</p>
        <p className="tutoreal-desc">
          Tutoreal description ..............................
          ................................................................
          ................................................................
        </p>
        <div
          style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}
        >
          <p className="sponser">Power by CodeX</p>
        </div>
      </div>

      <div className="regispage-right-side">
        <Form style={{ width: 'inherit' }}>
          <Form.Control
            className="form-control-regis"
            type="text"
            placeholder="Email address"
            required
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />

          <Form.Control
            className="form-control-regis"
            type="password"
            placeholder="New password"
            required
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />

          <Button
            className="signup-button-regis"
            variant="secondary"
            type="button"
            onClick={handleSubmit}
          >
            Sign in
          </Button>

          <ForgotPassword show={showModal} handleClose={handleClose} />

          <p style = {{cursor:'pointer'}}onClick={() => setShowModal(true)}>Forgot your password?</p>

          <Button
            className="signup-button-regis"
            variant="secondary"
            type="button"
            onClick={() => navigate('/register')}
          >
            Sign up
          </Button>
        </Form>
      </div>
    </div>
  );
}
