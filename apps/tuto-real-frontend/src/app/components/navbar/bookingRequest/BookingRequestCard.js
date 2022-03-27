import COLORS from "../../../constants/color"
import { useState } from 'react';

const BookingRequestCard= (prop) => {
    const {
        setShow,
        setModalConfig,
        bookingId,
        requestTime, 
        studentName, 
        totalPrice, 
        days
        } = prop;

    const [status, setStatus] = useState(prop.status);

    const genConfigStatus = () => {
        switch(status){
            case "Pending":
                return {
                    statusText:"Waiting for Approval",
                    statusColor: COLORS.primary,
                    borderColor: COLORS.lightgray,
                };

            case "Cancelled":
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

            case "Reject":
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
        let temp = new Date(timeStamp);
        // console.log(new Date(timeStamp));
        var date = temp.getDate()
        var month = temp.getMonth()
        var year = temp.getFullYear()
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
        return (monthName[month] + " " + date.toString() + ", " + year.toString());
    }

    const translateTimeFormat = (timeStamp) => {
        let temp = new Date(timeStamp);
        // console.log(new Date(timeStamp));
        var hour = temp.getHours()
        var min = temp.getMinutes()
        return hour.toString() + ':' + min.toString();
      };

    const translateSlotsListFormat = (subjectName, timeStamp, slot_no) => {
        // return "1234"
        // return slot_no.toString()
        return subjectName + " [ " + (slot_no + 8).toString()  + ":00 - "+ (slot_no + 9).toString() + ":00 ] " + translateDateFormat(timeStamp)
    }

    const approveButtonHandle = () => {
        //todo: show modal or something like that for comfirmation
        setShow(false)
        setModalConfig({
          modalType:"Approve",
          bookingId: bookingId,
          targetName: studentName
        })
      };

      const rejectButtonHandle = () => {
        //todo: show modal or something like that for comfirmation
        setShow(false)
        setModalConfig({
          modalType:"Reject",
          bookingId: bookingId,
          targetName: studentName
        })
      };
    
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
                        <button 
                            id="approve-button" 
                            onClick={approveButtonHandle}
                        >
                            Approve
                        </button>

                        <button 
                            id="reject-button" 
                            onClick={rejectButtonHandle}
                        >
                            Reject
                        </button>
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
                    <div key={bookingId + i + bookingId} style={{ margin: '0px' }}>
                        {e.slots.map((slot_no,ii) => (
                            <li key={bookingId + i + ii} style={{margin:"0px 2px"}}>
                                {translateSlotsListFormat(e.subject[ii], e.date, slot_no)}
                            </li>
                        ))}
                    </div>
                ))}    
            </ul>

    
        
        </div>
    );
}
 
export default BookingRequestCard