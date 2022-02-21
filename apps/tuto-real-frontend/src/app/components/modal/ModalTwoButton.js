import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import './ModalTwoButton.css';

const ModalTwoButton = (props) => {
  const {
    title,
    header,
    leftFunc,
    rightFunc,
    leftMessage,
    rightMessage,
    leftColor,
    rightColor,
    isPending,
    leftPending,
    leftPendingColor,
  } = props;

  let leftVariant = ''

  if(leftColor === 'red')(
    leftVariant='danger'
  )
  else if(leftColor === 'var(--yellow)')(
    leftVariant='warning'
  )
  else if(leftColor === 'var(--third)')(
    leftVariant='success'
  )

  return (
    <div>
      <Modal
        show={true}
        backdrop="static"
        onHide={rightFunc}
        keyboard={false}
        animation={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title className="modal-two-title">{title}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Modal.Title className="modal-two-header">{header}</Modal.Title>
        </Modal.Body>

        <Modal.Footer>
          {isPending && (
            <Button
              style={{
                backgroundColor: leftPendingColor,
                borderColor: leftPendingColor,
              }}
            >
              {leftPending}
            </Button>
          )}

          {!isPending && (
            <Button
              variant={leftVariant ?? undefined}
              style={{color: 'white', backgroundColor: leftColor, borderColor: leftColor }}
              onClick={leftFunc ?? undefined}
            >
              {leftMessage}
            </Button>
          )}

          <Button
            id={rightColor}
            variant={
              rightColor === 'cancel-button' ? 'outline-dark' : 'primary'
            }
            style={{ backgroundColor: rightColor, borderColor: rightColor }}
            onClick={rightFunc ?? undefined}
          >
            {rightMessage}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ModalTwoButton;
