import React, { useState, useEffect, useCallback } from 'react'

import { client } from '../axiosConfig'
import AdvanceInfo from '../components/profile/AdvanceInfo'
import ContactInfo from '../components/profile/ContactInfo'
import ProfileMenuBar from '../components/profile/ProfileMenuBar'
import ViewBasicInfo from '../components/profile/ViewBasicInfo'
import NormalButton from '../components/ui/NormalButton'

import COLORS from '../constants/color'

const ProfilePage = () => {
  // const [selecting, setSelecting] = useState("Info") // "Info" | "Learn" | "Teach" | "Review"
  const [viewType, setViewType] = useState("TutorSelf") // "TutorSelf" | "StudentSelf" | "TutorOther"
  const [uid, setUid] = useState()
  const [isEditing, setEditing] = useState(false)
  const [basicInfo, setBasicInfo] = useState({
    picture: "",
    firstName: "Veerin",
    lastName: "Phana-ngam",
    birthDate: new Date(),
    citizenId: "1-2345-67891-11-1"
  })
  const [contactInfo, setContactInfo] = useState({
    email: "",
    telephone: "",
    address: ""
  })
  const [advance, setAdvance] = useState({
    userType: "User",
    password: ""
  })

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

  return (
    <>
      <ProfileMenuBar viewType={viewType} />
      <ViewBasicInfo 
        viewType={viewType}  
        basicInfo={basicInfo}
      />
      <ContactInfo
        viewType={viewType}
        contactInfo={contactInfo}
      />
      {viewType !== "TutorOther"? (
        <AdvanceInfo advance={advance} />
      ): null}
      <div style={{width: "45%", textAlign: "right", marginBottom: "5%"}}>
        <NormalButton title={"Edit"} whenClick={() => setEditing(true)} size={"l"} color={COLORS.third} />
      </div>
    </>
  )
  
}

export default ProfilePage