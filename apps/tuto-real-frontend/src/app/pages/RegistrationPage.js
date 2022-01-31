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
        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>
          <Form.Control type="text" placeholder="First name" style={{marginBottom: '0px'}}/>
          <Form.Control type="text" placeholder="Last name" style={{marginBottom: '0px'}}/>
        </div>

        <Form.Control type="text" placeholder="Mobile phone" />

        <Form.Control type="email" placeholder="Email address" />

        <Form.Control type="password" placeholder="New password" />

        <Form.Control type="password" placeholder="Confirm password" />

      

        {/* <div id='mini-group'>
          <p id='mini-label'>Date of birth</p>
          <div style={{width: '100%', display: 'flex', alignItems: 'flex-start', flexDirection: 'row'}}>

            <DropdownButton className='drop-down-regis' id="dropdown-basic-button" title="Date" style={{width: '100%'}}>
              {birthDayChoice.map(e => (
                <Dropdown.Item href="#/action-1">{e}</Dropdown.Item>
              ))}
            </DropdownButton>
            <DropdownButton id="dropdown-basic-button" title="Month" style={{width: '100%'}}>
              <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
            </DropdownButton>
            <DropdownButton id="dropdown-basic-button" title={birthDay} size='lg' style={{width: '100%'}}>
              {numbers.map(e => (
                <Dropdown.Item href="#/action-1">{e}</Dropdown.Item>
                ))}
              <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
            </DropdownButton>
          </div>
        </div> */}
        <Form.Group style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
          <Form.Label style={{marginBottom: '0px'}}>Date of Birth</Form.Label>
          <Row>
            <Col>
              <Form.Select aria-label="Default select example" placeholder='Date'>
                <option>Date</option>
                {birthDayChoice.map(e => (
                  <option value='e'>{e}</option>
                ))}
              </Form.Select>
            </Col>
            <Col>
              <Form.Select aria-label="Default select example">
                <option>Month</option>
                {birthMonthChoice.map(e => (
                  <option value='e'>{e}</option>
                ))}
              </Form.Select>
            </Col>
            <Col>
              <Form.Select aria-label="Default select example">
                <option>Year</option>
                {birthYearChoice.map(e => (
                  <option value='e'>{e}</option>
                ))}
              </Form.Select>
            </Col>
          </Row>
        </Form.Group>

        <Form.Group style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
          <Form.Label style={{marginBottom: '0px'}}>Address</Form.Label>
          <Form.Control as="textarea" rows={3} />
        </Form.Group>
        
        <Form.Control type="password" placeholder="Citizen Id" />

        <Button variant="primary" type="submit">
          Submit
        </Button>
        
        <p>If you already have account, sign in</p>
      </Form>
    </div>
  </div>
  )
}

export default RegistrationPage