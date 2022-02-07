import React from 'react'
import {Form} from 'react-bootstrap'

import "./profile.css"

const EditContactInfo = ({register, errors, contactInfo}) => {
  const {email, telephone, address} = contactInfo

  function translateMobilePhoneToShow(telephone) {
    var tmp = telephone;
    if (tmp.length < 10) {
      tmp = telephone + 'xxxxxxxxxxxxxxxx';
    } 
    return tmp.substr(0,3) + "-" + tmp.substr(3,3) + "-" + tmp.substr(6,4);
  }
  
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
        <p>{translateMobilePhoneToShow(telephone)}</p>
        {/* <Form.Group className="form-group">
          <Form.Control {...register("telephone", {required: true, pattern: /^([0-9])+$/, minLength:10, maxLength:10})} type="text" defaultValue={telephone} />
          <p className="error">{errors.telephone && "Invalid phone number"}</p>
        </Form.Group> */}
      </div>
      <hr />
      <div className='section'>
        <p className='header'>ADDRESS</p>
        <Form.Group className="form-group">
          <Form.Control {...register("address", {required: true, maxLength: 100})} type="text" defaultValue={address} />
          <p className="error">{errors.address?.type === 'required' && "Address is required"}</p>
          <p className="error">{errors.address?.type === 'maxLength' && "Adress can't exceed 100 characters"}</p>
        </Form.Group>
      </div>
    </div>
  )
}

export default EditContactInfo