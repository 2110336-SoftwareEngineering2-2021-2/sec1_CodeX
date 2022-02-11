import { useState, useEffect, useCallback } from "react"
import { Form } from "react-bootstrap";
import NormalButton from "../../ui/NormalButton";
import EditTeachingInfo from "./EditTeachingInfo";
import ViewTeachingInfo from "./ViewTeachingInfo";


import "../profile.css"
import COLORS from "../../../constants/color";
import { client } from "../../../axiosConfig";


const ProfileTeachSchedule = ({targetId, targetEmail, viewType}) => {

    const [isEditing,setEditing] = useState(false);
    const [teachingInfo, setTeachingInfo] = useState({
        subjectList: [],
        description: "",
    })
    const [tempTeachingInfo, setTempTeachingInfo] = useState({
        subjectList: [],
        description: "",
    })

    const fetchData = useCallback(async () => {
        await client({
            method: "GET",
            // url: `/user/${targetEmail}`
            url: `/user`,
            params: {
            _id: targetId
            },
        })
        .then(({data :{data}}) => {
            console.log(data)
            setTempTeachingInfo({
                subjectList: data.subjects ?? [],
                description: data.description ?? ""
            })
            setTeachingInfo({
                subjectList: data.subjects ?? [],
                description: data.description ?? ""
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
        await client({
            method: "PATCH",
            // url: `/user/${targetEmail}`,
            url: `/user`,
            params: {
                _id: targetId
                },
            data: {
                subjects: tempTeachingInfo.subjectList,
                description: tempTeachingInfo.description
            }
        }).then(({data}) => {
            console.log(data)
            setTeachingInfo(tempTeachingInfo);
            setEditing(false)
        }).catch(({response}) => {
            console.log(response)
            setEditing(false);
        })
    }

    const onCancel = () => {
        setTempTeachingInfo(teachingInfo)
        setEditing(false)
    }

    const renderViewForm = () => {
        return (
            <Form className="form">
                <ViewTeachingInfo viewType={viewType} teachingInfo={teachingInfo}/>
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