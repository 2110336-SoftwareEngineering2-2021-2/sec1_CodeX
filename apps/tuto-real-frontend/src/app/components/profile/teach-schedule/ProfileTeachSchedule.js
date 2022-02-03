import { useState } from "react"
import { Form } from "react-bootstrap";


const ProfileTeachSchedule = ({viewType}) => {

    const [isEditing,setEditing] = useState(false);

    const renderViewForm = () => {
        return (
            <Form>
                <p>This is teach time schedule view mode</p>
            </Form>
        )
    }


    const renderEditForm = () => {
        return (
            <Form/>
        )
    }

    return (
        <>
            {isEditing ? renderEditForm() : renderViewForm()}
        </>
    )
}

export default ProfileTeachSchedule