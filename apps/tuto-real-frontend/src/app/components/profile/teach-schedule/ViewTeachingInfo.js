import "../profile.css"

const ViewTeachingInfo = ({viewType, teachingInfo}) => {
    //const {subjectList,description} = teachingInfo;
    return (
        <div className='info-card shadow'>
            <p className='title'>teaching information</p>
            <p className='header' style={{width: "100%"}}>Some of your information may be seen by other users.</p>
            <hr />
            <div className='section'>
                <p className='header'>SUBJECT</p>
                <p>.....</p>
            </div>
            <hr />
            <div className='section'>
                <p className='header'>DESCRIPTION</p>
                <p>.....</p>
            </div>
        </div>
    )
}

export default ViewTeachingInfo