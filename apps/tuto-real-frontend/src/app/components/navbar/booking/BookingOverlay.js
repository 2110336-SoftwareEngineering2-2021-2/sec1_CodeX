import { useEffect, useState } from "react";
import { Overlay, Popover } from "react-bootstrap";
import { useAuth } from "../../../auth";
import { client } from "../../../axiosConfig";
import BookingCard from "./BookingCard";



const BookingOverlay = (prop) => {
    const {show,target} = prop;
    const { _id } = useAuth();

    const [bookingList, setBookingList] = useState([
        {
            _id:"11",
            tutorId:"6206273237ff1b8ed2759389",
            tutorFirstName:"1first",
            tutorLastName:" last",
            timeStamp:"2001-02-15T17:00:00.000+00:00",
            totalPrice:200,
            status:"Cancelled",
            // days: [
            //     {
            //         day:"Monday"
            //     }
            // ]
        },
        {
            _id:"12",
            tutorId:"6206273237ff1b8ed2759389",
            tutorFirstName:"2first",
            tutorLastName:"last",
            timeStamp:"2001-02-15T17:00:00.000+00:00",
            totalPrice:200,
            status:"Pending",
            // days: [
            //     {
            //         day:"Monday"
            //     }
            // ]
        },
        {
            _id:"13",
            tutorId:"6206273237ff1b8ed2759389",
            tutorFirstName:"3first",
            tutorLastName:"last",
            timeStamp:"2001-02-15T17:00:00.000+00:00",
            totalPrice:200,
            status:"Rejected",
            // days: [
            //     {
            //         day:"Monday"
            //     }
            // ]
        },
        {
            _id:"13",
            tutorId:"6206273237ff1b8ed2759389",
            tutorFirstName:"3first",
            tutorLastName:"last",
            timeStamp:"2001-02-15T17:00:00.000+00:00",
            totalPrice:200,
            status:"Approved",
            // days: [
            //     {
            //         day:"Monday"
            //     }
            // ]
        }
    ])
    useEffect(() => {
        //todo: uncomment statement belown if url is ready
        //fetchData();
    }, []);

    const fetchData = async () => {
        console.log("fetch Booking of:",_id);
        await client({
            method: 'GET',
            url: `/booking/student`,
            params: {
                tutorId: `${_id}`,
                // keyword: genKeyword(
                //     searchWithContext ? searchText : searchInfo.searchText
                // ),
                // ratePrice: `${searchInfo.minPrice.toString()},${
                //     searchInfo.maxPrice.toString() ?? '10000'
                // }`,
                // days: genDayListText(searchInfo.daysCheck),
            },
        })
        .then(({ data: { data } }) => {
            console.log(data);
            setBookingList(data);
        })
        .catch((res) => {
            console.log(res);
        });
    }

    return (
        <Overlay
            show={show}
            target={target}
            placement="bottom"
            className="booking-overlay"
        >
            <Popover className="booking-overlay" id="popover-contained">
                <Popover.Header as="h3">My Booking</Popover.Header>
                <Popover.Body> 

                    {bookingList.map((e,i) => (
                        <BookingCard
                            key={e._id}
                            bookingId={e._id}
                            status={e.status}
                            requestTime={e.timeStamp}
                            tutorFirstName={e.tutorFirstName}
                            tutorLastName={e.tutorLastName}
                            totalPrice={e.totalPrice}
                            subjectList={[
                                "Science [ 13:00 - 14:00 ] February 29, 2000",
                                "Science [ 14:00 - 15:00 ] February 29, 2000",
                                "Mathematic [ 14:00 - 15:00 ] February 30, 2000",
                                "Software Engineering [ 14:00 - 15:00 ] February 29, 2000"
                            ]}
                        />
                    ))}
                    {/* <BookingCard 
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
                    <BookingCard 
                        status="Pending" 
                        requestTime="February 29, 2000 9:30 a.m."
                        tutorName="Komsorn Sookdang"
                        totalPrice={200}
                        subjectList={[
                            "Science [ 13:00 - 14:00 ] February 29, 2000",
                            "Software Engineering [ 14:00 - 15:00 ] February 29, 2000"
                        ]}
                    />
                    <BookingCard 
                        status="Cancelled" 
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
                    <BookingCard 
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
                    <BookingCard 
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
                    <BookingCard 
                        status="Accepted" 
                        requestTime="February 29, 2000 9:30 a.m."
                        tutorName="Komsorn Sookdang"
                        totalPrice={200}
                        subjectList={[
                            "Science [ 13:00 - 14:00 ] February 29, 2000",
                        ]}
                    />
                    <BookingCard 
                        status="Accepted" 
                        requestTime="February 29, 2000 9:30 a.m."
                        tutorName="Komsorn Sookdang"
                        totalPrice={200}
                        subjectList={[
                            "Science [ 13:00 - 14:00 ] February 29, 2000",
                        ]}
                    /> */}
                </Popover.Body>
            </Popover>
        </Overlay>
    );
}

export default BookingOverlay