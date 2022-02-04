import React, { useState} from 'react';
import { Link } from 'react-router-dom';
import { client } from '../axiosConfig';
import ModalRequestButton from '../components/changeacc/ModalRequestButton';
import UploadButton from '../components/changeacc/UploadButton';
import './ChangeAccountTypePage.css'

const ChangeAccountTypePage = () => {

    const back = '< Back'
    const [citizenID, setCitizenID] = useState({preview: "", raw : ""})
    const [transcription, setTranscription] = useState({preview: "", raw : ""})
    const [showModal,setShowModal] = useState(false)
    const [sendImage, setSendImage] = useState({
      email: 'sorasit@gmail.com',
      evidenceimage: [citizenID.raw, transcription.raw]
    })

    const handleSelectCid = (e) => {
      if(e.target.files.length){
        setCitizenID({
          preview: URL.createObjectURL(e.target.files[0]),
          raw : e.target.files[0]
        })

        setSendImage({
          ...sendImage,
          evidenceimage : [e.target.files[0], sendImage.evidenceimage[1]]
        })
      }
    }

    const handleSelectTrans = (e) => {
      if(e.target.files.length){
        setTranscription({
          preview: URL.createObjectURL(e.target.files[0]),
          raw : e.target.files[0]
        })

        setSendImage({
          ...sendImage,
          evidenceimage : [sendImage.evidenceimage[0], e.target.files[0]]
        })
      }
    }

    const handleUploadFile = (event) => {
        // console.log(citizenID.raw)
        // console.log(transcription.raw)
        console.log(sendImage)
        client({
          url: '/tutorReq/create',
          method: 'POST',
          body: sendImage
        }).then( ({data}) => {
          console.log(data)
          setShowModal(true)
        }).catch( (res) => {
          console.log(res)
        })
    }

  return (
    <div style={{display: 'flex',flexDirection: 'column',alignItems: 'center' , width: '100%'}}>
        <div style={{display: 'flex', width: '45%'}}>
          <Link className='backtoprofile shadow' to='/profile'>{back}</Link>
        </div>
        

        <div className='info-card shadow' >
          <p className='title left' style={{width: '100%'}}>upgrade user's type form</p>
          <p className='header' style={{width: '100%'}}>Please submit your  copy of citizen id card and transcription</p>
          <hr/>
          
          <div className='section' style={{alignItems: 'flex-start'}}>
            <p className='header' style={{width: '30%'}}>COPY OF CITIZEN ID CARD</p>
            <UploadButton 
                id='cidUpload' 
                image={citizenID} 
                setimage={handleSelectCid} 
                csstext='upload-text' 
                csslabel='upload' 
                cssimage='upload-image'
            />
          </div>
          <hr/>
          
          <div className='section' style={{alignItems: 'flex-start'}}>
            <p className='header' style={{width: '30%'}}>TRANSCRIPTION</p>
            <UploadButton 
              id='transUpload' 
              image={transcription} 
              setimage={handleSelectTrans} 
              csstext='upload-text' 
              csslabel='upload' 
              cssimage='upload-image'
            />
          </div>
        </div>

        <div style={{display: 'flex',flexDirection: 'row-reverse', width: '45%'}}>
          {
            (!transcription.preview || 
            !citizenID.preview) && 
            <button className='submit-close shadow' disabled>Submit</button>
          }
        </div>

        <div style={{display: 'flex',flexDirection: 'row-reverse', width: '45%'}}>
          {
            transcription.preview && 
            citizenID.preview && 
            <button onClick={handleUploadFile} className='submit-open shadow' data-toggle='modal'>Submit</button>
          }
        </div>
        
        <ModalRequestButton setshow={setShowModal} show={showModal}/>
    </div>
  );
};

export default ChangeAccountTypePage;
