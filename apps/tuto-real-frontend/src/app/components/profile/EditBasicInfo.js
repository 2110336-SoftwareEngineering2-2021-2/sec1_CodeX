import React from 'react'
import {Form, Col, Row} from 'react-bootstrap'

const EditBasicInfo = ({register, basicInfo}) => {
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
        <Form.Control {...register("firstName")} type="text" defaultValue={firstName} />
      </div>
      <hr />
      {/* Last Name */}
      <div className='section'>
        <p className='header'>LAST NAME</p>
        <Form.Control {...register("lastName")} type="text" defaultValue={lastName} />
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
      {/* {viewType !== "TutorOther"? (
        <>
          <hr />
          <div className='section'>
            <p className='header'>CITIZEN ID</p>
            <p>{citizenId}</p>
          </div>
        </>
      ): null} */}
    </div>
  )
}

export default EditBasicInfo