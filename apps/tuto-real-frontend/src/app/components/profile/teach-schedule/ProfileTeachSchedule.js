import { useState, useEffect, useCallback } from "react"
import { Form } from "react-bootstrap";
import NormalButton from "../../ui/NormalButton";
import EditTeachingInfo from "./EditTeachingInfo";
import ViewTeachingInfo from "./ViewTeachingInfo";


import "../profile.css"
import COLORS from "../../../constants/color";
import { client } from "../../../axiosConfig";


const ProfileTeachSchedule = ({viewType}) => {

    const [isEditing,setEditing] = useState(false);
    const [teachingInfo, setTeachingInfo] = useState({
        subjectList: [],
        description: "description",
    })
    const [tempTeachingInfo, setTempTeachingInfo] = useState({
        subjectList: [],
        description: "description",
    })

    const fetchData = useCallback(async () => {
        await client({
            method: "GET",
            url: "/user/nifon@gmail.com"
        })
        .then(({data}) => {
            console.log(data[0])
            setTempTeachingInfo({
                subjectList: data[0].subjects,
                description: data[0].description
            })
            setTeachingInfo({
                subjectList: data[0].subjects,
                description: data[0].description
            })
        }).catch(({response}) => {
            console.log(response)
        })
    },[])

    // const fetchData = useCallback(async () => {
    //     await client({
    //       method: "GET",
    //       // url: `/user/${contactInfo.email}`
    //       url: "/user/nifon@gmail.com"
    //     })
    //     .then(({data}) => {
    //       console.log(data[0])
    //       // console.log(Date(data[0].birthDate))
    //       // console.log(new Date())
    //     //   setBasicInfo({
    //     //     picture: "",//data[0].profileImg.fileName,
    //     //     firstName: data[0].firstName,
    //     //     lastName: data[0].lastName,
    //     //     birthDate: {
    //     //       day: parseInt(data[0].birthDate.substr(8,2)),
    //     //       month: parseInt(data[0].birthDate.substr(5,2)),
    //     //       year: parseInt(data[0].birthDate.substr(0,4))
    //     //     },
    //     //     citizenId: data[0].citizenID
    //     //   })
    //     //   setContactInfo({
    //     //     email: data[0].email,
    //     //     telephone: data[0].phoneNumber,
    //     //     address: data[0].address
    //     //   })
    //     //   setAdvance({
    //     //     userType: data[0].role,
    //     //     password: ""
    //     //   })
    //     })
    //     .catch(({response}) => {
    //       console.log(response)
    //     })
    //   },[])


    useEffect(() => {
        fetchData()
    }, [fetchData])
    
    // useEffect(() => {
    //     console.log("This is real: ")
    //     console.log(teachingInfo.subjectList)
    // }, [teachingInfo])
    
    // useEffect(() => {
    //     console.log("This is temp: ")
    //     console.log(tempTeachingInfo.subjectList)
    // }, [tempTeachingInfo])

    const sendData =async () => {
        setTeachingInfo(tempTeachingInfo);
        setEditing(false);
        // await client({
        //     method: "PATCH",
        //     url: "/user/nifon@gmail.com",
        //     data: {
        //         subjects: tempTeachingInfo.subjectList,
        //         description: tempTeachingInfo.subjectList
        //     }
        // }).then(({data}) => {
        //     console.log(data)
        //     setEditing(false)
        // }).catch(({response}) => {
        //     console.log(response)
        // })
    }

    const onCancel = () => {
        setTempTeachingInfo(teachingInfo)
        setEditing(false)
    }

    const renderViewForm = () => {
        return (
            <Form className="form">
                <ViewTeachingInfo teachingInfo={teachingInfo}/>
            </Form>
        )
    }


    const renderEditForm = () => {
        return (
            <Form className="form">
                <EditTeachingInfo tempTeachingInfo={tempTeachingInfo} setTempTeachingInfo={setTempTeachingInfo} />
            </Form>
        )
    }

    return (
        <>
            {isEditing ? renderEditForm() : renderViewForm()}
            {isEditing? (
                <div style={{width: "45%", textAlign: "right", marginBottom: "5%"}}>
                    <NormalButton title={"Submit"} whenClick={sendData} size={"l"} bgColor={COLORS.third} />
                    <NormalButton title={"Cancel"} whenClick={onCancel} size={"l"} bgColor={COLORS.yellow} />
                </div>
            ): (
                <div style={{width: "45%", textAlign: "right", marginBottom: "5%"}}>
                    {viewType=="TutorSelf" ?
                        <NormalButton title={"Edit"} whenClick={() => setEditing(true)} size={"l"} bgColor={COLORS.third}/>
                        : null
                    }
                </div>
            )}
        </>
    )
}

export default ProfileTeachSchedule