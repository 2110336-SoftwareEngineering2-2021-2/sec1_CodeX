import React from 'react';
import { Modal } from 'react-bootstrap';
import NormalButton from '../ui/NormalButton';

const ModalTwoButton = (props) => {

    const {show, setShow, title, header, leftFunc, leftMessage, rightMessage, leftColor, rightColor, isPending, leftPending, leftPendingColor } = props

    const handleclose = () => {
        setShow(!show)
    }

  return (
      <div>
        <Modal 
            show={show} 
            onHide={handleclose} 
            backdrop='static' 
            keyboard={false} 
            animation={false}
            centered
            style={{width: '35%', left: '32.5%'}}
        >
            <Modal.Header style={{flexDirection: 'column', alignItems: 'flex-start', border: 'none', paddingBottom: '0px'}}>
                
                <Modal.Title className='request-title'>{title}</Modal.Title>
                <Modal.Title className='request-header'>{header}</Modal.Title>
                
                <hr/>
            </Modal.Header>

            <Modal.Footer style={{border: 'none', paddingTop: '0px', flexDirection: 'row-reverse', justifyContent: 'flex-start'}}>

                <NormalButton 
                    title={rightMessage}
                    whenClick={handleclose}
                    size='s'
                    bgColor={rightColor}
                    fontSize='larger'
                />

                {(!isPending ?? true) && <NormalButton 
                    title={leftMessage}
                    whenClick={() => leftFunc()}
                    size='s'
                    bgColor={leftColor}
                    fontSize='larger'
                />}


                {(isPending ?? false) && <NormalButton 
                    title={leftPending}
                    size='s'
                    bgColor={leftPendingColor}
                    fontSize='larger'
                />}

            </Modal.Footer>
        </Modal>
      </div>
  );
};

export default ModalTwoButton;