import React from 'react'

import "./profile.css"

const ViewBasicInfo = ({viewType, basicInfo}) => {
  const {firstName, lastName, birthDate, citizenId} = basicInfo

  return (
    <div className='info-card shadow'>
      <p className='title'>Basic Information</p>
      <p className='header' style={{width: "100%"}}>Some of your information may be seen by other users.</p>
      <hr />
      <div className='section'>
        <p className='header'>PICTURE</p>
      </div>
      <hr />
      <div className='section'>
        <p className='header'>FIRST NAME</p>
        <p>{firstName}</p>
      </div>
      <hr />
      <div className='section'>
        <p className='header'>LAST NAME</p>
        <p>{lastName}</p>
      </div>
      <hr />
      <div className='section'>
        <p className='header'>BIRTHDATE</p>
        <p>{birthDate? birthDate.toLocaleString('en-US', {
              day: 'numeric', // numeric, 2-digit
              year: 'numeric', // numeric, 2-digit
              month: 'long', // numeric, 2-digit, long, short, narrow
            }): "-"}
        </p>
      </div>
      {viewType !== "TutorOther"? (
        <>
          <hr />
          <div className='section'>
            <p className='header'>CITIZEN ID</p>
            <p>{citizenId}</p>
          </div>
        </>
      ): null}
    </div>
  )
}

export default ViewBasicInfo