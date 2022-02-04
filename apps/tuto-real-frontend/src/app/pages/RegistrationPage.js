import React, { useState } from 'react'
import { Col, Button, Form, Row } from 'react-bootstrap'
import { from, range, reduce } from 'rxjs';
import './RegistrationPage.css'


const RegistrationPage = () => {
  
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mobilePhone, setMobilePhone] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [birthDay, setBirthDay] = useState('');
  const [birthMonth, setBirthMonth] = useState('');
  const [birthYear, setBirthYear] = useState('');

  const [address, setAddress] = useState('');
  const [citizenId, setCitizenId] = useState('');

  const [errorMessage, setErrorMessage] = useState('');
  const [validated, setValidated] = useState(false);

  const handleSubmit = () => {

    console.log("Validateing...");

    if (firstName.length == 0) 
      setErrorMessage("Your first name can't be empty.");
    
    else if (lastName.length == 0) 
      setErrorMessage("Your last name can't be empty.");

    else if (mobilePhone.length == 0) 
      setErrorMessage("Your mobile phone can't be empty.");
    else if (isNaN(mobilePhone) || mobilePhone.length != 8) 
      setErrorMessage("The mobile phone must be 8 numeric characters long.");

    else if (emailAddress.length == 0) 
      setErrorMessage("Your email address can't be empty.");
    
    else if (password.length == 0) 
      setErrorMessage("Your password can't be empty.");
    else if (password.length < 8) 
      setErrorMessage("Your password must long than 8 charectors.");

    else if (confirmPassword.length == 0) 
      setErrorMessage("Please confirm your password.");
    else if (confirmPassword != password) 
      setErrorMessage("Your password and confirm password is not match.");

    else if (citizenId.length == 0) 
      setErrorMessage("Your citizen id can't be empty.");
    else if (isNaN(mobilePhone) || mobilePhone.length != 13) 
      setErrorMessage("The citizen id must be 13 numeric characters long.");

    else {
      setErrorMessage("Everything OK");
    }
    
    console.log("Error message : ",errorMessage);
  };


  const birthDayChoice = Array.from({length: 31}, (_, i) => i + 1);
  const birthMonthChoice = 
                ['January', 
                'February', 
                'March', 
                'April', 
                'May', 
                'June', 
                'July', 
                'August', 
                'September', 
                'October', 
                'November', 
                'December']
  const birthYearChoice = Array.from({length: 123}, (_, i) => i + 1900);

  return (
  <div className="page-container" >
    <div className='regispage-left-side'>
      <p className='tutoreal-icon'>TutoReal</p>
      <p className='tutoreal-desc'>
        Tutoreal description .............................. 
        ................................................................ 
        ................................................................</p>
      <div style={{display: 'flex', justifyContent: 'flex-end', width: '100%'}}>
        <p className='sponser'>Power by CodeX</p>
      </div>
    </div>

    <div className='regispage-right-side'>
      <Form 
        // noValidate 
        // validated={validated} 
        // onSubmit={handleSubmit}
      >
        {errorMessage.length != 0 ?
          <p style={{color:'red', fontFamily:'roboto', fontWeight:'bold', marginBottom:'1vh'}}>
            {errorMessage}
          </p>
          : null
        }
        <Row style={{margin: '0px', marginBottom: '0.65vh'}}>
          <Col style={{padding: '0px'}}>
            <Form.Control 
              className='form-control-regis' 
              type="text" 
              placeholder="First name" 
              required 
              style={{width: '98%', margin: '0px'}}
              onChange={e => {
                setFirstName(e.target.value); 
                console.log('Edit first name to ',e.target.value)
              }}
            />
          </Col>
          <Col style={{padding: '0px', display: 'flex', justifyContent: 'flex-end'}}>
            <Form.Control 
              className='form-control-regis' 
              type="text" 
              placeholder="Last name" 
              required
              style={{width: '98%',  margin: '0px'}}
              onChange={e => {
                setLastName(e.target.value); 
                console.log('Edit last name to ',e.target.value)
              }}
            />
          </Col>
        </Row>

        <Form.Control 
          className='form-control-regis' 
          type="text" 
          placeholder="Mobile phone" 
          required
          onChange={e => {
            setMobilePhone(e.target.value); 
            console.log('Edit mobile phone to ',e.target.value)
          }}
        />

        <Form.Control 
          className='form-control-regis' 
          type="text" 
          placeholder="Email address" 
          required
          onChange={e => {
            setEmailAddress(e.target.value); 
            console.log('Edit email address to ',e.target.value)
          }}
        />

        <Form.Control 
          className='form-control-regis' 
          type="password" 
          placeholder="New password" 
          required
          onChange={e => {
            setPassword(e.target.value); 
            console.log('Edit password')
          }}
        />

        <Form.Control 
          className='form-control-regis' 
          type="password" 
          placeholder="Confirm password" 
          required
          onChange={e => {
            setConfirmPassword(e.target.value); 
            console.log('Edit confirm password')
          }}
        />

        <Form.Group className='form-group-regis'>
          <Form.Label className='mini-lable'>Date of Birth</Form.Label>
          <Row className='birthday-dropdown-row-regis' >
            <Col style={{padding: '0px'}}>
              <Form.Select 
                aria-label="Default select example" 
                style={{width: '95%'}}
                onChange={e => {
                  setBirthDay(e.target.value);
                  console.log('Set day of birth to ', e.target.value)
                }}
              >
                <option disabled>Date</option>
                {birthDayChoice.map(e => (<option value={e}>{e}</option>))}
              </Form.Select>
            </Col>

            <Col style={{padding: '0px', display: 'flex', justifyContent: 'center'}}>
              <Form.Select 
                aria-label="Default select example" 
                style={{width: '95%'}}
                onChange={e => {
                  setBirthMonth(e.target.value);
                  console.log('Set month of birth to ', e.target.value)
                }}
              >
                <option disabled>Month</option>
                {birthMonthChoice.map(e => (<option value={e}>{e}</option>))}
              </Form.Select>
            </Col>

            <Col style={{padding: '0px', display: 'flex', justifyContent: 'flex-end'}}>
              <Form.Select 
                aria-label="Default select example" 
                style={{width: '95%'}}
                onChange={e => {
                  setBirthYear(e.target.value);
                  console.log('Set year of birth to ', e.target.value)
                }}
              >
                <option disabled>Year</option>
                {birthYearChoice.map(e => (<option value={e}>{e}</option>))}
              </Form.Select>
            </Col>
          </Row>
        </Form.Group>

        <Form.Group className='form-group-regis'>
          <Form.Label className='mini-lable'>Address</Form.Label>
          <Form.Control 
            as="textarea" 
            rows={3}
            onChange={e => {
              setAddress(e.target.value); 
              console.log('Edit address to ',e.target.value)
            }}
          />
        </Form.Group>
        
        <Form.Control 
          className='form-control-regis' 
          type="text" 
          placeholder="Citizen Id" 
          required
          onChange={e => {
            setCitizenId(e.target.value); 
            console.log('Edit citizen id to ',e.target.value)
          }}
        />

        <Button 
          className='signup-button-regis' 
          variant="secondary" 
          type="button"
          onClick={() =>{
            handleSubmit();
          }}
        >
          Sign up
        </Button>

        <p className='signin-button-regis'>
          If you already have account, sign in
        </p>
      </Form>
    </div>
  </div>
  )
}

export default RegistrationPage