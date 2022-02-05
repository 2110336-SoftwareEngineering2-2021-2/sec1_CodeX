import React, { useState} from 'react';
import { Link, useLocation } from 'react-router-dom';
import ModalTwoButton from '../components/modal/ModalTwoButton';

const ChangeAccountApprovePage = () => {

    //props from Link
    const location = useLocation()
    const {name, citizenID, transcription} = location.state

    const back = '< Back'

    //modal show
    const [showModalApprove,setShowModalApprove] = useState(false)
    const [showModalReject,setShowModalReject] = useState(false)

    //show value
    const title = name.name
    const imageCid = citizenID.citizenID.url
    const imageTrans = transcription.transcription.url

    //handle modal show
    const handleApprove = () => {
        setShowModalApprove(true)
    }

    const handleReject = () => {
        setShowModalReject(true)
    }

  return (
    <div style={{display: 'flex',flexDirection: 'column',alignItems: 'center' , width: '100%'}}>

        {/* back button */}
        <div style={{display: 'flex', width: '45%'}}>
          <Link className='backtoprofile shadow' to='/request-list'>{back}</Link>
        </div>
        

        <div className='info-card shadow' >

          {/*title*/}
          <p className='title left' style={{width: '100%'}}>{title} request</p>
          <p className='header' style={{width: '100%'}}>Please check the user infomation below.</p>
          <hr/>
          
          {/*Cid image */}
          <div className='section' style={{alignItems: 'flex-start'}}>
            <p className='header' style={{width: '30%'}}>COPY OF CITIZEN ID CARD</p>
            <img src={imageCid} className='upload-image' style={{width: '62%', margin: '1%'}} alt='imageCid'/>
          </div>
          <hr/>
          
          {/*trans image */}
          <div className='section' style={{alignItems: 'flex-start'}}>
            <p className='header' style={{width: '30%'}}>TRANSCRIPTION</p>
            <img src={imageTrans} className='upload-image' style={{width: '62%', margin: '1%'}} alt='imageTrans' />
          </div>
        </div>

        {/*approve reject button */}
        <div style={{display: 'flex',flexDirection: 'row-reverse', width: '45%'}}>
            <button className='submit-open shadow' onClick={handleReject} style={{marginLeft: '2%', backgroundColor: 'red'}}>Reject</button>
            <button className='submit-open shadow' onClick={handleApprove} style={{marginLeft: '2%'}}>Approve</button>
        </div>

        {/* modal component */}
        <ModalTwoButton 
            show={showModalApprove} 
            setShow={setShowModalApprove} 
            title='Please confirm the approvol' 
            header='The user will become a tutor role. Are you sure?' 
            leftTo='/request-list' 
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
            leftTo='/request-list'
            leftMessage='Reject'
            rightMessage='cancel'
            leftColor='red'
            rightColor='var(--yellow)'
        />
    </div>
  );
};

export default ChangeAccountApprovePage;
