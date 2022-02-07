import { useState } from "react";
// import { Badge } from "react-bootstrap";
// import COLORS from "../../../constants/color";
import "../profile.css"
import Tag from "./Tag";


const ViewTeachingInfo = ({teachingInfo}) => {
    const [tagColor, setTagColor] = useState(["red", "blue", "green", "purple", "orange", "gray"]);
    const {subjectList,description} = teachingInfo;
    const doNothing = () => {}
    return (
        <div className='info-card shadow'>
            <p className='title'>Teaching information</p>
            <p className='header' style={{width: "100%"}}>Some of your information may be seen by other users.</p>
            <hr />
            <div className='section'>
                <p className='header'>SUBJECT</p>
                <div style={{display:"flex", flexWrap: "wrap"}}>
                    {subjectList.map((e,i) => (
                        <Tag 
                            text={e} 
                            textColor="white" 
                            bgColor={tagColor[i % 6]}
                        />
                    ))}
                </div>
            </div>
            <hr />
            <div className='section'>
                <p className='header'>DESCRIPTION</p>
                <textarea readOnly disabled value={description} onClick={() => doNothing()} style={{borderWidth:"0px", row:"5", width:"100%", backgroundColor:"white"}} />
            </div>
        </div>
    )
}

export default ViewTeachingInfo