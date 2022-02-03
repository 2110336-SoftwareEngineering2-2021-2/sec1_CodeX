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
        subject: ["SubjectA", "SubjectB", "SubjectC"],
        description: "Veerin",
      })

    const renderViewForm = () => {
        return (
            <Form className="form">
                <ViewTeachingInfo 
                    viewType={viewType} 
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
                    <NormalButton title={"Edit"} whenClick={() => setEditing(true)} size={"l"} bgColor={COLORS.third}/>
                </div>
            )}
        </>
    )
}

export default ProfileTeachSchedule