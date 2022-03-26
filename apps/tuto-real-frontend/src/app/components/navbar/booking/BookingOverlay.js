import { useCallback, useEffect, useState } from "react";
import { Overlay, Popover, Spinner} from "react-bootstrap";
import { useAuth } from "../../../auth";
import { client } from "../../../axiosConfig";
import COLORS from "../../../constants/color";
import BookingCard from "./BookingCard";

const BookingOverlay = (prop) => {
    const {show,setShow,target,setModalConfig} = prop;
    const { _id } = useAuth();

    const [isLoading, setIsLoading] = useState(true) 

    const [bookingList, setBookingList] = useState([
        // {
        //   _id:"",
        //   tutor:"",
        //   totalPrice:"",
        //   timeStamp:"",
        //   status:"",
        //   days:[
        //       {
        //           date:"",
        //           day:"",
        //           slots:[
        //               int,
        //               int,
        //               ...
        //           ]
        //       }
        //   ]
        // }
    ])
    
    // useEffect(() => {
    //     //todo: uncomment statement belown if url is ready
    //     //fetchData();
    //     console.log(bookingList)
    // }, [bookingList]);

    
    useEffect(() => {
        // window.location.reload(false)
    }, []);
    
    const fetchData = useCallback(async () => {
        if (show) {
            setIsLoading(true)
            console.log("fetch Booking of:",_id);
            await client({
                method: 'GET',
                url: `/booking/student`,
                params: {
                // studentId: `${}`,
                _id: `${_id}`,
                // _id: `${_id}`,
                },
                headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            })
            .then((data) => {
                console.log(data.data.message);
                setBookingList(data.data.message);
                setIsLoading(false)
            })
            .catch((res) => {
                console.log(res);
            });
        }
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
            className="booking-overlay"
        >
            <Popover className="booking-overlay" id="popover-contained">
                <Popover.Header as="h3">My Booking</Popover.Header>
                {!isLoading ? 
                    <Popover.Body> 
                        {/* <button onClick={fetchData}>load data</button> */}

                        {bookingList.map((e,i) => (
                            <BookingCard
                                setShow={setShow}
                                setModalConfig={setModalConfig}

                                key={e._id}
                                bookingId={e._id}
                                status={e.status}
                                requestTime={e.timeStamp}
                                tutorName={e.tutor}
                                totalPrice={e.totalPrice}
                                days={e.days}
                            />
                        ))}
                    </Popover.Body>
                    :
                    <div className="loading_spinner" style={{marginBottom:"20px"}} >
                        <Spinner
                            animation="border"
                            role="status"
                            style={{ marginBottom: '2vh' }}
                        >
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                        <h4 style={{ color: COLORS.darkgray }}>Loading</h4>
                    </div>
                }
            </Popover>
        </Overlay>
    );
}

export default BookingOverlay