import { useState } from "react"
import { client } from "../../../axiosConfig";
import COLORS from "../../../constants/color"


const BookingCard = (prop) => {
    const {
        bookingId,
        requestTime, 
        tutorFirstName, 
        tutorLastName, 
        totalPrice, 
        subjectList
        } = prop; //and also with initial booking status(prop.status).

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

            case "Approved":
                return {
                    statusText:"Approved",
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
    const cancelButtonHandle = () => {
        //todo: show modal or something like that for comfirmation 
        //
        //

        //todo: uncomment the statement belown when sendCancelBooking complete
        //sendCancelBooking(bookingId)

        //todo: delete the statement belown when sendCancelBooking complete 
        setStatus("Cancelled")
    }
    const sendCancelBooking = async (bookingId) => {
        console.log('sending cancel booking:',bookingId);
        await client({
            method: 'PATCH',
            url: `/`,
            // url: `/user`,
            params: {
                _id: bookingId,
            },
        })
        .then(({ data: { data } }) => {
            console.log('data response', data);
            setStatus("Cancelled")
        })
        .catch((res) => {
            console.log(res);
        })
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
                    <h3>{tutorFirstName} {tutorLastName}</h3>
                    <p>total price: <b>{totalPrice} baht</b></p>
                </div>
                <div id="button-zone">
                    {status === "Pending"?
                        <button onClick={cancelButtonHandle}>Cancel</button>
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
    )
}

export default BookingCard