import React, { useState, useEffect, useCallback } from 'react'

import { client } from '../axiosConfig'
import ProfileInfo from '../components/profile/ProfileInfo'
import ProfileMenuBar from '../components/profile/ProfileMenuBar'
import ProfileTeachSchedule from '../components/profile/teach-schedule/ProfileTeachSchedule'
import { getCookieData } from '../components/util/cookieHandler'

import { useAuth } from '../auth'

const ProfilePage = () => {
  const [selecting, setSelecting] = useState("Info") // "Info" | "Learn" | "Teach" | "Review"
  const [viewType, setViewType] = useState("TutorSelf") // "TutorSelf" | "StudentSelf" | "TutorOther"
  const [currentUser] = useState({
    email: "sora@gmail.com",
    type: "Tutor"
  })

  const [targetEmail] = useState("sora@gmail.com")

  const fetchData = useCallback(async () => {
    await client({
      method: "GET",
      url: `/user/${targetEmail}`
    })
    .then(({data}) => {
      console.log(data)
      setViewType(calculateViewType(data[0].role))
    })
    .catch((res) => {
      console.log(res)
    })
  },[])

  function calculateViewType(targetProfileUserType) {
    if (targetEmail === currentUser.email) {
      if (targetProfileUserType === "Tutor"){
        return "TutorSelf"
      }
      if (targetProfileUserType === "Student"){
        return "StudentSelf"
      }
    }
    else {
      return "TutorOther"
    }
  }

  useEffect(() => {
    fetchData()
  },[fetchData])

  const renderContent = () => {
    switch(selecting) {
      case "Info": return (
        <ProfileInfo 
          targetEmail={targetEmail} 
          viewType={viewType}
        />)
      case "Learn": return null // Replace null with Student Schedule page...
      case "Teach": return (
        <ProfileTeachSchedule 
          targetEmail={targetEmail} 
          viewType={viewType}
        />) // Replace null with Tutor Schedule page...
      case "Review": return null // Replace null with Review page...
      default: return (<ProfileInfo />)
    }
  }

  return (
    <>
      <ProfileMenuBar viewType={viewType} setSelecting={setSelecting} selecting={selecting}/>
      {renderContent()}
    </>
  )
  
  
}

export default ProfilePage