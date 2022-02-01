import React from 'react';
import { Modal } from 'react-bootstrap';
import './ModalRequestButton.css'
import { Link } from 'react-router-dom';

const ModalRequestButton = (props) => {

    const handleclose = () => {
        props.setshow(!props.show)
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
                <Modal.Title className='request-title'>Request Complete</Modal.Title>
                <Modal.Title className='request-header'>The request has already send to Admin for approve </Modal.Title>
                <hr/>
            </Modal.Header>
            <Modal.Footer style={{border: 'none', paddingTop: '0px', flexDirection: 'column'}}>
                <Link style={{textDecoration: 'none', width: '45%'}} to='/profile'>
                    <button className='submit-open' style={{width: '100%', marginBottom: '0px', padding: '5px 5px'}} onClick={handleclose}>
                        OK, back to home page
                    </button>
                </Link>
            </Modal.Footer>
        </Modal>
      </div>
  );
};

export default ModalRequestButton;
