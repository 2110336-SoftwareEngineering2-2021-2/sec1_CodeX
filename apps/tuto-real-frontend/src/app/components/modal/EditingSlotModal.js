import React from 'react';
import { Modal, Form } from 'react-bootstrap';
import NormalButton from '../ui/NormalButton';

const EditingSlotModal = (props) => {

    let show = true
    const subjectChoice = ['Math', 'Art', 'Programing']
    
    const handleClose = () => {
        show = false
    }

    return (
        <div>
            <Modal
                show={show}
                onhide={handleClose}
                backdrop='static'
                keyboard={false}
                animation={false}
                centered
            >

                {/* header part */}
                <Modal.Header>
                    <Modal.Title className='request-header' style={{fontWeight:'550'}}>
                        Edit all your selected slot
                    </Modal.Title>
                </Modal.Header>

                {/* subject select part */}
                <Modal.Body style={{borderBottom:'1px solid #dee2e6'}}>
                    <Form.Group controlId='subject'>
                        <Form.Label>SUBJECTS</Form.Label>
                        <Form.Select>
                            {subjectChoice.map( (subject) => (
                                <option key={subject}>{subject}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                </Modal.Body>

                {/* description part */}
                <Modal.Body>
                    <Form.Group controlId='description'>
                        <Form.Label>DESCRIPTION</Form.Label>
                        <Form.Control as='textarea' placeholder='Add your description here....'></Form.Control>
                    </Form.Group>
                </Modal.Body>

                {/* button part */}
                <Modal.Footer>
                    
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default EditingSlotModal