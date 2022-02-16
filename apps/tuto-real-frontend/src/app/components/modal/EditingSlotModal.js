import React, { useState } from 'react';
import { Modal, Form, Button} from 'react-bootstrap';
import './EditingSlotModal.css'
import ModalTwoButton from './ModalTwoButton';

const EditingSlotModal = (props) => {

    let show = true
    const subjectChoice = ['Math', 'Art', 'Programing']

    const [showModal, setShowModal] = useState(false)
    const [isPending, setIsPending] = useState(false)
    
    const handleClose = () => {
        show = false
    }

    const handleLeft = () => {
        return
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
                        Edit all your selected slots
                    </Modal.Title>
                </Modal.Header>

                {/* subject select part */}
                <Modal.Body style={{borderBottom:'1px solid #dee2e6'}}>
                    <Form.Group controlId='subject'>
                        <Form.Label style={{color: 'var(--darkgray)'}}>SUBJECTS</Form.Label>
                        <Form.Select style={{color: 'var(--darkgray)', width: '50%', marginLeft: '1rem'}}>
                            {subjectChoice.map( (subject) => (
                                <option key={subject} style={{color: 'var(--darkgray)'}}>{subject}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                </Modal.Body>

                {/* description part */}
                <Modal.Body>
                    <Form.Group controlId='description'>
                        <Form.Label style={{color: 'var(--darkgray)'}}>DESCRIPTION</Form.Label>
                        <Form.Control id='description' as='textarea' placeholder='Add your description here....' style={{marginLeft: '1rem', width: '95%'}}></Form.Control>
                    </Form.Group>
                </Modal.Body>

                {/* button part */}
                <Modal.Footer>

                    <Button style={{backgroundColor: 'var(--third)', borderColor: 'var(--third)'}} onClick={() => {setShowModal(true)}}>
                        Save Changes
                    </Button>

                    <Button id='cancelButton' variant='outline-dark'>
                        Cancel
                    </Button>

                </Modal.Footer>
            </Modal>

            <ModalTwoButton
                show={showModal}
                setShow={setShowModal}
                title='Do you want to save these changes?'
                header='If you click confirm button, the following change will be applied to the selected slots.'
                leftFunc={handleLeft}
                leftMessage='Confirm'
                rightMessage='Cancel'
                leftColor='var(--third)'
                rightColor='Cancel'
                isPending={isPending}
                leftPending='Saving'
                leftPendingColor='var(--lightgray)'
            />
        </div>
    )
}

export default EditingSlotModal