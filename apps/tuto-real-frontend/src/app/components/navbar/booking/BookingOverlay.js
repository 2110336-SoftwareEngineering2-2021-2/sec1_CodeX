import { useCallback, useEffect, useState } from 'react';
import { Overlay, Popover, Spinner } from 'react-bootstrap';
import { useAuth } from '../../../auth';
import { client } from '../../../axiosConfig';
import COLORS from '../../../constants/color';
import BookingCard from './BookingCard';
import { DESK } from '../../../constants/image';

const BookingOverlay = (prop) => {
  const { show, setShow, target, setModalConfig } = prop;
  const { _id } = useAuth();

  const [isLoading, setIsLoading] = useState(true);

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
  ]);

  useEffect(() => {
    // window.location.reload(false)
  }, []);

  const fetchData = useCallback(async () => {
    if (show && _id) {
      setIsLoading(true);
      console.log('fetch Booking of:', _id);
      await client({
        method: 'GET',
        url: `/booking/student`,
        params: {
          _id: `${_id}`,
        },
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
        .then(({ data: { data } }) => {
          console.log(data);
          setBookingList(data);
          setIsLoading(false);
        })
        .catch((res) => {
          console.log(res);
          setShow(false);
        });
    }
  }, [_id, show]);

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
      onHide={() => setShow(false)}
      rootClose={true}
    >
      <Popover className="booking-overlay" id="popover-contained">
        <Popover.Header as="h3">My Booking</Popover.Header>
        {!isLoading ? (
          <Popover.Body>
            {/* <button onClick={fetchData}>load data</button> */}
            {bookingList.length === 0 && (
              <div id="place-hover-empty-image">
                <img src={DESK} />
                <p>You don't have any booking</p>
              </div>
            )}
            {bookingList.map((e, i) => (
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
        ) : (
          <div
            className="loading_spinner"
            style={{ marginBottom: '20px', width: '400px', height: '400px' }}
          >
            <Spinner
              animation="border"
              role="status"
              style={{ marginBottom: '2vh' }}
            >
              <span className="visually-hidden">Loading...</span>
            </Spinner>
            <h4 style={{ color: COLORS.darkgray }}>Loading</h4>
          </div>
        )}
      </Popover>
    </Overlay>
  );
};

export default BookingOverlay;
