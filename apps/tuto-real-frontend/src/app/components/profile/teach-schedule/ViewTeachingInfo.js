import { useState } from "react";
import { Tabs, Tab } from "react-bootstrap";

import COLORS from "../../../constants/color";
import Tag from "./Tag";
import Schedule from "./Schedule";
import "../profile.css"

// import COLORS from "../../../constants/color";


const ViewTeachingInfo = ({teachingInfo, viewType}) => {
    const [tagColor, setTagColor] = useState(["red", "blue", "green", "purple", "orange", "gray"]);
    const {subjectList,description} = teachingInfo;

    const [slotDetail, setSlotDetail] = useState([
        {number: 0, subject: "Mat", status: "available"},
        {number: 1, subject: "Mat", status: "disable"},
        {number: 2, subject: "Sci", status: "booked"},
        {number: 3, subject: "Sci", status: "pending"},
        {number: 4, subject: "Art", status: "tutorSelect"},
        {number: 5, subject: "Art", status: "studentSelect"},
        {number: 6, subject: "Art", status: "x"},
        {number: 7, subject: "Art", status: "x"},
        ...([...Array(62).keys()].map(i => ({number: i+8, subject: "Com", status: "disable"})))
    ]) 
    // const doNothing = () => {}
    return (
        <div className='info-card shadow' style={{width: "55%"}}>
            <p className='title'>Teaching Information</p>
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
                <p className='header'>PRICE (PER HOUR)</p>
                {/* <textarea readOnly disabled 
                    value={(description && description?.length !== 0) ? description: viewType === "TutorSelf" ? "Please add your teaching infomation here..." : "The tutor didn't add his description yet"}
                    style={{borderWidth:"0px", row:"5", width:"100%", backgroundColor:"white"}} /> */}
            </div>
            <hr />
            <Tabs defaultActiveKey="morning" style={{width: "100%"}}>
                <Tab eventKey="morning" title="Morning" style={{width: "100%"}}>
                    <Schedule time="Morning" slotData={slotDetail} />
                </Tab>
                <Tab eventKey="evening" title="Evening" style={{width: "100%"}}>
                    <Schedule time="Evening" slotData={slotDetail} />
                </Tab>
            </Tabs>
        </div>
    )
}

export default ViewTeachingInfo