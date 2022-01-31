import React, {useState, useEffect, useCallback} from 'react'

import {client} from '../../axiosConfig'
import AdvanceInfo from './AdvanceInfo'
import ViewContactInfo from './ViewContactInfo'
import ViewBasicInfo from './ViewBasicInfo'
import NormalButton from '../ui/NormalButton'

import COLORS from '../../constants/color'
import EditBasicInfo from './EditBasicInfo'
import EditContactInfo from './EditContactInfo'

 
const ProfileInfo = () => {
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

  const renderViewForm = () => {
    return (
      <>
        <ViewBasicInfo 
          viewType={viewType}  
          basicInfo={basicInfo}
        />
        <ViewContactInfo
          viewType={viewType}
          contactInfo={contactInfo}
        />
    </>
    )
  }

  const renderEditForm = () => {
    return (
      <>
        <EditBasicInfo />
        <EditContactInfo />
      </>
    )
  }

  return (
    <>
      {isEditing? renderEditForm(): renderViewForm()}
      {viewType !== "TutorOther"? (
        <AdvanceInfo advance={advance} />
      ): null}
      {isEditing? (
        <div style={{width: "45%", textAlign: "right", marginBottom: "5%"}}>
          <NormalButton title={"Submit"} whenClick={() => console.log("saving")} size={"l"} color={COLORS.third} />
          <NormalButton title={"Cancel"} whenClick={() => setEditing(false)} size={"l"} color={COLORS.yellow} />
        </div>
      ): (
        <div style={{width: "45%", textAlign: "right", marginBottom: "5%"}}>
          <NormalButton title={"Edit"} whenClick={() => setEditing(true)} size={"l"} color={COLORS.third} />
        </div>
      )}
    </>
  )
}

export default ProfileInfo