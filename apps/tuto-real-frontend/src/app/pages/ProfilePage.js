import React, { useState, useEffect, useCallback } from 'react'

import { client } from '../axiosConfig'
import ProfileMenuBar from '../components/profile/ProfileMenuBar'
import ViewBasicInfo from '../components/profile/ViewBacicInfo'

const ProfilePage = () => {
  // const [selecting, setSelecting] = useState("Info") // "Info" | "Learn" | "Teach" | "Review"
  const [viewType, setViewType] = useState("TutorSelf") // "TutorSelf" | "StudentSelf" | "TutorOther"
  const [basicInfo, setBasicInfo] = useState({
    picture: "",
    firstName: "",
    lastName: "",
    birthDate: new Date(),
    citizenId: ""
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
        firstName={"Veerin"}
        lastName={"Phana-ngam"}
        birthDate={new Date()}
        citizenId={"1-2345-67891-11-1"}
      />

    </>
  )
  
}

// const styles = {
//   bar: {
//     display: "flex",
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "stretch",
//     width: "50%",
//     backgroundColor: COLORS.white,
//     borderColor: COLORS.darkgray,
//     borderStyle: "solid",
//     borderWidth: "1px",
//     borderRadius: "30px",
//   }
// }

export default ProfilePage