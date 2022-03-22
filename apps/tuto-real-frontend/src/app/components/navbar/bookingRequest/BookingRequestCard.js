import COLORS from "../../../constants/color"

const BookingRequestCard= (prop) => {
    const {status, requestTime, studentName, totalPrice, subjectList} = prop


    const genBorderColor = (status) => {
        if (status === "Canceled") return "#FBE2C5"
        else if (status === "Accepted") return "#D3EAE5"
        else if (status === "Rejected") return "#FFD6C9"
        else return COLORS.lightgray
    }
    const genStatusColor = (status) => {
        if (status === "Canceled") return "#EF8C18"
        else if (status === "Accepted") return COLORS.third
        else if (status === "Rejected") return "#FF5D29"
        else return COLORS.primary
    }
    
    return (  
        <div className="booking-card" style={{borderColor:genBorderColor(status)}}>
            <div id="header">
                <p style={{fontWeight:"500", color:genStatusColor(status)}}>
                    {status}
                </p>
                <p>request time: {requestTime}</p>
            </div>
            
            <div style={{width:"100%", height:"2px", backgroundColor:genBorderColor(status)}}></div>
            <p style={{marginBottom:"0px"}}>from</p>
            <div id="info-section">
                <div id="text-zone">
                    <h3>{studentName}</h3>
                    <p>total price: <b>{totalPrice} baht</b></p>
                </div>
                <div id="button-approve">
                    {status === "Waiting for Approval"?
                        <button>
                        Approve
                        </button>
                        :
                        null
                    }
                </div>
                <div id="button-reject">
                    {status === "Waiting for Approval"?
                        <button>Reject</button>
                        :
                        null
                    }
                </div>
            </div>
            <ul>
                {subjectList.map((e) => (
                    <li>
                        {e}
                    </li>
                ))}    
            </ul>
        
        </div>
    );
}
 
export default BookingRequestCard