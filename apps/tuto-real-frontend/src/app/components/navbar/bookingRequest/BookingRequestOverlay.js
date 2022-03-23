import { Overlay, Popover } from "react-bootstrap";
import BookingRequestCard from "./BookingRequestCard";

const BookingRequestOverlay = (prop) => {
    const {show,target,setShowModal,setShow} = prop;
    return (  
        <Overlay
            show={show}
            target={target}
            placement="bottom"
            // style={{width:"400px"}}
            className="booking-overlay"
            // container={ref}
            // containerPadding={20}
        >
            <Popover className="booking-overlay" id="popover-contained">
                <Popover.Header as="h3">Booking Request</Popover.Header>
                <Popover.Body> 
                    <BookingRequestCard
                        setShowModal= {setShowModal} 
                        setShow= {setShow}
                        status="Waiting for Approval" 
                        requestTime="February 29, 2000 9:30 a.m."
                        tutorName="Komsorn Sookdang"
                        totalPrice={200}
                        subjectList={[
                            "Science [ 13:00 - 14:00 ] February 29, 2000",
                            "Science [ 14:00 - 15:00 ] February 29, 2000",
                            "Mathematic [ 14:00 - 15:00 ] February 30, 2000",
                            "Software Engineering [ 14:00 - 15:00 ] February 29, 2000"
                        ]}
                    />
                    <BookingRequestCard 
                        status="Canceled" 
                        requestTime="February 29, 2000 9:30 a.m."
                        tutorName="Komsorn Sookdang"
                        totalPrice={200}
                        subjectList={[
                            "Science [ 13:00 - 14:00 ] February 29, 2000",
                            "Science [ 14:00 - 15:00 ] February 29, 2000",
                            "Mathematic [ 14:00 - 15:00 ] February 30, 2000",
                            "Software Engineering [ 14:00 - 15:00 ] February 29, 2000"
                        ]}
                    />
                    <BookingRequestCard 
                        status="Accepted" 
                        requestTime="February 29, 2000 9:30 a.m."
                        tutorName="Komsorn Sookdang"
                        totalPrice={200}
                        subjectList={[
                            "Science [ 13:00 - 14:00 ] February 29, 2000",
                            "Science [ 14:00 - 15:00 ] February 29, 2000",
                            "Mathematic [ 14:00 - 15:00 ] February 30, 2000",
                            "Software Engineering [ 14:00 - 15:00 ] February 29, 2000"
                        ]}
                    />
                    <BookingRequestCard 
                        status="Rejected" 
                        requestTime="February 29, 2000 9:30 a.m."
                        tutorName="Komsorn Sookdang"
                        totalPrice={200}
                        subjectList={[
                            "Science [ 13:00 - 14:00 ] February 29, 2000",
                            "Science [ 14:00 - 15:00 ] February 29, 2000",
                            "Mathematic [ 14:00 - 15:00 ] February 30, 2000",
                            "Software Engineering [ 14:00 - 15:00 ] February 29, 2000"
                        ]}
                    />
                </Popover.Body>
            </Popover>
        </Overlay>
    );
    
}
 
export default BookingRequestOverlay;