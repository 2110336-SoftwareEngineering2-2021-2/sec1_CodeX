import { useState, useEffect, useCallback } from "react"
import { Form } from "react-bootstrap";
import NormalButton from "../../ui/NormalButton";
import EditTeachingInfo from "./EditTeachingInfo";
import ViewTeachingInfo from "./ViewTeachingInfo";


import "../profile.css"
import COLORS from "../../../constants/color";
import { client } from "../../../axiosConfig";


const ProfileTeachSchedule = ({targetEmail,viewType}) => {

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
            url: `/user/${targetEmail}`
        })
        .then(({data}) => {
            console.log(data[0])
            setTempTeachingInfo({
                subjectList: data[0].subjects ?? ["ERROR: this owner profile isn't Tutor"],
                description: data[0].description ?? "ERROR: this owner profile isn't Tutor"
            })
            setTeachingInfo({
                subjectList: data[0].subjects ?? ["ERROR: this owner profile isn't Tutor"],
                description: data[0].description ?? "ERROR: this owner profile isn't Tutor"
            })
        }).catch(({response}) => {
            console.log(response)
        })
    },[])

    useEffect(() => {
        fetchData()
        console.log("viewType: ", viewType)
    }, [fetchData])

    // useEffect(() => {
    //     console.log("setTempTeachingInfo: ", tempTeachingInfo)
    // }, [tempTeachingInfo])

    const sendData = async () => {
        setTeachingInfo(tempTeachingInfo);
        setEditing(false);
        await client({
            method: "PATCH",
            url: `/user/${targetEmail}`,
            data: {
                subjects: tempTeachingInfo.subjectList,
                description: tempTeachingInfo.description
            }
        }).then(({data}) => {
            console.log(data)
            setEditing(false)
        }).catch(({response}) => {
            console.log(response)
        })
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
                    <NormalButton 
                        title={"Submit"} 
                        whenClick={sendData} 
                        size={"l"} 
                        bgColor={COLORS.third} 
                    />
                    <NormalButton 
                        title={"Cancel"} 
                        whenClick={onCancel} 
                        size={"l"} 
                        bgColor={COLORS.yellow} 
                    />
                </div>
            ): (
                <div style={{width: "45%", textAlign: "right", marginBottom: "5%"}}>
                    {viewType=="TutorSelf" ?
                        <NormalButton 
                            title={"Edit"} 
                            whenClick={() => setEditing(true)} 
                            size={"l"} 
                            bgColor={COLORS.third}
                        />
                        : null
                    }
                </div>
            )}
        </>
    )
}

export default ProfileTeachSchedule