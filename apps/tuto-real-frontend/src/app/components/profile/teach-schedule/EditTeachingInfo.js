import { useState } from "react";
import { Form } from "react-bootstrap";
import "../profile.css"
import Tag from "./Tag";

const EditTeachingInfo = ({tempTeachingInfo, setTempTeachingInfo}) => {
    const [tagColor] = useState(["red", "blue", "green", "purple", "orange", "gray"]);
    const {subjectList, description} = tempTeachingInfo;
    const [newTagText, setNewTagText] = useState("");

    const addNewSubjectHandle = () => {
        // subjectList.push(newTagText);
        setTempTeachingInfo({
            subjectList: [...subjectList, newTagText],
            description
        })
        // console.log(newTagText);
        setNewTagText("");
    }

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
                                key={e}
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
                            value={newTagText}
                            placeholder="Key to add your new subject"
                            style={{margin:"0px", marginRight:"8px"}}
                            onChange={e => {
                                setNewTagText(e.target.value);
                            }}
                        />
                        <button 
                            className="secondary-button" 
                            style={{width:"45%",}}
                            type="button"
                            onClick={addNewSubjectHandle}
                        >
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