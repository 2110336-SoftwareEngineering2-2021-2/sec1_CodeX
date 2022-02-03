import { useState } from "react";
import { Badge } from "react-bootstrap";
import "../profile.css"

const ViewTeachingInfo = ({viewType, teachingInfo}) => {
    const [badgeColor, setBadgeColor] = useState(["primary", "secondary", "success", "danger", "warning", "info"]);
    const {subjectList,description} = teachingInfo;
    return (
        <div className='info-card shadow'>
            <p className='title'>teaching information</p>
            <p className='header' style={{width: "100%"}}>Some of your information may be seen by other users.</p>
            <hr />
            <div className='section'>
                <p className='header'>SUBJECT</p>
                {subjectList.map((e,i) => (
                    <Badge 
                        pill 
                        bg={badgeColor[i]}
                        className="Badge"
                    >
                        {e}
                    </Badge>
                ))}
            </div>
            <hr />
            <div className='section'>
                <p className='header'>DESCRIPTION</p>
                <p>{description}</p>
            </div>
        </div>
    )
}

export default ViewTeachingInfo