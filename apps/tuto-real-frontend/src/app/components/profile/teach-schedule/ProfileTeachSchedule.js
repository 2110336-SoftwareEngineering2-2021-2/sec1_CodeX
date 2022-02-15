import { useState, useEffect, useCallback } from "react"
import { Form, Tabs, Tab, Button } from "react-bootstrap";
import { FiEdit } from 'react-icons/fi'

import { client } from "../../../axiosConfig";
// import NormalButton from "../../ui/NormalButton";
// import EditTeachingInfo from "./EditTeachingInfo";
// import ViewTeachingInfo from "./ViewTeachingInfo";
import Tag from "./Tag";
import Schedule from "./Schedule";
import "../profile.css"

import COLORS from "../../../constants/color";


// const ProfileTeachSchedule = ({targetId, viewType}) => {
const ProfileTeachSchedule = ({targetId}) => {
    const viewType = "TutorOther"
    // const viewType = "TutorSelf"

    const [isEditing,setEditing] = useState(false);
    const [subjectList, setSubjectList] = useState([])
    const [price, setPrice] = useState(0)
    const [slotList, setSlotList] = useState([
        {number: 0, subject: "Mat", status: "available"},
        {number: 1, subject: "Mat", status: "disable"},
        {number: 2, subject: "Sci", status: "booked"},
        {number: 3, subject: "Sci", status: "pending"},
        {number: 4, subject: "Art", status: "available"},
        {number: 5, subject: "Art", status: "available"},
        {number: 6, subject: "Art", status: "x"},
        {number: 7, subject: "Art", status: "x"},
        ...([...Array(62).keys()].map(i => ({number: i+8, subject: "", status: "disable"})))
    ]) 
    const [selected, setSelected] = useState([])
    // const [teachingInfo, setTeachingInfo] = useState({
    //     subjectList: [],
    //     description: "",
    // })
    // const [tempTeachingInfo, setTempTeachingInfo] = useState({
    //     subjectList: [],
    //     description: "",
    // })

    const fetchData = useCallback(async () => {
        await client({
            method: "GET",
            // url: `/user/${targetEmail}`
            url: `/user`,
            params: {
                _id: targetId
            },
        })
        .then(({data :{data}}) => {
            console.log(data)
            // setTempTeachingInfo({
            //     subjectList: data.subjects ?? [],
            //     description: data.description ?? ""
            // })
            // setTeachingInfo({
            //     subjectList: data.subjects ?? [],
            //     description: data.description ?? ""
            // })
            setSubjectList(data.subject ?? [])
            // setPrice(data.price ?? 0)
        }).catch(({response}) => {
            console.log(response)
        })
    },[])

    useEffect(() => {
        fetchData()
        // console.log("viewType: ", viewType)
    }, [fetchData])

    // useEffect(() => {
    //     console.log("setTempTeachingInfo: ", tempTeachingInfo)
    // }, [tempTeachingInfo])

    const sendData = async () => {
        // await client({
        //     method: "PATCH",
        //     // url: `/user/${targetEmail}`,
        //     url: `/user`,
        //     params: {
        //         _id: targetId
        //         },
        //     data: {
        //         subjects: tempTeachingInfo.subjectList,
        //         description: tempTeachingInfo.description
        //     }
        // }).then(({data}) => {
        //     console.log(data)
        //     setTeachingInfo(tempTeachingInfo);
        //     setEditing(false)
        // }).catch(({response}) => {
        //     console.log(response)
        //     setEditing(false);
        // })
    }

    const renderButton = () => {
        if(selected.length === 0) return null
        else if(viewType === "TutorSelf")
            return (
                <>
                    <Button 
                        variant="outline-secondary" 
                        onClick={() => setSelected([])}
                        > Discard All </Button>
                    <Button 
                        variant="warning" 
                        style={{backgroundColor: COLORS.yellow, color: COLORS.white, marginLeft: "2%"}}
                        onClick={() => setEditing(true)}
                    > Edit </Button>
                </>
            )
            else if(viewType === "TutorOther")
                return (
                    <>
                        <Button 
                            variant="outline-secondary" 
                            onClick={() => setSelected([])}
                            > Discard All </Button>
                        <Button 
                            variant="success" 
                            style={{backgroundColor: COLORS.third, borderColor: "none", color: COLORS.white, marginLeft: "2%"}}
                            onClick={() => setEditing(true)}
                        > Book Selecting Slot </Button>
                    </>
                )
            else return null
    }

    return (
        <>
            <Form className="form">
                <div className='table-card info-card shadow'>
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
                        <div style={{display: 'flex', flexDirection: "row", alignItems: "center", width: "100%"}}>
                            <p style={{fontSize: "x-large", marginRight: "2%", color: "gray"}}>{price}</p>
                            <FiEdit size={20} color={COLORS.third} />
                        </div>
                    </div>
                    <hr />
                    <Tabs defaultActiveKey="morning" style={{width: "100%"}}>
                        <Tab eventKey="morning" title="Morning" style={{width: "100%"}}>
                            <Schedule
                                time="Morning" 
                                slotList={slotList} 
                                viewType={viewType}  
                                selected={selected}
                                setSelected={setSelected}
                            />
                        </Tab>
                        <Tab eventKey="evening" title="Evening" style={{width: "100%"}}>
                            <Schedule
                                time="Evening"
                                slotList={slotList}
                                viewType={viewType}
                                selected={selected}
                                setSelected={setSelected}
                            />
                        </Tab>
                    </Tabs>
                    <div style={{display: 'flex', justifyContent: "flex-end", width: "100%", padding: "0% 2% 2% 2%"}}>
                        {renderButton()}
                    </div>
                </div>
            </Form>
            {/* {isEditing ? renderEditForm() : renderViewForm()} */}
            {/* {isEditing? (
                <div style={{width: "45%", textAlign: "right", marginBottom: "5%"}}>
                    <NormalButton 
                        title={"Submit"} 
                        whenClick={sendData} 
                        size={"l"} 
                        bgColor={COLORS.third} 
                    />
                    <NormalButton 
                        title={"Cancel"} 
                        whenClick={onCancel} 
                        size={"l"} 
                        bgColor={COLORS.yellow} 
                    />
                </div>
            ): ( */}
            
            {/* )} */}
        </>
    )
}

export default ProfileTeachSchedule