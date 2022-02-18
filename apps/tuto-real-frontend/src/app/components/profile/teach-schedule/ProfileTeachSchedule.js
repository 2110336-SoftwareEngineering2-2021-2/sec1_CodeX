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


const ProfileTeachSchedule = ({targetId, viewType}) => {
// const ProfileTeachSchedule = ({targetId}) => {
    // const viewType = "TutorOther"
    // const viewType = "TutorSelf"

    const [isEditing,setEditing] = useState(false);
    // const [subjectList, setSubjectList] = useState([])
    const [price, setPrice] = useState(0)
    const [scheduleList, setScheduleList] = useState([])
    const [currentSchedule, setCurrentSchedule] = useState()
    // const [slotList, setSlotList] = useState([
    //     {number: 0, subject: "Mat", status: "available"},
    //     {number: 1, subject: "Mat", status: "disable"},
    //     {number: 2, subject: "Sci", status: "booked"},
    //     {number: 3, subject: "Sci", status: "pending"},
    //     {number: 4, subject: "Art", status: "available"},
    //     {number: 5, subject: "Art", status: "available"},
    //     {number: 6, subject: "Art", status: "x"},
    //     {number: 7, subject: "Art", status: "x"},
    //     ...([...Array(62).keys()].map(i => ({number: i+8, subject: "", status: "disable"})))
    // ]) 
    const [selected, setSelected] = useState([]) // Sun: 0-15, Mon: 16-31, Tue: 32-47, ..., Sat: 96-111
    const [showModal, setShowModal] = useState(false)

    const fetchData = useCallback(async () => { 
        await client({
            method: "GET",
            url: `/user`,
            params: {
                _id: targetId
            },
        })
        // .then(({data :{data}}) => {
        .then(() => {
            console.log("Data Fetched")
            const data = [
                {
                    startDate: new Date("2022-02-20 0:0"),
                    pricePerSlot: 250,
                    allSubjects: ["Math", "Art"],
                    days: [
                        {
                            day: "Monday",
                            slots: [
                                {
                                    slot: 0,
                                    subject: "Math",
                                    description: "eieieieieieieieieieieieiei",
                                    students: [
                                        {id: "0000", firstName: "Komsorn", lastName: "Sookduay", status: "Pending"},
                                        {id: "0001", firstName: "Rutthasate", lastName: "Gunsaduay", status: "Pending"},
                                    ]
                                },
                                {
                                    slot: 1,
                                    subject: "Math",
                                    description: "eieieieieieieieieieieieiei",
                                    students: [
                                        {id: "0000", firstName: "Komsorn", lastName: "Sookduay", status: "Approved"},
                                        {id: "0001", firstName: "Rutthasate", lastName: "Gunsaduay", status: "Approved"},
                                    ]
                                },
                            ]
                        },
                        {
                            day: "Wednesday",
                            slots: [{
                                slot: 15,
                                subject: "Art",
                                description: "midnight art course",
                                students: [
                                    {id: "0000", firstName: "Komsorn", lastName: "Sookduay", status: "Approved"},
                                    {id: "0001", firstName: "Rutthasate", lastName: "Gunsaduay", status: "Pending"},
                                ]
                            }]
                        },
                    ]
                },
                {
                    startDate: new Date("2022-02-27 0:0"),
                    pricePerSlot: 250,
                    allSubjects: ["Math", "Art", "Sci"],
                    days: [
                        {
                            day: "Tuesday",
                            slots: [
                                {
                                    slot: 1,
                                    subject: "Sci",
                                    description: "Sciencee",
                                    students: [
                                        {id: "0000", firstName: "Komsorn", lastName: "Sookduay", status: "Approved"},
                                        {id: "0001", firstName: "Rutthasate", lastName: "Gunsaduay", status: "Approved"},
                                    ]
                                },
                                {
                                    slot: 10,
                                    subject: "Math",
                                    description: "eieieieieieieieieieieieiei",
                                    students: [
                                        {id: "0000", firstName: "Komsorn", lastName: "Sookduay", status: "Approved"},
                                        {id: "0001", firstName: "Rutthasate", lastName: "Gunsaduay", status: "Approved"},
                                    ]
                                },
                                {
                                    slot: 11,
                                    subject: "Math",
                                    description: "eieieieieieieieieieieieiei",
                                    students: [
                                        {id: "0000", firstName: "Komsorn", lastName: "Sookduay", status: "Pending"},
                                        {id: "0001", firstName: "Rutthasate", lastName: "Gunsaduay", status: "Pending"},
                                    ]
                                },
                            ]
                        },
                        {
                            day: "Thursday",
                            slots: [{
                                slot: 15,
                                subject: "Art",
                                description: "midnight art course",
                                students: [
                                    {id: "0000", firstName: "Komsorn", lastName: "Sookduay", status: "Pending"},
                                    {id: "0001", firstName: "Rutthasate", lastName: "Gunsaduay", status: "Pending"},
                                ]
                            }]
                        },
                    ]
                },
            ]
            console.log(data)
            setScheduleList(data ?? [])
            if(data?.length > 0) setCurrentSchedule(0)
            // setSubjectList(data.allSubjects ?? [])
            // setPrice(data.price ?? 0)
        }).catch(({response}) => {
            console.log(response)
        })
    },[])

    useEffect(() => {
        fetchData()
    }, [fetchData])

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
                    {/* <div className='section'>
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
                    </div> */}
                    {/* <hr /> */}
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
                                time="Day Time" 
                                scheduleData={scheduleList[currentSchedule]? scheduleList[currentSchedule].days: []} 
                                viewType={viewType}  
                                selected={selected}
                                setSelected={setSelected}
                                setShowModal={setShowModal}
                                />
                        </Tab>
                        <Tab eventKey="evening" title="Evening" style={{width: "100%"}}>
                            <Schedule
                                time="Night Time"
                                scheduleData={scheduleList[currentSchedule]? scheduleList[currentSchedule].days: []}
                                viewType={viewType}
                                selected={selected}
                                setSelected={setSelected}
                                setShowModal={setShowModal}
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