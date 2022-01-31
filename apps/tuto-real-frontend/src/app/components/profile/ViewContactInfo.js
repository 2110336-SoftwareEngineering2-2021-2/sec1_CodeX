import React from 'react'

import "./profile.css"

const ViewContactInfo = ({viewType, contactInfo}) => {
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
        <p>{telephone}</p>
      </div>
      {viewType !== "TutorOther"? (
        <>
          <hr />
          <div className='section'>
            <p className='header'>ADDRESS</p>
            <p>{address}</p>
          </div>
        </>
      ): null}
    </div>
  )
}

export default ViewContactInfo