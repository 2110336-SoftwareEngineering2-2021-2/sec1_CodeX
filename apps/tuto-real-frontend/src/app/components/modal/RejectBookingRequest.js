import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';

const RejectBookingRequest = (props) => {
    
    const [show, setShow] = useState(props.show);
    const [sending, setSending] = useState('');
    const handleShow = () => setShow(true);
    const handleSubmit = () => {
        
        props.handleClose();
      };

    return(
    <Modal
      className="reject-booking-request"
      show={props.show}
      onHide={props.handleClose}
    >

    <Modal.Header closeButton>
        <h4>Do you want to reject the booking?</h4>
    </Modal.Header>

    <Modal.Body style={{ paddingBottom: '0px' }}>
        <h6>
            If you click confirm button, request (StudentName) will be rejected.
        </h6>
    </Modal.Body>


    <Modal.Footer>
        <Button variant="outline-secondary" onClick={props.handleClose}>
          Cancel
        </Button>
        <Button className="confirm-button" onClick={handleSubmit}>
          Confirm
        </Button>
    </Modal.Footer>
    </Modal>
    )
}