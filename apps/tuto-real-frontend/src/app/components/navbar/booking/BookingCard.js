import { useState } from "react"
import COLORS from "../../../constants/color"


const BookingCard = (prop) => {
    const {requestTime, tutorName, totalPrice, subjectList} = prop;
    const [status, setStatus] = useState(prop.status);
    // const genBorderColor = (status) => {
    //     if (status === "Pending" || status === "Canceled") return "#FBE2C5"
    //     else if (status === "Accepted") return "#D3EAE5"
    //     else if (status === "Rejected") return "#FFD6C9"
    //     else return COLORS.lightgray
    // }
    // const genStatusColor = (status) => {
    //     if (status === "Pending" || status === "Canceled") return "#EF8C18"
    //     else if (status === "Accepted") return COLORS.third
    //     else if (status === "Rejected") return "#FF5D29"
    //     else return COLORS.primary
    // }
    const genConfigStatus = () => {
        switch(status){
            case "Pending":
                return {
                    statusText:"Pending",
                    statusColor:"#EF8C18",
                    borderColor:"#FBE2C5",
                };

            case "Cancelled":
                return {
                    statusText:"Cancelled",
                    statusColor:"#EF8C18",
                    borderColor:"#FBE2C5",
                };

            case "Accepted":
                return {
                    statusText:"Accepted",
                    statusColor:COLORS.third,
                    borderColor:"#D3EAE5",
                };

            case "Rejected":
                return {
                    statusText:"Rejected",
                    statusColor:"#FF5D29",
                    borderColor:"#FFD6C9",
                };
            default:
                return {
                    statusText:"Unknown",
                    statusColor:COLORS.primary,
                    borderColor:COLORS.lightgray,
                };
        }
    }

    return (
        <div className="booking-card" style={{borderColor:genConfigStatus().borderColor}}>
            <div id="header">
                <p style={{fontWeight:"500", color:genConfigStatus().statusColor}}>
                    {genConfigStatus().statusText}
                </p>
                <p>request time: {requestTime}</p>
            </div>

            <div style={{width:"100%", height:"2px", backgroundColor:genConfigStatus().borderColor}}></div>
            
            <p style={{marginBottom:"0px"}}>with</p>
            <div id="info-section">
                <div id="text-zone">
                    <h3>{tutorName}</h3>
                    <p>total price: <b>{totalPrice} baht</b></p>
                </div>
                <div id="button-zone">
                    {status === "Pending"?
                        <button onClick={() => {setStatus("Cancelled")}}>Cancel</button>
                        :
                        null
                    }
                    {/* <button>1234</button> */}
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
    )
}

export default BookingCard