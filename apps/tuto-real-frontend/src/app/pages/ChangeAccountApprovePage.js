import React, { useState} from 'react';
import { Link } from 'react-router-dom';

const ChangeAccountTypePage = () => {

    const back = '< Back'
    const [showModalApprove,setShowModalApprove] = useState(false)
    const [showModalReject,setShowModalReject] = useState(false)

    const title = 'Veerin Jurek'

    const handleApprove = () => {
        setShowModalApprove(true)
    }

    const handleReject = () => {
        setShowModalReject(true)
    }

  return (
    <div style={{display: 'flex',flexDirection: 'column',alignItems: 'center' , width: '100%'}}>
        <div style={{display: 'flex', width: '45%'}}>
          <Link className='backtoprofile shadow' to='/'>{back}</Link>
        </div>
        

        <div className='info-card shadow' >
          <p className='title left' style={{width: '100%'}}>{title} request</p>
          <p className='header' style={{width: '100%'}}>Please check the user infomation below.</p>
          <hr/>
          
          <div className='section'>
            <p className='header'>COPY OF CITIZEN ID CARD</p>
          </div>
          <hr/>
          
          <div className='section'>
            <p className='header'>TRANSCRIPTION</p>
          </div>
        </div>

        <div style={{display: 'flex',flexDirection: 'row-reverse', width: '45%'}}>
            <button className='submit-open shadow' onClick={handleReject} style={{marginLeft: '2%', backgroundColor: 'red'}}>Reject</button>
            <button className='submit-open shadow' onClick={handleApprove} style={{marginLeft: '2%'}}>Approve</button>
        </div>
    </div>
  );
};

export default ChangeAccountTypePage;
