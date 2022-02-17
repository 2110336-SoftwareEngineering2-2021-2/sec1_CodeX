import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import './ModalTwoButton.css'
// import NormalButton from '../ui/NormalButton';

const ModalTwoButton = (props) => {

    const {show, title, header, leftFunc, rightFunc, leftMessage, rightMessage, leftColor, rightColor, isPending, leftPending, leftPendingColor } = props

  return (
      <div>
        <Modal 
            show={show} 
            backdrop='static' 
            keyboard={false} 
            animation={false}
            centered
        >
            <Modal.Header>
                <Modal.Title className='modal-two-title'>{title}</Modal.Title>
            </Modal.Header>
                
            <Modal.Body>
                <Modal.Title className='modal-two-header'>{header}</Modal.Title>
            </Modal.Body>

            <Modal.Footer>

                {isPending && <Button
                    style={{backgroundColor: leftPendingColor, borderColor: leftPendingColor}}
                >
                    {leftPending}
                </Button>}

                {!isPending && <Button 
                    style={{backgroundColor: leftColor, borderColor: leftColor}} 
                    onClick={leftFunc}
                >
                    {leftMessage}
                </Button>}

                <Button
                    id={rightColor}
                    variant={rightColor === 'cancel-button' ? 'outline-dark':''}
                    style={{backgroundColor: rightColor, borderColor: rightColor}}
                    onClick={rightFunc}
                >
                    {rightMessage}
                </Button>

            </Modal.Footer>
        </Modal>
      </div>
  );
};

export default ModalTwoButton;