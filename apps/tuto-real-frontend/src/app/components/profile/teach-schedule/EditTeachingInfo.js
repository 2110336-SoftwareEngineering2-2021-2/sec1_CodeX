import { useState } from "react";
import { Form } from "react-bootstrap";
import "../profile.css"
import Tag from "./Tag";

const EditTeachingInfo = ({tempTeachingInfo, setTempTeachingInfo}) => {
    const [tagColor] = useState(["red", "blue", "green", "purple", "orange", "gray"]);
    const {subjectList, description} = tempTeachingInfo;
    const [newTagText, setNewTagText] = useState("");
    const [updateToken, forceUpdate] = useState(0);

    const addNewSubjectHandle = () => {
        // subjectList.push(newTagText);
        setTempTeachingInfo({
            subjectList: [...subjectList, newTagText],
            description
        })
        // console.log(newTagText);
        setNewTagText("");
    }

    const deleteSubjectHandle = (subjectName) => {
        setTempTeachingInfo({
            subjectList: tempTeachingInfo.subjectList.filter((item) => item !== subjectName), 
            ...description
        });
        console.log("deleteSubjectHandle was called ",subjectList.filter((item) => item == subjectName))
    }

    return (
        <div className='info-card shadow' style={{}}>
            <p className='title'>Teaching information</p>
            <p className='header' style={{width: "100%"}}>Some of your information may be seen by other users.</p>
            <hr />
            <div className='section'>
                <p className='header'>SUBJECT</p>
                <div style={{width:"100%"}}>
                    <div style={{display:"flex", flexWrap: "wrap"}}>
                        {subjectList.map((subjectName,i) => 
                            <Tag
                                key={subjectName}
                                text={subjectName} 
                                textColor="white" 
                                bgColor={tagColor[i % 6]}
                                canEdit
                                // onClick={() =>
                                //     deleteSubjectHandle(subjectName)
                                // }
                                whenClickBin={() =>
                                    deleteSubjectHandle(subjectName)
                                    //deleteSubjectHandle("aaa")
                                    //addNewSubjectHandle()
                                    //deleteSubjectHandle(subjectName)
                                }
                                // whenClick={addNewSubjectHandle}
                            />
                        )}
                    </div>
                    <div style={{display:"flex", flexDirection:"row", alignItems:"center", marginTop:"8px"}}>
                        <Form.Control 
                            className='form-control-regis' 
                            type="text"
                            value={newTagText}
                            placeholder="Key to add your new subject"
                            style={{margin:"0px", marginRight:"8px", height:"100%"}}
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
                            Add subject
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
                    // defaultValue={description}
                    value={description}
                    onChange={e => {
                        setTempTeachingInfo({
                            subjectList,
                            description: e.target.value
                        });
                    }}
                />
            </div>
        </div>
    )
}

export default EditTeachingInfo