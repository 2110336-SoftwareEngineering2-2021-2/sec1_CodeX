import { useState } from "react"
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

    const renderViewForm = () => {
        return (
            <Form className="form">
                <ViewTeachingInfo 
                    teachingInfo={teachingInfo}
                />
            </Form>
        )
    }


    const renderEditForm = () => {
        return (
            <Form>
                <EditTeachingInfo />
            </Form>
        )
    }

    return (
        <>
            {isEditing ? renderEditForm() : renderViewForm()}
            {isEditing? (
                <div style={{width: "45%", textAlign: "right", marginBottom: "5%"}}>
                    <NormalButton title={"Submit"} size={"l"} bgColor={COLORS.third} />
                    <NormalButton title={"Cancel"} whenClick={() => setEditing(false)} size={"l"} bgColor={COLORS.yellow} />
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