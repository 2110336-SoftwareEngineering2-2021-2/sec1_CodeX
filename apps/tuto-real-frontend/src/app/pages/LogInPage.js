import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../auth';
import ForgotPassword from '../../app/components/modal/ForgotPassword';
import './RegistrationPage.css';

import COLORS from '../constants/color';

export default function LogInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showModal, setShowModal] = useState(false); // Forgot password modal //

  const navigate = useNavigate();
  const { logIn } = useAuth();

  const handleSubmit = async () => {
    if (email.length === 0) alert('Please enter your email.');
    else if (password.length < 8) alert('Invalid password.');
    else await logIn(email, password, () => navigate('/'));
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
            className="signin-button-regis"
            variant="secondary"
            type="button"
            onClick={handleSubmit}
          >
            Sign in
          </Button>

          <ForgotPassword
            show={showModal}
            handleClose={() => setShowModal(false)}
          />

          <div style={{ margin: '2.5vh 0vw' }}>
            <p
              style={{ cursor: 'pointer', color: COLORS.third }}
              onClick={() => setShowModal(true)}
            >
              Forgot your password?
            </p>
          </div>

          <Button
            className="signup-button-regis"
            style={{ width: 'fit-content' }}
            variant="outline-success"
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
