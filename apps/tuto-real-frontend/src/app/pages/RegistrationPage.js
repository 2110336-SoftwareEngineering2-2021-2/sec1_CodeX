import React, { useState } from 'react'
import { Dropdown, DropdownButton, Form, Row } from 'react-bootstrap'
import './RegistrationPage.css'

const RegistrationPage = () => {

  const [birthDayToggle, setBirthDayToggle] = useState(false);

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
      <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>
        <div className='text-input-border' style={{width:'46%'}}>
          <input type='text' placeholder='First name' className='text-input'></input>
        </div>
        <div className='text-input-border' style={{width:'46%'}}>
          <input type='text' placeholder='Last name' className='text-input'></input>
        </div>
      </div>
      <div className='text-input-border'>
        <input type='text' placeholder='Mobile phone' className='text-input'></input>
      </div>
      <div className='text-input-border'>
        <input type='text' placeholder='Email address' className='text-input'></input>
      </div>
      <div className='text-input-border'>
        <input type='text' placeholder='New password' className='text-input'></input>
      </div>
      <div id='mini-group'>
        <p id='mini-label'>Date of birth</p>
        <div style={{width: '100%', display: 'flex', alignItems: 'flex-start', flexDirection: 'row'}}>
          <DropdownButton id="dropdown-basic-button" title="Date" style={{width: '100%'}}>
            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
          </DropdownButton>
          <DropdownButton id="dropdown-basic-button" title="Month" style={{width: '100%'}}>
            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
          </DropdownButton>
          <DropdownButton id="dropdown-basic-button" title="Year" style={{width: '100%'}}>
            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
          </DropdownButton>
        </div>
      </div>
      <div id='mini-group'>
        <p id='mini-label'>Address</p>
        <div className='text-input-border' style={{height:'80px', display: 'flex', alignItems: 'flex-start', marginBottom: '0px', backgroundColor: 'white'}}>
        <input type='text' placeholder='' className='text-input'></input>
      </div>
      </div>
      <div className='text-input-border'>
        <input type='text' placeholder='Citizen Id' className='text-input'></input>
        
      </div>
      
      {/* <input type='text' placeholder='First name' className='text-input' aria-placeholder=''></input> */}
    </div>
  </div>
  )
}

export default RegistrationPage