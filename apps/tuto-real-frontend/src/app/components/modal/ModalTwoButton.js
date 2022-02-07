import React from 'react';
import { Modal } from 'react-bootstrap';
import NormalButton from '../ui/NormalButton';

const ModalTwoButton = (props) => {

    const handleclose = () => {
        props.setShow(!props.show)
    }

  return (
      <div>
        <Modal 
            show={props.show} 
            onHide={handleclose} 
            backdrop='static' 
            keyboard={false} 
            animation={false}
            centered
            style={{width: '35%', left: '32.5%'}}
        >
            <Modal.Header style={{flexDirection: 'column', alignItems: 'flex-start', border: 'none', paddingBottom: '0px'}}>
                
                <Modal.Title className='request-title'>{props.title}</Modal.Title>
                <Modal.Title className='request-header'>{props.header}</Modal.Title>
                
                <hr/>
            </Modal.Header>

            <Modal.Footer style={{border: 'none', paddingTop: '0px', flexDirection: 'row-reverse', justifyContent: 'flex-start'}}>

                <NormalButton 
                    title={props.rightMessage}
                    whenClick={handleclose}
                    size='s'
                    bgColor={props.rightColor}
                    fontSize='larger'
                />

                {!props.isPending && <NormalButton 
                    title={props.leftMessage}
                    whenClick={() => props.leftFunc()}
                    size='s'
                    bgColor={props.leftColor}
                    fontSize='larger'
                />}


                {props.isPending && <NormalButton 
                    title={props.leftPending}
                    size='s'
                    bgColor={props.leftPending}
                    fontSize='larger'
                />}

            </Modal.Footer>
        </Modal>
      </div>
  );
};

export default ModalTwoButton;