import React from 'react';
import { Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';

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
                <button className='submit-open' style={{width: '22%', margin: '0.25rem', padding: '5px 5px', backgroundColor: props.rightColor}} onClick={handleclose}>
                    {props.rightMessage}
                </button>
                <Link style={{textDecoration: 'none', width: '22%'}} to={props.leftTo}>
                    <button className='submit-open' style={{width: '100%', marginBottom: '0px', padding: '5px 10px', backgroundColor: props.leftColor}} onClick={handleclose}>
                        {props.leftMessage}
                    </button>
                </Link>
                
            </Modal.Footer>
        </Modal>
      </div>
  );
};

export default ModalTwoButton;