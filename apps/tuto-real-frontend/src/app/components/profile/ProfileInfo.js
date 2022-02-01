import React, {useState, useEffect, useCallback} from 'react'
import {Form} from 'react-bootstrap'
import {useForm} from "react-hook-form"

import {client} from '../../axiosConfig'
import AdvanceInfo from './AdvanceInfo'
import ViewContactInfo from './ViewContactInfo'
import ViewBasicInfo from './ViewBasicInfo'
import EditBasicInfo from './EditBasicInfo'
import EditContactInfo from './EditContactInfo'
import NormalButton from '../ui/NormalButton'
import "./profile.css"

import COLORS from '../../constants/color'

 
const ProfileInfo = () => {
  const [viewType, setViewType] = useState("TutorSelf") // "TutorSelf" | "StudentSelf" | "TutorOther"
  // const [uid, setUid] = useState()
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

  const {register, handleSubmit, reset, formState: { errors }} = useForm()

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

  const onSubmit = (data) => {
    console.log(data)
  }

  const onCancel = () => {
    setEditing(false)
    reset()
  }

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
      <Form className='form'>
        <EditBasicInfo register={register} basicInfo={basicInfo} />
        <EditContactInfo register={register} contactInfo={contactInfo} />
      </Form>
    )
  }

  return (
    <>
      {isEditing ? renderEditForm(): renderViewForm()}
      {viewType !== "TutorOther"? (
        <>
          <AdvanceInfo advance={advance} />
          {isEditing? (
            <div style={{width: "45%", textAlign: "right", marginBottom: "5%"}}>
              <NormalButton title={"Submit"} whenClick={handleSubmit(onSubmit)} size={"l"} bgColor={COLORS.third} />
              <NormalButton title={"Cancel"} whenClick={onCancel} size={"l"} bgColor={COLORS.yellow} />
            </div>
          ): (
            <div style={{width: "45%", textAlign: "right", marginBottom: "5%"}}>
              <NormalButton title={"Edit"} whenClick={() => setEditing(true)} size={"l"} bgColor={COLORS.third} />
            </div>
          )}
        </>
      ): null}
    </>
  )
}

export default ProfileInfo