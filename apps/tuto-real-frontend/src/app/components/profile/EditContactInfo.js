import React from 'react'
import {Form} from 'react-bootstrap'

import "./profile.css"

const EditContactInfo = ({register, contactInfo}) => {
  const {email, telephone, address} = contactInfo

  return (
    <div className='info-card shadow'>
      <p className='title'>Contact Information</p>
      <hr />
      <div className='section'>
        <p className='header'>EMAIL</p>
        <p>{email}</p>
      </div>
      <hr />
      <div className='section'>
        <p className='header'>TELEPHONE</p>
        <Form.Control {...register("telephone")} type="text" defaultValue={telephone} />
      </div>
      <hr />
      <div className='section'>
        <p className='header'>ADDRESS</p>
        <Form.Control {...register("address")} type="text" defaultValue={address} />
      </div>
    </div>
  )
}

export default EditContactInfo