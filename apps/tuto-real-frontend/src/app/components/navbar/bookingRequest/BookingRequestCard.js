import COLORS from "../../../constants/color"
import { useState } from 'react';

const BookingRequestCard= (prop) => {
    const {
        bookingId,
        requestTime, 
        studentName, 
        totalPrice, 
        days,
        setShowModal,
        setShow
        } = prop;

    const [status, setStatus] = useState(prop.status);

    // const genBorderColor = (status) => {
    //     if (status === "Canceled") return "#FBE2C5"
    //     else if (status === "Accepted") return "#D3EAE5"
    //     else if (status === "Rejected") return "#FFD6C9"
    //     else return COLORS.lightgray
    // }
    // const genStatusColor = (status) => {
    //     if (status === "Canceled") return "#EF8C18"
    //     else if (status === "Accepted") return COLORS.third
    //     else if (status === "Rejected") return "#FF5D29"
    //     else return COLORS.primary
    // }
    const genConfigStatus = () => {
        switch(status){
            case "Pending":
                return {
                    statusText:"Waiting for Approval",
                    statusColor: COLORS.primary,
                    borderColor: COLORS.lightgray,
                };

            case "Canceled":
                return {
                    statusText:"Canceled",
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

    const translateDateFormat = (timeStamp) => {
        //2001-02-15T17:00:00.000+00:00
        //            to be
        //February 29, 2000 9:30 a.m."
        var date = parseInt(timeStamp.substr(8, 2));
        var month = parseInt(timeStamp.substr(5, 2));
        var year = parseInt(timeStamp.substr(0, 4));;
        const monthName = [
            'January', 
            'February', 
            'March', 
            'April', 
            'May', 
            'June', 
            'July', 
            'August', 
            'September', 
            'October', 
            'November', 
            'December']
        return (monthName[month-1] + " " + date.toString() + ", " + year.toString());
    }

    const translateTimeFormat = (timeStamp) => {
        var hour = timeStamp.substr(11, 2);
        var min = timeStamp.substr(14, 2);
        return hour.toString() + ":" + min.toString();
    }

    const translateSlotsListFormat = (subjectName, timeStamp, slot_no) => {
        // return "1234"
        // return slot_no.toString()
        return subjectName + " [ " + (slot_no + 8).toString()  + ":00 - "+ (slot_no + 9).toString() + ":00 ] " + translateDateFormat(timeStamp)
    }
    
    return (  
        <div className="booking-card" style={{borderColor:genConfigStatus().borderColor}}>
            <div id="header">
                <p style={{fontWeight:"500", color:genConfigStatus().statusColor}}>
                    {genConfigStatus().statusText}
                </p>
                <p>request time: {translateDateFormat(requestTime)} {translateTimeFormat(requestTime)}</p>
            </div>
            
            <div style={{width:"100%", height:"2px", backgroundColor:genConfigStatus().borderColor}}></div>
            <p style={{marginBottom:"0px"}}>from</p>
            <div id="info-section">
                <div id="text-zone">
                    <h3>{studentName}</h3>
                    <p>total price: <b>{totalPrice} baht</b></p>
                </div>
                <div id="button-zone">
                    {status === "Pending"?
                        <>
                        <button id="approve-button" onClick={() =>
                            {setShow(false)  
                            setShowModal('Approve')}}>
                            Approve
                        </button>
                        <button id="reject-button">Reject</button>
                        </>
                        :
                        null
                    }
                </div>
            </div>
            <ul>
                {/* {subjectList.map((e) => (
                    <li>
                        {e}
                    </li>
                ))} */}
                {days.map((e,i) => (
                    <div key={bookingId + i + bookingId}>
                        {e.slots.map((slot_no,ii) => (
                            <li key={bookingId + i + ii} style={{margin:"2px 0px"}}>
                                {translateSlotsListFormat(e.subject[ii],e.date,slot_no)}
                            </li>
                        ))}
                    </div>
                ))}    
            </ul>

    
        
        </div>
    );
}
 
export default BookingRequestCard