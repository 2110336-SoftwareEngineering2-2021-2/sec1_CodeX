import { useState, useEffect, useCallback } from "react"
import { Form } from "react-bootstrap";
import NormalButton from "../../ui/NormalButton";
import EditTeachingInfo from "./EditTeachingInfo";
import ViewTeachingInfo from "./ViewTeachingInfo";
import "../profile.css"
import COLORS from "../../../constants/color";


const ProfileTeachSchedule = ({viewType}) => {

    const [isEditing,setEditing] = useState(false);
    const [teachingInfo, setTeachingInfo] = useState({
        subjectList: ["SubjectA", "SubjectB", "SubjectC", "SubjectD", "SubjectE", "SubjectF"],
        description: "Let's fun with math to the end of the life \n 123",
    })
    const [tempTeachingInfo, setTempTeachingInfo] = useState({
        subjectList: ["SubjectA", "SubjectB", "SubjectC", "SubjectD", "SubjectE", "SubjectF"],
        description: "Let's fun with math to the end of the life \n 123",
    })

    const fetchData = useCallback(() => {
        client({
            method: "GET",
            url: "/.....",
        }).then(({data}) => {
            console.log(data)
            // setTempTeachingInfo({
            //     subjectList: data.
            //     description: data.
            // })
            // setTeachingInfo({
            //     subjectList: data.
            //     description: data.
            // })
        }).catch(({response}) => {
            console.log(response)
        })
    },[])

    useEffect(() => {
        fetchData
    }, [fetchData])
    
    useEffect(() => {
        console.log("This is real: ")
        console.log(teachingInfo.subjectList)
    }, [teachingInfo])
    
    useEffect(() => {
        console.log("This is temp: ")
        console.log(tempTeachingInfo.subjectList)
    }, [tempTeachingInfo])

    const sendData = () => {
        setTeachingInfo(tempTeachingInfo)
        setEditing(false)
    //     client({
    //         method: "...",
    //         url: "/.....",
    //         body: {
    //             tempTeachingInfo
    //         }
    //     }).then(({data}) => {
    //         // console.log(data)
    //         // setEditing(false)
    //     }).catch(({response}) => {
    //         console.log(response)
    //     })
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