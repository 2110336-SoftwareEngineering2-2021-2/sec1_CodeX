import React, { useState} from 'react';
import { Link } from 'react-router-dom';

const ChangeAccountTypePage = (props) => {

    const back = '< Back'
    const [showModalApprove,setShowModalApprove] = useState(false)
    const [showModalReject,setShowModalReject] = useState(false)

    const title = 'Veerin Jurek'
    const imageCid = '../../assets/test_cid.jpg'
    const imageTrans = '../../assets/test_trans.jpg'

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
            <p className='header' style={{width: '30%'}}>COPY OF CITIZEN ID CARD</p>
            <img src={imageCid} className='upload-image' style={{width: '62%', margin: '1%'}} alt='imageCid'/>
          </div>
          <hr/>
          
          <div className='section'>
            <p className='header' style={{width: '30%'}}>TRANSCRIPTION</p>
            <img src={imageTrans} className='upload-image' style={{width: '62%', margin: '1%'}} alt='imageTrans' />
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
