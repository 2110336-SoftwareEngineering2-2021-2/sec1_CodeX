import { useState } from "react";
import { Form } from "react-bootstrap";
import "../profile.css"
import Tag from "./Tag";

const EditTeachingInfo = ({teachingInfo}) => {
    const [tagColor, setTagColor] = useState(["red", "blue", "green", "purple", "orange", "gray"]);
    const {subjectList,description} = teachingInfo;
    return (
        <div className='info-card shadow' style={{}}>
            <p className='title'>Teaching information</p>
            <p className='header' style={{width: "100%"}}>Some of your information may be seen by other users.</p>
            <hr />
            <div className='section'>
                <p className='header'>SUBJECT</p>
                <div>
                    <div style={{display:"flex", flexWrap: "wrap"}}>
                        {subjectList.map((e,i) => (
                            <Tag 
                                text={e} 
                                textColor="white" 
                                bgColor={tagColor[i % 6]}
                                canEdit
                            />
                        ))}
                    </div>
                    <div style={{display:"flex", flexDirection:"row", alignItems:"center", marginTop:"8px"}}>
                        <Form.Control 
                            className='form-control-regis' 
                            type="text" 
                            placeholder="Key to add your new subject"
                            style={{margin:"0px", marginRight:"8px"}}
                        />
                        <button 
                            className="secondary-button" 
                            style={{width:"45%",}}>
                            Add new subject
                        </button>
                    </div>
                </div>
            </div>
            <hr />
            <div className='section'>
                <p className='header'>DESCRIPTION</p>
                <Form.Control 
                    className='form-control-regis' 
                    as="textarea" 
                    rows={3}
                    placeholder="describe your teaching plan." 
                    defaultValue={description}
                />
            </div>
        </div>
    )
}

export default EditTeachingInfo