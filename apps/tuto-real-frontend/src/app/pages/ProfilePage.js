import React, { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

import { client } from '../axiosConfig'
import ProfileInfo from '../components/profile/ProfileInfo'
import ProfileMenuBar from '../components/profile/ProfileMenuBar'
import ProfileTeachSchedule from '../components/profile/teach-schedule/ProfileTeachSchedule'
// import { getCookieData } from '../components/util/cookieHandler'

import { useAuth } from '../auth'
import { useLocation } from 'react-router-dom'

const ProfilePage = () => {
  const [selecting, setSelecting] = useState("Info") // "Info" | "Learn" | "Teach" | "Review"
  const [viewType, setViewType] = useState("StudentSelf") // "TutorSelf" | "StudentSelf" | "TutorOther"
    
  const { currentUser } = useAuth()
  
  const navigate = useNavigate()
  const location = useLocation()
  const [targetEmail] = useState(location.state?.targetEmail)
  const [targetRole, setTargetRole] = useState("")


  const fetchData = useCallback(async () => {
    console.log("Fetching.........")
    await client({
      method: "GET",
      url: `/user/${targetEmail}`
    })
    .then(({data}) => {
      console.log(data)
      // console.log("currentUser: ", firstName, " ", lastName, " ", currentUser)
      // setViewType(calculateViewType(data[0]?.role))
      setTargetRole(data[0]?.role)
    })
    .catch((res) => {
      console.log(res)
    })
  },[])
  
  useEffect(() => {
    fetchData()
  },[fetchData])

  useEffect(() => {
    if(!location.state) navigate("/")
  },[])

  useEffect(() => {
    if (targetEmail === currentUser?.email) {
      if (targetRole === "Tutor") setViewType("TutorSelf")
      if (targetRole === "Student") setViewType("StudentSelf")
    } else setViewType("TutorOther")
  },[currentUser, targetRole])

  // useEffect(() => {
  //   console.log("Current User Updated!!!!")
  //   if(!location.state && currentUser) setTargetEmail(currentUser.email)
  // },[currentUser])

  // function calculateViewType(targetProfileUserType) {
  //   console.log(currentUser?.email)
  //   if (targetEmail === currentUser?.email) {
  //   // if ((targetEmail ?? dummyTargetEmail) === currentUser.email) {
  //     if (targetProfileUserType === "Tutor"){
  //       return "TutorSelf"
  //     }
  //     if (targetProfileUserType === "Student"){
  //       return "StudentSelf"
  //     }
  //   }
  //   else {
  //     return "TutorOther"
  //   }
  // }

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
        />)
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