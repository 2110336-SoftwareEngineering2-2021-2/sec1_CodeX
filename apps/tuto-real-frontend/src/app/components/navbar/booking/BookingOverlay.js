import { Overlay, Popover } from "react-bootstrap";
import BookingCard from "./BookingCard";



const BookingOverlay = (prop) => {
    const {show,target} = prop;
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
            {/* <div style={{width:'400px'}}>
                <p>TEST</p>
            </div> */}
            {/* <p>TEST</p> */}
            <Popover className="booking-overlay" id="popover-contained">
                <Popover.Header as="h3">My Booking</Popover.Header>
                <Popover.Body> 
                    <BookingCard 
                        status="Pending" 
                        requestTime="February 29, 2000 9:30 a.m."
                        tutorName="Komsorn Sookdang"
                        totalPrice={200}
                        subjectList={["math","Sci"]}
                    />
                    <BookingCard 
                        status="Canceled" 
                        requestTime="February 29, 2000 9:30 a.m."
                        tutorName="Komsorn Sookdang"
                        totalPrice={200}
                        subjectList={["math","Sci"]}
                    />
                    <BookingCard 
                        status="Accepted" 
                        requestTime="February 29, 2000 9:30 a.m."
                        tutorName="Komsorn Sookdang"
                        totalPrice={200}
                        subjectList={["math","Sci"]}
                    />
                    <BookingCard 
                        status="Rejected" 
                        requestTime="February 29, 2000 9:30 a.m."
                        tutorName="Komsorn Sookdang"
                        totalPrice={200}
                        subjectList={["math","Sci"]}
                    />
                </Popover.Body>
            </Popover>
        </Overlay>
    );
}

export default BookingOverlay