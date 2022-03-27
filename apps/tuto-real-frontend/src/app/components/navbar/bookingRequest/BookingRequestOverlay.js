import { Overlay, Popover } from "react-bootstrap";
import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../../../auth";
import { client } from "../../../axiosConfig";
import BookingRequestCard from "./BookingRequestCard";

const BookingRequestOverlay = (prop) => {
    const {show,target,setShowModal,setShow} = prop;
    const { _id } = useAuth();

    const [bookingList, setBookingList] = useState([])

    useEffect(() => {
        //todo: uncomment statement belown if url is ready
        //fetchData();
        console.log(bookingList)
    }, [bookingList]);

    useEffect(() => {
        // window.location.reload(false)
    }, []);

    const fetchData = useCallback(async () => {
        console.log("fetch Booking of:",_id);
        await client({
            method: 'GET',
            url: `/booking/tutor`,
            params: {
                // tutorId: `${}`,
                _id: `${_id}`,
                // _id: `${_id}`,
            },
        })
        .then((data) => {
            console.log(data.data.data);
            // console.log(data.data.data[0].student_id.firstName);
            setBookingList(data.data.data);
        })
        .catch((res) => {
            console.log(res);
        });
    }, [_id, show])

    useEffect(() => {
        //todo: uncomment statement belown if url is ready
        fetchData();
        // console.log(bookingList)
    }, [fetchData]);

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
                    {bookingList.map((e,i) => (
                        <BookingRequestCard
                            setShowModal= {setShowModal} 
                            setShow= {setShow}
                            key={e._id}
                            bookingId={e._id}
                            status={e.status}
                            requestTime={e.timeStamp}
                            studentName={e.student_id.firstName+" "+e.student_id.lastName}
                            totalPrice={e.totalPrice}
                            days={e.days}
                        />
                    ))} 
                    {/* <BookingRequestCard
                        setShowModal= {setShowModal} 
                        setShow= {setShow}
                        status="Pending" 
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
                        status="Approved" 
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
                    /> */}
                </Popover.Body>
            </Popover>
        </Overlay>
    );
    
}
 
export default BookingRequestOverlay;