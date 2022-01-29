import React, { useState } from 'react'
import ProfileMenuBar from '../components/profile/ProfileMenuBar'

const ProfilePage = () => {
  // const [selecting, setSelecting] = useState("Info") // "Info" | "Learn" | "Teach" | "Review"
  const [viewType, setViewType] = useState("TutorSelf") // "TutorSelf" | "StudentSelf" | "TutorOther"

  return (
    <>
      <ProfileMenuBar viewType={viewType} />
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