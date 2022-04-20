import { useState } from 'react';

import {
  translateDateFormat,
  translateTimeFormat,
} from '../../util/translator';
import COLORS from '../../../constants/color';

const BookingCard = (prop) => {
  const {
    setShow,
    setModalConfig,
    bookingId,
    requestTime,
    tutorName,
    totalPrice,
    days,
  } = prop; //and also with initial booking status(prop.status).

  const [status] = useState(prop.status);

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
          statusText: 'Canceled',
          statusColor: '#EF8C18',
          borderColor: '#FBE2C5',
        };

      case 'Approved':
        return {
          statusText: 'Approved',
          statusColor: COLORS.third,
          borderColor: '#D3EAE5',
        };

      case 'Reject':
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
    setShow(false);
    setModalConfig({
      modalType: 'Cancel',
      bookingId: bookingId,
      targetName: tutorName,
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
          request time: {translateDateFormat(requestTime)}{' '}
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
        {days.map((e, i) => {
          if (e.subject && e.data)
            return (
              <div key={bookingId + i + bookingId} style={{ margin: '0px' }}>
                {e.slots.map((slot_no, ii) => (
                  <li key={bookingId + i + ii} style={{ margin: '0px 2px' }}>
                    {translateSlotsListFormat(e.subject[ii], e.date, slot_no)}
                  </li>
                ))}
              </div>
            );
        })}
      </ul>
    </div>
  );
};

export default BookingCard;
