import React, { useState} from 'react';
import { Link } from 'react-router-dom';
import UploadButton from '../components/changeacc/UploadButton';
import './ChangeAccountTypePage.css'

const ChangeAccountTypePage = () => {

    const back = '< Back'
    const [citizenID, setCitizenID] = useState({preview: "", raw : ""})
    const [transcription, setTranscription] = useState({preview: "", raw : ""})

    const handleSelectCid = (e) => {
      if(e.target.files.length){
        setCitizenID({
          preview: URL.createObjectURL(e.target.files[0]),
          raw : e.target.files[0]
        })
      }
    }

    const handleSelectTrans = (e) => {
      if(e.target.files.length){
        setTranscription({
          preview: URL.createObjectURL(e.target.files[0]),
          raw : e.target.files[0]
        })
      }
    }

    const handleUploadFile = (event) => {
        console.log(citizenID)
        console.log(transcription)
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
          
          <div className='section'>
            <p className='header'>COPY OF CITIZEN ID CARD</p>
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
          
          <div className='section'>
            <p className='header'>TRANSCRIPTION</p>
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
            <button onClick={handleUploadFile} className='submit-open shadow'>Submit</button>
          }
        </div>
    </div>
  );
};

export default ChangeAccountTypePage;
