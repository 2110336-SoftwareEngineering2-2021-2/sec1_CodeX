import React, { useState} from 'react';
import { Link } from 'react-router-dom';
import ModalTwoButton from '../components/modal/ModalTwoButton';

const ChangeAccountApprovePage = (props) => {

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
          
          <div className='section' style={{alignItems: 'flex-start'}}>
            <p className='header' style={{width: '30%'}}>COPY OF CITIZEN ID CARD</p>
            <img src={imageCid} className='upload-image' style={{width: '62%', margin: '1%'}} alt='imageCid'/>
          </div>
          <hr/>
          
          <div className='section' style={{alignItems: 'flex-start'}}>
            <p className='header' style={{width: '30%'}}>TRANSCRIPTION</p>
            <img src={imageTrans} className='upload-image' style={{width: '62%', margin: '1%'}} alt='imageTrans' />
          </div>
        </div>

        <div style={{display: 'flex',flexDirection: 'row-reverse', width: '45%'}}>
            <button className='submit-open shadow' onClick={handleReject} style={{marginLeft: '2%', backgroundColor: 'red'}}>Reject</button>
            <button className='submit-open shadow' onClick={handleApprove} style={{marginLeft: '2%'}}>Approve</button>
        </div>

        <ModalTwoButton 
            show={showModalApprove} 
            setShow={setShowModalApprove} 
            title='Please confirm the approvol' 
            header='The user will become a tutor role. Are you sure?' 
            leftTo='/' 
            leftMessage='Approve'
            rightMessage='cancel'
            leftColor='var(--third)'
            rightColor='var(--yellow)'
        />

        <ModalTwoButton 
            show={showModalReject} 
            setShow={setShowModalReject} 
            title='Please confirm the reject' 
            header='The request will be deleted. Are you sure?' 
            leftTo='/' 
            leftMessage='Reject'
            rightMessage='cancel'
            leftColor='red'
            rightColor='var(--yellow)'
        />
    </div>
  );
};

export default ChangeAccountApprovePage;
