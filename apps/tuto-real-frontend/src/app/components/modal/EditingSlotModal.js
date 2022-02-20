import React, { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import './EditingSlotModal.css';
import ModalTwoButton from './ModalTwoButton';

const EditingSlotModal = (props) => {
  const { show, setShow, subjectIn, descriptionIn, setModalState, confirmFunc } = props;

  const [subject, setSubject] = useState(subjectIn);
  const [description, setDescription] = useState(descriptionIn);
  const subjectChoice = ['Math', 'Art', 'Programing'];

  const [showModal, setShowModal] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const handleSaveChanges = () => {
    setShow(!show);
    setShowModal(!showModal);
  };

  const handleClose = () => {
    setShow(!show);
    setSubject(subjectIn);
    setDescription(descriptionIn);
    setModalState('none')
  };

  const handleLeft = () => {
    setIsPending(!isPending);
    console.log(subject);
    console.log(description);
  };

  const handleRight = () => {
    setShow(!show);
    setShowModal(!showModal);
  };

  return (
    <div>
      <Modal
        show={show}
        backdrop="static"
        onHide={handleClose}
        keyboard={false}
        animation={false}
        centered
      >
        {/* header part */}
        <Modal.Header closeButton>
          <Modal.Title className="request-header" style={{ fontWeight: '600' }}>
            Edit all your selected slots
          </Modal.Title>
        </Modal.Header>

        {/* subject select part */}
        <Modal.Body style={{ borderBottom: '1px solid #dee2e6' }}>
          <Form.Group>
            <Form.Label style={{ color: 'var(--darkgray)' }}>
              SUBJECTS
            </Form.Label>

            <Form.Select
              style={{
                color: subject==='Choose your subject' ? 'var(--lightgray)' :'var(--darkgray)',
                width: '40%',
                marginLeft: '1rem',
              }}
              defaultValue='Choose your subject'
              // value={subject}
              onChange={(e) => {
                setSubject(e.target.value);
              }}
            >
              <option key='default' style={{ color: 'var(--lightgray)' }} disabled>Choose your subject</option>
              {subjectChoice.map((subject) => (
                <option key={subject} style={{ color: 'var(--darkgray)' }}>
                  {subject}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Modal.Body>

        {/* description part */}
        <Modal.Body>
          <Form.Group>
            <Form.Label style={{ color: 'var(--darkgray)' }}>
              DESCRIPTION
            </Form.Label>

            <Form.Control
              id="description"
              style={{color: 'var(--darkgray)', marginLeft: '1rem', width: '95%' }}
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              as="textarea"
              placeholder="Add your description here...."
            />
          </Form.Group>
        </Modal.Body>

        {/* button part */}
        <Modal.Footer>
          <Button
            variant='success'
            style={{
              backgroundColor: 'var(--third)',
              borderColor: 'var(--third)',
            }}
            onClick={handleSaveChanges}
          >
            Save Changes
          </Button>

          <Button
            id="cancel-button"
            variant="outline-dark"
            onClick={handleClose}
          >
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>

      <ModalTwoButton
        show={showModal}
        title="Do you want to save these changes?"
        header="If you click confirm button, the following change will be applied to the selected slots."
        leftFunc={confirmFunc}
        rightFunc={handleRight}
        leftMessage="Confirm"
        rightMessage="Cancel"
        leftColor="var(--third)"
        rightColor="cancel-button"
        isPending={isPending}
        leftPending="Saving..."
        leftPendingColor="var(--lightgray)"
      />
    </div>
  );
};

export default EditingSlotModal;
