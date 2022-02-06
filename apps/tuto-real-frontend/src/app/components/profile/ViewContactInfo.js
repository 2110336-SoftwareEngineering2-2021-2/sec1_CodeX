import React from 'react'

import "./profile.css"

const ViewContactInfo = ({viewType, contactInfo}) => {
  const {email, telephone, address} = contactInfo

  function translateMobilePhoneToShow(telephone) {
    let tmp = telephone;
    if (telephone.lenght < 10) {
      let temp = telephone + 'xxxxxxxxxxxxxxxx';
      return temp.substr(0,3) + "-" + temp.substr(3,3) + "-" + temp.substr(6,4)
    } 
    return tmp.substr(0,3) + "-" + tmp.substr(3,3) + "-" + tmp.substr(6,4) 
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