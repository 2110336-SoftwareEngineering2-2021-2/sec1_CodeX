import React from 'react'
import {Form, Col, Row} from 'react-bootstrap'

import "./profile.css"

const EditBasicInfo = ({register, errors, basicInfo}) => {
  const {firstName, lastName, birthDate, citizenId} = basicInfo
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
    <div className='info-card shadow'>
      <p className='title'>Basic Information</p>
      <p className='header' style={{width: "100%"}}>Some of your information may be seen by other users.</p>
      <hr />
      {/* Picture */}
      <div className='section'>
        <p className='header'>PICTURE</p>
      </div>
      <hr />
      {/* First Name */}
      <div className='section'>
        <p className='header'>FIRST NAME</p>
        <Form.Group className="form-group">
          <Form.Control {...register("firstName", {required: true, maxLength: 100})} type="text" defaultValue={firstName} />
          <p className="error">{errors.firstName?.type === 'required' && "First name is required"}</p>
        </Form.Group>
      </div>
      <hr />
      {/* Last Name */}
      <div className='section'>
        <p className='header'>LAST NAME</p>
        <Form.Group className="form-group">
          <Form.Control {...register("lastName", {required: true, maxLength: 100})} type="text" defaultValue={lastName} />
          <p className="error">{errors.lastName?.type === 'required' && "Last name is required"}</p>
        </Form.Group>
      </div>
      <hr />
      {/* Birthdate */}
      <div className='section'>
        <p className='header'>BIRTHDATE</p>
        <Form.Group style={{width: "100%"}}>
          <Row>
            {/* Date */}
            <Col>
              <Form.Select
                {...register("date")}
                defaultValue={birthDate.getDate()}
              >
                {birthDayChoice.map(e => (<option key={e} value={e}>{e}</option>))}
              </Form.Select>
            </Col>
            {/* Month */}
            <Col>
              <Form.Select 
                {...register("month")}
                defaultValue={birthDate.getMonth()}
                >
                {birthMonthChoice.map(e => (<option key={e} value={e}>{e}</option>))}
              </Form.Select>
            </Col>
            {/* Year */}
            <Col>
              <Form.Select 
                {...register("year")}
                defaultValue={birthDate.getFullYear()}
              >
                {birthYearChoice.map(e => (<option key={e} value={e}>{e}</option>))}
              </Form.Select>
            </Col>
          </Row>
        </Form.Group>
      </div>
      {/* Citizen ID */}
      <hr />
      <div className='section'>
        <p className='header'>CITIZEN ID</p>
        <Form.Group className="form-group">
          <Form.Control {...register("citizenId", {required: true, minLength: 13, maxLength: 13})} type="text" defaultValue={citizenId} />
          <p className="error">{errors.citizenId && "Invalid citizen ID"}</p>
        </Form.Group>
      </div>
    </div>
  )
}

export default EditBasicInfo