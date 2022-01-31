import React, { useState } from 'react'
import { Col, Button, Form, Row } from 'react-bootstrap'
import { from, range } from 'rxjs';
import './RegistrationPage.css'


const RegistrationPage = () => {

  const [birthDayToggle, setBirthDayToggle] = useState(false);
  const [birthDay, setBirthDay] = useState('Day');
  const numbers = [1,2,3,45];
  
  const [firstName, setFirstName] = useState('');
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
      <Form>
        <Row style={{margin: '0px', marginBottom: '0.65vh'}}>
          <Col style={{padding: '0px'}}>
            <Form.Control className='form-control-regis' type="text" placeholder="First name" style={{width: '98%', margin: '0px'}}/>
          </Col>
          <Col style={{padding: '0px', display: 'flex', justifyContent: 'flex-end'}}>
            <Form.Control className='form-control-regis' type="text" placeholder="Last name" style={{width: '98%',  margin: '0px'}}/>
          </Col>
        </Row>

        <Form.Control className='form-control-regis' type="text" placeholder="Mobile phone" />

        <Form.Control className='form-control-regis' type="email" placeholder="Email address" />

        <Form.Control className='form-control-regis' type="password" placeholder="New password" />

        <Form.Control className='form-control-regis' type="password" placeholder="Confirm password" />

        <Form.Group className='form-group-regis'>
          <Form.Label className='mini-lable'>Date of Birth</Form.Label>
          <Row className='birthday-dropdown-row-regis' >
            <Col style={{padding: '0px'}}>
              <Form.Select aria-label="Default select example" style={{width: '95%'}}>
                <option>Date</option>
                {birthDayChoice.map(e => (
                  <option value='e'>{e}</option>
                ))}
              </Form.Select>
            </Col>
            <Col style={{padding: '0px', display: 'flex', justifyContent: 'center'}}>
              <Form.Select aria-label="Default select example" style={{width: '95%'}}>
                <option>Month</option>
                {birthMonthChoice.map(e => (
                  <option value='e'>{e}</option>
                ))}
              </Form.Select>
            </Col>
            <Col style={{padding: '0px', display: 'flex', justifyContent: 'flex-end'}}>
              <Form.Select aria-label="Default select example" style={{width: '95%'}}>
                <option>Year</option>
                {birthYearChoice.map(e => (
                  <option value='e'>{e}</option>
                ))}
              </Form.Select>
            </Col>
          </Row>
        </Form.Group>

        <Form.Group className='form-group-regis'>
          <Form.Label className='mini-lable'>Address</Form.Label>
          <Form.Control as="textarea" rows={3} />
        </Form.Group>
        
        <Form.Control className='form-control-regis' type="text" placeholder="Citizen Id" />

        <Button className='signup-button-regis' variant="secondary" type="submit">
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