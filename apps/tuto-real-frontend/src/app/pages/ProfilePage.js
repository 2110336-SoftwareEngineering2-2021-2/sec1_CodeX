import React, { useState, useEffect, useCallback } from 'react'

import { client } from '../axiosConfig'
import ProfileInfo from '../components/profile/ProfileInfo'
import ProfileMenuBar from '../components/profile/ProfileMenuBar'

const ProfilePage = () => {
  const [selecting, setSelecting] = useState("Info") // "Info" | "Learn" | "Teach" | "Review"
  const [viewType, setViewType] = useState("TutorSelf") // "TutorSelf" | "StudentSelf" | "TutorOther"

  const fetchData = useCallback(() => {
    client({
      method: "GET",
      url: "/tutor/:uid"
    })
    .then(({data}) => {
      console.log(data)
    })
    .catch((res) => {
      console.log(res)
    })
  },[])

  useEffect(() => {
    fetchData()
  },[fetchData])

  const renderContent = () => {
    switch(selecting) {
      case "Info": return (<ProfileInfo />)
      case "Learn": return null // Replace null with Student Schedule page...
      case "Teach": return null // Replace null with Tutor Schedule page...
      case "Review": return null // Replace null with Review page...
      default: return (<ProfileInfo />)
    }
  }

  return (
    <>
      <ProfileMenuBar viewType={viewType} />
      {renderContent()}
    </>
  )
  
  
}

export default ProfilePage