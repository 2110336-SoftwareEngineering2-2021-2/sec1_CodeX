import { Overlay, Popover } from "react-bootstrap";



const BookingOverlay = (prop) => {
    const {show,target} = prop;
    return (
        <Overlay
            show={show}
            target={target}
            placement="bottom"
            style={{width:"400px"}}
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
                </Popover.Body>
            </Popover>
        </Overlay>
    );
}

export default BookingOverlay