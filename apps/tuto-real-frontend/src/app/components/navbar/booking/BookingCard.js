import { useState } from 'react';
import { client } from '../../../axiosConfig';
import COLORS from '../../../constants/color';

const BookingCard = (prop) => {
  const { bookingId, requestTime, tutorName, totalPrice, days } = prop; //and also with initial booking status(prop.status).

  const [status, setStatus] = useState(prop.status);
  // const genBorderColor = (status) => {
  //     if (status === "Pending" || status === "Canceled") return "#FBE2C5"
  //     else if (status === "Accepted") return "#D3EAE5"
  //     else if (status === "Rejected") return "#FFD6C9"
  //     else return COLORS.lightgray
  // }
  // const genStatusColor = (status) => {
  //     if (status === "Pending" || status === "Canceled") return "#EF8C18"
  //     else if (status === "Accepted") return COLORS.third
  //     else if (status === "Rejected") return "#FF5D29"
  //     else return COLORS.primary
  // }
  const genConfigStatus = () => {
    switch (status) {
      case 'Pending':
        return {
          statusText: 'Pending',
          statusColor: '#EF8C18',
          borderColor: '#FBE2C5',
        };

      case 'Cancelled':
        return {
          statusText: 'Cancelled',
          statusColor: '#EF8C18',
          borderColor: '#FBE2C5',
        };

      case 'Approved':
        return {
          statusText: 'Approved',
          statusColor: COLORS.third,
          borderColor: '#D3EAE5',
        };

      case 'Rejected':
        return {
          statusText: 'Rejected',
          statusColor: '#FF5D29',
          borderColor: '#FFD6C9',
        };
      default:
        return {
          statusText: 'Unknown',
          statusColor: COLORS.primary,
          borderColor: COLORS.lightgray,
        };
    }
  };
  const translateDateFormat = (timeStamp) => {
    //2001-02-15T17:00:00.000+00:00
    //            to be
    //February 29, 2000 9:30 a.m."
    var date = parseInt(timeStamp.substr(8, 2));
    var month = parseInt(timeStamp.substr(5, 2));
    var year = parseInt(timeStamp.substr(0, 4));
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
      'December',
    ];
    return (
      monthName[month - 1] + ' ' + date.toString() + ', ' + year.toString()
    );
  };

  const translateTimeFormat = (timeStamp) => {
    var hour = timeStamp.substr(11, 2);
    var min = timeStamp.substr(14, 2);
    return hour.toString() + ':' + min.toString();
  };

  const translateSlotsListFormat = (subjectName, timeStamp, slot_no) => {
    // return "1234"
    // return slot_no.toString()
    return (
      subjectName +
      ' [ ' +
      (slot_no + 8).toString() +
      ':00 - ' +
      (slot_no + 9).toString() +
      ':00 ] ' +
      translateDateFormat(timeStamp)
    );
  };

  const cancelButtonHandle = () => {
    //todo: show modal or something like that for comfirmation
    //
    //

    //todo: uncomment the statement belown when sendCancelBooking complete
    //sendCancelBooking(bookingId)

    //todo: delete the statement belown when sendCancelBooking complete
    setStatus('Cancelled');
  };
  const sendCancelBooking = async (bookingId) => {
    console.log('sending cancel booking:', bookingId);
    await client({
      method: 'PATCH',
      url: `/`,
      // url: `/user`,
      params: {
        _id: bookingId,
      },
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then(({ data: { data } }) => {
        console.log('data response', data);
        setStatus('Cancelled');
      })
      .catch((res) => {
        console.log(res);
      });
  };

  return (
    <div
      className="booking-card"
      style={{ borderColor: genConfigStatus().borderColor }}
    >
      <div id="header">
        <p style={{ fontWeight: '500', color: genConfigStatus().statusColor }}>
          {genConfigStatus().statusText}
        </p>
        <p>
          request time: {translateDateFormat('2022-03-22T13:14:15.166Z')}{' '}
          {translateTimeFormat(requestTime)}
        </p>
      </div>

      <div
        style={{
          width: '100%',
          height: '2px',
          backgroundColor: genConfigStatus().borderColor,
        }}
      ></div>

      <p style={{ marginBottom: '0px' }}>with</p>
      <div id="info-section">
        <div id="text-zone">
          <h3>{tutorName}</h3>
          <p>
            total price: <b>{totalPrice} baht</b>
          </p>
        </div>
        <div id="button-zone">
          {status === 'Pending' ? (
            <button onClick={cancelButtonHandle}>Cancel</button>
          ) : null}
        </div>
      </div>
      {/* <button onClick={() => (console.log(requestTime))}>print days</button> */}
      <ul>
        {days.map((e, i) => (
          <div key={bookingId + i + bookingId}>
            {e.slots.map((slot_no, ii) => (
              <li key={bookingId + i + ii} style={{ margin: '2px 0px' }}>
                {translateSlotsListFormat(e.subject[ii], e.date, slot_no)}
              </li>
            ))}
          </div>
        ))}
      </ul>
    </div>
  );
};

export default BookingCard;
