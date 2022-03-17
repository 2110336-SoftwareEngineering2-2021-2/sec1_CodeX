import COLORS from "../../../constants/color"


const BookingCard = (prop) => {
    const {status, requestTime, tutorName, totalPrice, subjectList} = prop
    
    const genBorderColor = (status) => {
        if (status === "Pending" || status === "Canceled") return "#FBE2C5"
        else if (status === "Accepted") return "#D3EAE5"
        else if (status === "Rejected") return "#FFD6C9"
        else return COLORS.lightgray
    }
    const genStatusColor = (status) => {
        if (status === "Pending" || status === "Canceled") return "#EF8C18"
        else if (status === "Accepted") return COLORS.third
        else if (status === "Rejected") return COLORS.warning
        else return COLORS.primary
    }

    return (
        <div className="booking-card" style={{borderColor:genBorderColor(status)}}>
            <div id="header">
                <p style={{color:genStatusColor(status)}}>
                    {status}
                </p>
                <p>request time: {requestTime}</p>
            </div>
            {/* <div style={{height:"1px", borderColor:genBorderColor(status)}}/> */}
            <hr style={{borderColor:genBorderColor(status)}}/>
            <p>with</p>
            <div id="info-section">
                <div id="text-zone">
                    <h3>{tutorName}</h3>
                    <p>total price: {totalPrice} baht</p>
                </div>
                <div id="button-zone">
                    {status === "Pending"?
                        <button>Cancel</button>
                        :
                        null
                    }
                    {/* <button>1234</button> */}
                </div>
            </div>
            {subjectList.map((e) => (
                <p>
                    {e}
                </p>
            ))}

        </div>
    )
}

export default BookingCard