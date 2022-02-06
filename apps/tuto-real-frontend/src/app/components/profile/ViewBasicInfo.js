import React from 'react'

import "./profile.css"

const ViewBasicInfo = ({viewType, basicInfo}) => {
  const {picture, firstName, lastName, birthDate, citizenId} = basicInfo

  function translateDateToShow(date) {
    const monthName = ['January', 
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
    return monthName[date.month-1].toString() + " " + date.day.toString() + ", " + date.year.toString()
  }

  function translateCitizenIdToShow(citizenId) {
    const tmp = citizenId;
    // console.log("tmp lenght:", tmp.concat("xxxxxxxxxxxxxxxx").lenght)
    // if (tmp.lenght < 13) {
    //   let temp = citizenId.concat("xxxxxxxxxxxxxxxx");
    //   return temp
    //   // return temp[0] + "-" + temp.substr(1,4) + "-" + temp.substr(5,5) + "-" + temp.substr(10,2) + "-" + temp[12]
    // } else {}
    return tmp[0] + "-" + tmp.substr(1,4) + "-" + tmp.substr(5,5) + "-" + tmp.substr(10,2) + "-" + tmp[12]
  }

  return (
    <div className='info-card shadow'>
      <p className='title'>Basic Information</p>
      <p className='header' style={{width: "100%"}}>Some of your information may be seen by other users.</p>
      <hr />
      <div className='section'>
        <p className='header'>PICTURE</p>
        <img className='profile-image' src={picture? URL.createObjectURL(picture): undefined} alt="profile" />
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
        <p>{translateDateToShow(birthDate)}  
        </p>
      </div>
      {viewType !== "TutorOther"? (
        <>
          <hr />
          <div className='section'>
            <p className='header'>CITIZEN ID</p>
            <p>{translateCitizenIdToShow(citizenId)}</p>
          </div>
        </>
      ): null}
    </div>
  )
}

export default ViewBasicInfo