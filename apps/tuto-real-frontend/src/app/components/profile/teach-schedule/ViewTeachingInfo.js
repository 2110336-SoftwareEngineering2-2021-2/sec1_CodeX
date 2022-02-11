import { useState } from "react";
import COLORS from "../../../constants/color";
// import { Badge } from "react-bootstrap";
// import COLORS from "../../../constants/color";
import "../profile.css"
import Tag from "./Tag";


const ViewTeachingInfo = ({teachingInfo, viewType}) => {
    const [tagColor, setTagColor] = useState(["red", "blue", "green", "purple", "orange", "gray"]);
    const {subjectList,description} = teachingInfo;
    // const doNothing = () => {}
    return (
        <div className='info-card shadow'>
            <p className='title'>Teaching information</p>
            <p className='header' style={{width: "100%"}}>Some of your information may be seen by other users.</p>
            <hr />
            <div className='section'>
                <p className='header'>SUBJECT</p>
                <div style={{display:"flex", flexWrap: "wrap"}}>
                    {subjectList.length !== 0 ? 
                        subjectList.map((e,i) => (
                            <Tag 
                                key={i}
                                text={e} 
                                textColor="white" 
                                bgColor={tagColor[i % 6]}
                            />
                        )):
                        <Tag 
                            text={viewType === "TutorSelf" ? "Please add your subject" : "The tutor didn't add his subjects yet"}
                            textColor="white" 
                            bgColor={COLORS.yellow}
                        />
                    }
                </div>
            </div>
            <hr />
            <div className='section'>
                <p className='header'>DESCRIPTION</p>
                <textarea readOnly disabled 
                    value={(description && description?.length !== 0) ? description: viewType === "TutorSelf" ? "Please add your teaching infomation here..." : "The tutor didn't add his description yet"}
                    style={{borderWidth:"0px", row:"5", width:"100%", backgroundColor:"white"}} />
            </div>
        </div>
    )
}

export default ViewTeachingInfo